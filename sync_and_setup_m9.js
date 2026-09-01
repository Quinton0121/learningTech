const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log("=== M9 COURSE & ACCOUNT SETUP ===");

    // 1. Ensure Quinton user
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

    // 2. Upsert / Sync Interactive Courses
    // A) Excel A
    let excelAHtml = '';
    if (fs.existsSync('excel_a_course.html')) {
        excelAHtml = fs.readFileSync('excel_a_course.html', 'utf8');
    }
    const excelA = await prisma.course.upsert({
        where: { id: 'cms1kpibu0001wfaoyhkvj9id' },
        update: {
            title: 'Excel A 班',
            educatorId: quinton.id,
            isActive: false,
            isSynced: false,
            isPublic: true,
            isArchived: false,
            ...(excelAHtml ? { htmlContent: excelAHtml } : {})
        },
        create: {
            id: 'cms1kpibu0001wfaoyhkvj9id',
            title: 'Excel A 班',
            description: 'Excel A 班 - 基礎試算表操作與進階實戰。',
            educatorId: quinton.id,
            isActive: false,
            isSynced: false,
            isPublic: true,
            isArchived: false,
            htmlContent: excelAHtml,
            studentQuota: 50
        }
    });
    console.log("Setup Excel A:", excelA.id, excelA.title);

    // B) Excel B
    let excelBHtml = '';
    if (fs.existsSync('excel_b_course.html')) {
        excelBHtml = fs.readFileSync('excel_b_course.html', 'utf8');
    }
    const excelB = await prisma.course.upsert({
        where: { id: 'cms7c77ap0001wfpk6qjc1nm7' },
        update: {
            title: 'Excel B',
            educatorId: quinton.id,
            isActive: false,
            isSynced: false,
            isPublic: true,
            isArchived: false,
            ...(excelBHtml ? { htmlContent: excelBHtml } : {})
        },
        create: {
            id: 'cms7c77ap0001wfpk6qjc1nm7',
            title: 'Excel B',
            description: 'Excel B - 試算表實務與數據分析課程。',
            educatorId: quinton.id,
            isActive: false,
            isSynced: false,
            isPublic: true,
            isArchived: false,
            htmlContent: excelBHtml,
            studentQuota: 50
        }
    });
    console.log("Setup Excel B:", excelB.id, excelB.title);

    // C) Interactive Excel Sandbox
    let excelSandboxHtml = '';
    if (fs.existsSync('courses/excel/update_link.html')) {
        excelSandboxHtml = fs.readFileSync('courses/excel/update_link.html', 'utf8');
    }
    const excelSandbox = await prisma.course.upsert({
        where: { id: 'cmsbw15mt0001wfik3nfda058' },
        update: {
            title: 'What is Excel? | Interactive Learning',
            educatorId: quinton.id,
            isActive: false,
            isSynced: false,
            isPublic: true,
            isArchived: false,
            ...(excelSandboxHtml ? { htmlContent: excelSandboxHtml } : {})
        },
        create: {
            id: 'cmsbw15mt0001wfik3nfda058',
            title: 'What is Excel? | Interactive Learning',
            description: 'Interactive Excel sandbox and foundational spreadsheet lessons.',
            educatorId: quinton.id,
            isActive: false,
            isSynced: false,
            isPublic: true,
            isArchived: false,
            htmlContent: excelSandboxHtml,
            studentQuota: 100
        }
    });
    console.log("Setup Interactive Excel Sandbox:", excelSandbox.id, excelSandbox.title);

    // 3. Setup Blender Courses
    // A) Comprehensive 13-slide masterclass (blender_3d_navigation.html)
    let blenderNavHtml = '';
    if (fs.existsSync('blender_3d_navigation.html')) {
        blenderNavHtml = fs.readFileSync('blender_3d_navigation.html', 'utf8');
    } else if (fs.existsSync('courses/blender/interactive_blender_course.html')) {
        blenderNavHtml = fs.readFileSync('courses/blender/interactive_blender_course.html', 'utf8');
    }
    const blenderCourse1 = await prisma.course.upsert({
        where: { id: 'blender_45_basics_nav_01' },
        update: {
            title: 'Intro to 3D Navigation in Blender | BLENDER 4.5 BASICS',
            description: 'Comprehensive interactive 13-slide masterclass on 3D Viewport Navigation in Blender 4.5 based on CG Cookie tutorial.',
            educatorId: quinton.id,
            isActive: false,
            isSynced: false,
            isPublic: true,
            isArchived: false,
            ...(blenderNavHtml ? { htmlContent: blenderNavHtml } : {})
        },
        create: {
            id: 'blender_45_basics_nav_01',
            title: 'Intro to 3D Navigation in Blender | BLENDER 4.5 BASICS',
            description: 'Comprehensive interactive 13-slide masterclass on 3D Viewport Navigation in Blender 4.5 based on CG Cookie tutorial.',
            educatorId: quinton.id,
            isActive: false,
            isSynced: false,
            isPublic: true,
            isArchived: false,
            htmlContent: blenderNavHtml,
            studentQuota: 100
        }
    });
    console.log("Setup Blender Masterclass:", blenderCourse1.id, blenderCourse1.title);

    // B) Interactive 3D Viewport sandbox tutorial (interactive_blender_navigation_tutorial.html)
    let blenderTutorialHtml = '';
    if (fs.existsSync('courses/blender/interactive_blender_navigation_tutorial.html')) {
        blenderTutorialHtml = fs.readFileSync('courses/blender/interactive_blender_navigation_tutorial.html', 'utf8');
    }
    const blenderCourse2 = await prisma.course.upsert({
        where: { id: 'blender_nav_tutorial_01' },
        update: {
            title: 'Blender Basics | 3D Navigation',
            description: 'Interactive 3D Navigation tutorial for Blender: Orbit, Pan, Zoom, and viewport controls.',
            educatorId: quinton.id,
            isActive: false,
            isSynced: false,
            isPublic: true,
            isArchived: false,
            ...(blenderTutorialHtml ? { htmlContent: blenderTutorialHtml } : {})
        },
        create: {
            id: 'blender_nav_tutorial_01',
            title: 'Blender Basics | 3D Navigation',
            description: 'Interactive 3D Navigation tutorial for Blender: Orbit, Pan, Zoom, and viewport controls.',
            educatorId: quinton.id,
            isActive: false,
            isSynced: false,
            isPublic: true,
            isArchived: false,
            htmlContent: blenderTutorialHtml,
            studentQuota: 100
        }
    });
    console.log("Setup Blender Sandbox Tutorial:", blenderCourse2.id, blenderCourse2.title);

    // 4. Verify all courses for Quinton
    const allQuintonCourses = await prisma.course.findMany({
        where: { educatorId: quinton.id, isArchived: false },
        select: {
            id: true,
            title: true,
            isActive: true,
            isPublic: true,
            isArchived: false
        }
    });

    console.log("\n=== ALL ACTIVE COURSES FOR QUINTON ON M9 ===");
    allQuintonCourses.forEach(c => {
        console.log(`- [${c.id}] ${c.title} (Active: ${c.isActive}, Public: ${c.isPublic})`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
