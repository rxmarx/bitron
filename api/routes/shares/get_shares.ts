import { NextFunction, Request, Response } from "express";

import { GetShares } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function getShares(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: GetShares = req.body;

  if (!body.id || body.id == undefined) {
    res.send("Invalid request!, shares id is missing").status(400);
    return;
  }

  const shares = await Server.database.shares.findUnique({
    where: {
      id: body.id,
    },
    include: {
      bank: true,
      company: true,
      holders: true,
    },
  });

  if (!shares) {
    res.send("Invalid request!, shares with id is not found").status(404);
    return;
  }

  res.json(shares);
  return;
}
