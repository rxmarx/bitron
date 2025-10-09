import { Guild, TextChannel, VoiceChannel } from "discord.js";

import Cache from "./Cache";
import ExtendedClient from "../ExtendedClient";
import { StoreKeyType } from "../../types";

class HashState<T extends StoreKeyType, K, V> {
  private readonly _hash: Map<string, Map<K, V> | null>;

  constructor(client: ExtendedClient, storeKey: T, storeValue: { key: K; value: V }) {
    this._hash = new Map();

    if (storeKey instanceof Guild) {
      const keyCheck: boolean = client.guilds.cache.has(storeKey.id);

      if (!keyCheck) {
        throw new Error("StateInitializationError: Guild doesn't exist within client");
      }

      this._hash.set(storeKey.id, new Map<K, V>().set(storeValue.key, storeValue.value));
    } else if (storeKey instanceof TextChannel || storeKey instanceof VoiceChannel) {
      const keyCheck: boolean = client.channels.cache.has(storeKey.id);

      if (!keyCheck) {
        throw new Error("StateInitializationError: Channel doesn't exist within client");
      }

      this._hash.set(storeKey.id, new Map<K, V>().set(storeValue.key, storeValue.value));
    } else {
      this._hash.set(storeKey, new Map<K, V>().set(storeValue.key, storeValue.value));
    }
  }

  public get hash(): Map<string, Map<K, V> | null> {
    return this._hash;
  }

  public store(id: string): Map<K, V> | undefined | null {
    return this._hash.get(id);
  }

  public delete(id: string): void {
    this._hash.delete(id);
  }

  public deleteStore(id: string): void {
    this._hash.set(id, null);
  }

  public updateStore(id: string, store: { key: K; value: V }): void {
    this._hash.get(id)?.set(store.key, store.value);
  }
}

class CacheState<T extends string, K extends string | Buffer | number, V extends number> {
  private readonly _cache: Cache;

  constructor(client: ExtendedClient, key: T, value: K, expire: V) {
    this._cache = new Cache(client);

    this._cache
      .set(key, value, "EX", expire)
      .then((value) => {
        console.log(value);
      })
      .catch((error) => client.emit("cacheError", error, client));
  }

  public get cache(): Cache {
    return this._cache;
  }

  public async get(key: string): Promise<string | null> {
    return await this._cache.get(key);
  }

  public update(key: string, value: K): void {
    this._cache.set(key, value, "KEEPTTL");
  }

  public delete(key: string): void {
    this._cache.del(key);
  }
}

export { HashState, CacheState };
