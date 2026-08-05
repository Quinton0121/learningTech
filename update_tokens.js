const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.user.updateMany({ data: { tokens: 900 } });
  console.log("Updated tokens");
}
main();
