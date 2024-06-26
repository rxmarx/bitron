import { Job } from "./interfaces/schemas";

export type CreateUser = {
  id: string;
  username: string;
};

export type DeleteUser = {
  id: string;
};

export type GetUser = {
  id: string;
};

export type UpdateUserInfo = {
  id: string;
  bits?: number;
  commandsRan?: number;
  job?: Job;
};

export type UpdateUserPartneredCompanies = {
  id: string;
  companyId: string;
};

export type UpdateUserPurchasedTokens = {
  id: string;
  tokenUUID: string;
};

export type UpdateUserShares = {
  id: string;
  sharesId: number;
};

export type UpdateUserBoughtItems = {
  id: string;
  itemId: number;
};

export type CreateBank = {
  id: string;
};

export type DeleteBank = {
  id: string;
};

export type GetBank = {
  id: string;
};

export type UpdateBankInfo = {
  id: string;
  level?: number;
  deposit?: number;
};

export type UpdateBankShares = {
  id: string;
  sharesId: number;
};

export type UpdateBankStoredTokens = {
  id: string;
  tokenUUID: string;
};

export type CreateToken = {
  id: string;
  title: string;
  description: string;
};

export type DeleteToken = {
  id: string;
  uuid: string;
};

export type GetToken = {
  uuid: string;
};

export type UpdateTokenInfo = {
  uuid: string;
  level?: number;
  sales?: number;
  price?: number;
  salesPerUpgrade?: number;
};

export type CreateCompany = {
  id: string;
};

export type DeleteCompany = {
  id: string;
};

export type GetCompany = {
  id: string;
};

export type UpdateCompanyAcquiredTokens = {
  id: string;
  tokenUUID: string;
};

export type CreateShares = {
  id: string;
};

export type DeleteShares = {
  id: number;
};

export type GetShares = {
  id: number;
};

export type UpdateSharesInfo = {
  id: number;
  count?: number;
  value?: number;
};

export type CreatePremiumCommand = {
  id: number;
  name: string;
  cost?: number;
};

export type GetPremiumCommand = {
  id: number;
};

export type UpdatePremiumCommandInfo = {
  id: number;
  cost: number;
};

export type ConnectUserPremiumCommand = {
  id: number;
  userId: string;
};

export type GetItem = {
  id: number;
};

export type CreateGuild = {
  id: string;
  ownerId: string;
};

export type DeleteGuild = {
  id: string;
};

export type GetGuild = {
  id: string;
};

export type UpdateGuildInfo = {
  id: string;
  prefix?: string;
  music?: "true" | "false";
  voiceChannelId?: string;
  musicChannelId?: string;
};
