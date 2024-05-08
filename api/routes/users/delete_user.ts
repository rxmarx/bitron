import { NextFunction, Request, Response } from "express";

import { DeleteUser } from "../../../src/types/APIFetchRequest";
import Server from "../..";

export default async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: DeleteUser = req.body;

  if (!body.id || body.id == "") {
    res.send("Invalid request!, user id is missing").status(400);
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

  await Server.database.user.delete({
    where: {
      id: body.id,
    },
  });

  res.send("Successful!").status(200);
  return;
}
