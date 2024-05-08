import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

import Colors from "../../../../../providers/Colors";
import ExtendedClient from "../../../../ExtendedClient";
import SlashCommand from "../../../SlashCommand";
import { SlashCommandBuilder } from "@discordjs/builders";

class PingSlashCommand extends SlashCommand {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "ping",
      description: "sends the latency of the client.",
      aliases: ["latency"],
      category: "Information",
      cooldown: 10,
      clientPermissions: ["SendMessages", "AddReactions"],
      userPermissions: ["SendMessages"],
      ownerOnly: false,
      dataBuilder: new SlashCommandBuilder(),
      emoji: "🏓",
    });
  }

  public async run(interaction: ChatInputCommandInteraction): Promise<void> {
    const ping = this.client.ws.ping;

    const embed = new EmbedBuilder()
      .setTitle("Pong! 🏓")
      .setColor(
        ping >= 1000 ? Colors.RED : ping >= 500 ? Colors.ORANGE : Colors.GREEN
      )
      .setDescription(
        `Latency: ${ping}ms ${ping >= 1000 ? "🔴" : ping >= 500 ? "🟠" : "🟢"}`
      )
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  }
}

export default PingSlashCommand;
