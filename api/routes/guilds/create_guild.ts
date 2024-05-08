import { NextFunction, Request, Response } from "express";

import { CreateGuild } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function createGuild(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: CreateGuild = req.body;

  if (!body.id || body.id == "" || !body.ownerId || body.ownerId == "") {
    res.send("Invalid request!, guild/owner id is missing").status(400);
    return;
  }

  const guild = await Server.database.guild.create({
    data: {
      id: body.id,
      ownerId: body.ownerId,
      prefix: Server.client.config.prefix,
    },
  });

  res.json(guild);
  return;
}
