import { ChatInputCommandInteraction, Guild, Message } from "discord.js";
import { EmbedBuilder, codeBlock } from "@discordjs/builders";

import Colors from "./Colors";
import ExtendedClient from "../classes/ExtendedClient";
import GenericCommand from "../classes/commands/GenericCommand";
import SlashCommand from "../classes/commands/SlashCommand";

class EmbedProvider {
  public static genericCommandExecuteEmbed(
    command: GenericCommand,
    message: Message,
    client: ExtendedClient
  ): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor(Colors.GREEN)
      .setTitle("[Command Execute]")
      .setDescription(
        `User: \`${message.member?.user.username}\`\nGuild: \`${message.guild
          ?.name}\`\nChannel: \`${message.guild?.channels.cache.get(
          message.channel!.id
        )!.name}\`\n**Command:** \`${command.name}\`\nType: \`Generic command\``
      )
      .setFooter({
        text: client.user!.tag,
        iconURL: client.config.botProfile,
      })
      .setTimestamp();

    return embed;
  }

  public static slashCommandExecuteEmbed(
    command: SlashCommand,
    interaction: ChatInputCommandInteraction,
    client: ExtendedClient
  ): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor(Colors.GREEN)
      .setTitle("[Command Execute]")
      .setDescription(
        `User: \`${interaction.member?.user.username}\`\nGuild: \`${interaction
          .guild?.name}\`\nChannel: \`${interaction.guild?.channels.cache.get(
          interaction.channel!.id
        )!.name}\`\n**Command:** \`${command.name}\`\nType: \`Slash command\``
      )
      .setFooter({
        text: client.user!.tag,
        iconURL: client.config.botProfile,
      })
      .setTimestamp();

    return embed;
  }

  public static genericCommandErrorEmbed(
    error: unknown,
    command: GenericCommand,
    message: Message,
    client: ExtendedClient
  ): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor(Colors.RED)
      .setTitle("[Command Error]")
      .setDescription(
        `User: \`${message.member?.user.username}\`\nGuild: \`${message.guild
          ?.name}\`\nChannel: \`${message.guild?.channels.cache.get(
          message.channel!.id
        )!.name}\`\n**Command:** \`${
          command.name
        }\`\nType: \`Generic command\`\n\`ERROR: ${error}\``
      )
      .setFooter({
        text: client.user!.tag,
        iconURL: client.config.botProfile,
      })
      .setTimestamp();

    return embed;
  }

  public static slashCommandErrorEmbed(
    error: unknown,
    command: SlashCommand,
    interaction: ChatInputCommandInteraction,
    client: ExtendedClient
  ): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor(Colors.RED)
      .setTitle("[Command Error]")
      .setDescription(
        `User: \`${interaction.member?.user.username}\`\nGuild: \`${interaction
          .guild?.name}\`\nChannel: \`${interaction.guild?.channels.cache.get(
          interaction.channel!.id
        )!.name}\`\n**Command:** \`${
          command.name
        }\`\nType: \`Slash command\`\n\`ERROR: \`${error}\``
      )
      .setFooter({
        text: client.user!.tag,
        iconURL: client.config.botProfile,
      })
      .setTimestamp();

    return embed;
  }

  public static databaseErrorEmbed(error: unknown): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor(Colors.RED)
      .setTitle("[Database Error]")
      .setDescription(codeBlock(`${error}`))
      .setTimestamp();

    return embed;
  }

  public static valid(text: string): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor(Colors.GREEN)
      .setDescription(`✅ ${text}`);

    return embed;
  }

  public static invalid(text: string): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor(Colors.RED)
      .setDescription(`❌ ${text}`);

    return embed;
  }

  public static guildCreate(guild: Guild): EmbedBuilder {
    const embed = new EmbedBuilder()
    .setColor(Colors.GREEN)
    .setDescription(`Name: \`${guild.name}\`\nOwner: <@${guild.ownerId}>`)
    .setTimestamp();

    return embed;
  }
}

export default EmbedProvider;
