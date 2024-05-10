import {
  ConnectUserPremiumCommand,
  CreatePremiumCommand,
  GetPremiumCommand,
  UpdatePremiumCommandInfo,
} from "../../src/types/APIFetchRequest";

import ExtendedClient from "../../src/classes/ExtendedClient";
import { PremiumCommand } from "../../src/types/interfaces/schemas";
import axios from "axios";

class PremiumCommandAPI {
  private readonly client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public create(req: CreatePremiumCommand): Promise<PremiumCommand | string> {
    return new Promise<PremiumCommand | any>((resolve, reject) => {
      axios({
        method: "POST",
        url: `${this.client.config.serverUrl}/premiumCommand`,
        data: req,
      })
        .then((res) => resolve(res.data as PremiumCommand))
        .catch((error) => reject(error));
    });
  }

  public get(req: GetPremiumCommand): Promise<PremiumCommand | string> {
    return new Promise<PremiumCommand | any>((resolve, reject) => {
      axios({
        method: "GET",
        url: `${this.client.config.serverUrl}/premiumCommand`,
        data: req,
      })
        .then((res) => resolve(res.data as PremiumCommand))
        .catch((error) => reject(error));
    });
  }

  public updateInfo(
    req: UpdatePremiumCommandInfo
  ): Promise<PremiumCommand | string> {
    return new Promise<PremiumCommand | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/premiumCommand`,
        data: req,
      })
        .then((res) => resolve(res.data as PremiumCommand))
        .catch((error) => reject(error));
    });
  }

  public connectUser(
    req: ConnectUserPremiumCommand
  ): Promise<PremiumCommand | string> {
    return new Promise<PremiumCommand | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/premiumCommand/user`,
        data: req,
      })
        .then((res) => resolve(res.data as PremiumCommand))
        .catch((error) => reject(error));
    });
  }
}

export default PremiumCommandAPI;
