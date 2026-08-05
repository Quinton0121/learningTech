const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const htmlContent = fs.readFileSync('courses/excel/update_link.html', 'utf8');

  // We can either update the existing Excel course or create a new one.
  // Let's create a new one or update if it exists.
  let course = await prisma.course.findFirst({
    where: { title: 'What is Excel? | Interactive Learning' }
  });

  if (!course) {
    // We need an educator to attach to
    let admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    if (!admin) {
        admin = await prisma.user.create({
            data: { email: 'admin@test.com', role: 'ADMIN', authType: 'EMAIL' }
        });
    }

    course = await prisma.course.create({
      data: {
        title: 'What is Excel? | Interactive Learning',
        description: 'Interactive Excel sandbox course.',
        htmlContent: htmlContent,
        educatorId: admin.id,
        isActive: true,
        isPublic: true
      }
    });
    console.log('Created new course:', course.id);
  } else {
    course = await prisma.course.update({
      where: { id: course.id },
      data: { htmlContent: htmlContent }
    });
    console.log('Updated existing course:', course.id);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
