import { Controller, Get, Param, ParseBoolPipe, Post, Put, Req } from "@nestjs/common";
import { PowerUpService } from "./powerup.service";
import { Request } from "express";
import InstanceOf from "src/types/providers/InstanceOf";
import {
  APICreatePowerUp,
  APIFindPowerUp,
  APIUpdatePowerUpInfo,
  APIUpdatePowerUpItem,
} from "src/types/powerup";

@Controller()
export class PowerUpController {
  constructor(private readonly powerUpService: PowerUpService) {}

  @Get("powerup")
  async find(@Req() req: Request) {
    if (
      !(InstanceOf<APIFindPowerUp>(req.body, "id") && InstanceOf<APIFindPowerUp>(req.body, "name"))
    ) {
      return "Invalid request body, missing id/name";
    }

    return await this.powerUpService.find(req.body);
  }

  @Post("powerup")
  async create(@Req() req: Request) {
    if (
      !(
        InstanceOf<APICreatePowerUp>(req.body, "name") ||
        InstanceOf<APICreatePowerUp>(req.body, "description")
      )
    ) {
      return "Invalid request body, missing name/description";
    }

    return await this.powerUpService.create(req.body);
  }

  @Put("powerup/update/info")
  async updatePowerUpInfo(@Req() req: Request) {
    if (!InstanceOf<APIUpdatePowerUpInfo>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    if (
      !(
        InstanceOf<APIUpdatePowerUpInfo>(req.body, "name") &&
        InstanceOf<APIUpdatePowerUpInfo>(req.body, "description") &&
        InstanceOf<APIUpdatePowerUpInfo>(req.body, "multiplier")
      )
    ) {
      return "Invalid request body, missing properties";
    }

    return await this.powerUpService.updatePowerUpInfo(req.body);
  }

  @Put("powerup/update/item")
  async updatePowerUpItem(@Req() req: Request, @Param("connect", ParseBoolPipe) connect: boolean) {
    if (
      !(
        InstanceOf<APIUpdatePowerUpItem>(req.body, "id") ||
        InstanceOf<APIUpdatePowerUpItem>(req.body, "itemId")
      )
    ) {
      return "Invalid request body, missing id/itemId";
    }

    return await this.powerUpService.updatePowerUpItem(req.body, connect);
  }
}
