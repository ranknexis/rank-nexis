
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pages = await prisma.pageContent.findMany({
    select: { slug: true }
  });
  console.log('Available slugs:', pages.map(p => p.slug));
}

main();
