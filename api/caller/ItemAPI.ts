import ExtendedClient from "../../src/classes/ExtendedClient";
import { GetItem } from "../../src/types/APIFetchRequest";
import { Item } from "../../src/types/interfaces/schemas";
import axios from "axios";

class ItemAPI {
  private readonly client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public get(req: GetItem): Promise<void> {
    return new Promise<Item | any>((resolve, reject) => {
      axios({
        method: "GET",
        url: `${this.client.config.serverUrl}/item`,
        data: req,
      })
        .then((res) => resolve(res.data as Item))
        .catch((error) => reject(error));
    });
  }
}

export default ItemAPI;
