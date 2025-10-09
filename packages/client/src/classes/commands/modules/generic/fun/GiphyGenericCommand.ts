import { EmbedBuilder, Message } from "discord.js";

import Colors from "../../../../../providers/Colors";
import EmbedProvider from "../../../../../providers/EmbedProvider";
import ExtendedClient from "../../../../ExtendedClient";
import GenericCommand from "../../../GenericCommand";
import { Premium } from "../../../../../types/enums/Premium";
import axios from "axios";

class GiphyGenericCommand extends GenericCommand {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "giphy",
      description: "sends gifs",
      aliases: [],
      category: "Fun",
      cooldown: 10,
      clientPermissions: ["SendMessages", "EmbedLinks"],
      userPermissions: ["SendMessages", "EmbedLinks"],
      ownerOnly: false,
      emoji: "🤣",
      premium: Premium.TIER0,
    });
  }

  public async run(message: Message<true>, args: string[]): Promise<void> {
    const query = args.join(" ");

    const validRatings = ["g", "pg", "pg13"];

    if (!query) {
      message.channel.send({
        embeds: [EmbedProvider.invalid("Please enter a keyword for the gif to be sent")],
      });
      return;
    }

    const randomRating = Math.floor(Math.random() * validRatings.length);

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${this.client.config.giphyAPI}&q="${query}"&rating=${randomRating}`;
    const response = await axios.get(url);

    const index = Math.floor(Math.random() * response.data.data.length);

    const embed = new EmbedBuilder({
      title: `${response.data.data[index].title}`,
      footer: { text: `Rating: ${response.data.data[index].rating}` },
      image: { url: response.data.data[index].images.original.url },
      color: Colors.PRIMARY,
    });

    message.channel.send({ embeds: [embed] });
  }
}

export default GiphyGenericCommand;
