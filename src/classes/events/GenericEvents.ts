import { Client, Guild } from "discord.js";

import EmbedProvider from "../../providers/EmbedProvider";
import ExtendedClient from "../ExtendedClient";

class GenericEvents {
  public static onReady(client: ExtendedClient) {
    console.log(`${client.user?.tag} is online! 🟢`);
    client.config.devChannel.send(`${client.user?.tag} is online! 🟢`);
  }

  public static async guildCreate(guild: Guild, client: ExtendedClient) {
    client.config.devChannel.send({
      embeds: [EmbedProvider.guildCreate(guild)],
    });
    await client.database.guild.create({
      data: {
        id: guild.id,
        ownerId: guild.ownerId,
        prefix: "$",
      },
    });
  }
}

export default GenericEvents;
