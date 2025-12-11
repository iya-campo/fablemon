import { NextRequest, NextResponse } from 'next/server';
import { getById, remove, update } from '@/controllers/user.controller';

// GET /api/users/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const result = await getById(req, params.id);
  return NextResponse.json(result);
}

// PATCH /api/users/[id]
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const result = await update(req, params.id);
  return NextResponse.json(result);
}

// DELETE /api/users/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const result = await remove(req, params.id);
  return NextResponse.json(result);
}

// import { NextRequest } from 'next/server';
// import { UserController } from '../../../../controllers/user.controller';

// // GET /api/users/[id]
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   return UserController.getById(request, params.id);
// }

// // PATCH /api/users/[id]
// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   return UserController.update(request, params.id);
// }

// // DELETE /api/users/[id]
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   return UserController.delete(request, params.id);
// }