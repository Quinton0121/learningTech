const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    let content = fs.readFileSync('excel_b_course.html', 'utf8');

    const searchString = `<div class="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                        <div class="text-slate-400 font-mono">Row 2</div>
                        <div class="text-2xl font-mono text-fuchsia-400 font-bold bg-slate-900 px-4 py-2 rounded-lg">=A<span class="text-emerald-400">2</span> + B<span class="text-emerald-400">2</span></div>
                    </div>`;

    const replaceString = `<div class="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                        <div class="text-slate-400 font-mono">Row 2</div>
                        <div id="row2-formula" class="text-2xl font-mono text-fuchsia-400 font-bold bg-slate-900 px-4 py-2 rounded-lg">=A<span class="text-emerald-400">2</span> + B<span class="text-emerald-400">2</span></div>
                    </div>
                    <div class="mt-6 flex justify-center">
                        <button onclick="playManimAnimation()" class="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm flex items-center gap-2">
                            <i class="fa-solid fa-play"></i> Simulate Drag Down
                        </button>
                    </div>
                    <script>
                        window.playManimAnimation = function() {
                            const arrow = document.querySelector('#slide-11 .fa-arrow-down');
                            const row2Formula = document.getElementById('row2-formula');
                            if(arrow) {
                                arrow.classList.remove('animate-bounce');
                                arrow.style.transition = 'transform 1s cubic-bezier(0.25, 1, 0.5, 1), color 1s';
                                arrow.style.transform = 'translateY(40px) scale(1.5)';
                                arrow.style.color = '#e879f9';
                                
                                setTimeout(() => {
                                    arrow.style.transform = 'translateY(0px) scale(1)';
                                    arrow.style.color = '';
                                    arrow.classList.add('animate-bounce');
                                    if(row2Formula) {
                                        row2Formula.style.transition = 'all 0.5s ease';
                                        row2Formula.style.backgroundColor = '#4a044e';
                                        row2Formula.style.transform = 'scale(1.1)';
                                        setTimeout(() => {
                                            row2Formula.style.transform = 'scale(1)';
                                            row2Formula.style.backgroundColor = '#0f172a';
                                        }, 500);
                                    }
                                }, 1000);
                            }
                        }
                    </script>`;

    if (!content.includes(searchString)) {
        console.log("Could not find the target string to replace. Here is what we found nearby:");
        console.log(content.substring(content.indexOf("Row 2") - 100, content.indexOf("Row 2") + 200));
        return;
    }

    content = content.replace(searchString, replaceString);

    await prisma.course.update({
        where: { id: 'cms7c77ap0001wfpk6qjc1nm7' },
        data: { htmlContent: content }
    });
    console.log("Database updated successfully!");
}

main().finally(() => prisma.$disconnect());
