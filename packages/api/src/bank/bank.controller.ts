import { Request } from "express";
import { BankService } from "./bank.service";
import { Controller, Get, Param, ParseBoolPipe, Post, Put, Req } from "@nestjs/common";
import InstanceOf from "src/types/providers/InstanceOf";
import {
  APICreateBank,
  APIFindBank,
  APIUpdateBankInfo,
  APIUpdateBankShares,
  APIUpdateBankToken,
} from "src/types/bank";

@Controller()
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get("bank")
  async find(@Req() req: Request) {
    if (!InstanceOf<APIFindBank>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    return await this.bankService.find(req.body.id);
  }

  @Post("bank")
  async create(@Req() req: Request) {
    if (!InstanceOf<APICreateBank>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    return await this.bankService.create(req.body.id);
  }

  @Put("bank/update/info")
  async updateBankInfo(@Req() req: Request) {
    if (!InstanceOf<APIUpdateBankInfo>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    if (
      !(
        InstanceOf<APIUpdateBankInfo>(req.body, "points") &&
        InstanceOf<APIUpdateBankInfo>(req.body, "tier") &&
        InstanceOf<APIUpdateBankInfo>(req.body, "deposit")
      )
    ) {
      return "Invalid request body, missing properties";
    }

    return await this.bankService.updateBankInfo(req.body);
  }

  @Put("bank/update/token")
  async updateBankToken(@Req() req: Request, @Param("connect", ParseBoolPipe) connect: boolean) {
    if (
      !InstanceOf<APIUpdateBankToken>(req.body, "id") ||
      !InstanceOf<APIUpdateBankToken>(req.body, "tokenId")
    ) {
      return "Invalid request body, missing id/tokenId";
    }

    return await this.bankService.updateBankToken(req.body, connect);
  }

  @Put("bank/update/shares")
  async updateBankShares(@Req() req: Request, @Param("connect", ParseBoolPipe) connect: boolean) {
    if (
      !InstanceOf<APIUpdateBankShares>(req.body, "id") ||
      !InstanceOf<APIUpdateBankShares>(req.body, "sharesId")
    ) {
      return "Invalid request body, missing id/sharesId";
    }

    return await this.bankService.updateBankShares(req.body, connect);
  }
}
