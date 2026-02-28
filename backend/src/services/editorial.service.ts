import { PrismaClient, Post } from '@prisma/client';
import { PostStatus, UserRole } from '../types';

const prisma = new PrismaClient();

export class EditorialWorkflowService {
    /**
     * Updates the status of a post with permission checks.
     */
    static async updateStatus(
        postId: string,
        userId: string,
        newStatus: PostStatus
    ) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error('User not found');

        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post) throw new Error('Post not found');

        // Permission Logic
        const canApprove = ([UserRole.SUPER_ADMIN, UserRole.MANAGING_EDITOR, UserRole.SECTION_EDITOR] as string[]).includes(user.role);
        const canReview = ([UserRole.SUPER_ADMIN, UserRole.MANAGING_EDITOR, UserRole.SECTION_EDITOR, UserRole.JOURNALIST] as string[]).includes(user.role);

        switch (newStatus) {
            case PostStatus.REVIEW:
                if (!canReview) throw new Error('Permission denied for review request');
                break;
            case PostStatus.EDITOR_APPROVAL:
            case PostStatus.PUBLISHED:
            case PostStatus.SCHEDULED:
                if (!canApprove) throw new Error('Permission denied for publication approval');
                break;
            case PostStatus.ARCHIVED:
                if (!canApprove) throw new Error('Permission denied for archiving');
                break;
        }

        // Handle Publication Logic
        const data: any = { status: newStatus };
        if (newStatus === PostStatus.PUBLISHED) {
            data.publishDate = new Date();
        }

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data,
        });

        // Log the change
        await prisma.auditLog.create({
            data: {
                userId,
                action: `Status change: ${post.status} -> ${newStatus}`,
                entity: 'Post',
                entityId: postId,
                newData: JSON.stringify({ status: newStatus }),
            },
        });

        return updatedPost;
    }

    /**
     * Creates a revision/version of the post.
     */
    static async createRevision(
        postId: string,
        userId: string,
        content: string,
        comment: string
    ) {
        return prisma.revision.create({
            data: {
                postId,
                editorId: userId,
                content,
                comment,
            },
        });
    }

    /**
     * Rollback a post to a specific revision.
     */
    static async rollback(
        postId: string,
        revisionId: string,
        userId: string
    ) {
        const revision = await prisma.revision.findUnique({
            where: { id: revisionId, postId },
        });

        if (!revision) throw new Error('Revision not found');

        return prisma.post.update({
            where: { id: postId },
            data: {
                body: revision.content,
            },
        });
    }
}
