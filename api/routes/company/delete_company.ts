import { NextFunction, Request, Response } from "express";

import { DeleteCompany } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function deleteCompany(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: DeleteCompany = req.body;

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

  await Server.database.company.delete({
    where: {
      id: body.id,
    },
  });

  res.send("Successful").status(200);
  return;
}
