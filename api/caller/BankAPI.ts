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
import axios from "axios";

class BankAPI {
  private readonly client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public create(req: CreateBank): Promise<void> {
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

  public get(req: GetBank): Promise<void> {
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

  public delete(req: DeleteBank): Promise<void> {
    return new Promise<Bank | any>((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `${this.client.config.serverUrl}/bank`,
        data: req,
      })
        .then((res) => resolve(res.data as Bank))
        .catch((error) => reject(error));
    });
  }

  public updateInfo(req: UpdateBankInfo): Promise<void> {
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

  public updateBankStoredTokens(req: UpdateBankStoredTokens): Promise<void> {
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

  public updateBankShares(req: UpdateBankShares): Promise<void> {
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
