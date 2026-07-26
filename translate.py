import re

html = open(r'c:\learning_tech\public\course.html', 'r', encoding='utf-8').read()

replacements = [
    (r"What is a Spreadsheet\?", r'<span class="lang-en">What is a Spreadsheet?</span><span class="lang-zh hidden">什麼是試算表？</span>'),
    (r"Before we write formulas, we need to understand the grid\. It's simpler than you think\.", r'<span class="lang-en">Before we write formulas, we need to understand the grid. It\'s simpler than you think.</span><span class="lang-zh hidden">在撰寫公式之前，我們需要了解網格。它比你想像的還要簡單。</span>'),
    (r"Press Right Arrow or Click Next to begin", r'<span class="lang-en">Press Right Arrow or Click Next to begin</span><span class="lang-zh hidden">按向右鍵或點擊「下一步」開始</span>'),
    
    (r"STEP 1: THE STRUCTURE", r'<span class="lang-en">STEP 1: THE STRUCTURE</span><span class="lang-zh hidden">第一步：結構</span>'),
    (r"It's just Columns and Rows\.", r'<span class="lang-en">It\'s just Columns and Rows.</span><span class="lang-zh hidden">它只是由直欄 (Columns) 和橫列 (Rows) 組成。</span>'),
    (r"Columns go down", r'<span class="lang-en">Columns go down</span><span class="lang-zh hidden">直欄向下</span>'),
    (r"They are named with letters\. Hover here to see Column B\.", r'<span class="lang-en">They are named with letters. Hover here to see Column B.</span><span class="lang-zh hidden">它們以字母命名。將滑鼠懸停此處查看 B 欄。</span>'),
    (r"Rows go across", r'<span class="lang-en">Rows go across</span><span class="lang-zh hidden">橫列向右</span>'),
    (r"They are named with numbers\. Hover here to see Row 3\.", r'<span class="lang-en">They are named with numbers. Hover here to see Row 3.</span><span class="lang-zh hidden">它們以數字命名。將滑鼠懸停此處查看第 3 列。</span>'),

    (r"STEP 2: THE ADDRESS", r'<span class="lang-en">STEP 2: THE ADDRESS</span><span class="lang-zh hidden">第二步：地址</span>'),
    (r"Where they meet is a <span class=\"text-emerald-400\">Cell</span>\.", r'<span class="lang-en">Where they meet is a <span class="text-emerald-400">Cell</span>.</span><span class="lang-zh hidden">它們相交的地方叫做 <span class="text-emerald-400">儲存格 (Cell)</span>。</span>'),
    (r"Every box on the screen has a unique name, created by combining its Column Letter and Row Number\.", r'<span class="lang-en">Every box on the screen has a unique name, created by combining its Column Letter and Row Number.</span><span class="lang-zh hidden">螢幕上的每個格子都有一個獨特的名稱，由其欄位字母和列數組合而成。</span>'),
    (r"Try it! Type a cell address \(like B2 or D3\):", r'<span class="lang-en">Try it! Type a cell address (like B2 or D3):</span><span class="lang-zh hidden">試試看！輸入一個儲存格地址 (例如 B2 或 D3)：</span>'),
    (r"Find Cell", r'<span class="lang-en">Find Cell</span><span class="lang-zh hidden">尋找儲存格</span>'),
    (r"Please enter a valid cell between A1 and D3\.", r'<span class="lang-en">Please enter a valid cell between A1 and D3.</span><span class="lang-zh hidden">請輸入 A1 到 D3 之間的有效儲存格。</span>'),

    (r"STEP 3: THE MAGIC", r'<span class="lang-en">STEP 3: THE MAGIC</span><span class="lang-zh hidden">第三步：魔法</span>'),
    (r"Cells talk to each other\.", r'<span class="lang-en">Cells talk to each other.</span><span class="lang-zh hidden">儲存格之間會互相溝通。</span>'),
    (r"Instead of adding numbers together, you add the <em>Cells</em> together\. If the numbers inside change, the total updates automatically\.", r'<span class="lang-en">Instead of adding numbers together, you add the <em>Cells</em> together. If the numbers inside change, the total updates automatically.</span><span class="lang-zh hidden">你不是將數字相加，而是將 <em>儲存格</em> 相加。如果裡面的數字改變，總和會自動更新。</span>'),
    (r"Cell A1", r'<span class="lang-en">Cell A1</span><span class="lang-zh hidden">儲存格 A1</span>'),
    (r"Cell B1", r'<span class="lang-en">Cell B1</span><span class="lang-zh hidden">儲存格 B1</span>'),
    (r"Change Numbers Automatically", r'<span class="lang-en">Change Numbers Automatically</span><span class="lang-zh hidden">自動更改數字</span>'),

    (r"STEP 4: THE SECRET KEY", r'<span class="lang-en">STEP 4: THE SECRET KEY</span><span class="lang-zh hidden">第四步：秘密鑰匙</span>'),
    (r"The Magic <span class=\"text-pink-400\">Equals</span> Sign", r'<span class="lang-en">The Magic <span class="text-pink-400">Equals</span> Sign</span><span class="lang-zh hidden">神奇的 <span class="text-pink-400">等號</span></span>'),
    (r"By default, if you type \"5\+5\" into a cell, Excel just thinks it's a piece of text\.", r'<span class="lang-en">By default, if you type "5+5" into a cell, Excel just thinks it\'s a piece of text.</span><span class="lang-zh hidden">預設情況下，如果你在儲存格中輸入 "5+5"，Excel 只會認為它是一段文字。</span>'),
    (r"To tell Excel you want it to act as a calculator, you <strong>must</strong> start with an equals sign \(<code>=</code>\)\. This is called <strong>Syntax</strong>\.", r'<span class="lang-en">To tell Excel you want it to act as a calculator, you <strong>must</strong> start with an equals sign (<code>=</code>). This is called <strong>Syntax</strong>.</span><span class="lang-zh hidden">要告訴 Excel 你想讓它作為計算機運作，你 <strong>必須</strong> 以等號 (<code>=</code>) 開頭。這稱為 <strong>語法 (Syntax)</strong>。</span>'),
    (r"Try it out in the Formula Bar below:", r'<span class="lang-en">Try it out in the Formula Bar below:</span><span class="lang-zh hidden">在下方的資料編輯列中試試看：</span>'),
    (r"Type <code class=\"bg-slate-900 px-2 py-1 rounded text-pink-400\">10\+20</code>", r'<span class="lang-en">Type <code class="bg-slate-900 px-2 py-1 rounded text-pink-400">10+20</code></span><span class="lang-zh hidden">輸入 <code class="bg-slate-900 px-2 py-1 rounded text-pink-400">10+20</code></span>'),
    (r"Then, add an equals sign at the front: <code class=\"bg-slate-900 px-2 py-1 rounded text-pink-400\">=10\+20</code>", r'<span class="lang-en">Then, add an equals sign at the front: <code class="bg-slate-900 px-2 py-1 rounded text-pink-400">=10+20</code></span><span class="lang-zh hidden">然後，在前面加一個等號：<code class="bg-slate-900 px-2 py-1 rounded text-pink-400">=10+20</code></span>'),
    (r"Empty", r'<span class="lang-en">Empty</span><span class="lang-zh hidden">空白</span>'),
    (r"What you see in the cell:", r'<span class="lang-en">What you see in the cell:</span><span class="lang-zh hidden">你在儲存格中看到的內容：</span>'),

    (r"STEP 5: POINT AND CLICK", r'<span class="lang-en">STEP 5: POINT AND CLICK</span><span class="lang-zh hidden">第五步：點擊操作</span>'),
    (r"Building Formulas by Clicking", r'<span class="lang-en">Building Formulas by Clicking</span><span class="lang-zh hidden">透過點擊建立公式</span>'),
    (r"You don't have to type cell addresses manually\. It's much faster to just click them! Let's try calculating <code>=A2-B1</code>\.", r'<span class="lang-en">You don\'t have to type cell addresses manually. It\'s much faster to just click them! Let\'s try calculating <code>=A2-B1</code>.</span><span class="lang-zh hidden">你不需要手動輸入儲存格地址。直接點擊它們會快得多！讓我們試著計算 <code>=A2-B1</code>。</span>'),
    (r"Follow these steps:", r'<span class="lang-en">Follow these steps:</span><span class="lang-zh hidden">請依照以下步驟操作：</span>'),
    (r"1\. Select the cell <strong>C2</strong>", r'<span class="lang-en">1. Select the cell <strong>C2</strong></span><span class="lang-zh hidden">1. 選擇儲存格 <strong>C2</strong></span>'),
    (r"2\. Type the equal sign \(<strong>=</strong>\)", r'<span class="lang-en">2. Type the equal sign (<strong>=</strong>)</span><span class="lang-zh hidden">2. 輸入等號 (<strong>=</strong>)</span>'),
    (r"3\. Click cell <strong>A2</strong> \(320\)", r'<span class="lang-en">3. Click cell <strong>A2</strong> (320)</span><span class="lang-zh hidden">3. 點擊儲存格 <strong>A2</strong> (320)</span>'),
    (r"4\. Type the minus sign \(<strong>-</strong>\)", r'<span class="lang-en">4. Type the minus sign (<strong>-</strong>)</span><span class="lang-zh hidden">4. 輸入減號 (<strong>-</strong>)</span>'),
    (r"5\. Click cell <strong>B1</strong> \(39\)", r'<span class="lang-en">5. Click cell <strong>B1</strong> (39)</span><span class="lang-zh hidden">5. 點擊儲存格 <strong>B1</strong> (39)</span>'),
    (r"6\. Hit the <strong>Enter</strong> button", r'<span class="lang-en">6. Hit the <strong>Enter</strong> button</span><span class="lang-zh hidden">6. 按下 <strong>Enter</strong> 鍵</span>'),

    (r"You did it! 281 is correct\.", r'<span class="lang-en">You did it! 281 is correct.</span><span class="lang-zh hidden">你做到了！281 是正確答案。</span>'),
    (r"Start Coding in the Sandbox", r'<span class="lang-en">Start Coding in the Sandbox</span><span class="lang-zh hidden">在沙盒中開始編碼</span>'),
    
    (r"Teacher Mode", r'<span class="lang-en">Teacher Mode</span><span class="lang-zh hidden">教師模式</span>'),
    (r"Synchronize Class", r'<span class="lang-en">Synchronize Class</span><span class="lang-zh hidden">同步課堂</span>'),
    (r"Desynchronize", r'<span class="lang-en">Desynchronize</span><span class="lang-zh hidden">取消同步</span>'),
    (r"Publish Page", r'<span class="lang-en">Publish Page</span><span class="lang-zh hidden">發佈頁面</span>'),
    (r"Unpublish", r'<span class="lang-en">Unpublish</span><span class="lang-zh hidden">取消發佈</span>'),
    (r"Independent Mode", r'<span class="lang-en">Independent Mode</span><span class="lang-zh hidden">獨立模式</span>'),
    (r"Live with Teacher", r'<span class="lang-en">Live with Teacher</span><span class="lang-zh hidden">與教師同步中</span>'),
]

for pat, rep in replacements:
    html = re.sub(pat, rep, html)

# Add toggle script
script_to_add = """
            window.toggleLang = function() {
                const current = localStorage.getItem('courseLang') || 'en';
                const next = current === 'en' ? 'zh' : 'en';
                localStorage.setItem('courseLang', next);
                applyLang();
            }

            window.applyLang = function() {
                const lang = localStorage.getItem('courseLang') || 'en';
                document.querySelectorAll('.lang-en').forEach(el => {
                    el.classList.toggle('hidden', lang === 'zh');
                });
                document.querySelectorAll('.lang-zh').forEach(el => {
                    el.classList.toggle('hidden', lang === 'en');
                });
                
                // Additional UI strings that are manipulated by JS
                const status = document.getElementById('publish-status');
                if (status) {
                    if (status.textContent === 'Published!' || status.textContent === '已發佈！') {
                        status.textContent = lang === 'en' ? 'Published!' : '已發佈！';
                    } else if (status.textContent === 'Unpublished!' || status.textContent === '已取消發佈！') {
                        status.textContent = lang === 'en' ? 'Unpublished!' : '已取消發佈！';
                    }
                }
            }
            
            // apply on load
            applyLang();
"""

html = html.replace("let isTeacher = false;", script_to_add + "\n            let isTeacher = false;")
html = html.replace("status.textContent = 'Published!';", "status.textContent = (localStorage.getItem('courseLang') === 'zh' ? '已發佈！' : 'Published!');")
html = html.replace("status.textContent = 'Unpublished!';", "status.textContent = (localStorage.getItem('courseLang') === 'zh' ? '已取消發佈！' : 'Unpublished!');")

# Add button UI next to student-indicator
btn_ui = """
    <!-- Language Toggle -->
    <button onclick="toggleLang()" class="fixed top-8 right-8 z-[60] bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 shadow-xl text-slate-300 font-bold hover:text-white transition-colors" style="margin-right: 200px;">
        <span class="lang-en">繁體中文</span><span class="lang-zh hidden">English</span>
    </button>
"""

html = html.replace("<!-- Progress Indicator -->", btn_ui + "\n    <!-- Progress Indicator -->")

with open(r'c:\learning_tech\public\course.html', 'w', encoding='utf-8') as f:
    f.write(html)
