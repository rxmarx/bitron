import { DMChannel, Message } from "discord.js";
import Command from "./Command";
import EmbedProvider from "../../providers/EmbedProvider";

abstract class GenericCommand extends Command<Message> {
  public abstract run(message: Message, args: string[]): Promise<void>;

  public override hasPermissions(message: Message): string | boolean {
    if (!this.ownerOnly && !this.userPermissions) {
      return true;
    }

    if (
      this.ownerOnly &&
      !(this.client.config.owner.id === message.author.id)
    ) {
      return `The command \`${this.name}\` can only be run by the bot's owner!`;
    }
    if (
      this.ownerOnly &&
      !(this.client.config.coOwner.id === message.author.id)
    ) {
      return `The command \`${this.name}\` can only be run by the bot's owner!`;
    }

    if (this.userPermissions && message.channel.isTextBased()) {
      if (message.channel instanceof DMChannel || message.channel.partial) {
        return true;
      }
      const missingPermissions: any[] = message.channel
        .permissionsFor(message.author)
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
    message: Message
  ): Promise<void> {
    this.client.emit("commandError", error, this, message, this.client);

    message.channel.send({
      embeds: [
        EmbedProvider.invalid(
          `Unexpected error occurred while running the command. Reported the error to the developers!`
        ),
      ],
    });
  }
}

export default GenericCommand;
