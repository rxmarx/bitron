import { ChatInputCommandInteraction, Message } from "discord.js";

export type CommandTrigger = Message | ChatInputCommandInteraction;

export type Category =
  | "Utility"
  | "Moderation"
  | "Economy"
  | "Fun"
  | "Information";
