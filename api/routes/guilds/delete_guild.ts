import { NextFunction, Request, Response } from "express";

import { DeleteGuild } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function deleteGuild(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: DeleteGuild = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, guild id is missing").status(400);
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

  await Server.database.guild.delete({
    where: {
      id: body.id,
    },
  });

  res.send("Successful").status(200);
  return;
}
