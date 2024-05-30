import {
  CreateShares,
  DeleteShares,
  GetShares,
  UpdateSharesInfo,
} from "../../src/types/APIFetchRequest";

import ExtendedClient from "../../src/classes/ExtendedClient";
import Server from "..";
import { Shares } from "../../src/types/interfaces/schemas";
import _ from "lodash";
import axios from "axios";

class SharesAPI {
  private readonly client: ExtendedClient;
  private keyspace = `bitron:shares`;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public create(
    req: CreateShares,
    checkCache?: boolean,
    expiration?: number
  ): Promise<Shares | string> {
    if (checkCache) {
      return new Promise<Shares | any>(async (resolve, reject) => {
        const shares = await this.get({ id: req.id }, false);

        if (!(typeof shares === "string")) {
          reject(await this.create(req, false));
        }

        const sharesData = await this.create(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, sharesData, {
            ex: expiration!,
          })
          .then((res) => resolve(sharesData as Shares))
          .catch((error) => reject(error));
      });
    }

    return new Promise<Shares | any>((resolve, reject) => {
      axios({
        method: "POST",
        url: `${this.client.config.serverUrl}/shares`,
        data: req,
      })
        .then((res) => resolve(res.data as Shares))
        .catch((error) => reject(error));
    });
  }

  public get(req: GetShares, checkCache?: boolean): Promise<Shares | string> {
    if (checkCache) {
      return new Promise<Shares | any>((resolve, reject) => {
        Server.cache
          .get<string>(`${this.keyspace}:${req.id}`)
          .then(async (res) => {
            if (!res || res.toLowerCase() === "nil") {
              resolve(await this.get(req, false));
            } else {
              resolve(_.toPlainObject(res) as Shares);
            }
          })
          .catch((error) => reject(error));
      });
    }

    return new Promise<Shares | any>((resolve, reject) => {
      axios({
        method: "GET",
        url: `${this.client.config.serverUrl}/shares`,
        data: req,
      })
        .then((res) => resolve(res.data as Shares))
        .catch((error) => reject(error));
    });
  }

  public delete(req: DeleteShares): Promise<Shares | string> {
    return new Promise<Shares | any>((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `${this.client.config.serverUrl}/shares`,
        data: req,
      })
        .then((res) => resolve(res.data))
        .catch((error) => reject(error));
    });
  }

  public updateInfo(
    req: UpdateSharesInfo,
    checkCache?: boolean,
    expiration?: number
  ): Promise<Shares | string> {
    if (checkCache) {
      return new Promise<Shares | any>(async (resolve, reject) => {
        const shares = await this.get({ id: req.id }, false);

        if (typeof shares === "string") {
          reject(await this.updateInfo(req, false));
        }

        const sharesData = await this.updateInfo(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, sharesData, {
            ex: expiration!,
          })
          .then((res) => resolve(sharesData as Shares))
          .catch((error) => reject(error));
      });
    }

    return new Promise<Shares | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/shares`,
        data: req,
      })
        .then((res) => resolve(res.data as Shares))
        .catch((error) => reject(error));
    });
  }
}

export default SharesAPI;
