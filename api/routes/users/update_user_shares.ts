import { NextFunction, Request, Response } from "express";

import Server from "../..";
import { UpdateUserShares } from "../../../src/types/APIFetchRequest";

export default async function updateUserShares(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: UpdateUserShares = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, user id is missing").status(400);
    return;
  }

  if (!body.sharesId || body.sharesId == undefined) {
    res.send("Invalid request!, shares id is missing").status(400);
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

  const reqShares = await Server.database.shares.findUnique({
    where: {
      id: body.sharesId,
    },
  });

  if (!reqShares) {
    res.send("Invalid request!, shares with id is not found").status(404);
    return;
  }

  const user = await Server.database.user.update({
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

  res.json(user);
  return;
}
