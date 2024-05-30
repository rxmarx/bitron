import {
  ConnectUserPremiumCommand,
  CreatePremiumCommand,
  GetPremiumCommand,
  UpdatePremiumCommandInfo,
} from "../../src/types/APIFetchRequest";

import ExtendedClient from "../../src/classes/ExtendedClient";
import { PremiumCommand } from "../../src/types/interfaces/schemas";
import Server from "..";
import _ from "lodash";
import axios from "axios";

class PremiumCommandAPI {
  private readonly client: ExtendedClient;
  private keyspace = `bitron:command`;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public create(
    req: CreatePremiumCommand,
    checkCache?: boolean,
    expiration?: number
  ): Promise<PremiumCommand | string> {
    if (checkCache) {
      return new Promise<PremiumCommand | any>(async (resolve, reject) => {
        const command = await this.get({ name: req.name }, false);

        if (!(typeof command === "string")) {
          reject(await this.create(req, false));
        }

        const commandData = await this.create(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.name}`, commandData, {
            ex: expiration!,
          })
          .then((res) => resolve(commandData as PremiumCommand))
          .catch((error) => reject(error));
      });
    }

    return new Promise<PremiumCommand | any>((resolve, reject) => {
      axios({
        method: "POST",
        url: `${this.client.config.serverUrl}/premiumCommand`,
        data: req,
      })
        .then((res) => resolve(res.data as PremiumCommand))
        .catch((error) => reject(error));
    });
  }

  public get(
    req: GetPremiumCommand,
    checkCache?: boolean
  ): Promise<PremiumCommand | string> {
    if (checkCache) {
      return new Promise<PremiumCommand | any>((resolve, reject) => {
        Server.cache
          .get<string>(`${this.keyspace}:${req.name}`)
          .then(async (res) => {
            if (!res || res.toLowerCase() === "nil") {
              resolve(await this.get(req, false));
            } else {
              resolve(_.toPlainObject(res) as PremiumCommand);
            }
          })
          .catch((error) => reject(error));
      });
    }
    return new Promise<PremiumCommand | any>((resolve, reject) => {
      axios({
        method: "GET",
        url: `${this.client.config.serverUrl}/premiumCommand`,
        data: req,
      })
        .then((res) => resolve(res.data as PremiumCommand))
        .catch((error) => reject(error));
    });
  }

  public updateInfo(
    req: UpdatePremiumCommandInfo,
    checkCache?: boolean,
    expiration?: number
  ): Promise<PremiumCommand | string> {
    if (checkCache) {
      return new Promise<PremiumCommand | any>(async (resolve, reject) => {
        const command = await this.get({ name: req.name }, false);

        if (typeof command === "string") {
          reject(await this.updateInfo(req, false));
        }

        const commandData = await this.updateInfo(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.name}`, commandData, {
            ex: expiration!,
          })
          .then((res) => resolve(commandData as PremiumCommand))
          .catch((error) => reject(error));
      });
    }

    return new Promise<PremiumCommand | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/premiumCommand`,
        data: req,
      })
        .then((res) => resolve(res.data as PremiumCommand))
        .catch((error) => reject(error));
    });
  }

  public connectUser(
    req: ConnectUserPremiumCommand,
    checkCache?: boolean,
    expiration?: number
  ): Promise<PremiumCommand | string> {
    if (checkCache) {
      return new Promise<PremiumCommand | any>(async (resolve, reject) => {
        const command = await this.get({ name: req.name }, false);

        if (typeof command === "string") {
          reject(await this.connectUser(req, false));
        }

        const commandData = await this.connectUser(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.name}`, commandData, {
            ex: expiration!,
          })
          .then((res) => resolve(commandData as PremiumCommand))
          .catch((error) => reject(error));
      });
    }

    return new Promise<PremiumCommand | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/premiumCommand/user`,
        data: req,
      })
        .then((res) => resolve(res.data as PremiumCommand))
        .catch((error) => reject(error));
    });
  }
}

export default PremiumCommandAPI;
