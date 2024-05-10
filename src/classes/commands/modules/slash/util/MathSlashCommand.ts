import { EmbedBuilder, SlashCommandBuilder } from "@discordjs/builders";

import { ChatInputCommandInteraction } from "discord.js";
import Colors from "../../../../../providers/Colors";
import EmbedProvider from "../../../../../providers/EmbedProvider";
import ExtendedClient from "../../../../ExtendedClient";
import SlashCommand from "../../../SlashCommand";
import axios from "axios";

class MathSlashCommand extends SlashCommand {
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
      dataBuilder: new SlashCommandBuilder().addStringOption((option) =>
        option
          .setName("expression")
          .setDescription("enter an expression to get it solved")
          .setRequired(true)
      ),
      emoji: "➕",
      premiumCommand: false,
    });
  }

  public async run(interaction: ChatInputCommandInteraction): Promise<void> {
    const expression: string = interaction.options.getString(
      "expression",
      true
    );

    const url = `http://api.mathjs.org/v4/?expr=${encodeURIComponent(
      expression
    )}&precision=64`;

    try {
      const response = await axios.get(url);

      if (!response.data) {
        interaction.reply({
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

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      interaction.reply({
        embeds: [
          EmbedProvider.invalid(
            "Enter only mathematical operations and numbers"
          ),
        ],
      });
      this.client.emit("commandError", error, this, interaction, this.client);
    }
  }
}

export default MathSlashCommand;
