import { Controller, Get, Param, ParseBoolPipe, Post, Put, Req } from "@nestjs/common";
import { ItemService } from "./item.service";
import {
  APICreateItem,
  APIFindItem,
  APIUpdateItemInfo,
  APIUpdateItemPowerUp,
  APIUpdateItemUser,
} from "src/types/item";
import { Request } from "express";
import InstanceOf from "src/types/providers/InstanceOf";

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get("item")
  async find(@Req() req: Request) {
    if (!(InstanceOf<APIFindItem>(req.body, "id") && InstanceOf<APIFindItem>(req.body, "name"))) {
      return "Invalid request body, missing id/name";
    }

    await this.itemService.find(req.body);
  }

  @Post("item")
  async create(@Req() req: Request) {
    if (
      !(
        InstanceOf<APICreateItem>(req.body, "name") ||
        InstanceOf<APICreateItem>(req.body, "description") ||
        InstanceOf<APICreateItem>(req.body, "category")
      )
    ) {
      return "Invalid request body, missing name/description/category";
    }

    await this.itemService.create(req.body);
  }

  @Put("item/update/info")
  async updateItemInfo(@Req() req: Request) {
    if (!InstanceOf<APIUpdateItemInfo>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    if (
      !(
        InstanceOf<APIUpdateItemInfo>(req.body, "description") &&
        InstanceOf<APIUpdateItemInfo>(req.body, "cost") &&
        InstanceOf<APIUpdateItemInfo>(req.body, "level") &&
        InstanceOf<APIUpdateItemInfo>(req.body, "category") &&
        InstanceOf<APIUpdateItemInfo>(req.body, "stealable")
      )
    ) {
      return "Invalid request body, missing properties";
    }

    await this.itemService.updateItemInfo(req.body);
  }

  @Put("item/update/user")
  async updateItemUser(@Req() req: Request, @Param("connect", ParseBoolPipe) connect: boolean) {
    if (
      !(
        InstanceOf<APIUpdateItemUser>(req.body, "id") ||
        InstanceOf<APIUpdateItemUser>(req.body, "userId")
      )
    ) {
      return "Invalid request body, missing id/userId";
    }

    await this.itemService.updateItemUser(req.body, connect);
  }

  @Put("item/update/powerUp")
  async updateItemPowerUp(@Req() req: Request, @Param("connect", ParseBoolPipe) connect: boolean) {
    if (
      !(
        InstanceOf<APIUpdateItemPowerUp>(req.body, "id") ||
        InstanceOf<APIUpdateItemPowerUp>(req.body, "powerUpId")
      )
    ) {
      return "Invalid request body, missing id/powerUpId";
    }

    await this.itemService.updateItemPowerUp(req.body, connect);
  }
}
