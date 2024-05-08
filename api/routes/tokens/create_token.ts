import { NextFunction, Request, Response } from "express";

import { CreateToken } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function createToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: CreateToken = req.body;

  if (
    !body.id ||
    body.id == "" ||
    !body.title ||
    body.title == "" ||
    !body.description ||
    body.description == ""
  ) {
    res
      .send("Invalid request!, user id or token title/description is missing")
      .status(400);
    return;
  }

  const reqUser = await Server.database.user.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!reqUser) {
    res.send("Invalid request!, user with id is not found").status(404);
    return;
  }

  const reqToken = await Server.database.token.findFirst({
    where: {
      title: body.title,
    },
  });

  if (reqToken) {
    res.send("Invalid request!, token with title already exists").status(400);
    return;
  }

  const user = await Server.database.user.update({
    where: {
      id: body.id,
    },
    data: {
      createdTokens: {
        create: {
          title: body.title,
          description: body.description,
        },
      },
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
