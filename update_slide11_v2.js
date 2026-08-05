const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const courseId = 'cms7c77ap0001wfpk6qjc1nm7';
    const c = await prisma.course.findUnique({ where: { id: courseId } });
    if (!c || !c.htmlContent) {
        console.log("Course not found or empty.");
        return;
    }

    let content = c.htmlContent;
    
    const replacement = `<!-- Slide 11: Relative References Concept -->
    <div class="slide-container" id="slide-11">
        <div class="flex flex-col md:flex-row items-center gap-12 max-w-6xl w-full">
            <div class="flex-1 text-left">
                <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-fuchsia-400 text-sm font-semibold mb-4 tracking-wide">
                    STEP 10: RELATIVE REFERENCES
                </div>
                <h2 class="text-4xl font-bold mb-6">The True Power of Excel</h2>
                <p class="text-xl text-slate-300 mb-6 leading-relaxed">
                    Why do we use cell addresses like <code>A1</code> instead of typing the numbers directly? Because of <strong>Relative References</strong>.
                </p>
                <div class="bg-slate-800 p-8 rounded-2xl border border-fuchsia-900/50 shadow-xl mt-8">
                    <p class="text-slate-400 mb-6 font-semibold uppercase tracking-wider text-sm">Watch the magic happen:</p>
                    <ul id="s11-step-list" class="space-y-4 text-lg">
                        <li id="s11-step-1" class="text-fuchsia-400 font-bold scale-105 origin-left transform transition-all duration-300">1. Start with Row 1 Formula</li>
                        <li id="s11-step-2" class="text-slate-500 transition-all duration-300">2. Copy it down to Row 2</li>
                        <li id="s11-step-3" class="text-slate-500 transition-all duration-300">3. Excel updates the numbers automatically!</li>
                    </ul>
                    <button onclick="playManimAnimationS11()" class="mt-8 w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                        <i class="fa-solid fa-wand-magic-sparkles"></i> Animate Relative Reference
                    </button>
                </div>
            </div>
            
            <div class="flex-1 flex flex-col items-center justify-center w-full">
                <div class="bg-slate-800 p-8 rounded-2xl border border-fuchsia-900/50 shadow-2xl w-full max-w-md relative overflow-hidden">
                    <div id="s11-glow" class="absolute inset-0 bg-fuchsia-500/0 transition-colors duration-1000"></div>
                    
                    <div class="relative z-10 flex items-center justify-between mb-4 pb-4 border-b border-slate-700">
                        <div class="text-slate-400 font-mono">Row 1</div>
                        <div id="s11-row1-formula" class="text-2xl font-mono text-fuchsia-400 font-bold bg-slate-900 px-4 py-2 rounded-lg border border-slate-700 transition-all duration-500">=A<span class="text-white">1</span> + B<span class="text-white">1</span></div>
                    </div>
                    
                    <div class="relative z-10 flex justify-center my-8 h-12 items-center">
                        <div id="s11-clone-formula" class="absolute text-2xl font-mono text-fuchsia-400 font-bold bg-slate-900 px-4 py-2 rounded-lg border border-fuchsia-500 opacity-0 transition-all duration-1000" style="top: 80px;">=A<span class="text-white">1</span> + B<span class="text-white">1</span></div>
                        <i id="s11-arrow" class="fa-solid fa-arrow-down text-3xl text-slate-600 transition-all duration-500"></i>
                    </div>
                    
                    <div class="relative z-10 flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                        <div class="text-slate-400 font-mono">Row 2</div>
                        <div id="s11-row2-formula" class="text-2xl font-mono text-slate-600 font-bold bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 transition-all duration-500 opacity-50">Empty</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        window.playManimAnimationS11 = function() {
            const step1 = document.getElementById('s11-step-1');
            const step2 = document.getElementById('s11-step-2');
            const step3 = document.getElementById('s11-step-3');
            const row1 = document.getElementById('s11-row1-formula');
            const clone = document.getElementById('s11-clone-formula');
            const arrow = document.getElementById('s11-arrow');
            const row2 = document.getElementById('s11-row2-formula');
            const glow = document.getElementById('s11-glow');

            step1.className = 'text-fuchsia-400 font-bold scale-105 origin-left transform transition-all duration-300';
            step2.className = 'text-slate-500 transition-all duration-300';
            step3.className = 'text-slate-500 transition-all duration-300';
            step1.innerHTML = '1. Start with Row 1 Formula';
            step2.innerHTML = '2. Copy it down to Row 2';
            step3.innerHTML = '3. Excel updates the numbers automatically!';
            
            clone.style.transition = 'none';
            clone.style.opacity = '0';
            clone.style.transform = 'translateY(0)';
            clone.innerHTML = '=A<span class="text-white">1</span> + B<span class="text-white">1</span>';
            
            arrow.className = 'fa-solid fa-arrow-down text-3xl text-slate-600 transition-all duration-500';
            
            row2.className = 'text-2xl font-mono text-slate-600 font-bold bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 transition-all duration-500 opacity-50';
            row2.innerHTML = 'Empty';
            
            glow.className = 'absolute inset-0 bg-fuchsia-500/0 transition-colors duration-1000';
            
            void clone.offsetWidth;
            
            row1.classList.add('border-fuchsia-500', 'shadow-[0_0_15px_rgba(217,70,239,0.5)]');
            
            setTimeout(() => {
                step1.className = 'text-emerald-500 opacity-60 transition-all duration-300';
                step1.innerHTML = '<i class="fa-solid fa-check"></i> Start with Row 1 Formula';
                
                step2.className = 'text-fuchsia-400 font-bold scale-105 origin-left transform transition-all duration-300';
                
                row1.classList.remove('border-fuchsia-500', 'shadow-[0_0_15px_rgba(217,70,239,0.5)]');
                
                clone.style.transition = 'all 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
                clone.style.opacity = '1';
                clone.style.transform = 'translateY(110px)';
                
                arrow.classList.remove('text-slate-600');
                arrow.classList.add('text-fuchsia-500');
                
            }, 1500);
            
            setTimeout(() => {
                step2.className = 'text-emerald-500 opacity-60 transition-all duration-300';
                step2.innerHTML = '<i class="fa-solid fa-check"></i> Copy it down to Row 2';
                
                step3.className = 'text-fuchsia-400 font-bold scale-105 origin-left transform transition-all duration-300';
                
                clone.style.opacity = '0';
                
                row2.className = 'text-2xl font-mono text-fuchsia-400 font-bold bg-slate-900 px-4 py-2 rounded-lg border border-emerald-500 transition-all duration-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] opacity-100';
                row2.innerHTML = '=A<span class="text-emerald-400 text-3xl transition-all duration-500">2</span> + B<span class="text-emerald-400 text-3xl transition-all duration-500">2</span>';
                
                glow.className = 'absolute inset-0 bg-emerald-500/10 transition-colors duration-1000';
                
                arrow.classList.remove('text-fuchsia-500');
                arrow.classList.add('text-emerald-500');
                
                setTimeout(() => {
                    row2.innerHTML = '=A<span class="text-emerald-400">2</span> + B<span class="text-emerald-400">2</span>';
                    step3.className = 'text-emerald-500 opacity-60 transition-all duration-300';
                    step3.innerHTML = '<i class="fa-solid fa-check"></i> Excel updates the numbers automatically!';
                }, 1000);
                
            }, 3500);
        }
    </script>
    
    `;

    // Regex to match from "<!-- Slide 11..." to just before "<!-- Slide 12..."
    const regex = /<!-- Slide 11: Relative References Concept -->[\s\S]*?(?=<!-- Slide 12: The Fill Handle -->)/;
    
    if (regex.test(content)) {
        content = content.replace(regex, replacement);
        await prisma.course.update({
            where: { id: courseId },
            data: { htmlContent: content }
        });
        console.log("Course updated with better Manim-like animation!");
    } else {
        console.log("Regex did not match.");
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
