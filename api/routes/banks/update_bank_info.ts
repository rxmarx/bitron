import { NextFunction, Request, Response } from "express";

import Server from "../..";
import { UpdateBankInfo } from "../../../src/types/APIFetchRequest";

export default async function updateBankInfo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: UpdateBankInfo = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, user id is missing").status(400);
    return;
  }

  if (!body.level && !body.deposit) {
    res.send("Invalid request!, bank level/deposit is missing").status(400);
    return;
  }

  if (body.level == undefined && body.deposit == undefined) {
    res.send("Invalid request!, bank level/deposit is missing").status(400);
    return;
  }

  const reqBank = await Server.database.bank.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!reqBank) {
    res.send("Invalid request!, bank with id is not found").status(404);
    return;
  }

  const bank = await Server.database.bank.update({
    where: {
      id: body.id,
    },
    data: {
      level: body.level || reqBank.level,
      deposit: body.deposit || reqBank.deposit,
    },
  });

  res.json(bank);
  return;
}
