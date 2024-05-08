import { ChatInputCommandInteraction, EmbedBuilder, Message } from "discord.js";

import Colors from "../../../../../providers/Colors";
import ExtendedClient from "../../../../ExtendedClient";
import SlashCommand from "../../../SlashCommand";
import { SlashCommandBuilder } from "@discordjs/builders";
import axios from "axios";

class WikipediaSlashCommand extends SlashCommand {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "wikipedia",
      description: "get wikipedia search results right into your channel",
      aliases: ["wiki"],
      category: "Utility",
      cooldown: 10,
      clientPermissions: ["SendMessages", "EmbedLinks"],
      userPermissions: ["SendMessages", "EmbedLinks"],
      ownerOnly: false,
      dataBuilder: new SlashCommandBuilder().addStringOption((option) =>
        option
          .setName("query")
          .setDescription("Enter the query to search wikipedia")
          .setRequired(true)
      ),
      emoji: "🌐",
    });
  }

  public async run(interaction: ChatInputCommandInteraction): Promise<void> {
    const query = interaction.options.getString("query", true);

    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      query
    )}`;
    let response = await axios.get(url);

    if (response.data.type === "disambiguation") {
      const embed = new EmbedBuilder()
        .setColor(Colors.PRIMARY)
        .setAuthor({
          name: "Wikipedia",
          iconURL:
            "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png",
        })
        .setTitle(response.data.title)
        .setURL(response.data.content_urls.desktop.page)
        .setDescription(
          `${response.data.extract}. [Link](${response.data.content_urls.desktop.page})`
        )
        .setTimestamp();

      interaction.reply({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setColor(Colors.PRIMARY)
        .setAuthor({
          name: "Wikipedia",
          iconURL:
            "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png",
        })
        .setTitle(response.data.title)
        .setURL(response.data.content_urls.desktop.page)
        .setDescription(response.data.extract)
        .setTimestamp();

      interaction.reply({ embeds: [embed] });
    }
  }
}

export default WikipediaSlashCommand;
