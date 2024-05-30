import {
  CreateBank,
  DeleteBank,
  GetBank,
  UpdateBankInfo,
  UpdateBankShares,
  UpdateBankStoredTokens,
} from "../../src/types/APIFetchRequest";

import { Bank } from "../../src/types/interfaces/schemas";
import ExtendedClient from "../../src/classes/ExtendedClient";
import Server from "..";
import _ from "lodash";
import axios from "axios";

class BankAPI {
  private readonly client: ExtendedClient;
  private keyspace = `bitron:bank`;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public create(
    req: CreateBank,
    checkCache?: boolean,
    expiration?: number
  ): Promise<Bank | string> {
    if (checkCache) {
      return new Promise<Bank | any>(async (resolve, reject) => {
        const bank = await this.get({ id: req.id }, false);

        if (!(typeof bank === "string")) {
          reject(await this.create(req, false));
        }

        const userData = await this.create(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, userData, {
            ex: expiration!,
          })
          .then((res) => resolve(userData as Bank))
          .catch((error) => reject(error));
      });
    }

    return new Promise<Bank | any>((resolve, reject) => {
      axios({
        method: "POST",
        url: `${this.client.config.serverUrl}/bank`,
        data: req,
      })
        .then((res) => resolve(res.data as Bank))
        .catch((error) => reject(error));
    });
  }

  public get(req: GetBank, checkCache?: boolean): Promise<Bank | string> {
    if (checkCache) {
      return new Promise<Bank | any>((resolve, reject) => {
        Server.cache
          .get<string>(`${this.keyspace}:${req.id}`)
          .then(async (res) => {
            if (!res || res.toLowerCase() === "nil") {
              resolve(await this.get(req, false));
            } else {
              resolve(_.toPlainObject(res) as Bank);
            }
          })
          .catch((error) => reject(error));
      });
    }

    return new Promise<Bank | any>((resolve, reject) => {
      axios({
        method: "GET",
        url: `${this.client.config.serverUrl}/bank`,
        data: req,
      })
        .then((res) => resolve(res.data as Bank))
        .catch((error) => reject(error));
    });
  }

  public delete(req: DeleteBank): Promise<Bank | string> {
    return new Promise<Bank | any>((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `${this.client.config.serverUrl}/bank`,
        data: req,
      })
        .then((res) => resolve(res.data))
        .catch((error) => reject(error));
    });
  }

  public updateInfo(
    req: UpdateBankInfo,
    checkCache?: boolean,
    expiration?: number
  ): Promise<Bank | string> {
    if (checkCache) {
      return new Promise<Bank | any>(async (resolve, reject) => {
        const bank = await this.get({ id: req.id }, false);

        if (typeof bank === "string") {
          reject(await this.updateInfo(req, false));
        }

        const bankData = await this.updateInfo(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, bankData, {
            ex: expiration!,
          })
          .then((res) => resolve(bankData as Bank))
          .catch((error) => reject(error));
      });
    }

    return new Promise<Bank | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/bank`,
        data: req,
      })
        .then((res) => resolve(res.data as Bank))
        .catch((error) => reject(error));
    });
  }

  public updateBankStoredTokens(
    req: UpdateBankStoredTokens,
    checkCache?: boolean,
    expiration?: number
  ): Promise<Bank | string> {
    if (checkCache) {
      return new Promise<Bank | any>(async (resolve, reject) => {
        const bank = await this.get({ id: req.id }, false);

        if (typeof bank === "string") {
          reject(await this.updateBankStoredTokens(req, false));
        }

        const bankData = await this.updateBankStoredTokens(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, bankData, {
            ex: expiration!,
          })
          .then((res) => resolve(bankData as Bank))
          .catch((error) => reject(error));
      });
    }

    return new Promise<Bank | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/bank/storedTokens`,
        data: req,
      })
        .then((res) => resolve(res.data as Bank))
        .catch((error) => reject(error));
    });
  }

  public updateBankShares(
    req: UpdateBankShares,
    checkCache?: boolean,
    expiration?: number
  ): Promise<Bank | string> {
    if (checkCache) {
      return new Promise<Bank | any>(async (resolve, reject) => {
        const bank = await this.get({ id: req.id }, false);

        if (typeof bank === "string") {
          reject(await this.updateBankShares(req, false));
        }

        const bankData = await this.updateBankShares(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, bankData, {
            ex: expiration!,
          })
          .then((res) => resolve(bankData as Bank))
          .catch((error) => reject(error));
      });
    }

    return new Promise<Bank | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/bank/shares`,
        data: req,
      })
        .then((res) => resolve(res.data as Bank))
        .catch((error) => reject(error));
    });
  }
}

export default BankAPI;
