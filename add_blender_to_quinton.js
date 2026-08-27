const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const quinton = await prisma.user.findFirst({
    where: { email: 'quinton0121@gmail.com' }
  });

  if (!quinton) {
    throw new Error('Quinton user not found!');
  }

  console.log('Found Quinton user:', quinton.id, quinton.name, quinton.email);

  // 1. Update blender_45_basics_nav_01 educatorId to quinton.id
  const existingBlender = await prisma.course.findUnique({
    where: { id: 'blender_45_basics_nav_01' }
  });
  if (existingBlender) {
    await prisma.course.update({
      where: { id: 'blender_45_basics_nav_01' },
      data: { educatorId: quinton.id }
    });
    console.log('Updated blender_45_basics_nav_01 educator to Quinton');
  }

  // 2. Read interactive_blender_navigation_tutorial.html from courses/blender/
  const tutorialHtml = fs.readFileSync('courses/blender/interactive_blender_navigation_tutorial.html', 'utf8');

  let tutorialCourse = await prisma.course.findFirst({
    where: {
      title: 'Blender Basics | 3D Navigation'
    }
  });

  if (!tutorialCourse) {
    tutorialCourse = await prisma.course.create({
      data: {
        title: 'Blender Basics | 3D Navigation',
        description: 'Interactive 3D Navigation tutorial for Blender: Orbit, Pan, Zoom, and viewport controls.',
        educatorId: quinton.id,
        htmlContent: tutorialHtml,
        isActive: true,
        isPublic: true,
        studentQuota: 50
      }
    });
    console.log('Created new course for Quinton:', tutorialCourse.id, tutorialCourse.title);
  } else {
    tutorialCourse = await prisma.course.update({
      where: { id: tutorialCourse.id },
      data: {
        educatorId: quinton.id,
        htmlContent: tutorialHtml,
        isActive: true,
        isPublic: true
      }
    });
    console.log('Updated existing course for Quinton:', tutorialCourse.id);
  }

  // List all courses taught by Quinton
  const quintonCourses = await prisma.course.findMany({
    where: { educatorId: quinton.id }
  });
  console.log('\nAll courses owned by Quinton (' + quintonCourses.length + '):');
  quintonCourses.forEach(c => {
    console.log(' - [' + c.id + '] ' + c.title + ' (Active: ' + c.isActive + ', Public: ' + c.isPublic + ')');
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
