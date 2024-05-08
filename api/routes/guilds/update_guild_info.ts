import { NextFunction, Request, Response } from "express";

import Server from "../..";
import { UpdateGuildInfo } from "../../../src/types/APIFetchRequest";

export default async function updateGuildInfo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: UpdateGuildInfo = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, guild id is missing").status(400);
    return;
  }

  if (
    !body.prefix &&
    !body.music &&
    !body.voiceChannelId &&
    !body.musicChannelId
  ) {
    res
      .send(
        "Invalid request!, prefix/music/voice_channel/music_channel ids are missing"
      )
      .status(400);
    return;
  }

  if (
    body.prefix == "" &&
    body.music == undefined &&
    body.voiceChannelId == "" &&
    body.musicChannelId == ""
  ) {
    res
      .send(
        "Invalid request!, prefix/music/voice_channel/music_channel ids are missing"
      )
      .status(400);
    return;
  }

  const reqGuild = await Server.database.guild.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!reqGuild) {
    res.send("Invalid request!, guild with id not found").status(404);
    return;
  }

  const guild = await Server.database.guild.update({
    where: {
      id: body.id,
    },
    data: {
      prefix: body.prefix || reqGuild.prefix,
      music: (body.music === "true" ? true : false) || reqGuild.music,
      voiceChannelId: body.voiceChannelId || reqGuild.voiceChannelId,
      musicChannelId: body.musicChannelId || reqGuild.musicChannelId,
    },
  });

  res.json(guild);
  return;
}
