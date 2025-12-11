import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { CreateUserDto, UpdateUserDto } from '@/types/API';
import { 
  authenticateUser, 
  createUser, 
  findAllUsers, 
  findUserById, 
  removeUser, 
  updateUser 
} from '@/services/user.service';

// Validation schemas
const createUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(6),
  spriteUrl: z.string().url().optional(),
});

const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  spriteUrl: z.string().url().optional(),
  pokedollars: z.number().min(0).optional(),
});

// Helper function to handle errors
const handleError = (error: unknown, errorMessage: string, statusCode: number = 500) => {
  // Since the error can be of any type, we check if it is an instance of Error
  if (error instanceof Error) {
    console.error(errorMessage, error);
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        message: error.message,
      },
      { status: statusCode }
    );
  }

  // If the error is not an instance of Error, log it as is
  console.error(errorMessage, error);
  return NextResponse.json(
    {
      success: false,
      error: errorMessage,
      message: 'Unknown error',
    },
    { status: statusCode }
  );
};

// Get all users with pagination
export const getAll = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const orderBy = searchParams.get('orderBy') || undefined;
    const order = searchParams.get('order') as 'asc' | 'desc' || 'asc';

    const result = await findAllUsers({
      page,
      limit,
      orderBy,
      order,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    return handleError(error, 'Error fetching users');
  }
};

// Get user by ID
export const getById = async (request: NextRequest, id: string) => {
  try {
    const user = await findUserById(id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return handleError(error, 'Error fetching user');
  }
};

// Create a new user
export const create = async (request: NextRequest) => {
  try {
    const body = await request.json();

    // Validate request body
    const validation = createUserSchema.safeParse(body);
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

    const user = await createUser(validation.data as CreateUserDto);

    return NextResponse.json(
      {
        success: true,
        data: user,
        message: 'User created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, 'Error creating user');
  }
};

// Update user by ID
export const update = async (request: NextRequest, id: string) => {
  try {
    const body = await request.json();

    // Validate request body
    const validation = updateUserSchema.safeParse(body);
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

    const user = await updateUser(id, validation.data as UpdateUserDto);

    return NextResponse.json({
      success: true,
      data: user,
      message: 'User updated successfully',
    });
  } catch (error) {
    return handleError(error, 'Error updating user');
  }
};

// Delete user by ID
export const remove = async (request: NextRequest, id: string) => {
  try {
    await removeUser(id);

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    return handleError(error, 'Error deleting user');
  }
};

// Authenticate user
export const login = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email and password are required',
        },
        { status: 400 }
      );
    }

    const user = await authenticateUser(email, password);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid credentials',
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
      message: 'Login successful',
    });
  } catch (error) {
    return handleError(error, 'Login failed');
  }
};


// import { NextRequest, NextResponse } from 'next/server';
// import { z } from 'zod';
// import { UserService } from '../services/user.service';
// import { CreateUserDto, UpdateUserDto } from '@/types/API';

// // Validation schemas
// const createUserSchema = z.object({
//   name: z.string().min(1).max(100),
//   email: z.string().email(),
//   password: z.string().min(6),
//   spriteUrl: z.string().url().optional(),
// });

// const updateUserSchema = z.object({
//   name: z.string().min(1).max(100).optional(),
//   email: z.string().email().optional(),
//   password: z.string().min(6).optional(),
//   spriteUrl: z.string().url().optional(),
//   pokedollars: z.number().min(0).optional(),
// });

// export class UserController {
//   /**
//    * GET /api/users
//    * Get all users with pagination
//    */
//   static async getAll(request: NextRequest) {
//     try {
//       const { searchParams } = new URL(request.url);
//       const page = parseInt(searchParams.get('page') || '1');
//       const limit = parseInt(searchParams.get('limit') || '10');
//       const orderBy = searchParams.get('orderBy') || undefined;
//       const order = searchParams.get('order') as 'asc' | 'desc' || 'asc';

//       const result = await findAll({
//         page,
//         limit,
//         orderBy,
//         order,
//       });

//       return NextResponse.json({
//         success: true,
//         ...result,
//       });
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to fetch users',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }

//   /**
//    * GET /api/users/:id
//    * Get user by ID
//    */
//   static async getById(request: NextRequest, id: string) {
//     try {
//       const user = await findById(id);
      
//       if (!user) {
//         return NextResponse.json(
//           {
//             success: false,
//             error: 'User not found',
//           },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json({
//         success: true,
//         data: user,
//       });
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to fetch user',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }

//   /**
//    * POST /api/users
//    * Create a new user
//    */
//   static async create(request: NextRequest) {
//     try {
//       const body = await request.json();
      
//       // Validate request body
//       const validation = createUserSchema.safeParse(body);
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

//       const user = await create(validation.data as CreateUserDto);

//       return NextResponse.json(
//         {
//           success: true,
//           data: user,
//           message: 'User created successfully',
//         },
//         { status: 201 }
//       );
//     } catch (error) {
//       console.error('Error creating user:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to create user',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }

//   /**
//    * PATCH /api/users/:id
//    * Update user by ID
//    */
//   static async update(request: NextRequest, id: string) {
//     try {
//       const body = await request.json();
      
//       // Validate request body
//       const validation = updateUserSchema.safeParse(body);
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

//       const user = await update(id, validation.data as UpdateUserDto);

//       return NextResponse.json({
//         success: true,
//         data: user,
//         message: 'User updated successfully',
//       });
//     } catch (error) {
//       console.error('Error updating user:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to update user',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }

//   /**
//    * DELETE /api/users/:id
//    * Delete user by ID
//    */
//   static async delete(request: NextRequest, id: string) {
//     try {
//       await delete(id);

//       return NextResponse.json({
//         success: true,
//         message: 'User deleted successfully',
//       });
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to delete user',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }

//   /**
//    * POST /api/users/login
//    * Authenticate user
//    */
//   static async login(request: NextRequest) {
//     try {
//       const body = await request.json();
//       const { email, password } = body;

//       if (!email || !password) {
//         return NextResponse.json(
//           {
//             success: false,
//             error: 'Email and password are required',
//           },
//           { status: 400 }
//         );
//       }

//       const user = await authenticate(email, password);

//       if (!user) {
//         return NextResponse.json(
//           {
//             success: false,
//             error: 'Invalid credentials',
//           },
//           { status: 401 }
//         );
//       }

//       return NextResponse.json({
//         success: true,
//         data: user,
//         message: 'Login successful',
//       });
//     } catch (error) {
//       console.error('Error during login:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Login failed',
//           message: error instanceof Error ? error.message : 'Unknown error',
//         },
//         { status: 500 }
//       );
//     }
//   }
// }