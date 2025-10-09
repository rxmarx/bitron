import { Shares } from "./shares";
import { Tiers } from "@prisma/client";
import { Token } from "./token";
import { User } from "./user";

export interface Bank {
  user: User;
  id: string;
  points?: number;
  tier?: Tiers;
  deposit?: number;
  tokens?: Token[];
  shares?: Shares[];
}

export interface APICreateBank {
  id: string;
}

export interface APIFindBank {
  id: string;
}

export interface APIFindAllBank {
  id: string[];
}

export interface APIUpdateBankInfo {
  id: string;
  points?: number;
  tier?: Tiers;
  deposit?: number;
}

export interface APIUpdateBankToken {
  id: string;
  tokenId?: string;
}

export interface APIUpdateBankShares {
  id: string;
  sharesId?: string;
}
