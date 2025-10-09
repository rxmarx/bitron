import { Controller, Get, Param, ParseBoolPipe, Post, Put, Req } from "@nestjs/common";
import { Request } from "express";
import { UserService } from "./user.service";
import {
  APICreateUser,
  APIFindUser,
  APIUpdateUserBank,
  APIUpdateUserCompany,
  APIUpdateUserInfo,
  APIUpdateUserItem,
  APIUpdateUserShares,
  APIUpdateUserToken,
} from "src/types/user";
import InstanceOf from "src/types/providers/InstanceOf";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("user")
  async find(@Req() req: Request) {
    if (!InstanceOf<APIFindUser>(req.body, "id")) {
      return "Invalid request body, missing credentials";
    }

    const body: APIFindUser = req.body;

    return await this.userService.find(body.id);
  }

  @Post("user")
  async create(@Req() req: Request) {
    if (!InstanceOf<APICreateUser>(req.body, "id")) {
      return "Invalid request body, missing user's id";
    }
    if (!InstanceOf<APICreateUser>(req.body, "username")) {
      return "Invalid request body, missing user's username";
    }

    return await this.userService.create(req.body);
  }

  @Put("user/update/info")
  async updateUserInfo(@Req() req: Request) {
    if (!InstanceOf<APIUpdateUserInfo>(req.body, "id")) {
      return "Invalid request body, missing user's id";
    }

    return await this.userService.updateUserInfo(req.body);
  }

  @Put("user/update/company")
  async updateUserCompany(@Req() req: Request, @Param("connect", ParseBoolPipe) connect: boolean) {
    if (!InstanceOf<APIUpdateUserCompany>(req.body, "id")) {
      return "Invalid request body, missing user's id";
    }

    if (
      !(
        InstanceOf<APIUpdateUserCompany>(req.body, "companyId") &&
        InstanceOf<APIUpdateUserCompany>(req.body, "partneredCompanyId") &&
        InstanceOf<APIUpdateUserCompany>(req.body, "partneredCompanyId")
      )
    ) {
      return "Invalid request body, missing company id";
    }

    return await this.userService.updateUserCompany(req.body, connect);
  }

  @Put("user/update/shares")
  async updateUserShares(@Req() req: Request, @Param("connect", ParseBoolPipe) connect: boolean) {
    if (!InstanceOf<APIUpdateUserShares>(req.body, "id")) {
      return "Invalid request body, missing user's id";
    }

    if (!InstanceOf<APIUpdateUserShares>(req.body, "sharesId")) {
      return "Invalid request body, missing shares' id";
    }

    return await this.userService.updateUserShares(req.body, connect);
  }

  @Put("user/update/bank")
  async updateUserBank(@Req() req: Request, @Param("connect", ParseBoolPipe) connect: boolean) {
    if (!InstanceOf<APIUpdateUserBank>(req.body, "id")) {
      return "Invalid request body, missing user/bank's id";
    }

    return await this.userService.updateUserBank(req.body, connect);
  }

  @Put("user/update/token")
  async updateUserToken(@Req() req: Request, @Param("connect", ParseBoolPipe) connect: boolean) {
    if (!InstanceOf<APIUpdateUserBank>(req.body, "id")) {
      return "Invalid request body, missing user/bank's id";
    }

    if (
      !(
        InstanceOf<APIUpdateUserToken>(req.body, "createdTokenId") &&
        InstanceOf<APIUpdateUserToken>(req.body, "purchasedTokenId")
      )
    ) {
      return "Invalid request body, missing token ids";
    }

    return await this.userService.updateUserToken(req.body, connect);
  }

  @Put("user/update/item")
  async updateUserItem(@Req() req: Request, @Param("connect", ParseBoolPipe) connect: boolean) {
    if (!InstanceOf<APIUpdateUserItem>(req.body, "id")) {
      return "Invalid request body, missing user id";
    }

    if (!InstanceOf<APIUpdateUserItem>(req.body, "itemId")) {
      return "Invalid request body, missing item id";
    }

    return await this.userService.updateUserItem(req.body, connect);
  }
}
