import { Client, GatewayIntentBits } from "discord.js";

import Cache from "./util/Cache";
import Caller from "./caller/Caller";
import ConfigProvider from "./client/ConfigProvider";
import MiscExtendedClientEvents from "../types/interfaces/MiscExtendedClientEvents";
import MusicPlayer from "./util/MusicPlayer";
import Registry from "./client/Registry";
import SlashCommandDeployer from "./commands/SlashCommandDeployer";

export declare interface ExtendedClient {
  on<K extends keyof MiscExtendedClientEvents>(
    event: K,
    listener: (...args: MiscExtendedClientEvents[K]) => void,
  ): this;
  on<S extends string | symbol>(
    event: Exclude<S, keyof MiscExtendedClientEvents>,
    listener: (...args: (string | symbol)[]) => void,
  ): this;

  once<K extends keyof MiscExtendedClientEvents>(
    event: K,
    listener: (...args: MiscExtendedClientEvents[K]) => void,
  ): this;
  once<S extends string | symbol>(
    event: Exclude<S, keyof MiscExtendedClientEvents>,
    listener: (...args: (string | symbol)[]) => void,
  ): this;

  emit<K extends keyof MiscExtendedClientEvents>(
    event: K,
    ...args: MiscExtendedClientEvents[K]
  ): boolean;
  emit<S extends string | symbol>(
    event: Exclude<S, keyof MiscExtendedClientEvents>,
    ...args: (string | symbol)[]
  ): boolean;

  off<K extends keyof MiscExtendedClientEvents>(
    event: K,
    listener: (...args: MiscExtendedClientEvents[K]) => void,
  ): this;
  off<S extends string | symbol>(
    event: Exclude<S, keyof MiscExtendedClientEvents>,
    listener: (...args: (string | symbol)[]) => void,
  ): this;

  removeAllListeners<K extends keyof MiscExtendedClientEvents>(event?: K): this;
  removeAllListeners<S extends string | symbol>(
    event?: Exclude<S, keyof MiscExtendedClientEvents>,
  ): this;
}

export class ExtendedClient extends Client {
  public readonly config: ConfigProvider;
  public readonly deployer: SlashCommandDeployer;
  public readonly registry: Registry;
  public readonly caller: Caller;
  public readonly cache: Cache;
  public readonly musicPlayer: MusicPlayer;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
      ],
    });

    this.config = new ConfigProvider(this);
    this.deployer = new SlashCommandDeployer(this);
    this.registry = new Registry(this);
    this.caller = new Caller(this);
    this.cache = new Cache(this);
    this.musicPlayer = new MusicPlayer(this);

    this.registry.registerEvents();
    this.registry.registerCommands();
  }

  public async start(): Promise<void> {
    // this.deployer.deployToDevGuild();

    await this.login(this.config.token);
  }
}

export default ExtendedClient;
