import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Req,
} from "@nestjs/common";
import { TokenService } from "./token.service";
import { Request } from "express";
import InstanceOf from "src/types/providers/InstanceOf";
import {
  APICreateToken,
  APIFindToken,
  APIUpdateTokenBank,
  APIUpdateTokenCompany,
  APIUpdateTokenInfo,
  APIUpdateTokenUser,
} from "src/types/token";

@Controller()
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get("token")
  async find(@Req() req: Request) {
    if (
      !(
        InstanceOf<APIFindToken>(req.body, "id") &&
        InstanceOf<APIFindToken>(req.body, "title")
      )
    ) {
      return "Invalid request body, missing id/title";
    }

    return await this.tokenService.find(req.body);
  }

  @Post("token")
  async create(@Req() req: Request) {
    if (
      !(
        InstanceOf<APICreateToken>(req.body, "id") &&
        InstanceOf<APICreateToken>(req.body, "title") &&
        InstanceOf<APICreateToken>(req.body, "description")
      )
    ) {
      return "Invalid request body, missing id/title/description";
    }

    return await this.tokenService.create(req.body);
  }

  @Put("token/update/info")
  async updateTokenInfo(@Req() req: Request) {
    if (!InstanceOf<APIUpdateTokenInfo>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    if (
      !(
        InstanceOf<APIUpdateTokenInfo>(req.body, "title") &&
        InstanceOf<APIUpdateTokenInfo>(req.body, "description") &&
        InstanceOf<APIUpdateTokenInfo>(req.body, "points") &&
        InstanceOf<APIUpdateTokenInfo>(req.body, "tier") &&
        InstanceOf<APIUpdateTokenInfo>(req.body, "sales") &&
        InstanceOf<APIUpdateTokenInfo>(req.body, "price") &&
        InstanceOf<APIUpdateTokenInfo>(req.body, "salesPerTier")
      )
    ) {
      return "Invalid request body, missing properties";
    }

    return await this.tokenService.updateTokenInfo(req.body);
  }

  @Put("token/update/user")
  async updateTokenUser(
    @Req() req: Request,
    @Param("connect", ParseBoolPipe) connect: boolean,
  ) {
    if (
      !(
        InstanceOf<APIUpdateTokenUser>(req.body, "id") &&
        InstanceOf<APIUpdateTokenUser>(req.body, "creatorId") &&
        InstanceOf<APIUpdateTokenUser>(req.body, "buyerId")
      )
    ) {
      return "Invalid request body, missing id/creatorId/buyerId";
    }

    return await this.tokenService.updateTokenUser(req.body, connect);
  }

  @Put("token/update/company")
  async updateTokenCompany(
    @Req() req: Request,
    @Param("connect", ParseBoolPipe) connect: boolean,
  ) {
    if (
      !(
        InstanceOf<APIUpdateTokenCompany>(req.body, "id") &&
        InstanceOf<APIUpdateTokenCompany>(req.body, "acquirerId")
      )
    ) {
      return "Invalid request body, missing id/acquirerId";
    }

    return await this.tokenService.updateTokenCompany(req.body, connect);
  }

  @Put("token/update/bank")
  async updateTokenBank(
    @Req() req: Request,
    @Param("connect", ParseBoolPipe) connect: boolean,
  ) {
    if (
      !(
        InstanceOf<APIUpdateTokenBank>(req.body, "id") &&
        InstanceOf<APIUpdateTokenBank>(req.body, "bankId")
      )
    ) {
      return "Invalid request body, missing id/bankId";
    }

    return await this.tokenService.updateTokenBank(req.body, connect);
  }
}
