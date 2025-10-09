import { EmbedBuilder, Message } from "discord.js";

import Colors from "../../../../../providers/Colors";
import EmbedProvider from "../../../../../providers/EmbedProvider";
import ExtendedClient from "../../../../ExtendedClient";
import GenericCommand from "../../../GenericCommand";
import { Premium } from "../../../../../types/enums/Premium";
import axios from "axios";

class WikiGenericCommand extends GenericCommand {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "wiki",
      description: "searches wikipedia",
      aliases: [],
      category: "Utility",
      cooldown: 10,
      clientPermissions: ["SendMessages", "EmbedLinks"],
      userPermissions: ["SendMessages", "EmbedLinks"],
      ownerOnly: false,
      emoji: "👓",
      premium: Premium.TIER0,
    });
  }

  public async run(message: Message<true>, args: string[]): Promise<void> {
    const query = args.join(" ");

    if (!query) {
      message.channel.send({ embeds: [EmbedProvider.invalid("Please enter your search")] });
      return;
    }

    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const response = await axios.get(url);

    if (response.data.type === "disambiguation") {
      const embed = new EmbedBuilder({
        title: `${response.data.title}`,
        url: response.data.content_urls.desktop.page,
        description: `${response.data.extract}. [Link](${response.data.content_urls.desktop.page})`,
        author: {
          name: "Wikipedia",
          icon_url:
            "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png",
        },
        timestamp: new Date(),
        color: Colors.PRIMARY,
      });

      message.channel.send({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder({
        title: `${response.data.title}`,
        url: response.data.content_urls.desktop.page,
        description: `${response.data.extract}`,
        author: {
          name: "Wikipedia",
          icon_url:
            "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png",
        },
        timestamp: new Date(),
        color: Colors.PRIMARY,
      });

      message.channel.send({ embeds: [embed] });
    }
  }
}

export default WikiGenericCommand;
