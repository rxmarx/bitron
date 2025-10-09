import { REST, Routes } from "discord.js";

import ExtendedClient from "../ExtendedClient";

class SlashCommandDeployer {
  private readonly client: ExtendedClient;
  private readonly rest: REST;

  constructor(client: ExtendedClient) {
    this.client = client;
    this.rest = new REST({ version: "10" }).setToken(this.client.config.token);
  }

  public async deployGlobally() {
    const commands = this.client.registry.slashCommands;
    const commandBodies = commands.map((command) => command.allDataBuilders);

    await this.rest.put(Routes.applicationCommands(this.client.user!.id), {
      body: commandBodies,
    });
  }

  public async deployToDevGuild() {
    const commands = this.client.registry.slashCommands;
    const commandBodies = commands.map((command) => command.allDataBuilders);

    await this.rest.put(
      Routes.applicationGuildCommands(this.client.user!.id, this.client.config.devGuild.id),
      { body: commandBodies },
    );
  }
}

export default SlashCommandDeployer;
