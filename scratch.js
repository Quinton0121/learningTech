const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const baseHTML = fs.readFileSync('excel_a_dumped_scripts.html', 'utf8');

const s16CSS = `
        /* 10x10 Strategic Range Highlight Classes */
        .s16-pos-range { background-color: rgba(16, 185, 129, 0.45) !important; border: 1.5px solid #10b981 !important; color: #ffffff !important; font-weight: bold; }
        .s16-neg-range { background-color: rgba(6, 182, 212, 0.45) !important; border: 1.5px solid #06b6d4 !important; color: #ffffff !important; font-weight: bold; }
        .s16-overlap-range { background-color: rgba(245, 158, 11, 0.5) !important; border: 1.5px dashed #f59e0b !important; color: #ffffff !important; font-weight: bold; }
        .s16-cell-val { color: #e2e8f0; font-weight: 600; }
`;

const slides13_16_HTML = `
    <!-- Slide 13: Practice 1 - Mini Theme Park Ticket Booth -->
    <div class="slide-container" id="slide-13">
        <div class="flex flex-col md:flex-row items-center gap-10 max-w-6xl w-full">
            <div class="flex-1 text-left">
                <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-sm font-semibold mb-3 tracking-wide">
                    PRACTICE 1: THEME PARK TICKET BOOTH
                </div>
                <h2 class="text-3xl font-bold mb-4 flex items-center gap-3">
                    <i class="fa-solid fa-ticket text-amber-400"></i> Live Sales Calculator
                </h2>
                <p class="text-slate-300 mb-5 leading-relaxed text-base">
                    Calculate ticket sales for visitors. Start each formula with <code class="text-emerald-400 bg-slate-800 px-1.5 py-0.5 rounded font-bold">=</code> and multiply Quantity by Price (<code class="text-amber-400 bg-slate-800 px-1.5 py-0.5 rounded font-bold">*</code>).
                </p>

                <div class="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 shadow-xl space-y-3 mb-4">
                    <p class="text-slate-400 font-semibold uppercase tracking-wider text-xs flex items-center gap-2">
                        <i class="fa-solid fa-list-check text-amber-400"></i> Tasks to complete:
                    </p>
                    <div id="s13-task-1" class="flex items-center gap-2 text-sm text-slate-300 transition-colors">
                        <i class="fa-regular fa-circle text-slate-500"></i>
                        <span><strong>Adults:</strong> In <code>D2</code>, enter <code>=B2*C2</code></span>
                    </div>
                    <div id="s13-task-2" class="flex items-center gap-2 text-sm text-slate-300 transition-colors">
                        <i class="fa-regular fa-circle text-slate-500"></i>
                        <span><strong>Children:</strong> In <code>D3</code>, enter <code>=B3*C3</code></span>
                    </div>
                    <div id="s13-task-3" class="flex items-center gap-2 text-sm text-slate-300 transition-colors">
                        <i class="fa-regular fa-circle text-slate-500"></i>
                        <span><strong>VIP:</strong> In <code>D4</code>, enter <code>=B4*C4</code></span>
                    </div>
                </div>

                <div class="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-3 text-xs text-indigo-300 flex items-center gap-2">
                    <i class="fa-solid fa-wand-magic-sparkles text-indigo-400"></i>
                    <span><strong>Pro Tip:</strong> After formulas are entered, use the <strong>+ / -</strong> buttons on quantities to watch the revenue auto-update live!</span>
                </div>
            </div>
            
            <div class="flex-1 flex flex-col items-center justify-center w-full select-none">
                <!-- Grid 13 -->
                <div id="grid-s13" class="demo-grid perspective-1000 mb-6" style="grid-template-columns: 36px 90px 75px 65px 85px; grid-auto-rows: 38px;">
                    <!-- JS will populate this -->
                </div>

                <!-- Total Revenue Banner -->
                <div id="s13-total-banner" class="w-full max-w-sm bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 flex justify-between items-center mb-4">
                    <span class="text-xs uppercase font-bold text-slate-400">Total Theme Park Revenue:</span>
                    <span id="s13-grand-total" class="text-xl font-extrabold text-amber-400 font-mono">$0</span>
                </div>

                <!-- Success Message -->
                <div id="s13-success" class="hidden flex-col items-center animate-fade-in transition-all duration-500">
                     <p class="text-emerald-400 font-bold text-base mb-1 flex items-center gap-2">
                        <i class="fa-solid fa-circle-check text-emerald-400"></i> Excellent! All ticket lines calculated!
                     </p>
                     <span class="text-xs text-slate-400">Try clicking the + and - steppers to see the live math in action.</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Slide 14: Practice 2 - RPG Battle Damage Calculator -->
    <div class="slide-container" id="slide-14">
        <div class="flex flex-col md:flex-row items-center gap-10 max-w-6xl w-full">
            <div class="flex-1 text-left">
                <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 text-sm font-semibold mb-3 tracking-wide">
                    PRACTICE 2: RPG BATTLE CALCULATOR
                </div>
                <h2 class="text-3xl font-bold mb-4 flex items-center gap-3">
                    <i class="fa-solid fa-shield-halved text-cyan-400"></i> Hero Combat Formulas
                </h2>
                <p class="text-slate-300 mb-5 leading-relaxed text-base">
                    Combine addition (<code class="text-emerald-400 bg-slate-800 px-1.5 py-0.5 rounded font-bold">+</code>) and subtraction (<code class="text-rose-400 bg-slate-800 px-1.5 py-0.5 rounded font-bold">-</code>) to calculate damage against the Dragon Boss!
                </p>

                <!-- Formula Rule -->
                <div class="bg-slate-800/90 p-4 rounded-xl border border-cyan-900/50 mb-4">
                    <div class="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Combat Formula Rule:</div>
                    <div class="text-base font-mono text-cyan-300 font-bold">
                        Final DMG = (Base ATK + Buff) - Boss DEF
                    </div>
                </div>

                <div class="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 shadow-xl space-y-3 mb-4">
                    <div id="s14-task-1" class="flex items-center gap-2 text-sm text-slate-300 transition-colors">
                        <i class="fa-regular fa-circle text-slate-500"></i>
                        <span><strong>Knight:</strong> In <code>E2</code>, build <code>=B2+C2-D2</code></span>
                    </div>
                    <div id="s14-task-2" class="flex items-center gap-2 text-sm text-slate-300 transition-colors">
                        <i class="fa-regular fa-circle text-slate-500"></i>
                        <span><strong>Mage:</strong> In <code>E3</code>, build <code>=B3+C3-D3</code></span>
                    </div>
                    <div id="s14-task-3" class="flex items-center gap-2 text-sm text-slate-300 transition-colors">
                        <i class="fa-regular fa-circle text-slate-500"></i>
                        <span><strong>Archer:</strong> In <code>E4</code>, build <code>=B4+C4-D4</code></span>
                    </div>
                </div>
            </div>
            
            <div class="flex-1 flex flex-col items-center justify-center w-full select-none">
                <!-- Boss Status Bar -->
                <div class="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl p-3 mb-4 shadow-xl">
                    <div class="flex justify-between items-center text-xs font-bold mb-1.5">
                        <span class="text-rose-400 flex items-center gap-1.5"><i class="fa-solid fa-dragon"></i> Dragon Boss HP</span>
                        <span id="s14-boss-hp" class="text-white font-mono">1000 / 1000</span>
                    </div>
                    <div class="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
                        <div id="s14-hp-bar" class="bg-gradient-to-r from-rose-500 to-amber-500 h-full w-full transition-all duration-700"></div>
                    </div>
                </div>

                <!-- Grid 14 -->
                <div id="grid-s14" class="demo-grid perspective-1000 mb-6" style="grid-template-columns: 32px 75px 65px 65px 65px 75px; grid-auto-rows: 36px;">
                    <!-- JS will populate this -->
                </div>

                <!-- Success Message -->
                <div id="s14-success" class="hidden flex-col items-center animate-fade-in transition-all duration-500">
                     <p class="text-cyan-400 font-bold text-base mb-1 flex items-center gap-2">
                        <i class="fa-solid fa-trophy text-yellow-400"></i> Critical Strike! Party damage evaluated!
                     </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Slide 15: Practice 3 - Pizza Party Budget & Drag-to-Copy -->
    <div class="slide-container" id="slide-15">
        <div class="flex flex-col md:flex-row items-center gap-10 max-w-6xl w-full">
            <div class="flex-1 text-left">
                <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-sm font-semibold mb-3 tracking-wide">
                    PRACTICE 3: PIZZA PARTY BUDGET
                </div>
                <h2 class="text-3xl font-bold mb-4 flex items-center gap-3">
                    <i class="fa-solid fa-pizza-slice text-emerald-400"></i> Drag-to-Copy Master
                </h2>
                <p class="text-slate-300 mb-5 leading-relaxed text-base">
                    You have 5 items for the class pizza party. Don't write 5 separate formulas! Cell <code>D2</code> already has <code class="text-emerald-400 bg-slate-800 px-1.5 py-0.5 rounded font-bold">=B2*C2</code> ($90).
                </p>

                <div class="bg-slate-800/90 p-5 rounded-2xl border border-emerald-900/50 shadow-xl space-y-3 mb-5">
                    <p class="text-slate-400 font-semibold uppercase tracking-wider text-xs flex items-center gap-2">
                        <i class="fa-solid fa-hand-pointer text-emerald-400"></i> How to Drag & Fill:
                    </p>
                    <ol class="list-decimal list-inside text-sm text-slate-300 space-y-2">
                        <li>Locate the tiny green square (<strong>Fill Handle</strong>) at the bottom-right of cell <strong>D2</strong>.</li>
                        <li>Click and hold, then <strong>drag straight down</strong> across rows 3, 4, 5, and 6.</li>
                        <li>Release to auto-fill the calculations for all 5 party items instantly!</li>
                    </ol>
                </div>
            </div>
            
            <div class="flex-1 flex flex-col items-center justify-center w-full select-none">
                <!-- Grid 15 -->
                <div id="grid-s15" class="demo-grid perspective-1000 mb-6" style="grid-template-columns: 32px 105px 55px 70px 75px; grid-auto-rows: 35px;">
                    <!-- JS will populate this -->
                </div>

                <!-- Grand Total Banner -->
                <div class="w-full max-w-sm bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2 flex justify-between items-center mb-4">
                    <span class="text-xs uppercase font-bold text-slate-400">Party Budget Grand Total:</span>
                    <span id="s15-grand-total" class="text-lg font-extrabold text-emerald-400 font-mono">$90.00</span>
                </div>

                <!-- Success Message & Sandbox Launcher -->
                <div id="s15-success" class="hidden flex-col items-center animate-fade-in transition-all duration-500">
                     <p class="text-emerald-400 font-bold text-base mb-3 flex items-center gap-2">
                        <i class="fa-solid fa-wand-magic-sparkles text-amber-400"></i> Superb! Party budget completely solved with 1 drag!
                     </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Slide 16: Practice 4 - 10x10 Strategic Range Minefield Game -->
    <div class="slide-container" id="slide-16">
        <div class="flex flex-col lg:flex-row items-center gap-7 max-w-7xl w-full px-2">
            <!-- Left Panel: Game Rules & Controls -->
            <div class="flex-1 text-left max-w-lg">
                <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 text-sm font-semibold mb-2 tracking-wide">
                    PRACTICE 4: 10×10 STRATEGIC RANGE MINING
                </div>
                <h2 class="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                    <i class="fa-solid fa-gem text-cyan-400"></i> Find Gold, Dodge Traps!
                </h2>
                
                <!-- Game Rules Bar -->
                <div class="grid grid-cols-4 gap-1.5 mb-3">
                    <div id="s16-rule-r1" class="bg-slate-800/90 border border-slate-700 rounded-lg p-2 text-center text-[11px]">
                        <div class="text-slate-400 font-bold">Range 1</div>
                        <div id="s16-r1-count" class="text-emerald-400 font-bold font-mono">4 cells ✅</div>
                        <div class="text-[10px] text-slate-500">Min 4 cells</div>
                    </div>
                    <div id="s16-rule-r2" class="bg-slate-800/90 border border-slate-700 rounded-lg p-2 text-center text-[11px]">
                        <div class="text-slate-400 font-bold">Range 2</div>
                        <div id="s16-r2-count" class="text-cyan-400 font-bold font-mono">4 cells ✅</div>
                        <div class="text-[10px] text-slate-500">Min 4 cells</div>
                    </div>
                    <div id="s16-rule-total" class="bg-slate-800/90 border border-slate-700 rounded-lg p-2 text-center text-[11px]">
                        <div class="text-slate-400 font-bold">Combined</div>
                        <div id="s16-tot-count" class="text-cyan-400 font-bold font-mono">8 / 20 ✅</div>
                        <div class="text-[10px] text-slate-500">Max 20 cells</div>
                    </div>
                    <div id="s16-rule-overlap" class="bg-slate-800/90 border border-slate-700 rounded-lg p-2 text-center text-[11px]">
                        <div class="text-slate-400 font-bold">No Overlap</div>
                        <div id="s16-overlap-status" class="text-emerald-400 font-bold font-mono">None ✅</div>
                        <div class="text-[10px] text-slate-500">1 use / cell</div>
                    </div>
                </div>

                <!-- Dual Range Input Cards (Typing Only) -->
                <div class="space-y-2.5 mb-3">
                    <!-- Range 1 -->
                    <div class="bg-slate-800/90 p-3 rounded-xl border border-emerald-500/40 shadow-lg">
                        <div class="flex justify-between items-center mb-1.5">
                            <span class="text-xs font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                                <i class="fa-solid fa-keyboard"></i> 1. Type Range 1
                            </span>
                            <span id="s16-score-sum" class="text-xs font-bold font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">-60 pts (4 cells)</span>
                        </div>
                        <input type="text" id="s16-input-pos" value="A1:B2" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono text-emerald-400 font-bold focus:outline-none focus:border-emerald-400 uppercase text-center tracking-wider" placeholder="e.g. A1:B2">
                    </div>

                    <!-- Range 2 -->
                    <div class="bg-slate-800/90 p-3 rounded-xl border border-cyan-500/40 shadow-lg">
                        <div class="flex justify-between items-center mb-1.5">
                            <span class="text-xs font-bold uppercase text-cyan-400 flex items-center gap-1.5">
                                <i class="fa-solid fa-keyboard"></i> 2. Type Range 2
                            </span>
                            <span id="s16-deduct-sum" class="text-xs font-bold font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">-40 pts (4 cells)</span>
                        </div>
                        <input type="text" id="s16-input-neg" value="I9:J10" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono text-cyan-400 font-bold focus:outline-none focus:border-cyan-400 uppercase text-center tracking-wider" placeholder="e.g. I9:J10">
                    </div>
                </div>

                <!-- Live Formula Math Output -->
                <div class="bg-slate-900/90 border border-slate-700 rounded-xl p-3 flex justify-between items-center shadow-md mb-3">
                    <div>
                        <div class="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Net Score Formula:</div>
                        <div id="s16-formula-preview" class="text-xs font-mono text-cyan-300 font-bold">=(SUM(A1:B2) + SUM(I9:J10)) / 100</div>
                        <div id="s16-rule-warning" class="text-[11px] text-rose-400 font-bold mt-0.5 hidden">⚠️ Rule violated!</div>
                    </div>
                    <div class="text-right">
                        <div class="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Net Score:</div>
                        <div id="s16-net-score" class="text-2xl font-extrabold text-amber-400 font-mono">-1.0</div>
                    </div>
                </div>

                <!-- Save Score to Teacher Button -->
                <button id="s16-submit-score-btn" onclick="submitS16Score()" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 mb-2">
                    <i class="fa-solid fa-cloud-arrow-up text-amber-300"></i> Save Score to Teacher Dashboard
                </button>
                <div id="s16-save-status" class="text-[11px] text-center font-bold mb-2 hidden"></div>
            </div>
            
            <!-- Right Panel: 10x10 Grid -->
            <div class="flex-1 flex flex-col items-center justify-center select-none">
                <!-- 10x10 Grid Container -->
                <div id="grid-s16" class="demo-grid perspective-1000 shadow-2xl" style="grid-template-columns: 26px repeat(10, 33px); grid-auto-rows: 27px; cursor: default;">
                    <!-- JS will populate 10x10 cells -->
                </div>
                
                <!-- Success / Strategy Status -->
                <div id="s16-status-banner" class="mt-2.5 text-emerald-400 font-bold text-xs flex items-center gap-2 animate-fade-in">
                    <i class="fa-solid fa-trophy text-amber-400"></i> Type ranges in boxes above to highlight and calculate score!
                </div>
            </div>
        </div>
    </div>
`;

const slides13_16_FUNCTIONS = `
            // ==========================================
            // --- Slide 13 Logic (Theme Park Booth) ---
            // ==========================================
            var s13Data = {
                2: { item: 'Adults', qty: 4, price: 50, formula: '', solved: false },
                3: { item: 'Children', qty: 6, price: 25, formula: '', solved: false },
                4: { item: 'VIP Pass', qty: 2, price: 100, formula: '', solved: false }
            };

            function buildSlide13Grid() {
                var container = document.getElementById('grid-s13');
                if (!container) return;
                container.innerHTML = '';
                var cols = ['A', 'B', 'C', 'D'];

                // Top left header
                container.appendChild(createCell('', 'demo-header'));
                cols.forEach(function(c) { container.appendChild(createCell(c, 'demo-header')); });

                // Row 1 (Header row)
                container.appendChild(createCell('1', 'demo-header'));
                container.appendChild(createCell('Ticket', 'demo-cell font-bold text-slate-400 text-xs'));
                container.appendChild(createCell('Qty', 'demo-cell font-bold text-slate-400 text-xs'));
                container.appendChild(createCell('Price', 'demo-cell font-bold text-slate-400 text-xs'));
                container.appendChild(createCell('Total', 'demo-cell font-bold text-amber-400 text-xs'));

                // Rows 2-4
                for (var r = 2; r <= 4; r++) {
                    (function(row) {
                        container.appendChild(createCell(row, 'demo-header'));
                        
                        // Col A: Ticket Name
                        container.appendChild(createCell(s13Data[row].item, 'demo-cell text-slate-200 text-xs font-semibold'));

                        // Col B: Qty with stepper
                        var qtyCell = createCell('', 'demo-cell flex items-center justify-between px-1 text-xs text-white');
                        qtyCell.id = 's13-b' + row;
                        qtyCell.innerHTML = '<button type="button" class="w-4 h-4 bg-slate-700 hover:bg-slate-600 rounded text-[10px] flex items-center justify-center text-slate-300" onclick="updateS13Qty(' + row + ', -1)">-</button><span id="s13-qty-val-' + row + '" class="font-bold font-mono">' + s13Data[row].qty + '</span><button type="button" class="w-4 h-4 bg-slate-700 hover:bg-slate-600 rounded text-[10px] flex items-center justify-center text-slate-300" onclick="updateS13Qty(' + row + ', 1)">+</button>';
                        container.appendChild(qtyCell);

                        // Col C: Price
                        var priceCell = createCell('$' + s13Data[row].price, 'demo-cell text-slate-300 text-xs font-mono');
                        priceCell.id = 's13-c' + row;
                        container.appendChild(priceCell);

                        // Col D: Interactive Total Input
                        var dCell = createCell('', 'demo-cell relative p-0');
                        dCell.id = 's13-d' + row + '-container';

                        var dInput = document.createElement('input');
                        dInput.type = 'text';
                        dInput.id = 's13-d' + row;
                        dInput.placeholder = '=...';
                        dInput.className = 'w-full h-full bg-transparent text-center font-bold text-amber-400 text-xs focus:outline-none focus:bg-slate-800/80 focus:ring-1 focus:ring-amber-400 rounded';
                        
                        dInput.addEventListener('keydown', function(e) {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                evaluateS13Input(row, dInput.value.trim());
                            }
                        });

                        dInput.addEventListener('blur', function() {
                            if (dInput.value.trim()) {
                                evaluateS13Input(row, dInput.value.trim());
                            }
                        });

                        dCell.appendChild(dInput);
                        container.appendChild(dCell);
                    })(r);
                }
            }

            window.updateS13Qty = function(row, delta) {
                s13Data[row].qty = Math.max(1, s13Data[row].qty + delta);
                var span = document.getElementById('s13-qty-val-' + row);
                if (span) span.textContent = s13Data[row].qty;

                if (s13Data[row].solved) {
                    var dInput = document.getElementById('s13-d' + row);
                    var val = s13Data[row].qty * s13Data[row].price;
                    if (dInput) dInput.value = '$' + val;
                }
                updateS13GrandTotal();
            };

            function evaluateS13Input(row, raw) {
                var dInput = document.getElementById('s13-d' + row);
                var upper = raw.toUpperCase().replace(/\\s+/g, '');
                var expected = '=B' + row + '*C' + row;
                var expectedAlt = '=C' + row + '*B' + row;

                if (upper === expected || upper === expectedAlt || upper === ('=' + s13Data[row].qty + '*' + s13Data[row].price)) {
                    s13Data[row].solved = true;
                    s13Data[row].formula = upper;
                    var val = s13Data[row].qty * s13Data[row].price;
                    dInput.value = '$' + val;
                    dInput.className = 'w-full h-full bg-emerald-950/40 text-center font-bold text-emerald-400 text-xs rounded border border-emerald-500/50';

                    var taskEl = document.getElementById('s13-task-' + (row - 1));
                    if (taskEl) {
                        taskEl.innerHTML = '<i class="fa-solid fa-check-circle text-emerald-400"></i> <span class="line-through text-slate-400">' + taskEl.innerText + '</span>';
                    }

                    updateS13GrandTotal();
                    checkS13Complete();
                } else if (raw !== '') {
                    dInput.classList.add('animate-shake');
                    setTimeout(function() { dInput.classList.remove('animate-shake'); }, 400);
                }
            }

            function updateS13GrandTotal() {
                var total = 0;
                for (var r = 2; r <= 4; r++) {
                    if (s13Data[r].solved) {
                        total += s13Data[r].qty * s13Data[r].price;
                    }
                }
                var grandEl = document.getElementById('s13-grand-total');
                if (grandEl) grandEl.textContent = '$' + total;
            }

            function checkS13Complete() {
                if (s13Data[2].solved && s13Data[3].solved && s13Data[4].solved) {
                    var succ = document.getElementById('s13-success');
                    if (succ) {
                        succ.classList.remove('hidden');
                        succ.classList.add('flex');
                    }
                }
            }

            // ==========================================
            // --- Slide 14 Logic (RPG Damage Battle) ---
            // ==========================================
            var s14Data = {
                2: { hero: 'Knight', atk: 120, buff: 45, def: 35, expected: 130, solved: false },
                3: { hero: 'Mage', atk: 180, buff: 60, def: 40, expected: 200, solved: false },
                4: { hero: 'Archer', atk: 150, buff: 30, def: 25, expected: 155, solved: false }
            };

            function buildSlide14Grid() {
                var container = document.getElementById('grid-s14');
                if (!container) return;
                container.innerHTML = '';
                var cols = ['A', 'B', 'C', 'D', 'E'];

                // Top left header
                container.appendChild(createCell('', 'demo-header'));
                cols.forEach(function(c) { container.appendChild(createCell(c, 'demo-header')); });

                // Row 1
                container.appendChild(createCell('1', 'demo-header'));
                container.appendChild(createCell('Hero', 'demo-cell font-bold text-slate-400 text-xs'));
                container.appendChild(createCell('ATK', 'demo-cell font-bold text-slate-400 text-xs'));
                container.appendChild(createCell('Buff', 'demo-cell font-bold text-slate-400 text-xs'));
                container.appendChild(createCell('DEF', 'demo-cell font-bold text-slate-400 text-xs'));
                container.appendChild(createCell('DMG', 'demo-cell font-bold text-cyan-400 text-xs'));

                // Rows 2-4
                for (var r = 2; r <= 4; r++) {
                    (function(row) {
                        container.appendChild(createCell(row, 'demo-header'));
                        
                        // Col A: Hero
                        container.appendChild(createCell(s14Data[row].hero, 'demo-cell text-slate-200 text-xs font-semibold'));

                        // Col B: Base ATK (clickable)
                        var bCell = createCell(s14Data[row].atk, 'demo-cell text-white text-xs font-mono cursor-pointer hover:bg-slate-700');
                        bCell.id = 's14-B' + row;
                        bCell.onclick = function() { insertS14CellRef(row, 'B' + row); };
                        container.appendChild(bCell);

                        // Col C: Buff (clickable)
                        var cCell = createCell(s14Data[row].buff, 'demo-cell text-emerald-300 text-xs font-mono cursor-pointer hover:bg-slate-700');
                        cCell.id = 's14-C' + row;
                        cCell.onclick = function() { insertS14CellRef(row, 'C' + row); };
                        container.appendChild(cCell);

                        // Col D: Boss DEF (clickable)
                        var dCell = createCell(s14Data[row].def, 'demo-cell text-rose-300 text-xs font-mono cursor-pointer hover:bg-slate-700');
                        dCell.id = 's14-D' + row;
                        dCell.onclick = function() { insertS14CellRef(row, 'D' + row); };
                        container.appendChild(dCell);

                        // Col E: Final DMG Input
                        var eCell = createCell('', 'demo-cell relative p-0');
                        var eInput = document.createElement('input');
                        eInput.type = 'text';
                        eInput.id = 's14-e' + row;
                        eInput.placeholder = '=...';
                        eInput.className = 'w-full h-full bg-transparent text-center font-bold text-cyan-400 text-xs focus:outline-none focus:bg-slate-800/80 focus:ring-1 focus:ring-cyan-400 rounded';

                        eInput.addEventListener('keydown', function(e) {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                evaluateS14Input(row, eInput.value.trim());
                            }
                        });
                        eInput.addEventListener('blur', function() {
                            if (eInput.value.trim()) {
                                evaluateS14Input(row, eInput.value.trim());
                            }
                        });

                        eCell.appendChild(eInput);
                        container.appendChild(eCell);
                    })(r);
                }
            }

            function insertS14CellRef(row, cellId) {
                var eInput = document.getElementById('s14-e' + row);
                if (!eInput || s14Data[row].solved) return;
                
                if (!eInput.value.startsWith('=')) {
                    eInput.value = '=' + cellId;
                } else {
                    eInput.value += cellId;
                }
                eInput.focus();
            }

            function evaluateS14Input(row, raw) {
                var eInput = document.getElementById('s14-e' + row);
                var upper = raw.toUpperCase().replace(/\\s+/g, '');
                var expected = '=B' + row + '+C' + row + '-D' + row;
                var expectedVal = s14Data[row].expected;

                if (upper === expected || upper === ('=(' + expected.substring(1) + ')') || upper === ('=' + s14Data[row].atk + '+' + s14Data[row].buff + '-' + s14Data[row].def) || upper === ('=' + expectedVal)) {
                    s14Data[row].solved = true;
                    eInput.value = expectedVal + ' DMG';
                    eInput.className = 'w-full h-full bg-cyan-950/40 text-center font-bold text-cyan-400 text-xs rounded border border-cyan-500/50';

                    var taskEl = document.getElementById('s14-task-' + (row - 1));
                    if (taskEl) {
                        taskEl.innerHTML = '<i class="fa-solid fa-check-circle text-cyan-400"></i> <span class="line-through text-slate-400">' + taskEl.innerText + '</span>';
                    }

                    updateBossHP();
                    checkS14Complete();
                } else if (raw !== '') {
                    eInput.classList.add('animate-shake');
                    setTimeout(function() { eInput.classList.remove('animate-shake'); }, 400);
                }
            }

            function updateBossHP() {
                var damage = 0;
                for (var r = 2; r <= 4; r++) {
                    if (s14Data[r].solved) damage += s14Data[r].expected;
                }
                var remaining = Math.max(0, 1000 - damage);
                var hpEl = document.getElementById('s14-boss-hp');
                var barEl = document.getElementById('s14-hp-bar');
                if (hpEl) hpEl.textContent = remaining + ' / 1000';
                if (barEl) barEl.style.width = ((remaining / 1000) * 100) + '%';
            }

            function checkS14Complete() {
                if (s14Data[2].solved && s14Data[3].solved && s14Data[4].solved) {
                    var succ = document.getElementById('s14-success');
                    if (succ) {
                        succ.classList.remove('hidden');
                        succ.classList.add('flex');
                    }
                }
            }

            // ==========================================
            // --- Slide 15 Logic (Pizza Party Fill Handle) ---
            // ==========================================
            var isFillingS15 = false;
            var s15FillEndRow = null;
            var s15Data = [
                { item: 'Pizza', qty: 5, price: 18, total: 90 },
                { item: 'Soda Cans', qty: 24, price: 2, total: 48 },
                { item: 'Garlic Bread', qty: 8, price: 4, total: 32 },
                { item: 'Ice Cream Tub', qty: 3, price: 12, total: 36 },
                { item: 'Party Cake', qty: 1, price: 35, total: 35 }
            ];

            function buildSlide15Grid() {
                var container = document.getElementById('grid-s15');
                if (!container) return;
                container.innerHTML = '';
                var cols = ['A', 'B', 'C', 'D'];

                // Top left header
                container.appendChild(createCell('', 'demo-header'));
                cols.forEach(function(c) { container.appendChild(createCell(c, 'demo-header')); });

                // Row 1
                container.appendChild(createCell('1', 'demo-header'));
                container.appendChild(createCell('Item', 'demo-cell font-bold text-slate-400 text-xs'));
                container.appendChild(createCell('Qty', 'demo-cell font-bold text-slate-400 text-xs'));
                container.appendChild(createCell('Price', 'demo-cell font-bold text-slate-400 text-xs'));
                container.appendChild(createCell('Total', 'demo-cell font-bold text-emerald-400 text-xs'));

                // Rows 2-6
                for (var r = 2; r <= 6; r++) {
                    (function(row) {
                        var d = s15Data[row - 2];
                        container.appendChild(createCell(row, 'demo-header'));
                        
                        container.appendChild(createCell(d.item, 'demo-cell text-slate-200 text-xs font-semibold'));
                        container.appendChild(createCell(d.qty, 'demo-cell text-white text-xs font-mono'));
                        container.appendChild(createCell('$' + d.price, 'demo-cell text-slate-300 text-xs font-mono'));

                        var cellD = createCell('', 'demo-cell relative transition-all text-xs font-mono');
                        cellD.id = 's15-D' + row;

                        if (row === 2) {
                            cellD.textContent = '$' + d.total;
                            cellD.classList.add('text-emerald-400', 'font-bold');
                            cellD.style.border = '2px solid #10b981';

                            var handle = document.createElement('div');
                            handle.className = 'fill-handle';
                            handle.title = 'Drag down to fill';

                            handle.addEventListener('mousedown', function(e) {
                                isFillingS15 = true;
                                s15FillEndRow = 2;
                                e.preventDefault();
                            });

                            cellD.appendChild(handle);
                        }

                        cellD.addEventListener('mouseenter', function() {
                            if (isFillingS15 && row > 2) {
                                s15FillEndRow = row;
                                renderS15FillPreview();
                            }
                        });

                        container.appendChild(cellD);
                    })(r);
                }

                window.addEventListener('mouseup', function() {
                    if (isFillingS15) {
                        isFillingS15 = false;
                        applyS15Fill();
                    }
                });
            }

            function renderS15FillPreview() {
                for (var r = 3; r <= 6; r++) {
                    var cell = document.getElementById('s15-D' + r);
                    if (!cell) continue;
                    cell.classList.remove('fill-preview', 'fill-preview-bottom');

                    if (r <= s15FillEndRow) {
                        cell.classList.add('fill-preview');
                        if (r === s15FillEndRow) {
                            cell.classList.add('fill-preview-bottom');
                        }
                    }
                }
            }

            function applyS15Fill() {
                var filledCount = 0;
                var currentGrand = s15Data[0].total;

                for (var r = 3; r <= 6; r++) {
                    var cell = document.getElementById('s15-D' + r);
                    if (!cell) continue;
                    cell.classList.remove('fill-preview', 'fill-preview-bottom');

                    if (r <= s15FillEndRow) {
                        var d = s15Data[r - 2];
                        cell.textContent = '$' + d.total;
                        cell.classList.add('text-emerald-400', 'font-bold', 'bg-slate-800');
                        currentGrand += d.total;
                        filledCount++;

                        cell.style.transform = 'scale(0.92)';
                        (function(c) {
                            setTimeout(function() { c.style.transform = 'scale(1)'; }, 150);
                        })(cell);
                    }
                }

                var grandEl = document.getElementById('s15-grand-total');
                if (grandEl) grandEl.textContent = '$' + currentGrand.toFixed(2);

                if (filledCount >= 4 && s15FillEndRow === 6) {
                    var succ = document.getElementById('s15-success');
                    if (succ) {
                        succ.classList.remove('hidden');
                        succ.classList.add('flex');
                    }
                }
            }

            // ========================================================
            // --- Slide 16 Logic (10x10 Strategic Range Minefield) ---
            // ========================================================
            var s16Cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
            var s16Rows = 10;
            // Scattered positive values surrounded by negative penalties and zeros! No pure positive 4+ blocks!
            var s16GridData = [
                //   A     B     C     D     E     F     G     H     I     J
                [  -45,  -35,  -50,   35,  -45,  -50,   40,  -65,  -50,  -40 ], // Row 1
                [  -30,   50,  -40,  -30,  -50,  -45,  -60,  -70,   65,  -50 ], // Row 2
                [  -50,  -40,   60,  -15,   45,  -40,  -50,   40,  -60,  -40 ], // Row 3
                [   35,  -30,  -20,  -20,   -5,  -30,  -40,  -40,  -30,   45 ], // Row 4
                [  -60,  -40,   70,  -10,   35,  -50,  -35,  -30,  -40,  -60 ], // Row 5
                [  -50,   30,  -40,  -30,  -40,  -40,  -30,  -20,   55,  -50 ], // Row 6
                [  -40,  -50,  -35,  -50,   35,  -30,   30,  -15,  -15,  -40 ], // Row 7
                [  -30,   75,  -65,   40,  -50,  -40,  -15,   -5,   10,  -30 ], // Row 8
                [   45,  -50,  -70,  -60,  -60,  -30,  -15,  -15,  -10,   50 ], // Row 9
                [  -50,  -60,  -70,  -80,  -70,  -50,  -40,  -30,  -30,  -50 ]  // Row 10
            ];

            var s16PosRange = { minCol: 0, maxCol: 1, minRow: 1, maxRow: 2 }; // A1:B2 (4 cells: -60 pts)
            var s16NegRange = { minCol: 8, maxCol: 9, minRow: 9, maxRow: 10 }; // I9:J10 (4 cells: -40 pts)

            function checkS16Overlap(r1, r2) {
                if (!r1 || !r2) return false;
                return !(r1.maxCol < r2.minCol || r1.minCol > r2.maxCol || r1.maxRow < r2.minRow || r1.minRow > r2.maxRow);
            }

            function parseS16RangeStr(str) {
                if (!str) return null;
                var clean = str.trim().toUpperCase().replace(/\s+/g, '');
                var parts = clean.split(':');
                if (parts.length === 1) parts = [parts[0], parts[0]];
                if (parts.length !== 2) return null;

                var m1 = parts[0].match(/^([A-J])(10|[1-9])$/);
                var m2 = parts[1].match(/^([A-J])(10|[1-9])$/);
                if (!m1 || !m2) return null;

                var col1 = s16Cols.indexOf(m1[1]);
                var row1 = parseInt(m1[2]);
                var col2 = s16Cols.indexOf(m2[1]);
                var row2 = parseInt(m2[2]);

                return {
                    minCol: Math.min(col1, col2),
                    maxCol: Math.max(col1, col2),
                    minRow: Math.min(row1, row2),
                    maxRow: Math.max(row1, row2)
                };
            }

            function formatS16RangeObj(obj) {
                if (!obj) return '';
                var start = s16Cols[obj.minCol] + obj.minRow;
                var end = s16Cols[obj.maxCol] + obj.maxRow;
                return start === end ? start : (start + ':' + end);
            }

            function getRangeCellCount(rangeObj) {
                if (!rangeObj) return 0;
                return (rangeObj.maxCol - rangeObj.minCol + 1) * (rangeObj.maxRow - rangeObj.minRow + 1);
            }

            function calcS16RangeSum(rangeObj) {
                if (!rangeObj) return 0;
                var sum = 0;
                for (var r = rangeObj.minRow; r <= rangeObj.maxRow; r++) {
                    for (var c = rangeObj.minCol; c <= rangeObj.maxCol; c++) {
                        sum += s16GridData[r - 1][c];
                    }
                }
                return sum;
            }

            function buildSlide16Grid() {
                var container = document.getElementById('grid-s16');
                if (!container) return;
                container.innerHTML = '';

                // Header Row (Top-left empty, then Cols A-J)
                container.appendChild(createCell('', 'demo-header text-[10px]'));
                s16Cols.forEach(function(c) {
                    container.appendChild(createCell(c, 'demo-header text-[11px] font-bold text-slate-400'));
                });

                // Rows 1-10 (Uniform single color for all numbers)
                for (var r = 1; r <= s16Rows; r++) {
                    container.appendChild(createCell(r, 'demo-header text-[11px] font-bold text-slate-400'));

                    for (var c = 0; c < s16Cols.length; c++) {
                        (function(colIdx, rowIdx) {
                            var val = s16GridData[rowIdx - 1][colIdx];
                            var cell = createCell(val, 'demo-cell text-[11px] font-mono select-none text-slate-200 transition-colors duration-100');
                            cell.id = 's16-' + s16Cols[colIdx] + rowIdx;
                            cell.dataset.col = colIdx;
                            cell.dataset.row = rowIdx;
                            container.appendChild(cell);
                        })(c, r);
                    }
                }

                // Input event listeners (Typing only)
                var posInput = document.getElementById('s16-input-pos');
                var negInput = document.getElementById('s16-input-neg');

                if (posInput) {
                    posInput.addEventListener('input', function() {
                        var parsed = parseS16RangeStr(posInput.value);
                        if (parsed) {
                            s16PosRange = parsed;
                            recalcS16();
                        }
                    });
                }

                if (negInput) {
                    negInput.addEventListener('input', function() {
                        var parsed = parseS16RangeStr(negInput.value);
                        if (parsed) {
                            s16NegRange = parsed;
                            recalcS16();
                        }
                    });
                }

                recalcS16();
            }

            function recalcS16() {
                // Clear highlights
                for (var r = 1; r <= s16Rows; r++) {
                    for (var c = 0; c < s16Cols.length; c++) {
                        var cell = document.getElementById('s16-' + s16Cols[c] + r);
                        if (cell) {
                            cell.classList.remove('s16-pos-range', 's16-neg-range', 's16-overlap-range');
                        }
                    }
                }

                // Apply Range 1 highlights
                if (s16PosRange) {
                    for (var r = s16PosRange.minRow; r <= s16PosRange.maxRow; r++) {
                        for (var c = s16PosRange.minCol; c <= s16PosRange.maxCol; c++) {
                            var cell = document.getElementById('s16-' + s16Cols[c] + r);
                            if (cell) cell.classList.add('s16-pos-range');
                        }
                    }
                }

                // Apply Range 2 highlights
                if (s16NegRange) {
                    for (var r = s16NegRange.minRow; r <= s16NegRange.maxRow; r++) {
                        for (var c = s16NegRange.minCol; c <= s16NegRange.maxCol; c++) {
                            var cell = document.getElementById('s16-' + s16Cols[c] + r);
                            if (cell) {
                                if (cell.classList.contains('s16-pos-range')) {
                                    cell.classList.remove('s16-pos-range');
                                    cell.classList.add('s16-overlap-range');
                                } else {
                                    cell.classList.add('s16-neg-range');
                                }
                            }
                        }
                    }
                }

                var r1Count = getRangeCellCount(s16PosRange);
                var r2Count = getRangeCellCount(s16NegRange);
                var totCount = r1Count + r2Count;

                var posSum = calcS16RangeSum(s16PosRange);
                var negSum = calcS16RangeSum(s16NegRange);
                var rawSum = posSum + negSum;
                var net = Number((rawSum / 100).toFixed(2));

                var isOverlapping = checkS16Overlap(s16PosRange, s16NegRange);

                // Rule Validations
                var r1Valid = r1Count >= 4;
                var r2Valid = r2Count >= 4;
                var totValid = totCount <= 20 && totCount > 0;
                var isAllValid = r1Valid && r2Valid && totValid && !isOverlapping;

                var r1CountEl = document.getElementById('s16-r1-count');
                var r2CountEl = document.getElementById('s16-r2-count');
                var totCountEl = document.getElementById('s16-tot-count');
                var overlapStatusEl = document.getElementById('s16-overlap-status');

                if (r1CountEl) {
                    r1CountEl.textContent = r1Count + ' cells ' + (r1Valid ? '✅' : '❌ (min 4)');
                    r1CountEl.className = 'font-bold font-mono ' + (r1Valid ? 'text-emerald-400' : 'text-rose-400');
                }
                if (r2CountEl) {
                    r2CountEl.textContent = r2Count + ' cells ' + (r2Valid ? '✅' : '❌ (min 4)');
                    r2CountEl.className = 'font-bold font-mono ' + (r2Valid ? 'text-cyan-400' : 'text-rose-400');
                }
                if (totCountEl) {
                    totCountEl.textContent = totCount + ' / 20 ' + (totValid ? '✅' : '❌ (max 20)');
                    totCountEl.className = 'font-bold font-mono ' + (totValid ? 'text-cyan-400' : 'text-rose-400');
                }
                if (overlapStatusEl) {
                    overlapStatusEl.textContent = !isOverlapping ? 'None ✅' : 'Overlap ❌';
                    overlapStatusEl.className = 'font-bold font-mono ' + (!isOverlapping ? 'text-emerald-400' : 'text-rose-400');
                }

                var scoreSumEl = document.getElementById('s16-score-sum');
                var deductSumEl = document.getElementById('s16-deduct-sum');
                var formulaEl = document.getElementById('s16-formula-preview');
                var warningEl = document.getElementById('s16-rule-warning');
                var netEl = document.getElementById('s16-net-score');
                var statusEl = document.getElementById('s16-status-banner');

                if (scoreSumEl) scoreSumEl.textContent = (posSum >= 0 ? '+' : '') + posSum + ' pts (' + r1Count + ' cells)';
                if (deductSumEl) deductSumEl.textContent = (negSum >= 0 ? '+' : '') + negSum + ' pts (' + r2Count + ' cells)';
                
                if (formulaEl) {
                    var posStr = formatS16RangeObj(s16PosRange) || 'A1';
                    var negStr = formatS16RangeObj(s16NegRange) || 'A1';
                    formulaEl.textContent = '=(SUM(' + posStr + ') + SUM(' + negStr + ')) / 100';
                }

                if (warningEl) {
                    if (!isAllValid) {
                        warningEl.classList.remove('hidden');
                        if (isOverlapping) {
                            warningEl.textContent = '⚠️ Rule: Ranges cannot overlap! Each cell can only be selected once.';
                        } else if (!r1Valid || !r2Valid) {
                            warningEl.textContent = '⚠️ Rule: Each range must have at least 4 cells!';
                        } else if (!totValid) {
                            warningEl.textContent = '⚠️ Rule: Combined ranges cannot exceed 20 cells!';
                        }
                    } else {
                        warningEl.classList.add('hidden');
                    }
                }

                if (netEl) {
                    if (!isAllValid) {
                        netEl.textContent = 'INVALID';
                        netEl.className = 'text-xl font-extrabold font-mono text-rose-500 animate-pulse';
                    } else {
                        netEl.textContent = (net >= 0 ? '+' : '') + net;
                        netEl.className = 'text-2xl font-extrabold font-mono ' + (net >= 0 ? 'text-amber-400' : 'text-rose-400');
                    }
                }

                if (statusEl) {
                    if (!isAllValid) {
                        if (isOverlapping) {
                            statusEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-rose-400"></i> <span class="text-rose-400">Ranges cannot overlap! Each cell can only be selected once.</span>';
                        } else {
                            statusEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-rose-400"></i> <span class="text-rose-400">Rules not met: Min 4 cells per range, Max 20 cells combined!</span>';
                        }
                    } else if (net >= 1.0) {
                        statusEl.innerHTML = '<i class="fa-solid fa-trophy text-amber-400"></i> <span class="text-emerald-400">High Score! Excellent combination strategy!</span>';
                    } else {
                        statusEl.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-400"></i> <span class="text-slate-300">Valid strategy! Try finding higher value positive blocks.</span>';
                    }
                }
            }

            window.submitS16Score = async function() {
                var r1Count = getRangeCellCount(s16PosRange);
                var r2Count = getRangeCellCount(s16NegRange);
                var totCount = r1Count + r2Count;
                var isOverlapping = checkS16Overlap(s16PosRange, s16NegRange);
                if (isOverlapping) {
                    alert("Ranges cannot overlap! Each cell can only be selected once.");
                    return;
                }
                if (r1Count < 4 || r2Count < 4 || totCount > 20) {
                    alert("Please satisfy all rules before submitting: Min 4 cells per range, Max 20 combined, No overlap!");
                    return;
                }
                var posSum = calcS16RangeSum(s16PosRange);
                var negSum = calcS16RangeSum(s16NegRange);
                var rawSum = posSum + negSum;
                var net = Number((rawSum / 100).toFixed(2));
                var posStr = formatS16RangeObj(s16PosRange);
                var negStr = formatS16RangeObj(s16NegRange);
                var formula = '=(SUM(' + posStr + ') + SUM(' + negStr + ')) / 100';

                var token = localStorage.getItem('token');
                var urlParams = new URLSearchParams(window.location.search);
                var courseId = window.__SYNC_COURSE_ID__ || urlParams.get('id') || urlParams.get('courseId') || '';

                var statusEl = document.getElementById('s16-save-status');

                if (!token || !courseId) {
                    localStorage.setItem('s16_saved_score', JSON.stringify({ score: net, formula: formula, timestamp: new Date().toISOString() }));
                    if (statusEl) {
                        statusEl.className = 'text-[11px] text-center font-bold mb-2 text-emerald-400 block';
                        statusEl.textContent = '✅ Score ' + (net >= 0 ? '+' : '') + net + ' saved locally!';
                    }
                    return;
                }

                try {
                    var res = await fetch('/api/courses/submit-score', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                        body: JSON.stringify({ courseId: courseId, score: net, range1: posStr, range2: negStr, formula: formula })
                    });
                    if (res.ok) {
                        if (statusEl) {
                            statusEl.className = 'text-[11px] text-center font-bold mb-2 text-emerald-400 block';
                            statusEl.textContent = '✅ Score ' + (net >= 0 ? '+' : '') + net + ' saved to Teacher Gradebook!';
                        }
                    } else {
                        var d = await res.json();
                        if (statusEl) {
                            statusEl.className = 'text-[11px] text-center font-bold mb-2 text-amber-400 block';
                            statusEl.textContent = 'Saved: ' + (d.error || 'Locally');
                        }
                    }
                } catch (err) {
                    if (statusEl) {
                        statusEl.className = 'text-[11px] text-center font-bold mb-2 text-emerald-400 block';
                        statusEl.textContent = '✅ Score saved locally!';
                    }
                }
            };
`;

function buildFullHTML() {
    let html = baseHTML;

    // 1. Insert CSS
    html = html.replace('</style>', function() { return s16CSS + '\n    </style>'; });

    // 2. Update total-slide-num fallback to 16
    html = html.replace('<span id="total-slide-num">12</span>', function() { return '<span id="total-slide-num">16</span>'; });

    // 3. Insert Slides 13, 14, 15, 16 right after Slide 12's closing </div>
    const slide12ClosePattern = '        </div>\n    </div>\n\n    <script>';
    if (!html.includes(slide12ClosePattern)) {
        throw new Error("Could not find Slide 12 closing pattern");
    }
    html = html.replace(slide12ClosePattern, function() {
        return '        </div>\n    </div>\n' + slides13_16_HTML + '\n\n    <script>';
    });

    // 4. Insert Slide 13-16 helper variables and functions right after currentSlideIndex = 0 (top of DOMContentLoaded)
    html = html.replace('let currentSlideIndex = 0;', function() {
        return 'let currentSlideIndex = 0;\n' + slides13_16_FUNCTIONS;
    });

    // 5. Insert grid builder calls in DOMContentLoaded
    html = html.replace('buildSlide12Grid();', function() {
        return 'buildSlide12Grid();\n            buildSlide13Grid();\n            buildSlide14Grid();\n            buildSlide15Grid();\n            buildSlide16Grid();';
    });

    return html;
}

async function main() {
    const finalHTML = buildFullHTML();

    fs.writeFileSync('excel_a_course.html', finalHTML, 'utf8');
    fs.writeFileSync('excel_b_course.html', finalHTML, 'utf8');
    console.log("Written excel_a_course.html and excel_b_course.html (16 Slides)");

    // Update DB
    await prisma.course.updateMany({
        where: { id: 'cms1kpibu0001wfaoyhkvj9id' },
        data: { htmlContent: finalHTML }
    });

    await prisma.course.updateMany({
        where: { id: 'cms7c77ap0001wfpk6qjc1nm7' },
        data: { htmlContent: finalHTML }
    });

    console.log("Database updated successfully!");
}

main().finally(() => prisma.$disconnect());
