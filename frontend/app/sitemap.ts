import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/api';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPosts() || [];

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kamal-shrestha.com.np';

    const postUrls = posts.map((post: any) => ({
        url: `${siteUrl}/posts/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${siteUrl}/videos`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...postUrls,
    ];
}
