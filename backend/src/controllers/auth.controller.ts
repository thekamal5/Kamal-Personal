import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { UserRole } from '../types';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthController {
    /**
     * Register a new user (Usually restricted to Super Admin in this context)
     */
    static async register(req: Request, res: Response) {
        try {
            const { email, password, name, role } = req.body;

            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) return res.status(400).json({ message: 'User already exists' });

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    role: (role as UserRole) || UserRole.CONTRIBUTOR,
                },
            });

            const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

            res.status(201).json({ user: { id: user.id, email: user.email, role: user.role }, token });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Login user
     */
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return res.status(401).json({ message: 'Invalid credentials' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

            res.json({
                user: { id: user.id, email: user.email, name: user.name, role: user.role },
                token
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Get current user info from token
     */
    static async me(req: any, res: Response) {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true, name: true, role: true, avatar: true },
        });
        res.json(user);
    }
}
