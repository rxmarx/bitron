import ExtendedClient from "../src/classes/ExtendedClient";
import { Redis } from "@upstash/redis";

class RedisCache extends Redis {
  constructor(client: ExtendedClient) {
    super({
      url: client.config.cacheUrl,
      token: client.config.cacheToken,
    });
  }
}

export default RedisCache;
