import { AppService } from "src/app.service";
import { Module } from "@nestjs/common";
import { PowerUpController } from "./powerup.controller";
import { PowerUpService } from "./powerup.service";

@Module({
  controllers: [PowerUpController],
  providers: [PowerUpService, AppService],
})
export class PowerUpModule {}
