export interface Guild {
  id: string;
  ownerId: string;
  prefix?: string;
  economy: boolean;
  music: boolean;
  commandsChannelId?: string;
  musicChannelId?: string;
  voiceChannelId?: string;
}

export interface APIFindGuild {
  id: string;
}

export interface APICreateGuild {
  id: string;
  ownerId: string;
}

export interface APIUpdateGuild {
  id: string;
  prefix?: string;
  economy?: boolean;
  music?: boolean;
  commandsChannelId?: string;
  musicChannelId?: string;
  voiceChannelId?: string;
}
