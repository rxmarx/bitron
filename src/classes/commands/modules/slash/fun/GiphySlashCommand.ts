import { ChatInputCommandInteraction, EmbedBuilder, Message } from "discord.js";

import Colors from "../../../../../providers/Colors";
import ExtendedClient from "../../../../ExtendedClient";
import SlashCommand from "../../../SlashCommand";
import { SlashCommandBuilder } from "@discordjs/builders";
import axios from "axios";

class GiphySlashCommand extends SlashCommand {
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
      dataBuilder: new SlashCommandBuilder().addStringOption((option) =>
        option
          .setName("query")
          .setDescription("Enter few keywords to search in the giphy library.")
          .setRequired(true)
      ),
      emoji: "🤣",
      premiumCommand: true,
      cost: 1500,
    });
  }

  public async run(interaction: ChatInputCommandInteraction): Promise<void> {
    const query = interaction.options.getString("query");

    const validRatings = ["g", "pg", "pg13"];

    const randomRating =
      validRatings[Math.floor(Math.random() * validRatings.length)];

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${this.client.config.giphyApiKey}&q=\"${query}\"&rating=${randomRating}`;
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

    interaction.reply({ embeds: [embed] });
  }
}

export default GiphySlashCommand;
