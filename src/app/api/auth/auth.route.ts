import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/controllers/user.controller';

// POST /api/users/login
export async function POST(req: NextRequest) {
  const result = await login(req);
  return NextResponse.json(result);
}

// import { NextRequest } from 'next/server';
// import { UserController } from '../../../controllers/user.controller';

// // POST /api/users/login
// export async function POST(request: NextRequest) {
//   return UserController.login(request);
// }