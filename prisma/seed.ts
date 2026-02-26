import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('--- Starting Seeding Protocol ---');

    // 1. CLEANUP
    await prisma.lead.deleteMany();
    await prisma.service.deleteMany();
    await prisma.teamMember.deleteMany();
    await prisma.job.deleteMany();
    await prisma.caseStudy.deleteMany();
    await prisma.blog.deleteMany();
    await prisma.blogCategory.deleteMany();
    await prisma.user.deleteMany();

    console.log('✓ Archive cleared');

    // 2. USERS (ADMINS)
    const hashedPass = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
        data: {
            email: 'admin@ranknexis.com',
            password: hashedPass,
            name: 'System Administrator',
            role: 'ADMIN',
        },
    });

    const editor = await prisma.user.create({
        data: {
            email: 'editor@ranknexis.com',
            password: hashedPass,
            name: 'Content Lead',
            role: 'ADMIN',
        },
    });

    console.log('✓ Admin nodes initialized');

    // 3. BLOG CATEGORIES
    const categories = await Promise.all([
        prisma.blogCategory.create({ data: { name: 'Search Engine Optimization', slug: 'seo' } }),
        prisma.blogCategory.create({ data: { name: 'Performance Marketing', slug: 'performance-marketing' } }),
        prisma.blogCategory.create({ data: { name: 'Visual Identity', slug: 'visual-identity' } }),
        prisma.blogCategory.create({ data: { name: 'Technical Engineering', slug: 'technical-engineering' } }),
    ]);

    console.log('✓ Content taxonomies established');

    // 4. BLOG POSTS
    await prisma.blog.create({
        data: {
            title: 'The Evolution of Search Intent in 2026',
            slug: 'evolution-of-search-intent',
            content: `Search engines are no longer just matching keywords; they are interpreting human desire. In 2026, the shift towards "Zero-Click" searches and AI-driven answers has fundamentally changed how we approach SEO. 

At RankNexis, we focus on semantic relevance rather than just volume. This means understanding the 'why' behind the query. Is the user seeking information, looking to purchase, or comparing services? 

Our deployment strategies prioritize comprehensive topic authority. By building knowledge clusters, we ensure that search engines recognize your brand as the definitive source of truth in your industry.`,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426',
            categoryId: categories[0].id,
            authorId: admin.id,
        },
    });

    await prisma.blog.create({
        data: {
            title: 'Mastering Meta Ads: A Data-First Approach',
            slug: 'mastering-meta-ads',
            content: `While creative is king, data is the kingdom. Managing effective Facebook and Instagram ad campaigns requires a delicate balance of disruptive visual storytelling and granular audience segmentation.

We've observed that high-performance ads share a common trait: they don't look like ads. They look like native value-adds to the user's feed. By utilizing Meta's Advantage+ algorithms combined with our custom audience layers, we drive ROI that traditional methods can't match.

Iterative testing is at the core of our performance marketing node. We test everything from hook lines to CTA colors, ensuring every dollar of your budget is deployed at maximum efficiency.`,
            image: 'https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070',
            categoryId: categories[1].id,
            authorId: editor.id,
        },
    });

    await prisma.blog.create({
        data: {
            title: 'The Psychology of High-Convertive Design',
            slug: 'psychology-of-convertive-design',
            content: `Design is not about making things pretty; it's about leading the eye and motivating the hand. Visual identity is the silent ambassador of your brand.

At RankNexis, we utilize psychological triggers like Fitts's Law and the von Restorff effect to create interfaces that feel intuitive. When a user lands on your site, they should know exactly where to go and what to do within three seconds.

Modern brands need a visual system that scales across platforms—from mobile-responsive web nodes to social graphics and corporate presentations. Consistency breeds trust, and trust drives growth.`,
            image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070',
            categoryId: categories[2].id,
            authorId: admin.id,
        },
    });

    console.log('✓ Knowledge base populated');

    // 5. SERVICES
    const servicesData = [
        {
            title: 'SEO Strategy',
            slug: 'seo',
            description: 'Strategic search engine optimization designed to capture high-intent traffic and build long-term brand authority.',
            icon: 'Search',
            category: 'MARKETING',
            features: ['Technical Audit', 'Keyword Intelligence', 'Authoritative Linking', 'Content Hubs', 'Local SEO Map Pack', 'Semantic Analysis', 'Penalty Recovery', 'Performance Tracking'],
            order: 1,
            active: true,
        },
        {
            title: 'Meta Advertising',
            slug: 'meta-ads',
            description: 'High-performance Facebook and Instagram ad campaigns focused on precise targeting and creative disruption.',
            icon: 'TrendingUp',
            category: 'MARKETING',
            features: ['Audience Segmentation', 'Creative Strategy', 'A/B Multi-Variant Testing', 'Retargeting Funnels', 'Catalog Optimization', 'Conversion API Setup', 'Lead Generation', 'Weekly Reports'],
            order: 2,
            active: true,
        },
        {
            title: 'Google Ads (SEM)',
            slug: 'google-ads',
            description: 'Capture immediate demand with highly targeted Search Engine Marketing campaigns that yield measurable ROI.',
            icon: 'Zap',
            category: 'MARKETING',
            features: ['Search Network Ops', 'Display Syndication', 'YouTube Placement', 'Bid Strategy Tuning', 'Negative Keyword Lists', 'Landing Page Audits', 'Quality Score Boost', 'Merchant Center Setup'],
            order: 3,
            active: true,
        },
        {
            title: 'Full-Stack Development',
            slug: 'web-dev',
            description: 'Custom web applications and high-performance websites built with the latest Next.js and React technology.',
            icon: 'Code2',
            category: 'SOFTWARE',
            features: ['Next.js Architecture', 'API Integrations', 'Database Systems', 'Headless CMS', 'E-commerce Engine', 'Custom Dashboards', 'Cloud Deployment', 'Performance Tuning'],
            order: 4,
            active: true,
        },
        {
            title: 'Brand Visual Identity',
            slug: 'design',
            description: 'Create a distinctive brand presence with professional graphic design and comprehensive visual systems.',
            icon: 'Palette',
            category: 'MARKETING',
            features: ['Logo Systems', 'Typography Sets', 'Color Palettes', 'Style Guides', 'Social Graphics', 'Print Collateral', 'Corporate Slides', 'Motion Graphics'],
            order: 5,
            active: true,
        }
    ];

    for (const s of servicesData) {
        await prisma.service.create({ data: s });
    }

    console.log('✓ Service verticals deployed');

    // 6. TEAM MEMBERS
    const teamMembers = [
        {
            name: "S.M. Tanveer",
            role: "SEO specialist",
            bio: "Focused on helping businesses rank higher on search engines through expert SEO strategies and analysis.",
            email: "ranknexis@gmail.com",
            facebook: "#",
            linkedin: "#",
            image: "/team/S_M_Tanveer.png",
            order: 1
        },
        {
            name: "Mobtaseem Moshfiq Fahim",
            role: "SEO Content Specialist",
            bio: "Specializing in creating high-quality, SEO-optimized content that engages audiences and drives organic growth.",
            email: "ranknexis@gmail.com",
            facebook: "#",
            linkedin: "#",
            image: "/team/Mobtaseem_Moshfiq_Fahim.png",
            order: 2
        },
        {
            name: "MD Maruf Hossen",
            role: "Meta Ads Specialist",
            bio: "Expert in designing and managing effective ad campaigns across Facebook and Instagram to drive ROI.",
            email: "ranknexis@gmail.com",
            facebook: "#",
            linkedin: "#",
            image: "/team/MD_Maruf_Hossen.png",
            order: 3
        },
        {
            name: "MD Sourav Hasan",
            role: "Google Ads Specialist",
            bio: "Specialist in Google Ads, dedicated to helping brands reach the right customers through targeted advertising.",
            email: "ranknexis@gmail.com",
            facebook: "#",
            linkedin: "#",
            image: "/team/MD_Sourav_Hasan.png",
            order: 4
        },
        {
            name: "Omer Faruqe Anas",
            role: "Social Media Specialist",
            bio: "Passionate about building strong social media presences and engaging communities across digital platforms.",
            email: "ranknexis@gmail.com",
            facebook: "#",
            linkedin: "#",
            image: "/team/Omer_Faruqe_Anas.png",
            order: 5
        }
    ];

    for (const m of teamMembers) {
        await prisma.teamMember.create({ data: m });
    }

    console.log('✓ Agency team synchronized');

    // 7. CAREERS (JOBS)
    await prisma.job.create({
        data: {
            title: 'Senior SEO Strategist',
            slug: 'senior-seo-strategist',
            description: 'Lead large-scale SEO campaigns for international clients, focused on technical auditing and semantic content hubs.',
            responsibilities: ['Conduct site audits', 'Direct content strategy', 'Manage client communication', 'Monitor ranking trends'],
            requirements: ['4+ years SEO experience', 'Proficiency in Ahrefs/Semrush', 'Technical SEO expertise', 'Strong analytical skills'],
            benefits: ['Remote options', 'Competitive salary', 'Personal growth fund', 'Health insurance'],
            location: 'Dubai / Remote',
            type: 'FULL_TIME',
        },
    });

    await prisma.job.create({
        data: {
            title: 'Full-Stack React Developer',
            slug: 'full-stack-react-developer',
            description: 'Build high-performance web applications using the Next.js ecosystem for various service nodes.',
            responsibilities: ['Develop clean UI', 'Integrate APIs', 'Optimize database queries', 'Collaborate on design'],
            requirements: ['Strong React/Next.js knowledge', 'Prisma experience', 'Tailwind CSS proficiency', 'TypeScript expert'],
            benefits: ['Flexible hours', 'Training workshops', 'Performance bonuses', 'Modern tech stack'],
            location: 'Global (Remote)',
            type: 'FULL_TIME',
        },
    });

    console.log('✓ Career pathways operational');

    // 8. CASE STUDIES
    await prisma.caseStudy.create({
        data: {
            title: 'Scaling Raafidan E-commerce Store',
            slug: 'raafidan-scaling',
            client: 'Raafidan Enterprise',
            tag: 'E-commerce',
            stats: '+220%',
            kpi: 'Revenue Acceleration',
            description: 'Strategic funnel optimization and e-commerce performance engineering for a leading regional retailer.',
            challenge: 'Stagnant sales and high customer acquisition costs through unoptimized Facebook ads that failed to resonate with the target audience.',
            solution: 'Complete funnel overhaul combined with a dynamic content strategy focused on high-intent search keywords and disruptive creative modules.',
            execution: ['Meta Ad Funnel Design', 'Conversion API Integration', 'Technical SEO Audit', 'UGC Content Direction'],
            results: ['220% Revenue Increase', '45% CPA Reduction', '15k Monthly Visitors', '3.2 ROAS'],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426',
            technologies: ['Prisma', 'Next.js', 'Meta Ads', 'Google Ads'],
        },
    });

    await prisma.caseStudy.create({
        data: {
            title: 'NextZen Brand Transformation',
            slug: 'nextzen-brand',
            client: 'NextZen Systems',
            tag: 'SaaS',
            stats: '3.2x',
            kpi: 'Retention Efficiency',
            description: 'Comprehensive visual identity reboot and high-performance technical deployment for a scaling SaaS organization.',
            challenge: 'Outdated visual identity and slow-loading legacy website hindering enterprise conversions and brand authority in a competitive market.',
            solution: 'Strategic brand reboot followed by the deployment of a high-performance Next.js corporate node with micro-animation sequences.',
            execution: ['Brand Style Guide', 'UI/UX Prototypes', 'Next.js Development', 'Speed Optimization'],
            results: ['3.2x Lead Volume', 'Sub-1s Load Time', 'Top 5 SEO Rankings', '40% Bounce Rate Drop'],
            image: 'https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070',
            technologies: ['Framer Motion', 'React', 'Tailwind CSS', 'PostgreSQL'],
        },
    });

    console.log('✓ Strategic portfolio deployed');

    console.log('--- Seeding Logic Complete: System Ready ---');
}

main()
    .catch((e) => {
        console.error('× Seeding Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
