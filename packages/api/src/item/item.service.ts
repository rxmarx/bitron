import {
  APICreateItem,
  APIFindItem,
  APIUpdateItemInfo,
  APIUpdateItemPowerUp,
  APIUpdateItemUser,
} from "src/types/item";
import { BadRequestException, Injectable } from "@nestjs/common";

import { AppService } from "src/app.service";
import { Item } from "@prisma/client";

@Injectable()
export class ItemService {
  constructor(private readonly appService: AppService) {}

  async find(data: APIFindItem): Promise<BadRequestException | Item> {
    const { id, name } = data;

    if (name) {
      const item: Item | null = await this.appService.database.item.findFirst({
        where: { name },
        include: {
          powerUps: true,
          users: true,
        },
      });

      if (!item) {
        return new BadRequestException("Item with the given name is not found");
      }

      return item;
    }

    const item: Item | null = await this.appService.database.item.findUnique({
      where: { id },
      include: {
        powerUps: true,
        users: true,
      },
    });

    if (!item) {
      return new BadRequestException("Item with the given id is not found");
    }

    return item;
  }

  async create(data: APICreateItem): Promise<string | BadRequestException> {
    const { name, description, category } = data;

    const item = await this.appService.database.item.findFirst({
      where: { name },
    });

    if (item) {
      return new BadRequestException("Item with the given name already exists");
    }

    await this.appService.database.item.create({
      data: { name, description, category },
    });

    return "Successfully!, created item with the name";
  }

  async updateItemInfo(data: APIUpdateItemInfo): Promise<string | BadRequestException> {
    const { id, description, cost, level, category, stealable } = data;

    const item = await this.appService.database.item.findUnique({
      where: { id },
    });

    if (!item) {
      return new BadRequestException("Item with the given id is not found");
    }

    await this.appService.database.item.update({
      where: { id },
      data: {
        description: description || item.description,
        cost: cost || item.cost,
        level: level || item.level,
        category: category || item.category,
        stealable: stealable || item.stealable,
      },
    });

    return "Successfully!, updated the item with the id";
  }

  async updateItemUser(
    data: APIUpdateItemUser,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id, userId } = data;

    const item = await this.appService.database.item.findUnique({
      where: { id },
      include: { users: true },
    });

    if (!item) {
      return new BadRequestException("Item with the given id is not found");
    }

    const user = await this.appService.database.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new BadRequestException("User with the given id is not found");
    }

    const hasUser = item.users.find((user) => {
      return user.id === userId;
    });

    if (connect) {
      if (hasUser) {
        return new BadRequestException("User already owns the item");
      }

      await this.appService.database.item.update({
        where: { id },
        data: { users: { connect: { id: userId } } },
      });

      return "Successfully!, connected user to the item";
    }

    if (!hasUser) {
      return new BadRequestException("User doesn't own the item");
    }

    await this.appService.database.item.update({
      where: { id },
      data: { users: { disconnect: { id: userId } } },
    });

    return "Successfully!, disconnected user from the item";
  }

  async updateItemPowerUp(
    data: APIUpdateItemPowerUp,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id, powerUpId } = data;

    const item = await this.appService.database.item.findUnique({
      where: { id },
      include: { powerUps: true },
    });

    if (!item) {
      return new BadRequestException("Item with the given id is not found");
    }

    const powerUp = await this.appService.database.powerUp.findUnique({
      where: { id: powerUpId },
    });

    if (!powerUp) {
      return new BadRequestException("Power up with the given id is not found");
    }

    const hasPowerUp = item.powerUps.find((powerUp) => {
      return powerUp.id === powerUpId;
    });

    if (connect) {
      if (hasPowerUp) {
        return new BadRequestException("The item already contains the power up");
      }

      await this.appService.database.item.update({
        where: { id },
        data: { powerUps: { connect: { id: powerUpId } } },
      });

      return "Successfully!, connected power up with the item";
    }
    if (!hasPowerUp) {
      return new BadRequestException("The item doesn't contain the power up");
    }

    await this.appService.database.item.update({
      where: { id },
      data: { powerUps: { disconnect: { id: powerUpId } } },
    });

    return "Successfully!, disconnected power up from the item";
  }
}
