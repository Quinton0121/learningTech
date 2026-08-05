const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);
  
  const trialExpiresAt = new Date();
  trialExpiresAt.setDate(trialExpiresAt.getDate() + 30);
  
  const user = await prisma.user.create({
    data: {
      email: 'admin@edusphere.com',
      passwordHash: passwordHash,
      name: 'Admin',
      role: 'ADMIN',
      authType: 'EMAIL',
      trialExpiresAt: trialExpiresAt
    }
  });
  console.log('User created:', user.email);
}

main().catch(console.error).finally(() => prisma.$disconnect());
