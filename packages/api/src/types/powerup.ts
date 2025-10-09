import { Item } from "./item";

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  items: Item[];
}

export interface APIFindPowerUp {
  id?: number;
  name?: string;
}

export interface APICreatePowerUp {
  name: string;
  description: string;
}

export interface APIUpdatePowerUpInfo {
  id: number;
  name?: string;
  description?: string;
  multiplier?: number;
}

export interface APIUpdatePowerUpItem {
  id: number;
  itemId: number;
}
