const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
    console.log("=== M9 ACCOUNT & COURSE SAFE SYNC ===");

    // 1. Ensure Quinton Admin Account exists
    const passwordHash = await bcrypt.hash('12345678', 10);
    const tenYearsFuture = new Date(Date.now() + 3650 * 24 * 60 * 60 * 1000);

    const quinton = await prisma.user.upsert({
        where: { email: 'quinton0121@gmail.com' },
        update: {
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

    // 2. Excel A - Only update htmlContent, NEVER overwrite title or reset enrollments
    if (fs.existsSync('excel_a_course.html')) {
        const htmlA = fs.readFileSync('excel_a_course.html', 'utf8');
        await prisma.course.upsert({
            where: { id: 'cms1kpibu0001wfaoyhkvj9id' },
            update: {
                htmlContent: htmlA,
                publishedSlide: 18
            },
            create: {
                id: 'cms1kpibu0001wfaoyhkvj9id',
                title: 'Form 1A SpreadSheet',
                description: 'Excel Interactive Course A',
                educatorId: quinton.id,
                htmlContent: htmlA,
                isPublic: true,
                studentQuota: 50,
                publishedSlide: 18
            }
        });
        console.log("Upserted Excel A course (id: cms1kpibu0001wfaoyhkvj9id)");
    }

    // 3. Excel B - Only update htmlContent, NEVER overwrite title
    if (fs.existsSync('excel_b_course.html')) {
        const htmlB = fs.readFileSync('excel_b_course.html', 'utf8');
        await prisma.course.upsert({
            where: { id: 'cms7c77ap0001wfpk6qjc1nm7' },
            update: {
                htmlContent: htmlB,
                publishedSlide: 18
            },
            create: {
                id: 'cms7c77ap0001wfpk6qjc1nm7',
                title: 'Excel B',
                description: 'Excel Interactive Course B',
                educatorId: quinton.id,
                htmlContent: htmlB,
                isPublic: true,
                studentQuota: 50,
                publishedSlide: 18
            }
        });
        console.log("Upserted Excel B course (id: cms7c77ap0001wfpk6qjc1nm7)");
    }

    // 4. Blender 4.5 Basics - Only update htmlContent, NEVER overwrite title
    let blenderHtml = '';
    if (fs.existsSync('courses/blender/interactive_blender_navigation_tutorial.html')) {
        blenderHtml = fs.readFileSync('courses/blender/interactive_blender_navigation_tutorial.html', 'utf8');
    } else if (fs.existsSync('blender_3d_navigation.html')) {
        blenderHtml = fs.readFileSync('blender_3d_navigation.html', 'utf8');
    }

    await prisma.course.upsert({
        where: { id: 'blender_45_basics_nav_01' },
        update: {
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

    // 5. IoT Masterclass - Update htmlContent
    let iotHtml = '';
    if (fs.existsSync('courses/iot/introduction_to_iot_interactive_course.html')) {
        iotHtml = fs.readFileSync('courses/iot/introduction_to_iot_interactive_course.html', 'utf8');
    } else if (fs.existsSync('introduction_to_iot_interactive_course.html')) {
        iotHtml = fs.readFileSync('introduction_to_iot_interactive_course.html', 'utf8');
    }

    if (iotHtml) {
        await prisma.course.upsert({
            where: { id: 'iot_intro_masterclass_01' },
            update: {
                htmlContent: iotHtml
            },
            create: {
                id: 'iot_intro_masterclass_01',
                title: 'Introduction to IoT | Interactive Masterclass',
                description: 'Interactive Masterclass on Internet of Things (IoT): smart circuits, sensors, microcontrollers, cloud connectivity, and automated systems.',
                educatorId: quinton.id,
                htmlContent: iotHtml,
                isPublic: true,
                studentQuota: 50
            }
        });
        console.log("Upserted IoT course with full HTML content!");
    }

    // 6. Automatically ensure all enrollments across different courses have independent User accounts
    const allEnrollments = await prisma.enrollment.findMany({
        include: { user: true }
    });

    const seenUserCourses = new Map(); // userId -> first courseId
    for (const enroll of allEnrollments) {
        if (!enroll.user) continue;
        if (!seenUserCourses.has(enroll.userId)) {
            seenUserCourses.set(enroll.userId, enroll.courseId);
        } else {
            // This user is attached to multiple courses! Clone a separate User for this course
            const origUser = enroll.user;
            const shortId = enroll.courseId.slice(-6);
            let newEmail = origUser.email;
            if (newEmail) {
                const [local, domain] = newEmail.includes('@') ? newEmail.split('@') : [newEmail, 'learningtech.local'];
                newEmail = `${local}_${shortId}@${domain}`;
            } else {
                newEmail = `student_${origUser.studentId || enroll.pcId || Date.now()}_${shortId}@learningtech.local`;
            }

            const clonedUser = await prisma.user.create({
                data: {
                    name: origUser.name,
                    studentId: origUser.studentId,
                    email: newEmail,
                    passwordHash: origUser.passwordHash,
                    role: origUser.role,
                    authType: origUser.authType || 'EMAIL',
                    mustChangePassword: origUser.mustChangePassword,
                    trialExpiresAt: origUser.trialExpiresAt
                }
            });

            await prisma.enrollment.update({
                where: { id: enroll.id },
                data: { userId: clonedUser.id }
            });
            console.log(`Successfully separated shared student "${origUser.name || origUser.id}" into course ${enroll.courseId}`);
        }
    }

    console.log("All courses and student rosters seeded, synced, and isolated successfully!");
}

main().finally(() => prisma.$disconnect());


