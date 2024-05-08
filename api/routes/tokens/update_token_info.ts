import { NextFunction, Request, Response } from "express";

import Server from "../..";
import { UpdateTokenInfo } from "../../../src/types/APIFetchRequest";

export default async function updateTokenInfo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body: UpdateTokenInfo = req.body;

  if (!body.uuid || body.uuid == "") {
    res.send("Invalid request!, token UUID is missing").status(400);
    return;
  }

  if (!body.level && !body.sales && !body.price && !body.salesPerUpgrade) {
    res
      .send(
        "Invalid request!, token level/sales/price/salesPerUpgrade is missing"
      )
      .status(400);
    return;
  }

  if (
    body.level == undefined &&
    body.sales == undefined &&
    body.price == undefined &&
    body.salesPerUpgrade == undefined
  ) {
    res
      .send(
        "Invalid request!, token level/sales/price/salesPerUpgrade is missing"
      )
      .status(400);
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

  const token = await Server.database.token.update({
    where: {
      id: body.uuid,
    },
    data: {
      level: body.level || reqToken.level,
      sales: body.sales || reqToken.sales,
      price: body.price || reqToken.price,
      salesPerUpgrade: body.salesPerUpgrade || reqToken.salesPerUpgrade,
    },
    include: {
      creator: true,
      acquirer: true,
      buyers: true,
      bank: true,
    },
  });

  res.json(token).status(200);
  return;
}
