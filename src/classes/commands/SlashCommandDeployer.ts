import { REST, Routes } from "discord.js";

import ExtendedClient from "../ExtendedClient";

export class SlashCommandDeployer {
  private readonly client: ExtendedClient;
  private readonly rest: REST;

  public constructor(client: ExtendedClient) {
    this.client = client;
    this.rest = new REST({ version: "10" }).setToken(this.client.config.token);
  }

  public async deployGlobally() {
    const commands = this.client.registry.slashCommands;
    const commandBodies = commands.flatMap(
      (command) => command.allDataBuilders
    );

    return this.rest.put(Routes.applicationCommands(this.client.user!.id), {
      body: commandBodies,
    });
  }

  public async deployToDevGuild() {
    const commands = this.client.registry.slashCommands;
    const commandBodies = commands.flatMap(
      (command) => command.allDataBuilders
    );

    return this.rest.put(
      Routes.applicationGuildCommands(
        this.client.config.clientID,
        this.client.config._devGuildID!
      ),
      {
        body: commandBodies,
      }
    );
  }
}
