import { NextRequest, NextResponse } from 'next/server';
import { getStoredByUserId } from '@/controllers/pokemon.controller';

// GET /api/pokemon/stored/[userId]
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const result = await getStoredByUserId(req, params.userId);
  return NextResponse.json(result);
}

// import { NextRequest, NextResponse } from 'next/server';
// import { PokemonController } from '../../../../../controllers/pokemon.controller';

// // GET /api/pokemon/stored/[userId]
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { userId: string } }
// ) {
//   const result = await PokemonController.getStoredByUserId(request, params.userId);

//   return NextResponse.json(result);
// }