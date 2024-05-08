import { NextFunction, Request, Response } from "express";

import Server from "../..";
import { UpdateCompanyAcquiredTokens } from "../../../src/types/APIFetchRequest";

export default async function updateCompanyAcquiredTokens(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: UpdateCompanyAcquiredTokens = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, company id is missing").status(400);
    return;
  }

  if (!body.tokenUUID || body.tokenUUID == "") {
    res.send("Invalid request!, token UUID is missing").status(400);
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

  const reqToken = await Server.database.token.findUnique({
    where: {
      id: body.tokenUUID,
    },
  });

  if (!reqToken) {
    res.send("Invalid request!, token with UUID is not found").status(404);
    return;
  }

  const company = await Server.database.company.update({
    where: {
      id: body.id,
    },
    data: {
      acquiredTokens: {
        connect: {
          id: body.tokenUUID,
        },
      },
    },
  });

  res.json(company);
  return;
}
