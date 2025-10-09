import { Message, PermissionsString, TextChannel } from "discord.js";
import Command from "./Command";

abstract class GenericCommand extends Command<Message> {
  public abstract run(message: Message, args: string[]): Promise<void>;

  public override hasPermission(message: Message<boolean>): boolean | string {
    if (this.ownerOnly && !(this.client.config.owner.id === message.author.id)) {
      return `The command ${this.name} can be run only by the bot's owner`;
    }

    if (this.ownerOnly && !(this.client.config.coOwner.id === message.author.id)) {
      return `The command ${this.name} can be run only by the bot's owner`;
    }

    if (this.userPermissions && message.channel.isTextBased()) {
      if (!(message.channel instanceof TextChannel) || message.channel.partial) {
        return true;
      }

      const missingPermissions: PermissionsString[] | undefined = message.channel
        .permissionsFor(message.author)
        ?.missing(this.userPermissions);
      if (!missingPermissions || missingPermissions.length < 1) {
        return true;
      }

      if (missingPermissions.length === 1) {
        return `To run \`${this.name}\` command you need to have this \`${missingPermissions[0]}\` permission.`;
      }

      return `\`${this.name}\` command requires you to have these ${missingPermissions.join(", ")} permissions.`;
    }
    return true;
  }

  public override async onError(error: unknown, message: Message) {
    (message.channel as TextChannel).send(
      `There was an unexpected error. Reported the error to the developers: ${error}`,
    );
  }
}

export default GenericCommand;
