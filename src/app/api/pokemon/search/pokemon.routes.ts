import { NextRequest, NextResponse } from 'next/server';
import { search } from '../../../../controllers/pokemon.controller';

// GET /api/pokemon/search
export async function GET(req: NextRequest) {
  const result = await search(req);
  return NextResponse.json(result);
}

// import { NextRequest } from 'next/server';
// import { PokemonController } from '../../../../controllers/pokemon.controller';

// // GET /api/pokemon/search
// export async function GET(request: NextRequest) {
//   return PokemonController.search(request);
// }