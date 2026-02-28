import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { AuthController } from '../controllers/auth.controller';
import { UserController } from '../controllers/user.controller';
import { SlotService } from '../services/slot.service';
import { EditorialWorkflowService } from '../services/editorial.service';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../types';

const router = Router();

// Auth Routes
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.get('/auth/me', authenticate, AuthController.me);

// Post Routes (Public)
router.get('/posts', PostController.listPosts);
router.get('/posts/:slug', PostController.getPostBySlug);

// Categories
router.get('/categories', async (req, res) => {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const categories = await prisma.category.findMany();
    res.json(categories);
});

// Post Management (Protected)
router.post('/posts', authenticate, authorize([UserRole.SUPER_ADMIN, UserRole.MANAGING_EDITOR, UserRole.JOURNALIST]), PostController.createPost);
router.delete('/posts/:id', authenticate, authorize([UserRole.SUPER_ADMIN, UserRole.MANAGING_EDITOR]), PostController.deletePost);

// Slot & Section Resolution (Homepage logic)
router.get('/sections/:pageName/resolve', async (req, res) => {
    const { pageName } = req.params;
    const resolved = await SlotService.resolvePageSections(pageName);
    res.json(resolved);
});

// Editorial Workflow (Protected)
router.patch('/posts/:id/status', authenticate, authorize([UserRole.SUPER_ADMIN, UserRole.MANAGING_EDITOR, UserRole.SECTION_EDITOR]), async (req: any, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;
    const updated = await EditorialWorkflowService.updateStatus(id, userId, status);
    res.json(updated);
});

// Revision & Rollback (Protected)
router.post('/posts/:id/revisions', authenticate, async (req: any, res) => {
    const { id } = req.params;
    const { content, comment } = req.body;
    const userId = req.user.id;
    const revision = await EditorialWorkflowService.createRevision(id, userId, content, comment);
    res.json(revision);
});

// User Management (Admin only)
router.get('/users', authenticate, authorize([UserRole.SUPER_ADMIN]), UserController.listUsers);
router.patch('/users/:id', authenticate, authorize([UserRole.SUPER_ADMIN]), UserController.updateUser);
router.delete('/users/:id', authenticate, authorize([UserRole.SUPER_ADMIN]), UserController.deleteUser);

export default router;
