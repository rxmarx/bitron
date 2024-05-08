import { NextFunction, Request, Response } from "express";

import Server from "../..";
import { UpdateUserInfo } from "../../../src/types/APIFetchRequest";

export default async function updateUserInfo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: UpdateUserInfo = req.body;

  const jobs = [
    "POLICE",
    "SOFTWARE_ENGINEER",
    "DATA_SCIENTIST",
    "DISCORD_BOT_DEVELOPER",
    "YOUTUBER",
    "DOCTOR",
    "SCIENTIST",
    "LAWYER",
    "ENGINEER",
    "ARCHITECT",
    "SOLDIER",
  ];

  if (!body.id || body.id == "") {
    res.send("Invalid request!, user id is missing").status(400);
    return;
  }

  if (!body.bits && !body.commandsRan && !body.job) {
    res
      .send("Invalid request!, user bits/commandsRan/job is missing")
      .status(400);
    return;
  }

  if (
    body.bits == undefined &&
    body.commandsRan == undefined &&
    body.job == undefined
  ) {
    res
      .send("Invalid request!, user bits/commandsRan/job is missing")
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

  if (!jobs.includes(body.job!)) {
    res.send("Invalid request!, user job format is invalid").status(400);
    return;
  }

  const user = await Server.database.user.update({
    where: {
      id: body.id,
    },
    data: {
      bits: body.bits || reqUser.bits,
      commandsRan: body.commandsRan || reqUser.commandsRan,
      job: body.job || reqUser.job,
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
