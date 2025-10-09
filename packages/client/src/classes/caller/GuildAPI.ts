import { APICreateGuild, APIFindGuild, APIUpdateGuild } from "../../types/interfaces/guild";

import ExtendedClient from "../ExtendedClient";
import { Guild } from "@prisma/client";
import axios from "axios";

class GuildAPI {
  constructor(private readonly client: ExtendedClient) {}

  public find(req: APIFindGuild): Promise<Guild | any> {
    return new Promise<Guild | any>((resolve, reject) => {
      axios({ method: "GET", url: `${this.client.config.serverURL}/guild`, data: req })
        .then((res) => resolve(res.data as Guild))
        .catch((error) => reject(error));
    });
  }

  public create(req: APICreateGuild): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({ method: "POST", url: `${this.client.config.serverURL}/guild`, data: req })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public update(req: APIUpdateGuild): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({ method: "PUT", url: `${this.client.config.serverURL}/guild`, data: req })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }
}

export default GuildAPI;
