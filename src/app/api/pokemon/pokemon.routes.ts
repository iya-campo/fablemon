import { NextRequest, NextResponse } from 'next/server';
import { create, getAll } from '@/controllers/user.controller';

// GET /api/pokemon
export async function GET(req: NextRequest) {
  const result = await getAll(req);
  return NextResponse.json(result);
}

// POST /api/pokemon
export async function POST(req: NextRequest) {
  const result = await create(req);
  return NextResponse.json(result);
}

// import { NextRequest } from 'next/server';
// import { PokemonController } from '../../../controllers/pokemon.controller';

// // GET /api/pokemon
// export async function GET(request: NextRequest) {
//   return PokemonController.getAll(request);
// }

// // POST /api/pokemon
// export async function POST(request: NextRequest) {
//   return PokemonController.create(request);
// }