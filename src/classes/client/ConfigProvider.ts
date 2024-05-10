import { BaseGuild, Guild, TextChannel, User } from "discord.js";

import ExtendedClient from "../ExtendedClient";

class ConfigProvider {
  private readonly client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  private readonly _token: string | undefined = process.env.TOKEN;
  private readonly _clientID: string | undefined = process.env.CLIENTID;
  private readonly _prefix: string | undefined = process.env.PREFIX;
  private readonly _ownerID: string | undefined = process.env.OWNERID;
  private readonly _coOwnerID: string | undefined = process.env.COOWNERID;
  public readonly _devGuildID: string | undefined = process.env.DEVGUILDID;
  private readonly _devChannelID: string | undefined = process.env.DEVCHANNELID;
  private readonly _errorChannelID: string | undefined =
    process.env.ERRORCHANNELID;
  private readonly _bugReportChannelID: string | undefined =
    process.env.BUGREPORTCHANNELID;
  private readonly _featureRequestChannelID: string | undefined =
    process.env.FEATUREREQUESTCHANNELID;
  private readonly _giphyApiKey: string | undefined = process.env.GIPHYAPIKEY;
  private readonly _databaseUrl: string | undefined = process.env.DATABASE_URL;
  private readonly _botInviteUrl: string | undefined = process.env.BOTINVITEURL;
  private readonly _botProfile: string | undefined = process.env.BOTPROFILE;
  private readonly _cacheUrl: string | undefined = process.env.CACHE_URL;
  private readonly _cacheToken: string | undefined = process.env.CACHE_TOKEN;
  private readonly _serverApi: string | undefined = process.env.SERVER_API;
  private readonly _serverUrl: string | undefined = process.env.SERVER_URL;

  public get token(): string {
    return this._token!;
  }
  public get clientID(): string {
    return this._clientID!;
  }
  public get prefix(): string {
    return this._prefix!;
  }
  public get owner(): User {
    return this.client.users.cache.get(this._ownerID!)!;
  }
  public get coOwner(): User {
    return this.client.users.cache.get(this._coOwnerID!)!;
  }
  public get devGuild(): BaseGuild {
    return this.client.guilds.cache.get(this._devGuildID!) as BaseGuild;
  }
  public get devChannel() {
    return this.client.channels.cache.get(this._devChannelID!) as TextChannel;
  }
  public get errorChannel() {
    return this.client.channels.cache.get(this._errorChannelID!) as TextChannel;
  }
  public get bugReportChannel() {
    return this.client.channels.cache.get(
      this._bugReportChannelID!
    ) as TextChannel;
  }
  public get featureRequestChannel() {
    return this.client.channels.cache.get(
      this._featureRequestChannelID!
    ) as TextChannel;
  }
  public get giphyApiKey(): string {
    return this._giphyApiKey!;
  }
  public get databaseUrl(): string {
    return this._databaseUrl!;
  }
  public get botInviteUrl(): string {
    return this._botInviteUrl!;
  }
  public get botProfile(): string {
    return this._botProfile!;
  }
  public get cacheUrl(): string {
    return this._cacheUrl!;
  }
  public get cacheToken(): string {
    return this._cacheToken!;
  }
  public get serverApi(): string {
    return this._serverApi!;
  }
  public get serverUrl(): string {
    return this._serverUrl!;
  }
}

export default ConfigProvider;
