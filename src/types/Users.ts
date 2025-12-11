import { InventoryItem } from "@prisma/client";
import { Pokemon } from "./Pokemon";

export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  pokemon?: Pokemon[];
  partyPokemon?: Pokemon[];
  storedPokemon?: Pokemon[];
  inventory?: InventoryItem[];
  pokedollars: number;
  spriteUrl?: string;
}