import { NextRequest, NextResponse } from 'next/server';
import { create, getAll } from '@/controllers/user.controller';

// GET /api/users
export async function GET(req: NextRequest) {
  const result = await getAll(req);
  return NextResponse.json(result);
}

// POST /api/users
export async function POST(req: NextRequest) {
  const result = await create(req);
  return NextResponse.json(result);
}

// import { NextRequest } from 'next/server';
// import { UserController } from '../../../controllers/user.controller';

// // GET /api/users
// export async function GET(request: NextRequest) {
//   return UserController.getAll(request);
// }

// // POST /api/users
// export async function POST(request: NextRequest) {
//   return UserController.create(request);
// }