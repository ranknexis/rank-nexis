import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
    const pages = await prisma.pageContent.count();
    const sections = await prisma.pageSection.count();
    const blogs = await prisma.blog.count();
    const team = await prisma.teamMember.count();
    
    console.log(`Pages: ${pages}`);
    console.log(`Sections: ${sections}`);
    console.log(`Blogs: ${blogs}`);
    console.log(`Team: ${team}`);
    
    const homepage = await prisma.pageContent.findFirst({ where: { slug: 'home' } });
    console.log(`Home Metadata: ${homepage?.metaTitle}`);
}

check();
