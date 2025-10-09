import { Guild, TextChannel, User } from "discord.js";

import ExtendedClient from "../ExtendedClient";

class ConfigProvider {
  private readonly client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  private readonly _token: string = process.env.TOKEN!;
  private readonly _id: string = process.env.CLIENTID!;
  private readonly _prefix: string = process.env.PREFIX!;
  private readonly _ownerID: string = process.env.OWNERID!;
  private readonly _coOwnerID: string = process.env.COOWNERID!;
  private readonly _devGuildID: string = process.env.DEVGUILDID!;
  private readonly _devChannelID: string = process.env.DEVCHANNELID!;
  private readonly _errorChannelID: string = process.env.ERRORCHANNELID!;
  private readonly _bugReportChannelID: string = process.env.BUGREPORTCHANNELID!;
  private readonly _featureRequestChannelID: string = process.env.FEATUREREQUESTCHANNELID!;
  private readonly _giphyAPI: string = process.env.GIPHYAPIKEY!;
  private readonly _databaseURL: string = process.env.DATABASE_URL!;
  private readonly _botInviteURL: string = process.env.BOTINVITEURL!;
  private readonly _cacheURL: string = process.env.CACHE_URL!;
  private readonly _serverURL: string = process.env.SERVER_URL!;

  public get token(): string {
    return this._token;
  }

  public get id(): string {
    return this._id;
  }

  public get prefix(): string {
    return this._prefix;
  }

  public get owner(): User {
    const user: User = this.client.users.cache.get(this._ownerID)!;

    return user;
  }

  public get coOwner(): User {
    const user: User = this.client.users.cache.get(this._coOwnerID)!;

    return user;
  }

  public get devGuild(): Guild {
    const guild: Guild = this.client.guilds.cache.get(this._devGuildID)!;

    return guild;
  }

  public get devChannel(): TextChannel {
    const channel: TextChannel = this.client.channels.cache.get(this._devChannelID) as TextChannel;

    return channel;
  }

  public get errorChannel(): TextChannel {
    const channel: TextChannel = this.client.channels.cache.get(
      this._errorChannelID,
    ) as TextChannel;

    return channel;
  }

  public get bugReportChannel(): TextChannel {
    const channel: TextChannel = this.client.channels.cache.get(
      this._bugReportChannelID,
    ) as TextChannel;

    return channel;
  }

  public get feautreRequestChannel(): TextChannel {
    const channel: TextChannel = this.client.channels.cache.get(
      this._featureRequestChannelID,
    ) as TextChannel;

    return channel;
  }

  public get giphyAPI(): string {
    return this._giphyAPI;
  }

  public get databaseURL(): string {
    return this._databaseURL;
  }

  public get botInviteURL(): string {
    return this._botInviteURL;
  }

  public get cacheURL(): string {
    return this._cacheURL;
  }

  public get serverURL(): string {
    return this._serverURL;
  }
}

export default ConfigProvider;
