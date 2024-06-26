import { NextFunction, Request, Response } from "express";

import Server from "../..";
import { UpdateBankStoredTokens } from "../../../src/types/APIFetchRequest";

export default async function updateBankStoredTokens(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: UpdateBankStoredTokens = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, bank id is missing").status(400);
    return;
  }

  if (!body.tokenUUID || body.tokenUUID == "") {
    res.send("Invalid request!, token UUID is missing").status(400);
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

  const reqToken = await Server.database.token.findUnique({
    where: {
      id: body.tokenUUID,
    },
  });

  if (!reqToken) {
    res.send("Invalid request!, token with UUID not found").status(404);
    return;
  }

  const bank = await Server.database.bank.update({
    where: {
      id: body.id,
    },
    data: {
      storedTokens: {
        connect: {
          id: body.tokenUUID,
        },
      },
    },
  });

  res.json(bank);
  return;
}
