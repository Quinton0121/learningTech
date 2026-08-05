const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const courses = await prisma.course.findMany();
    for (let c of courses) {
        if (c.htmlContent && (c.htmlContent.includes('playManim') || c.htmlContent.includes('animation'))) {
            console.log("Course Title:", c.title, "ID:", c.id);
        }
    }
}

main().finally(() => prisma.$disconnect());
