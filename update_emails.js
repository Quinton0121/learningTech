const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.user.findMany({ where: { email: { not: null } } });
  for (const user of users) {
    if (user.email !== user.email.toLowerCase()) {
      await prisma.user.update({
        where: { id: user.id },
        data: { email: user.email.toLowerCase() }
      });
      console.log(`Updated email for ${user.email} -> ${user.email.toLowerCase()}`);
    }
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
