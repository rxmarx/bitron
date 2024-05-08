import { NextFunction, Request, Response } from "express";

import { GetPremiumCommand } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function getPremiumCommand(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: GetPremiumCommand = req.body;

  if (!body.id || body.id == undefined) {
    res.send("Invalid request!, command id is missing").status(400);
    return;
  }

  const command = await Server.database.premiumCommand.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!command) {
    res.send("Invalid request!, command with id not found").status(404);
    return;
  }

  res.json(command);
  return;
}
