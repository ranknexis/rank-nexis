import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const services = await prisma.service.findMany();
  console.log('Services Categories:', [...new Set(services.map(s => s.category))]);
  console.log('Total Services:', services.length);
  console.log('Services:', JSON.stringify(services, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
