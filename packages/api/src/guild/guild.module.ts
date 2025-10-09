import { AppService } from "src/app.service";
import { GuildController } from "./guild.controller";
import { GuildService } from "./guild.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [GuildController],
  providers: [GuildService, AppService],
})
export class GuildModule {}
