import {
  CreateGuild,
  DeleteGuild,
  GetGuild,
  UpdateGuildInfo,
} from "../../src/types/APIFetchRequest";

import ExtendedClient from "../../src/classes/ExtendedClient";
import { Guild } from "../../src/types/interfaces/schemas";
import axios from "axios";

class GuildAPI {
  private readonly client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public create(req: CreateGuild): Promise<Guild | string> {
    return new Promise<Guild | any>((resolve, reject) => {
      axios({
        method: "POST",
        url: `${this.client.config.serverUrl}/guild`,
        data: req,
      })
        .then((res) => resolve(res.data as Guild))
        .catch((error) => reject(error));
    });
  }

  public get(req: GetGuild): Promise<Guild | string> {
    return new Promise<Guild | any>((resolve, reject) => {
      axios({
        method: "GET",
        url: `${this.client.config.serverUrl}/guild`,
        data: req,
      })
        .then((res) => resolve(res.data as Guild))
        .catch((error) => reject(error));
    });
  }

  public delete(req: DeleteGuild): Promise<Guild | string> {
    return new Promise<Guild | any>((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `${this.client.config.serverUrl}/guild`,
        data: req,
      })
        .then((res) => resolve(res.data))
        .catch((error) => reject(error));
    });
  }

  public updateInfo(req: UpdateGuildInfo): Promise<Guild | string> {
    return new Promise<Guild | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/guild`,
        data: req,
      })
        .then((res) => resolve(res.data as Guild))
        .catch((error) => reject(error));
    });
  }
}

export default GuildAPI;
