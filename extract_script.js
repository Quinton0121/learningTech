const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const c = await prisma.course.findUnique({ where: { id: 'cms1kpibu0001wfaoyhkvj9id' } });
    if (c && c.htmlContent) {
        const lines = c.htmlContent.split('\n');
        let inScript = false;
        let scriptBlock = [];
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('function playManimAnimation')) {
                inScript = true;
            }
            if (inScript) {
                scriptBlock.push(lines[i]);
            }
            if (inScript && lines[i].includes('</script>')) {
                break;
            }
        }
        console.log(scriptBlock.join('\n'));
    }
}
main().finally(() => prisma.$disconnect());
