import {
  APICreateToken,
  APIFindToken,
  APIUpdateTokenBank,
  APIUpdateTokenCompany,
  APIUpdateTokenInfo,
  APIUpdateTokenUser,
} from "../../types/interfaces/token";

import ExtendedClient from "../ExtendedClient";
import { Token } from "@prisma/client";
import axios from "axios";

class TokenAPI {
  constructor(private readonly client: ExtendedClient) {}

  public find(req: APIFindToken): Promise<Token | any> {
    return new Promise<Token | any>((resolve, reject) => {
      axios({ method: "GET", url: `${this.client.config.serverURL}/token`, data: req })
        .then((res) => resolve(res.data as Token))
        .catch((error) => reject(error));
    });
  }

  public create(req: APICreateToken): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({ method: "POST", url: `${this.client.config.serverURL}/token`, data: req })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateTokenInfo(req: APIUpdateTokenInfo): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/token/update/info`,
        data: req,
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateTokenUser(req: APIUpdateTokenUser, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/token/update/user`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateTokenCompany(req: APIUpdateTokenCompany, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/token/update/company`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateTokenBank(req: APIUpdateTokenBank, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/token/update/bank`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }
}

export default TokenAPI;
