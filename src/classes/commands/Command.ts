import { Category, CommandTrigger } from "../../types";

import { CommandOptions } from "../../types/interfaces/CommandOptions";
import ExtendedClient from "../ExtendedClient";
import { PermissionResolvable } from "discord.js";

abstract class Command<T extends CommandTrigger> {
  public readonly client: ExtendedClient;

  public readonly name: string;
  public readonly description: string;
  public readonly aliases: string[];
  public readonly category: Category;
  public readonly cooldown: number;
  public readonly emoji?: string;
  public readonly ownerOnly: boolean;
  public readonly userPermissions: PermissionResolvable[];
  public readonly clientPermissions: PermissionResolvable[];
  public readonly premiumCommand: boolean;
  public readonly cost?: number;

  constructor(client: ExtendedClient, options: CommandOptions) {
    this.client = client;

    this.name = options.name;
    this.description = options.description;
    this.aliases = options.aliases;
    this.category = options.category;
    this.cooldown = options.cooldown;
    this.emoji = options.emoji;
    this.ownerOnly = options.ownerOnly;
    this.userPermissions = options.userPermissions;
    this.clientPermissions = options.clientPermissions;
    this.premiumCommand = options.premiumCommand;
    this.cost = options.cost;
  }

  public abstract hasPermissions(trigger: T): boolean | string;
  public abstract onError(error: unknown, trigger: T): Promise<void>;
}

export default Command;
