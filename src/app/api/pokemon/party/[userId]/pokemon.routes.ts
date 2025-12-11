import { NextRequest, NextResponse } from 'next/server';
import { getByUserId } from '@/controllers/pokemon.controller';

// GET /api/pokemon/user/[userId]
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const result = await getByUserId(req, params.userId);
  return NextResponse.json(result);
}

// import { NextRequest } from 'next/server';
// import { PokemonController } from '../../../../../controllers/pokemon.controller';

// // GET /api/pokemon/user/[userId]
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { userId: string } }
// ) {
//   return PokemonController.getByUserId(request, params.userId);
// }