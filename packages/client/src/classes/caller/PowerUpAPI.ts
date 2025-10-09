import {
  APICreatePowerUp,
  APIFindPowerUp,
  APIUpdatePowerUpInfo,
  APIUpdatePowerUpItem,
} from "../../types/interfaces/powerup";

import ExtendedClient from "../ExtendedClient";
import { PowerUp } from "@prisma/client";
import axios from "axios";

class PowerUpAPI {
  constructor(private readonly client: ExtendedClient) {}

  public find(req: APIFindPowerUp): Promise<PowerUp | any> {
    return new Promise<PowerUp | any>((resolve, reject) => {
      axios({ method: "GET", url: `${this.client.config.serverURL}/powerup`, data: req })
        .then((res) => resolve(res.data as PowerUp))
        .catch((error) => reject(error));
    });
  }

  public create(req: APICreatePowerUp): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({ method: "POST", url: `${this.client.config.serverURL}/powerup`, data: req })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updatePowerUpInfo(req: APIUpdatePowerUpInfo): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/powerup/update/info`,
        data: req,
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updatePowerUpItem(req: APIUpdatePowerUpItem, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/powerup/update/item`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }
}

export default PowerUpAPI;
