import { NextFunction, Request, Response } from "express";

import Server from "../..";
import { UpdateUserPartneredCompanies } from "../../../src/types/APIFetchRequest";

export default async function updateUserPartneredCompanies(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: UpdateUserPartneredCompanies = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, user id is missing").status(400);
    return;
  }

  if (!body.companyId || body.companyId == "") {
    res.send("Invalid request!, company id is missing").status(400);
    return;
  }

  const reqUser = await Server.database.user.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!reqUser) {
    res.send("Invalid request!, user with id not found").status(404);
    return;
  }

  const reqCompany = await Server.database.company.findUnique({
    where: {
      id: body.companyId,
    },
  });

  if (!reqCompany) {
    res.send("Invalid request!, company with id not found").status(404);
    return;
  }

  const user = await Server.database.user.update({
    where: {
      id: body.id,
    },
    data: {
      partneredCompanies: {
        connect: {
          id: body.companyId,
        },
      },
    },
  });

  res.json(user);
  return;
}
