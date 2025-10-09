import {
  APICreatePowerUp,
  APIFindPowerUp,
  APIUpdatePowerUpInfo,
  APIUpdatePowerUpItem,
} from "src/types/powerup";
import { BadRequestException, Injectable } from "@nestjs/common";

import { AppService } from "src/app.service";
import { PowerUp } from "@prisma/client";

@Injectable()
export class PowerUpService {
  constructor(private readonly appService: AppService) {}

  async find(data: APIFindPowerUp): Promise<BadRequestException | PowerUp> {
    const { id, name } = data;

    if (name) {
      const powerUp = await this.appService.database.powerUp.findFirst({
        where: { name },
      });

      if (!powerUp) {
        return new BadRequestException("Power up with the given name is not found");
      }

      return powerUp;
    }

    const powerUp = await this.appService.database.powerUp.findUnique({
      where: { id },
    });

    if (!powerUp) {
      return new BadRequestException("Power up with the given id is not found");
    }

    return powerUp;
  }

  async create(data: APICreatePowerUp): Promise<string | BadRequestException> {
    const { name, description } = data;

    const powerUp = await this.appService.database.powerUp.findFirst({
      where: { name },
    });

    if (powerUp) {
      return new BadRequestException("Power up with the given name already exists");
    }

    await this.appService.database.powerUp.create({
      data: { name, description },
    });

    return "Successfully!, created power up";
  }

  async updatePowerUpInfo(data: APIUpdatePowerUpInfo): Promise<string | BadRequestException> {
    const { id, name, description, multiplier } = data;

    const powerUp = await this.appService.database.powerUp.findUnique({
      where: { id },
    });

    if (!powerUp) {
      return new BadRequestException("Power up with given id is not found");
    }

    await this.appService.database.powerUp.update({
      where: { id },
      data: {
        name: name || powerUp.name,
        description: description || powerUp.description,
        multiplier: multiplier || powerUp.multiplier,
      },
    });

    return "Successfully!, updated the power up";
  }

  async updatePowerUpItem(
    data: APIUpdatePowerUpItem,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id, itemId } = data;

    const powerUp = await this.appService.database.powerUp.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!powerUp) {
      return new BadRequestException("Power up with the given id is not found");
    }

    const item = await this.appService.database.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return new BadRequestException("Item with the given id is not found");
    }

    const hasItem = powerUp.items.find((item) => {
      return item.id === itemId;
    });

    if (connect) {
      if (hasItem) {
        return new BadRequestException("Item with the given id is has the power up already");
      }

      await this.appService.database.powerUp.update({
        where: { id },
        data: { items: { connect: { id: itemId } } },
      });

      return "Successfully!, connected item to the power up";
    }
    if (!hasItem) {
      return new BadRequestException("Item with the given id doesn't have the power up");
    }

    await this.appService.database.powerUp.update({
      where: { id },
      data: { items: { disconnect: { id: itemId } } },
    });

    return "Successfully!, disconnected item from the power up";
  }
}
