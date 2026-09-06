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

  const iotHtml = fs.readFileSync('courses/iot/introduction_to_iot_interactive_course.html', 'utf8');

  const courseId = 'iot_intro_masterclass_01';
  const courseTitle = 'Introduction to IoT | Interactive Masterclass';
  const courseDescription = 'Interactive Masterclass on Internet of Things (IoT): smart circuits, sensors, microcontrollers, cloud connectivity, and automated systems.';

  const existingCourse = await prisma.course.findFirst({
    where: {
      OR: [
        { id: courseId },
        { title: courseTitle }
      ]
    }
  });

  let iotCourse;
  if (!existingCourse) {
    iotCourse = await prisma.course.create({
      data: {
        id: courseId,
        title: courseTitle,
        description: courseDescription,
        educatorId: quinton.id,
        htmlContent: iotHtml,
        isActive: true,
        isPublic: true,
        studentQuota: 50,
        priceTokens: 10
      }
    });
    console.log('Successfully created new IoT course for Quinton:', iotCourse.id, iotCourse.title);
  } else {
    iotCourse = await prisma.course.update({
      where: { id: existingCourse.id },
      data: {
        educatorId: quinton.id,
        title: courseTitle,
        description: courseDescription,
        htmlContent: iotHtml,
        isActive: true,
        isPublic: true
      }
    });
    console.log('Successfully updated existing IoT course for Quinton:', iotCourse.id);
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
