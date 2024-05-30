import { Client } from "discord.js";
import ConfigProvider from "./client/ConfigProvider";
import { GatewayIntentBits } from "discord-api-types/v10";
import MiscExtendedClientEvents from "../types/interfaces/MiscExtendedClientEvents";
import Registry from "./Registry";
import Server from "../../api";
import { SlashCommandDeployer } from "./commands/SlashCommandDeployer";
import { error } from "console";

export declare interface ExtendedClient {
  on<K extends keyof MiscExtendedClientEvents>(
    event: K,
    listener: (...args: MiscExtendedClientEvents[K]) => void
  ): this;
  on<S extends string | symbol>(
    event: Exclude<S, keyof MiscExtendedClientEvents>,
    listener: (...args: any[]) => void
  ): this;

  once<K extends keyof MiscExtendedClientEvents>(
    event: K,
    listener: (...args: MiscExtendedClientEvents[K]) => void
  ): this;
  once<S extends keyof string | symbol>(
    event: Exclude<S, keyof MiscExtendedClientEvents>,
    listener: (...args: any[]) => void
  ): this;

  emit<K extends keyof MiscExtendedClientEvents>(
    event: K,
    ...args: MiscExtendedClientEvents[K]
  ): boolean;
  emit<S extends string | symbol>(
    event: Exclude<S, keyof MiscExtendedClientEvents>,
    ...args: any[]
  ): boolean;

  off<K extends keyof MiscExtendedClientEvents>(
    event: K,
    listener: (...args: MiscExtendedClientEvents[K]) => void
  ): this;
  off<S extends string | symbol>(
    event: Exclude<S, keyof MiscExtendedClientEvents>,
    listener: (...args: any[]) => void
  ): this;

  removeAllListeners<K extends keyof MiscExtendedClientEvents>(event?: K): this;
  removeAllListeners<S extends string | symbol>(
    event?: Exclude<S, keyof MiscExtendedClientEvents>
  ): this;
}

export class ExtendedClient extends Client {
  public readonly config: ConfigProvider;
  public readonly registry: Registry;
  public readonly deployer: SlashCommandDeployer;
  public readonly server: Server;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildVoiceStates,
      ],
    });

    this.config = new ConfigProvider(this);
    this.registry = new Registry(this);
    this.deployer = new SlashCommandDeployer(this);
    this.server = new Server(this);

    this.registry.registerEvents();
  }

  public async start(): Promise<void> {
    this.registry.registerAllCommands();
    this.deployer.deployToDevGuild();

    this.server.init();

    this.main()
      .then(async () => {
        await Server.database.$connect();
      })
      .catch(async (error) => {
        console.log(error);
        await Server.database.$disconnect();
        this.emit("databaseError", error, this);
      });
    await this.login(this.config.token);
  }

  public async main(): Promise<void> {
    console.log("Database is running!");
  }
}

export default ExtendedClient;
