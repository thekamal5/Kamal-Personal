import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PostType, PostStatus } from '../types';

const prisma = new PrismaClient();

export class PostController {
    /**
     * List posts with optional filters.
     */
    static async listPosts(req: Request, res: Response) {
        const { type, categoryId, tagId, status } = req.query;

        const posts = await prisma.post.findMany({
            where: {
                type: type as PostType,
                categoryId: categoryId as string,
                tags: tagId ? { some: { id: tagId as string } } : undefined,
                status: (status as PostStatus) || PostStatus.PUBLISHED,
            },
            include: {
                category: true,
                tags: true,
                author: { select: { id: true, name: true, avatar: true } },
            },
            orderBy: { publishDate: 'desc' },
        });

        res.json(posts);
    }

    /**
     * Get post by slug.
     */
    static async getPostBySlug(req: Request, res: Response) {
        const { slug } = req.params;

        const post = await prisma.post.findUnique({
            where: { slug: slug as string },
            include: {
                category: true,
                tags: true,
                author: { select: { id: true, name: true, avatar: true } },
            },
        });

        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    }

    /**
     * Create a new post.
     */
    static async createPost(req: Request, res: Response) {
        try {
            const post = await prisma.post.create({
                data: {
                    ...req.body,
                    slug: req.body.headline.toLowerCase().replace(/ /g, '-').slice(0, 100),
                    authorId: req.body.authorId, // Ensure this comes from a verified source in real app
                },
            });
            res.status(201).json(post);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Delete post.
     */
    static async deletePost(req: Request, res: Response) {
        const { id } = req.params;
        await prisma.post.delete({ where: { id: id as string } });
        res.status(204).end();
    }
}
