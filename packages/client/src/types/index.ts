import { CommandInteraction, Guild, Message, TextChannel, VoiceChannel } from "discord.js";

export type CommandTrigger = CommandInteraction | Message;

export type Category = "Utility" | "Information" | "Fun" | "Economy" | "Moderation" | "Music";

export type StoreKeyType = Guild | TextChannel | VoiceChannel | string;
