import GiphyGenericCommand from "./generic/fun/GiphyGenericCommand";
import GiphySlashCommand from "./slash/fun/GiphySlashCommand";
import MathGenericCommand from "./generic/util/MathGenericCommand";
import MathSlashCommand from "./slash/util/MathSlashCommand";
import PingGenericCommand from "./generic/info/PingGenericCommand";
import PingSlashCommand from "./slash/info/PingSlashCommand";
import ProfileGenericCommand from "./generic/economy/ProfileGenericCommand";
import PurgeGenericCommand from "./generic/moderation/PurgeGenericCommand";
import PurgeSlashCommand from "./slash/moderation/PurgeSlashCommand";
import WikipediaGenericCommand from "./generic/util/WikipediaGenericCommand";
import WikipediaSlashCommand from "./slash/util/WikipediaSlashCommand";

export const Generic = {
  PingGenericCommand,
  GiphyGenericCommand,
  WikipediaGenericCommand,
  PurgeGenericCommand,
  MathGenericCommand,
  ProfileGenericCommand,
};

export const Slash = {
  PingSlashCommand,
  GiphySlashCommand,
  WikipediaSlashCommand,
  PurgeSlashCommand,
  MathSlashCommand,
};

export {
  PingGenericCommand,
  GiphyGenericCommand,
  WikipediaGenericCommand,
  PurgeGenericCommand,
  MathGenericCommand,
  ProfileGenericCommand,
  PingSlashCommand,
  GiphySlashCommand,
  WikipediaSlashCommand,
  PurgeSlashCommand,
  MathSlashCommand,
};
