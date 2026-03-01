import PostContent from "./PostContent";

// Required for static export with dynamic routes.
// Returns a dummy slug so Next.js knows the route exists.
// Actual content is fetched client-side in PostContent.tsx.
export async function generateStaticParams() {
    return [{ slug: '_placeholder' }];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <PostContent slug={slug} />;
}
