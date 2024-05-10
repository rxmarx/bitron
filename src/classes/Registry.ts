import * as CommandModules from "./commands/modules";

import { Client, Collection, Guild } from "discord.js";

import CommandDispatcher from "./commands/CommandDispatcher";
import ExtendedClient from "./ExtendedClient";
import GenericCommand from "./commands/GenericCommand";
import GenericEvents from "./events/GenericEvents";
import MiscellaneousEvents from "./events/MiscellaneousEvents";
import SlashCommand from "./commands/SlashCommand";

class Registry {
  private readonly client: ExtendedClient;
  private readonly dispatcher: CommandDispatcher;

  private readonly _genericCommands: Collection<string, GenericCommand>;
  private readonly _slashCommands: Collection<string, SlashCommand>;

  constructor(client: ExtendedClient) {
    this.client = client;
    this._genericCommands = new Collection();
    this._slashCommands = new Collection();
    this.dispatcher = new CommandDispatcher(client, this);
  }

  public resolveGenericCommand(name: string): GenericCommand | undefined {
    return (
      this._genericCommands.get(name) ||
      this._genericCommands.find((command) => command.aliases.includes(name))
    );
  }

  public resolveSlashCommand(name: string): SlashCommand | undefined {
    return (
      this._slashCommands.get(name) ||
      this._slashCommands.find((command) => command.aliases.includes(name))
    );
  }

  public get slashCommands(): SlashCommand[] {
    return this._slashCommands.map((command) => command as SlashCommand);
  }

  private registerGenericCommand(command: GenericCommand): this {
    this._genericCommands.set(command.name, command);

    return this;
  }

  private registerGenericCommandsCollector(commands: GenericCommand[]): this {
    for (const command of commands) {
      this.registerGenericCommand(command);

      if (command.premiumCommand) {
        this.client.server.caller.command
          .get({ name: command.name })
          .then((pc) => {
            if (!(typeof pc === "string")) return;
            this.client.server.caller.command.create({
              name: command.name,
              cost: command.cost,
            });
          });
      }
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
    const defaults = CommandModules.Generic;
    this.registerGenericCommandsCollector(
      Object.values(defaults).map((Command) => new Command(this.client))
    );

    return this;
  }

  private registerSlashCommands(): this {
    const defaults = CommandModules.Slash;
    this.registerSlashCommandsCollector(
      Object.values(defaults).map((Command) => new Command(this.client))
    );

    return this;
  }

  public registerAllCommands(): this {
    this.registerGenericCommands();
    this.registerSlashCommands();

    return this;
  }

  public async registerEvents(): Promise<void> {
    this.client.on("ready", (client: Client) =>
      GenericEvents.onReady(client as ExtendedClient)
    );
    // this.client.on("guildCreate", (guild: Guild) =>
    //   GenericEvents.guildCreate(guild, this.client)
    // );

    this.registerMessageHandler().registerInteractionHandler();
    this.registerMiscellaneousEvents();
  }

  public registerMiscellaneousEvents(): this {
    this.client.on("commandExecute", MiscellaneousEvents.commandExecute);
    this.client.on("commandError", MiscellaneousEvents.commandError);
    this.client.on("databaseError", MiscellaneousEvents.databaseError);

    return this;
  }

  private registerMessageHandler(): this {
    this.client.on("messageCreate", (message) =>
      this.dispatcher.handleMessage(message)
    );

    return this;
  }

  private registerInteractionHandler(): this {
    this.client.on("interactionCreate", (interaction) =>
      this.dispatcher.handleInteraction(interaction)
    );

    return this;
  }

  public get genericCommands(): Collection<string, GenericCommand> {
    return this._genericCommands;
  }

  public get slashCommandsCollection(): Collection<string, SlashCommand> {
    return this._slashCommands;
  }
}

export default Registry;
