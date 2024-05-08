import { ChannelType, Message } from "discord.js";

import Colors from "../../../../../providers/Colors";
import { EmbedBuilder } from "@discordjs/builders";
import EmbedProvider from "../../../../../providers/EmbedProvider";
import ExtendedClient from "../../../../ExtendedClient";
import GenericCommand from "../../../GenericCommand";
import { isInteger } from "lodash";

class PurgeGenericCommand extends GenericCommand {
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
      emoji: "🧹",
    });
  }

  public async run(message: Message<boolean>, args: string[]): Promise<void> {
    let amount: number = Number(args[0]);

    if (args[1]) {
      message.channel.send({
        embeds: [
          EmbedProvider.invalid(
            "Enter only the amount of messages you want to delete"
          ),
        ],
      });
      return;
    }
    if (!amount) {
      message.channel.send({
        embeds: [
          EmbedProvider.invalid(
            "Enter the amount of messages you want to delete"
          ),
        ],
      });
      return;
    }
    if (isNaN(amount)) {
      message.channel.send({
        embeds: [
          EmbedProvider.invalid("Make sure the amount of messages is a value"),
        ],
      });
      return;
    }
    if (!isInteger(amount)) {
      message.channel.send({
        embeds: [
          EmbedProvider.invalid("Make sure you enter only natural numbers"),
        ],
      });
      return;
    }

    if (amount > 100) {
      message.channel.send({
        embeds: [
          EmbedProvider.invalid(
            "You cannot delete more than 100 messages at once"
          ),
        ],
      });
      return;
    }
    if (amount < 1) {
      message.channel.send({
        embeds: [
          EmbedProvider.invalid("You should delete at least one message"),
        ],
      });
      return;
    }

    await message.channel.messages
      .fetch({ limit: amount })
      .then((messages) => {
        if (message.channel.type === ChannelType.GuildText) {
          message.channel.bulkDelete(messages);

          const content: string[] = messages.map(
            (message) => `[${message.author.username}]: ${message.content}`
          );

          const embed = new EmbedBuilder()
            .setColor(Colors.RED)
            .setTitle(
              `${messages.size} Messages purged in #${message.channel.name}`
            )
            .setDescription(
              `${content[0]}\n${content[1]}\n${content[2]}\n${content[3]}\n${content[4]}\n${content[5]}\n${content[6]}\n${content[7]}\n${content[8]}\n${content[9]}`
            )
            .setFooter({ text: `10 latest shown` })
            .setTimestamp();

          message.channel
            .send({ embeds: [embed] })
            .then((message) => {
              setTimeout(() => message.delete(), 10000);
            })
            .catch((error) => {
              this.client.emit(
                "commandError",
                error,
                this,
                message,
                this.client
              );
            });
        } else {
          message.channel.send({
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
        message.channel.send({
          embeds: [
            EmbedProvider.invalid("Cannot delete messages older than 14 days!"),
          ],
        });
        return;
      });
  }
}

export default PurgeGenericCommand;
