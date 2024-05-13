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

  if (!body.incCount && !body.decCount && !body.incValue && !body.decValue) {
    res.send("Invalid request!, shares count/value is missing").status(400);
    return;
  }

  if (
    body.incCount === undefined &&
    body.decCount === undefined &&
    body.incValue === undefined &&
    body.decValue === undefined
  ) {
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

  if (body.incCount || body.decCount) {
    const shares = await Server.database.shares.update({
      where: {
        id: body.id,
      },
      data: {
        count: body.incCount
          ? { increment: body.incCount }
          : { decrement: body.decCount },
      },
      include: {
        bank: true,
        company: true,
        holders: true,
      },
    });

    res.json(shares);
    return;
  } else if (body.incValue || body.decValue) {
    const shares = await Server.database.shares.update({
      where: {
        id: body.id,
      },
      data: {
        value: body.incValue
          ? { increment: body.incValue }
          : { decrement: body.decValue },
      },
      include: {
        bank: true,
        company: true,
        holders: true,
      },
    });

    res.json(shares);
    return;
  }
}
