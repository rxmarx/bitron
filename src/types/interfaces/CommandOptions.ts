import { Category } from "..";
import { PermissionResolvable } from "discord.js";

export interface CommandOptions {
  name: string;
  description: string;
  aliases: string[];
  category: Category;
  cooldown: number;
  emoji?: string;
  ownerOnly: boolean;
  userPermissions: PermissionResolvable[];
  clientPermissions: PermissionResolvable[];
  premiumCommand: boolean;
  cost?: number;
}
