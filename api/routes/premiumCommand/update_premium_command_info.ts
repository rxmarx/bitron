import { NextFunction, Request, Response } from "express";

import Server from "../..";
import { UpdatePremiumCommandInfo } from "../../../src/types/APIFetchRequest";

export default async function updatePremiumCommandInfo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: UpdatePremiumCommandInfo = req.body;

  if (!body.name || body.name == undefined) {
    res.send("Invalid request!, command id is missing").status(400);
    return;
  }

  if (!body.cost || body.cost == undefined) {
    res.send("Invalid request!, command cost is missing").status(400);
    return;
  }

  const reqCommand = await Server.database.premiumCommand.findUnique({
    where: {
      name: body.name,
    },
  });

  if (!reqCommand) {
    res.send("Invalid request!, command with id is not found").status(404);
    return;
  }

  const command = await Server.database.premiumCommand.update({
    where: {
      name: body.name,
    },
    data: {
      cost: body.cost,
    },
  });

  res.json(command);
  return;
}
