import { Category } from "@prisma/client";
import { PowerUp } from "./powerup";
import { User } from "./user";

export interface Item {
  id: number;
  name: string;
  description: string;
  cost: number;
  level: number;
  category: string;
  stealable: boolean;
  users: User[];
  powerUps: PowerUp[];
}

export interface APIFindItem {
  id?: number;
  name?: string;
}

export interface APICreateItem {
  name: string;
  description: string;
  category: Category;
}

export interface APIUpdateItemInfo {
  id?: number;
  description?: string;
  cost?: number;
  level?: number;
  category?: Category;
  stealable?: boolean;
}

export interface APIUpdateItemUser {
  id: number;
  userId: string;
}

export interface APIUpdateItemPowerUp {
  id: number;
  powerUpId: number;
}
