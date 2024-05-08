import { NextFunction, Request, Response } from "express";

import { DeleteToken } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function deleteToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: DeleteToken = req.body;

  if (!body.uuid || body.uuid == "") {
    res.send("Invalid request!, token UUID is missing").status(400);
    return;
  }

  const reqToken = await Server.database.token.findUnique({
    where: {
      id: body.uuid,
    },
  });

  if (!reqToken) {
    res.send("Invalid request!, token with UUID is not found").status(404);
    return;
  }

  if (reqToken.acquirerId) {
    await Server.database.token.delete({
      where: {
        id: body.uuid,
        AND: {
          acquirerId: body.id,
        },
      },
    });

    res.send("Successful!").status(200);
  } else {
    await Server.database.token.delete({
      where: {
        id: body.uuid,
        AND: {
          creatorId: body.id,
        },
      },
    });

    res.send("Successful!").status(200);
    return;
  }
}
