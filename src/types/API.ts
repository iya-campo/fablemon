import { Gender, Pokeball, Type } from "@prisma/client";
import { Evolution, Stats } from "./Pokemon";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  spriteUrl?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  spriteUrl?: string;
  pokedollars?: number;
}

export interface CreatePokemonDto {
  name: string;
  hp: number;
  type: Type[];
  gender: Gender;
  level?: number;
  pokeball: Pokeball;
  ability: string;
  moves: number[];
  stats: Stats;
  friendship?: number;
  experience?: number;
  position?: number | null;
  evolution?: Evolution | null;
  userId?: string;
  isInParty?: boolean;
}

export interface UpdatePokemonDto {
  name?: string;
  hp?: number;
  type?: Type[];
  level?: number;
  ability?: string;
  moves?: number[];
  stats?: Stats;
  friendship?: number;
  experience?: number;
  position?: number | null;
  isInParty?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}