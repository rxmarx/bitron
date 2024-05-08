import { CommandOptions } from "./CommandOptions";
import { SlashCommandBuilder } from "discord.js";

export interface SlashCommandOptions extends CommandOptions {
  dataBuilder: Partial<SlashCommandBuilder>;
}
