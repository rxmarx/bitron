import { ClientEvents } from "discord.js";
import Command from "../../classes/commands/Command";
import { CommandTrigger } from "..";
import ExtendedClient from "../../classes/ExtendedClient";

interface MiscExtendedClientEvents extends ClientEvents {
  commandExecute: [Command<CommandTrigger>, CommandTrigger, ExtendedClient];
  commandError: [
    unknown,
    Command<CommandTrigger>,
    CommandTrigger,
    ExtendedClient,
  ];
  databaseError: [unknown, ExtendedClient];
}

export default MiscExtendedClientEvents;
