import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserRole } from '../types';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export class UserController {
    /**
     * List all users (Admin only)
     */
    static async listUsers(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    avatar: true,
                    createdAt: true,
                },
                orderBy: { createdAt: 'desc' },
            });
            res.json(users);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Update a user's role or status
     */
    static async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { role, name, email } = req.body;

            const user = await prisma.user.update({
                where: { id: id as string },
                data: {
                    role: role as UserRole,
                    name,
                    email
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true
                }
            });

            res.json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Delete a user
     */
    static async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await prisma.user.delete({ where: { id: id as string } });
            res.status(204).end();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
