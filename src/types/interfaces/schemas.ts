interface User {
  id: string;
  username: string;
  bits?: number;
  commandsRan?: number;
  createdAt?: Date;
  company?: Company;
  partneredCompanies?: Company[];
  createdTokens?: Token[];
  purchasedTokens?: Token[];
  shares?: Shares[];
  bank?: Bank;
  premiumCommands?: PremiumCommand[];
  job?: Job;
  boughtItems?: Item[];
}

interface Token {
  id: string;
  title: string;
  description: string;
  level?: number;
  sales?: number;
  price?: number;
  salesPerUpgrade?: number;
  creator?: User;
  buyers?: User[];
  acquirer?: User;
  bank?: Bank;
}

interface Bank {
  id: string;
  level: number;
  deposit?: number;
  user?: User;
  storedTokens?: Token[];
  shares?: Shares[];
}

interface Company {
  id: string;
  owner: User;
  partners?: User[];
  shares?: Shares;
  acquiredTokens?: Token[];
}

interface Shares {
  id: string;
  company: Company;
  count?: number;
  value?: number;
  holders?: User[];
  bank?: Bank[];
}

interface PremiumCommand {
  id: number;
  name: string;
  cost?: number;
  user?: User[];
}

interface Item {
  id: number;
  name: string;
  description: string;
  cost?: number;
  stealable?: boolean;
  category?: ItemCategory;
  users?: User[];
  count?: number;
  powerup?: PowerUp;
}

interface PowerUp {
  id: number;
  name: string;
  level?: number;
  item?: Item;
}

interface Guild {
  id: string;
  ownerId: string;
  prefix?: string;
  music?: boolean;
  voiceChannelId?: string;
  musicChannelId?: string;
}

enum Job {
  POLICE = "POLICE",
  SOFTWARE_ENGINEER = "SOFTWARE_ENGINEER",
  DATA_SCIENTIST = "DATA_SCIENTIST",
  DISCORD_BOT_DEVELOPER = "DISCORD_BOT_DEVELOPER",
  YOUTUBER = "YOUTUBER",
  DOCTOR = "DOCTOR",
  SCIENTIST = "SCIENTIST",
  LAWYER = "LAWYER",
  ENGINEER = "ENGINEER",
  ARCHITECT = "ARCHITECT",
  SOLDIER = "SOLDIER",
}

enum ItemCategory {
  COLLECTIBLE = "collectible",
  POWERUP = "powerup",
  CHEST = "chest",
}

export {
  User,
  Company,
  Token,
  Bank,
  Shares,
  PremiumCommand,
  Item,
  PowerUp,
  Guild,
  ItemCategory,
  Job,
};
