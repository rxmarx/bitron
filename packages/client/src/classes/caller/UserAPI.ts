import {
  APICreateUser,
  APIFindUser,
  APIUpdateUserBank,
  APIUpdateUserCompany,
  APIUpdateUserInfo,
  APIUpdateUserItem,
  APIUpdateUserShares,
  APIUpdateUserToken,
} from "../../types/interfaces/user";

import ExtendedClient from "../ExtendedClient";
import { User } from "@prisma/client";
import axios from "axios";

class UserAPI {
  constructor(private readonly client: ExtendedClient) {}

  public find(req: APIFindUser): Promise<User | any> {
    return new Promise<User | any>((resolve, reject) => {
      axios({ method: "GET", url: `${this.client.config.serverURL}/user`, data: req })
        .then((res) => resolve(res.data as User))
        .catch((error) => reject(error));
    });
  }

  public create(req: APICreateUser): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({ method: "POST", url: `${this.client.config.serverURL}/user`, data: req })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateUserInfo(req: APIUpdateUserInfo): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({ method: "PUT", url: `${this.client.config.serverURL}/user/update/info`, data: req })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateUserCompany(req: APIUpdateUserCompany, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/user/update/company`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateUserShares(req: APIUpdateUserShares, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/user/update/shares`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateUserBank(req: APIUpdateUserBank, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/user/update/bank`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateUserToken(req: APIUpdateUserToken, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/user/update/token`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateUserItem(req: APIUpdateUserItem, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/user/update/item`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }
}

export default UserAPI;
