import {
  CreateUser,
  DeleteUser,
  GetUser,
  UpdateUserBoughtItems,
  UpdateUserInfo,
  UpdateUserPartneredCompanies,
  UpdateUserPurchasedTokens,
  UpdateUserShares,
} from "../../src/types/APIFetchRequest";

import ExtendedClient from "../../src/classes/ExtendedClient";
import Server from "..";
import { User } from "../../src/types/interfaces/schemas";
import _ from "lodash";
import axios from "axios";

class UserAPI {
  private readonly client: ExtendedClient;
  private keyspace: string = `bitron:user`;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public create(
    req: CreateUser,
    checkCache?: boolean,
    expiration?: number
  ): Promise<User | string> {
    if (checkCache) {
      return new Promise<User | any>(async (resolve, reject) => {
        const user = await this.get({ id: req.id }, false);

        if (!(typeof user === "string")) {
          reject(await this.create(req, false));
        }

        const userData = await this.create(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, userData, {
            ex: expiration!,
          })
          .then((res) => resolve(userData as User))
          .catch((error) => reject(error));
      });
    }

    return new Promise<User | any>((resolve, reject) => {
      axios({
        method: "POST",
        url: `${this.client.config.serverUrl}/user`,
        data: req,
      })
        .then((res) => resolve(res.data as User))
        .catch((error) => reject(error));
    });
  }

  public get(req: GetUser, checkCache?: boolean): Promise<User | string> {
    if (checkCache) {
      return new Promise<User | any>((resolve, reject) => {
        Server.cache
          .get<string>(`${this.keyspace}:${req.id}`)
          .then(async (res) => {
            if (!res || res.toLowerCase() === "nil") {
              resolve(await this.get(req, false));
            } else {
              resolve(_.toPlainObject(res) as User);
            }
          })
          .catch((error) => reject(error));
      });
    }

    return new Promise<User | any>((resolve, reject) => {
      axios({
        method: "GET",
        url: `${this.client.config.serverUrl}/user`,
        data: req,
      })
        .then((res) => resolve(res.data as User))
        .catch((error) => reject(error));
    });
  }

  public delete(req: DeleteUser): Promise<User | string> {
    return new Promise<User | any>((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `${this.client.config.serverUrl}/user`,
        data: req,
      })
        .then((res) => resolve(res.data))
        .catch((error) => reject(error));
    });
  }

  public updateInfo(
    req: UpdateUserInfo,
    checkCache?: boolean,
    expiration?: number
  ): Promise<User | string> {
    if (checkCache) {
      return new Promise<User | any>(async (resolve, reject) => {
        const user = await this.get({ id: req.id }, false);

        if (typeof user === "string") {
          reject(await this.updateInfo(req, false));
        }

        const userData = await this.updateInfo(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, userData, {
            ex: expiration!,
          })
          .then((res) => resolve(userData as User))
          .catch((error) => reject(error));
      });
    }

    return new Promise<User | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/user`,
        data: req,
      })
        .then((res) => resolve(res.data as User))
        .catch((error) => reject(error));
    });
  }

  public updatePurchasedTokens(
    req: UpdateUserPurchasedTokens,
    checkCache?: boolean,
    expiration?: number
  ): Promise<User | string> {
    if (checkCache) {
      return new Promise<User | any>(async (resolve, reject) => {
        const user = await this.get({ id: req.id }, false);

        if (typeof user === "string") {
          reject(await this.updatePurchasedTokens(req, false));
        }

        const userData = await this.updatePurchasedTokens(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, userData, {
            ex: expiration!,
          })
          .then((res) => resolve(userData as User))
          .catch((error) => reject(error));
      });
    }

    return new Promise<User | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/user/purchasedTokens`,
        data: req,
      })
        .then((res) => resolve(res.data as User))
        .catch((error) => reject(error));
    });
  }

  public updatePartneredCompanies(
    req: UpdateUserPartneredCompanies,
    checkCache?: boolean,
    expiration?: number
  ): Promise<User | string> {
    if (checkCache) {
      return new Promise<User | any>(async (resolve, reject) => {
        const user = await this.get({ id: req.id }, false);

        if (typeof user === "string") {
          reject(await this.updatePartneredCompanies(req, false));
        }

        const userData = await this.updatePartneredCompanies(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, userData, {
            ex: expiration!,
          })
          .then((res) => resolve(userData as User))
          .catch((error) => reject(error));
      });
    }

    return new Promise<User | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/user/partneredCompanies`,
        data: req,
      })
        .then((res) => resolve(res.data as User))
        .catch((error) => reject(error));
    });
  }

  public updateShares(
    req: UpdateUserShares,
    checkCache?: boolean,
    expiration?: number
  ): Promise<User | string> {
    if (checkCache) {
      return new Promise<User | any>(async (resolve, reject) => {
        const user = await this.get({ id: req.id }, false);

        if (typeof user === "string") {
          reject(await this.updateShares(req, false));
        }

        const userData = await this.updateShares(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, userData, {
            ex: expiration!,
          })
          .then((res) => resolve(userData as User))
          .catch((error) => reject(error));
      });
    }

    return new Promise<User | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/user/shares`,
        data: req,
      })
        .then((res) => resolve(res.data as User))
        .catch((error) => reject(error));
    });
  }

  public updateBoughtItems(
    req: UpdateUserBoughtItems,
    checkCache?: boolean,
    expiration?: number
  ): Promise<User | string> {
    if (checkCache) {
      return new Promise<User | any>(async (resolve, reject) => {
        const user = await this.get({ id: req.id }, false);

        if (typeof user === "string") {
          reject(await this.updateBoughtItems(req, false));
        }

        const userData = await this.updateBoughtItems(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, userData, {
            ex: expiration!,
          })
          .then((res) => resolve(userData as User))
          .catch((error) => reject(error));
      });
    }

    return new Promise<User | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/user/boughtItems`,
        data: req,
      })
        .then((res) => resolve(res.data as User))
        .catch((error) => reject(error));
    });
  }
}

export default UserAPI;
