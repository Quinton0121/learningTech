const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log("=== M9 ACCOUNT VERIFICATION ===");

    // 1. Ensure Quinton Admin Account exists and is active
    let quinton = await prisma.user.findFirst({
        where: {
            OR: [
                { email: 'quinton0121@gmail.com' },
                { id: 'cms1kjyam0001wfxoffr8dilj' }
            ]
        }
    });

    const passwordHash = await bcrypt.hash('12345678', 10);
    const tenYearsFuture = new Date(Date.now() + 3650 * 24 * 60 * 60 * 1000);

    if (!quinton) {
        quinton = await prisma.user.create({
            data: {
                id: 'cms1kjyam0001wfxoffr8dilj',
                email: 'quinton0121@gmail.com',
                name: 'quinton',
                role: 'ADMIN',
                authType: 'EMAIL',
                passwordHash: passwordHash,
                trialExpiresAt: tenYearsFuture
            }
        });
        console.log("Created Quinton user on M9");
    } else {
        quinton = await prisma.user.update({
            where: { id: quinton.id },
            data: {
                email: 'quinton0121@gmail.com',
                role: 'ADMIN',
                passwordHash: passwordHash,
                trialExpiresAt: tenYearsFuture
            }
        });
        console.log("Updated Quinton user on M9:", quinton.id, quinton.email);
    }
}

main().finally(() => prisma.$disconnect());
