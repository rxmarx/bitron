import { AppService } from "src/app.service";
import { BankController } from "./bank.controller";
import { BankService } from "./bank.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [BankController],
  providers: [BankService, AppService],
})
export class BankModule {}
