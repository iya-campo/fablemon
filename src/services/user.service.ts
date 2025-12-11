import prisma from '@/lib/prisma';
import supabase from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { User } from '@/types/Users';
import { 
  CreateUserDto, 
  UpdateUserDto, 
  PaginationParams,
  PaginatedResponse 
} from '@/types/API';

/**
 * Create a new user with Supabase authentication
 */
export const createUser = async (data: CreateUserDto): Promise<User> => {
  // Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (authError) {
    throw new Error(`Authentication error: ${authError.message}`);
  }

  if (!authData.user) {
    throw new Error('User creation failed');
  }

  // Hash password for database storage
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create user in database
  const user = await prisma.user.create({
    data: {
      id: authData.user.id,
      name: data.name,
      email: data.email,
      password: hashedPassword,
      spriteUrl: data.spriteUrl,
    },
    include: {
      pokemon: {
        include: {
          types: true,
          moves: {
            include: {
              move: true,
            },
          },
          evolution: true,
        },
      },
      inventoryItems: {
        include: {
          inventoryItem: true,
        },
      },
    },
  });

  return mapToUserDto(user);
};

/**
 * Find all users with pagination
 */
export const findAllUsers = async (params: PaginationParams): Promise<PaginatedResponse<User>> => {
  const page = params.page || 1;
  const limit = params.limit || 10;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: params.orderBy ? { [params.orderBy]: params.order || 'asc' } : undefined,
      include: {
        pokemon: {
          include: {
            types: true,
            moves: {
              include: {
                move: true,
              },
            },
            evolution: true,
          },
        },
        inventoryItems: {
          include: {
            inventoryItem: true,
          },
        },
      },
    }),
    prisma.user.count(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: users.map(user => mapToUserDto(user)),
    total,
    page,
    totalPages,
    hasMore: page < totalPages,
  };
};

/**
 * Find user by ID
 */
export const findUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      pokemon: {
        include: {
          types: true,
          moves: {
            include: {
              move: true,
            },
          },
          evolution: true,
        },
      },
      inventoryItems: {
        include: {
          inventoryItem: true,
        },
      },
    },
  });

  return user ? mapToUserDto(user) : null;
};

/**
 * Find user by email
 */
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      pokemon: {
        include: {
          types: true,
          moves: {
            include: {
              move: true,
            },
          },
          evolution: true,
        },
      },
      inventoryItems: {
        include: {
          inventoryItem: true,
        },
      },
    },
  });

  return user ? mapToUserDto(user) : null;
};

/**
 * Update user by ID
 */
export const updateUser = async (id: string, data: UpdateUserDto): Promise<User> => {
  // If password is being updated, hash it
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);

    // Update password in Supabase Auth
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      throw new Error(`Failed to update authentication: ${error.message}`);
    }
  }

  const user = await prisma.user.update({
    where: { id },
    data,
    include: {
      pokemon: {
        include: {
          types: true,
          moves: {
            include: {
              move: true,
            },
          },
          evolution: true,
        },
      },
      inventoryItems: {
        include: {
          inventoryItem: true,
        },
      },
    },
  });

  return mapToUserDto(user);
};

/**
 * Remove user by ID
 */
export const removeUser = async (id: string): Promise<void> => {
  // Delete from database (will cascade delete related data)
  await prisma.user.delete({
    where: { id },
  });

  // Delete from Supabase Auth
  // Note: This requires admin privileges
  // In a real app, you might want to handle this differently
};

/**
 * Authenticate user
 */
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return null;
  }

  return findUserById(data.user.id);
};

/**
 * Map Prisma user to User DTO
 */
const mapToUserDto = (user: any): User => {
  const partyPokemon = user.pokemon?.filter((p: any) => p.isInParty) || [];
  const storedPokemon = user.pokemon?.filter((p: any) => !p.isInParty) || [];

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    pokedollars: user.pokedollars,
    spriteUrl: user.spriteUrl,
    pokemon: user.pokemon?.map((p: any) => ({
      id: p.id,
      name: p.name,
      hp: p.hp,
      type: p.types.map((t: any) => t.type),
      gender: p.gender,
      level: p.level,
      pokeball: p.pokeball,
      ability: p.ability,
      moves: p.moves.map((m: any) => ({
        id: m.move.id,
        name: m.move.name,
        type: m.move.type,
        power: m.move.power,
        accuracy: m.move.accuracy,
        pp: m.move.pp,
      })),
      stats: {
        attack: p.attack,
        defense: p.defense,
        specialAttack: p.specialAttack,
        specialDefense: p.specialDefense,
        speed: p.speed,
      },
      friendship: p.friendship,
      experience: p.experience,
      position: p.position,
      evolution: p.evolution ? {
        evolvesToId: p.evolution.evolvesToId,
        levelRequirement: p.evolution.levelRequirement,
        itemRequirement: p.evolution.itemRequirement,
      } : null,
    })),
    partyPokemon: partyPokemon.map((p: any) => ({
      id: p.id,
      name: p.name,
      hp: p.hp,
      type: p.types.map((t: any) => t.type),
      gender: p.gender,
      level: p.level,
      pokeball: p.pokeball,
      ability: p.ability,
      moves: p.moves.map((m: any) => ({
        id: m.move.id,
        name: m.move.name,
        type: m.move.type,
        power: m.move.power,
        accuracy: m.move.accuracy,
        pp: m.move.pp,
      })),
      stats: {
        attack: p.attack,
        defense: p.defense,
        specialAttack: p.specialAttack,
        specialDefense: p.specialDefense,
        speed: p.speed,
      },
      friendship: p.friendship,
      experience: p.experience,
      position: p.position,
      evolution: p.evolution ? {
        evolvesToId: p.evolution.evolvesToId,
        levelRequirement: p.evolution.levelRequirement,
        itemRequirement: p.evolution.itemRequirement,
      } : null,
    })),
    storedPokemon: storedPokemon.map((p: any) => ({
      id: p.id,
      name: p.name,
      hp: p.hp,
      type: p.types.map((t: any) => t.type),
      gender: p.gender,
      level: p.level,
      pokeball: p.pokeball,
      ability: p.ability,
      moves: p.moves.map((m: any) => ({
        id: m.move.id,
        name: m.move.name,
        type: m.move.type,
        power: m.move.power,
        accuracy: m.move.accuracy,
        pp: m.move.pp,
      })),
      stats: {
        attack: p.attack,
        defense: p.defense,
        specialAttack: p.specialAttack,
        specialDefense: p.specialDefense,
        speed: p.speed,
      },
      friendship: p.friendship,
      experience: p.experience,
      position: p.position,
      evolution: p.evolution ? {
        evolvesToId: p.evolution.evolvesToId,
        levelRequirement: p.evolution.levelRequirement,
        itemRequirement: p.evolution.itemRequirement,
      } : null,
    })),
    inventory: user.inventoryItems?.map((ui: any) => ({
      id: ui.inventoryItem.id,
      name: ui.inventoryItem.name,
      quantity: ui.quantity,
    })),
  };
};


// import prisma from '@/lib/prisma';
// import supabase from '@/lib/supabase';
// import bcrypt from 'bcryptjs';
// import { User } from '@/types/Users';
// import { 
//   CreateUserDto, 
//   UpdateUserDto, 
//   PaginationParams,
//   PaginatedResponse 
// } from '@/types/API';

// export class UserService {
//   /**
//    * Create a new user with Supabase authentication
//    */
//   static async create(data: CreateUserDto): Promise<User> {
//     // Create user in Supabase Auth
//     const { data: authData, error: authError } = await supabase.auth.signUp({
//       email: data.email,
//       password: data.password,
//     });

//     if (authError) {
//       throw new Error(`Authentication error: ${authError.message}`);
//     }

//     if (!authData.user) {
//       throw new Error('User creation failed');
//     }

//     // Hash password for database storage
//     const hashedPassword = await bcrypt.hash(data.password, 10);

//     // Create user in database
//     const user = await prisma.user.create({
//       data: {
//         id: authData.user.id,
//         name: data.name,
//         email: data.email,
//         password: hashedPassword,
//         spriteUrl: data.spriteUrl,
//       },
//       include: {
//         pokemon: {
//           include: {
//             types: true,
//             moves: {
//               include: {
//                 move: true,
//               },
//             },
//             evolution: true,
//           },
//         },
//         inventoryItems: {
//           include: {
//             inventoryItem: true,
//           },
//         },
//       },
//     });

//     return this.mapToUserDto(user);
//   }

//   /**
//    * Find all users with pagination
//    */
//   static async findAll(params: PaginationParams): Promise<PaginatedResponse<User>> {
//     const page = params.page || 1;
//     const limit = params.limit || 10;
//     const skip = (page - 1) * limit;

//     const [users, total] = await Promise.all([
//       prisma.user.findMany({
//         skip,
//         take: limit,
//         orderBy: params.orderBy ? { [params.orderBy]: params.order || 'asc' } : undefined,
//         include: {
//           pokemon: {
//             include: {
//               types: true,
//               moves: {
//                 include: {
//                   move: true,
//                 },
//               },
//               evolution: true,
//             },
//           },
//           inventoryItems: {
//             include: {
//               inventoryItem: true,
//             },
//           },
//         },
//       }),
//       prisma.user.count(),
//     ]);

//     const totalPages = Math.ceil(total / limit);

//     return {
//       data: users.map(user => this.mapToUserDto(user)),
//       total,
//       page,
//       totalPages,
//       hasMore: page < totalPages,
//     };
//   }

//   /**
//    * Find user by ID
//    */
//   static async findById(id: string): Promise<User | null> {
//     const user = await prisma.user.findUnique({
//       where: { id },
//       include: {
//         pokemon: {
//           include: {
//             types: true,
//             moves: {
//               include: {
//                 move: true,
//               },
//             },
//             evolution: true,
//           },
//         },
//         inventoryItems: {
//           include: {
//             inventoryItem: true,
//           },
//         },
//       },
//     });

//     return user ? this.mapToUserDto(user) : null;
//   }

//   /**
//    * Find user by email
//    */
//   static async findByEmail(email: string): Promise<User | null> {
//     const user = await prisma.user.findUnique({
//       where: { email },
//       include: {
//         pokemon: {
//           include: {
//             types: true,
//             moves: {
//               include: {
//                 move: true,
//               },
//             },
//             evolution: true,
//           },
//         },
//         inventoryItems: {
//           include: {
//             inventoryItem: true,
//           },
//         },
//       },
//     });

//     return user ? this.mapToUserDto(user) : null;
//   }

//   /**
//    * Update user by ID
//    */
//   static async update(id: string, data: UpdateUserDto): Promise<User> {
//     // If password is being updated, hash it
//     if (data.password) {
//       data.password = await bcrypt.hash(data.password, 10);
      
//       // Update password in Supabase Auth
//       const { error } = await supabase.auth.updateUser({
//         password: data.password,
//       });

//       if (error) {
//         throw new Error(`Failed to update authentication: ${error.message}`);
//       }
//     }

//     const user = await prisma.user.update({
//       where: { id },
//       data,
//       include: {
//         pokemon: {
//           include: {
//             types: true,
//             moves: {
//               include: {
//                 move: true,
//               },
//             },
//             evolution: true,
//           },
//         },
//         inventoryItems: {
//           include: {
//             inventoryItem: true,
//           },
//         },
//       },
//     });

//     return this.mapToUserDto(user);
//   }

//   /**
//    * Delete user by ID
//    */
//   static async delete(id: string): Promise<void> {
//     // Delete from database (will cascade delete related data)
//     await prisma.user.delete({
//       where: { id },
//     });

//     // Delete from Supabase Auth
//     // Note: This requires admin privileges
//     // In a real app, you might want to handle this differently
//   }

//   /**
//    * Authenticate user
//    */
//   static async authenticate(email: string, password: string): Promise<User | null> {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error || !data.user) {
//       return null;
//     }

//     return this.findById(data.user.id);
//   }

//   /**
//    * Map Prisma user to User DTO
//    */
//   private static mapToUserDto(user: any): User {
//     const partyPokemon = user.pokemon?.filter((p: any) => p.isInParty) || [];
//     const storedPokemon = user.pokemon?.filter((p: any) => !p.isInParty) || [];

//     return {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       pokedollars: user.pokedollars,
//       spriteUrl: user.spriteUrl,
//       pokemon: user.pokemon?.map((p: any) => ({
//         id: p.id,
//         name: p.name,
//         hp: p.hp,
//         type: p.types.map((t: any) => t.type),
//         gender: p.gender,
//         level: p.level,
//         pokeball: p.pokeball,
//         ability: p.ability,
//         moves: p.moves.map((m: any) => ({
//           id: m.move.id,
//           name: m.move.name,
//           type: m.move.type,
//           power: m.move.power,
//           accuracy: m.move.accuracy,
//           pp: m.move.pp,
//         })),
//         stats: {
//           attack: p.attack,
//           defense: p.defense,
//           specialAttack: p.specialAttack,
//           specialDefense: p.specialDefense,
//           speed: p.speed,
//         },
//         friendship: p.friendship,
//         experience: p.experience,
//         position: p.position,
//         evolution: p.evolution ? {
//           evolvesToId: p.evolution.evolvesToId,
//           levelRequirement: p.evolution.levelRequirement,
//           itemRequirement: p.evolution.itemRequirement,
//         } : null,
//       })),
//       partyPokemon: partyPokemon.map((p: any) => ({
//         id: p.id,
//         name: p.name,
//         hp: p.hp,
//         type: p.types.map((t: any) => t.type),
//         gender: p.gender,
//         level: p.level,
//         pokeball: p.pokeball,
//         ability: p.ability,
//         moves: p.moves.map((m: any) => ({
//           id: m.move.id,
//           name: m.move.name,
//           type: m.move.type,
//           power: m.move.power,
//           accuracy: m.move.accuracy,
//           pp: m.move.pp,
//         })),
//         stats: {
//           attack: p.attack,
//           defense: p.defense,
//           specialAttack: p.specialAttack,
//           specialDefense: p.specialDefense,
//           speed: p.speed,
//         },
//         friendship: p.friendship,
//         experience: p.experience,
//         position: p.position,
//         evolution: p.evolution ? {
//           evolvesToId: p.evolution.evolvesToId,
//           levelRequirement: p.evolution.levelRequirement,
//           itemRequirement: p.evolution.itemRequirement,
//         } : null,
//       })),
//       storedPokemon: storedPokemon.map((p: any) => ({
//         id: p.id,
//         name: p.name,
//         hp: p.hp,
//         type: p.types.map((t: any) => t.type),
//         gender: p.gender,
//         level: p.level,
//         pokeball: p.pokeball,
//         ability: p.ability,
//         moves: p.moves.map((m: any) => ({
//           id: m.move.id,
//           name: m.move.name,
//           type: m.move.type,
//           power: m.move.power,
//           accuracy: m.move.accuracy,
//           pp: m.move.pp,
//         })),
//         stats: {
//           attack: p.attack,
//           defense: p.defense,
//           specialAttack: p.specialAttack,
//           specialDefense: p.specialDefense,
//           speed: p.speed,
//         },
//         friendship: p.friendship,
//         experience: p.experience,
//         position: p.position,
//         evolution: p.evolution ? {
//           evolvesToId: p.evolution.evolvesToId,
//           levelRequirement: p.evolution.levelRequirement,
//           itemRequirement: p.evolution.itemRequirement,
//         } : null,
//       })),
//       inventory: user.inventoryItems?.map((ui: any) => ({
//         id: ui.inventoryItem.id,
//         name: ui.inventoryItem.name,
//         quantity: ui.quantity,
//       })),
//     };
//   }
// }