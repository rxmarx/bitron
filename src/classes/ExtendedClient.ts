import { Client } from "discord.js";
import ConfigProvider from "./client/ConfigProvider";
import { GatewayIntentBits } from "discord-api-types/v10";
import MiscExtendedClientEvents from "../types/interfaces/MiscExtendedClientEvents";
import { PrismaClient } from "@prisma/client";
import Registry from "./Registry";
import Server from "../../api";
import { SlashCommandDeployer } from "./commands/SlashCommandDeployer";

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
  public readonly database: PrismaClient;
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
    this.database = new PrismaClient();
    this.server = new Server(this);

    this.registry.registerEvents();
  }

  public async start(): Promise<void> {
    // this.registry.registerAllCommands();
    // this.deployer.deployToDevGuild();
    this.main();
    //   .then(async () => {
    //     await this.database.$disconnect();
    //   })
    //   .catch(async (error) => {
    //     console.log(error);
    //     await this.database.$disconnect();
    //     this.emit("databaseError", error, this);
    //   });
    // await this.login(this.config.token);
    this.server.init();

    this.server.caller.token
      .get({ uuid: "a4f038d6-595f-4ef1-a55b-1ad3384fcbe5" })
      .then((value) => {
        console.log(value);
      })
      .catch((error) => console.log(error));
  }

  public async main(): Promise<void> {
    console.log("Database is running!");
  }
}

export default ExtendedClient;
