import { PrismaClient, Post, Slot } from '@prisma/client';
import { PostStatus } from '../types';

const prisma = new PrismaClient();

export class SlotService {
    /**
     * Resolves content for a section based on its slots.
     * Handles manual overrides and automated rule-based placement.
     */
    static async resolveSection(sectionId: string) {
        const slots = await prisma.slot.findMany({
            where: { sectionId },
            orderBy: { order: 'asc' },
            include: {
                overridePost: true,
                targetCategory: true,
            },
        });

        const resolvedSlots = await Promise.all(slots.map(async (slot) => {
            // 1. Check for manual override
            if (slot.overridePostId) {
                const post = await prisma.post.findUnique({
                    where: { id: slot.overridePostId },
                });

                if (post && post.status === PostStatus.PUBLISHED) {
                    // Check for expiration
                    if (!post.expiresAt || post.expiresAt > new Date()) {
                        return {
                            slotId: slot.id,
                            content: post,
                            isOverride: true,
                        };
                    }
                }
            }

            // 2. Automated Rule-Based Placement
            if (slot.rules) {
                const rules = slot.rules as any;
                const query: any = {
                    where: {
                        status: PostStatus.PUBLISHED,
                        publishDate: { lte: new Date() },
                        expiresAt: {
                            OR: [
                                { equals: null },
                                { gt: new Date() },
                            ]
                        }
                    },
                    orderBy: { [rules.sortBy || 'publishDate']: rules.order || 'desc' },
                    take: 1,
                };

                if (slot.targetCategoryId) {
                    query.where.categoryId = slot.targetCategoryId;
                }

                if (rules.type) {
                    query.where.type = rules.type;
                }

                if (rules.isHeadline) query.where.isHeadline = true;
                if (rules.isBanner) query.where.isBanner = true;
                if (rules.isFeatured) query.where.isFeatured = true;

                const dynamicPost = await prisma.post.findFirst(query);

                return {
                    slotId: slot.id,
                    content: dynamicPost,
                    isOverride: false,
                };
            }

            return {
                slotId: slot.id,
                content: null,
            };
        }));

        return resolvedSlots;
    }

    /**
     * Resolves all sections for a given page by name.
     */
    static async resolvePageSections(pageName: string) {
        const page = await prisma.page.findUnique({
            where: { name: pageName },
            include: {
                sections: {
                    orderBy: { order: 'asc' },
                }
            }
        });

        if (!page) return [];

        const resolvedSections = await Promise.all(page.sections.map(async (section) => {
            const slots = await this.resolveSection(section.id);
            return {
                id: section.id,
                name: section.name,
                slots
            };
        }));

        return resolvedSections;
    }
}
