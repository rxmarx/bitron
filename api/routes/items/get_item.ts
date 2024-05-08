import { NextFunction, Request, Response } from "express";

import { GetItem } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function getItem(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: GetItem = req.body;

  if (!body.id || body.id == undefined) {
    res.send("Invalid request!, item id is missing").status(400);
    return;
  }

  const item = await Server.database.item.findUnique({
    where: {
      id: body.id,
    },
    include: {
      users: true,
      powerup: true,
    },
  });

  if (!item) {
    res.send("Invalid request!, item with id not found").status(404);
    return;
  }

  res.json(item);
  return;
}
