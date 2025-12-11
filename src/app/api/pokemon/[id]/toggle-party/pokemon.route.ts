import { NextRequest, NextResponse } from 'next/server';
import { toggleStatus } from '@/controllers/pokemon.controller';

// POST /api/pokemon/[id]/toggle-party
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const result = await toggleStatus(req, parseInt(params.id));
  return NextResponse.json(result);
}

// import { NextRequest } from 'next/server';
// import { PokemonController } from '../../../../../controllers/pokemon.controller';

// // POST /api/pokemon/[id]/toggle-party
// export async function POST(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   return PokemonController.togglePartyStatus(request, parseInt(params.id));
// }