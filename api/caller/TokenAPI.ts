import {
  CreateToken,
  DeleteToken,
  GetToken,
  UpdateTokenInfo,
} from "../../src/types/APIFetchRequest";

import ExtendedClient from "../../src/classes/ExtendedClient";
import { Token } from "../../src/types/interfaces/schemas";
import axios from "axios";

class TokenAPI {
  private readonly client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public create(req: CreateToken): Promise<Token | string> {
    return new Promise<Token | any>((resolve, reject) => {
      axios({
        method: "POST",
        url: `${this.client.config.serverUrl}/token`,
        data: req,
      })
        .then((res) => resolve(res.data as Token))
        .catch((error) => reject(error));
    });
  }

  public get(req: GetToken): Promise<Token | string> {
    return new Promise<Token | any>((resolve, reject) => {
      axios({
        method: "GET",
        url: `${this.client.config.serverUrl}/token`,
        data: req,
      })
        .then((res) => resolve(res.data as Token))
        .catch((error) => reject(error));
    });
  }

  public delete(req: DeleteToken): Promise<Token | string> {
    return new Promise<Token | any>((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `${this.client.config.serverUrl}/token`,
        data: req,
      })
        .then((res) => resolve(res.data))
        .catch((error) => reject(error));
    });
  }

  public updateInfo(req: UpdateTokenInfo): Promise<Token | string> {
    return new Promise<Token | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/token`,
        data: req,
      })
        .then((res) => resolve(res.data as Token))
        .catch((error) => reject(error));
    });
  }
}

export default TokenAPI;
