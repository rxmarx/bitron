import {
  CreateShares,
  DeleteShares,
  GetShares,
  UpdateSharesInfo,
} from "../../src/types/APIFetchRequest";

import ExtendedClient from "../../src/classes/ExtendedClient";
import { Shares } from "../../src/types/interfaces/schemas";
import axios from "axios";

class SharesAPI {
  private readonly client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public create(req: CreateShares): Promise<Shares | string> {
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

  public get(req: GetShares): Promise<Shares | string> {
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

  public updateInfo(req: UpdateSharesInfo): Promise<Shares | string> {
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
