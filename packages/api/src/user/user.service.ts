import {
  APICreateUser,
  APIUpdateUserBank,
  APIUpdateUserCompany,
  APIUpdateUserInfo,
  APIUpdateUserItem,
  APIUpdateUserShares,
  APIUpdateUserToken,
} from "src/types/user";
import { BadRequestException, Injectable } from "@nestjs/common";

import { AppService } from "src/app.service";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private readonly appService: AppService) {}

  async find(id: string): Promise<BadRequestException | User> {
    const user: User | null = await this.appService.database.user.findUnique({
      where: { id },
      include: {
        bank: true,
        company: true,
        createdTokens: true,
        employedIn: true,
        items: true,
        partneredCompanies: true,
        purchasedTokens: true,
        shares: true,
      },
    });

    if (!user) {
      return new BadRequestException("User with the given id is not found");
    }

    return user;
  }

  async create(data: APICreateUser): Promise<string | BadRequestException> {
    const { id, username } = data;

    const user = await this.appService.database.user.findUnique({
      where: { id },
    });

    if (user) {
      return new BadRequestException("User with the given id already exists");
    }

    await this.appService.database.user.create({
      data: {
        id,
        username,
      },
    });

    return "Successfully! added user to database";
  }

  async updateUserInfo(data: APIUpdateUserInfo): Promise<string | BadRequestException> {
    const { id, bits, commandsRan, subscription, job, timePlayed, jail } = data;

    const user = await this.appService.database.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return new BadRequestException("User with the given id is not found");
    }

    await this.appService.database.user.update({
      where: {
        id,
      },
      data: {
        bits: bits || user.bits,
        commandsRan: commandsRan || user.commandsRan,
        subscription: subscription || user.subscription,
        job: job || user.job,
        timePlayed: timePlayed || user.timePlayed,
        jail: jail || user.jail,
      },
    });

    return "Successfully! updated user info";
  }

  async updateUserCompany(
    data: APIUpdateUserCompany,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id, companyId, partneredCompanyId, employedIn } = data;

    const user = await this.appService.database.user.findUnique({
      where: { id },
      include: { company: true, partneredCompanies: true },
    });

    if (!user) {
      return new BadRequestException("User with the given id is not found");
    }

    const company = await this.appService.database.company.findUnique({
      where: { ownerId: companyId || partneredCompanyId || employedIn },
    });

    if (!company) {
      return new BadRequestException("Company with the given id is not found");
    }

    if (connect && companyId) {
      if (user.company?.ownerId === companyId) {
        return new BadRequestException("The given company is already connected to the user");
      }

      await this.appService.database.user.update({
        where: { id },
        data: { company: { connect: { ownerId: companyId } } },
      });
      return "Successfully! connected user's company";
    } else if (companyId) {
      if (!(user.company?.ownerId === companyId)) {
        return new BadRequestException("The user doesn't have the company");
      }

      await this.appService.database.user.update({
        where: { id },
        data: { company: { disconnect: { ownerId: companyId } } },
      });
      return "Successfully! disconnected user's company";
    }

    const alreadyPartnered = user.partneredCompanies.find((company) => {
      return company.ownerId === partneredCompanyId;
    });

    if (connect && partneredCompanyId) {
      if (alreadyPartnered) {
        return new BadRequestException("The given company is already partnered by the user");
      }

      await this.appService.database.user.update({
        where: { id },
        data: {
          partneredCompanies: { connect: { ownerId: partneredCompanyId } },
        },
      });
      return "Successfully! connected user's partnered company";
    } else if (partneredCompanyId) {
      if (!alreadyPartnered) {
        return new BadRequestException("The given company isn't partnered by the user");
      }

      await this.appService.database.user.update({
        where: { id },
        data: {
          partneredCompanies: { disconnect: { ownerId: partneredCompanyId } },
        },
      });
      return "Successfully! disconnected user's partnered company";
    }

    if (connect && employedIn) {
      if (user.employedInId === employedIn) {
        return new BadRequestException("The given company has already employed the user");
      }

      await this.appService.database.user.update({
        where: { id },
        data: { employedIn: { connect: { ownerId: employedIn } } },
      });
      return "Successfully! connected user's employed company";
    } else if (employedIn) {
      if (!(user.employedInId === employedIn)) {
        return new BadRequestException("The given company has not employed the user");
      }

      await this.appService.database.user.update({
        where: { id },
        data: { employedIn: { disconnect: { ownerId: employedIn } } },
      });
      return "Successfully! disconnected user's employed company";
    }

    return "Successfully! updated user's company";
  }

  async updateUserShares(
    data: APIUpdateUserShares,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id, sharesId } = data;

    const user = await this.appService.database.user.findUnique({
      where: { id },
      include: { shares: true },
    });

    if (!user) {
      return new BadRequestException("User with the given id is not found");
    }

    const shares = await this.appService.database.shares.findUnique({
      where: { id: sharesId },
    });

    if (!shares) {
      return new BadRequestException("Shares with the given id is not found");
    }

    const hasShares = user.shares.find((share) => {
      return share.id === sharesId;
    });

    if (connect) {
      if (hasShares) {
        return new BadRequestException("The user already has the given shares");
      }

      await this.appService.database.user.update({
        where: { id },
        data: { shares: { connect: { id: sharesId } } },
      });

      return "Successfully! connected shares to the user";
    }

    if (!hasShares) {
      return new BadRequestException("The user doesn't have the given shares");
    }

    await this.appService.database.user.update({
      where: { id },
      data: { shares: { disconnect: { id: sharesId } } },
    });

    return "Successfully! disconnected the shares from user";
  }

  async updateUserBank(
    data: APIUpdateUserBank,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id } = data;

    const user = await this.appService.database.user.findUnique({
      where: { id },
      include: { bank: true },
    });

    if (!user) {
      return new BadRequestException("User with the given id is not found");
    }

    const bank = await this.appService.database.bank.findUnique({
      where: { id },
    });

    if (!bank) {
      return new BadRequestException("Bank with the given id is not found");
    }

    if (connect) {
      if (user.bank?.id === id) {
        return new BadRequestException("The user already has the bank connected");
      }

      await this.appService.database.user.update({
        where: { id },
        data: { bank: { connect: { id } } },
      });

      return "Successfully! connected bank to the user";
    }

    if (!(user.bank?.id === id)) {
      return new BadRequestException("The user doesn't have the bank connected before");
    }

    await this.appService.database.user.update({
      where: { id },
      data: { bank: { disconnect: { id } } },
    });

    return "Successfully! disconnected the bank from user";
  }

  async updateUserToken(
    data: APIUpdateUserToken,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id, createdTokenId, purchasedTokenId } = data;

    const user = await this.appService.database.user.findUnique({
      where: { id },
      include: { createdTokens: true, purchasedTokens: true },
    });

    if (!user) {
      return new BadRequestException("User with the given id is not found");
    }

    const token = await this.appService.database.token.findUnique({
      where: { id: createdTokenId || purchasedTokenId },
    });

    if (!token) {
      return new BadRequestException("Token with the given id is not found");
    }

    const hasCreatedToken = user.createdTokens.find((token) => {
      return token.id === createdTokenId;
    });

    const hasPurchasedToken = user.purchasedTokens.find((token) => {
      return token.id === purchasedTokenId;
    });

    if (connect && createdTokenId) {
      if (hasCreatedToken) {
        return new BadRequestException("The user has already created the token");
      }

      await this.appService.database.user.update({
        where: { id },
        data: { createdTokens: { connect: { id: createdTokenId } } },
      });

      return "Successfully! connected the token to user";
    } else if (createdTokenId) {
      if (!hasCreatedToken) {
        return new BadRequestException("The user didn't create this token before");
      }

      await this.appService.database.user.update({
        where: { id },
        data: { createdTokens: { disconnect: { id: createdTokenId } } },
      });

      return "Successfully! disconnected the token to user";
    }

    if (connect && purchasedTokenId) {
      if (hasPurchasedToken) {
        return new BadRequestException("The user has already purchased the token");
      }

      await this.appService.database.user.update({
        where: { id },
        data: { purchasedTokens: { connect: { id: purchasedTokenId } } },
      });

      return "Successfully! connected the token to user";
    } else if (purchasedTokenId) {
      if (!hasPurchasedToken) {
        return new BadRequestException("The user didn't purchase this token before");
      }

      await this.appService.database.user.update({
        where: { id },
        data: { purchasedTokens: { disconnect: { id: purchasedTokenId } } },
      });

      return "Successfully! disconnected the token from user";
    }

    return "Successfully! updated user's tokens";
  }

  async updateUserItem(
    data: APIUpdateUserItem,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id, itemId } = data;

    const user = await this.appService.database.user.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!user) {
      return new BadRequestException("User with the given id is not found");
    }

    const item = await this.appService.database.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return new BadRequestException("Item with the given id is not found");
    }

    const hasItem = user.items.find((item) => {
      return item.id === itemId;
    });

    if (connect) {
      if (hasItem) {
        return new BadRequestException("The user already has this item");
      }

      await this.appService.database.user.update({
        where: { id },
        data: { items: { connect: { id: itemId } } },
      });

      return "Successfully! connected the item to user";
    }

    if (!hasItem) {
      return new BadRequestException("The user doesn't have this item before");
    }

    await this.appService.database.user.update({
      where: { id },
      data: { items: { disconnect: { id: itemId } } },
    });

    return "Successfully! disconnected the item from user";
  }
}
