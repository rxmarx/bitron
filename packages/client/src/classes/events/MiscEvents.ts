import { ChatInputCommandInteraction, Message } from "discord.js";

import Command from "../commands/Command";
import { CommandTrigger } from "../../types";
import EmbedProvider from "../../providers/EmbedProvider";
import ExtendedClient from "../ExtendedClient";
import GenericCommand from "../commands/GenericCommand";
import SlashCommand from "../commands/SlashCommand";

class MiscEvents {
  public static async commandExecute(
    command: Command<CommandTrigger>,
    trigger: CommandTrigger,
    client: ExtendedClient,
  ): Promise<void> {
    if (command instanceof GenericCommand) {
      await client.config.devChannel.send({
        embeds: [EmbedProvider.genericCommandExecuteEmbed(command, trigger as Message, client)],
      });
    }
    if (command instanceof SlashCommand) {
      await client.config.devChannel.send({
        embeds: [
          EmbedProvider.slashCommandExecuteEmbed(
            command,
            trigger as ChatInputCommandInteraction,
            client,
          ),
        ],
      });
    }
  }

  public static async commandError(
    error: unknown,
    command: Command<CommandTrigger>,
    trigger: CommandTrigger,
    client: ExtendedClient,
  ): Promise<void> {
    if (command instanceof GenericCommand) {
      await client.config.errorChannel.send({
        embeds: [
          EmbedProvider.genericCommandErrorEmbed(error, command, trigger as Message, client),
        ],
      });
    }
    if (command instanceof SlashCommand) {
      await client.config.errorChannel.send({
        embeds: [
          EmbedProvider.slashCommandErrorEmbed(
            error,
            command,
            trigger as ChatInputCommandInteraction,
            client,
          ),
        ],
      });
    }
  }

  public static async cacheError(error: unknown, client: ExtendedClient): Promise<void> {
    await client.config.errorChannel.send({
      embeds: [EmbedProvider.cacheErrorEmbed(error, client)],
    });
  }
}

export default MiscEvents;
