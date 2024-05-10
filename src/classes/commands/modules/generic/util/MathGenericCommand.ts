import Colors from "../../../../../providers/Colors";
import { EmbedBuilder } from "@discordjs/builders";
import EmbedProvider from "../../../../../providers/EmbedProvider";
import ExtendedClient from "../../../../ExtendedClient";
import GenericCommand from "../../../GenericCommand";
import { Message } from "discord.js";
import axios from "axios";

class MathGenericCommand extends GenericCommand {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "math",
      description: "solves various math expressions and gives a precise answer",
      aliases: [],
      cooldown: 10,
      category: "Utility",
      clientPermissions: ["SendMessages"],
      userPermissions: ["SendMessages"],
      ownerOnly: false,
      emoji: "➕",
      premiumCommand: false,
    });
  }

  public async run(message: Message<boolean>, args: string[]): Promise<void> {
    const expression: string = args[0];

    if (args[1]) {
      message.channel.send({
        embeds: [EmbedProvider.invalid("Enter only math expressions")],
      });
      return;
    }

    if (!expression) {
      message.channel.send({
        embeds: [EmbedProvider.invalid("Enter a expression to solve")],
      });
      return;
    }

    const url = `http://api.mathjs.org/v4/?expr=${encodeURIComponent(
      expression
    )}&precision=64`;

    try {
      const response = await axios.get(url);

      if (!response.data) {
        message.channel.send({
          embeds: [
            EmbedProvider.invalid(
              "Enter only mathematical operations and numbers"
            ),
          ],
        });
        return;
      }

      const embed = new EmbedBuilder()
        .setColor(Colors.PRIMARY)
        .setTitle(expression)
        .setDescription(`\`${response.data}\``)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      this.client.emit("commandError", error, this, message, this.client);
    }
  }
}

export default MathGenericCommand;
