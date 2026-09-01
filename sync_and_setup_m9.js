const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
    console.log("=== M9 ACCOUNT & COURSE FULL SYNC ===");

    // 1. Ensure Quinton Admin Account exists
    const passwordHash = await bcrypt.hash('12345678', 10);
    const tenYearsFuture = new Date(Date.now() + 3650 * 24 * 60 * 60 * 1000);

    const quinton = await prisma.user.upsert({
        where: { email: 'quinton0121@gmail.com' },
        update: {
            name: 'quinton',
            role: 'ADMIN',
            passwordHash: passwordHash,
            trialExpiresAt: tenYearsFuture
        },
        create: {
            id: 'cms1kjyam0001wfxoffr8dilj',
            email: 'quinton0121@gmail.com',
            name: 'quinton',
            role: 'ADMIN',
            authType: 'EMAIL',
            passwordHash: passwordHash,
            trialExpiresAt: tenYearsFuture
        }
    });
    console.log("User verified:", quinton.id, quinton.email);

    // 2. Excel A
    if (fs.existsSync('excel_a_course.html')) {
        const htmlA = fs.readFileSync('excel_a_course.html', 'utf8');
        await prisma.course.upsert({
            where: { id: 'cms1kpibu0001wfaoyhkvj9id' },
            update: {
                title: 'Excel A 班',
                educatorId: quinton.id,
                htmlContent: htmlA,
                isPublic: true
            },
            create: {
                id: 'cms1kpibu0001wfaoyhkvj9id',
                title: 'Excel A 班',
                description: 'Excel Interactive Course A',
                educatorId: quinton.id,
                htmlContent: htmlA,
                isPublic: true,
                studentQuota: 50
            }
        });
        console.log("Upserted Excel A course (id: cms1kpibu0001wfaoyhkvj9id)");
    }

    // 3. Excel B
    if (fs.existsSync('excel_b_course.html')) {
        const htmlB = fs.readFileSync('excel_b_course.html', 'utf8');
        await prisma.course.upsert({
            where: { id: 'cms7c77ap0001wfpk6qjc1nm7' },
            update: {
                title: 'Excel B',
                educatorId: quinton.id,
                htmlContent: htmlB,
                isPublic: true
            },
            create: {
                id: 'cms7c77ap0001wfpk6qjc1nm7',
                title: 'Excel B',
                description: 'Excel Interactive Course B',
                educatorId: quinton.id,
                htmlContent: htmlB,
                isPublic: true,
                studentQuota: 50
            }
        });
        console.log("Upserted Excel B course (id: cms7c77ap0001wfpk6qjc1nm7)");
    }

    // 4. Blender 4.5 Basics
    let blenderHtml = '';
    if (fs.existsSync('courses/blender/interactive_blender_navigation_tutorial.html')) {
        blenderHtml = fs.readFileSync('courses/blender/interactive_blender_navigation_tutorial.html', 'utf8');
    }

    await prisma.course.upsert({
        where: { id: 'blender_45_basics_nav_01' },
        update: {
            title: 'Intro to 3D Navigation in Blender | BLENDER 4.5 BASICS',
            educatorId: quinton.id,
            isPublic: true,
            htmlContent: blenderHtml || undefined
        },
        create: {
            id: 'blender_45_basics_nav_01',
            title: 'Intro to 3D Navigation in Blender | BLENDER 4.5 BASICS',
            description: 'Learn 3D Navigation in Blender 4.5',
            educatorId: quinton.id,
            htmlContent: blenderHtml || '<h1>Blender 4.5 Course</h1>',
            isPublic: true,
            studentQuota: 50
        }
    });

    console.log("All courses seeded and synced successfully!");
}

main().finally(() => prisma.$disconnect());
