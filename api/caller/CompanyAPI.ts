import {
  CreateCompany,
  DeleteCompany,
  GetCompany,
  UpdateCompanyAcquiredTokens,
} from "../../src/types/APIFetchRequest";

import { Company } from "../../src/types/interfaces/schemas";
import ExtendedClient from "../../src/classes/ExtendedClient";
import axios from "axios";

class CompanyAPI {
  private readonly client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public create(req: CreateCompany): Promise<void> {
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

  public get(req: GetCompany): Promise<void> {
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

  public delete(req: DeleteCompany): Promise<void> {
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

  public updateAcquiredTokens(req: UpdateCompanyAcquiredTokens): Promise<void> {
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
