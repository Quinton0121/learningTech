const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
    const c = await prisma.course.findUnique({ where: { id: 'cms1kpibu0001wfaoyhkvj9id' } });
    if (c && c.htmlContent) {
        fs.writeFileSync('excel_a_dumped_scripts.html', c.htmlContent);
    }
}
main().finally(() => prisma.$disconnect());
