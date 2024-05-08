import EmbedProvider from "../../../../../providers/EmbedProvider";
import ExtendedClient from "../../../../ExtendedClient";
import GenericCommand from "../../../GenericCommand";
import { Message } from "discord.js";

class SettingsGenericCommand extends GenericCommand {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "settings",
      description: "update the settings for your guild",
      aliases: [],
      category: "Utility",
      cooldown: 10,
      userPermissions: ["Administrator"],
      clientPermissions: ["SendMessages"],
      ownerOnly: false,
      emoji: "⚙️",
    });
  }

  public async run(message: Message<boolean>, args: string[]): Promise<void> {
    const operation: string = args[0];

    const operations: string[] = [
      "setprefix",
      "enablemusic",
      "setvoicechannel",
      "setmusicchannel",
    ];

    if (!operation) {
      message.channel.send({
        embeds: [
          EmbedProvider.invalid(
            `Specify an operation for token command.\nList of operations: \`${operations.join(
              ", "
            )}\``
          ),
        ],
      });
      return;
    }

    if (!operations.includes(operation.toLowerCase())) {
      message.channel.send({
        embeds: [
          EmbedProvider.invalid(
            `Sorry you cannot perform that operation in settings command.\nList of operations: \`${operations.join(
              ", "
            )}\``
          ),
        ],
      });
      return;
    }

    if (operation === "setprefix") {
      const prefix: string = args[1];

      if (!prefix) {
        message.channel.send({ embeds: [] });
      }

      if (args[2]) {
        message.channel.send({
          embeds: [
            EmbedProvider.invalid(
              `Do not specify any argument other than prefix`
            ),
          ],
        });
        return;
      }

      if (prefix === "default") {
        await this.client.database.guild.update({
          where: {
            id: message.guild!.id,
          },
          data: {
            prefix: this.client.config.prefix,
          },
        });

        message.channel.send({
          embeds: [
            EmbedProvider.valid(
              `Server's prefix set to default: ${this.client.config.prefix}`
            ),
          ],
        });
        return;
      }

      if (prefix.length > 1) {
        message.channel.send({
          embeds: [
            EmbedProvider.invalid(
              "You cannot have more than 1 characters as a prefix"
            ),
          ],
        });
        return;
      }

      const guild = await this.client.database.guild.update({
        where: {
          id: message.guild!.id,
        },
        data: {
          prefix,
        },
      });

      message.channel.send({
        embeds: [EmbedProvider.valid(`Server's prefix set to ${guild.prefix}`)],
      });
      return;
    }
  }
}

export default SettingsGenericCommand;
