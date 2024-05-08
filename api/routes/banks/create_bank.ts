import { NextFunction, Request, Response } from "express";

import { CreateBank } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function createBank(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: CreateBank = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, bank id is missing").status(400);
    return;
  }

  const reqUser = await Server.database.user.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!reqUser) {
    res.send("Invalid request!, user with id is not found").status(404);
    return;
  }

  const reqBank = await Server.database.bank.findUnique({
    where: {
      id: body.id,
    },
  });

  if (reqBank) {
    res.send("Invalid request!, bank with id is found").status(400);
    return;
  }

  const user = await Server.database.user.update({
    where: {
      id: body.id,
    },
    data: {
      bank: {
        create: {
          id: body.id,
        },
      },
    },
    include: {
      bank: true,
      company: true,
      boughtItems: true,
      createdTokens: true,
      partneredCompanies: true,
      premiumCommands: true,
      purchasedTokens: true,
      shares: true,
    },
  });

  res.json(user.bank);
  return;
}
