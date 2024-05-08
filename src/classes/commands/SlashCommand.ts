import { ChatInputCommandInteraction, DMChannel } from "discord.js";

import {
  SlashCommandBuilder,
  ToAPIApplicationCommandOptions,
} from "@discordjs/builders";

import Command from "./Command";
import ExtendedClient from "../ExtendedClient";
import { SlashCommandOptions } from "../../types/interfaces/SlashCommandOptions";
import { cloneDeep } from "lodash";
import SlashCommandValidator from "./SlashCommandValidator";
import EmbedProvider from "../../providers/EmbedProvider";

abstract class SlashCommand extends Command<ChatInputCommandInteraction> {
  private readonly _dataBuilder: Partial<SlashCommandBuilder>;

  protected constructor(client: ExtendedClient, options: SlashCommandOptions) {
    if (!options.dataBuilder) {
      throw new Error("Data builder is required for slash command.");
    }

    super(client, options);

    SlashCommandValidator.validate(this);

    this._dataBuilder = options.dataBuilder;

    this._dataBuilder.setName!(options.name);
    this._dataBuilder.setDescription!(options.description);
  }

  public get dataBuilder(): Partial<SlashCommandBuilder> {
    return this._dataBuilder;
  }

  public get allDataBuilders(): Partial<SlashCommandBuilder>[] {
    const aliasBuilders: Partial<SlashCommandBuilder>[] = this.aliases.map(
      (alias) => {
        const builder = cloneDeep(this.dataBuilder);
        builder.setName!(alias);
        return builder;
      }
    );

    return [this.dataBuilder, ...aliasBuilders];
  }

  public abstract run(interaction: ChatInputCommandInteraction): Promise<void>;

  public override hasPermissions(
    interaction: ChatInputCommandInteraction
  ): string | boolean {
    if (!this.ownerOnly && !this.userPermissions) {
      return true;
    }

    if (
      this.ownerOnly &&
      !(this.client.config.owner.id === interaction.user.id)
    ) {
      return `The command \`${this.name}\` can only be run by the bot's owner!`;
    }
    if (
      this.ownerOnly &&
      !(this.client.config.coOwner.id === interaction.user.id)
    ) {
      return `The command \`${this.name}\` can only be run by the bot's owner!`;
    }

    if (this.userPermissions && interaction.channel?.isTextBased()) {
      if (
        interaction.channel instanceof DMChannel ||
        interaction.channel?.partial
      ) {
        return true;
      }
      const missingPermissions: any[] = interaction.channel
        .permissionsFor(interaction.user)
        ?.missing(this.userPermissions) as any;
      if (!missingPermissions || missingPermissions.length < 1) {
        return true;
      }
      if (missingPermissions.length === 1) {
        return `The command \`${this.name}\` requires you to have **${missingPermissions[0]}** permission.`;
      }
      return `The command \`${this.name}\` requires **${missingPermissions.join(
        ", "
      )}** permissions.`;
    }

    return true;
  }

  public override async onError(
    error: unknown,
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    this.client.emit("commandError", error, this, interaction, this.client);

    interaction.reply({
      embeds: [
        EmbedProvider.invalid(
          `Unexpected error occurred while running the command. Reported the error to the developers!`
        ),
      ],
    });
  }
}

export default SlashCommand;
