// app/seed/seed.ts

import { Type, Gender, Pokeball } from '@prisma/client';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const createMoves = async () => {
  const moveData = [
    { name: 'Tackle', type: Type.NORMAL, power: 40, accuracy: 100, pp: 35 },
    { name: 'Ember', type: Type.FIRE, power: 40, accuracy: 100, pp: 25 },
    { name: 'Water Gun', type: Type.WATER, power: 40, accuracy: 100, pp: 25 },
    { name: 'Vine Whip', type: Type.GRASS, power: 45, accuracy: 100, pp: 25 },
    { name: 'Thunder Shock', type: Type.ELECTRIC, power: 40, accuracy: 100, pp: 30 },
    { name: 'Psychic', type: Type.PSYCHIC, power: 90, accuracy: 100, pp: 10 },
  ];

  return Promise.all(
    moveData.map((move) =>
      prisma.move.upsert({
        where: { name: move.name },
        update: {},
        create: move,
      })
    )
  );
}

const createItems = async () => {
  const items = ['Potion', 'Super Potion', 'Pokeball', 'Great Ball'];
  return Promise.all(
    items.map((item) =>
      prisma.inventoryItem.upsert({
        where: { name: item },
        update: {},
        create: { name: item },
      })
    )
  );
}

async function createUser(items: any[]) {
  const hashedPassword = await bcrypt.hash('password123', 10);

  return prisma.user.upsert({
    where: { email: 'ash@pokemon.com' },
    update: {},
    create: {
      id: 'user_1',
      name: 'Ash Ketchum',
      email: 'ash@pokemon.com',
      password: hashedPassword,
      pokedollars: 5000,
      spriteUrl: 'https://example.com/ash-sprite.png',
      inventoryItems: {
        create: [
          { inventoryItemId: items[0].id, quantity: 5 },
          { inventoryItemId: items[2].id, quantity: 10 },
        ],
      },
    },
  });
}

const createPokemon = async (userId: string, moves: any[]) => {
  const pokemonData = [
    {
      name: 'Pikachu',
      hp: 35,
      gender: Gender.MALE,
      level: 25,
      pokeball: Pokeball.POKEBALL,
      ability: 'Static',
      friendship: 100,
      experience: 15625,
      position: 1,
      isInParty: true,
      attack: 55,
      defense: 40,
      specialAttack: 50,
      specialDefense: 50,
      speed: 90,
      moves: [moves[0], moves[4]], // Tackle, Thunder Shock
    },
    {
      name: 'Charizard',
      hp: 78,
      gender: Gender.MALE,
      level: 36,
      pokeball: Pokeball.ULTRABALL,
      ability: 'Blaze',
      friendship: 80,
      experience: 46656,
      position: 2,
      isInParty: true,
      attack: 84,
      defense: 78,
      specialAttack: 109,
      specialDefense: 85,
      speed: 100,
      moves: [moves[0], moves[1]], // Tackle, Ember
    },
    {
      name: 'Bulbasaur',
      hp: 45,
      gender: Gender.MALE,
      level: 10,
      pokeball: Pokeball.POKEBALL,
      ability: 'Overgrow',
      friendship: 70,
      experience: 1000,
      position: null,
      isInParty: false,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
      moves: [moves[0], moves[3]], // Tackle, Vine Whip
    },
  ];

  return Promise.all(
    pokemonData.map((data) =>
      prisma.pokemon.create({
        data: {
          ...data,
          userId,
          types: {
            create: data.name === 'Pikachu'
              ? [{ type: Type.ELECTRIC }]
              : data.name === 'Charizard'
              ? [{ type: Type.FIRE }, { type: Type.FLYING }]
              : [{ type: Type.GRASS }, { type: Type.POISON }],
          },
          moves: {
            create: data.moves.map((move) => ({ moveId: move.id })),
          },
        },
      })
    )
  );
}

const seed = async () => {
  console.log('Starting seed...');

  try {
    // Create moves
    const moves = await createMoves();

    // Create inventory items
    const items = await createItems();

    // Create a sample user
    const user = await createUser(items);

    // Create sample Pokemon for the user
    await createPokemon(user.id, moves);

    console.log('Seed completed successfully!');
    console.log({
      user: { id: user.id, email: user.email },
      moves: moves.length,
      items: items.length,
    });
  } catch (error) {
    console.error('Error occurred during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();


// import { Type, Gender, Pokeball } from '@prisma/client';
// import prisma from '@/lib/prisma';
// import bcrypt from 'bcryptjs';

// async function main() {
//   console.log('Starting seed...');

//   // Create sample moves
//   const moves = await Promise.all([
//     prisma.move.upsert({
//       where: { name: 'Tackle' },
//       update: {},
//       create: {
//         name: 'Tackle',
//         type: Type.NORMAL,
//         power: 40,
//         accuracy: 100,
//         pp: 35,
//       },
//     }),
//     prisma.move.upsert({
//       where: { name: 'Ember' },
//       update: {},
//       create: {
//         name: 'Ember',
//         type: Type.FIRE,
//         power: 40,
//         accuracy: 100,
//         pp: 25,
//       },
//     }),
//     prisma.move.upsert({
//       where: { name: 'Water Gun' },
//       update: {},
//       create: {
//         name: 'Water Gun',
//         type: Type.WATER,
//         power: 40,
//         accuracy: 100,
//         pp: 25,
//       },
//     }),
//     prisma.move.upsert({
//       where: { name: 'Vine Whip' },
//       update: {},
//       create: {
//         name: 'Vine Whip',
//         type: Type.GRASS,
//         power: 45,
//         accuracy: 100,
//         pp: 25,
//       },
//     }),
//     prisma.move.upsert({
//       where: { name: 'Thunder Shock' },
//       update: {},
//       create: {
//         name: 'Thunder Shock',
//         type: Type.ELECTRIC,
//         power: 40,
//         accuracy: 100,
//         pp: 30,
//       },
//     }),
//     prisma.move.upsert({
//       where: { name: 'Psychic' },
//       update: {},
//       create: {
//         name: 'Psychic',
//         type: Type.PSYCHIC,
//         power: 90,
//         accuracy: 100,
//         pp: 10,
//       },
//     }),
//   ]);

//   // Create sample inventory items
//   const items = await Promise.all([
//     prisma.inventoryItem.upsert({
//       where: { name: 'Potion' },
//       update: {},
//       create: { name: 'Potion' },
//     }),
//     prisma.inventoryItem.upsert({
//       where: { name: 'Super Potion' },
//       update: {},
//       create: { name: 'Super Potion' },
//     }),
//     prisma.inventoryItem.upsert({
//       where: { name: 'Pokeball' },
//       update: {},
//       create: { name: 'Pokeball' },
//     }),
//     prisma.inventoryItem.upsert({
//       where: { name: 'Great Ball' },
//       update: {},
//       create: { name: 'Great Ball' },
//     }),
//   ]);

//   // Create a sample user
//   const hashedPassword = await bcrypt.hash('password123', 10);
//   const user = await prisma.user.upsert({
//     where: { email: 'ash@pokemon.com' },
//     update: {},
//     create: {
//       id: 'user_1',
//       name: 'Ash Ketchum',
//       email: 'ash@pokemon.com',
//       password: hashedPassword,
//       pokedollars: 5000,
//       spriteUrl: 'https://example.com/ash-sprite.png',
//       inventoryItems: {
//         create: [
//           { inventoryItemId: items[0].id, quantity: 5 },
//           { inventoryItemId: items[2].id, quantity: 10 },
//         ],
//       },
//     },
//   });

//   // Create sample Pokemon for the user
//   const pikachu = await prisma.pokemon.create({
//     data: {
//       name: 'Pikachu',
//       hp: 35,
//       gender: Gender.MALE,
//       level: 25,
//       pokeball: Pokeball.POKEBALL,
//       ability: 'Static',
//       friendship: 100,
//       experience: 15625,
//       position: 1,
//       isInParty: true,
//       attack: 55,
//       defense: 40,
//       specialAttack: 50,
//       specialDefense: 50,
//       speed: 90,
//       userId: user.id,
//       types: {
//         create: [{ type: Type.ELECTRIC }],
//       },
//       moves: {
//         create: [
//           { moveId: moves[0].id }, // Tackle
//           { moveId: moves[4].id }, // Thunder Shock
//         ],
//       },
//     },
//   });

//   const charizard = await prisma.pokemon.create({
//     data: {
//       name: 'Charizard',
//       hp: 78,
//       gender: Gender.MALE,
//       level: 36,
//       pokeball: Pokeball.ULTRABALL,
//       ability: 'Blaze',
//       friendship: 80,
//       experience: 46656,
//       position: 2,
//       isInParty: true,
//       attack: 84,
//       defense: 78,
//       specialAttack: 109,
//       specialDefense: 85,
//       speed: 100,
//       userId: user.id,
//       types: {
//         create: [
//           { type: Type.FIRE },
//           { type: Type.FLYING },
//         ],
//       },
//       moves: {
//         create: [
//           { moveId: moves[0].id }, // Tackle
//           { moveId: moves[1].id }, // Ember
//         ],
//       },
//     },
//   });

//   const bulbasaur = await prisma.pokemon.create({
//     data: {
//       name: 'Bulbasaur',
//       hp: 45,
//       gender: Gender.MALE,
//       level: 10,
//       pokeball: Pokeball.POKEBALL,
//       ability: 'Overgrow',
//       friendship: 70,
//       experience: 1000,
//       position: null,
//       isInParty: false,
//       attack: 49,
//       defense: 49,
//       specialAttack: 65,
//       specialDefense: 65,
//       speed: 45,
//       userId: user.id,
//       types: {
//         create: [
//           { type: Type.GRASS },
//           { type: Type.POISON },
//         ],
//       },
//       moves: {
//         create: [
//           { moveId: moves[0].id }, // Tackle
//           { moveId: moves[3].id }, // Vine Whip
//         ],
//       },
//     },
//   });

//   console.log('Seed completed successfully!');
//   console.log({
//     user: { id: user.id, email: user.email },
//     pokemon: [pikachu.name, charizard.name, bulbasaur.name],
//     moves: moves.length,
//     items: items.length,
//   });
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });