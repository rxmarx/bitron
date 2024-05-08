import { NextFunction, Request, Response } from "express";

import { CreatePremiumCommand } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function createPremiumCommand(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: CreatePremiumCommand = req.body;

  if (!body.id || body.id == undefined) {
    res.send("Invalid request!, command id is missing").status(400);
    return;
  }

  if (!body.name || body.name == "") {
    res.send("Invalid request!, command name is missing").status(400);
    return;
  }

  const command = await Server.database.premiumCommand.create({
    data: {
      id: body.id,
      name: body.name,
      cost: body.cost || 1500,
    },
  });

  res.json(command);
  return;
}
