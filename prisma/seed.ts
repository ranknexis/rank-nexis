import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { Pool } from 'pg';
import { BLOG_CONTENT } from './blogContent';
import { CASE_STUDIES_DATA } from './caseStudyData';
import { PAGES_DATA } from './pageData';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {

  await prisma.pageSection.deleteMany();
  await prisma.pageContent.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.blogCategory.deleteMany();
  await prisma.caseStudy.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSettings.deleteMany();

  const hashedAdminPassword = await bcrypt.hash('RankNexis@2026', 10);
  const teamPassword = await bcrypt.hash('RankNexis@2026', 10);

  const adminUser = await prisma.user.create({
    data: { email: 'ranknexis@gmail.com', password: hashedAdminPassword, name: 'Rank Nexis', role: 'ADMIN', passwordSet: true }
  });

  const teamData = [
    { name: "S.M. Tanveer", role: "SEO Specialist", image: "/team/S_M_Tanveer-1.png", bio: "Focused on helping businesses rank higher on search engines through expert SEO strategies and analysis.", order: 1 },
    { name: "MD Sourav Hasan", role: "Google Ads Specialist", image: "/team/MD_Sourav_Hasan-1.png", bio: "Specialist in Google Ads, dedicated to helping brands reach the right customers through targeted advertising.", order: 2 },
    { name: "MD Maruf Hossen", role: "Meta Ads Specialist", image: "/team/MD_Maruf_Hossen.png", bio: "Expert in designing and managing effective ad campaigns across Facebook and Instagram to drive ROI.", order: 3 },
    {
      name: "Moniruzzaman Mahdi", role: "Full Stack Developer", image: "/team/Moniruzzaman_Mahdi.png", bio: "Expert in building scalable and modern web applications with cutting-edge technologies.", order: 4, socials: [
        {
          "url": "https://www.linkedin.com/in/moniruzzaman-mahdi",
          "platform": "LinkedIn"
        },
        {
          "url": "https://github.com/mahdimonir",
          "platform": "GitHub"
        },
        {
          "url": "https://moniruzzaman-mahdi.vercel.app",
          "platform": "Portfolio"
        }
      ]
    },
    { name: "MD Jonayed Hosen Munna", role: "Graphic & UI/UX Specialist", image: "/team/MD_Jonayed_Hosen_Munna.png", bio: "Specializing in crafting premium brand identities and user-centric digital interfaces that harmonize aesthetics with functionality.", order: 5 },
    { name: "Fahad Bin Mamun", role: "Video & Motion Specialist", image: "/team/Fahad_Bin_Mamun.png", bio: "Expert in cinematic video editing and motion graphics, focused on delivering high-impact visual narratives for global brands.", order: 6 },
  ];

  const teamMembers = [];
  for (const m of teamData) {
    const nameParts = m.name.split(" ");
    const lastName = nameParts[nameParts.length - 1].toLowerCase();
    const email = `${lastName}@ranknexis.com`;

    const user = await prisma.user.create({
      data: {
        email,
        password: teamPassword,
        name: m.name,
        role: 'TEAM_MEMBER',
        passwordSet: true
      }
    });

    const member = await prisma.teamMember.create({
      data: {
        ...m,
        userId: user.id
      }
    });

    teamMembers.push({ ...member, user });
  }

  const categoryData = [
    { name: 'Strategy', slug: 'strategy' },
    { name: 'Tutorials', slug: 'tutorials' },
    { name: 'Insights', slug: 'insights' }
  ];
  const categories = await Promise.all(categoryData.map(c => prisma.blogCategory.create({ data: c })));

  const blogs = [
    {
      title: 'What is a Digital Marketing Agency',
      slug: 'what-is-digital-marketing-agency',
      content: BLOG_CONTENT['what-is-digital-marketing-agency'],
      image: '/blog-images/what-is-a-digital-marketing-agency-2.webp',
      metaTitle: 'What is a Digital Marketing Agency? The Secret to Rapid Business Growth',
      metaDescription: 'Discover what a digital marketing agency is and how it can help your business grow online using SEO, social media, and paid ads.',
      categoryId: categories[2].id,
      authorId: teamMembers[0].user.id
    },
    {
      title: 'How to Choose a Digital Marketing Agency',
      slug: 'how-choose-digital-marketing-agency',
      content: BLOG_CONTENT['how-choose-digital-marketing-agency'],
      image: '/blog-images/how-to-choose-a-digital-marketing-agency.webp',
      metaTitle: 'How to Choose a Digital Marketing Agency: A Complete Guide for Smart Decisions',
      metaDescription: 'Learn the essential factors to consider when selecting the right digital marketing partner for your business success.',
      categoryId: categories[0].id,
      authorId: teamMembers[1].user.id
    },
    {
      title: 'Why Do You Need a Digital Marketing Agency',
      slug: 'why-do-you-need-a-digital-marketing-agency-1',
      content: BLOG_CONTENT['why-do-you-need-a-digital-marketing-agency-1'],
      image: '/blog-images/why-do-you-need-a-digital-marketing-agency-1.webp',
      metaTitle: 'Why Do You Need a Digital Marketing Agency for Success',
      metaDescription: 'Explore the top reasons why hiring a professional agency is crucial for your business growth in the digital-first world.',
      categoryId: categories[2].id,
      authorId: teamMembers[2].user.id
    },
    {
      title: 'How to Remove Two-Factor Authentication in Facebook Ads Manager (2026)',
      slug: 'how-remove-2fa-facebook-ads',
      content: BLOG_CONTENT['how-remove-2fa-facebook-ads'],
      image: '/blog-images/how-to-remove-two-factor-authentication-in-facebook-ads-manager.webp',
      metaTitle: 'How to Remove Two-Factor Authentication in Facebook Ads Manager Step-by-Step',
      metaDescription: 'A complete legal guide on managing and disabling 2FA for your Facebook ad account to regain access and improve security management.',
      categoryId: categories[1].id,
      authorId: teamMembers[2].user.id
    },
    {
      title: 'Car Review Website SEO Optimization: The Ultimate 2026 Guide',
      slug: 'car-review-website-seo',
      content: BLOG_CONTENT['car-review-website-seo'],
      image: '/blog-images/car-review-website-seo-optimization-2-1.webp',
      metaTitle: 'Car Review Website SEO Optimization Guide for Traffic Growth',
      metaDescription: 'Master SEO for car review websites. Learn keyword research, on-page optimization, and technical SEO for the automotive niche.',
      categoryId: categories[0].id,
      authorId: teamMembers[0].user.id
    },
    {
      title: 'Website Design Services for Aesthetic Clinics (2026 Guide)',
      slug: 'website-design-aesthetic-clinics',
      content: BLOG_CONTENT['website-design-aesthetic-clinics'],
      image: '/blog-images/website-design-services-for-aesthetic-clinics.webp',
      metaTitle: 'Website Design for Aesthetic Clinics: Attract More Clients in 2026',
      metaDescription: 'Discover the secrets of effective website design for aesthetic clinics. Build trust and convert visitors into patients.',
      categoryId: categories[0].id,
      authorId: teamMembers[5].user.id
    },
    {
      title: 'Google Ads Optimization for Doctors: Top 10 SERP Analysis',
      slug: 'google-ads-optimization-doctors',
      content: BLOG_CONTENT['google-ads-optimization-doctors'],
      image: '/blog-images/google-ads-optimization-for-doctors.webp',
      metaTitle: 'Google Ads Optimization for Doctors: Dominate Search Results',
      metaDescription: 'Learn how to optimize Google Ads for medical professionals. Analysis of top-performing ads and strategies for patient acquisition.',
      categoryId: categories[0].id,
      authorId: teamMembers[1].user.id
    },
    {
      title: 'Google Ads for Doctors: Complete SEO Outline',
      slug: 'google-ads-for-doctors',
      content: BLOG_CONTENT['google-ads-for-doctors'],
      image: '/blog-images/google-ads-for-doctors-outline.webp',
      metaTitle: 'Google Ads for Doctors: A Strategic Search Engine Guide',
      metaDescription: 'A comprehensive outline for medical professionals to master Google Ads and local search visibility.',
      categoryId: categories[0].id,
      authorId: teamMembers[1].user.id
    },
    {
      title: 'How to Get Rid of Facebook Ads (2026 Guide)',
      slug: 'how-to-get-rid-of-facebook-ads',
      content: BLOG_CONTENT['how-to-get-rid-of-facebook-ads'],
      image: '/blog-images/how-to-get-rid-of-facebook-ads.webp',
      metaTitle: 'How to Get Rid of Facebook Ads Easily in 2026',
      metaDescription: 'Take control of your feed. Learn how to hide ads, adjust preferences, and limit data tracking on Facebook.',
      categoryId: categories[1].id,
      authorId: teamMembers[3].user.id
    }
  ];

  for (const b of blogs) await prisma.blog.create({ data: b });

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

  await prisma.siteSettings.create({
    data: {
      id: "global",
      siteName: "RankNexis",
      siteTitleSuffix: "RankNexis Strategy & Vision",
      contactEmail: "ranknexis@gmail.com",
      address: "Chattogram, Bangladesh",
      contactPhone: "+880 1949-883830"
    }
  });

  for (const p of PAGES_DATA) {
    
    const page = await prisma.pageContent.create({
      data: {
        slug: p.slug,
        title: p.slug.toUpperCase(),
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
        metaKeywords: p.metaKeywords || [],
        canonicalUrl: p.canonicalUrl || null,
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

  for (const cs of CASE_STUDIES_DATA) {
    await prisma.caseStudy.create({ data: cs });
  }

}

main()
  .catch((e) => {
    
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
