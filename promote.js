const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const res = await prisma.user.updateMany({
    data: { role: 'ADMIN' }
  });
  console.log('Promoted:', res);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
