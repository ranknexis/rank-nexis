import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
    const blogs = await prisma.blog.findMany({ select: { title: true, image: true } });
    console.log('Blog Images Mapping:');
    blogs.forEach(b => console.log(`- ${b.title}: ${b.image}`));
}

check();
