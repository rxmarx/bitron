import { NextFunction, Request, Response } from "express";

import { GetGuild } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function getGuild(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: GetGuild = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, guild id is missing").status(400);
    return;
  }

  const guild = await Server.database.guild.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!guild) {
    res.send("Invalid request!, guild with id not found").status(404);
    return;
  }

  res.json(guild);
  return;
}
