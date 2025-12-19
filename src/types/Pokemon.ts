import { EVOLUTION_ITEMS, POKEBALL } from "@/constants/itemConstants";
import { GENDER } from "@/constants/playerConstants";
import { POKEMON_TYPES } from "@/constants/typeConstants";

export interface Pokemon {
  id?: number;
  name: string;
  hp: number;
  type: PokemonTypeValue[];
  gender: Gender;
  level: number;
  pokeball: Pokeball;
  ability: string;
  moves: Move[];
  stats: Stats;
  friendship: number;
  experience: number;
  position: number | null;
  evolution: Evolution | null;
  userId?: string;
  isInParty?: boolean;
}

export interface Move {
  id?: number;
  name: string;
  type: PokemonTypeValue;
  power: number;
  accuracy: number;
  pp: number;
}

export interface Stats {
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface Evolution {
  evolvesToId: number;
  levelRequirement: number;
  itemRequirement: EvolutionItem | null;
}

export type Gender = typeof GENDER;
export type GenderKey = keyof Gender;
export type GenderKeyValue = Gender[GenderKey];

export type Pokeball = typeof POKEBALL;
export type PokeballKey = keyof Pokeball;
export type PokeballKeyValue = Pokeball[PokeballKey];

export type EvolutionItem = typeof EVOLUTION_ITEMS
export type EvolutionItemKey = keyof EvolutionItem;
export type EvolutionKeyValue = EvolutionItem[EvolutionItemKey];

export type PokemonTypes = typeof POKEMON_TYPES;
export type PokemonTypeKey = keyof PokemonTypes;
export type PokemonTypeValue = PokemonTypes[PokemonTypeKey];
