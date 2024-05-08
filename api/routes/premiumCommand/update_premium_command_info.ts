import { NextFunction, Request, Response } from "express";

import Server from "../..";
import { UpdatePremiumCommandInfo } from "../../../src/types/APIFetchRequest";

export default async function updatePremiumCommandInfo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: UpdatePremiumCommandInfo = req.body;

  if (!body.id || body.id == undefined) {
    res.send("Invalid request!, command id is missing").status(400);
    return;
  }

  if (!body.cost || body.cost == undefined) {
    res.send("Invalid request!, command cost is missing").status(400);
    return;
  }

  const reqCommand = await Server.database.premiumCommand.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!reqCommand) {
    res.send("Invalid request!, command with id is not found").status(404);
    return;
  }

  const command = await Server.database.premiumCommand.update({
    where: {
      id: body.id,
    },
    data: {
      cost: body.cost,
    },
  });

  res.json(command);
  return;
}
