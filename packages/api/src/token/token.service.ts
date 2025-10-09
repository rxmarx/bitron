import {
  APICreateToken,
  APIFindToken,
  APIUpdateTokenBank,
  APIUpdateTokenCompany,
  APIUpdateTokenInfo,
  APIUpdateTokenUser,
} from "src/types/token";
import { BadRequestException, Injectable } from "@nestjs/common";

import { AppService } from "src/app.service";
import { Token } from "@prisma/client";

@Injectable()
export class TokenService {
  constructor(private readonly appService: AppService) {}

  async find(data: APIFindToken): Promise<BadRequestException | Token> {
    const { id, title } = data;

    if (title) {
      const token: Token | null = await this.appService.database.token.findFirst({
        where: { title },
        include: { acquirer: true, bank: true, buyers: true, creator: true },
      });

      if (!token) {
        return new BadRequestException("Token with the given title is not found");
      }

      return token;
    }

    const token: Token | null = await this.appService.database.token.findUnique({
      where: { id },
      include: { acquirer: true, bank: true, buyers: true, creator: true },
    });

    if (!token) {
      return new BadRequestException("Token with the given id is not found");
    }

    return token;
  }

  async create(data: APICreateToken): Promise<string | BadRequestException> {
    const { id, title, description } = data;

    const user = await this.appService.database.user.findUnique({
      where: { id },
    });

    if (!user) {
      return new BadRequestException("User with the given id is not found");
    }

    const token = await this.appService.database.token.findFirst({
      where: { title },
    });

    if (token) {
      return new BadRequestException("Token with the given id already exists");
    }

    await this.appService.database.user.update({
      where: { id },
      data: { createdTokens: { create: { title, description } } },
    });

    return "Successfully!, created token for the user";
  }

  async updateTokenInfo(data: APIUpdateTokenInfo): Promise<string | BadRequestException> {
    const { id, title, description, points, tier, sales, price, salesPerTier } = data;

    const token = await this.appService.database.token.findUnique({
      where: { id },
    });

    if (!token) {
      return new BadRequestException("Token with the given id is not found");
    }

    await this.appService.database.token.update({
      where: { id },
      data: {
        title: title || token.title,
        description: description || token.description,
        points: points || token.points,
        tier: tier || token.tier,
        sales: sales || token.sales,
        price: price || token.price,
        salesPerTier: salesPerTier || token.salesPerTier,
      },
    });

    return "Successfully!, updated the token's info";
  }

  async updateTokenUser(data: APIUpdateTokenUser, connect: boolean) {
    const { id, creatorId, buyerId } = data;

    const user = await this.appService.database.user.findUnique({
      where: { id: creatorId || buyerId },
    });

    if (!user) {
      return new BadRequestException("Invalid request!, user with the given id is not found");
    }

    const token = await this.appService.database.token.findUnique({
      where: { id },
      include: {
        buyers: true,
      },
    });

    if (!token) {
      return new BadRequestException("Token with the given id is not found");
    }

    if (creatorId) {
      if (token.creatorId === creatorId) {
        return new BadRequestException("The user is already the token's creator");
      }

      await this.appService.database.token.update({
        where: { id },
        data: { creator: { update: { id: creatorId } } },
      });

      return "Successfully!, updated the creator of the token";
    }

    const alreadyBought = token.buyers.find((buyer) => {
      return buyer.id === buyerId;
    });

    if (connect && buyerId) {
      if (alreadyBought) {
        return new BadRequestException("The user is already a buyer of this token");
      }

      await this.appService.database.token.update({
        where: { id },
        data: { buyers: { connect: { id: buyerId } } },
      });

      return "Successfully!, added the user to the buyers of the token";
    } else if (buyerId) {
      if (!alreadyBought) {
        return new BadRequestException("The user is not a buyer of this token before");
      }

      await this.appService.database.token.update({
        where: { id },
        data: { buyers: { disconnect: { id: buyerId } } },
      });

      return "Successfully!, removed the user from the buyers of the token";
    }
  }

  async updateTokenCompany(
    data: APIUpdateTokenCompany,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id, acquirerId } = data;

    const token = await this.appService.database.token.findUnique({
      where: { id },
      include: {
        acquirer: true,
      },
    });

    if (!token) {
      return new BadRequestException("Invalid request!, token with the given id is not found");
    }

    const company = await this.appService.database.company.findUnique({
      where: { ownerId: acquirerId },
    });

    if (!company) {
      return new BadRequestException("Invalid request!, company with the given id is not found");
    }

    if (connect) {
      if (token.acquirerId === acquirerId) {
        return new BadRequestException("The token is already acquired by this company");
      }

      await this.appService.database.token.update({
        where: { id },
        data: { acquirer: { disconnect: { ownerId: token.acquirerId! } } },
      });

      await this.appService.database.token.update({
        where: { id },
        data: { acquirer: { connect: { ownerId: acquirerId } } },
      });

      return "Successfully!, connected the company to the token";
    }

    if (!(token.acquirerId === acquirerId)) {
      return new BadRequestException("The token has not been acquired by this company before");
    }

    await this.appService.database.token.update({
      where: { id },
      data: { acquirer: { disconnect: { ownerId: acquirerId } } },
    });

    return "Successfully!, disconnected the company from the token";
  }

  async updateTokenBank(
    data: APIUpdateTokenBank,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id, bankId } = data;

    const token = await this.appService.database.token.findUnique({
      where: { id },
      include: { bank: true },
    });

    if (!token) {
      return new BadRequestException("Token with the given id is not found");
    }

    const bank = await this.appService.database.bank.findUnique({
      where: { id: bankId },
    });

    if (!bank) {
      return new BadRequestException("Bank with the given id is not found");
    }

    const hasBank = token.bank.find((bank) => {
      return bank.id === bankId;
    });

    if (connect) {
      if (hasBank) {
        return new BadRequestException("The token is already stored in the given bank");
      }

      await this.appService.database.token.update({
        where: { id },
        data: { bank: { connect: { id: bankId } } },
      });

      return "Successfully!, connected the token to the bank";
    }

    if (!hasBank) {
      return new BadRequestException("The token was previously not stored in the bank");
    }

    await this.appService.database.token.update({
      where: { id },
      data: { bank: { disconnect: { id: bankId } } },
    });

    return "Successfully!, disconnected the token from the bank";
  }
}
