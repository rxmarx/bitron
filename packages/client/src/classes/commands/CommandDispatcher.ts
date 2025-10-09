import { Collection, Guild as DGuild, Interaction, Message, TextChannel } from "discord.js";
import { Guild, User } from "@prisma/client";

import EmbedProvider from "../../providers/EmbedProvider";
import ExtendedClient from "../ExtendedClient";
import GenericCommand from "./GenericCommand";
import Registry from "../client/Registry";

class CommandDispatcher {
  private readonly client: ExtendedClient;
  private readonly registry: Registry;

  private readonly cooldowns: Collection<string, Collection<string, number>>;

  constructor(client: ExtendedClient, registry: Registry) {
    this.client = client;
    this.registry = registry;

    this.cooldowns = new Collection();
  }

  public async handleMessage(message: Message<boolean>): Promise<void> {
    let prefix = this.client.config.prefix;

    const guild: Guild = await this.client.caller.guild.find({ id: message.guild!.id });

    if (guild.prefix) {
      prefix = guild.prefix;
    }

    if (
      message.partial ||
      message.author.bot ||
      !message.content.startsWith(prefix) ||
      !(message.channel instanceof TextChannel)
    ) {
      return;
    }

    const args: string[] = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd: string | undefined = args.shift()?.toLowerCase();

    const command = this.registry.resolveGenericCommand(cmd!);

    if (!command) {
      return;
    }

    try {
      const hasPermission = command.hasPermission(message);

      if (typeof hasPermission === "string") {
        message.reply(hasPermission);
        return;
      }

      if (!this.cooldowns.has(command.name)) {
        this.cooldowns.set(command.name, new Collection());
      }

      const currentTime: number = Date.now();
      const timestamps: Collection<string, number> = this.cooldowns.get(command.name)!;
      const cooldownAmount = command.cooldown * 1000;

      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id)! * cooldownAmount;

        if (currentTime < expirationTime) {
          let timeLeft: string | number = (expirationTime - currentTime) / 1000;
          timeLeft = Number(timeLeft.toFixed());

          if (timeLeft >= 3600) {
            timeLeft = `${timeLeft / 3600} hour(s)`;
          } else if (timeLeft >= 60) {
            timeLeft = `${timeLeft / 60} minute(s)`;
          } else {
            timeLeft = `${timeLeft} second(s)`;
          }

          message.channel.send(
            `Hold your horses\nPlease wait ${timeLeft} to run ${command.name} again!`,
          );

          timestamps.set(message.author.id, currentTime);

          setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
      }

      const user: User = await this.client.caller.user.find({ id: message.author.id });

      if (guild.commandsChannelId) {
        if (message.channel.id === guild.commandsChannelId) {
          this.runGenericCommand(message, command, user, args);
        } else {
          message.channel
            .send({
              embeds: [
                EmbedProvider.invalid(
                  `Commands cannot be run outside the <#${guild.commandsChannelId}> channel set by the server`,
                ),
              ],
            })
            .then((msg) => setTimeout(() => msg.delete(), 5000));
        }
      } else {
        if (command.category === "Economy" && guild.economy) {
          this.runGenericCommand(message, command, user, args);
        } else {
          if (command.category === "Music") {
            if (!guild.music) {
              message.channel.send({
                embeds: [EmbedProvider.invalid(`Music is disabled in this server`)],
              });
              return;
            }

            if (!message.member?.voice.channel) {
              message.channel.send({
                embeds: [EmbedProvider.invalid(`Join a voice channel before using music commands`)],
              });
              return;
            }

            const info = {
              guild: message.guild!,
            };

            if (guild.musicChannelId) {
              if (message.channel.id === guild.musicChannelId) {
                if (guild.voiceChannelId) {
                  if (message.member?.voice.channel.id === guild.voiceChannelId) {
                    await this.runGenericMusicCommand(message, command, user, args, info);
                  } else {
                    message.channel.send({
                      embeds: [
                        EmbedProvider.invalid(
                          `Music can only be played in <#${guild.voiceChannelId}> set by the server`,
                        ),
                      ],
                    });
                  }
                } else {
                  await this.runGenericMusicCommand(message, command, user, args, info);
                }
              } else {
                message.channel
                  .send({
                    embeds: [
                      EmbedProvider.invalid(
                        `Music commands cannot be run outside the <#${guild.musicChannelId}> channel set by the server`,
                      ),
                    ],
                  })
                  .then((msg) => setTimeout(() => msg.delete(), 5000));
              }
            } else {
              await this.runGenericMusicCommand(message, command, user, args, info);
            }
          } else {
            this.runGenericCommand(message, command, user, args);
          }
        }
      }
    } catch (error) {
      this.client.emit("commandError", error, command, message, this.client);
    }
  }

  public async handleInteraction(interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const command = this.registry.resolveSlashCommand(interaction.commandName);

    if (!command || !interaction.inGuild()) {
      return;
    }

    try {
      const hasPermission = command.hasPermission(interaction);

      if (typeof hasPermission === "string") {
        await interaction.reply(hasPermission);
      }

      if (!this.cooldowns.has(command.name)) {
        this.cooldowns.set(command.name, new Collection());
      }

      const currentTime: number = Date.now();
      const timestamps: Collection<string, number> = this.cooldowns.get(command.name)!;
      const cooldownAmount = command.cooldown * 1000;

      if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id)! * cooldownAmount;

        if (currentTime < expirationTime) {
          let timeLeft: string | number = (expirationTime - currentTime) / 1000;
          timeLeft = Number(timeLeft.toFixed());

          if (timeLeft >= 3600) {
            timeLeft = `${timeLeft / 3600} hour(s)`;
          } else if (timeLeft >= 60) {
            timeLeft = `${timeLeft / 60} minute(s)`;
          } else {
            timeLeft = `${timeLeft} second(s)`;
          }

          interaction.reply(
            `Hold your horses\nPlease wait ${timeLeft} to run ${command.name} again!`,
          );

          timestamps.set(interaction.user.id, currentTime);

          setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        }
      }

      const user: User = await this.client.caller.user.find({ id: interaction.user.id });

      if (user) {
        await this.client.caller.user.updateUserInfo({
          id: interaction.user.id,
          commandsRan: user.commandsRan + 1,
        });
      }

      await command.run(interaction);
      this.client.emit("commandExecute", command, interaction, this.client);
    } catch (error) {
      this.client.emit("commandError", error, command, interaction, this.client);
    }
  }

  private async runGenericCommand(
    message: Message<boolean>,
    command: GenericCommand,
    user: User,
    args: string[],
  ): Promise<void> {
    if (user) {
      await this.client.caller.user.updateUserInfo({
        id: message.author.id,
        commandsRan: user.commandsRan + 1,
      });
    }

    await command.run(message, args);
    this.client.emit("commandExecute", command, message, this.client);
  }

  private async runGenericMusicCommand(
    message: Message<boolean>,
    command: GenericCommand,
    user: User,
    args: string[],
    info: { guild: DGuild },
  ): Promise<void> {
    if (user) {
      await this.client.caller.user.updateUserInfo({
        id: message.author.id,
        commandsRan: user.commandsRan + 1,
      });
    }

    await this.client.musicPlayer.player.context.provide(info, async () => {
      await command.run(message, args);
      this.client.emit("commandExecute", command, message, this.client);
    });
  }
}

export default CommandDispatcher;
