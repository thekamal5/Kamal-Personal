/// <reference types="node" />
import { PrismaClient } from '@prisma/client';
import { UserRole, PostType, PostStatus } from '../src/types';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database with rich content...');

    // ──────────────────────────────────────────────
    // 1. USERS
    // ──────────────────────────────────────────────
    const adminPassword = await bcrypt.hash('admin123', 12);
    const editorPassword = await bcrypt.hash('editor123', 12);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@kamal-shrestha.com.np' },
        update: {},
        create: {
            email: 'admin@kamal-shrestha.com.np',
            name: 'Kamal Shrestha',
            password: adminPassword,
            role: UserRole.SUPER_ADMIN,
        },
    });

    const editor = await prisma.user.upsert({
        where: { email: 'editor@kamal-shrestha.com.np' },
        update: {},
        create: {
            email: 'editor@kamal-shrestha.com.np',
            name: 'Sita Sharma',
            password: editorPassword,
            role: UserRole.MANAGING_EDITOR,
        },
    });

    const journalist = await prisma.user.upsert({
        where: { email: 'journalist@kamal-shrestha.com.np' },
        update: {},
        create: {
            email: 'journalist@kamal-shrestha.com.np',
            name: 'Ram Thapa',
            password: editorPassword,
            role: UserRole.JOURNALIST,
        },
    });

    // ──────────────────────────────────────────────
    // 2. CATEGORIES
    // ──────────────────────────────────────────────
    const catTech = await prisma.category.upsert({ where: { slug: 'technology' }, update: {}, create: { name: 'Technology', slug: 'technology' } });
    const catJournalism = await prisma.category.upsert({ where: { slug: 'journalism' }, update: {}, create: { name: 'Journalism', slug: 'journalism' } });
    const catCinema = await prisma.category.upsert({ where: { slug: 'cinema' }, update: {}, create: { name: 'Cinema', slug: 'cinema' } });
    const catPolitics = await prisma.category.upsert({ where: { slug: 'politics' }, update: {}, create: { name: 'Politics', slug: 'politics' } });
    const catCulture = await prisma.category.upsert({ where: { slug: 'culture' }, update: {}, create: { name: 'Culture', slug: 'culture' } });
    const catSports = await prisma.category.upsert({ where: { slug: 'sports' }, update: {}, create: { name: 'Sports', slug: 'sports' } });
    const catBusiness = await prisma.category.upsert({ where: { slug: 'business' }, update: {}, create: { name: 'Business', slug: 'business' } });
    const catOpinion = await prisma.category.upsert({ where: { slug: 'opinion' }, update: {}, create: { name: 'Opinion', slug: 'opinion' } });

    // ──────────────────────────────────────────────
    // 3. TAGS
    // ──────────────────────────────────────────────
    const tagAI = await prisma.tag.upsert({ where: { slug: 'artificial-intelligence' }, update: {}, create: { name: 'Artificial Intelligence', slug: 'artificial-intelligence' } });
    const tagNepal = await prisma.tag.upsert({ where: { slug: 'nepal' }, update: {}, create: { name: 'Nepal', slug: 'nepal' } });
    const tagMedia = await prisma.tag.upsert({ where: { slug: 'media' }, update: {}, create: { name: 'Media', slug: 'media' } });
    const tagBreaking = await prisma.tag.upsert({ where: { slug: 'breaking' }, update: {}, create: { name: 'Breaking', slug: 'breaking' } });
    const tagAnalysis = await prisma.tag.upsert({ where: { slug: 'analysis' }, update: {}, create: { name: 'Analysis', slug: 'analysis' } });
    const tagInterview = await prisma.tag.upsert({ where: { slug: 'interview' }, update: {}, create: { name: 'Interview', slug: 'interview' } });
    const tagDocumentary = await prisma.tag.upsert({ where: { slug: 'documentary' }, update: {}, create: { name: 'Documentary', slug: 'documentary' } });
    const tagEconomy = await prisma.tag.upsert({ where: { slug: 'economy' }, update: {}, create: { name: 'Economy', slug: 'economy' } });

    // ──────────────────────────────────────────────
    // ──────────────────────────────────────────────
    // 4. ARTICLES
    // ──────────────────────────────────────────────
    await prisma.slot.deleteMany();
    await prisma.section.deleteMany();
    await prisma.page.deleteMany();
    await prisma.post.deleteMany();

    const post1 = await prisma.post.create({
        data: {
            headline: 'The Future of AI in Nepali Media',
            subheadline: 'How algorithms are reshaping the narrative landscape in South Asia',
            body: `Artificial Intelligence is no longer a distant concept confined to Silicon Valley labs. In Nepal's newsrooms, AI tools are beginning to transform how stories are discovered, verified, and delivered to audiences.\n\nFrom automated translation systems that bridge the gap between Nepali and English-language reporting, to machine learning models that analyze social media trends for breaking news leads, the integration of AI into journalism is accelerating at an unprecedented pace.\n\n## The Current Landscape\n\nSeveral major media houses in Kathmandu have begun experimenting with AI-powered content management systems. These systems can automatically tag articles, suggest related stories, and even generate basic reports from structured data like election results or financial statements.\n\n"We're not replacing journalists," says one editor at a leading Nepali daily. "We're giving them superpowers. AI handles the repetitive work so our reporters can focus on what matters — investigative journalism and human stories."\n\n## Challenges Ahead\n\nHowever, the adoption of AI in Nepali media isn't without challenges. Limited internet infrastructure in rural areas, a shortage of data scientists who understand the media industry, and concerns about algorithmic bias all present significant hurdles.\n\nThe language barrier is particularly acute. Most AI models are trained primarily on English text, and their performance degrades significantly when applied to Nepali or other South Asian languages. Building robust NLP tools for Nepali requires significant investment in data collection and model training.\n\n## What's Next\n\nDespite these challenges, the trajectory is clear. AI will play an increasingly central role in how news is produced and consumed in Nepal. The question isn't whether this transformation will happen, but whether Nepal's media industry will shape it — or be shaped by it.`,
            slug: 'future-of-ai-nepali-media',
            type: PostType.ARTICLE,
            status: PostStatus.PUBLISHED,
            authorId: admin.id,
            categoryId: catTech.id,
            isHeadline: true,
            isFeatured: true,
            publishDate: new Date('2026-02-28T04:00:00Z'),
            tags: { connect: [{ id: tagAI.id }, { id: tagMedia.id }, { id: tagNepal.id }] },
        },
    });

    const post2 = await prisma.post.create({
        data: {
            headline: 'Inside the Cinematic Revolution: How Nepal Produces Globally',
            subheadline: 'From Kathmandu studios to international film festivals',
            body: `Nepal's film industry is experiencing a renaissance. A new generation of filmmakers, armed with affordable digital cameras and a burning desire to tell authentic stories, is putting Nepali cinema on the global map.\n\nGone are the days when Nepali films were seen as low-budget imitations of Bollywood. Today, films like "Panchayat" and "The Black Hen" have screened at prestigious international festivals, earning critical acclaim and introducing global audiences to the richness of Nepali storytelling.\n\n## The New Wave\n\nThis new wave of Nepali cinema is characterized by its willingness to tackle difficult subjects. Films about caste discrimination, political corruption, gender violence, and the lingering trauma of the civil war are finding both domestic and international audiences.\n\n"Our stories are universal," explains one young director. "The specifics are Nepali, but the emotions — love, loss, hope, resilience — those connect with anyone."\n\n## Technical Excellence\n\nThe technical quality of Nepali films has also improved dramatically. Color grading, sound design, and visual effects that would have been impossible a decade ago are now within reach of independent filmmakers.\n\nThe rise of streaming platforms has also opened new distribution channels. Several Nepali films have been picked up by regional streaming services, giving them access to millions of viewers across South Asia.`,
            slug: 'nepali-cinematic-revolution',
            type: PostType.VIDEO,
            status: PostStatus.PUBLISHED,
            authorId: editor.id,
            categoryId: catCinema.id,
            videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            isFeatured: true,
            publishDate: new Date('2026-02-27T10:00:00Z'),
            tags: { connect: [{ id: tagDocumentary.id }, { id: tagNepal.id }] },
        },
    });

    await prisma.post.create({
        data: {
            headline: 'Parliament Deadlock: What It Means for Nepal\'s Democracy',
            subheadline: 'Opposition walkout enters third week as budget debate stalls',
            body: `The ongoing parliamentary deadlock in Nepal has entered its third week, with opposition parties continuing their boycott of budget deliberations. The impasse, triggered by disagreements over a controversial infrastructure bill, has raised serious concerns about the functioning of Nepal's young democracy.\n\nPolitical analysts warn that prolonged parliamentary dysfunction could have far-reaching consequences, from delayed government spending to increased public disillusionment with the democratic process.\n\n"Every day parliament doesn't function, it costs the country," explains Dr. Prakash Bhattarai, a political science professor at Tribhuvan University. "Both in terms of actual governance and in terms of public trust."\n\nThe ruling coalition has accused the opposition of "obstructionism," while opposition leaders maintain they are exercising their democratic right to protest what they call an "unconstitutional" piece of legislation.\n\nMeanwhile, civil society groups are calling for dialogue, urging both sides to find a compromise before the deadline for the annual budget.`,
            slug: 'parliament-deadlock-nepal-democracy',
            type: PostType.ARTICLE,
            status: PostStatus.PUBLISHED,
            authorId: journalist.id,
            categoryId: catPolitics.id,
            isHeadline: false,
            isBanner: true,
            publishDate: new Date('2026-02-27T08:00:00Z'),
            tags: { connect: [{ id: tagNepal.id }, { id: tagBreaking.id }, { id: tagAnalysis.id }] },
        },
    });

    await prisma.post.create({
        data: {
            headline: 'The Economics of Everest: Tourism, Climate, and the Future',
            subheadline: 'How Nepal balances economic necessity with environmental preservation',
            body: `Mount Everest generates approximately $300 million annually for Nepal's economy. But as climate change accelerates glacial melt and record numbers of climbers crowd the mountain's slopes, the country faces an existential question: how do you preserve the world's highest peak while depending on it for economic survival?\n\nThe 2026 climbing season is expected to be the busiest yet, with over 400 permits issued for Everest alone. Each permit costs $11,000, and climbers typically spend between $30,000 and $100,000 on their expeditions, with much of that money flowing into the local economy.\n\n## The Environmental Cost\n\nBut the environmental cost is staggering. An estimated 50 tons of waste is left on the mountain each season, despite cleanup efforts. Glacial lakes formed by melting ice pose flood risks to communities downstream. And the carbon footprint of flights to Lukla, the gateway to Everest, is significant.\n\n## Balancing Act\n\nThe government has taken some steps to address these issues, including requiring climbers to bring back a minimum amount of waste and investing in alternative energy sources for tea houses along the trekking routes. But critics say much more needs to be done.\n\n"We can't kill the goose that lays the golden egg," says one tourism official. "But we also can't ignore the fact that the goose is getting sick."`,
            slug: 'economics-of-everest-tourism-climate',
            type: PostType.ARTICLE,
            status: PostStatus.PUBLISHED,
            authorId: admin.id,
            categoryId: catBusiness.id,
            publishDate: new Date('2026-02-26T14:00:00Z'),
            tags: { connect: [{ id: tagNepal.id }, { id: tagEconomy.id }, { id: tagAnalysis.id }] },
        },
    });

    await prisma.post.create({
        data: {
            headline: 'Opinion: Why Nepal Needs a Media Literacy Revolution',
            subheadline: 'In an age of misinformation, critical thinking is our best defense',
            body: `Every morning, millions of Nepalis scroll through their social media feeds, consuming a mix of news, opinion, and outright fabrication — often unable to distinguish between them. In a country where internet penetration has skyrocketed from 5% to over 70% in just a decade, the need for media literacy has never been more urgent.\n\nMisinformation in Nepal isn't just an inconvenience — it's a threat to public health, social cohesion, and democratic governance. During the COVID-19 pandemic, false claims about miracle cures spread faster than the virus itself, with deadly consequences.\n\n## The Education Gap\n\nNepal's education system has not kept pace with the digital revolution. Most schools still don't teach students how to evaluate sources, identify bias, or fact-check claims. The result is a population that is digitally connected but critically unarmed.\n\n## A Path Forward\n\nWhat Nepal needs is a comprehensive media literacy program, integrated into the national curriculum from primary school through university. This isn't about teaching people what to think — it's about teaching them how to think.\n\nSeveral pilot programs have shown promising results. In districts where media literacy workshops have been conducted, participants show significantly improved ability to identify misinformation and are more likely to verify claims before sharing them.\n\nThe investment required is minimal compared to the social cost of inaction. Nepal's democracy depends on an informed citizenry. It's time to give our citizens the tools they need.`,
            slug: 'nepal-media-literacy-revolution',
            type: PostType.OPINION,
            status: PostStatus.PUBLISHED,
            authorId: admin.id,
            categoryId: catOpinion.id,
            publishDate: new Date('2026-02-26T06:00:00Z'),
            tags: { connect: [{ id: tagMedia.id }, { id: tagNepal.id }, { id: tagAnalysis.id }] },
        },
    });

    await prisma.post.create({
        data: {
            headline: 'Exclusive Interview: Inside Nepal\'s Digital Transformation',
            subheadline: 'Minister of Communications reveals the 5-year roadmap',
            body: `In a rare sit-down interview, Nepal's Minister of Communications and Information Technology laid out the government's ambitious plan to digitize public services, expand broadband access, and position Nepal as a technology hub in South Asia.\n\n"We want every citizen to have access to government services from their phone," the minister said. "No more standing in line for hours. No more traveling to Kathmandu for a simple document."\n\n## The Digital Nepal Framework\n\nThe 5-year plan, dubbed "Digital Nepal Framework 2.0," builds on the original 2019 framework and includes:\n\n- Universal broadband access by 2028\n- Digital identity for all citizens\n- E-governance platforms for 200+ government services\n- A ₨50 billion investment in technology infrastructure\n- Tax incentives for IT startups\n\n## Skepticism and Support\n\nThe plan has received mixed reactions. Technology entrepreneurs are cautiously optimistic, while opposition politicians have questioned the feasibility of the timeline and the source of funding.\n\n"The vision is right," says one tech industry leader. "The question is execution. Nepal has a history of ambitious plans that stall in implementation."\n\nThe minister acknowledged these concerns but insisted that this time would be different, pointing to recent successes in digitalizing tax collection and vehicle registration as proof of concept.`,
            slug: 'nepal-digital-transformation-interview',
            type: PostType.INTERVIEW,
            status: PostStatus.PUBLISHED,
            authorId: editor.id,
            categoryId: catTech.id,
            publishDate: new Date('2026-02-25T12:00:00Z'),
            tags: { connect: [{ id: tagInterview.id }, { id: tagNepal.id }, { id: tagAI.id }] },
        },
    });

    await prisma.post.create({
        data: {
            headline: 'Cricket Fever Grips Kathmandu as Nepal Eyes World Cup Qualification',
            subheadline: 'The national team\'s remarkable journey from minnows to contenders',
            body: `Cricket has become Nepal's unofficial second religion. On match days, the streets of Kathmandu empty as millions gather around television screens to watch the national team compete on the international stage.\n\nNepal's journey in international cricket is nothing short of remarkable. From a team that struggled to compete at the regional level just a decade ago, Nepal has emerged as one of the most exciting stories in world cricket.\n\n## The Rise\n\nThe turning point came with the development of a robust domestic cricket structure. The Nepal Premier League, launched in 2023, brought international attention and investment to Nepali cricket. Young players who once dreamed of playing in the IPL now had a professional league at home.\n\n## Key Players\n\nThe current squad features several players who have made their mark in international T20 leagues. Captain Rohit Paudel, just 24, has already scored over 3,000 international runs and is considered one of the best batsmen outside the Test-playing nations.\n\n## World Cup Dreams\n\nWith the 2027 ODI World Cup qualification pathway beginning later this year, Nepal's chances of reaching the main event have never been better. A strong showing in the qualifier could make history.\n\n"This isn't just about cricket," says the team's coach. "It's about showing the world what Nepal is capable of. When we step onto that field, we carry the hopes of 30 million people."`,
            slug: 'nepal-cricket-world-cup-qualification',
            type: PostType.ARTICLE,
            status: PostStatus.PUBLISHED,
            authorId: journalist.id,
            categoryId: catSports.id,
            publishDate: new Date('2026-02-25T08:00:00Z'),
            tags: { connect: [{ id: tagNepal.id }, { id: tagBreaking.id }] },
        },
    });

    await prisma.post.create({
        data: {
            headline: 'Documenting the Disappearing: Nepal\'s Endangered Languages',
            subheadline: 'A multimedia journey through the voices on the edge of silence',
            body: `Nepal is home to over 120 languages, making it one of the most linguistically diverse countries on Earth relative to its size. But this diversity is under threat. According to UNESCO, at least 24 Nepali languages are endangered, and several are spoken by fewer than 100 people.\n\n## Voices in Danger\n\nIn the remote hills of eastern Nepal, the Dungmali language is spoken by just 45 elderly villagers. When they pass, their language — and with it, centuries of accumulated knowledge about local ecology, medicine, and culture — will die too.\n\n"Every language that dies is a library burning," says Dr. Maya Rai, a linguist at Tribhuvan University who has spent 20 years documenting endangered Nepali languages.\n\n## Preservation Efforts\n\nEfforts to preserve these languages are underway but underfunded. A handful of linguists, supported by international grants, are racing against time to create dictionaries, grammars, and recordings of endangered languages.\n\nNew technology is helping. Mobile apps that teach endangered languages through gamification have shown promise, particularly among young people in diaspora communities who want to reconnect with their heritage.\n\n## The Cultural Stakes\n\nLanguage loss isn't just a linguistic issue — it's a cultural one. Each language encodes a unique way of understanding the world, from the Tamang calendar system to the Tharu medicinal knowledge that has no equivalent in Nepali or English.`,
            slug: 'nepal-endangered-languages-documentary',
            type: PostType.MULTIMEDIA_STORY,
            status: PostStatus.PUBLISHED,
            authorId: admin.id,
            categoryId: catCulture.id,
            isFeatured: true,
            publishDate: new Date('2026-02-24T10:00:00Z'),
            tags: { connect: [{ id: tagDocumentary.id }, { id: tagNepal.id }] },
        },
    });

    await prisma.post.create({
        data: {
            headline: 'Video: The Hidden Waterfalls of Manang',
            subheadline: 'An aerial journey through Nepal\'s most breathtaking landscapes',
            body: `High above the Annapurna Circuit, in the rain shadow of the Himalayas, lies a collection of waterfalls that few tourists ever see. Accessible only by a two-day trek from the nearest road, these cascades plunge hundreds of meters through limestone gorges carved over millennia.\n\nOur drone team spent three weeks in Manang district capturing footage that reveals the raw, untouched beauty of this region. The result is a visual poem that celebrates one of Nepal's last wild frontiers.\n\n## The Journey\n\nReaching these waterfalls required navigating narrow trails along cliff edges, crossing suspension bridges swaying in the wind, and camping at altitudes above 4,000 meters. The team faced altitude sickness, equipment failures, and unexpected snowstorms.\n\n## What We Found\n\nBut the rewards were extraordinary. Waterfalls that don't appear on any map. Rock formations that tell the geological story of the Himalayas. And communities living in harmony with some of the most dramatic landscapes on Earth.`,
            slug: 'hidden-waterfalls-manang-video',
            type: PostType.VIDEO,
            status: PostStatus.PUBLISHED,
            authorId: journalist.id,
            categoryId: catCulture.id,
            videoLink: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
            publishDate: new Date('2026-02-24T06:00:00Z'),
            tags: { connect: [{ id: tagNepal.id }, { id: tagDocumentary.id }] },
        },
    });

    await prisma.post.create({
        data: {
            headline: 'Opinion: The Case for Federalism — Five Years Later',
            subheadline: 'Has Nepal\'s federal experiment delivered on its promises?',
            body: `Five years into Nepal's federal experiment, the verdict is mixed. The 2015 constitution divided the country into seven provinces, each with its own parliament, chief minister, and bureaucracy. The promise was simple: bring government closer to the people.\n\nIn some ways, federalism has delivered. Local governments now control budgets for schools, health posts, and roads. Citizens can access services without traveling to Kathmandu. And previously marginalized communities have gained political representation at the provincial level.\n\n## The Shortcomings\n\nBut significant problems remain. Coordination between federal, provincial, and local governments is often dysfunctional. Many provinces lack the human resources and institutional capacity to deliver quality services. And the cost of maintaining three tiers of government is straining public finances.\n\n## Looking Forward\n\nThe solution isn't to abandon federalism — it's to fix it. That means investing in provincial capacity building, clarifying the division of responsibilities between government levels, and creating effective coordination mechanisms.\n\nNepal's federal journey is still in its early chapters. The story is being written by every local representative, every provincial bureaucrat, and every citizen who demands better governance. The ending isn't predetermined — it's up to us.`,
            slug: 'federalism-nepal-five-years-opinion',
            type: PostType.OPINION,
            status: PostStatus.PUBLISHED,
            authorId: admin.id,
            categoryId: catOpinion.id,
            publishDate: new Date('2026-02-23T08:00:00Z'),
            tags: { connect: [{ id: tagNepal.id }, { id: tagAnalysis.id }] },
        },
    });

    await prisma.post.create({
        data: {
            headline: 'Startup Scene: Nepal\'s Tech Entrepreneurs Are Building the Future',
            subheadline: 'From fintech to agritech, Kathmandu\'s startup ecosystem is booming',
            body: `In a converted warehouse in Thamel, a team of young engineers is building an app that could transform how 15 million Nepali farmers sell their produce. Across town, a fintech startup is processing millions in digital payments. And in Pokhara, a drone company is mapping remote villages for disaster preparedness.\n\nNepal's startup ecosystem has exploded in the past three years, driven by a combination of returning diaspora talent, increased internet penetration, and a growing middle class eager for digital solutions.\n\n## The Numbers\n\nAccording to the Nepal Startup Association, there are now over 400 active startups in the country, up from fewer than 50 in 2020. Venture capital investment has grown from ₨200 million to over ₨5 billion annually.\n\n## Success Stories\n\nSeveral Nepali startups have achieved regional scale. eSewa, the country's leading digital wallet, processes over $2 billion in transactions annually. Foodmandu has built South Asia's largest food delivery network outside India. And Sajilo Sewa is bringing telemedicine to remote communities.\n\n## Challenges\n\nDespite the momentum, challenges remain. Access to growth capital is limited, regulatory frameworks haven't kept pace with innovation, and talent retention is difficult when competing with opportunities abroad.\n\nBut the energy is unmistakable. "Nepal's startup scene isn't trying to copy Silicon Valley," says one founder. "We're solving problems that are uniquely ours. And that's what makes it exciting."`,
            slug: 'nepal-startup-tech-entrepreneurs',
            type: PostType.ARTICLE,
            status: PostStatus.PUBLISHED,
            authorId: editor.id,
            categoryId: catBusiness.id,
            publishDate: new Date('2026-02-23T04:00:00Z'),
            tags: { connect: [{ id: tagAI.id }, { id: tagNepal.id }, { id: tagEconomy.id }] },
        },
    });

    await prisma.post.create({
        data: {
            headline: 'Breaking: Major Infrastructure Deal Signed with China',
            subheadline: 'The $2 billion railway project promises to connect Kathmandu to the border',
            body: `Nepal and China have signed a $2 billion agreement to construct a cross-border railway linking Kathmandu to Kerung on the Chinese side of the border. The project, decades in the making, represents the largest infrastructure investment in Nepal's history.\n\nThe railway will traverse some of the most challenging terrain on Earth, tunneling through the Himalayas at altitudes above 4,000 meters. Engineers estimate the project will take 8-10 years to complete.\n\n## Economic Impact\n\nProponents say the railway will transform Nepal's economy by providing a second trade route (currently, nearly all imports come through India), reducing transportation costs, and opening new tourism circuits.\n\n## Concerns\n\nCritics worry about the environmental impact of tunneling through fragile Himalayan geology, the debt burden of such a massive project, and the geopolitical implications of deepening economic ties with China.\n\nThe agreement includes provisions for technology transfer, local employment, and environmental mitigation measures. But details on financing terms have not been made public, fueling speculation about the conditions attached.`,
            slug: 'nepal-china-railway-infrastructure-deal',
            type: PostType.ARTICLE,
            status: PostStatus.PUBLISHED,
            authorId: journalist.id,
            categoryId: catPolitics.id,
            isBanner: true,
            publishDate: new Date('2026-02-22T16:00:00Z'),
            tags: { connect: [{ id: tagBreaking.id }, { id: tagNepal.id }, { id: tagEconomy.id }] },
        },
    });

    // Draft and Review posts for admin dashboard testing
    await prisma.post.create({
        data: {
            headline: 'Draft: Investigating Water Quality in Urban Nepal',
            subheadline: 'An ongoing investigation into contamination in municipal water supplies',
            body: 'This investigative piece is still in progress. Data collection from 15 municipalities is ongoing. Initial findings suggest significant contamination in 8 out of 15 tested water sources...',
            slug: 'investigating-water-quality-urban-nepal',
            type: PostType.ARTICLE,
            status: PostStatus.DRAFT,
            authorId: journalist.id,
            categoryId: catJournalism.id,
            publishDate: null,
        },
    });

    await prisma.post.create({
        data: {
            headline: 'Under Review: The Mental Health Crisis in Nepali Schools',
            subheadline: 'Exclusive data reveals alarming rates of anxiety and depression among students',
            body: 'A year-long study conducted across 200 schools in 7 provinces has revealed that nearly 40% of secondary school students report symptoms of anxiety or depression. The findings paint a stark picture of a generation struggling under academic pressure, social media influence, and limited mental health support...',
            slug: 'mental-health-crisis-nepali-schools',
            type: PostType.ARTICLE,
            status: PostStatus.REVIEW,
            authorId: editor.id,
            categoryId: catJournalism.id,
            publishDate: null,
            tags: { connect: [{ id: tagAnalysis.id }, { id: tagNepal.id }] },
        },
    });

    await prisma.post.create({
        data: {
            headline: 'Scheduled: Holi Festival Coverage 2026',
            subheadline: 'Live photo and video coverage of Nepal\'s most colorful celebration',
            body: 'Comprehensive multimedia coverage of Holi celebrations across the Kathmandu Valley is prepared. This package includes drone footage, street-level photography, and interviews with festival organizers.',
            slug: 'holi-festival-coverage-2026',
            type: PostType.MULTIMEDIA_STORY,
            status: PostStatus.SCHEDULED,
            authorId: admin.id,
            categoryId: catCulture.id,
            scheduledDate: new Date('2026-03-14T04:00:00Z'),
            publishDate: null,
            tags: { connect: [{ id: tagNepal.id }] },
        },
    });

    // ──────────────────────────────────────────────
    // 5. LAYOUT ENGINE (Pages → Sections → Slots)
    // ──────────────────────────────────────────────

    const homePage = await prisma.page.upsert({
        where: { name: 'Home' },
        update: {},
        create: { name: 'Home' },
    });

    const heroSection = await prisma.section.create({
        data: { name: 'Hero Section', pageId: homePage.id, order: 0 },
    });

    await prisma.slot.create({
        data: {
            sectionId: heroSection.id,
            order: 0,
            overridePostId: post1.id,
            lockPlacement: true,
        },
    });

    const trendingSection = await prisma.section.create({
        data: { name: 'Trending Now', pageId: homePage.id, order: 1 },
    });

    await prisma.slot.create({
        data: {
            sectionId: trendingSection.id,
            order: 0,
            rules: JSON.stringify({ sortBy: 'publishDate', order: 'desc', type: PostType.ARTICLE }),
        },
    });

    const featuredVideoSection = await prisma.section.create({
        data: { name: 'Featured Videos', pageId: homePage.id, order: 2 },
    });

    await prisma.slot.create({
        data: {
            sectionId: featuredVideoSection.id,
            order: 0,
            overridePostId: post2.id,
            lockPlacement: true,
        },
    });

    const opinionSection = await prisma.section.create({
        data: { name: 'Opinions & Analysis', pageId: homePage.id, order: 3 },
    });

    await prisma.slot.create({
        data: {
            sectionId: opinionSection.id,
            order: 0,
            rules: JSON.stringify({ sortBy: 'publishDate', order: 'desc', type: PostType.OPINION }),
        },
    });

    console.log('✅ Seeding complete!');
    console.log('────────────────────────────────────────');
    console.log('📊 Created:');
    console.log('   • 3 Users (admin, editor, journalist)');
    console.log('   • 8 Categories');
    console.log('   • 8 Tags');
    console.log('   • 15 Posts (12 published, 1 draft, 1 review, 1 scheduled)');
    console.log('   • 1 Page with 4 Sections and 4 Slots');
    console.log('────────────────────────────────────────');
    console.log('🔐 Admin: admin@kamal-shrestha.com.np / admin123');
    console.log('🔐 Editor: editor@kamal-shrestha.com.np / editor123');
    console.log('🔐 Journalist: journalist@kamal-shrestha.com.np / editor123');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
