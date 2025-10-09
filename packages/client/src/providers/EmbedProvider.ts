import { ChatInputCommandInteraction, EmbedBuilder, Message } from "discord.js";

import Colors from "./Colors";
import ExtendedClient from "../classes/ExtendedClient";
import GenericCommand from "../classes/commands/GenericCommand";
import SlashCommand from "../classes/commands/SlashCommand";

class EmbedProvider {
  public static valid(text: string): EmbedBuilder {
    const embed = new EmbedBuilder().setColor(Colors.GREEN).setDescription(`✅ ${text}`);

    return embed;
  }

  public static invalid(text: string): EmbedBuilder {
    const embed = new EmbedBuilder().setColor(Colors.RED).setDescription(`❌ ${text}`);

    return embed;
  }

  public static genericCommandExecuteEmbed(
    command: GenericCommand,
    message: Message,
    client: ExtendedClient,
  ): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor(Colors.GREEN)
      .setTitle("[Command Execute]")
      .setDescription(
        `User: \`${message.member?.user.username}\`\nGuild: \`${message.guild?.name}\`\nChannel: \`${message.guild?.channels.cache.get(message.channel.id)!.name}\`\n**Command:** \`${command.name}\`\nType: \`Generic Command\``,
      )
      .setFooter({
        text: client.user!.tag,
        iconURL: client.user?.avatarURL() || "",
      });

    return embed;
  }

  public static slashCommandExecuteEmbed(
    command: SlashCommand,
    interaction: ChatInputCommandInteraction,
    client: ExtendedClient,
  ): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor(Colors.GREEN)
      .setTitle("[Command Execute]")
      .setDescription(
        `User: \`${interaction.member?.user.username}\`\nGuild: \`${interaction.guild?.name}\`\nChannel: \`${interaction.guild?.channels.cache.get(interaction.channel!.id)!.name}\`\n**Command:** \`${command.name}\`\nType: \`Slash Command\``,
      )
      .setFooter({
        text: client.user!.tag,
        iconURL: client.user?.avatarURL() || "",
      });

    return embed;
  }

  public static genericCommandErrorEmbed(
    error: unknown,
    command: GenericCommand,
    message: Message,
    client: ExtendedClient,
  ): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor(Colors.RED)
      .setTitle("[Command Error]")
      .setDescription(
        `User: \`${message.member?.user.username}\`\nGuild: \`${message.guild?.name}\`\nChannel: \`${message.guild?.channels.cache.get(message.channel.id)!.name}\`\n**Command:** \`${command.name}\`\nType: \`Generic Command\`\nERROR: \`${String(error)}\``,
      )
      .setFooter({
        text: client.user!.tag,
        iconURL: client.user?.avatarURL() || "",
      });

    return embed;
  }

  public static slashCommandErrorEmbed(
    error: unknown,
    command: SlashCommand,
    interaction: ChatInputCommandInteraction,
    client: ExtendedClient,
  ): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor(Colors.GREEN)
      .setTitle("[Command Error]")
      .setDescription(
        `User: \`${interaction.member?.user.username}\`\nGuild: \`${interaction.guild?.name}\`\nChannel: \`${interaction.guild?.channels.cache.get(interaction.channel!.id)!.name}\`\n**Command:** \`${command.name}\`\nType: \`Slash Command\`\nERROR: \`${String(error)}\``,
      )
      .setFooter({
        text: client.user!.tag,
        iconURL: client.user?.avatarURL() || "",
      });

    return embed;
  }

  public static cacheErrorEmbed(error: unknown, client: ExtendedClient): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor(Colors.RED)
      .setTitle("[Cache Error]")
      .setDescription(`\`${String(error)}\``)
      .setFooter({
        text: client.user!.tag,
        iconURL: client.user?.avatarURL() || "",
      });

    return embed;
  }
}

export default EmbedProvider;
