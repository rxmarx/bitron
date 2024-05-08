import {
  Bank,
  Company,
  Item,
  Job,
  PremiumCommand,
  Shares,
  Token,
  User,
} from "../src/types/interfaces/schemas";
import {
  bankRoute,
  companyRoute,
  guildRoute,
  itemRoute,
  premiumCommandRoute,
  sharesRoute,
  tokenRoute,
  userRoute,
} from "./routes";
import express, { Application } from "express";

import Caller from "./caller/Caller";
import ExtendedClient from "../src/classes/ExtendedClient";
import { PrismaClient } from "@prisma/client";
import { Redis } from "ioredis";
import bodyParser from "body-parser";
import cors from "cors";

class Server {
  public static client: ExtendedClient;

  private readonly app: Application;
  private readonly PORT = 8000 || process.env.PORT;
  public static database: PrismaClient;
  public static cache: Redis;
  public readonly caller: Caller;

  constructor(client: ExtendedClient) {
    Server.client = client;

    this.app = express();
    Server.database = new PrismaClient();

    this.caller = new Caller(Server.client);
  }

  public init(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());

    this.app.use(`/${Server.client.config.serverApi}/api/user`, userRoute);
    this.app.use(`/${Server.client.config.serverApi}/api/bank`, bankRoute);
    this.app.use(`/${Server.client.config.serverApi}/api/token`, tokenRoute);
    this.app.use(
      `/${Server.client.config.serverApi}/api/company`,
      companyRoute
    );
    this.app.use(`${Server.client.config.serverApi}/api/shares`, sharesRoute);
    this.app.use(
      `/${Server.client.config.serverApi}/api/premiumCommand`,
      premiumCommandRoute
    );
    this.app.use(`/${Server.client.config.serverApi}/api/item`, itemRoute);
    this.app.use(`/${Server.client.config.serverApi}/api/guild`, guildRoute);

    this.app.listen(this.PORT, () => {
      console.log(`Listening on port: ${this.PORT}`);
    });
  }
}

export default Server;
