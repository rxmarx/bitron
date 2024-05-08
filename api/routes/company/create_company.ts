import { NextFunction, Request, Response } from "express";

import { CreateCompany } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function createCompany(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: CreateCompany = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request, company id is missing").status(400);
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

  const reqCompany = await Server.database.company.findUnique({
    where: {
      id: body.id,
    },
  });

  if (reqCompany) {
    res.send("Invalid request, company with id already exists").status(400);
    return;
  }

  const user = await Server.database.user.update({
    where: {
      id: body.id,
    },
    data: {
      company: {
        create: {
          id: body.id,
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
