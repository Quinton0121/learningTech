const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
    const c = await prisma.course.findUnique({ where: { id: 'cms7c77ap0001wfpk6qjc1nm7' } });
    if(c && c.htmlContent) {
        fs.writeFileSync('excel_b_course.html', c.htmlContent);
        console.log('Saved to excel_b_course.html');
    }
}

main().finally(() => prisma.$disconnect());
