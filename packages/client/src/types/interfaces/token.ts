import { Bank } from "./bank";
import { Company } from "./company";
import { Tiers } from "@prisma/client";
import { User } from "./user";

export interface Token {
  id: string;
  title: string;
  description: string;
  points?: number;
  tier?: Tiers;
  sales?: number;
  price?: number;
  salesPerTier?: number;
  creator: User;
  creatorId: string;
  buyers?: User[];
  acquirer?: Company;
  acquirerId?: string;
  bank?: Bank[];
}

export interface APICreateToken {
  id: string;
  title: string;
  description: string;
}

export interface APIFindToken {
  id?: string;
  title?: string;
}

export interface APIFindAllTokens {
  id?: string[];
  title?: string[];
}

export interface APIUpdateTokenInfo {
  id: string;
  title?: string;
  description?: string;
  points?: number;
  tier?: Tiers;
  sales?: number;
  price?: number;
  salesPerTier?: number;
}

export interface APIUpdateTokenUser {
  id: string;
  creatorId?: string;
  buyerId?: string;
}

export interface APIUpdateTokenCompany {
  id: string;
  acquirerId: string;
}

export interface APIUpdateTokenBank {
  id: string;
  bankId: string;
}
