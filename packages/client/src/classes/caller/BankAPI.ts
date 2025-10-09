import {
  APICreateBank,
  APIFindBank,
  APIUpdateBankInfo,
  APIUpdateBankShares,
  APIUpdateBankToken,
} from "../../types/interfaces/bank";

import { Bank } from "@prisma/client";
import ExtendedClient from "../ExtendedClient";
import axios from "axios";

class BankAPI {
  constructor(private readonly client: ExtendedClient) {}

  public find(req: APIFindBank): Promise<Bank | any> {
    return new Promise<Bank | any>((resolve, reject) => {
      axios({ method: "GET", url: `${this.client.config.serverURL}/bank`, data: req })
        .then((res) => resolve(res.data as Bank))
        .catch((error) => reject(error));
    });
  }

  public create(req: APICreateBank): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({ method: "POST", url: `${this.client.config.serverURL}/bank`, data: req })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateBankInfo(req: APIUpdateBankInfo): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/bank/update/info`,
        data: req,
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateBankToken(req: APIUpdateBankToken, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/bank/update/token`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateBankShares(req: APIUpdateBankShares, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/bank/update/shares`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }
}

export default BankAPI;
