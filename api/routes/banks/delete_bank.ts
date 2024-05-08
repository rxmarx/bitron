import { NextFunction, Request, Response } from "express";

import { DeleteBank } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function deleteBank(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: DeleteBank = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, bank id is missing").status(400);
    return;
  }

  const reqBank = await Server.database.bank.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!reqBank) {
    res.send("Invalid request!, bank with id is not found").status(404);
    return;
  }

  await Server.database.user.update({
    where: {
      id: body.id,
    },
    data: {
      bank: {
        disconnect: {
          id: body.id,
        },
      },
    },
  });

  await Server.database.bank.delete({
    where: {
      id: body.id,
    },
  });

  res.send("Successful!").status(200);
  return;
}
