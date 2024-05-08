import { NextFunction, Request, Response } from "express";

import Server from "../..";
import { UpdateUserBoughtItems } from "../../../src/types/APIFetchRequest";

export default async function updateUserBoughtItems(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: UpdateUserBoughtItems = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, user id is missing").status(400);
    return;
  }

  if (!body.itemId || body.itemId == undefined) {
    res.send("Invalid request!, item id is missing").status(400);
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

  const reqItem = await Server.database.item.findUnique({
    where: {
      id: body.itemId,
    },
  });

  if (!reqItem) {
    res.send("Invalid request!, item with id not found").status(404);
    return;
  }

  const user = await Server.database.user.update({
    where: {
      id: body.id,
    },
    data: {
      boughtItems: {
        connect: {
          id: body.itemId,
        },
      },
    },
  });

  res.json(user);
  return;
}
