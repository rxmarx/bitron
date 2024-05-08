import { NextFunction, Request, Response } from "express";

import Server from "../..";
import { UpdateUserPurchasedTokens } from "../../../src/types/APIFetchRequest";

export default async function updateUserPurchasedTokens(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: UpdateUserPurchasedTokens = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, user id is missing").status(400);
    return;
  }

  if (!body.tokenUUID || body.tokenUUID == "") {
    res.send("Invalid request!, token UUID is missing").status(400);
    return;
  }

  const reqUser = await Server.database.user.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!reqUser) {
    res.send("Invalid request!, user with id not found").status(404);
    return;
  }

  const reqToken = await Server.database.token.findUnique({
    where: {
      id: body.tokenUUID,
    },
  });

  if (!reqToken) {
    res.send("Invalid request!, token with id not found").status(404);
    return;
  }

  const user = await Server.database.user.update({
    where: {
      id: body.id,
    },
    data: {
      purchasedTokens: {
        connect: {
          id: body.tokenUUID,
        },
      },
    },
  });

  res.json(user);
  return;
}
