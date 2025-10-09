import { ChannelType, EmbedBuilder, Message } from "discord.js";

import Colors from "../../../../../providers/Colors";
import EmbedProvider from "../../../../../providers/EmbedProvider";
import ExtendedClient from "../../../../ExtendedClient";
import GenericCommand from "../../../GenericCommand";
import { Premium } from "../../../../../types/enums/Premium";
import { isInteger } from "lodash";

class PurgeGenericCommand extends GenericCommand {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "purge",
      description: "delete messages at once",
      aliases: ["clean"],
      category: "Moderation",
      cooldown: 10,
      clientPermissions: ["SendMessages", "ManageMessages", "ManageChannels"],
      userPermissions: ["ManageMessages"],
      ownerOnly: false,
      emoji: "🧹",
      premium: Premium.TIER0,
    });
  }

  public async run(message: Message<true>, args: string[]): Promise<void> {
    const amount: number = Number(args[0]);

    if (!amount || isNaN(amount) || !isInteger(amount)) {
      message.channel.send({
        embeds: [EmbedProvider.invalid("Please provide a natural number for the deletion")],
      });
      return;
    }

    if (amount > 100) {
      message.channel.send({
        embeds: [EmbedProvider.invalid("Make sure you delete 100 messages or less at once")],
      });
      return;
    }

    await message.channel.messages.fetch({ limit: amount }).then((messages) => {
      if (message.channel.type === ChannelType.GuildText) {
        message.channel.bulkDelete(messages);

        const content: string[] = messages.map(
          (message) => `[${message.author.username}]: ${message.content}`,
        );

        const embed = new EmbedBuilder({
          title: `${messages.size} messages purged in ${message.channel.name}`,
          description: `${content[9] || ""}\n${content[8] || ""}\n${content[7] || ""}\n${content[6] || ""}\n${content[5] || ""}\n${content[4] || ""}\n${content[3] || ""}\n${content[2] || ""}\n${content[1] || ""}\n${content[0] || ""}`,
          footer: { text: "last 10 messages shown" },
          timestamp: new Date(),
          color: Colors.PRIMARY,
        });

        message.channel.send({ embeds: [embed] }).then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        });
      } else {
        message.channel.send({
          embeds: [EmbedProvider.invalid("Cannot delete messages in this channel")],
        });
      }
    });
  }
}

export default PurgeGenericCommand;
