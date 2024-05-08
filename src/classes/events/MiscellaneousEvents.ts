import { ChatInputCommandInteraction, Message } from "discord.js";

import Command from "../commands/Command";
import { CommandTrigger } from "../../types";
import EmbedProvider from "../../providers/EmbedProvider";
import ExtendedClient from "../ExtendedClient";
import GenericCommand from "../commands/GenericCommand";
import SlashCommand from "../commands/SlashCommand";

class MiscellaneousEvents {
  public static commandExecute(
    command: Command<CommandTrigger>,
    trigger: CommandTrigger,
    client: ExtendedClient
  ): void {
    if (command instanceof GenericCommand) {
      client.config.devChannel.send({
        embeds: [
          EmbedProvider.genericCommandExecuteEmbed(
            command,
            trigger as Message,
            client
          ),
        ],
      });
    }
    if (command instanceof SlashCommand) {
      client.config.devChannel.send({
        embeds: [
          EmbedProvider.slashCommandExecuteEmbed(
            command,
            trigger as ChatInputCommandInteraction,
            client
          ),
        ],
      });
    }
  }

  public static commandError(
    error: unknown,
    command: Command<CommandTrigger>,
    trigger: CommandTrigger,
    client: ExtendedClient
  ): void {
    if (command instanceof GenericCommand) {
      client.config.errorChannel.send({
        embeds: [
          EmbedProvider.genericCommandErrorEmbed(
            error,
            command,
            trigger as Message,
            client
          ),
        ],
      });
    }
    if (command instanceof SlashCommand) {
      client.config.errorChannel.send({
        embeds: [
          EmbedProvider.slashCommandErrorEmbed(
            error,
            command,
            trigger as ChatInputCommandInteraction,
            client
          ),
        ],
      });
    }
  }

  public static databaseError(error: unknown, client: ExtendedClient): void {
    client.config.errorChannel.send({
      embeds: [EmbedProvider.databaseErrorEmbed(error)],
    });
  }
}

export default MiscellaneousEvents;
