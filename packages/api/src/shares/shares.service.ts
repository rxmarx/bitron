import {
  APIUpdateSharesBank,
  APIUpdateSharesInfo,
  APIUpdateSharesUser,
} from "src/types/shares";
import { BadRequestException, Injectable } from "@nestjs/common";

import { AppService } from "src/app.service";
import { Shares } from "@prisma/client";

@Injectable()
export class SharesService {
  constructor(private readonly appService: AppService) {}

  async find(id: string): Promise<BadRequestException | Shares> {
    const shares: Shares | null =
      await this.appService.database.shares.findUnique({
        where: { id },
        include: {
          bank: true,
          company: true,
          holders: true,
        },
      });

    if (!shares) {
      return new BadRequestException("Shares with the given id is not found");
    }

    return shares;
  }

  async create(id: string): Promise<string | BadRequestException> {
    const shares = await this.appService.database.shares.findUnique({
      where: { id },
    });

    if (shares) {
      return new BadRequestException("Shares with the given id already exists");
    }

    await this.appService.database.company.update({
      where: { ownerId: id },
      data: { shares: { create: true } },
    });

    return "Successfully!, created shares for the company";
  }

  async updateSharesInfo(
    data: APIUpdateSharesInfo,
  ): Promise<string | BadRequestException> {
    const { id, count, value } = data;

    const shares = await this.appService.database.shares.findUnique({
      where: { id },
    });

    if (!shares) {
      return new BadRequestException("Shares with the given id is not found");
    }

    await this.appService.database.shares.update({
      where: { id },
      data: { count: count || shares.count, value: value || shares.value },
    });

    return "Successfully!, updated shares info";
  }

  async updateSharesUser(
    data: APIUpdateSharesUser,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id, holderId } = data;

    const shares = await this.appService.database.shares.findUnique({
      where: { id },
      include: { holders: true },
    });

    if (!shares) {
      return new BadRequestException("Shares with the given id is not found");
    }

    const user = await this.appService.database.user.findUnique({
      where: { id: holderId },
    });

    if (!user) {
      return new BadRequestException("User with the given id is not found");
    }

    const alreadyHolder = shares.holders.find((user) => {
      return user.id === holderId;
    });

    if (connect) {
      if (alreadyHolder) {
        return new BadRequestException(
          "The user is already a holder of the shares",
        );
      }

      await this.appService.database.shares.update({
        where: { id },
        data: { holders: { connect: { id: holderId } } },
      });

      return "Successfully!, connected the user to the shares";
    }
    if (!alreadyHolder) {
      return new BadRequestException("The user is not a holder of the shares");
    }

    await this.appService.database.shares.update({
      where: { id },
      data: { holders: { disconnect: { id: holderId } } },
    });

    return "Successfully!, disconnected the user from the shares";
  }

  async updateSharesBank(
    data: APIUpdateSharesBank,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id, bankId } = data;

    const shares = await this.appService.database.shares.findUnique({
      where: { id },
      include: { bank: true },
    });

    if (!shares) {
      return new BadRequestException("Shares with the given id is not found");
    }

    const bank = await this.appService.database.bank.findUnique({
      where: { id: bankId },
    });

    if (!bank) {
      return new BadRequestException("Bank with the given id is not found");
    }

    const hasBank = shares.bank.find((bank) => {
      return bank.id === bankId;
    });

    if (connect) {
      if (hasBank) {
        return new BadRequestException(
          "The shares are already stored in the given bank",
        );
      }

      await this.appService.database.shares.update({
        where: { id },
        data: { bank: { connect: { id: bankId } } },
      });

      return "Successfully!, connected the bank to the shares";
    }
    if (!hasBank) {
      return new BadRequestException(
        "The shares aren't stored in the given bank",
      );
    }

    await this.appService.database.shares.update({
      where: { id },
      data: { bank: { disconnect: { id: bankId } } },
    });

    return "Successfully!, disconnected the bank from the shares";
  }
}
