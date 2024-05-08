import { Collection, Interaction, Message } from "discord.js";

import EmbedProvider from "../../providers/EmbedProvider";
import ExtendedClient from "../ExtendedClient";
import GenericCommand from "./GenericCommand";
import Registry from "../Registry";
import SlashCommand from "./SlashCommand";

class CommandDispatcher {
  private readonly client: ExtendedClient;
  private readonly registry: Registry;

  private readonly cooldowns: Collection<string, Collection<string, number>>;

  constructor(client: ExtendedClient, registry: Registry) {
    this.client = client;
    this.registry = registry;

    this.cooldowns = new Collection();
  }

  public async handleMessage(message: Message): Promise<void> {
    const guild = await this.client.database.guild.findUnique({
      where: {
        id: message.guild!.id,
      },
    });

    const prefix: string = String(guild!.prefix)[0];

    if (
      message.partial ||
      message.author.bot ||
      !message.content.startsWith(prefix)
    ) {
      return;
    }

    const args: string[] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/);
    const cmd: string | undefined = args.shift()?.toLowerCase();

    const command = this.registry.resolveGenericCommand(cmd!);

    if (!command) {
      message.channel.send({
        embeds: [
          EmbedProvider.invalid(
            `\`${cmd}\` command doesn't exist. Check if made a typo!`
          ),
        ],
      });
      return;
    }

    if (!(command instanceof GenericCommand) || !message.guild) {
      return;
    }

    try {
      const hasPermission = command.hasPermissions(message);

      if (typeof hasPermission === "string") {
        await message.reply({ embeds: [EmbedProvider.invalid(hasPermission)] });
        return;
      }

      if (!this.cooldowns.has(command.name)) {
        this.cooldowns.set(command.name, new Collection());
      }

      const currentTime: number = Date.now();
      const timeStamps: Collection<string, number> = this.cooldowns.get(
        command.name
      )!;
      const cooldownAmount = command.cooldown * 1000;

      if (timeStamps.has(message.author.id)) {
        const expirationTime =
          timeStamps.get(message.author.id)! + cooldownAmount;

        if (currentTime < expirationTime) {
          let timeLeft: string | number = (expirationTime - currentTime) / 1000;
          timeLeft = Number(timeLeft.toFixed());

          if (timeLeft >= 3600) {
            timeLeft = `${timeLeft / 3600} hour(s)`;
          } else if (timeLeft >= 60) {
            timeLeft = `${timeLeft / 60} minutes(s)`;
          } else {
            timeLeft = timeLeft;
          }

          message.channel.send({
            embeds: [
              EmbedProvider.invalid(
                `Hold your horses!\nPlease wait ${timeLeft} to run ${command.name} again!`
              ),
            ],
          });
          return;
        }
      }

      timeStamps.set(message.author.id, currentTime);

      setTimeout(() => timeStamps.delete(message.author.id), cooldownAmount);

      this.client.emit("commandExecute", command, message, this.client);
      await command.run(message, args);
    } catch (error) {
      command.onError(error, message);
    }
  }

  public async handleInteraction(interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const command = this.registry.resolveSlashCommand(interaction.commandName);

    if (
      !command ||
      !(command instanceof SlashCommand) ||
      !interaction.inGuild()
    ) {
      return;
    }

    try {
      const hasPermission = command.hasPermissions(interaction);
      if (typeof hasPermission === "string") {
        await interaction.reply({
          embeds: [EmbedProvider.invalid(hasPermission)],
        });
        return;
      }

      this.client.emit("commandExecute", command, interaction, this.client);
      await command.run(interaction);
    } catch (error) {
      command.onError(error, interaction);
    }
  }
}

export default CommandDispatcher;
