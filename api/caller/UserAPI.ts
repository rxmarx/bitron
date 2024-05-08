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
import { User } from "../../src/types/interfaces/schemas";
import axios from "axios";

class UserAPI {
  private readonly client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public create(req: CreateUser): Promise<void> {
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

  public get(req: GetUser): Promise<void> {
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

  public delete(req: DeleteUser): Promise<void> {
    return new Promise<User | any>((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `${this.client.config.serverUrl}/user`,
        data: req,
      })
        .then((res) => resolve(res.data as User))
        .catch((error) => reject(error));
    });
  }

  public updateInfo(req: UpdateUserInfo): Promise<void> {
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

  public updatePurchasedTokens(req: UpdateUserPurchasedTokens): Promise<void> {
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
    req: UpdateUserPartneredCompanies
  ): Promise<void> {
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

  public updateShares(req: UpdateUserShares): Promise<void> {
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

  public updateBoughtItems(req: UpdateUserBoughtItems): Promise<void> {
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
