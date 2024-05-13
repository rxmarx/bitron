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

  if (
    !body.incLevel &&
    !body.decLevel &&
    !body.incSales &&
    !body.decSales &&
    !body.incPrice &&
    !body.decPrice &&
    !body.incSalesPerUpgrade &&
    !body.decSalesPerUpgrade
  ) {
    res
      .send(
        "Invalid request!, token level/sales/price/salesPerUpgrade is missing"
      )
      .status(400);
    return;
  }

  if (
    body.incLevel === undefined &&
    body.decLevel === undefined &&
    body.incSales === undefined &&
    body.decSales === undefined &&
    body.incPrice === undefined &&
    body.decPrice === undefined &&
    body.incSalesPerUpgrade === undefined &&
    body.decSalesPerUpgrade === undefined
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

  if (body.incLevel || body.decLevel) {
    const token = await Server.database.token.update({
      where: {
        id: body.uuid,
      },
      data: {
        level: body.incLevel
          ? { increment: body.incLevel }
          : { decrement: body.decLevel },
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
  } else if (body.incSales || body.decSales) {
    const token = await Server.database.token.update({
      where: {
        id: body.uuid,
      },
      data: {
        sales: body.incSales
          ? { increment: body.incSales }
          : { decrement: body.decSales },
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
  } else if (body.incPrice || body.decPrice) {
    const token = await Server.database.token.update({
      where: {
        id: body.uuid,
      },
      data: {
        price: body.incPrice
          ? { increment: body.incPrice }
          : { decrement: body.decPrice },
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
  } else if (body.incSalesPerUpgrade || body.decSalesPerUpgrade) {
    const token = await Server.database.token.update({
      where: {
        id: body.uuid,
      },
      data: {
        salesPerUpgrade: body.incSalesPerUpgrade
          ? { increment: body.incSalesPerUpgrade }
          : { decrement: body.decSalesPerUpgrade },
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
}
