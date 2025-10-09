import { Request } from "express";
import { CompanyService } from "./company.service";
import { Controller, Get, Param, ParseBoolPipe, Post, Put, Req } from "@nestjs/common";
import InstanceOf from "src/types/providers/InstanceOf";
import {
  APICreateCompany,
  APIFindCompany,
  APIUpdateCompanyInfo,
  APIUpdateCompanyShares,
  APIUpdateCompanyToken,
  APIUpdateCompanyUser,
} from "src/types/company";

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get("company")
  async find(@Req() req: Request) {
    if (!InstanceOf<APIFindCompany>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    return await this.companyService.find(req.body.id);
  }

  @Post("company")
  async create(@Req() req: Request) {
    if (!InstanceOf<APICreateCompany>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    return await this.companyService.create(req.body.id);
  }

  @Put("company/update/info")
  async updateCompanyInfo(@Req() req: Request) {
    if (!InstanceOf<APIUpdateCompanyInfo>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    if (
      !(
        InstanceOf<APIUpdateCompanyInfo>(req.body, "salary") &&
        InstanceOf<APIUpdateCompanyInfo>(req.body, "hiring") &&
        InstanceOf<APIUpdateCompanyInfo>(req.body, "credibility")
      )
    ) {
      return "Invalid request body, missing properties";
    }

    return await this.companyService.updateCompanyInfo(req.body);
  }

  @Put("company/update/user")
  async updateCompanyUser(@Req() req: Request, @Param("connect", ParseBoolPipe) connect: boolean) {
    if (!InstanceOf<APIUpdateCompanyUser>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    if (
      !(
        InstanceOf<APIUpdateCompanyUser>(req.body, "partnerId") &&
        InstanceOf<APIUpdateCompanyUser>(req.body, "employeeId")
      )
    ) {
      return "Invalid request body, missing properties";
    }

    return await this.companyService.updateCompanyUser(req.body, connect);
  }

  @Put("company/update/shares")
  async updateCompanyShares(
    @Req() req: Request,
    @Param("connect", ParseBoolPipe) connect: boolean,
  ) {
    if (!InstanceOf<APIUpdateCompanyShares>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    return await this.companyService.updateCompanyShares(req.body, connect);
  }

  @Put("company/update/token")
  async updateCompanyToken(@Req() req: Request, @Param("connect", ParseBoolPipe) connect: boolean) {
    if (
      !InstanceOf<APIUpdateCompanyToken>(req.body, "id") ||
      !InstanceOf<APIUpdateCompanyToken>(req.body, "tokenId")
    ) {
      return "Invalid request body, missing id/tokenId";
    }

    return await this.companyService.updateCompanyToken(req.body, connect);
  }
}
