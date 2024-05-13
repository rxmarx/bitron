import { EmbedBuilder, Message } from "discord.js";

import Colors from "../../../../../providers/Colors";
import EmbedProvider from "../../../../../providers/EmbedProvider";
import ExtendedClient from "../../../../ExtendedClient";
import GenericCommand from "../../../GenericCommand";
import { User } from "../../../../../types/interfaces/schemas";

class ProfileGenericCommand extends GenericCommand {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "profile",
      description: "various options to check user profile",
      aliases: [],
      category: "Economy",
      cooldown: 10,
      clientPermissions: ["SendMessages"],
      userPermissions: ["SendMessages"],
      ownerOnly: false,
      emoji: "📄",
      premiumCommand: false,
    });
  }

  public async run(message: Message<boolean>, args: string[]): Promise<void> {
    const operation = args[0];
    const operations = ["create", "view", "delete"];

    if (!operation || !operations.includes(operation.toLowerCase())) {
      message.channel.send({
        embeds: [
          EmbedProvider.invalid(
            `Please use one of the operations listed below:\n\`${operations.join(", ")}\``
          ),
        ],
      });
      return;
    }

    if (operation.toLowerCase() === "create") {
      if (args[1]) {
        message.channel.send({
          embeds: [
            EmbedProvider.invalid(
              "Do not provide any other arguments other than the operation"
            ),
          ],
        });

        return;
      }

      const user = await this.client.server.caller.user.get({
        id: message.author.id,
      });

      if (!(typeof user === "string")) {
        message.channel.send({
          embeds: [
            EmbedProvider.invalid(
              `You already have a bitron profile with username: ${user.username}`
            ),
          ],
        });
        return;
      }

      this.client.server.caller.user.create({
        id: message.author.id,
        username: message.author.username,
      });

      message.channel.send({
        embeds: [
          EmbedProvider.valid(
            `Successfully created a bitron profile under user: **${message.author.username}**,\ncheck your profile by running \`profile view\` command`
          ),
        ],
      });
      return;
    } else if (operation.toLowerCase() === "view") {
      const member = message.mentions.users.first();

      if (member) {
        const user = await this.client.server.caller.user.get({
          id: member.id,
        });

        if (typeof user === "string") {
          message.channel.send({
            embeds: [
              EmbedProvider.invalid(
                `The mentioned user doesn't have a profile set up yet!`
              ),
            ],
          });
          return;
        }

        let networth: number =
          user.bits! +
          (user.bank?.deposit === undefined ? 0 : user.bank.deposit);

        user.purchasedTokens?.forEach((token) => {
          networth += token.price === undefined ? 0 : token.price;
        });
        user.bank?.storedTokens?.forEach((token) => {
          networth += token.price === undefined ? 0 : token.price;
        });
        user.company?.acquiredTokens?.forEach((token) => {
          networth += token.price === undefined ? 0 : token.price;
        });
        user.shares?.forEach((shares) => {
          networth += shares.value === undefined ? 0 : shares.value;
        });

        const embed = new EmbedBuilder()
          .setTitle(`${user.username}'s Profile`)
          .setDescription(`Networth: ${networth}`)
          .addFields(
            {
              name: "Info",
              value: `Job: ${user.job === undefined ? "jobless" : user.job}`,
            },
            {
              name: "Bank",
              value: `Bits: ${user.bits}\nLevel: ${user.bank?.level === undefined ? "no bank" : user.bank.level}`,
              inline: true,
            },
            {
              name: "Commands",
              value: `Total: ${user.commandsRan}\nPremium: ${user.premiumCommands?.length === undefined ? "no command" : user.premiumCommands.length}`,
              inline: true,
            },
            {
              name: "Tokens",
              value: `Created: ${user.createdTokens?.length === undefined ? "no tokens" : user.createdTokens.length}\nPurchased: ${user.purchasedTokens?.length === undefined ? "no tokens" : user.purchasedTokens}`,
            },
            {
              name: "Company",
              value: `Owns: ${user.company === undefined ? "nothing" : `${user.username}'s Inc.`}\nPartnered: ${user.partneredCompanies?.length === undefined ? "none" : user.partneredCompanies.length}`,
              inline: true,
            },
            {
              name: "Items",
              value: `Total: ${user.boughtItems?.length === undefined ? "none" : user.boughtItems.length}`,
              inline: true,
            }
          )
          .setAuthor({
            name: this.client.user!.tag,
            iconURL: this.client.config.botProfile,
          })
          .setColor(Colors.PRIMARY);

        message.channel.send({ embeds: [embed] });
        return;
      } else {
        const user = await this.client.server.caller.user.get({
          id: message.author.id,
        });

        if (typeof user === "string") {
          message.channel.send({
            embeds: [
              EmbedProvider.invalid(`You don't have a profile set up yet!`),
            ],
          });
          return;
        }

        let networth: number =
          user.bits! +
          (user.bank?.deposit === undefined ? 0 : user.bank.deposit);

        user.purchasedTokens?.forEach((token) => {
          networth += token.price === undefined ? 0 : token.price;
        });
        user.bank?.storedTokens?.forEach((token) => {
          networth += token.price === undefined ? 0 : token.price;
        });
        user.company?.acquiredTokens?.forEach((token) => {
          networth += token.price === undefined ? 0 : token.price;
        });
        user.shares?.forEach((shares) => {
          networth += shares.value === undefined ? 0 : shares.value;
        });

        const embed = new EmbedBuilder()
          .setTitle(`${user.username}'s Profile`)
          .setDescription(`Networth: ${networth}`)
          .addFields(
            {
              name: "Info",
              value: `Job: ${user.job === undefined ? "jobless" : user.job}`,
            },
            {
              name: "Bank",
              value: `Bits: ${user.bits}\nLevel: ${user.bank?.level === undefined ? "no bank" : user.bank.level}`,
              inline: true,
            },
            {
              name: "Commands",
              value: `Total: ${user.commandsRan}\nPremium: ${user.premiumCommands?.length === undefined ? "no command" : user.premiumCommands.length}`,
              inline: true,
            },
            {
              name: "Tokens",
              value: `Created: ${user.createdTokens?.length === undefined ? "no tokens" : user.createdTokens.length}\nPurchased: ${user.purchasedTokens?.length === undefined ? "no tokens" : user.purchasedTokens}`,
            },
            {
              name: "Company",
              value: `Owns: ${user.company === undefined ? "nothing" : `${user.username}'s Inc.`}\nPartnered: ${user.partneredCompanies?.length === undefined ? "none" : user.partneredCompanies.length}`,
              inline: true,
            },
            {
              name: "Items",
              value: `Total: ${user.boughtItems?.length === undefined ? "none" : user.boughtItems.length}`,
              inline: true,
            }
          )
          .setAuthor({
            name: this.client.user!.tag,
            iconURL: this.client.config.botProfile,
          })
          .setColor(Colors.PRIMARY);

        message.channel.send({ embeds: [embed] });
        return;
      }
    } else {
      if (args[1]) {
        message.channel.send({
          embeds: [
            EmbedProvider.invalid(
              "Do not provide any other arguments other than the operation"
            ),
          ],
        });

        return;
      }

      const user = await this.client.server.caller.user.get({
        id: message.author.id,
      });

      if (typeof user === "string") {
        message.channel.send({
          embeds: [
            EmbedProvider.invalid(`You don't have a profile set up yet!`),
          ],
        });
        return;
      }

      if (
        user.bank ||
        user.company ||
        user.createdTokens?.length ||
        user.partneredCompanies?.length
      ) {
        message.channel.send({
          embeds: [
            EmbedProvider.invalid(
              `Please delete your **bank/company/tokens and partnered companies** to proceed deleting your profile`
            ),
          ],
        });
        return;
      }

      this.client.server.caller.user.delete({
        id: message.author.id,
      });

      message.channel.send({
        embeds: [
          EmbedProvider.valid(`Successfully deleted your bitron profile.`),
        ],
      });
    }

    return;
  }
}

export default ProfileGenericCommand;
