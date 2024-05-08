import { NextFunction, Request, Response } from "express";

import Server from "../..";
import { UpdateSharesInfo } from "../../../src/types/APIFetchRequest";

export default async function updateSharesInfo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: UpdateSharesInfo = req.body;

  if (!body.id || body.id == undefined) {
    res.send("Invalid request!, shares id is missing").status(400);
    return;
  }

  if (!body.count && !body.value) {
    res.send("Invalid request!, shares count/value is missing").status(400);
    return;
  }

  if (body.count == undefined && body.value == undefined) {
    res.send("Invalid request!, shares count/value is missing").status(400);
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

  const shares = await Server.database.shares.update({
    where: {
      id: body.id,
    },
    data: {
      count: body.count || reqShares.count,
      value: body.value || reqShares.value,
    },
  });

  res.json(shares);
  return;
}
