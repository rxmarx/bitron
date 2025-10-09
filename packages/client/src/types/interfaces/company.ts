import { Job } from "@prisma/client";
import { Shares } from "./shares";
import { Token } from "./token";
import { User } from "./user";

export interface Company {
  owner: User;
  ownerId: string;
  partners?: User[];
  shares?: Shares;
  employees?: User[];
  salary?: number;
  acquiredTokens?: Token[];
  hiring?: Job[];
  credibility?: number;
}

export interface APICreateCompany {
  id: string;
}

export interface APIFindCompany {
  id: string;
}

export interface APIFindAllCompanies {
  id: string[];
}

export interface APIUpdateCompanyInfo {
  id: string;
  salary?: number;
  hiring?: Job[];
  credibility?: number;
}

export interface APIUpdateCompanyUser {
  id: string;
  partnerId?: string;
  employeeId?: string;
}

export interface APIUpdateCompanyShares {
  id: string;
}

export interface APIUpdateCompanyToken {
  id: string;
  tokenId?: string;
}
