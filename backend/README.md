# SkillSwap Backend

RESTful API backend for the SkillSwap peer-to-peer skill exchange platform.

## Features

- Skills management (CRUD operations)
- User profiles (basic implementation)
- Category-based filtering
- Skill type filtering (offer/request)
- Search functionality
- Error handling
- CORS support

## Tech Stack

- **Node.js** with Express.js
- **TypeScript** for type safety
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **dotenv** for environment variables

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The server will start on `http://localhost:3001`

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## API Endpoints

### Skills

- `GET /api/skills` - Get all skills with optional filters
- `GET /api/skills/:id` - Get skill by ID
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Query Parameters (GET /api/skills)

- `category` - Filter by category
- `type` - Filter by type (offer or request)
- `userId` - Filter by user ID
- `search` - Search in title, description, and tags

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Health Check

- `GET /api/health` - API health status

## Example Requests

### Create a Skill

```bash
curl -X POST http://localhost:3001/api/skills \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn React",
    "category": "Technology",
    "description": "I can teach you React fundamentals",
    "type": "offer",
    "tags": ["react", "javascript"]
  }'
```

### Get Skills by Category

```bash
curl http://localhost:3001/api/skills?category=Technology&type=offer
```

### Search Skills

```bash
curl "http://localhost:3001/api/skills?search=react"
```

## Future Enhancements

- [ ] PostgreSQL/MongoDB database integration
- [ ] JWT authentication
- [ ] User registration and login
- [ ] Reviews and ratings
- [ ] Messaging system
- [ ] Booking/scheduling
- [ ] Payment processing
- [ ] Admin dashboard
- [ ] Rate limiting
- [ ] Input validation middleware

## Environment Variables

Copy `.env.example` to `.env` and update with your settings:

```
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Error Handling

The API returns errors in the following format:

```json
{
  "error": {
    "message": "Error description"
  }
}
```

HTTP status codes are used appropriately:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Project Structure

```
backend/
├── src/
│   ├── server.ts          # Main server file
│   ├── types/
│   │   └── index.ts       # TypeScript interfaces
│   ├── routes/
│   │   ├── skills.ts      # Skills endpoints
│   │   └── users.ts       # User endpoints
│   └── middleware/
│       └── errorHandler.ts # Error handling
├── package.json
├── tsconfig.json
├── .env
└── .env.example
```

## License

MIT