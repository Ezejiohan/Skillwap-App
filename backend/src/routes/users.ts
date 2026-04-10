import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../types/index.js';
import { createError } from '../middleware/errorHandler.js';

const router = Router();

// Mock users storage
const users: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    avatar: 'DU',
    bio: 'Demo user for SkillSwap',
    contact: 'demo@email.com',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// GET /api/users - Get all users (basic implementation)
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(users);
  } catch (error) {
    next(createError('Failed to fetch users', 500));
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
      return next(createError('User not found', 404));
    }
    res.json(user);
  } catch (error) {
    next(createError('Failed to fetch user', 500));
  }
});

export { router as usersRouter };