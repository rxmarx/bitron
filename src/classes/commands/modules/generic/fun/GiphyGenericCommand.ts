import { EmbedBuilder, Message } from "discord.js";

import Colors from "../../../../../providers/Colors";
import EmbedProvider from "../../../../../providers/EmbedProvider";
import ExtendedClient from "../../../../ExtendedClient";
import GenericCommand from "../../../GenericCommand";
import axios from "axios";

class GiphyGenericCommand extends GenericCommand {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "giphy",
      description: "sends a gif based on the users input",
      aliases: [],
      category: "Fun",
      cooldown: 10,
      clientPermissions: ["SendMessages", "EmbedLinks"],
      userPermissions: ["SendMessages", "EmbedLinks"],
      ownerOnly: false,
      emoji: "🤣",
    });
  }

  public async run(message: Message, args: string[]): Promise<void> {
    const keywords = args.join(" ");

    const validRatings = ["g", "pg", "pg13"];

    if (!keywords) {
      message.channel.send({
        embeds: [EmbedProvider.invalid("please enter a keyword to search")],
      });
    }

    const randomRating =
      validRatings[Math.floor(Math.random() * validRatings.length)];

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${this.client.config.giphyApiKey}&q=\"${keywords}\"&rating=${randomRating}`;
    const response = await axios.get(url);

    const index = Math.floor(Math.random() * response.data.data.length);

    const embed = new EmbedBuilder()
      .setColor(Colors.RED)
      .setTitle(response.data.data[index].title)
      .setDescription("GIF powered by GIPHY API")
      .setFooter({
        text: `Rating: ${response.data.data[index].rating}`,
      })
      .setImage(response.data.data[index].images.original.url)
      .setThumbnail(
        "https://raw.githubusercontent.com/Giphy/GiphyAPI/master/api_giphy_header.gif"
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
}

export default GiphyGenericCommand;
