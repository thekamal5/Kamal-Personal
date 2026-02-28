import { getPost } from "@/lib/api";
import { generateSeoMetadata, generateArticleSchema } from "@/lib/seo";
import PostContent from "./PostContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) return { title: 'Post Not Found' };

    return generateSeoMetadata({
        title: post.headline,
        description: post.seoDescription || post.subheadline,
        image: post.featuredImage,
        url: `/posts/${post.slug}`,
        type: post.type === 'VIDEO' ? 'video.other' : 'article',
        author: post.author.name,
        publishedTime: post.publishDate,
        tags: post.tags?.map((t: any) => t.name) || [],
    });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-black">Post Not Found</h1>
            </div>
        );
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateArticleSchema(post)) }}
            />
            <PostContent post={post} />
        </>
    );
}
