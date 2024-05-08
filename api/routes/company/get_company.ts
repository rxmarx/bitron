import { NextFunction, Request, Response } from "express";

import { GetCompany } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function getCompany(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: GetCompany = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, company id is missing").status(400);
    return;
  }

  const company = await Server.database.company.findUnique({
    where: {
      id: body.id,
    },
    include: {
      owner: true,
      shares: true,
      acquiredTokens: true,
      partners: true,
    },
  });

  if (!company) {
    res.send("Invalid request!, company with id is not found").status(400);
    return;
  }

  res.json(company);
  return;
}
