import { NextFunction, Request, Response } from "express";

import { ConnectUserPremiumCommand } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function connectUserPremiumCommand(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: ConnectUserPremiumCommand = req.body;

  if (!body.userId || body.userId == "") {
    res.send("Invalid request!, user id is missing").status(400);
    return;
  }

  if (!body.name || body.name == "") {
    res.send("Invalid request!, command id is missing").status(400);
    return;
  }

  const reqUser = await Server.database.user.findUnique({
    where: {
      id: body.userId,
    },
  });

  if (!reqUser) {
    res.send("Invalid request!, user with id is not found").status(404);
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
      user: {
        connect: {
          id: body.userId,
        },
      },
    },
  });

  res.json(command);
  return;
}
