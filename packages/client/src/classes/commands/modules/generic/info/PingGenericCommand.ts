import { EmbedBuilder, Message } from "discord.js";

import Colors from "../../../../../providers/Colors";
import ExtendedClient from "../../../../ExtendedClient";
import GenericCommand from "../../../GenericCommand";
import { Premium } from "../../../../../types/enums/Premium";

class PingGenericCommand extends GenericCommand {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "ping",
      description: "sends the latency of the client",
      aliases: ["latency"],
      category: "Information",
      cooldown: 10,
      clientPermissions: ["SendMessages", "AddReactions"],
      userPermissions: ["SendMessages"],
      ownerOnly: false,
      emoji: "🏓",
      premium: Premium.TIER0,
    });
  }

  public async run(message: Message<true>, args: string[]): Promise<void> {
    if (args.length !== 0) {
      return;
    }

    message.channel.send("Pinging 🏓...").then((msg) => {
      const embed = new EmbedBuilder({
        description: `**Pinged** 🏓\nAPI Latency: \`${this.client.ws.ping}ms\`\nBot's Latency: \`${msg.createdTimestamp - message.createdTimestamp}ms\``,
        color: Colors.PRIMARY,
      });

      msg.edit({ content: "", embeds: [embed] });
    });
  }
}

export default PingGenericCommand;
