import { Metadata } from 'next';

export interface SeoProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'video.other';
    author?: string;
    publishedTime?: string;
    tags?: string[];
}

export function generateSeoMetadata({
    title,
    description,
    image,
    url,
    type = 'website',
    author,
    publishedTime,
    tags,
}: SeoProps): Metadata {
    const baseTitle = "Kamal Shrestha | Media & Personal Brand";
    const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kamal-shrestha.com.np';
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

    return {
        title: fullTitle,
        description: description || "Kamal Shrestha explores the intersection of journalism, technology, and cinematic branding.",
        alternates: {
            canonical: fullUrl,
        },
        openGraph: {
            title: fullTitle,
            description: description,
            url: fullUrl,
            siteName: "Kamal Shrestha",
            images: [
                {
                    url: image || '/og-image.jpg',
                    width: 1200,
                    height: 630,
                },
            ],
            type: type,
            ...(type === 'article' && {
                publishedTime: publishedTime,
                authors: [author || 'Kamal Shrestha'],
                tags: tags,
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: description,
            images: [image || '/og-image.jpg'],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

/**
 * Generates JSON-LD for Search Engine Structured Data
 */
export function generateArticleSchema(post: any) {
    return {
        "@context": "https://schema.org",
        "@type": post.type === 'VIDEO' ? "VideoObject" : "NewsArticle",
        "headline": post.headline,
        "description": post.seoDescription || post.subheadline,
        "image": [post.featuredImage],
        "datePublished": post.publishDate,
        "dateModified": post.updatedAt,
        "author": {
            "@type": "Person",
            "name": post.author.name,
            "url": "https://kamal-shrestha.com.np"
        },
        ...(post.type === 'VIDEO' && {
            "contentUrl": post.videoLink,
            "thumbnailUrl": post.featuredImage,
            "uploadDate": post.publishDate
        })
    };
}
