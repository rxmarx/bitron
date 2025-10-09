import {
  ChatInputCommandInteraction,
  CommandInteraction,
  PermissionsString,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";
import Command from "./Command";
import ExtendedClient from "../ExtendedClient";
import { SlashCommandOptions } from "../../types/interfaces/SlashCommandOptions";
import { cloneDeep } from "lodash";
import SlashCommandValidator from "./SlashCommandValidator";

abstract class SlashCommand extends Command<CommandInteraction> {
  private readonly _dataBuilder: Partial<SlashCommandBuilder>;

  protected constructor(client: ExtendedClient, options: SlashCommandOptions) {
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
    const aliasBuilders: Partial<SlashCommandBuilder>[] = this.aliases.map((alias) => {
      const builder = cloneDeep(this.dataBuilder);
      builder.setName!(alias);
      return builder;
    });

    return [this.dataBuilder, ...aliasBuilders];
  }

  public abstract run(interaction: ChatInputCommandInteraction): Promise<void>;

  public override hasPermission(interaction: CommandInteraction): boolean | string {
    if (!this.ownerOnly && !this.userPermissions) {
      return true;
    }

    if (this.ownerOnly && !(this.client.config.owner.id === interaction.user.id)) {
      return `The command ${this.name} can be run only by the bot's owner`;
    }

    if (this.ownerOnly && !(this.client.config.coOwner.id === interaction.user.id)) {
      return `The command ${this.name} can be run only by the bot's owner`;
    }

    if (this.userPermissions && interaction.channel?.isTextBased()) {
      if (!(interaction.channel instanceof TextChannel) || interaction.channel?.partial) {
        return true;
      }

      const missingPermissions: PermissionsString[] | undefined = interaction.channel
        .permissionsFor(interaction.user)
        ?.missing(this.userPermissions);

      if (!missingPermissions || missingPermissions.length < 1) {
        return true;
      }

      if (missingPermissions.length === 1) {
        return `To run \`${this.name}\` command you need to have this \`${missingPermissions[0]}\` permission.`;
      }

      return `To run \`${this.name}\` command you need to have this \`${missingPermissions.join(", ")}\` permissions.`;
    }

    return true;
  }

  public override async onError(error: unknown, interaction: CommandInteraction): Promise<void> {
    (interaction.channel as TextChannel).send(
      `There was an unexpected error. Reported the error to the developers: ${error}`,
    );
  }
}

export default SlashCommand;
