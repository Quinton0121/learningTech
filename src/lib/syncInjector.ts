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
    .sync-locked-btn {
      opacity: 0.35 !important;
      cursor: not-allowed !important;
      pointer-events: none !important;
    }
    #sync-toast {
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    </style>

    <!-- Teacher Sync Controls -->
    <div id="teacher-controls" class="fixed top-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-50 bg-slate-900/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-700 shadow-2xl hidden">
        <div class="flex items-center gap-2 pr-2 border-r border-slate-700">
            <i class="fa-solid fa-chalkboard-user text-indigo-400"></i>
            <span class="text-white font-bold text-sm">
                <span class="lang-en">Teacher</span><span class="lang-zh hidden">教師模式</span>
            </span>
        </div>
        
        <!-- Sync Toggle -->
        <button id="sync-btn" class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 shadow">
            <i class="fa-solid fa-tower-broadcast"></i>
            <span class="lang-en">Sync Class</span><span class="lang-zh hidden">同步課堂</span>
        </button>
        <button id="desync-btn" class="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-all hidden items-center gap-1.5 border border-slate-600 shadow">
            <i class="fa-solid fa-pause"></i>
            <span class="lang-en">Desync</span><span class="lang-zh hidden">取消同步</span>
        </button>
        <div id="sync-indicator" class="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" title="Sync Status"></div>
        
        <div class="h-5 border-l border-slate-700"></div>
        
        <!-- Publish Page Controls -->
        <button id="publish-btn" class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 shadow" title="Publish current slide to students">
            <i class="fa-solid fa-cloud-arrow-up"></i>
            <span class="lang-en">Publish Page</span><span class="lang-zh hidden">發佈頁面</span>
        </button>
        <button id="unpublish-btn" class="bg-rose-700 hover:bg-rose-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold transition-all hidden items-center gap-1 shadow" title="Roll back published page limit">
            <i class="fa-solid fa-backward-step"></i>
            <span class="lang-en">Unpublish</span><span class="lang-zh hidden">取消發佈</span>
        </button>
        <span id="published-badge" class="bg-indigo-950 border border-indigo-500/40 text-indigo-300 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">
            <span id="published-badge-text">Pub: Slide 1</span>
        </span>
        <span id="publish-status" class="text-indigo-400 text-xs font-bold hidden animate-pulse">Published!</span>
        
        <div class="h-5 border-l border-slate-700"></div>
        
        <!-- Active Students Indicator -->
        <div class="relative group" tabindex="0">
            <div class="flex items-center text-slate-300 text-xs font-bold bg-slate-800 px-3 py-1 rounded-full border border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors">
                <i class="fa-solid fa-users mr-1.5 text-emerald-400"></i>
                <span id="active-students-count" class="text-emerald-400 font-mono font-bold">0</span>
                <span class="ml-1 text-slate-400"><span class="lang-en">online</span><span class="lang-zh hidden">在線</span></span>
                <button onclick="pollSyncState()" class="ml-2 hover:text-white transition-colors text-slate-400" title="Refresh">
                    <i id="refresh-icon" class="fa-solid fa-arrows-rotate text-xs"></i>
                </button>
            </div>
            <!-- Tooltip for active students -->
            <div id="active-students-tooltip" class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] max-h-52 overflow-y-auto">
                <div class="text-[11px] text-slate-400 font-bold mb-2 uppercase tracking-wider border-b border-slate-800 pb-1 flex justify-between">
                    <span>Active Students</span>
                    <span id="active-students-tooltip-count" class="text-emerald-400 font-mono font-bold">0</span>
                </div>
                <div id="active-students-list" class="flex flex-col gap-1.5 text-xs text-slate-200">
                    <div class="text-slate-500 italic text-xs">No students online</div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Student Sync Indicator -->
    <div id="student-indicator" class="fixed top-6 right-6 z-50 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 shadow-xl hidden items-center gap-2.5">
        <div id="student-sync-dot" class="w-2.5 h-2.5 rounded-full bg-slate-500"></div>
        <span id="student-sync-text" class="text-slate-300 text-xs font-semibold">
            <span class="lang-en">Independent Mode</span><span class="lang-zh hidden">獨立模式</span>
        </span>
        <span id="student-published-badge" class="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700 font-mono hidden"></span>
    </div>

    <!-- Sync Toast Alert -->
    <div id="sync-toast" class="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-[70] bg-slate-900/95 border border-indigo-500/50 text-slate-100 text-sm px-5 py-2.5 rounded-xl shadow-2xl opacity-0 pointer-events-none translate-y-2 flex items-center gap-2">
        <i id="sync-toast-icon" class="fa-solid fa-circle-check text-emerald-400"></i>
        <span id="sync-toast-text">Notification</span>
    </div>

    <!-- Back to Dashboard -->
    <button id="back-dashboard-btn" onclick="goBack()" class="fixed top-6 left-6 z-[60] bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 shadow-xl text-slate-300 text-xs font-bold hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-2">
        <i class="fa-solid fa-arrow-left"></i>
        <span class="lang-en">Dashboard</span><span class="lang-zh hidden">返回首頁</span>
    </button>
    
    <!-- Language Toggle Button -->
    <button id="lang-toggle-btn" onclick="toggleLang()" class="fixed top-6 right-6 z-[60] bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 shadow-xl text-slate-300 text-xs font-bold hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5" style="margin-right: 170px;">
        <i class="fa-solid fa-globe text-cyan-400"></i>
        <span id="lang-toggle-text">繁體中文</span>
    </button>`;
}

export function getSyncInjectorJS(injectedCourseId?: string) {
  return `<script>
    // --- 1. Global Translation Dictionary & Language Engine ---
    window.__SYNC_COURSE_ID__ = "${injectedCourseId || ''}";

    const TRANSLATION_MAP = {
      // General UI & Nav
      "Teacher Mode": "教師模式",
      "Teacher": "教師模式",
      "Sync Class": "同步課堂",
      "Synchronize Class": "同步課堂",
      "Desync": "取消同步",
      "Desynchronize": "取消同步",
      "Publish Page": "發佈頁面",
      "Unpublish": "取消發佈",
      "Published!": "已發佈！",
      "Unpublished!": "已取消發佈！",
      "Dashboard": "返回首頁",
      "Online": "在線",
      "online": "在線",
      "Active Students": "在線學生",
      "No students online": "暫無學生在線",
      "Live with Teacher": "與教師同步中",
      "Independent Mode": "獨立模式",
      "Press Right Arrow or Click Next to begin": "按向右鍵或點擊下一步開始",
      "Click Next to continue": "點擊下一步繼續",
      "Find Cell": "定位單元格",
      "Next": "下一步",
      "Previous": "上一步",
      "Prev": "上一步",
      "STEP": "步驟",
      "Your Tasks:": "任務清單：",
      "Exercise: Revenue Total": "實戰練習：計算總收入",
      "Excellent Work!": "太棒了！練習完成！",

      // Excel Basics Course
      "What is a Spreadsheet?": "什麼是試算表？",
      "Before we write formulas, we need to understand the grid. It's simpler than you think.": "在編寫公式之前，我們需要先了解網格。它比你想象的更簡單。",
      "STEP 1: THE STRUCTURE": "步驟 1：基本結構",
      "It's just Columns and Rows.": "它只是由欄（Columns）和列（Rows）組成。",
      "Columns go down": "欄（直向）向下延伸",
      "They are named with letters. Hover here to see Column B.": "欄以英文字母命名。懸停此處查看 B 欄。",
      "Rows go across": "列（橫向）橫跨展開",
      "They are named with numbers. Hover here to see Row 3.": "列以數字命名。懸停此處查看第 3 列。",
      "STEP 2: THE ADDRESS": "步驟 2：單元格地址",
      "Where they meet is a Cell.": "欄與列相交的地方就是 單元格 (Cell)。",
      "Every box on the screen has a unique name, created by combining its Column Letter and Row Number.": "屏幕上的每個方格都有一個唯一的名稱，由其欄字母和列數字組合而成。",
      "Try it! Type a cell address (like B2 or D3):": "試試看！輸入單元格地址（如 B2 或 D3）：",
      "Please enter a valid cell between A1 and D3.": "請輸入 A1 至 D3 之間的有效單元格。",
      "STEP 3: THE CONNECTION": "步驟 3：相互關聯",
      "Cells talk to each other.": "單元格之間可以相互參照與通訊。",
      "A cell doesn't just hold raw text. It can look at another cell and borrow its value.": "單元格不僅可以存儲文字，還可以讀取並引用其他單元格的值。",
      "Hover below to see cell C2 borrow data from cell A1:": "懸停下方查看單元格 C2 如何引用單元格 A1 的數據：",
      "Borrow A1": "引用 A1",
      "STEP 4: FORMULAS": "步驟 4：公式入門",
      "The Magic Equals Sign": "神奇的 等號 (=)",
      "In Excel, typing an = tells the computer: 'Don't display what I write, CALCULATE it!'": "在 Excel 中，輸入 = 是告訴電腦：「不要直接顯示我寫的字，而是幫我計算結果！」",
      "What you see in the cell:": "你在單元格中看到的：",
      "What Excel actually does behind the scenes:": "Excel 在後台實際執行的計算：",
      "STEP 5: POINT & CLICK": "步驟 5：點選公式",
      "Building Formulas by Clicking": "透過點選單元格構建公式",
      "You don't need to type cell names manually. Just type = and click the cells you want!": "你不需要手動輸入單元格名稱。只需輸入 = 然後點擊你想選取的單元格即可！",
      "STEP 6: RANGES": "步驟 6：範圍選取",
      "Selecting Everything": "框選連續區域",
      "Grouping Cells Together": "將多個單元格組合成範圍",
      "A colon (:) means 'through'. So A1:A4 means all cells from A1 down to A4.": "冒號 (:) 表示「到」的意思。因此 A1:A4 代表從 A1 到 A4 的所有連續單元格。",
      "STEP 7: MATH OPERATORS": "步驟 7：運算符號",
      "Excel's Calculator Keys": "Excel 的計算符號",
      "Calculate the Cost": "計算商品總價",
      "Addition (+)": "加法 (+)",
      "Subtraction (-)": "減法 (-)",
      "Multiplication (*)": "乘法 (*)",
      "Division (/)": "除法 (/)",
      "STEP 8: DYNAMIC UPDATES": "步驟 8：動態更新",
      "The True Power of Excel": "Excel 的真正強大之處",
      "When you change an input number, all connected formulas update INSTANTLY!": "當你修改原始數據時，所有相關聯的公式結果都會立即自動更新！",
      "STEP 9: AUTO-FILL": "步驟 9：自動填充",
      "Drag to Copy": "拖曳填充複製公式",
      "Double click or drag the green square (Fill Handle) to copy formulas down the whole column!": "雙擊或拖曳右下角的綠色方塊（填充柄），即可將公式快速套用到整欄！",
      "STEP 10: PRACTICE": "步驟 10：動手實戰",
      "Task 1: Calculate Total in D2 (=B2*C2)": "任務 1：在 D2 計算總額 (=B2*C2)",
      "Task 2: Calculate Total in D3 (=B3*C3)": "任務 2：在 D3 計算總額 (=B3*C3)",
      "Task 3: Calculate Grand Total in D5 (=SUM(D2:D4))": "任務 3：在 D5 計算總銷售額 (=SUM(D2:D4))",
      "Item": "商品品名",
      "Quantity": "數量",
      "Price ($)": "單價 ($)",
      "Total ($)": "總額 ($)",
      "Apples": "蘋果",
      "Bananas": "香蕉",
      "Oranges": "柳橙",
      "GRAND TOTAL:": "總計金額：",
      "Visualize the Shift": "觀察公式位移",

      // Blender 3D Course
      "Blender 3D Navigation & Transform Masterclass": "Blender 3D 視圖導航與變換大師課",
      "Intro to 3D Navigation in Blender": "Blender 3D 視圖導航基礎",
      "BLENDER 4.5 BASICS": "Blender 4.5 基礎入門",
      "Welcome to 3D Space": "歡迎來到 3D 空間",
      "Into the 3D View": "走進 3D 視界",
      "The 3 Core Windows": "三大核心工作視窗",
      "X, Y, and Z.": "X、Y 與 Z 軸",
      "Moving the Camera": "移動視角相機",
      "Orbit": "旋轉視角 (Orbit)",
      "Pan": "平移視角 (Pan)",
      "Zoom": "縮放視角 (Zoom)",
      "Trackpad Touch Gestures": "觸控板手勢操作",
      "Interactive 3D Sandbox": "互動式 3D 沙盒",
      "The Move Tool": "移動工具 (Move Tool)",
      "The G (Grab) Hotkey": "G (抓取/移動) 快捷鍵",
      "Navigate the Maze": "穿越 3D 迷宮",
      "Extraction Complete!": "成功抵達傳送門！",
      "The Rotate Tool & R": "旋轉工具與 R 鍵",
      "Rotate to Fit": "旋轉吻合障礙框",
      "Wall Cleared!": "成功穿過障礙牆！",
      "The Scale Tool & S": "縮放工具與 S 鍵",
      "The Scale Cage Tool": "邊框縮放工具 (Scale Cage)",
      "STEP 1: THE INTERFACE": "步驟 1：界面結構",
      "STEP 2: THE COMPASS": "步驟 2：空間坐標",
      "STEP 3: THE HOLY TRINITY": "步驟 3：三大視角操作",
      "STEP 4: LAPTOP WORKFLOW": "步驟 4：筆電觸控板操作",
      "STEP 5: TRY IT YOURSELF": "步驟 5：動手親身體驗",
      "STEP 6: TRANSFORMS": "步驟 6：對象變換",
      "STEP 7: PRO WORKFLOW": "步驟 7：高手快捷操作",
      "GAME: HOTKEY MAZE": "小遊戲：快捷鍵迷宮",
      "STEP 8: ROTATION": "步驟 8：三維旋轉",
      "GAME: HOLE IN THE WALL": "小遊戲：穿牆大考驗",
      "STEP 9: SCALING & PLANES": "步驟 9：縮放與平面鎖定",
      "STEP 10: BOUNDING BOX SCALING": "步驟 10：邊框錨點縮放",
      "Navigating in 3D space is the first—and most important—skill you'll need to master in Blender.": "在 3D 空間中靈活導航，是掌握 Blender 的第一步，也是最重要的基本功。",
      "Blender's default layout is divided into specialized modular panes. Hover or click each card below to see its exact place and role:": "Blender 的預設佈局分為專屬模組化視窗。懸停或點選下方卡片查看其位置與作用：",
      "Your physical workspace. This is where you create, model, navigate, transform, and view your 3D geometry in real space.": "你的實體 3D 工作區。在此處進行建模、導航、變換及預覽三維物件。",
      "The hierarchical scene list (like File Explorer). Shows all objects, collections, cameras, and lights with visibility and render toggles.": "場景層級清單（類似檔案總管）。顯示所有物件、集合、攝影機與燈光，並提供顯示與渲染開關。",
      "The parameters dashboard. Adjust numeric transforms, materials, modifiers, camera focal length, and render engines here.": "屬性參數控制台。在此調整精確數值、材質球、修改器、攝影機焦距與渲染引擎。",
      "In a spreadsheet, you have Columns and Rows (2D). In Blender, you have three dimensions, represented by colored axes.": "在試算表中只有欄與列（2D 平面）。而在 Blender 中擁有三個維度，分別以顏色軸線表示。",
      "Click a movement type below to see how it affects your perspective.": "點擊下方的移動類型，觀察視角如何相應變化。",
      "Rotates the camera around the center of your view. Imagine walking in a circle around an object.": "圍繞視角中心旋轉相機。想像自己繞著物件走了一圈。",
      "Slides the camera horizontally or vertically, parallel to the screen.": "在平行於螢幕的方向上水平或垂直滑動相機。",
      "Moves the camera closer to or further from the center of focus.": "將相機移近或拉遠焦點中心。",
      "If you are on a MacBook or Windows laptop with a precision touchpad, a middle-mouse button isn't required. You can use two-finger gestures.": "如果你使用 MacBook 或 Windows 精確觸控板，無需滑鼠中鍵即可透過雙指手勢操作。",
      "Drag with two fingers in any direction.": "使用雙指朝任意方向拖曳。",
      "Hold Shift + drag with two fingers": "按住 Shift + 雙指拖曳",
      "Pinch in and out with two fingers.": "使用雙指張開或捏合。",
      "(Or hold Ctrl + drag two fingers)": "（或按住 Ctrl + 雙指拖曳）",
      "Use authentic mouse or trackpad controls inside the 3D canvas to inspect the classic Blender scene.": "在 3D 畫布中使用滑鼠或觸控板操作，全方位檢視經典的 Blender 初始場景。",
      "In Blender's left toolbar, selecting the Move Tool displays the 3D Translation Gizmo with colored arrow handles.": "在 Blender 左側工具列選擇移動工具，即可顯示帶有彩色箭頭軸柄的 3D 移動手柄 (Gizmo)。",
      "Instead of aiming at small gizmo arrows, Blender pros use modal hotkeys on physical 3D rails:": "Blender 高手通常不瞄準微小箭頭，而是使用極速模態快捷鍵鎖定 3D 軸向：",
      "Use Blender translation hotkeys to guide the cube to the glowing green portal.": "使用 Blender 位移快捷鍵引導立方體抵達綠色發光傳送門。",
      "You navigated the corridors and cleared the laser barriers using authentic Blender modal hotkeys.": "你成功運用正統 Blender 模態快捷鍵穿過通道並突破雷射防線。",
      "Spinning objects in 3D turns them around an axis line. In Blender, use the Rotate Tool rings or tap R .": "3D 旋轉是讓物件圍繞特定軸線旋轉。在 Blender 中可使用旋轉手柄圓環或直接按 R 鍵。",
      "Spin the 3D block along X , Y , or Z so its orientation matches the cutout in the barrier wall.": "沿著 X、Y 或 Z 軸旋轉 3D 方塊，使其角度精確吻合障礙牆上的鏤空缺口。",
      "You rotated the 3D block to the exact Euler orientation required to slip through the laser aperture.": "你成功將方塊旋轉至精確的歐拉角，順利穿過雷射閘口。",
      "The gizmo gives you 3 ways to resize: 1-Axis (Cubes), 2-Axis Plane (Flat Squares), or All 3 Axes (Outer Ring / S ).": "縮放手柄提供 3 種調整方式：單軸縮放（方塊柄）、雙軸平面縮放（平面方塊）或三軸等比縮放（外圈/S鍵）。",
      "Scales across two axes at once uniformly while strictly locking the perpendicular 3rd axis.": "同時在兩個軸向上等比縮放，並嚴格鎖定垂直的第三個軸向不變。",
      "In standard scaling, objects expand from their center pivot . The Scale Cage gives you a bounding box where dragging a handle scales from the opposite side .": "標準縮放是以物件中心為原點擴展；邊框縮放 (Scale Cage) 提供外框包圍盒，拖曳控制點時會以對邊為基準進行單側縮放。",
      "In 3D space, we have 3 axes: X (Red, Left/Right), Y (Green, Front/Back), and Z (Blue, Up/Down).": "在 3D 空間中，有三個軸向：X（紅色，左右）、Y（綠色，前後）以及 Z（藍色，上下）。",
      "Rotate View (Orbit)": "旋轉視角 (Orbit)",
      "Hold Middle Mouse Button (MMB) and drag to orbit around your 3D scene.": "按住滑鼠中鍵 (MMB) 並拖曳，即可圍繞 3D 場景旋轉視角。",
      "Pan View": "平移視角 (Pan)",
      "Hold Shift + Middle Mouse Button (MMB) and drag to pan the viewport.": "按住 Shift + 滑鼠中鍵 (MMB) 並拖曳，即可平移視圖。",
      "Zoom View": "縮放視角 (Zoom)",
      "Scroll the Mouse Wheel (or Ctrl + MMB drag) to zoom in and out.": "滾動滑鼠滾輪（或 Ctrl + 滑鼠中鍵拖曳）即可放大與縮小視圖。",
      "Numpad Navigation": "數字鍵盤快捷視角",
      "Numpad 1: Front View, Numpad 3: Right View, Numpad 7: Top View.": "數字鍵 1：正視圖，數字鍵 3：右視圖，數字鍵 7：頂視圖。",
      "Focus on Selected Object": "聚焦選中物件",
      "Press Numpad Period (.) to center and frame the selected object.": "按數字鍵盤小數點 (.) 即可快速聚焦並居中顯示選中的物件。",
      "Interactive Practice": "互動操作練習",
      "Try navigating around the 3D cube using Orbit, Pan, and Zoom!": "試著使用旋轉、平移與縮放操作，圍繞 3D 立方體進行視角導航！",
      "3D Viewport": "3D 視圖區域",
      "Rotate": "旋轉",
      "Pan": "平移",
      "Zoom": "縮放",
      "Reset View": "重置視角",
      "Middle Click": "中鍵點擊",
      "Scroll Wheel": "滾輪"
    };

    function translateTextNode(node, isZh) {
      if (!node.nodeValue) return;
      if (!node._enText) node._enText = node.nodeValue;
      
      if (isZh) {
        let text = node._enText;
        for (const [en, zh] of Object.entries(TRANSLATION_MAP)) {
          if (text.includes(en)) {
            text = text.split(en).join(zh);
          }
        }
        node.nodeValue = text;
      } else {
        node.nodeValue = node._enText;
      }
    }

    function walkTranslate(el, isZh) {
      if (!el || el.id === 'teacher-controls' || el.id === 'student-indicator') return;
      
      // Translate attributes
      if (el.getAttribute) {
        ['data-title', 'data-badge', 'data-narration', 'placeholder', 'title'].forEach(attr => {
          const val = el.getAttribute(attr);
          if (val) {
            const origKey = '_en_' + attr;
            if (!el[origKey]) el[origKey] = val;
            if (isZh) {
              let newVal = el[origKey];
              for (const [en, zh] of Object.entries(TRANSLATION_MAP)) {
                if (newVal.includes(en)) newVal = newVal.split(en).join(zh);
              }
              el.setAttribute(attr, newVal);
            } else {
              el.setAttribute(attr, el[origKey]);
            }
          }
        });
      }

      // Translate text nodes
      for (const child of el.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
          translateTextNode(child, isZh);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          walkTranslate(child, isZh);
        }
      }
    }

    window.applyCourseLanguage = function(lang) {
      localStorage.setItem('courseLang', lang);
      const isZh = (lang === 'zh');

      const langBtnText = document.getElementById('lang-toggle-text');
      if (langBtnText) langBtnText.textContent = isZh ? 'English' : '繁體中文';

      document.querySelectorAll('.lang-en').forEach(el => {
        if (isZh) el.classList.add('hidden');
        else el.classList.remove('hidden');
      });
      document.querySelectorAll('.lang-zh').forEach(el => {
        if (isZh) el.classList.remove('hidden');
        else el.classList.add('hidden');
      });

      // Walk through slide containers and translate
      document.querySelectorAll('.slide-container, header, #sidebar, .instructions-pane, .active-cell-indicator').forEach(container => {
        walkTranslate(container, isZh);
      });

      // Update header step titles if present
      const activeSlide = document.querySelector('.slide-container.active');
      if (activeSlide) {
        const hBadge = document.getElementById('header-step-badge');
        if (hBadge) hBadge.textContent = activeSlide.getAttribute('data-badge') || hBadge.textContent;
        const hTitle = document.getElementById('header-step-title');
        if (hTitle) hTitle.textContent = activeSlide.getAttribute('data-title') || hTitle.textContent;
      }
    };

    window.toggleLang = function() {
      const current = localStorage.getItem('courseLang') || 'en';
      const next = (current === 'en') ? 'zh' : 'en';
      window.applyCourseLanguage(next);
      window.showSyncToast(next === 'zh' ? '已切換為繁體中文' : 'Switched to English', false);
    };

    window.showSyncToast = function(msg, isError) {
      const toast = document.getElementById('sync-toast');
      const text = document.getElementById('sync-toast-text');
      const icon = document.getElementById('sync-toast-icon');
      if (!toast || !text) return;

      text.textContent = msg;
      if (icon) {
        icon.className = isError ? 'fa-solid fa-circle-exclamation text-rose-400' : 'fa-solid fa-circle-check text-emerald-400';
      }
      toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
      toast.classList.add('opacity-100', 'translate-y-0');

      clearTimeout(window.__toastTimer);
      window.__toastTimer = setTimeout(() => {
        toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
        toast.classList.remove('opacity-100', 'translate-y-0');
      }, 2500);
    };

    // --- 2. Mobile Touch Event Mapper ---
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
        setInterval(() => mapTouch('.demo-cell, button, .cursor-pointer, .s9-op-btn, .group'), 1500);
    });

    // --- 3. Synchronization & Navigation Controller ---
    document.addEventListener("DOMContentLoaded", () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      let isTeacher = false;
      let isSynced = false;
      let publishedSlide = 0;
      let currentSlideIndex = 0;
      let isBroadcasting = false;

      // Extract Course ID reliably
      const urlParams = new URLSearchParams(window.location.search);
      const courseId = window.__SYNC_COURSE_ID__ || urlParams.get('id') || urlParams.get('courseId') || '';

      window.goBack = function() {
        if (isTeacher) {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/learner-hub';
        }
      };

      // Get Active Slide Index from DOM
      window.getActiveSlideIndex = function() {
        const slides = Array.from(document.querySelectorAll('.slide-container'));
        if (slides.length === 0) return 0;
        const activeIdx = slides.findIndex(s => s.classList.contains('active'));
        return activeIdx >= 0 ? activeIdx : 0;
      };

      // Universal Safe Slide Navigation
      window.goToSlideDOM = function(targetIndex, triggerHook = true) {
        const slides = Array.from(document.querySelectorAll('.slide-container'));
        const total = slides.length;
        if (total === 0) return;

        targetIndex = Math.max(0, Math.min(targetIndex, total - 1));
        currentSlideIndex = targetIndex;

        slides.forEach((s, idx) => {
          s.classList.remove('active', 'previous');
          if (idx < targetIndex) {
            s.classList.add('previous');
          } else if (idx === targetIndex) {
            s.classList.add('active');
          }
        });

        // Update Counter Display
        const curNum = document.getElementById('current-slide-num') || document.getElementById('slide-index-display');
        if (curNum) curNum.textContent = targetIndex + 1;
        const totalNum = document.getElementById('total-slide-num') || document.getElementById('slide-total-display');
        if (totalNum) totalNum.textContent = total;

        // Update Progress Bar
        const progressBar = document.getElementById('progress-bar');
        if (progressBar && total > 1) {
          progressBar.style.width = ((targetIndex / (total - 1)) * 100) + '%';
        }

        // Update Header Titles if present
        const activeSlide = slides[targetIndex];
        if (activeSlide) {
          const hBadge = document.getElementById('header-step-badge');
          if (hBadge) hBadge.textContent = activeSlide.getAttribute('data-badge') || ('STEP ' + (targetIndex + 1));
          const hTitle = document.getElementById('header-step-title');
          if (hTitle) hTitle.textContent = activeSlide.getAttribute('data-title') || '';
        }

        // Update Button States
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) prevBtn.disabled = (targetIndex === 0);

        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
          if (isTeacher) {
            nextBtn.disabled = (targetIndex === total - 1);
            nextBtn.classList.remove('sync-locked-btn');
          } else if (isSynced) {
            nextBtn.classList.add('sync-locked-btn');
            if (prevBtn) prevBtn.classList.add('sync-locked-btn');
          } else {
            // Independent mode: enforce publishedSlide
            nextBtn.classList.remove('sync-locked-btn');
            if (prevBtn) prevBtn.classList.remove('sync-locked-btn');
            nextBtn.disabled = (targetIndex >= publishedSlide || targetIndex === total - 1);
          }
        }

        // Call Course-Specific Enter Hook
        if (typeof window.onSlideEntered === 'function') {
          try { window.onSlideEntered(targetIndex); } catch(e) {}
        }
        if (triggerHook && typeof window.speakCurrentSlide === 'function') {
          try { window.speakCurrentSlide(); } catch(e) {}
        }
      };

      // Broadcast Teacher Slide Change
      function broadcastTeacherSlide(slideIdx) {
        if (!isTeacher || !isSynced || isBroadcasting) return;
        isBroadcasting = true;
        fetch('/api/courses/sync-state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify({ isSynced: true, currentSlide: slideIdx, courseId })
        }).finally(() => {
          setTimeout(() => { isBroadcasting = false; }, 200);
        });
      }

      // Observe DOM Slide Changes (Teacher actions)
      const observer = new MutationObserver(() => {
        const activeIdx = window.getActiveSlideIndex();
        if (activeIdx !== currentSlideIndex) {
          currentSlideIndex = activeIdx;
          if (isTeacher && isSynced) {
            broadcastTeacherSlide(currentSlideIndex);
          }
        }
      });

      document.querySelectorAll('.slide-container').forEach(slide => {
        observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
      });

      // Intercept Next/Prev button clicks for learners
      document.getElementById('next-btn')?.addEventListener('click', (e) => {
        if (!isTeacher) {
          if (isSynced) {
            e.preventDefault();
            e.stopPropagation();
            const lang = localStorage.getItem('courseLang') || 'en';
            window.showSyncToast(lang === 'en' ? 'Class is synced with teacher' : '課堂目前與教師同步中', true);
            return false;
          }
          const activeIdx = window.getActiveSlideIndex();
          if (activeIdx >= publishedSlide) {
            e.preventDefault();
            e.stopPropagation();
            const lang = localStorage.getItem('courseLang') || 'en';
            window.showSyncToast(lang === 'en' ? 'Slide not published yet' : '教師尚未發佈此頁面', true);
            return false;
          }
        }
      }, true);

      document.getElementById('prev-btn')?.addEventListener('click', (e) => {
        if (!isTeacher && isSynced) {
          e.preventDefault();
          e.stopPropagation();
          const lang = localStorage.getItem('courseLang') || 'en';
          window.showSyncToast(lang === 'en' ? 'Class is synced with teacher' : '課堂目前與教師同步中', true);
          return false;
        }
      }, true);

      // Keyboard navigation interceptor for learners
      window.addEventListener('keydown', (e) => {
        if (!isTeacher) {
          if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
            if (isSynced) {
              e.preventDefault();
              e.stopPropagation();
              const lang = localStorage.getItem('courseLang') || 'en';
              window.showSyncToast(lang === 'en' ? 'Class is synced with teacher' : '課堂目前與教師同步中', true);
            } else {
              const activeIdx = window.getActiveSlideIndex();
              if (activeIdx >= publishedSlide) {
                e.preventDefault();
                e.stopPropagation();
                const lang = localStorage.getItem('courseLang') || 'en';
                window.showSyncToast(lang === 'en' ? 'Slide not published yet' : '教師尚未發佈此頁面', true);
              }
            }
          } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
            if (isSynced) {
              e.preventDefault();
              e.stopPropagation();
              const lang = localStorage.getItem('courseLang') || 'en';
              window.showSyncToast(lang === 'en' ? 'Class is synced with teacher' : '課堂目前與教師同步中', true);
            }
          }
        }
      }, true);

      // Poll Sync State
      window.pollSyncState = async function() {
        const refreshIcon = document.getElementById('refresh-icon');
        if (refreshIcon) refreshIcon.classList.add('fa-spin');
        const startTime = Date.now();

        const activeIdx = window.getActiveSlideIndex();
        const courseIdParam = courseId ? ('&courseId=' + encodeURIComponent(courseId)) : '';

        try {
          const res = await fetch('/api/courses/sync-state?slide=' + activeIdx + courseIdParam, {
            headers: { 'Authorization': 'Bearer ' + token }
          });
          if (!res.ok) return;
          const data = await res.json();

          isTeacher = (data.role === 'EDUCATOR' || data.role === 'ADMIN');
          isSynced = !!data.isSynced;
          publishedSlide = (typeof data.publishedSlide === 'number') ? data.publishedSlide : 0;

          const lang = localStorage.getItem('courseLang') || 'en';

          if (isTeacher) {
            document.getElementById('teacher-controls')?.classList.remove('hidden');
            document.getElementById('back-dashboard-btn')?.classList.remove('hidden');
            const backBtn = document.getElementById('back-dashboard-btn');
            if (backBtn) backBtn.style.display = 'flex';

            const studentCountEl = document.getElementById('active-students-count');
            if (studentCountEl) studentCountEl.textContent = data.activeStudents || 0;
            const tooltipCountEl = document.getElementById('active-students-tooltip-count');
            if (tooltipCountEl) tooltipCountEl.textContent = data.activeStudents || 0;

            if (data.activeStudentDetails) {
              const listEl = document.getElementById('active-students-list');
              if (listEl) {
                if (data.activeStudentDetails.length === 0) {
                  listEl.innerHTML = '<div class="text-slate-500 italic text-xs">' + (lang === 'en' ? 'No students online' : '暫無學生在線') + '</div>';
                } else {
                  listEl.innerHTML = data.activeStudentDetails.map(s => {
                    return '<div class="flex justify-between items-center"><span class="truncate pr-2">' + s.name + '</span><span class="bg-indigo-600/30 text-indigo-400 text-xs px-2 py-0.5 rounded flex-shrink-0 font-mono">Slide ' + (s.slide + 1) + '</span></div>';
                  }).join('');
                }
              }
            }

            // Sync Toggle Buttons
            if (isSynced) {
              document.getElementById('sync-btn')?.classList.add('hidden');
              document.getElementById('desync-btn')?.classList.remove('hidden');
              document.getElementById('desync-btn')?.classList.add('flex');
              const ind = document.getElementById('sync-indicator');
              if (ind) ind.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.9)] animate-pulse';
            } else {
              document.getElementById('sync-btn')?.classList.remove('hidden');
              document.getElementById('desync-btn')?.classList.add('hidden');
              document.getElementById('desync-btn')?.classList.remove('flex');
              const ind = document.getElementById('sync-indicator');
              if (ind) ind.className = 'w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]';
            }

            // Published Badge in Teacher Controls
            const pubBadgeText = document.getElementById('published-badge-text');
            if (pubBadgeText) {
              pubBadgeText.textContent = (lang === 'en') ? ('Pub: Slide ' + (publishedSlide + 1)) : ('已發佈: 第' + (publishedSlide + 1) + '頁');
            }

            if (publishedSlide > 0) {
              document.getElementById('unpublish-btn')?.classList.remove('hidden');
              document.getElementById('unpublish-btn')?.classList.add('flex');
            } else {
              document.getElementById('unpublish-btn')?.classList.add('hidden');
              document.getElementById('unpublish-btn')?.classList.remove('flex');
            }

          } else {
            // Learner UI: Hide teacher controls & hide back dashboard button to lock student in slide
            document.getElementById('teacher-controls')?.classList.add('hidden');
            const backBtn = document.getElementById('back-dashboard-btn');
            if (backBtn) {
              backBtn.classList.add('hidden');
              backBtn.style.setProperty('display', 'none', 'important');
            }

            // Lock browser navigation for learners
            if (!window.__history_trapped__) {
              window.__history_trapped__ = true;
              try {
                history.pushState(null, document.title, location.href);
                window.addEventListener('popstate', function () {
                  history.pushState(null, document.title, location.href);
                  const l = localStorage.getItem('courseLang') || 'en';
                  window.showSyncToast(l === 'en' ? 'Class in session - Navigation locked' : '課堂進行中 - 導航已鎖定', true);
                });
              } catch(e) {}
            }

            const studentIndicator = document.getElementById('student-indicator');
            if (studentIndicator) {
              studentIndicator.classList.remove('hidden');
              studentIndicator.style.display = 'flex';
            }

            const syncDot = document.getElementById('student-sync-dot');
            const syncText = document.getElementById('student-sync-text');
            const pubBadge = document.getElementById('student-published-badge');

            if (pubBadge) {
              pubBadge.classList.remove('hidden');
              pubBadge.textContent = (lang === 'en') ? ('Pub: 1 - ' + (publishedSlide + 1)) : ('已開放: 1 - ' + (publishedSlide + 1) + '頁');
            }

            if (isSynced) {
              if (syncDot) syncDot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse';
              if (syncText) {
                syncText.textContent = (lang === 'en') ? 'Live with Teacher' : '與教師同步中';
                syncText.className = 'text-emerald-400 text-xs font-semibold';
              }

              // In Synced Mode: Student must be on teacher's exact current slide
              if (typeof data.currentSlide === 'number' && activeIdx !== data.currentSlide) {
                window.goToSlideDOM(data.currentSlide);
              } else {
                // Ensure buttons remain locked in sync mode
                window.goToSlideDOM(activeIdx, false);
              }
            } else {
              if (syncDot) syncDot.className = 'w-2.5 h-2.5 rounded-full bg-slate-500';
              if (syncText) {
                syncText.textContent = (lang === 'en') ? 'Independent Mode' : '獨立模式';
                syncText.className = 'text-slate-300 text-xs font-semibold';
              }

              // In Independent Mode: Student can change pages freely up to publishedSlide
              if (activeIdx > publishedSlide) {
                window.goToSlideDOM(publishedSlide);
              } else {
                window.goToSlideDOM(activeIdx, false);
              }
            }
          }

          // Auto-Logout Polling Check
          const authRes = await fetch('/api/auth/status', {
            headers: { 'Authorization': 'Bearer ' + token }
          });
          const authData = await authRes.json();
          if (!authData.active) {
            localStorage.removeItem('token');
            window.location.href = '/';
            return;
          }

        } catch (e) {}

        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, 800 - elapsed);
        setTimeout(() => {
          if (refreshIcon) refreshIcon.classList.remove('fa-spin');
        }, delay);

        clearTimeout(window.syncTimeoutId);
        const nextInterval = (isSynced || isTeacher) ? 1200 : 4000;
        window.syncTimeoutId = setTimeout(pollSyncState, nextInterval);
      };

      // --- 4. Teacher Action Listeners ---
      document.getElementById('sync-btn')?.addEventListener('click', () => {
        const activeIdx = window.getActiveSlideIndex();
        fetch('/api/courses/sync-state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify({ isSynced: true, currentSlide: activeIdx, courseId })
        }).then(() => {
          isSynced = true;
          window.pollSyncState();
          const lang = localStorage.getItem('courseLang') || 'en';
          window.showSyncToast(lang === 'en' ? 'Class Synchronized!' : '課堂已開始同步！', false);
        });
      });

      document.getElementById('desync-btn')?.addEventListener('click', () => {
        const activeIdx = window.getActiveSlideIndex();
        fetch('/api/courses/sync-state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify({ isSynced: false, currentSlide: activeIdx, courseId })
        }).then(() => {
          isSynced = false;
          window.pollSyncState();
          const lang = localStorage.getItem('courseLang') || 'en';
          window.showSyncToast(lang === 'en' ? 'Class Desynchronized.' : '已取消課堂同步。', false);
        });
      });

      document.getElementById('publish-btn')?.addEventListener('click', () => {
        const activeIdx = window.getActiveSlideIndex();
        fetch('/api/courses/sync-state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify({ publishedSlide: activeIdx, courseId })
        }).then(() => {
          publishedSlide = activeIdx;
          window.pollSyncState();
          const lang = localStorage.getItem('courseLang') || 'en';
          window.showSyncToast((lang === 'en') ? ('Published up to Slide ' + (activeIdx + 1) + '!') : ('已發佈至第 ' + (activeIdx + 1) + ' 頁！'), false);
        });
      });

      document.getElementById('unpublish-btn')?.addEventListener('click', () => {
        const activeIdx = window.getActiveSlideIndex();
        const newPublished = Math.max(0, activeIdx - 1);
        fetch('/api/courses/sync-state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify({ publishedSlide: newPublished, courseId })
        }).then(() => {
          publishedSlide = newPublished;
          window.pollSyncState();
          const lang = localStorage.getItem('courseLang') || 'en';
          window.showSyncToast((lang === 'en') ? ('Published rolled back to Slide ' + (newPublished + 1) + '.') : ('已回退發佈至第 ' + (newPublished + 1) + ' 頁。'), false);
        });
      });

      // Initial startup
      const initialLang = localStorage.getItem('courseLang') || 'en';
      window.applyCourseLanguage(initialLang);
      window.pollSyncState();
    });
  </script>`;
}

