import { NextFunction, Request, Response } from "express";

import { GetUser } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: GetUser = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, user id is missing").status(400);
    return;
  }

  const user = await Server.database.user.findUnique({
    where: {
      id: body.id,
    },
    include: {
      bank: true,
      company: true,
      boughtItems: true,
      createdTokens: true,
      partneredCompanies: true,
      premiumCommands: true,
      purchasedTokens: true,
      shares: true,
    },
  });

  if (!user) {
    res.send("Invalid request!, user with id is not found").status(404);
    return;
  }

  res.json(user);
  return;
}
