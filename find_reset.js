const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const courses = await prisma.course.findMany();
    for (let c of courses) {
        if (c.htmlContent && c.htmlContent.includes('reset')) {
            console.log("Course Title:", c.title, "ID:", c.id);
            // Print a snippet around 'reset'
            const lines = c.htmlContent.split('\n');
            for(let i=0; i<lines.length; i++) {
                if(lines[i].includes('reset')) {
                    console.log(`Line ${i}:`, lines[i].trim());
                }
            }
        }
    }
}

main().finally(() => prisma.$disconnect());
