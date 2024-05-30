import { NextFunction, Request, Response } from "express";

import { GetToken } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function getToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: GetToken = req.body;

  if (!body.uuid || body.uuid == "") {
    res.send("Invalid request!, token uuid is missing").status(400);
    return;
  }

  let token;

  if (body.uuid) {
    token = await Server.database.token.findUnique({
      where: {
        id: body.uuid,
      },
      include: {
        creator: true,
        acquirer: true,
        buyers: true,
        bank: true,
      },
    });
  } else {
    token = await Server.database.token.findFirst({
      where: {
        title: body.title,
      },
      include: {
        creator: true,
        acquirer: true,
        buyers: true,
        bank: true,
      },
    });
  }

  if (!token) {
    res.send("Invalid request!, token with id is not found").status(404);
    return;
  }

  res.json(token);
  return;
}
