import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs';
import { BLOG_CONTENT } from './blogContent';
import { PAGES_DATA } from './pageData';

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })


async function main() {
  console.log('--- RankNexis Production Seeding Started ---');

  // 1. CLEANUP
  await prisma.pageSection.deleteMany();
  await prisma.pageContent.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.blogCategory.deleteMany();
  await prisma.caseStudy.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSettings.deleteMany();

  // 2. USERS
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  const hashedEditorPassword = await bcrypt.hash('editor123', 10);

  const adminUser = await prisma.user.create({
    data: { email: 'admin@ranknexis.com', password: hashedAdminPassword, name: 'MD Sourav Hasan', role: 'ADMIN' }
  });

  const editorUser = await prisma.user.create({
    data: { email: 'editor@ranknexis.com', password: hashedEditorPassword, name: 'S.M. Tanveer', role: 'EDITOR' }
  });

  // 3. BLOG CATEGORIES
  const categoryData = [
    { name: 'Strategy', slug: 'strategy' },
    { name: 'Tutorials', slug: 'tutorials' },
    { name: 'Insights', slug: 'insights' }
  ];
  const categories = await Promise.all(categoryData.map(c => prisma.blogCategory.create({ data: c })));

  // 4. BLOGS (AUTHENTIC CONTENT)
  const blogs = [
    { 
      title: 'What is a Digital Marketing Agency', 
      slug: 'what-is-digital-marketing-agency', 
      content: BLOG_CONTENT['what-is-digital-marketing-agency'], 
      image: '/blog-images/what-is-a-digital-marketing-agency-1.webp', 
      metaTitle: 'What is a Digital Marketing Agency? The Secret to Rapid Business Growth',
      metaDescription: 'Discover what a digital marketing agency is and how it can help your business grow online using SEO, social media, and paid ads.',
      categoryId: categories[2].id, 
      authorId: adminUser.id 
    },
    { 
      title: 'How to Choose a Digital Marketing Agency', 
      slug: 'how-choose-digital-marketing-agency', 
      content: BLOG_CONTENT['how-choose-digital-marketing-agency'], 
      image: '/blog-images/how-to-choose-a-digital-marketing-agency.webp', 
      metaTitle: 'How to Choose a Digital Marketing Agency: A Complete Guide for Smart Decisions',
      metaDescription: 'Learn the essential factors to consider when selecting the right digital marketing partner for your business success.',
      categoryId: categories[0].id, 
      authorId: editorUser.id 
    },
    { 
      title: 'Why Do You Need a Digital Marketing Agency', 
      slug: 'why-do-you-need-a-digital-marketing-agency-1', 
      content: BLOG_CONTENT['why-do-you-need-a-digital-marketing-agency-1'], 
      image: '/blog-images/why-do-you-need-a-digital-marketing-agency-1.webp', 
      metaTitle: 'Why Do You Need a Digital Marketing Agency for Success',
      metaDescription: 'Explore the top reasons why hiring a professional agency is crucial for your business growth in the digital-first world.',
      categoryId: categories[2].id, 
      authorId: adminUser.id 
    },
    { 
      title: 'How to Remove Two-Factor Authentication in Facebook Ads Manager (2026)', 
      slug: 'how-remove-2fa-facebook-ads', 
      content: BLOG_CONTENT['how-remove-2fa-facebook-ads'], 
      image: '/blog-images/how-to-remove-two-factor-authentication-in-facebook-ads-manager.webp', 
      metaTitle: 'How to Remove Two-Factor Authentication in Facebook Ads Manager Step-by-Step',
      metaDescription: 'A complete legal guide on managing and disabling 2FA for your Facebook ad account to regain access and improve security management.',
      categoryId: categories[1].id, 
      authorId: editorUser.id 
    },
    { 
      title: 'Car Review Website SEO Optimization: The Ultimate 2026 Guide', 
      slug: 'car-review-website-seo', 
      content: BLOG_CONTENT['car-review-website-seo'], 
      image: '/blog-images/car-review-website-seo-optimization-2-1.webp', 
      metaTitle: 'Car Review Website SEO Optimization Guide for Traffic Growth',
      metaDescription: 'Master SEO for car review websites. Learn keyword research, on-page optimization, and technical SEO for the automotive niche.',
      categoryId: categories[0].id, 
      authorId: adminUser.id 
    },
    { 
      title: 'Website Design Services for Aesthetic Clinics (2026 Guide)', 
      slug: 'website-design-aesthetic-clinics', 
      content: BLOG_CONTENT['website-design-aesthetic-clinics'], 
      image: '/blog-images/website-design-services-for-aesthetic-clinics-2.webp', 
      metaTitle: 'Website Design Services for Aesthetic Clinics to Grow Clients',
      metaDescription: 'Clean, luxury website design for aesthetic clinics. Learn how to convert visitors into patients with professional medical web design.',
      categoryId: categories[2].id, 
      authorId: editorUser.id 
    },
    { 
      title: 'Google Ads Optimization for Doctors: Top 10 SERP Analysis', 
      slug: 'google-ads-for-doctors', 
      content: BLOG_CONTENT['google-ads-for-doctors'], 
      image: '/blog-images/google-ads-optimization-for-doctors.webp', 
      metaTitle: 'Google Ads Optimization for Doctors to Get More Patients',
      metaDescription: 'Analyze top-performing ads and optimize your medical PPC campaigns to reach high-intent patients and maximize your ROI.',
      categoryId: categories[1].id, 
      authorId: adminUser.id 
    },
    { 
      title: 'How to Get Rid of Facebook Ads (2026 Guide)', 
      slug: 'how-to-get-rid-of-facebook-ads', 
      content: BLOG_CONTENT['how-to-get-rid-of-facebook-ads'], 
      image: '/blog-images/how-to-get-rid-of-facebook-ads.webp', 
      metaTitle: 'How to Get Rid of Facebook Ads Easily in 2026',
      metaDescription: 'Take control of your feed. Learn how to hide ads, adjust preferences, and limit data tracking on Facebook.',
      categoryId: categories[1].id, 
      authorId: editorUser.id 
    }
  ];

  for (const b of blogs) await prisma.blog.create({ data: b });

  // 5. SERVICES
  const services = [
    { title: 'SEO Service', slug: 'seo-service', category: 'MARKETING', icon: 'Search', order: 1, description: 'Affordable and results-driven SEO services for growth.' },
    { title: 'Social Media Marketing', slug: 'social-media-marketing', category: 'MARKETING', icon: 'Share2', order: 2, description: 'Strategic SMM to build authority and engagement.' },
    { title: 'Facebook Ads', slug: 'facebook-ads', category: 'MARKETING', icon: 'Facebook', order: 3, description: 'High-converting campaigns for Meta platforms.' },
    { title: 'Google Ads', slug: 'google-ads', category: 'MARKETING', icon: 'Zap', order: 4, description: 'Performance PPC management for instant traffic.' },
    { title: 'Graphic Design', slug: 'graphic-design', category: 'BRANDING', icon: 'Palette', order: 5, description: 'Professional visuals for a strong brand identity.' },
    { title: 'Video & Motion', slug: 'video-motion', category: 'CREATIVE', icon: 'Video', order: 6, description: 'Engaging video content and motion graphics.' },
    { title: 'UI/UX Design', slug: 'ui-ux-design', category: 'SOFTWARE', icon: 'Monitor', order: 7, description: 'User-centric design for digital products.' },
    { title: 'Web Development', slug: 'web-development', category: 'SOFTWARE', icon: 'Code', order: 8, description: 'Scalable and modern website development.' },
    { title: 'Full Stack Solution', slug: 'full-stack-solution', category: 'SOFTWARE', icon: 'Rocket', order: 9, description: 'Custom web applications built for business.' },
  ];
  for (const s of services) await prisma.service.create({ data: { ...s, features: [] } });

  // 6. TEAM MEMBERS
  const team = [
    { name: "S.M. Tanveer", role: "SEO Specialist", image: "/team/S_M_Tanveer.png", bio: "S.M. Tanveer is a dedicated SEO specialist with over 8 years of experience in driving organic growth.", order: 1 },
    { name: "Mobtaseem Moshfiq Fahim", role: "SEO Content Specialist", image: "/team/Mobtaseem_Moshfiq_Fahim.png", bio: "Fahim specializes in creating SEO-optimized content that ranks and converts.", order: 2 },
    { name: "MD Maruf Hossen", role: "Meta Ads Specialist", image: "/team/MD_Maruf_Hossen.png", bio: "Maruf is an expert in managing high-ROI Meta ad campaigns.", order: 3 },
    { name: "MD Sourav Hasan", role: "Google Ads Specialist", image: "/team/MD_Sourav_Hasan.png", bio: "Sourav manages precision-targeted Google Ads for maximum performance.", order: 4 },
    { name: "Omer Faruqe Anas", role: "Social Media Specialist", image: "/team/Omer_Faruqe_Anas.png", bio: "Anas handles strategic social engagement and brand visibility.", order: 5 }
  ];
  for (const m of team) await prisma.teamMember.create({ data: m });

  // 7. PAGE CONTENT & SECTIONS
  for (const p of PAGES_DATA) {
    const page = await prisma.pageContent.create({ 
      data: { 
        slug: p.slug, 
        title: p.slug.toUpperCase(), 
        metaTitle: p.metaTitle, 
        metaDescription: p.metaDescription 
      } 
    });
    for (const [idx, s] of p.sections.entries()) {
      await prisma.pageSection.create({ 
        data: { 
          pageId: page.id, 
          sectionKey: s.key, 
          sectionType: s.type, 
          label: s.key.toUpperCase(), 
          content: s.content, 
          order: idx 
        } 
      });
    }
  }

  // 8. CASE STUDIES
  const caseStudies = [
    {
      title: 'FruitsZone ERP System Development',
      slug: 'fruitszone-erp',
      client: 'FruitsZone',
      description: 'FruitsZone ERP is a comprehensive business management system designed to handle inventory, sales, orders, and operational workflows for a fruit distribution business. The goal was to digitize and streamline day-to-day operations, reduce manual errors, and improve overall efficiency.',
      challenge: 'Manual tracking of inventory leading to frequent errors; Difficulty managing orders and sales records efficiently; Lack of real-time business insights and reporting; Time-consuming administrative processes; No centralized system for managing operations.',
      solution: 'Developed a tailored ERP system focused on automation, accuracy, and usability. Created a clean and intuitive dashboard interface and automated key workflows such as inventory tracking, order processing, and reporting.',
      execution: [
        'Understanding Business Workflow',
        'System Architecture Planning',
        'UI/UX Design',
        'Development & Integration',
        'Testing & Deployment'
      ],
      results: [
        'Improved inventory accuracy and management',
        'Faster and more organized order processing',
        'Real-time business insights and reporting',
        'Reduced manual workload and human errors',
        'Centralized system for all operations'
      ],
      image: '/case-study/fruitszone-erp.png',
      stats: '100%',
      kpi: 'Operational Efficiency',
      tag: 'ERP Development',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS']
    },
    {
      title: 'West Bound Travels Website Development',
      slug: 'westbound-travels',
      client: 'West Bound Travels',
      description: 'A modern and clean digital platform for a travel & tourism agency that highlights scenic travel visuals and creates a luxury experience for visitors.',
      challenge: 'The client needed a professional website that represents their brand, creates a luxury experience for scenic travel visuals, and converts visitors into potential travelers.',
      solution: 'Designed a modern UI/UX interface and developed a responsive, speed-optimized website with SEO-friendly structure and user-focused navigation.',
      execution: [
        'Business Understanding',
        'Website Planning & Structure',
        'UI/UX Design',
        'Custom Development',
        'SEO-Ready Setup',
        'Testing & Launch'
      ],
      results: [
        'Easily explore travel destinations',
        'View the houseboat fleet and facilities',
        'Discover available travel packages',
        'Contact the travel consultant directly'
      ],
      image: '/case-study/westbound-travel.png',
      stats: '40%',
      kpi: 'Inquiry Growth',
      tag: 'Web Development',
      technologies: ['Next.js', 'React', 'Framer Motion', 'SEO']
    },
    {
      title: 'Umrah All Local SEO Strategy',
      slug: 'umrah-all-seo',
      client: 'Umrah All',
      description: 'An online marketplace platform that helps users discover and compare Umrah packages from multiple verified travel agents.',
      challenge: 'The platform needed to improve local search visibility so that users searching for Umrah services in specific locations could easily find the website and connect with agents.',
      solution: 'Implemented a strategic Local SEO approach, including in-depth keyword research, on-page optimization, and schema markup implementation.',
      execution: [
        'Local keyword research',
        'On-page SEO optimization',
        'Title, Meta, and Heading optimization',
        'Location-based content creation',
        'Schema markup implementation'
      ],
      results: [
        'Increased visibility in local search results',
        'Higher rankings for Umrah-related keywords',
        'Growth in targeted organic traffic',
        'Better discovery of verified travel agents'
      ],
      image: '/case-study/umrah-all.png',
      stats: '60%',
      kpi: 'Traffic Increase',
      tag: 'Local SEO',
      technologies: ['SEO', 'Local SEO', 'Keyword Research', 'Google Search Console']
    }
  ];

  for (const cs of caseStudies) {
    await prisma.caseStudy.create({ data: cs });
  }

  // 9. SITE SETTINGS
  await prisma.siteSettings.create({
    data: {
      id: 'global',
      siteName: 'RankNexis',
      siteTitleSuffix: 'RankNexis Strategy & Vision',
      siteDescription: 'Leading Digital Marketing Agency for Business Growth.',
      contactEmail: 'hello@ranknexis.com',
      contactPhone: '+880123456789',
      address: 'Dhaka, Bangladesh'
    }
  });

  console.log('✓ Ultimate Seed: Success! 60+ Normalized Sections Created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
