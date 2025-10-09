import {
  APICreateItem,
  APIFindItem,
  APIUpdateItemInfo,
  APIUpdateItemPowerUp,
  APIUpdateItemUser,
} from "../../types/interfaces/item";

import ExtendedClient from "../ExtendedClient";
import { Item } from "@prisma/client";
import axios from "axios";

class ItemAPI {
  constructor(private readonly client: ExtendedClient) {}

  public find(req: APIFindItem): Promise<Item | any> {
    return new Promise<Item | any>((resolve, reject) => {
      axios({ method: "GET", url: `${this.client.config.serverURL}/item`, data: req })
        .then((res) => resolve(res.data as Item))
        .catch((error) => reject(error));
    });
  }

  public create(req: APICreateItem): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({ method: "POST", url: `${this.client.config.serverURL}/item`, data: req })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateItemInfo(req: APIUpdateItemInfo): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({ method: "PUT", url: `${this.client.config.serverURL}/item/update/info`, data: req })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateItemUser(req: APIUpdateItemUser, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/item/update/user`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateItemPowerUp(req: APIUpdateItemPowerUp, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/item/update/powerUp`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }
}

export default ItemAPI;
