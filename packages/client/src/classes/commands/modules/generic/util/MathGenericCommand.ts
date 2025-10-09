import { EmbedBuilder, Message } from "discord.js";

import Colors from "../../../../../providers/Colors";
import EmbedProvider from "../../../../../providers/EmbedProvider";
import ExtendedClient from "../../../../ExtendedClient";
import GenericCommand from "../../../GenericCommand";
import { Premium } from "../../../../../types/enums/Premium";
import axios from "axios";

class MathGenericCommand extends GenericCommand {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "math",
      description: "calculates the expression given",
      aliases: [],
      category: "Utility",
      cooldown: 10,
      clientPermissions: ["SendMessages"],
      userPermissions: ["SendMessages"],
      ownerOnly: false,
      emoji: "🟰",
      premium: Premium.TIER0,
    });
  }

  public async run(message: Message<true>, args: string[]): Promise<void> {
    const expression = args[0];

    if (args[1]) {
      message.channel.send({
        embeds: [EmbedProvider.invalid("Please enter only the expression needed to be calculated")],
      });
      return;
    }

    if (!expression) {
      message.channel.send({
        embeds: [EmbedProvider.invalid("Please enter the expression needed to be calculated")],
      });
      return;
    }

    const url = `http://api.mathjs.org/v4/?expr=${encodeURIComponent(expression)}&precision=64`;
    const response = await axios.get(url);

    const embed = new EmbedBuilder({
      title: expression,
      description: `**Answer:**\`${response.data}\``,
      timestamp: new Date(),
      color: Colors.PRIMARY,
    });

    message.channel.send({ embeds: [embed] });
  }
}

export default MathGenericCommand;
