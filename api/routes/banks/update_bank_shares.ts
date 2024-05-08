import { NextFunction, Request, Response } from "express";

import Server from "../..";
import { UpdateBankShares } from "../../../src/types/APIFetchRequest";

export default async function updateBankShares(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: UpdateBankShares = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, bank id is missing").status(400);
    return;
  }

  if (!body.sharesId || body.sharesId == undefined) {
    res.send("Invalid request!, shares id is missing").status(400);
    return;
  }

  const reqBank = await Server.database.bank.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!reqBank) {
    res.send("Invalid request!, bank with id not found").status(404);
    return;
  }

  const reqShares = await Server.database.shares.findUnique({
    where: {
      id: body.sharesId,
    },
  });

  if (!reqShares) {
    res.send("Invalid request!, shares with id is not found").status(404);
    return;
  }

  const bank = await Server.database.bank.update({
    where: {
      id: body.id,
    },
    data: {
      shares: {
        connect: {
          id: body.sharesId,
        },
      },
    },
  });

  res.json(bank);
  return;
}
