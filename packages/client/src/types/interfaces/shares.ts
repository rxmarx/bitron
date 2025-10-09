import { Bank } from "./bank";
import { Company } from "./company";
import { User } from "./user";

export interface Shares {
  company: Company;
  id: string;
  count?: number;
  value?: number;
  holders?: User[];
  bank?: Bank[];
}

export interface APICreateShares {
  id: string;
}

export interface APIFindShares {
  id: string;
}

export interface APIFindAllShares {
  id: string[];
}

export interface APIUpdateSharesInfo {
  id: string;
  count?: number;
  value?: number;
}

export interface APIUpdateSharesUser {
  id: string;
  holderId?: string;
}

export interface APIUpdateSharesBank {
  id: string;
  bankId?: string;
}
