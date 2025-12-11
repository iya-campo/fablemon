import prisma from '@/lib/prisma';
import { Pokemon } from '@/types/Pokemon';
import { Type } from '@prisma/client';
import { 
  CreatePokemonDto, 
  UpdatePokemonDto, 
  PaginationParams,
  PaginatedResponse,
} from '@/types/API';

/**
 * Create a new Pokemon
 */
export const createPokemon = async (data: CreatePokemonDto): Promise<Pokemon> => {
  const pokemon = await prisma.pokemon.create({
    data: {
      name: data.name,
      hp: data.hp,
      gender: data.gender,
      level: data.level || 1,
      pokeball: data.pokeball,
      ability: data.ability,
      friendship: data.friendship || 50,
      experience: data.experience || 0,
      position: data.position,
      isInParty: data.isInParty || false,
      attack: data.stats.attack,
      defense: data.stats.defense,
      specialAttack: data.stats.specialAttack,
      specialDefense: data.stats.specialDefense,
      speed: data.stats.speed,
      userId: data.userId,
      types: {
        create: data.type.map(t => ({ type: t })),
      },
      moves: {
        create: data.moves.map(moveId => ({
          moveId,
        })),
      },
      evolution: data.evolution ? {
        create: {
          evolvesToId: data.evolution.evolvesToId,
          levelRequirement: data.evolution.levelRequirement,
          itemRequirement: data.evolution.itemRequirement,
        },
      } : undefined,
    },
    include: {
      types: true,
      moves: {
        include: {
          move: true,
        },
      },
      evolution: true,
    },
  });

  return mapToPokemonDto(pokemon);
};

/**
 * Find all Pokemon with pagination
 */
export const findAllPokemon = async (params: PaginationParams & { userId?: string }): Promise<PaginatedResponse<Pokemon>> => {
  const page = params.page || 1;
  const limit = params.limit || 10;
  const skip = (page - 1) * limit;

  const where = params.userId ? { userId: params.userId } : {};

  const [pokemon, total] = await Promise.all([
    prisma.pokemon.findMany({
      where,
      skip,
      take: limit,
      orderBy: params.orderBy ? { [params.orderBy]: params.order || 'asc' } : undefined,
      include: {
        types: true,
        moves: {
          include: {
            move: true,
          },
        },
        evolution: true,
      },
    }),
    prisma.pokemon.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: pokemon.map(p => mapToPokemonDto(p)),
    total,
    page,
    totalPages,
    hasMore: page < totalPages,
  };
};

/**
 * Find Pokemon by ID
 */
export const findPokemonById = async (id: number): Promise<Pokemon | null> => {
  const pokemon = await prisma.pokemon.findUnique({
    where: { id },
    include: {
      types: true,
      moves: {
        include: {
          move: true,
        },
      },
      evolution: true,
    },
  });

  return pokemon ? mapToPokemonDto(pokemon) : null;
};

/**
 * Find Pokemon by user ID
 */
export const findPokemonByUserId = async (userId: string): Promise<Pokemon[]> => {
  const pokemon = await prisma.pokemon.findMany({
    where: { userId },
    include: {
      types: true,
      moves: {
        include: {
          move: true,
        },
      },
      evolution: true,
    },
  });

  return pokemon.map(p => mapToPokemonDto(p));
};

/**
 * Find party Pokemon by user ID
 */
export const findPartyByUserId = async (userId: string): Promise<Pokemon[]> => {
  const pokemon = await prisma.pokemon.findMany({
    where: { 
      userId,
      isInParty: true,
    },
    orderBy: { position: 'asc' },
    include: {
      types: true,
      moves: {
        include: {
          move: true,
        },
      },
      evolution: true,
    },
  });

  return pokemon.map(p => mapToPokemonDto(p));
};

/**
 * Find stored Pokemon by user ID
 */
export const findStoredByUserId = async (userId: string): Promise<Pokemon[]> => {
  const pokemon = await prisma.pokemon.findMany({
    where: { 
      userId,
      isInParty: false,
    },
    include: {
      types: true,
      moves: {
        include: {
          move: true,
        },
      },
      evolution: true,
    },
  });

  return pokemon.map(p => mapToPokemonDto(p));
};

/**
 * Update Pokemon by ID
 */
export const updatePokemon = async (id: number, data: UpdatePokemonDto): Promise<Pokemon> => {
  if (data.type) {
    await prisma.pokemonType.deleteMany({
      where: { pokemonId: id },
    });
  }

  if (data.moves) {
    await prisma.pokemonMove.deleteMany({
      where: { pokemonId: id },
    });
  }

  const updateData: any = {
    name: data.name,
    hp: data.hp,
    level: data.level,
    ability: data.ability,
    friendship: data.friendship,
    experience: data.experience,
    position: data.position,
    isInParty: data.isInParty,
  };

  if (data.stats) {
    updateData.attack = data.stats.attack;
    updateData.defense = data.stats.defense;
    updateData.specialAttack = data.stats.specialAttack;
    updateData.specialDefense = data.stats.specialDefense;
    updateData.speed = data.stats.speed;
  }

  if (data.type) {
    updateData.types = {
      create: data.type.map(t => ({ type: t })),
    };
  }

  if (data.moves) {
    updateData.moves = {
      create: data.moves.map(moveId => ({ moveId })),
    };
  }

  const pokemon = await prisma.pokemon.update({
    where: { id },
    data: updateData,
    include: {
      types: true,
      moves: {
        include: {
          move: true,
        },
      },
      evolution: true,
    },
  });

  return mapToPokemonDto(pokemon);
};

/**
 * Remove Pokemon by ID
 */
export const removePokemon = async (id: number): Promise<void> => {
  await prisma.pokemon.delete({
    where: { id },
  });
};

/**
 * Transfer Pokemon to/from party
 */
export const togglePartyStatus = async (id: number): Promise<Pokemon> => {
  const pokemon = await prisma.pokemon.findUnique({
    where: { id },
  });

  if (!pokemon) {
    throw new Error('Pokemon not found');
  }

  if (!pokemon.isInParty && pokemon.userId) {
    const partyCount = await prisma.pokemon.count({
      where: {
        userId: pokemon.userId,
        isInParty: true,
      },
    });

    if (partyCount >= 6) {
      throw new Error('Party is full (maximum 6 Pokemon)');
    }
  }

  const updatedPokemon = await prisma.pokemon.update({
    where: { id },
    data: {
      isInParty: !pokemon.isInParty,
      position: !pokemon.isInParty ? await getNextPartyPosition(pokemon.userId!) : null,
    },
    include: {
      types: true,
      moves: {
        include: {
          move: true,
        },
      },
      evolution: true,
    },
  });

  return mapToPokemonDto(updatedPokemon);
};

/**
 * Get next available party position
 */
const getNextPartyPosition = async (userId: string): Promise<number> => {
  const lastPokemon = await prisma.pokemon.findFirst({
    where: {
      userId,
      isInParty: true,
    },
    orderBy: { position: 'desc' },
  });

  return lastPokemon?.position ? lastPokemon.position + 1 : 1;
};

/**
 * Map Prisma Pokemon to Pokemon DTO
 */
const mapToPokemonDto = (pokemon: any): Pokemon => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    hp: pokemon.hp,
    type: pokemon.types.map((t: any) => t.type as Type),
    gender: pokemon.gender,
    level: pokemon.level,
    pokeball: pokemon.pokeball,
    ability: pokemon.ability,
    moves: pokemon.moves.map((m: any) => ({
      id: m.move.id,
      name: m.move.name,
      type: m.move.type,
      power: m.move.power,
      accuracy: m.move.accuracy,
      pp: m.move.pp,
    })),
    stats: {
      attack: pokemon.attack,
      defense: pokemon.defense,
      specialAttack: pokemon.specialAttack,
      specialDefense: pokemon.specialDefense,
      speed: pokemon.speed,
    },
    friendship: pokemon.friendship,
    experience: pokemon.experience,
    position: pokemon.position,
    evolution: pokemon.evolution ? {
      evolvesToId: pokemon.evolution.evolvesToId,
      levelRequirement: pokemon.evolution.levelRequirement,
      itemRequirement: pokemon.evolution.itemRequirement,
    } : null,
    userId: pokemon.userId,
    isInParty: pokemon.isInParty,
  };
};

/**
 * Search Pokemon by name or type
 */
export const searchPokemon = async (query: string): Promise<Pokemon[]> => {
  const pokemon = await prisma.pokemon.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { ability: { contains: query, mode: 'insensitive' } },
        { types: { some: { type: query.toUpperCase() as Type } } },
      ],
    },
    include: {
      types: true,
      moves: {
        include: {
          move: true,
        },
      },
      evolution: true,
    },
  });

  return pokemon.map(p => mapToPokemonDto(p));
};


// import prisma from '@/lib/prisma';
// import { Pokemon } from '@/types/Pokemon';
// import { Type } from '@prisma/client';
// import { 
//   CreatePokemonDto, 
//   UpdatePokemonDto, 
//   PaginationParams,
//   PaginatedResponse,
// } from '@/types/API';

// export class PokemonService {
//   /**
//    * Create a new Pokemon
//    */
//   static async create(data: CreatePokemonDto): Promise<Pokemon> {
//     const pokemon = await prisma.pokemon.create({
//       data: {
//         name: data.name,
//         hp: data.hp,
//         gender: data.gender,
//         level: data.level || 1,
//         pokeball: data.pokeball,
//         ability: data.ability,
//         friendship: data.friendship || 50,
//         experience: data.experience || 0,
//         position: data.position,
//         isInParty: data.isInParty || false,
//         attack: data.stats.attack,
//         defense: data.stats.defense,
//         specialAttack: data.stats.specialAttack,
//         specialDefense: data.stats.specialDefense,
//         speed: data.stats.speed,
//         userId: data.userId,
//         types: {
//           create: data.type.map(t => ({ type: t })),
//         },
//         moves: {
//           create: data.moves.map(moveId => ({
//             moveId,
//           })),
//         },
//         evolution: data.evolution ? {
//           create: {
//             evolvesToId: data.evolution.evolvesToId,
//             levelRequirement: data.evolution.levelRequirement,
//             itemRequirement: data.evolution.itemRequirement,
//           },
//         } : undefined,
//       },
//       include: {
//         types: true,
//         moves: {
//           include: {
//             move: true,
//           },
//         },
//         evolution: true,
//       },
//     });

//     return this.mapToPokemonDto(pokemon);
//   }

//   /**
//    * Find all Pokemon with pagination
//    */
//   static async findAll(params: PaginationParams & { userId?: string }): Promise<PaginatedResponse<Pokemon>> {
//     const page = params.page || 1;
//     const limit = params.limit || 10;
//     const skip = (page - 1) * limit;

//     const where = params.userId ? { userId: params.userId } : {};

//     const [pokemon, total] = await Promise.all([
//       prisma.pokemon.findMany({
//         where,
//         skip,
//         take: limit,
//         orderBy: params.orderBy ? { [params.orderBy]: params.order || 'asc' } : undefined,
//         include: {
//           types: true,
//           moves: {
//             include: {
//               move: true,
//             },
//           },
//           evolution: true,
//         },
//       }),
//       prisma.pokemon.count({ where }),
//     ]);

//     const totalPages = Math.ceil(total / limit);

//     return {
//       data: pokemon.map(p => this.mapToPokemonDto(p)),
//       total,
//       page,
//       totalPages,
//       hasMore: page < totalPages,
//     };
//   }

//   /**
//    * Find Pokemon by ID
//    */
//   static async findById(id: number): Promise<Pokemon | null> {
//     const pokemon = await prisma.pokemon.findUnique({
//       where: { id },
//       include: {
//         types: true,
//         moves: {
//           include: {
//             move: true,
//           },
//         },
//         evolution: true,
//       },
//     });

//     return pokemon ? this.mapToPokemonDto(pokemon) : null;
//   }

//   /**
//    * Find Pokemon by user ID
//    */
//   static async findByUserId(userId: string): Promise<Pokemon[]> {
//     const pokemon = await prisma.pokemon.findMany({
//       where: { userId },
//       include: {
//         types: true,
//         moves: {
//           include: {
//             move: true,
//           },
//         },
//         evolution: true,
//       },
//     });

//     return pokemon.map(p => this.mapToPokemonDto(p));
//   }

//   /**
//    * Find party Pokemon by user ID
//    */
//   static async findPartyByUserId(userId: string): Promise<Pokemon[]> {
//     const pokemon = await prisma.pokemon.findMany({
//       where: { 
//         userId,
//         isInParty: true,
//       },
//       orderBy: { position: 'asc' },
//       include: {
//         types: true,
//         moves: {
//           include: {
//             move: true,
//           },
//         },
//         evolution: true,
//       },
//     });

//     return pokemon.map(p => this.mapToPokemonDto(p));
//   }

//   /**
//    * Find stored Pokemon by user ID
//    */
//   static async findStoredByUserId(userId: string): Promise<Pokemon[]> {
//     const pokemon = await prisma.pokemon.findMany({
//       where: { 
//         userId,
//         isInParty: false,
//       },
//       include: {
//         types: true,
//         moves: {
//           include: {
//             move: true,
//           },
//         },
//         evolution: true,
//       },
//     });

//     return pokemon.map(p => this.mapToPokemonDto(p));
//   }

//   /**
//    * Update Pokemon by ID
//    */
//   static async update(id: number, data: UpdatePokemonDto): Promise<Pokemon> {
//     // First, delete existing types and moves if they're being updated
//     if (data.type) {
//       await prisma.pokemonType.deleteMany({
//         where: { pokemonId: id },
//       });
//     }

//     if (data.moves) {
//       await prisma.pokemonMove.deleteMany({
//         where: { pokemonId: id },
//       });
//     }

//     const updateData: any = {
//       name: data.name,
//       hp: data.hp,
//       level: data.level,
//       ability: data.ability,
//       friendship: data.friendship,
//       experience: data.experience,
//       position: data.position,
//       isInParty: data.isInParty,
//     };

//     if (data.stats) {
//       updateData.attack = data.stats.attack;
//       updateData.defense = data.stats.defense;
//       updateData.specialAttack = data.stats.specialAttack;
//       updateData.specialDefense = data.stats.specialDefense;
//       updateData.speed = data.stats.speed;
//     }

//     if (data.type) {
//       updateData.types = {
//         create: data.type.map(t => ({ type: t })),
//       };
//     }

//     if (data.moves) {
//       updateData.moves = {
//         create: data.moves.map(moveId => ({ moveId })),
//       };
//     }

//     const pokemon = await prisma.pokemon.update({
//       where: { id },
//       data: updateData,
//       include: {
//         types: true,
//         moves: {
//           include: {
//             move: true,
//           },
//         },
//         evolution: true,
//       },
//     });

//     return this.mapToPokemonDto(pokemon);
//   }

//   /**
//    * Delete Pokemon by ID
//    */
//   static async delete(id: number): Promise<void> {
//     await prisma.pokemon.delete({
//       where: { id },
//     });
//   }

//   /**
//    * Transfer Pokemon to/from party
//    */
//   static async togglePartyStatus(id: number): Promise<Pokemon> {
//     const pokemon = await prisma.pokemon.findUnique({
//       where: { id },
//     });

//     if (!pokemon) {
//       throw new Error('Pokemon not found');
//     }

//     // Check party size limit (6 Pokemon max)
//     if (!pokemon.isInParty && pokemon.userId) {
//       const partyCount = await prisma.pokemon.count({
//         where: {
//           userId: pokemon.userId,
//           isInParty: true,
//         },
//       });

//       if (partyCount >= 6) {
//         throw new Error('Party is full (maximum 6 Pokemon)');
//       }
//     }

//     const updatedPokemon = await prisma.pokemon.update({
//       where: { id },
//       data: {
//         isInParty: !pokemon.isInParty,
//         position: !pokemon.isInParty ? await this.getNextPartyPosition(pokemon.userId!) : null,
//       },
//       include: {
//         types: true,
//         moves: {
//           include: {
//             move: true,
//           },
//         },
//         evolution: true,
//       },
//     });

//     return this.mapToPokemonDto(updatedPokemon);
//   }

//   /**
//    * Get next available party position
//    */
//   private static async getNextPartyPosition(userId: string): Promise<number> {
//     const lastPokemon = await prisma.pokemon.findFirst({
//       where: {
//         userId,
//         isInParty: true,
//       },
//       orderBy: { position: 'desc' },
//     });

//     return lastPokemon?.position ? lastPokemon.position + 1 : 1;
//   }

//   /**
//    * Map Prisma Pokemon to Pokemon DTO
//    */
//   private static mapToPokemonDto(pokemon: any): Pokemon {
//     return {
//       id: pokemon.id,
//       name: pokemon.name,
//       hp: pokemon.hp,
//       type: pokemon.types.map((t: any) => t.type as Type),
//       gender: pokemon.gender,
//       level: pokemon.level,
//       pokeball: pokemon.pokeball,
//       ability: pokemon.ability,
//       moves: pokemon.moves.map((m: any) => ({
//         id: m.move.id,
//         name: m.move.name,
//         type: m.move.type,
//         power: m.move.power,
//         accuracy: m.move.accuracy,
//         pp: m.move.pp,
//       })),
//       stats: {
//         attack: pokemon.attack,
//         defense: pokemon.defense,
//         specialAttack: pokemon.specialAttack,
//         specialDefense: pokemon.specialDefense,
//         speed: pokemon.speed,
//       },
//       friendship: pokemon.friendship,
//       experience: pokemon.experience,
//       position: pokemon.position,
//       evolution: pokemon.evolution ? {
//         evolvesToId: pokemon.evolution.evolvesToId,
//         levelRequirement: pokemon.evolution.levelRequirement,
//         itemRequirement: pokemon.evolution.itemRequirement,
//       } : null,
//       userId: pokemon.userId,
//       isInParty: pokemon.isInParty,
//     };
//   }

//   /**
//    * Search Pokemon by name or type
//    */
//   static async search(query: string): Promise<Pokemon[]> {
//     const pokemon = await prisma.pokemon.findMany({
//       where: {
//         OR: [
//           { name: { contains: query, mode: 'insensitive' } },
//           { ability: { contains: query, mode: 'insensitive' } },
//           { types: { some: { type: query.toUpperCase() as Type } } },
//         ],
//       },
//       include: {
//         types: true,
//         moves: {
//           include: {
//             move: true,
//           },
//         },
//         evolution: true,
//       },
//     });

//     return pokemon.map(p => this.mapToPokemonDto(p));
//   }
// }