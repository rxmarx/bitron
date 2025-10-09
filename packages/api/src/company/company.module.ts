import { AppService } from "src/app.service";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, AppService],
})
export class CompanyModule {}
