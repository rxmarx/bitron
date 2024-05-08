import { NextFunction, Request, Response } from "express";

import { CreateUser } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: CreateUser = req.body;

  if (!body.id || body.id == "" || !body.username || body.username == "") {
    res.send("Invalid request!, user id/username is missing").status(400);
    return;
  }

  const reqUser = await Server.database.user.findUnique({
    where: {
      id: body.id,
    },
  });

  if (reqUser) {
    res.status(403);
    res.send("Invalid request, user with id already exists");
    return;
  }

  const user = await Server.database.user.create({
    data: {
      id: body.id,
      username: body.username,
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

  res.json(user);
  return;
}
