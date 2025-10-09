import {
  APICreateCompany,
  APIFindCompany,
  APIUpdateCompanyInfo,
  APIUpdateCompanyShares,
  APIUpdateCompanyToken,
  APIUpdateCompanyUser,
} from "../../types/interfaces/company";

import { Company } from "@prisma/client";
import ExtendedClient from "../ExtendedClient";
import axios from "axios";

class CompanyAPI {
  constructor(private readonly client: ExtendedClient) {}

  public find(req: APIFindCompany): Promise<Company | any> {
    return new Promise<Company | any>((resolve, reject) => {
      axios({ method: "GET", url: `${this.client.config.serverURL}/company`, data: req })
        .then((res) => resolve(res.data as Company))
        .catch((error) => reject(error));
    });
  }

  public create(req: APICreateCompany): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({ method: "POST", url: `${this.client.config.serverURL}/company`, data: req })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateCompanyInfo(req: APIUpdateCompanyInfo): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/company/update/info`,
        data: req,
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateCompanyUser(req: APIUpdateCompanyUser, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/company/update/user`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateCompanyShares(req: APIUpdateCompanyShares, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/company/user/shares`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }

  public updateCompanyToken(req: APIUpdateCompanyToken, connect: boolean): Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      axios({
        method: "PUT",
        url: `${this.client.config.serverURL}/company/user/token`,
        data: req,
        params: { connect },
      })
        .then((res) => resolve(res.data as string))
        .catch((error) => reject(error));
    });
  }
}

export default CompanyAPI;
