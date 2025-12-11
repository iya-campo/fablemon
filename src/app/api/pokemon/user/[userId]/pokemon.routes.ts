import { NextRequest, NextResponse } from 'next/server';
import { getPartyByUserId } from '@/controllers/pokemon.controller';

// GET /api/pokemon/party/[userId]
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const result = await getPartyByUserId(req, params.userId);
  return NextResponse.json(result);
}

// import { NextRequest } from 'next/server';
// import { PokemonController } from '../../../../../controllers/pokemon.controller';

// // GET /api/pokemon/party/[userId]
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { userId: string } }
// ) {
//   return PokemonController.getPartyByUserId(request, params.userId);
// }