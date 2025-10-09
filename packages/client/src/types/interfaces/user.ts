import { Job, Tiers } from "@prisma/client";

import { Bank } from "./bank";
import { Company } from "./company";
import { Item } from "./item";
import { Shares } from "./shares";
import { Token } from "./token";

export interface User {
  id: string;
  username: string;
  bits: number;
  commandsRan: number;
  createdAt: Date;
  subscription: Tiers;
  company?: Company;
  partneredCompanies?: Company[];
  employedIn?: Company;
  employedInId?: string;
  shares?: Shares[];
  bank?: Bank;
  createdTokens?: Token[];
  purchasedTokens?: Token[];
  items?: Item[];
  job?: Job;
  timePlayed: number;
  jail: boolean;
}

export interface APICreateUser {
  id: string;
  username: string;
}

export interface APIFindUser {
  id: string;
}

export interface APIFindAllUsers {
  id: string[];
}

export interface APIUpdateUserInfo {
  id: string;
  bits?: number;
  commandsRan?: number;
  subscription?: Tiers;
  job?: Job;
  timePlayed?: number;
  jail?: boolean;
}

export interface APIUpdateUserCompany {
  id: string;
  companyId?: string;
  partneredCompanyId?: string;
  employedIn?: string;
}

export interface APIUpdateUserShares {
  id: string;
  sharesId: string;
}

export interface APIUpdateUserBank {
  id: string;
}

export interface APIUpdateUserToken {
  id: string;
  createdTokenId?: string;
  purchasedTokenId?: string;
}

export interface APIUpdateUserItem {
  id: string;
  itemId?: number;
}
