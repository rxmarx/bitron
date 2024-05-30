import {
  CreateToken,
  DeleteToken,
  GetToken,
  UpdateTokenInfo,
} from "../../src/types/APIFetchRequest";

import ExtendedClient from "../../src/classes/ExtendedClient";
import Server from "..";
import { Token } from "../../src/types/interfaces/schemas";
import _ from "lodash";
import axios from "axios";

class TokenAPI {
  private readonly client: ExtendedClient;
  private keyspace = `bitron:token`;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public create(
    req: CreateToken,
    checkCache?: boolean,
    expiration?: number
  ): Promise<Token | string> {
    if (checkCache) {
      return new Promise<Token | any>(async (resolve, reject) => {
        const token = await this.get({ title: req.title }, false);

        if (!(typeof token === "string")) {
          reject(await this.create(req, false));
        }

        const tokenData = await this.create(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, tokenData, {
            ex: expiration!,
          })
          .then((res) => resolve(tokenData as Token))
          .catch((error) => reject(error));
      });
    }

    return new Promise<Token | any>((resolve, reject) => {
      axios({
        method: "POST",
        url: `${this.client.config.serverUrl}/token`,
        data: req,
      })
        .then((res) => resolve(res.data as Token))
        .catch((error) => reject(error));
    });
  }

  public get(req: GetToken, checkCache?: boolean): Promise<Token | string> {
    if (checkCache) {
      return new Promise<Token | any>((resolve, reject) => {
        Server.cache
          .get<string>(`${this.keyspace}:${req.uuid}`)
          .then(async (res) => {
            if (!res || res.toLowerCase() === "nil") {
              resolve(await this.get(req, false));
            } else {
              resolve(_.toPlainObject(res) as Token);
            }
          })
          .catch((error) => reject(error));
      });
    }

    return new Promise<Token | any>((resolve, reject) => {
      axios({
        method: "GET",
        url: `${this.client.config.serverUrl}/token`,
        data: req,
      })
        .then((res) => resolve(res.data as Token))
        .catch((error) => reject(error));
    });
  }

  public delete(req: DeleteToken): Promise<Token | string> {
    return new Promise<Token | any>((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `${this.client.config.serverUrl}/token`,
        data: req,
      })
        .then((res) => resolve(res.data))
        .catch((error) => reject(error));
    });
  }

  public updateInfo(
    req: UpdateTokenInfo,
    checkCache?: boolean,
    expiration?: number
  ): Promise<Token | string> {
    if (checkCache) {
      return new Promise<Token | any>(async (resolve, reject) => {
        const token = await this.get({ uuid: req.uuid }, false);

        if (typeof token === "string") {
          reject(await this.updateInfo(req, false));
        }

        const tokenData = await this.updateInfo(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.uuid}`, tokenData, {
            ex: expiration!,
          })
          .then((res) => resolve(tokenData as Token))
          .catch((error) => reject(error));
      });
    }

    return new Promise<Token | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/token`,
        data: req,
      })
        .then((res) => resolve(res.data as Token))
        .catch((error) => reject(error));
    });
  }
}

export default TokenAPI;
