import { NextFunction, Request, Response } from "express";

import { GetPremiumCommand } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function getPremiumCommand(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: GetPremiumCommand = req.body;

  if (!body.name || body.name == "") {
    res.send("Invalid request!, command name is missing").status(400);
    return;
  }

  const command = await Server.database.premiumCommand.findUnique({
    where: {
      name: body.name,
    },
    include: {
      user: true,
    },
  });

  if (!command) {
    res.send("Invalid request!, command with id not found").status(404);
    return;
  }

  res.json(command);
  return;
}
