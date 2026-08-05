const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.findUnique({ where: { email: 'Quinton0121@gmail.com' } });
  if (!user) {
    console.log('User not found!');
    return;
  }
  console.log('User:', user.email, 'Role:', user.role);
  if (user.passwordHash) {
    const isPasswordValid = await bcrypt.compare('12345678', user.passwordHash);
    console.log('Password 12345678 valid?', isPasswordValid);
  } else {
    console.log('No password hash found for user.');
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
