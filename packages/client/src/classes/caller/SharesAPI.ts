import {
  APICreateShares,
  APIFindShares,
  APIUpdateSharesBank,
  APIUpdateSharesInfo,
  APIUpdateSharesUser,
} from "../../types/interfaces/shares";

import ExtendedClient from "../ExtendedClient";
import { Shares } from "@prisma/client";
import axios from "axios";

class SharesAPI {
  constructor(private readonly client: ExtendedClient) {}

  public find(req: APIFindShares): Promise<Shares | any> {
    return new Promise<Shares | any>((resolve, reject) => {
      axios({ method: "GET", url: `${this.client.config.serverURL}/shares`, data: req })
        .then((res) => resolve(res.data as Shares))
        .catch((error) => reject(error));
    });
  }

  public create(req: APICreateShares): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({ method: "POST", url: `${this.client.config.serverURL}/shares`, data: req })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateSharesInfo(req: APIUpdateSharesInfo): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({ method: "PUT", url: `${this.client.config.serverURL}/shares/update/info`, data: req })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateSharesUser(req: APIUpdateSharesUser, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/shares/update/user`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateSharesBank(req: APIUpdateSharesBank, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/shares/update/bank`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }
}

export default SharesAPI;
