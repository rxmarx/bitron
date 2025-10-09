import ExtendedClient from "../ExtendedClient";
import Redis from "ioredis";

class Cache extends Redis {
  constructor(client: ExtendedClient) {
    super(client.config.cacheURL);
  }
}

export default Cache;
