import { APICreateGuild, APIUpdateGuild } from "src/types/guild";
import { BadRequestException, Injectable } from "@nestjs/common";

import { AppService } from "src/app.service";
import { Guild } from "@prisma/client";

@Injectable()
export class GuildService {
  constructor(private readonly appService: AppService) {}

  async find(id: string): Promise<BadRequestException | Guild> {
    const guild: Guild | null = await this.appService.database.guild.findUnique({ where: { id } });

    if (!guild) {
      return new BadRequestException("Invalid request!, guild with the id is not found");
    }

    return guild;
  }

  async create(data: APICreateGuild): Promise<string | BadRequestException> {
    const { id, ownerId } = data;

    const guild = await this.appService.database.guild.findUnique({
      where: { id },
    });

    if (guild) {
      return new BadRequestException("Invalid request!, guild with the id already exists");
    }

    await this.appService.database.guild.create({ data: { id, ownerId } });

    return "Successfully!, created the guild";
  }

  async update(data: APIUpdateGuild): Promise<string | BadRequestException> {
    const { id, prefix, economy, music, commandsChannelId, musicChannelId, voiceChannelId } = data;

    const guild = await this.appService.database.guild.findUnique({
      where: { id },
    });

    if (!guild) {
      return new BadRequestException("Invalid request!, guild with the id is not found");
    }

    await this.appService.database.guild.update({
      where: { id },
      data: {
        prefix: prefix || guild.prefix,
        economy: typeof economy === "undefined" ? guild.economy : economy,
        music: typeof music === "undefined" ? guild.music : music,
        commandsChannelId: commandsChannelId || guild.commandsChannelId,
        musicChannelId: musicChannelId || guild.musicChannelId,
        voiceChannelId: voiceChannelId || guild.voiceChannelId,
      },
    });

    return "Successfully!, updated the guild info";
  }
}
