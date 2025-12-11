export interface Pokemon {
  id?: number;
  name: string;
  hp: number;
  type: Type[];
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
  type: Type;
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

export type Type = "NORMAL"
 | "WATER"
 | "FIRE"
 | "GRASS"
 | "ELECTRIC"
 | "ICE"
 | "FIGHT"
 | "POISON"
 | "GROUND"
 | "FLYING"
 | "PSYCHIC"
 | "BUG"
 | "ROCK"
 | "GHOST"
 | "DRAGON"
 | "DARK"
 | "STEEL"
 | "FAIRY"

export type Gender = "MALE" | "FEMALE"

export type Pokeball = "POKEBALL" | "GREATBALL" | "ULTRABALL" | "MASTERBALL"

export type EvolutionItem = "WATER_STONE" 
 | "FIRE_STONE" 
 | "THUNDER_STONE" 
 | "LEAF_STONE" 
 | "MOON_STONE"