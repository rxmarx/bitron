import { NextFunction, Request, Response } from "express";

import { DeleteShares } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function deleteShares(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: DeleteShares = req.body;

  if (!body.id || body.id == undefined) {
    res.send("Invalid request!, shares id is missing").status(400);
    return;
  }

  const reqShares = await Server.database.shares.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!reqShares) {
    res.send("Invalid request!, shares with id is not found").status(404);
    return;
  }

  await Server.database.shares.delete({
    where: {
      id: body.id,
    },
  });

  res.send("Successful").status(200);
  return;
}
