const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const courseId = 'cms1kpibu0001wfaoyhkvj9id'; // Excel A
    const c = await prisma.course.findUnique({ where: { id: courseId } });
    if (!c || !c.htmlContent) {
        console.log("Course not found or empty.");
        return;
    }

    let content = c.htmlContent;
    
    const searchString = `                    }, 50);

                    manimState = 0;`;

    const replaceString = `                    }, 50);
                    
                    btn.disabled = false;
                    btn.classList.remove('opacity-50', 'cursor-not-allowed');
                    manimState = 0;`;

    if (content.includes(searchString)) {
        content = content.replace(searchString, replaceString);
        await prisma.course.update({
            where: { id: courseId },
            data: { htmlContent: content }
        });
        console.log("Course Excel A fixed successfully!");
    } else {
        console.log("Search string not found!");
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
