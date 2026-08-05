export function getSyncInjectorHTML() {
  return `
    <style>
    /* Auto-injected Mobile Touch Optimization */
    @media (max-width: 768px) {
      button, .demo-cell, .cursor-pointer, .s9-op-btn, .cell-input {
          min-height: 48px !important;
          min-width: 48px !important;
          touch-action: manipulation;
      }
      input, textarea, select { font-size: 16px !important; }
      .demo-grid {
          overflow-x: auto;
          max-width: 100vw;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 15px;
      }
      .slide-container p, .slide-container li { font-size: 1.1rem; line-height: 1.6; }
      .flex-col.md\\:flex-row { flex-direction: column !important; }
    }
    </style>
    <!-- Teacher Sync Controls -->
    <div id="teacher-controls" class="fixed top-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-50 bg-slate-800/80 backdrop-blur-md px-6 py-3 rounded-full border border-slate-700 shadow-xl hidden">
        <span class="text-white font-bold mr-2"><i class="fa-solid fa-chalkboard-user"></i> <span class="lang-en">Teacher Mode</span><span class="lang-zh hidden">教師模式</span></span>
        <button id="sync-btn" class="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1 rounded-lg font-semibold transition-colors">
            <span class="lang-en">Synchronize Class</span><span class="lang-zh hidden">同步課堂</span>
        </button>
        <button id="desync-btn" class="bg-slate-600 hover:bg-slate-500 text-white px-4 py-1 rounded-lg font-semibold transition-colors hidden">
            <span class="lang-en">Desynchronize</span><span class="lang-zh hidden">取消同步</span>
        </button>
        <div id="sync-indicator" class="w-3 h-3 rounded-full bg-red-500 ml-2 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
        <div class="h-6 border-l border-slate-600 mx-2"></div>
        <button id="publish-btn" class="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1 rounded-lg font-semibold transition-colors">
            <span class="lang-en">Publish Page</span><span class="lang-zh hidden">發佈頁面</span>
        </button>
        <button id="unpublish-btn" class="bg-rose-600 hover:bg-rose-500 text-white px-4 py-1 rounded-lg font-semibold transition-colors hidden">
            <span class="lang-en">Unpublish</span><span class="lang-zh hidden">取消發佈</span>
        </button>
        <span id="publish-status" class="text-indigo-400 text-xs font-bold hidden">Published!</span>
        
        <div class="h-6 border-l border-slate-600 mx-2"></div>
        <div class="relative group" tabindex="0" onclick="">
            <div class="flex items-center text-slate-300 text-sm font-bold bg-slate-700/50 px-3 py-1 rounded-full cursor-pointer">
                <i class="fa-solid fa-users mr-2 text-emerald-400"></i>
                <span id="active-students-count" class="text-emerald-400">0</span>
                <span class="ml-1 lang-en">Online</span><span class="ml-1 lang-zh hidden">上線</span>
                <button onclick="pollSyncState()" class="ml-3 hover:text-white transition-colors text-slate-400" title="Refresh">
                    <i id="refresh-icon" class="fa-solid fa-arrows-rotate"></i>
                </button>
            </div>
            <!-- Tooltip for active students -->
            <div id="active-students-tooltip" class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-48 bg-slate-800 border border-slate-600 rounded-lg shadow-xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] max-h-48 overflow-y-auto">
                <div class="text-xs text-slate-400 font-bold mb-2 uppercase tracking-wider border-b border-slate-700 pb-1">Active Students</div>
                <div id="active-students-list" class="flex flex-col gap-1 text-sm text-slate-200">
                    <div class="text-slate-500 italic text-xs">No students online</div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Student Sync Indicator -->
    <div id="student-indicator" class="fixed top-8 right-8 z-50 bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 shadow-xl hidden items-center gap-2">
        <div id="student-sync-dot" class="w-3 h-3 rounded-full bg-slate-500"></div>
        <span id="student-sync-text" class="text-slate-300 text-sm font-semibold"><span class="lang-en">Independent Mode</span><span class="lang-zh hidden">獨立模式</span></span>
    </div>

    <!-- Back to Dashboard -->
    <button id="back-dashboard-btn" onclick="goBack()" class="fixed top-8 left-8 z-[60] bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 shadow-xl text-slate-300 font-bold hover:text-white transition-colors flex items-center gap-2">
        <i class="fa-solid fa-arrow-left"></i>
        <span class="lang-en">Dashboard</span><span class="lang-zh hidden">返回首頁</span>
    </button>
    
    <!-- Language Toggle -->
    <button onclick="toggleLang()" class="fixed top-8 right-8 z-[60] bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 shadow-xl text-slate-300 font-bold hover:text-white transition-colors" style="margin-right: 200px;">
        <span class="lang-en">繁體中文</span><span class="lang-zh hidden">English</span>
    </button>`;
}

export function getSyncInjectorJS() {
  return `<script>
    // Auto-injected Touch Event Mapper
    document.addEventListener("DOMContentLoaded", () => {
        function mapTouch(selector) {
            document.querySelectorAll(selector).forEach(el => {
                if (!el.dataset.touchMapped) {
                    el.dataset.touchMapped = 'true';
                    el.addEventListener('touchstart', (e) => {
                        if(el.classList.contains('demo-cell') && !el.querySelector('input')) e.preventDefault();
                        if (el.onmousedown) el.onmousedown(e);
                        else if (el.onclick) el.onclick(e);
                    }, {passive: false});
                }
            });
        }
        mapTouch('.demo-cell, button, .cursor-pointer, .s9-op-btn, #manim-canvas, .group');
        setInterval(() => mapTouch('.demo-cell, button, .cursor-pointer, .s9-op-btn, .group'), 1000);
    });

    document.addEventListener("DOMContentLoaded", () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      let isTeacher = false;
            let isSynced = false;
            let publishedSlide = 0;

            const slides = document.querySelectorAll('.slide-container');
            const totalSlides = slides.length;
            let currentSlideIndex = 0;

            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const currentNumSpan = document.getElementById('current-slide-num');
            const progressBar = document.getElementById('progress-bar');
            
            window.goBack = function() {
                if (isTeacher) {
                    window.location.href = '/dashboard';
                } else {
                    window.location.href = '/learner-hub';
                }
            }
            
            window.pollSyncState = async function() {
                const refreshIcon = document.getElementById('refresh-icon');
                if (refreshIcon) refreshIcon.classList.add('fa-spin');
                const startTime = Date.now();
                
                const urlParams = new URLSearchParams(window.location.search);
                const courseIdParam = urlParams.get('id') ? \`&courseId=\${urlParams.get('id')}\` : '';
                try {
                    const res = await fetch(\`/api/courses/sync-state?slide=\${currentSlideIndex}\${courseIdParam}\`, {
                        headers: { 'Authorization': \`Bearer \${token}\` }
                    });
                    if (!res.ok) return;
                    const data = await res.json();
                    
                    isTeacher = (data.role === 'EDUCATOR' || data.role === 'ADMIN');
                    isSynced = data.isSynced;
                    publishedSlide = data.publishedSlide || 0;
                    
                    if (isTeacher) {
                        document.getElementById('teacher-controls').classList.remove('hidden');
                        document.getElementById('active-students-count').textContent = data.activeStudents || 0;
                        
                        if (data.activeStudentDetails) {
                            const listEl = document.getElementById('active-students-list');
                            if (listEl) {
                                if (data.activeStudentDetails.length === 0) {
                                    listEl.innerHTML = '<div class="text-slate-500 italic text-xs">No students online</div>';
                                } else {
                                    listEl.innerHTML = data.activeStudentDetails.map(s => {
                                        return \`<div class="flex justify-between items-center"><span class="truncate pr-2">\${s.name}</span><span class="bg-indigo-600/30 text-indigo-400 text-xs px-2 py-0.5 rounded flex-shrink-0">Slide \${s.slide + 1}</span></div>\`;
                                    }).join('');
                                }
                            }
                        }
                        
                        if (isSynced) {
                            document.getElementById('sync-btn').classList.add('hidden');
                            document.getElementById('desync-btn').classList.remove('hidden');
                            document.getElementById('sync-indicator').className = 'w-3 h-3 rounded-full bg-emerald-500 ml-2 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse';
                        } else {
                            document.getElementById('sync-btn').classList.remove('hidden');
                            document.getElementById('desync-btn').classList.add('hidden');
                            document.getElementById('sync-indicator').className = 'w-3 h-3 rounded-full bg-red-500 ml-2 shadow-[0_0_10px_rgba(239,68,68,0.8)]';
                        }
                    } else {
                        document.getElementById('student-indicator').classList.remove('hidden');
                        document.getElementById('student-indicator').style.display = 'flex';
                        if (isSynced) {
                            document.getElementById('student-sync-dot').className = 'w-3 h-3 rounded-full bg-emerald-500 animate-pulse';
                            const lang = localStorage.getItem('courseLang') || 'en';
                            document.getElementById('student-sync-text').textContent = lang === 'en' ? 'Live with Teacher' : '與教師同步中';
                            document.getElementById('student-sync-text').className = 'text-emerald-400 text-sm font-semibold';
                            
                            if (currentSlideIndex !== data.currentSlide) {
                                currentSlideIndex = data.currentSlide;
                            }
                        } else {
                            document.getElementById('student-sync-dot').className = 'w-3 h-3 rounded-full bg-slate-500';
                            const lang = localStorage.getItem('courseLang') || 'en';
                            document.getElementById('student-sync-text').textContent = lang === 'en' ? 'Independent Mode' : '獨立模式';
                            document.getElementById('student-sync-text').className = 'text-slate-300 text-sm font-semibold';
                            
                            if (currentSlideIndex > publishedSlide) {
                                currentSlideIndex = publishedSlide;
                            }
                        }
                        updateUI();
                    }
                    
                    // Auto-Logout Polling check
                    const authRes = await fetch('/api/auth/status', {
                        headers: { 'Authorization': \`Bearer \${token}\` }
                    });
                    const authData = await authRes.json();
                    if (!authData.active) {
                        localStorage.removeItem('token');
                        window.location.href = '/';
                        return;
                    }
                    
                } catch (e) {}
                
                const elapsed = Date.now() - startTime;
                if (elapsed < 1000) {
                    setTimeout(() => {
                        if (refreshIcon) refreshIcon.classList.remove('fa-spin');
                    }, 1000 - elapsed);
                } else {
                    if (refreshIcon) refreshIcon.classList.remove('fa-spin');
                }
                
                clearTimeout(window.syncTimeoutId);
                const nextInterval = (isSynced || isTeacher) ? 1000 : 10000;
                window.syncTimeoutId = setTimeout(pollSyncState, nextInterval);
            }
            
            pollSyncState();
            
            document.getElementById('sync-btn')?.addEventListener('click', () => {
                const urlParams = new URLSearchParams(window.location.search);
                const courseId = urlParams.get('id');
                fetch('/api/courses/sync-state', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${token}\` },
                    body: JSON.stringify({ isSynced: true, currentSlide: currentSlideIndex, courseId })
                }).then(() => pollSyncState());
            });
            
            document.getElementById('desync-btn')?.addEventListener('click', () => {
                const urlParams = new URLSearchParams(window.location.search);
                const courseId = urlParams.get('id');
                fetch('/api/courses/sync-state', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${token}\` },
                    body: JSON.stringify({ isSynced: false, currentSlide: currentSlideIndex, courseId })
                }).then(() => pollSyncState());
            });

            document.getElementById('publish-btn')?.addEventListener('click', () => {
                const urlParams = new URLSearchParams(window.location.search);
                const courseId = urlParams.get('id');
                fetch('/api/courses/sync-state', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${token}\` },
                    body: JSON.stringify({ publishedSlide: currentSlideIndex, courseId })
                }).then(() => {
                    publishedSlide = currentSlideIndex;
                    pollSyncState();
                    updateUI();
                    const status = document.getElementById('publish-status');
                    const lang = localStorage.getItem('courseLang') || 'en';
                    status.textContent = lang === 'en' ? 'Published!' : '已發佈！';
                    status.classList.remove('text-rose-400');
                    status.classList.add('text-indigo-400');
                    status.classList.remove('hidden');
                    setTimeout(() => status.classList.add('hidden'), 2000);
                });
            });

            document.getElementById('unpublish-btn')?.addEventListener('click', () => {
                const urlParams = new URLSearchParams(window.location.search);
                const courseId = urlParams.get('id');
                const newPublished = Math.max(0, currentSlideIndex - 1);
                fetch('/api/courses/sync-state', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${token}\` },
                    body: JSON.stringify({ publishedSlide: newPublished, courseId })
                }).then(() => {
                    publishedSlide = newPublished;
                    pollSyncState();
                    updateUI();
                    const status = document.getElementById('publish-status');
                    const lang = localStorage.getItem('courseLang') || 'en';
                    status.textContent = lang === 'en' ? 'Unpublished!' : '已取消發佈！';
                    status.classList.remove('text-indigo-400');
                    status.classList.add('text-rose-400');
                    status.classList.remove('hidden');
                    setTimeout(() => status.classList.add('hidden'), 2000);
                });
            });
    });
  </script>`;
}
