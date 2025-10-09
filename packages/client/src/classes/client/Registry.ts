import * as CommandModules from "../commands/modules";

import { Client, Collection, Guild } from "discord.js";

import CommandDispatcher from "../commands/CommandDispatcher";
import ExtendedClient from "../ExtendedClient";
import GenericCommand from "../commands/GenericCommand";
import GenericEvents from "../events/GenericEvents";
import MiscEvents from "../events/MiscEvents";
import SlashCommand from "../commands/SlashCommand";

class Registry {
  private readonly client: ExtendedClient;
  private readonly dispatcher: CommandDispatcher;

  private readonly _genericCommands: Collection<string, GenericCommand>;
  private readonly _slashCommands: Collection<string, SlashCommand>;

  constructor(client: ExtendedClient) {
    this.client = client;
    this.dispatcher = new CommandDispatcher(client, this);

    this._genericCommands = new Collection();
    this._slashCommands = new Collection();
  }

  public resolveGenericCommand(name: string): GenericCommand | undefined {
    return this._genericCommands.get(name);
  }

  public resolveSlashCommand(name: string): SlashCommand | undefined {
    return this._slashCommands.get(name);
  }

  private registerGenericCommand(command: GenericCommand): this {
    this._genericCommands.set(command.name, command);

    return this;
  }

  private registerGenericCommandsCollector(commands: GenericCommand[]): this {
    for (const command of commands) {
      this.registerGenericCommand(command);
    }

    return this;
  }

  private registerSlashCommand(command: SlashCommand): this {
    this._slashCommands.set(command.name, command);

    return this;
  }

  private registerSlashCommandsCollector(commands: SlashCommand[]): this {
    for (const command of commands) {
      this.registerSlashCommand(command);
    }

    return this;
  }

  private registerGenericCommands(): this {
    const defaults: object = CommandModules.Generic;
    this.registerGenericCommandsCollector(
      Object.values(defaults).map((Command) => new Command(this.client)),
    );

    return this;
  }

  private registerSlashCommands(): this {
    const defaults: object = CommandModules.Slash;
    this.registerSlashCommandsCollector(
      Object.values(defaults).map((Command) => new Command(this.client)),
    );

    return this;
  }

  public registerCommands(): this {
    this.registerGenericCommands();
    this.registerSlashCommands();

    return this;
  }

  public registerEvents(): this {
    this.client.once("clientReady", (client: Client) => {
      GenericEvents.onReady(client as ExtendedClient);
    });
    this.client.on("guildCreate", async (guild: Guild) => {
      await GenericEvents.guildCreate(guild, this.client);
    });

    this.registerMessageHandler().registerInteractionHandler();
    this.registerMiscEvents();

    return this;
  }

  public registerMessageHandler(): this {
    this.client.on("messageCreate", (message) => {
      this.dispatcher.handleMessage(message);
    });

    return this;
  }

  public registerInteractionHandler(): this {
    this.client.on("interactionCreate", (interaction) => {
      this.dispatcher.handleInteraction(interaction);
    });

    return this;
  }

  public registerMiscEvents(): this {
    this.client.on("commandExecute", MiscEvents.commandExecute);
    this.client.on("commandError", MiscEvents.commandError);
    this.client.on("cacheError", MiscEvents.cacheError);

    return this;
  }

  public get genericCommands(): Collection<string, GenericCommand> {
    return this._genericCommands;
  }

  public get slashCommands(): Collection<string, SlashCommand> {
    return this._slashCommands;
  }
}

export default Registry;
