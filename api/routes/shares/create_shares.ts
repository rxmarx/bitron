import { NextFunction, Request, Response } from "express";

import { CreateShares } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function createShares(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: CreateShares = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, company id is missing").status(400);
    return;
  }

  const reqCompany = await Server.database.company.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!reqCompany) {
    res.send("Invalid request!, company with id is not found").status(404);
    return;
  }

  const company = await Server.database.company.update({
    where: {
      id: body.id,
    },
    data: {
      shares: {
        create: true,
      },
    },
  });

  res.json(company);
  return;
}
