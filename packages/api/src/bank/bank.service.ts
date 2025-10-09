import { APIUpdateBankInfo, APIUpdateBankShares, APIUpdateBankToken } from "src/types/bank";
import { BadRequestException, Injectable } from "@nestjs/common";

import { AppService } from "src/app.service";
import { Bank } from "@prisma/client";

@Injectable()
export class BankService {
  constructor(private readonly appService: AppService) {}

  async find(id: string): Promise<BadRequestException | Bank> {
    const bank: Bank | null = await this.appService.database.bank.findUnique({
      where: { id },
      include: {
        shares: true,
        tokens: true,
        user: true,
      },
    });

    if (!bank) {
      return new BadRequestException("Invalid request!, bank with the id is not found");
    }

    return bank;
  }

  async create(id: string): Promise<string | BadRequestException> {
    const bank = await this.appService.database.bank.findUnique({
      where: { id },
    });

    if (bank) {
      return new BadRequestException("Invalid request!, bank with the id already exists");
    }

    await this.appService.database.user.update({
      where: { id },
      data: { bank: { create: true } },
    });

    return "Successfully!, created bank for the user";
  }

  async updateBankInfo(data: APIUpdateBankInfo): Promise<string | BadRequestException> {
    const { id, points, tier, deposit } = data;

    const bank = await this.appService.database.bank.findUnique({
      where: { id },
    });

    if (!bank) {
      return new BadRequestException("Invalid request!, bank with the id is not found");
    }

    await this.appService.database.bank.update({
      where: { id },
      data: {
        points: points || bank.points,
        tier: tier || bank.tier,
        deposit: deposit || bank.deposit,
      },
    });

    return "Successfully!, updated bank's info";
  }

  async updateBankToken(
    data: APIUpdateBankToken,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id, tokenId } = data;

    const bank = await this.appService.database.bank.findUnique({
      where: { id },
      include: { tokens: true },
    });

    if (!bank) {
      return new BadRequestException("Invalid request!, bank with he id is not found");
    }

    const token = await this.appService.database.token.findUnique({
      where: { id: tokenId },
    });

    if (!token) {
      return new BadRequestException("Invalid request!, token with the id is not found");
    }

    const alreadyStored = bank.tokens.find((token) => {
      return token.id === tokenId;
    });

    if (connect) {
      if (alreadyStored) {
        return new BadRequestException("Invalid request!, token is already stored in bank");
      }

      await this.appService.database.bank.update({
        where: { id },
        data: { tokens: { connect: { id: tokenId } } },
      });

      return "Successfully!, connected token to the bank";
    }

    if (!alreadyStored) {
      return new BadRequestException("Invalid request!, token is not stored in the bank");
    }

    await this.appService.database.bank.update({
      where: { id },
      data: { tokens: { disconnect: { id: tokenId } } },
    });

    return "Successfully!, disconnected token from the bank";
  }

  async updateBankShares(data: APIUpdateBankShares, connect: boolean) {
    const { id, sharesId } = data;

    const bank = await this.appService.database.bank.findUnique({
      where: { id },
      include: { shares: true },
    });

    if (!bank) {
      return new BadRequestException("Invalid request!, bank with the id is not found");
    }

    const shares = await this.appService.database.shares.findUnique({
      where: { id: sharesId },
    });

    if (!shares) {
      return new BadRequestException("Invalid request!, shares with the id is not found");
    }

    const alreadyStored = bank.shares.find((share) => {
      return share.id === sharesId;
    });

    if (connect) {
      if (alreadyStored) {
        return new BadRequestException(
          "Invalid request!, the shares are already stored in the bank",
        );
      }

      await this.appService.database.bank.update({
        where: { id },
        data: { shares: { connect: { id: sharesId } } },
      });

      return "Successfully!, connected the shares to bank";
    }

    if (!alreadyStored) {
      return new BadRequestException("Invalid request!, the shares are not stored in the bank");
    }

    await this.appService.database.bank.update({
      where: { id },
      data: { shares: { disconnect: { id: sharesId } } },
    });

    return "Successfully!, disconnected the shares from bank";
  }
}
