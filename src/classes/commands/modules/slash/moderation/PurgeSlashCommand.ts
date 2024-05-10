import { ChannelType, ChatInputCommandInteraction } from "discord.js";
import { EmbedBuilder, SlashCommandBuilder } from "@discordjs/builders";

import Colors from "../../../../../providers/Colors";
import EmbedProvider from "../../../../../providers/EmbedProvider";
import ExtendedClient from "../../../../ExtendedClient";
import SlashCommand from "../../../SlashCommand";

class PurgeSlashCommand extends SlashCommand {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "purge",
      description:
        "delete messages that are inappropriate or just to make the channel look clean",
      aliases: ["clean"],
      category: "Moderation",
      cooldown: 10,
      clientPermissions: ["SendMessages", "ManageMessages", "ManageChannels"],
      userPermissions: ["ManageMessages"],
      ownerOnly: false,
      dataBuilder: new SlashCommandBuilder().addNumberOption((option) =>
        option
          .setName("amount")
          .setDescription("number of messages you want to delete. Limit 100")
          .setRequired(true)
          .setMinValue(1)
          .setMaxValue(100)
      ),
      emoji: "🧹",
      premiumCommand: false,
    });
  }

  public async run(interaction: ChatInputCommandInteraction): Promise<void> {
    let amount: number = interaction.options.getNumber("amount", true);

    await interaction.channel?.messages
      .fetch({ limit: amount })
      .then((messages) => {
        if (interaction.channel?.type === ChannelType.GuildText) {
          interaction.channel.bulkDelete(messages);

          const content: string[] = messages.map(
            (message) => `[${message.author.username}]: ${message.content}`
          );

          const embed = new EmbedBuilder()
            .setColor(Colors.RED)
            .setTitle(
              `${messages.size} Messages purged in #${interaction.channel.name}`
            )
            .setDescription(
              `${content[0]}\n${content[1]}\n${content[2]}\n${content[3]}\n${content[4]}\n${content[5]}\n${content[6]}\n${content[7]}\n${content[8]}\n${content[9]}`
            )
            .setFooter({ text: `10 latest shown` })
            .setTimestamp();

          interaction
            .reply({ embeds: [embed] })
            .then((message) => {
              setTimeout(() => message.delete(), 10000);
            })
            .catch((error) => {
              this.client.emit(
                "commandError",
                error,
                this,
                interaction,
                this.client
              );
            });
        } else {
          interaction.reply({
            embeds: [
              EmbedProvider.invalid(
                "Sorry!, you cannot delete messages in this channel"
              ),
            ],
          });
          return;
        }
      })
      .catch((error) => {
        interaction.reply({
          embeds: [
            EmbedProvider.invalid("Cannot delete messages older than 14 days!"),
          ],
        });
        return;
      });
  }
}

export default PurgeSlashCommand;
