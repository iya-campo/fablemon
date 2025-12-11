import { NextRequest, NextResponse } from 'next/server';
import { getById, remove, update } from '../../../../controllers/pokemon.controller';

// GET /api/pokemon/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const result = await getById(req, parseInt(params.id));
  return NextResponse.json(result);
}

// PATCH /api/pokemon/[id]
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const result = await update(req, parseInt(params.id));
  return NextResponse.json(result);
}

// DELETE /api/pokemon/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return remove(req, parseInt(params.id));
}

// import { NextRequest } from 'next/server';
// import { PokemonController } from '../../../../controllers/pokemon.controller';

// // GET /api/pokemon/[id]
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   return PokemonController.getById(request, parseInt(params.id));
// }

// // PATCH /api/pokemon/[id]
// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   return PokemonController.update(request, parseInt(params.id));
// }

// // DELETE /api/pokemon/[id]
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   return PokemonController.delete(request, parseInt(params.id));
// }