import { EmbedBuilder, Message } from "discord.js";

import Colors from "../../../../../providers/Colors";
import EmbedProvider from "../../../../../providers/EmbedProvider";
import ExtendedClient from "../../../../ExtendedClient";
import GenericCommand from "../../../GenericCommand";
import axios from "axios";

class WikipediaGenericCommand extends GenericCommand {
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
      emoji: "🌐",
      premiumCommand: false,
    });
  }

  public async run(message: Message<boolean>, args: string[]): Promise<void> {
    const query = args.join(" ");

    if (!query) {
      message.channel.send({
        embeds: [
          EmbedProvider.invalid(
            "Please provide a valid query to search wikipedia"
          ),
        ],
      });
      return;
    }

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

      message.channel.send({ embeds: [embed] });
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

      message.channel.send({ embeds: [embed] });
    }
  }
}

export default WikipediaGenericCommand;
