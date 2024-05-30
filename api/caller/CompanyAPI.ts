import {
  CreateCompany,
  DeleteCompany,
  GetCompany,
  UpdateCompanyAcquiredTokens,
} from "../../src/types/APIFetchRequest";

import { Company } from "../../src/types/interfaces/schemas";
import ExtendedClient from "../../src/classes/ExtendedClient";
import Server from "..";
import _ from "lodash";
import axios from "axios";

class CompanyAPI {
  private readonly client: ExtendedClient;
  private keyspace = `bitron:company`;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public create(
    req: CreateCompany,
    checkCache?: boolean,
    expiration?: number
  ): Promise<Company | string> {
    if (checkCache) {
      return new Promise<Company | any>(async (resolve, reject) => {
        const company = await this.get({ id: req.id }, false);

        if (!(typeof company === "string")) {
          reject(await this.create(req, false));
        }

        const companyData = await this.create(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, companyData, {
            ex: expiration!,
          })
          .then((res) => resolve(companyData as Company))
          .catch((error) => reject(error));
      });
    }

    return new Promise<Company | any>((resolve, reject) => {
      axios({
        method: "POST",
        url: `${this.client.config.serverUrl}/company`,
        data: req,
      })
        .then((res) => resolve(res.data as Company))
        .catch((error) => reject(error));
    });
  }

  public get(req: GetCompany, checkCache?: boolean): Promise<Company | string> {
    if (checkCache) {
      return new Promise<Company | any>((resolve, reject) => {
        Server.cache
          .get<string>(`${this.keyspace}:${req.id}`)
          .then(async (res) => {
            if (!res || res.toLowerCase() === "nil") {
              resolve(await this.get(req, false));
            } else {
              resolve(_.toPlainObject(res) as Company);
            }
          })
          .catch((error) => reject(error));
      });
    }

    return new Promise<Company | any>((resolve, reject) => {
      axios({
        method: "GET",
        url: `${this.client.config.serverUrl}/company`,
        data: req,
      })
        .then((res) => resolve(res.data as Company))
        .catch((error) => reject(error));
    });
  }

  public delete(req: DeleteCompany): Promise<Company | string> {
    return new Promise<Company | any>((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `${this.client.config.serverUrl}/company`,
        data: req,
      })
        .then((res) => resolve(res.data))
        .catch((error) => reject(error));
    });
  }

  public updateAcquiredTokens(
    req: UpdateCompanyAcquiredTokens,
    checkCache?: boolean,
    expiration?: number
  ): Promise<Company | string> {
    if (checkCache) {
      return new Promise<Company | any>(async (resolve, reject) => {
        const company = await this.get({ id: req.id }, false);

        if (typeof company === "string") {
          reject(await this.updateAcquiredTokens(req, false));
        }

        const companyData = await this.updateAcquiredTokens(req, false);

        Server.cache
          .set(`${this.keyspace}:${req.id}`, companyData, {
            ex: expiration!,
          })
          .then((res) => resolve(companyData as Company))
          .catch((error) => reject(error));
      });
    }

    return new Promise<Company | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverUrl}/company/acquiredTokens`,
        data: req,
      })
        .then((res) => resolve(res.data as Company))
        .catch((error) => reject(error));
    });
  }
}

export default CompanyAPI;
