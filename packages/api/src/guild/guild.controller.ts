import { Controller, Get, Header, Post, Put, Req } from "@nestjs/common";
import { GuildService } from "./guild.service";
import { Request } from "express";
import InstanceOf from "src/types/providers/InstanceOf";
import { APICreateGuild, APIFindGuild, APIUpdateGuild } from "src/types/guild";

@Controller()
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Get("guild")
  async find(@Req() req: Request) {
    if (!InstanceOf<APIFindGuild>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    return await this.guildService.find(req.body.id);
  }

  @Post("guild")
  async create(@Req() req: Request) {
    if (
      !(
        InstanceOf<APICreateGuild>(req.body, "id") ||
        InstanceOf<APICreateGuild>(req.body, "ownerId")
      )
    ) {
      return "Invalid request body, missing id/ownerId";
    }

    return await this.guildService.create(req.body);
  }

  @Header("Content-Type", "application/json")
  @Put("guild")
  async update(@Req() req: Request) {
    if (!InstanceOf<APIUpdateGuild>(req.body, "id")) {
      return "Invalid request body, missing id";
    }

    if (
      !(
        InstanceOf<APIUpdateGuild>(req.body, "prefix") ||
        InstanceOf<APIUpdateGuild>(req.body, "economy") ||
        InstanceOf<APIUpdateGuild>(req.body, "music") ||
        InstanceOf<APIUpdateGuild>(req.body, "commandsChannelId") ||
        InstanceOf<APIUpdateGuild>(req.body, "musicChannelId") ||
        InstanceOf<APIUpdateGuild>(req.body, "voiceChannelId")
      )
    ) {
      return "Invalid request body, missing properties";
    }

    return await this.guildService.update(req.body);
  }
}
