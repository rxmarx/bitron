import {
  BaseGuildTextChannel,
  BaseGuildVoiceChannel,
  EmbedBuilder,
  GuildChannel,
  Message,
} from "discord.js";

import Colors from "../../../../../providers/Colors";
import EmbedProvider from "../../../../../providers/EmbedProvider";
import ExtendedClient from "../../../../ExtendedClient";
import GenericCommand from "../../../GenericCommand";
import { Guild } from "@prisma/client";
import { Premium } from "../../../../../types/enums/Premium";

class SettingsGenericCommand extends GenericCommand {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "settings",
      description: "update the settings for your guild",
      aliases: [],
      category: "Utility",
      cooldown: 10,
      clientPermissions: ["Administrator"],
      userPermissions: ["ManageGuild"],
      ownerOnly: false,
      emoji: "⚙️",
      premium: Premium.TIER0,
    });
  }

  public async run(message: Message<true>, args: string[]): Promise<void> {
    const operation: string = args[0].toLowerCase();

    const operations: string[] = [
      "view",
      "setprefix",
      "economy",
      "music",
      "setcommandschannel",
      "setmusicchannel",
      "setvoicechannel",
    ];

    if (args[1]) {
      message.channel.send({
        embeds: [
          EmbedProvider.invalid(
            `Do not specify anything other than the settings you want to update\nSettings: \`${operations.join(", ")}\``,
          ),
        ],
      });
      return;
    }

    if (!operation || !operations.includes(operation.toLowerCase())) {
      message.channel.send({
        embeds: [
          EmbedProvider.invalid(
            `Specify a setting you want to update\nSettings: \`${operations.join(", ")}\``,
          ),
        ],
      });
      return;
    }

    if (operation === "setprefix") {
      const filter = (msg: Message) => msg.author.id === message.author.id;

      const guild: Guild = await this.client.caller.guild.find({ id: message.guild.id });

      const embed = new EmbedBuilder({
        description: `Current prefix for server: \`${guild.prefix}\`\nIf you want to change the prefix, please type your new prefix`,
        color: Colors.PRIMARY,
      });

      message.channel.send({ embeds: [embed] });

      message.channel
        .awaitMessages({ filter, max: 1, time: 15000, errors: ["time"] })
        .then(async (collected) => {
          const newPrefix = collected.first()?.content.toLowerCase();

          if (!newPrefix) {
            return;
          }

          if (newPrefix?.length > 2) {
            message.channel.send({
              embeds: [EmbedProvider.invalid("The prefix can only be 1 or 2 characters long")],
            });
          }

          if (newPrefix === guild.prefix) {
            message.channel.send({
              embeds: [
                EmbedProvider.invalid(`Server's current prefix is already \`${newPrefix}\``),
              ],
            });
            return;
          }

          await this.client.caller.guild.update({ id: message.guild.id, prefix: newPrefix });

          message.channel.send({
            embeds: [
              EmbedProvider.valid(`Successfully! updated the server's prefix to \`${newPrefix}\``),
            ],
          });
        })
        .catch((error) => {
          message.channel.send({
            embeds: [
              EmbedProvider.invalid(
                "Your session expired!, run the command again to set the prefix",
              ),
            ],
          });
          return error;
        });
      return;
    }

    if (operation === "economy") {
      const filter = (msg: Message) => msg.author.id === message.author.id;

      const guild: Guild = await this.client.caller.guild.find({ id: message.guild.id });

      const embed = new EmbedBuilder({
        description: `Economy is ${guild.economy ? "enabled" : "disabled"} in this server\nIf you want to change this setting, type enable/disabled accordingly`,
        color: Colors.PRIMARY,
      });

      message.channel.send({ embeds: [embed] });

      message.channel
        .awaitMessages({ filter, max: 1, time: 15000, errors: ["time"] })
        .then(async (collected) => {
          const setting = collected.first()?.content.toLowerCase();

          if (setting === "enable") {
            if (guild.economy) {
              message.channel.send({
                embeds: [EmbedProvider.invalid("This server already has economy enabled")],
              });
              return;
            }

            await this.client.caller.guild.update({ id: message.guild.id, economy: true });

            message.channel.send({
              embeds: [EmbedProvider.valid(`Successfully! enabled economy in this server`)],
            });
            return;
          } else if (setting === "disable") {
            if (!guild.economy) {
              message.channel.send({
                embeds: [EmbedProvider.invalid("This server already has economy disabled")],
              });
              return;
            }

            await this.client.caller.guild.update({ id: message.guild.id, economy: false });

            message.channel.send({
              embeds: [EmbedProvider.valid(`Successfully! disabled economy in this server`)],
            });
            return;
          } else {
            message.channel.send({
              embeds: [
                EmbedProvider.invalid(
                  `Only type enable/disable! any other response will terminate this process`,
                ),
              ],
            });
            return;
          }
        })
        .catch((error) => {
          message.channel.send({
            embeds: [
              EmbedProvider.invalid(
                "Your session expired!, run the command again to enable/disable economy",
              ),
            ],
          });
          return error;
        });
    }

    if (operation === "music") {
      const filter = (msg: Message) => msg.author.id === message.author.id;

      const guild: Guild = await this.client.caller.guild.find({ id: message.guild.id });

      const embed = new EmbedBuilder({
        description: `Music is ${guild.music ? "enabled" : "disabled"} in this server\nIf you want to change this setting, type enable/disabled accordingly`,
        color: Colors.PRIMARY,
      });

      message.channel.send({ embeds: [embed] });

      message.channel
        .awaitMessages({ filter, max: 1, time: 15000, errors: ["time"] })
        .then(async (collected) => {
          const setting = collected.first()?.content.toLowerCase();

          if (setting === "enable") {
            if (guild.music) {
              message.channel.send({
                embeds: [EmbedProvider.invalid("This server already has music enabled")],
              });
              return;
            }

            await this.client.caller.guild.update({ id: message.guild.id, music: true });

            message.channel.send({
              embeds: [EmbedProvider.valid(`Successfully! enabled music in this server`)],
            });
            return;
          } else if (setting === "disable") {
            if (!guild.music) {
              message.channel.send({
                embeds: [EmbedProvider.invalid("This server already has music disabled")],
              });
              return;
            }

            await this.client.caller.guild.update({ id: message.guild.id, music: false });

            message.channel.send({
              embeds: [EmbedProvider.valid(`Successfully! disabled music in this server`)],
            });
            return;
          } else {
            message.channel.send({
              embeds: [
                EmbedProvider.invalid(
                  `Only type enable/disable! any other response will terminate this process`,
                ),
              ],
            });
            return;
          }
        })
        .catch((error) => {
          message.channel.send({
            embeds: [
              EmbedProvider.invalid(
                "Your session expired!, run the command again to enable/disable music",
              ),
            ],
          });
          return error;
        });
    }

    if (operation === "setcommandschannel") {
      const filter = (msg: Message) => msg.author.id === message.author.id;

      const guild: Guild = await this.client.caller.guild.find({ id: message.guild.id });

      const embed = new EmbedBuilder({
        description: `<#${guild.commandsChannelId}> is set as server's commands channel\nIf you want to change this setting, mention the new channel or type its id`,
        color: Colors.PRIMARY,
      });

      message.channel.send({ embeds: [embed] });

      message.channel
        .awaitMessages({ filter, max: 1, time: 15000, errors: ["time"] })
        .then(async (collected) => {
          const channel =
            collected.first()?.mentions.channels.first() || collected.first()?.content;

          if (typeof channel === "string") {
            const getChannel = message.guild.channels.cache.get(channel);

            if (!getChannel) {
              message.channel.send({
                embeds: [
                  EmbedProvider.invalid(`Channel with id \`${channel}\` isn't in this server`),
                ],
              });
              return;
            }

            if (!(getChannel instanceof BaseGuildTextChannel)) {
              message.channel.send({
                embeds: [EmbedProvider.invalid(`<#${channel}> isn't a text channel`)],
              });
              return;
            }

            if (channel === guild.commandsChannelId) {
              message.channel.send({
                embeds: [
                  EmbedProvider.invalid(
                    `<#${channel}> is already the commands channel for this server`,
                  ),
                ],
              });
              return;
            }

            await this.client.caller.guild.update({
              id: message.guild.id,
              commandsChannelId: channel,
            });

            message.channel.send({
              embeds: [
                EmbedProvider.valid(
                  `Successfully! updated <#${channel}> channel as the commands channel for this server`,
                ),
              ],
            });
            return;
          } else if (channel instanceof GuildChannel) {
            const channelInGuild = message.guild.channels.cache.get(channel.id);

            if (!channelInGuild) {
              message.channel.send({
                embeds: [
                  EmbedProvider.invalid(`Channel with id \`${channel.id}\` isn't in this server`),
                ],
              });
              return;
            }

            if (!(channelInGuild instanceof BaseGuildTextChannel)) {
              message.channel.send({
                embeds: [EmbedProvider.invalid(`<#${channel.id}> isn't a text channel`)],
              });
              return;
            }

            if (channel.id === guild.commandsChannelId) {
              message.channel.send({
                embeds: [
                  EmbedProvider.invalid(
                    `<#${channel.id}> is already the commands channel for this server`,
                  ),
                ],
              });
              return;
            }

            await this.client.caller.guild.update({
              id: message.guild.id,
              commandsChannelId: channel.id,
            });

            message.channel.send({
              embeds: [
                EmbedProvider.valid(
                  `Successfully! updated <#${channel.id}> channel as the commands channel for this server`,
                ),
              ],
            });
            return;
          } else {
            message.channel.send({
              embeds: [
                EmbedProvider.invalid(
                  "Only mention/type channel's id, any other response will terminate this process",
                ),
              ],
            });
            return;
          }
        })
        .catch((error) => {
          message.channel.send({
            embeds: [
              EmbedProvider.invalid(
                "Your session expired!, run the command again to set commands channel",
              ),
            ],
          });
          return error;
        });
    }

    if (operation === "setmusicchannel") {
      const filter = (msg: Message) => msg.author.id === message.author.id;

      const guild: Guild = await this.client.caller.guild.find({ id: message.guild.id });

      const embed = new EmbedBuilder({
        description: `<#${guild.musicChannelId}> is set as server's music channel\nIf you want to change this setting, mention the new channel or type its id`,
        color: Colors.PRIMARY,
      });

      message.channel.send({ embeds: [embed] });

      message.channel
        .awaitMessages({ filter, max: 1, time: 15000, errors: ["time"] })
        .then(async (collected) => {
          const channel =
            collected.first()?.mentions.channels.first() || collected.first()?.content;

          if (typeof channel === "string") {
            const getChannel = message.guild.channels.cache.get(channel);

            if (!getChannel) {
              message.channel.send({
                embeds: [
                  EmbedProvider.invalid(`Channel with id \`${channel}\` isn't in this server`),
                ],
              });
              return;
            }

            if (!(getChannel instanceof BaseGuildTextChannel)) {
              message.channel.send({
                embeds: [EmbedProvider.invalid(`<#${channel}> isn't a text channel`)],
              });
              return;
            }

            if (channel === guild.musicChannelId) {
              message.channel.send({
                embeds: [
                  EmbedProvider.invalid(
                    `<#${channel}> is already the music channel for this server`,
                  ),
                ],
              });
              return;
            }

            await this.client.caller.guild.update({
              id: message.guild.id,
              musicChannelId: channel,
            });

            message.channel.send({
              embeds: [
                EmbedProvider.valid(
                  `Successfully! updated <#${channel}> channel as the music channel for this server`,
                ),
              ],
            });
            return;
          } else if (channel instanceof GuildChannel) {
            const channelInGuild = message.guild.channels.cache.get(channel.id);

            if (!channelInGuild) {
              message.channel.send({
                embeds: [
                  EmbedProvider.invalid(`Channel with id \`${channel.id}\` isn't in this server`),
                ],
              });
              return;
            }

            if (!(channelInGuild instanceof BaseGuildTextChannel)) {
              message.channel.send({
                embeds: [EmbedProvider.invalid(`<#${channel.id}> isn't a text channel`)],
              });
              return;
            }

            if (channel.id === guild.musicChannelId) {
              message.channel.send({
                embeds: [
                  EmbedProvider.invalid(
                    `<#${channel.id}> is already the music channel for this server`,
                  ),
                ],
              });
              return;
            }

            await this.client.caller.guild.update({
              id: message.guild.id,
              musicChannelId: channel.id,
            });

            message.channel.send({
              embeds: [
                EmbedProvider.valid(
                  `Successfully! updated <#${channel.id}> channel as the music channel for this server`,
                ),
              ],
            });
            return;
          } else {
            message.channel.send({
              embeds: [
                EmbedProvider.invalid(
                  "Only mention/type channel's id, any other response will terminate this process",
                ),
              ],
            });
            return;
          }
        })
        .catch((error) => {
          message.channel.send({
            embeds: [
              EmbedProvider.invalid(
                "Your session expired!, run the command again to set music channel",
              ),
            ],
          });
          return error;
        });
    }

    if (operation === "setvoicechannel") {
      const filter = (msg: Message) => msg.author.id === message.author.id;

      const guild: Guild = await this.client.caller.guild.find({ id: message.guild.id });

      const embed = new EmbedBuilder({
        description: `<#${guild.voiceChannelId}> is set as server's music voice channel\nIf you want to change this setting, mention the new channel or type its id`,
        color: Colors.PRIMARY,
      });

      message.channel.send({ embeds: [embed] });

      message.channel
        .awaitMessages({ filter, max: 1, time: 15000, errors: ["time"] })
        .then(async (collected) => {
          const channel =
            collected.first()?.mentions.channels.first() || collected.first()?.content;

          if (typeof channel === "string") {
            const getChannel = message.guild.channels.cache.get(channel);

            if (!getChannel) {
              message.channel.send({
                embeds: [
                  EmbedProvider.invalid(`Channel with id \`${channel}\` isn't in this server`),
                ],
              });
              return;
            }

            if (!(getChannel instanceof BaseGuildVoiceChannel)) {
              message.channel.send({
                embeds: [EmbedProvider.invalid(`<#${channel}> isn't a voice channel`)],
              });
              return;
            }

            if (channel === guild.voiceChannelId) {
              message.channel.send({
                embeds: [
                  EmbedProvider.invalid(
                    `<#${channel}> is already the music voice channel for this server`,
                  ),
                ],
              });
              return;
            }

            await this.client.caller.guild.update({
              id: message.guild.id,
              voiceChannelId: channel,
            });

            message.channel.send({
              embeds: [
                EmbedProvider.valid(
                  `Successfully! updated <#${channel}> channel as the music voice channel for this server`,
                ),
              ],
            });
            return;
          } else if (channel instanceof GuildChannel) {
            const channelInGuild = message.guild.channels.cache.get(channel.id);

            if (!channelInGuild) {
              message.channel.send({
                embeds: [
                  EmbedProvider.invalid(`Channel with id \`${channel.id}\` isn't in this server`),
                ],
              });
              return;
            }

            if (!(channelInGuild instanceof BaseGuildVoiceChannel)) {
              message.channel.send({
                embeds: [EmbedProvider.invalid(`<#${channel.id}> isn't a voice channel`)],
              });
              return;
            }

            if (channel.id === guild.voiceChannelId) {
              message.channel.send({
                embeds: [
                  EmbedProvider.invalid(
                    `<#${channel.id}> is already the music voice channel for this server`,
                  ),
                ],
              });
              return;
            }

            await this.client.caller.guild.update({
              id: message.guild.id,
              voiceChannelId: channel.id,
            });

            message.channel.send({
              embeds: [
                EmbedProvider.valid(
                  `Successfully! updated <#${channel.id}> channel as the music voice channel for this server`,
                ),
              ],
            });
            return;
          } else {
            message.channel.send({
              embeds: [
                EmbedProvider.invalid(
                  "Only mention/type channel's id, any other response will terminate this process",
                ),
              ],
            });
            return;
          }
        })
        .catch((error) => {
          message.channel.send({
            embeds: [
              EmbedProvider.invalid(
                "Your session expired!, run the command again to set music voice channel",
              ),
            ],
          });
          return error;
        });
    }

    if (operation === "view") {
      const guild: Guild = await this.client.caller.guild.find({ id: message.guild.id });

      const embed = new EmbedBuilder({
        title: `${this.emoji} Server Settings`,
        description: `Configure your server to help the bot manage at a server-wide level.\nModify a setting with \`${guild.prefix || this.client.config.prefix}settings <setting>\``,
        fields: [
          {
            name: "**Prefix** `setprefix`",
            value: `Custom prefix for the bot to respond in the server.\n**Value:** \`${guild.prefix || this.client.config.prefix}\``,
          },
          {
            name: "**Economy** `economy`",
            value: `Complex economy system for users to enjoy in the server.\n**Value:** \`${guild.economy ? "enabled" : "disabled"}\``,
          },
          {
            name: "**Music** `music`",
            value: `Users can enjoy their favorite tracks in their favorite servers.\n**Value:** \`${guild.music ? "enabled" : "disabled"}\``,
          },
          {
            name: "**Commands Channel** `setcommandschannel`",
            value: `Only respond to commands run in the specified channel.\n**Value:** \`${guild.commandsChannelId ? `<#${guild.commandsChannelId}>` : "not set"}\``,
          },
          {
            name: "**Music Channel** `setmusicchannel`",
            value: `Only respond to music related commands run in the specified channel.\n**Value:** \`${guild.musicChannelId ? `<#${guild.musicChannelId}>` : "not set"}\``,
          },
          {
            name: "**Music Voice Channel** `setvoicechannel`",
            value: `Only play tracks in the specified voice channel.\n**Value:** \`${guild.voiceChannelId ? `<#${guild.voiceChannelId}>` : "not set"}\``,
          },
        ],
        color: Colors.PRIMARY,
      });

      message.channel.send({ embeds: [embed] });
      return;
    }
  }
}

export default SettingsGenericCommand;
