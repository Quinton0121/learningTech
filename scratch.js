const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const courses = await prisma.course.findMany({ where: { title: { contains: 'Excel' } } });
    if (courses.length > 0) {
        for(let c of courses) {
            console.log("Course ID:", c.id, "Title:", c.title);
            if(c.htmlContent) {
                const matches = c.htmlContent.match(/slide-[0-9]+/g);
                console.log("Slides found:", matches ? [...new Set(matches)] : 'no slides');
                
                // Let's also check if "11" appears anywhere
                const page11 = c.htmlContent.match(/11/g);
                console.log("Occurrences of '11':", page11 ? page11.length : 0);
            }
        }
    } else {
        console.log('No Excel course found');
    }
}

main().finally(() => prisma.$disconnect());
