import { Category } from "..";
import { PermissionResolvable } from "discord.js";
import { Premium } from "../enums/Premium";

export interface CommandOptions {
  name: string;
  description: string;
  aliases: string[];
  category: Category;
  cooldown: number;
  emoji?: string;
  premium: Premium;
  ownerOnly: boolean;
  userPermissions: PermissionResolvable[];
  clientPermissions: PermissionResolvable[];
}
