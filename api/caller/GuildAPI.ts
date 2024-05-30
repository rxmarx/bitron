import {
  CreateGuild,
  DeleteGuild,
  GetGuild,
  UpdateGuildInfo,
} from "../../src/types/APIFetchRequest";

import ExtendedClient from "../../src/classes/ExtendedClient";
import { Guild } from "../../src/types/interfaces/schemas";
import Server from "..";
import _ from "lodash";
import axios from "axios";

class GuildAPI {
  private readonly client: ExtendedClient;
  private keyspace = `bitron:guild`;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public create(
    req: CreateGuild,
    checkCache?: boolean,
    expiration?: number
  ): Promise<Guild | string> {
    if (checkCache) {
      return new Promise<Guild | any>(async (resolve, reject) => {
        const guild = await this.get({ id: req.id }, false);

        if (!(typeof guild === "string")) {
          reject(await this.create(req, false));
        }

        const guildData = await this.create(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, guildData, {
            ex: expiration!,
          })
          .then((res) => resolve(guildData as Guild))
          .catch((error) => reject(error));
      });
    }

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

  public get(req: GetGuild, checkCache?: boolean): Promise<Guild | string> {
    if (checkCache) {
      return new Promise<Guild | any>((resolve, reject) => {
        Server.cache
          .get<string>(`${this.keyspace}:${req.id}`)
          .then(async (res) => {
            if (!res || res.toLowerCase() === "nil") {
              resolve(await this.get(req, false));
            } else {
              resolve(_.toPlainObject(res) as Guild);
            }
          })
          .catch((error) => reject(error));
      });
    }

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

  public updateInfo(
    req: UpdateGuildInfo,
    checkCache?: boolean,
    expiration?: number
  ): Promise<Guild | string> {
    if (checkCache) {
      return new Promise<Guild | any>(async (resolve, reject) => {
        const guild = await this.get({ id: req.id }, false);

        if (typeof guild === "string") {
          reject(await this.updateInfo(req, false));
        }

        const guildData = await this.updateInfo(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, guildData, {
            ex: expiration!,
          })
          .then((res) => resolve(guildData as Guild))
          .catch((error) => reject(error));
      });
    }

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
