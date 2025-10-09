import { EmbedBuilder, Guild } from "discord.js";

import Colors from "../../providers/Colors";
import ExtendedClient from "../ExtendedClient";

class GenericEvents {
  public static onReady(client: ExtendedClient) {
    console.log(`${client.user?.tag} is online! 🟢`);
    client.config.devChannel.send(`${client.user?.tag} is online! 🟢`);
  }

  public static async guildCreate(guild: Guild, client: ExtendedClient) {
    await client.caller.guild.create({ id: guild.id, ownerId: guild.ownerId });

    const embed = new EmbedBuilder({
      title: "Thanks for adding me to your server :hand:!",
      description: `To get started and explore commands, type \`${client.config.prefix}help\`\nTo setup your server completely, type \`${client.config.prefix}settings\``,
      color: Colors.PRIMARY,
    });

    if (guild.systemChannel) {
      guild.systemChannel.send({ embeds: [embed] });
    } else {
      guild.members.cache.get(guild.ownerId)?.dmChannel?.send({ embeds: [embed] });
    }
  }
}

export default GenericEvents;
