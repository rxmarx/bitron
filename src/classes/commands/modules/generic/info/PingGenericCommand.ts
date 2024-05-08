import { EmbedBuilder, Message } from "discord.js";

import Colors from "../../../../../providers/Colors";
import ExtendedClient from "../../../../ExtendedClient";
import GenericCommand from "../../../GenericCommand";

class PingGenericCommand extends GenericCommand {
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
      emoji: "🏓",
    });
  }

  public async run(message: Message, args: string[]): Promise<void> {
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

    message.channel.send({ embeds: [embed] });
  }
}

export default PingGenericCommand;
