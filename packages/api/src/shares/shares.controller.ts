import { Controller, Get, Param, ParseBoolPipe, Post, Put, Req } from "@nestjs/common";
import { SharesService } from "./shares.service";
import { Request } from "express";
import InstanceOf from "src/types/providers/InstanceOf";
import {
  APICreateShares,
  APIFindShares,
  APIUpdateSharesBank,
  APIUpdateSharesInfo,
  APIUpdateSharesUser,
} from "src/types/shares";

@Controller()
export class SharesController {
  constructor(private readonly sharesService: SharesService) {}

  @Get("shares")
  async find(@Req() req: Request) {
    if (!InstanceOf<APIFindShares>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    return await this.sharesService.find(req.body.id);
  }

  @Post("shares")
  async create(@Req() req: Request) {
    if (!InstanceOf<APICreateShares>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    return await this.sharesService.create(req.body.id);
  }

  @Put("shares/update/info")
  async updateSharesInfo(@Req() req: Request) {
    if (!InstanceOf<APIUpdateSharesInfo>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    if (
      !(
        InstanceOf<APIUpdateSharesInfo>(req.body, "count") &&
        InstanceOf<APIUpdateSharesInfo>(req.body, "value")
      )
    ) {
      return "Invalid request body, missing properties";
    }

    return await this.sharesService.updateSharesInfo(req.body);
  }

  @Put("shares/update/user")
  async updateSharesUser(@Req() req: Request, @Param("connect", ParseBoolPipe) connect: boolean) {
    if (
      !InstanceOf<APIUpdateSharesUser>(req.body, "id") ||
      !InstanceOf<APIUpdateSharesUser>(req.body, "holderId")
    ) {
      return "Invalid request body, missing id/holderId";
    }

    return await this.sharesService.updateSharesUser(req.body, connect);
  }

  @Put("shares/update/bank")
  async updateSharesBank(@Req() req: Request, @Param("connect", ParseBoolPipe) connect: boolean) {
    if (
      !InstanceOf<APIUpdateSharesBank>(req.body, "id") ||
      !InstanceOf<APIUpdateSharesBank>(req.body, "bankId")
    ) {
      return "Invalid request body, missing id/bankId";
    }

    return await this.sharesService.updateSharesBank(req.body, connect);
  }
}
