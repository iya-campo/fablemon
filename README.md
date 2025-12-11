# **Fablemon** 🐾✨  
*A web-based monster-collector adventure inspired by classic creature-training games.*

Fablemon is an online monster-collecting game where you explore vibrant habitats, encounter fantastical creatures, and build a loyal team to battle other trainers. Using data from the public PokeAPI, the game brings familiar monsters to life in a fresh, browser-based experience. Capture your favorites, train them, and rise as a formidable Fablemon trainer as you earn rewards, level up, and grow your party into a true force of nature. 🌱⚔️

---

## **✨ Features**

### **🌍 Explore & Discover**  
Venture into diverse environments—forests, caves, oceans, meadows, and more—each home to its own selection of wild creatures. Every expedition offers a chance to encounter something new as habitats spawn different monster types and rarities. A single click sends you exploring, and from there, anything can happen.

### **⚔️ Dynamic Encounters & Battles**  
When you cross paths with a wild creature, your leading party member jumps straight into action. Battles are turn-based and strategic: choose moves, use items, switch teammates, or attempt an escape. Monsters can use up to four moves with limited PP that may inflict damage, boost stats, or apply status conditions. Winning battles earns experience, while capturing creatures adds new companions to your journey.

### **🎒 Build Your Party & Manage Your PC**  
Your party can hold up to six monsters, so thoughtful team composition matters. Reorder your team, use items, and send creatures to or from PC storage. Everything you catch is stored safely until you choose who accompanies you. You can even release monsters back into the wild if needed.

### **📘 Your Personal Pokédex**  
Browse a complete list of monsters, view detailed stats, look up types, and search or filter for specific entries. Mark your favorites for quick access—perfect for collectors striving toward full completion.

### **🛒 Shop, Heal, and Raise Affection**  
Visit in-game shops to buy or sell items, prepare for battles, and manage your cash. The Poke Center heals your team to full health and restores their moves, complete with a nostalgic healing jingle. The Daycare lets you feed and play with your monsters—raising affection and improving stats over time. 🧡

### **🏆 Battle Frontier Challenges**  
Test your strength against rotating trainers who refresh every 10 minutes. Each round presents three opponents with difficulty that scales to your progress. Winning grants rewards and experience, while forfeiting yields nothing. Trainers use non-legendary monsters and feature randomized sprites and party sizes.

---

## **🛠️ Tech Stack**  
Fablemon is built using a modern full-stack setup designed for scalability and smooth development:

- **Frontend:** Next.js + TypeScript  
- **Backend:** Express.js + TypeScript  
- **Database:** PostgreSQL  
- **ORM:** Prisma  
- **Styling:** Material UI  
- **State Management:** Context API or Redux  
- **Public Data Source:** PokeAPI (https://pokeapi.co) 🌐

---

## **🚧 Development Progress**  
Fablemon is an active work-in-progress. Core systems—such as backend structure, user progression, encounters, battles, party management, inventory, and shop mechanics—are in development. Key features like the Pokédex, Wilderness exploration, Poke Mart, Daycare, and Battle Frontier are planned and currently being built. ✨

---

# Pokemon CRUD Application

A full-stack Pokemon-inspired application built with Next.js, TypeScript, Prisma, and Supabase.

## Features

- **User Management**: Complete CRUD operations for users with Supabase authentication
- **Pokemon Management**: Create, read, update, and delete Pokemon with full type safety
- **Party System**: Manage party Pokemon (max 6) and stored Pokemon
- **Type Safety**: Full TypeScript support with Prisma-generated types
- **Authentication**: Secure authentication using Supabase Auth
- **Clean Architecture**: Separated controllers, services, and routes for maintainability

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Validation**: Zod
- **Password Hashing**: bcryptjs

## Project Structure

```
fablemon/
├── prisma/
│   ├── schema.prisma        # Database schema definition
│   └── seed.ts              # Database seeding script
├── src/
│   ├── app/
│   │   └── api/            # API routes
│   │       ├── users/       # User endpoints
│   │       └── pokemon/     # Pokemon endpoints
│   ├── controllers/         # Request handlers
│   │   ├── user.controller.ts
│   │   └── pokemon.controller.ts
│   ├── services/            # Business logic
│   │   ├── user.service.ts
│   │   └── pokemon.service.ts
│   ├── lib/                 # Configuration
│   │   ├── db/
│   │   │   └── prisma.ts   # Prisma client
│   │   └── supabase/
│   │       └── client.ts   # Supabase client
│   ├── middleware/          # Middleware functions
│   │   └── auth.ts         # Authentication middleware
│   └── types/              # TypeScript types
│       └── index.ts        # Type definitions
├── .env.example            # Environment variables template
└── package.json            # Dependencies and scripts
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd pokemon-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: Your Supabase PostgreSQL connection string
- `DIRECT_URL`: Direct database URL for migrations
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### 4. Set up the database

Generate Prisma client:
```bash
npm run prisma:generate
```

Push schema to database:
```bash
npm run prisma:push
```

Or run migrations:
```bash
npm run prisma:migrate
```

Seed the database (optional):
```bash
npm run prisma:seed
```

### 5. Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### User Endpoints

- `GET /api/users` - Get all users (with pagination)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/login` - User login

### Pokemon Endpoints

- `GET /api/pokemon` - Get all Pokemon (with pagination)
- `GET /api/pokemon/:id` - Get Pokemon by ID
- `POST /api/pokemon` - Create new Pokemon
- `PATCH /api/pokemon/:id` - Update Pokemon
- `DELETE /api/pokemon/:id` - Delete Pokemon
- `GET /api/pokemon/user/:userId` - Get all Pokemon for a user
- `GET /api/pokemon/party/:userId` - Get party Pokemon for a user
- `GET /api/pokemon/stored/:userId` - Get stored Pokemon for a user
- `POST /api/pokemon/:id/toggle-party` - Toggle Pokemon party status
- `GET /api/pokemon/search?q=query` - Search Pokemon by name or type

## API Usage Examples

### Create a new user

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Misty",
    "email": "misty@pokemon.com",
    "password": "password123"
  }'
```

### Create a new Pokemon

```bash
curl -X POST http://localhost:3000/api/pokemon \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Squirtle",
    "hp": 44,
    "type": ["WATER"],
    "gender": "MALE",
    "level": 5,
    "pokeball": "POKEBALL",
    "ability": "Torrent",
    "moves": [1, 3],
    "stats": {
      "attack": 48,
      "defense": 65,
      "specialAttack": 50,
      "specialDefense": 64,
      "speed": 43
    },
    "userId": "user_id"
  }'
```

### Get user's party Pokemon

```bash
curl http://localhost:3000/api/pokemon/party/USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Database Schema

The application uses the following main entities:

- **User**: Stores user information and authentication details
- **Pokemon**: Stores Pokemon data with stats, types, and moves
- **Move**: Defines available moves
- **InventoryItem**: Defines available items
- **Evolution**: Tracks Pokemon evolution paths

Relationships:
- Users can have multiple Pokemon
- Pokemon can have 1-2 types and 1-4 moves
- Pokemon can be in party (max 6) or stored
- Users can have inventory items with quantities

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Prisma commands
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run migrations
npm run prisma:push       # Push schema to database
npm run prisma:studio     # Open Prisma Studio
npm run prisma:seed       # Seed the database

# Reset database (caution: deletes all data)
npm run db:reset
```

## Security Features

- Password hashing with bcrypt
- JWT token validation via Supabase
- Input validation with Zod schemas
- SQL injection protection via Prisma
- Type safety with TypeScript

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error information"
}
```

Successful responses:

```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@pokemonapp.com or open an issue in the GitHub repository.