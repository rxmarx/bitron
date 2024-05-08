import { NextFunction, Request, Response } from "express";

import { GetBank } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function getBank(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: GetBank = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, bank id is missing").status(400);
    return;
  }

  const bank = await Server.database.bank.findUnique({
    where: {
      id: body.id,
    },
    include: {
      shares: true,
      storedTokens: true,
      user: true,
    },
  });

  if (!bank) {
    res.send("Invalid request!, bank with id is not found").status(404);
    return;
  }

  res.json(bank);
  return;
}
