import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { CreatePokemonDto, UpdatePokemonDto } from '@/types/API';
import { Gender, Pokeball, Type } from '@prisma/client';
import { 
  createPokemon, 
  findAllPokemon, 
  findPartyByUserId, 
  findPokemonById, 
  findPokemonByUserId, 
  findStoredByUserId, 
  togglePartyStatus,
  searchPokemon, 
  updatePokemon, 
  removePokemon
} from '@/services/pokemon.service';

// Validation schemas
const createPokemonSchema = z.object({
  name: z.string().min(1).max(100),
  hp: z.number().min(1),
  type: z.array(z.nativeEnum(Type)).min(1).max(2),
  gender: z.nativeEnum(Gender),
  level: z.number().min(1).max(100).optional(),
  pokeball: z.nativeEnum(Pokeball),
  ability: z.string().min(1).max(100),
  moves: z.array(z.number()).min(1).max(4),
  stats: z.object({
    attack: z.number().min(1),
    defense: z.number().min(1),
    specialAttack: z.number().min(1),
    specialDefense: z.number().min(1),
    speed: z.number().min(1),
  }),
  friendship: z.number().min(0).max(255).optional(),
  experience: z.number().min(0).optional(),
  position: z.number().nullable().optional(),
  evolution: z.object({
    evolvesToId: z.number(),
    levelRequirement: z.number(),
    itemRequirement: z.string().nullable().optional(),
  }).nullable().optional(),
  userId: z.string().optional(),
  isInParty: z.boolean().optional(),
});

const updatePokemonSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  hp: z.number().min(1).optional(),
  type: z.array(z.nativeEnum(Type)).min(1).max(2).optional(),
  level: z.number().min(1).max(100).optional(),
  ability: z.string().min(1).max(100).optional(),
  moves: z.array(z.number()).min(1).max(4).optional(),
  stats: z.object({
    attack: z.number().min(1),
    defense: z.number().min(1),
    specialAttack: z.number().min(1),
    specialDefense: z.number().min(1),
    speed: z.number().min(1),
  }).optional(),
  friendship: z.number().min(0).max(255).optional(),
  experience: z.number().min(0).optional(),
  position: z.number().nullable().optional(),
  isInParty: z.boolean().optional(),
});

// Helper function to handle errors
const handleError = (
  error: unknown, 
  errorMessage: string, 
  statusCode: number = 500
) => {
  console.error(errorMessage, error);
  return NextResponse.json(
    {
      success: false,
      error: errorMessage,
      message: error instanceof Error ? error.message : 'Unknown error',
    },
    { status: statusCode }
  );
};

// Get all Pokemon with pagination
export const getAll = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const orderBy = searchParams.get('orderBy') || undefined;
    const order = searchParams.get('order') as 'asc' | 'desc' || 'asc';
    const userId = searchParams.get('userId') || undefined;

    const result = await findAllPokemon({
      page,
      limit,
      orderBy,
      order,
      userId,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    return handleError(error, 'Error fetching Pokemon');
  }
};

// Get Pokemon by ID
export const getById = async (request: NextRequest, id: number) => {
  try {
    const pokemon = await findPokemonById(id);

    if (!pokemon) {
      return NextResponse.json(
        {
          success: false,
          error: 'Pokemon not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: pokemon,
    });
  } catch (error) {
    return handleError(error, 'Error fetching Pokemon');
  }
};

// Get Pokemon by user ID
export const getByUserId = async (request: NextRequest, userId: string) => {
  try {
    const pokemon = await findPokemonByUserId(userId);

    return NextResponse.json({
      success: true,
      data: pokemon,
    });
  } catch (error) {
    return handleError(error, 'Error fetching Pokemon');
  }
};

// Get party Pokemon by user ID
export const getPartyByUserId = async (request: NextRequest, userId: string) => {
  try {
    const pokemon = await findPartyByUserId(userId);

    return NextResponse.json({
      success: true,
      data: pokemon,
    });
  } catch (error) {
    return handleError(error, 'Error fetching party Pokemon');
  }
};

// Get stored Pokemon by user ID
export const getStoredByUserId = async (request: NextRequest, userId: string) => {
  try {
    const pokemon = await findStoredByUserId(userId);

    return NextResponse.json({
      success: true,
      data: pokemon,
    });
  } catch (error) {
    return handleError(error, 'Error fetching stored Pokemon');
  }
};

// Create a new Pokemon
export const create = async (request: NextRequest) => {
  try {
    const body = await request.json();
    
    // Validate request body
    const validation = createPokemonSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          message: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const pokemon = await createPokemon(validation.data as CreatePokemonDto);

    return NextResponse.json(
      {
        success: true,
        data: pokemon,
        message: 'Pokemon created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, 'Error creating Pokemon');
  }
};

// Update Pokemon by ID
export const update = async (request: NextRequest, id: number) => {
  try {
    const body = await request.json();
    
    // Validate request body
    const validation = updatePokemonSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          message: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const pokemon = await updatePokemon(id, validation.data as UpdatePokemonDto);

    return NextResponse.json({
      success: true,
      data: pokemon,
      message: 'Pokemon updated successfully',
    });
  } catch (error) {
    return handleError(error, 'Error updating Pokemon');
  }
};

// Remove Pokemon by ID
export const remove = async (request: NextRequest, id: number) => {
  try {
    await removePokemon(id);

    return NextResponse.json({
      success: true,
      message: 'Pokemon removed successfully',
    });
  } catch (error) {
    return handleError(error, 'Error deleting Pokemon');
  }
};

// Toggle Pokemon party status
export const toggleStatus = async (request: NextRequest, id: number) => {
  try {
    const pokemon = await togglePartyStatus(id);

    return NextResponse.json({
      success: true,
      data: pokemon,
      message: pokemon.isInParty ? 'Pokemon added to party' : 'Pokemon removed from party',
    });
  } catch (error) {
    return handleError(error, 'Error toggling party status');
  }
};

// Search Pokemon by name or type
export const search = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: 'Search query is required',
        },
        { status: 400 }
      );
    }

    const pokemon = await searchPokemon(query);

    return NextResponse.json({
      success: true,
      data: pokemon,
    });
  } catch (error) {
    return handleError(error, 'Error searching Pokemon');
  }
};


// import { NextRequest, NextResponse } from 'next/server';
// import { z } from 'zod';
// import { PokemonService } from '../services/pokemon.service';
// import { CreatePokemonDto, UpdatePokemonDto } from '@/types/API';
// import { Gender, Pokeball, Type } from '@prisma/client';

// // Validation schemas
// const createPokemonSchema = z.object({
//   name: z.string().min(1).max(100),
//   hp: z.number().min(1),
//   type: z.array(z.nativeEnum(Type)).min(1).max(2),
//   gender: z.nativeEnum(Gender),
//   level: z.number().min(1).max(100).optional(),
//   pokeball: z.nativeEnum(Pokeball),
//   ability: z.string().min(1).max(100),
//   moves: z.array(z.number()).min(1).max(4),
//   stats: z.object({
//     attack: z.number().min(1),
//     defense: z.number().min(1),
//     specialAttack: z.number().min(1),
//     specialDefense: z.number().min(1),
//     speed: z.number().min(1),
//   }),
//   friendship: z.number().min(0).max(255).optional(),
//   experience: z.number().min(0).optional(),
//   position: z.number().nullable().optional(),
//   evolution: z.object({
//     evolvesToId: z.number(),
//     levelRequirement: z.number(),
//     itemRequirement: z.string().nullable().optional(),
//   }).nullable().optional(),
//   userId: z.string().optional(),
//   isInParty: z.boolean().optional(),
// });

// const updatePokemonSchema = z.object({
//   name: z.string().min(1).max(100).optional(),
//   hp: z.number().min(1).optional(),
//   type: z.array(z.nativeEnum(Type)).min(1).max(2).optional(),
//   level: z.number().min(1).max(100).optional(),
//   ability: z.string().min(1).max(100).optional(),
//   moves: z.array(z.number()).min(1).max(4).optional(),
//   stats: z.object({
//     attack: z.number().min(1),
//     defense: z.number().min(1),
//     specialAttack: z.number().min(1),
//     specialDefense: z.number().min(1),
//     speed: z.number().min(1),
//   }).optional(),
//   friendship: z.number().min(0).max(255).optional(),
//   experience: z.number().min(0).optional(),
//   position: z.number().nullable().optional(),
//   isInParty: z.boolean().optional(),
// });

// export class PokemonController {
//   /**
//    * GET /api/pokemon
//    * Get all Pokemon with pagination
//    */
//   static async getAll(request: NextRequest) {
//     try {
//       const { searchParams } = new URL(request.url);
//       const page = parseInt(searchParams.get('page') || '1');
//       const limit = parseInt(searchParams.get('limit') || '10');
//       const orderBy = searchParams.get('orderBy') || undefined;
//       const order = searchParams.get('order') as 'asc' | 'desc' || 'asc';
//       const userId = searchParams.get('userId') || undefined;

//       const result = await findAll({
//         page,
//         limit,
//         orderBy,
//         order,
//         userId,
//       });

//       return NextResponse.json({
//         success: true,
//         ...result,
//       });
//     } catch (error) {
//       console.error('Error fetching Pokemon:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to fetch Pokemon',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }

//   /**
//    * GET /api/pokemon/:id
//    * Get Pokemon by ID
//    */
//   static async getById(request: NextRequest, id: number) {
//     try {
//       const pokemon = await findById(id);
      
//       if (!pokemon) {
//         return NextResponse.json(
//           {
//             success: false,
//             error: 'Pokemon not found',
//           },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json({
//         success: true,
//         data: pokemon,
//       });
//     } catch (error) {
//       console.error('Error fetching Pokemon:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to fetch Pokemon',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }

//   /**
//    * GET /api/pokemon/user/:userId
//    * Get Pokemon by user ID
//    */
//   static async getByUserId(request: NextRequest, userId: string) {
//     try {
//       const pokemon = await findByUserId(userId);

//       return NextResponse.json({
//         success: true,
//         data: pokemon,
//       });
//     } catch (error) {
//       console.error('Error fetching Pokemon:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to fetch Pokemon',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }

//   /**
//    * GET /api/pokemon/party/:userId
//    * Get party Pokemon by user ID
//    */
//   static async getPartyByUserId(request: NextRequest, userId: string) {
//     try {
//       const pokemon = await findPartyByUserId(userId);

//       return NextResponse.json({
//         success: true,
//         data: pokemon,
//       });
//     } catch (error) {
//       console.error('Error fetching party Pokemon:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to fetch party Pokemon',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }

//   /**
//    * GET /api/pokemon/stored/:userId
//    * Get stored Pokemon by user ID
//    */
//   static async getStoredByUserId(request: NextRequest, userId: string) {
//     try {
//       const pokemon = await findStoredByUserId(userId);

//       return NextResponse.json({
//         success: true,
//         data: pokemon,
//       });
//     } catch (error) {
//       console.error('Error fetching stored Pokemon:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to fetch stored Pokemon',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }

//   /**
//    * POST /api/pokemon
//    * Create a new Pokemon
//    */
//   static async create(request: NextRequest) {
//     try {
//       const body = await request.json();
      
//       // Validate request body
//       const validation = createPokemonSchema.safeParse(body);
//       if (!validation.success) {
//         return NextResponse.json(
//           {
//             success: false,
//             error: 'Validation failed',
//             message: validation.error.errors,
//           },
//           { status: 400 }
//         );
//       }

//       const pokemon = await create(validation.data as CreatePokemonDto);

//       return NextResponse.json(
//         {
//           success: true,
//           data: pokemon,
//           message: 'Pokemon created successfully',
//         },
//         { status: 201 }
//       );
//     } catch (error) {
//       console.error('Error creating Pokemon:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to create Pokemon',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }

//   /**
//    * PATCH /api/pokemon/:id
//    * Update Pokemon by ID
//    */
//   static async update(request: NextRequest, id: number) {
//     try {
//       const body = await request.json();
      
//       // Validate request body
//       const validation = updatePokemonSchema.safeParse(body);
//       if (!validation.success) {
//         return NextResponse.json(
//           {
//             success: false,
//             error: 'Validation failed',
//             message: validation.error.errors,
//           },
//           { status: 400 }
//         );
//       }

//       const pokemon = await update(id, validation.data as UpdatePokemonDto);

//       return NextResponse.json({
//         success: true,
//         data: pokemon,
//         message: 'Pokemon updated successfully',
//       });
//     } catch (error) {
//       console.error('Error updating Pokemon:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to update Pokemon',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }

//   /**
//    * DELETE /api/pokemon/:id
//    * Delete Pokemon by ID
//    */
//   static async delete(request: NextRequest, id: number) {
//     try {
//       await delete(id);

//       return NextResponse.json({
//         success: true,
//         message: 'Pokemon deleted successfully',
//       });
//     } catch (error) {
//       console.error('Error deleting Pokemon:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to delete Pokemon',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }

//   /**
//    * POST /api/pokemon/:id/toggle-party
//    * Toggle Pokemon party status
//    */
//   static async togglePartyStatus(request: NextRequest, id: number) {
//     try {
//       const pokemon = await togglePartyStatus(id);

//       return NextResponse.json({
//         success: true,
//         data: pokemon,
//         message: pokemon.isInParty ? 'Pokemon added to party' : 'Pokemon removed from party',
//       });
//     } catch (error) {
//       console.error('Error toggling party status:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to toggle party status',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }

//   /**
//    * GET /api/pokemon/search
//    * Search Pokemon by name or type
//    */
//   static async search(request: NextRequest) {
//     try {
//       const { searchParams } = new URL(request.url);
//       const query = searchParams.get('q');

//       if (!query) {
//         return NextResponse.json(
//           {
//             success: false,
//             error: 'Search query is required',
//           },
//           { status: 400 }
//         );
//       }

//       const pokemon = await search(query);

//       return NextResponse.json({
//         success: true,
//         data: pokemon,
//       });
//     } catch (error) {
//       console.error('Error searching Pokemon:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to search Pokemon',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }
// }