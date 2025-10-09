import { AppService } from "src/app.service";
import { Module } from "@nestjs/common";
import { TokenController } from "./token.controller";
import { TokenService } from "./token.service";

@Module({
  controllers: [TokenController],
  providers: [TokenService, AppService],
})
export class TokenModule {}
