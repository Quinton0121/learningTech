const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
    console.log("=== M9 ACCOUNT & COURSE VERIFICATION ===");

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

    // 2. Sync latest HTML content to database courses
    if (fs.existsSync('excel_a_course.html')) {
        const htmlA = fs.readFileSync('excel_a_course.html', 'utf8');
        const resA = await prisma.course.updateMany({
            where: {
                OR: [
                    { id: 'cms1kpibu0001wfaoyhkvj9id' },
                    { title: { contains: 'Excel A' } }
                ]
            },
            data: { htmlContent: htmlA }
        });
        console.log(`Synced Excel A HTML to DB (${resA.count} record)`);
    }

    if (fs.existsSync('excel_b_course.html')) {
        const htmlB = fs.readFileSync('excel_b_course.html', 'utf8');
        const resB = await prisma.course.updateMany({
            where: {
                OR: [
                    { id: 'cms7c77ap0001wfpk6qjc1nm7' },
                    { title: { contains: 'Excel B' } }
                ]
            },
            data: { htmlContent: htmlB }
        });
        console.log(`Synced Excel B HTML to DB (${resB.count} record)`);
    }

    console.log("Setup and course sync complete!");
}

main().finally(() => prisma.$disconnect());
