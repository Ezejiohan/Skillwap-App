import { Router, Request, Response, NextFunction } from 'express';
import { Skill, CreateSkillRequest, UpdateSkillRequest } from '../types/index.js';
import { createError } from '../middleware/errorHandler.js';

const router = Router();

// In-memory storage for demo (replace with database)
let skills: Skill[] = [
  {
    id: '1',
    title: 'Learn React',
    category: 'Technology',
    description: 'I can teach you React fundamentals and advanced concepts.',
    type: 'offer',
    tags: ['react', 'javascript', 'frontend'],
    userId: '1',
    user: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'JD',
      bio: 'Full-stack developer',
      contact: 'john@email.com',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// GET /api/skills - Get all skills with optional filtering
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, type, search, userId } = req.query;

    let filteredSkills = [...skills];

    if (category) {
      filteredSkills = filteredSkills.filter(skill => skill.category === category);
    }

    if (type && (type === 'offer' || type === 'request')) {
      filteredSkills = filteredSkills.filter(skill => skill.type === type);
    }

    if (userId) {
      filteredSkills = filteredSkills.filter(skill => skill.userId === userId);
    }

    if (search) {
      const searchTerm = search.toString().toLowerCase();
      filteredSkills = filteredSkills.filter(skill =>
        skill.title.toLowerCase().includes(searchTerm) ||
        skill.description.toLowerCase().includes(searchTerm) ||
        skill.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    res.json(filteredSkills);
  } catch (error) {
    next(createError('Failed to fetch skills', 500));
  }
});

// GET /api/skills/:id - Get skill by ID
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const skill = skills.find(s => s.id === req.params.id);
    if (!skill) {
      return next(createError('Skill not found', 404));
    }
    res.json(skill);
  } catch (error) {
    next(createError('Failed to fetch skill', 500));
  }
});

// POST /api/skills - Create new skill
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, category, description, type, tags }: CreateSkillRequest = req.body;

    // Validation
    if (!title || !category || !description || !type) {
      return next(createError('Missing required fields', 400));
    }

    if (!['offer', 'request'].includes(type)) {
      return next(createError('Invalid skill type', 400));
    }

    const validCategories = [
      'Technology', 'Design', 'Music', 'Language', 'Business',
      'Fitness', 'Cooking', 'Art', 'Writing', 'Other'
    ];

    if (!validCategories.includes(category)) {
      return next(createError('Invalid category', 400));
    }

    // For demo, use a mock user
    const mockUser = {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      avatar: 'DU',
      bio: 'Demo user for SkillSwap',
      contact: 'demo@email.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newSkill: Skill = {
      id: Date.now().toString(),
      title,
      category,
      description,
      type,
      tags: tags || [],
      userId: mockUser.id,
      user: mockUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    skills.push(newSkill);
    res.status(201).json(newSkill);
  } catch (error) {
    next(createError('Failed to create skill', 500));
  }
});

// PUT /api/skills/:id - Update skill
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, category, description, type, tags }: UpdateSkillRequest = req.body;
    const skillIndex = skills.findIndex(s => s.id === req.params.id);

    if (skillIndex === -1) {
      return next(createError('Skill not found', 404));
    }

    const skill = skills[skillIndex];
    if (!skill) {
      return next(createError('Skill not found', 404));
    }

    // Update fields
    if (title !== undefined) skill.title = title;
    if (category !== undefined) skill.category = category;
    if (description !== undefined) skill.description = description;
    if (type !== undefined) skill.type = type;
    if (tags !== undefined) skill.tags = tags;

    skill.updatedAt = new Date().toISOString();

    res.json(skill);
  } catch (error) {
    next(createError('Failed to update skill', 500));
  }
});

// DELETE /api/skills/:id - Delete skill
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const skillIndex = skills.findIndex(s => s.id === req.params.id);

    if (skillIndex === -1) {
      return next(createError('Skill not found', 404));
    }

    skills.splice(skillIndex, 1);
    res.status(204).send();
  } catch (error) {
    next(createError('Failed to delete skill', 500));
  }
});

export { router as skillsRouter };