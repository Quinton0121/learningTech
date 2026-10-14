#!/usr/bin/env python3
"""
Excel Complete Course Presentation & HTML Exporter
Generates:
1. Excel_Complete_Course.pptx - Full 22-slide widescreen deck matching EXCEL_SLIDES_STYLE_GUIDE.md
2. excel_course_export.html - Standalone HTML distribution of the course
"""

import os
import sys
import shutil
import subprocess
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor

CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP_DIR = "scratch_slide_renders"
OUTPUT_PPTX = "Excel_Complete_Course.pptx"
OUTPUT_PPTX_V2 = "Excel_Complete_Course_v2.pptx"

# Colors matching EXCEL_SLIDES_STYLE_GUIDE.md
COLOR_TITLE = RGBColor(0x11, 0x18, 0x27)
COLOR_SUBTITLE = RGBColor(0x4B, 0x55, 0x63)
COLOR_TEAL = RGBColor(0x15, 0x9F, 0x8B)
COLOR_BG_TINT = RGBColor(0xF0, 0xFD, 0xF4) # Soft mint tint for title slide

SLIDES_DATA = [
    # Slide 2: Columns & Rows
    {
        "num": 2,
        "category": "MODULE 1 • SPREADSHEET ARCHITECTURE",
        "title": "Columns and Rows: The Foundation of Every Sheet",
        "subtitle": "Spreadsheets organize all data into a two-dimensional grid of vertical letters and horizontal numbers",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge blue-badge">Structure</div>
                <div class="card-title">Columns Go Down</div>
                <div class="card-desc">Columns run vertically from top to bottom. Each column is identified by an alphabetical letter (A, B, C... Z, AA...).</div>
                <div class="formula-pill">Columns: <span class="hl-green">A, B, C, D...</span></div>
            </div>
            <div class="card">
                <div class="badge orange-badge">Structure</div>
                <div class="card-title">Rows Go Across</div>
                <div class="card-desc">Rows run horizontally from left to right. Each row is identified by a sequential integer number (1, 2, 3... 1,048,576).</div>
                <div class="formula-pill">Rows: <span class="hl-green">1, 2, 3, 4...</span></div>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> Letters ALWAYS identify vertical Columns; Numbers ALWAYS identify horizontal Rows. Together they form every coordinate on the sheet.
        </div>
        """
    },
    # Slide 3: Cell Coordinates
    {
        "num": 3,
        "category": "MODULE 2 • CELL COORDINATES",
        "title": "Where They Meet is a Cell: Unique Address Coordinates",
        "subtitle": "Every box on the sheet has a unique coordinate name formed by Column Letter + Row Number",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge purple-badge">Coordinates</div>
                <div class="card-title">Column Letter + Row Number</div>
                <div class="card-desc">An address specifies the Column letter first, followed immediately by the Row number. B2 represents Column B, Row 2.</div>
                <div class="formula-pill">Coordinate: <span class="hl-blue">B2</span> (Col B &cap; Row 2)</div>
            </div>
            <div class="card">
                <div class="badge green-badge">Grid Examples</div>
                <div class="card-title">Coordinate Grid Map</div>
                <table class="data-tbl">
                    <tr><th>Coordinate</th><th>Column</th><th>Row</th><th>Typical Content</th></tr>
                    <tr><td><strong>A1</strong></td><td>Column A</td><td>Row 1</td><td>Table Header ("Item Name")</td></tr>
                    <tr class="hl-row"><td><strong>B2</strong></td><td>Column B</td><td>Row 2</td><td>Numeric Quantity (250)</td></tr>
                    <tr><td><strong>C3</strong></td><td>Column C</td><td>Row 3</td><td>Unit Price ($15.00)</td></tr>
                </table>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> You cannot reverse coordinates (e.g. 2B is invalid syntax). Always write the Letter first, then the Number: B2.
        </div>
        """
    },
    # Slide 4: Cells Talk to Each Other
    {
        "num": 4,
        "category": "MODULE 3 • CELL DYNAMICS",
        "title": "Cells Talk to Each Other: The Power of Dynamic Linking",
        "subtitle": "Instead of adding fixed numbers, you connect cell addresses so calculations update automatically",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge blue-badge">Concept</div>
                <div class="card-title">Static Math vs. Dynamic Cells</div>
                <div class="card-desc">Typing 100 + 50 creates an inert static value. Writing =A1+B1 dynamically links cells—changing A1 automatically recalculates the total!</div>
                <div class="formula-pill">=A1 + B1 &nbsp;&rarr;&nbsp; <span class="hl-green">Auto-Recalculates</span></div>
            </div>
            <div class="card">
                <div class="badge green-badge">Live Reactive Test</div>
                <div class="card-title">Reactive Recalculation</div>
                <table class="data-tbl">
                    <tr><th>Cell A1</th><th>Cell B1</th><th>Formula (C1)</th><th>Result</th><th>Behavior</th></tr>
                    <tr><td>100</td><td>50</td><td>=A1+B1</td><td>150</td><td>Initial total</td></tr>
                    <tr class="hl-row"><td><strong>250</strong> (Updated)</td><td>50</td><td>=A1+B1</td><td><strong>300</strong></td><td><strong>Auto-updated instantly!</strong></td></tr>
                </table>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> Never hardcode static numbers into formulas if those values exist in other cells. Let the cells do the talking!
        </div>
        """
    },
    # Slide 5: The Magic Equals Sign
    {
        "num": 5,
        "category": "MODULE 4 • FORMULA SYNTAX",
        "title": "The Magic Equals Sign: Activating the Calculation Engine",
        "subtitle": "The equals sign tells Excel to calculate a formula rather than storing inert plain text",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge orange-badge">Syntax Rule</div>
                <div class="card-title">Plain Text vs. Live Formula</div>
                <div class="card-desc">Typing 5+5 stores the literal characters "5+5". Typing =5+5 activates Excel's math calculation engine to display 10.</div>
                <div class="formula-pill">= &nbsp;(Mandatory prefix for calculations)</div>
            </div>
            <div class="card">
                <div class="badge blue-badge">Formula Bar</div>
                <div class="card-title">What You See vs. What Is Inside</div>
                <div class="card-desc">The cell displays the evaluated Result (30), while the Formula Bar above shows the underlying instruction (=10+20).</div>
                <table class="data-tbl">
                    <tr><th>Location</th><th>Displayed Value</th><th>Meaning</th></tr>
                    <tr><td><strong>Sheet Cell C1</strong></td><td><span class="hl-green">30</span></td><td>The evaluated mathematical answer</td></tr>
                    <tr class="hl-row"><td><strong>Formula Bar fx</strong></td><td><code>=10+20</code></td><td>The active formula code</td></tr>
                </table>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> Every formula and function in Excel MUST begin with an equals sign (=). Without it, Excel treats your input as inert text.
        </div>
        """
    },
    # Slide 6: Point and Click
    {
        "num": 6,
        "category": "MODULE 5 • WORKFLOW EFFICIENCY",
        "title": "Building Formulas by Clicking: Fast, Accurate & Visual",
        "subtitle": "Speed up formula creation and eliminate typing mistakes by clicking cells directly on the grid",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge green-badge">5-Step Workflow</div>
                <div class="card-title">Point-and-Click Workflow</div>
                <div class="card-desc">1. Select target cell C2 &nbsp;&bull;&nbsp; 2. Type = &nbsp;&bull;&nbsp; 3. Click cell A2 &nbsp;&bull;&nbsp; 4. Type minus (-) &nbsp;&bull;&nbsp; 5. Click cell B1 &nbsp;&bull;&nbsp; Press Enter!</div>
                <div class="formula-pill">= A2 - B1 &nbsp;&rarr;&nbsp; <span class="hl-green">Evaluated</span></div>
            </div>
            <div class="card">
                <div class="badge purple-badge">Color Highlights</div>
                <div class="card-title">Visual Color Boundaries</div>
                <div class="card-desc">Excel outlines referenced cells with matching colored borders on your spreadsheet so you can visually verify selections instantly.</div>
                <table class="data-tbl">
                    <tr><th>Term in Formula</th><th>Outline Color on Grid</th><th>Verification Status</th></tr>
                    <tr><td><code>A2</code> (320)</td><td><span style="color:#2563eb;font-weight:700;">Blue Border</span></td><td>First term confirmed</td></tr>
                    <tr class="hl-row"><td><code>B1</code> (100)</td><td><span style="color:#dc2626;font-weight:700;">Red Border</span></td><td>Deduction term confirmed</td></tr>
                </table>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> Point-and-click prevents coordinate typos in large spreadsheets with dozens of columns. Let your mouse select targets for you.
        </div>
        """
    },
    # Slide 7: Entire Rows & Columns
    {
        "num": 7,
        "category": "MODULE 6 • RANGE SELECTION",
        "title": "Selecting Entire Rows & Columns: Infinite Range Targeting",
        "subtitle": "Target full columns (A:A) or rows (1:1) to apply styling, formatting, or automated formulas",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge blue-badge">Selection Syntax</div>
                <div class="card-title">Clicking Border Headers</div>
                <div class="card-desc">Clicking letter 'A' selects all 1,048,576 rows in Column A, denoted with a colon: A:A. Clicking row number '1' selects 1:1.</div>
                <div class="formula-pill">Column: <span class="hl-green">A:A</span> &nbsp;|&nbsp; Row: <span class="hl-blue">1:1</span></div>
            </div>
            <div class="card">
                <div class="badge green-badge">Formula Application</div>
                <div class="card-title">Future-Proof Totaling</div>
                <div class="card-desc">Formulas like =SUM(B:B) sum every present and future number entered into column B without ever having to update the formula range!</div>
                <table class="data-tbl">
                    <tr><th>Expression</th><th>Target Span</th><th>Best Application</th></tr>
                    <tr><td><code>A:A</code></td><td>Entire Column A</td><td>Unlimited continuous log sheets</td></tr>
                    <tr class="hl-row"><td><code>=SUM(B:B)</code></td><td>All numeric cells in Col B</td><td><strong>Maintenance-free grand totals</strong></td></tr>
                </table>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> Using full column references like =SUM(B:B) automatically absorbs new rows as they are entered—no formula edits needed!
        </div>
        """
    },
    # Slide 8: Ranges & The Colon Operator
    {
        "num": 8,
        "category": "MODULE 7 • CELL RANGES",
        "title": "Grouping Cells Together: The Colon Range Connector (:)",
        "subtitle": "A Range is a continuous block of cells connected from top-left to bottom-right using a colon (:)",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge orange-badge">Colon Syntax</div>
                <div class="card-title">Colon (:) Means "Through"</div>
                <div class="card-desc">Instead of writing =A1+A2+A3+A4+A5, Excel uses the colon operator to designate all contiguous cells from A1 through A5.</div>
                <div class="formula-pill">A1:A5 &nbsp;=&nbsp; <span class="hl-green">Cells A1 through A5</span></div>
            </div>
            <div class="card">
                <div class="badge purple-badge">Colon vs. Comma</div>
                <div class="card-title">Crucial Syntax Distinction</div>
                <div class="card-desc">The colon connects a continuous block. The comma combines discrete separate cells or independent function arguments.</div>
                <table class="data-tbl">
                    <tr><th>Operator</th><th>Formula</th><th>Cells Included</th><th>Meaning</th></tr>
                    <tr class="hl-row"><td><strong>Colon ( : )</strong></td><td><code>=SUM(A1:A4)</code></td><td>4 cells (A1, A2, A3, A4)</td><td>"Sum from A1 <strong>through</strong> A4"</td></tr>
                    <tr><td><strong>Comma ( , )</strong></td><td><code>=SUM(A1, A4)</code></td><td>2 cells only (A1 and A4)</td><td>"Sum cell A1 <strong>and</strong> cell A4"</td></tr>
                </table>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> In Excel formulas, Colon (:) means 'THROUGH' (continuous span); Comma (,) means 'AND' (separate individual items).
        </div>
        """
    },
    # Slide 9: Math Operators
    {
        "num": 9,
        "category": "MODULE 8 • MATHEMATICAL OPERATORS",
        "title": "Excel's Calculator Keys: Arithmetic & Order of Operations",
        "subtitle": "Master Excel's core mathematical symbols and operator precedence rules (PEMDAS)",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge blue-badge">Keyboard Symbols</div>
                <div class="card-title">The 4 Core Operators</div>
                <table class="data-tbl">
                    <tr><th>Operation</th><th>Key</th><th>Name</th><th>Example</th><th>Result</th></tr>
                    <tr><td>Addition</td><td><code>+</code></td><td>Plus Sign</td><td>=120 + 30</td><td>150</td></tr>
                    <tr><td>Subtraction</td><td><code>-</code></td><td>Minus Sign</td><td>=120 - 30</td><td>90</td></tr>
                    <tr class="hl-row"><td>Multiplication</td><td><code>*</code></td><td>Asterisk</td><td>=120 * 3</td><td>360</td></tr>
                    <tr><td>Division</td><td><code>/</code></td><td>Forward Slash</td><td>=120 / 4</td><td>30</td></tr>
                </table>
            </div>
            <div class="card">
                <div class="badge green-badge">PEMDAS Rules</div>
                <div class="card-title">Order of Operations</div>
                <div class="card-desc">Excel evaluates Parentheses () first, then Exponents ^, then Multiplication & Division * /, then Addition & Subtraction + -.</div>
                <div class="formula-pill">=(10 + 20) * 2 = <span class="hl-green">60</span> &nbsp;|&nbsp; 10 + 20 * 2 = <span class="hl-blue">50</span></div>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> Never use 'x' for multiplication or '÷' for division in Excel. Always use the asterisk (*) and forward slash (/).
        </div>
        """
    },
    # Slide 10: Calculate the Cost
    {
        "num": 10,
        "category": "MODULE 9 • BUSINESS MATH",
        "title": "Calculate the Cost: Real-World Invoicing & Inventory",
        "subtitle": "Applying cell coordinates and multiplication to build professional commercial spreadsheets",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge green-badge">Cost Model</div>
                <div class="card-title">Quantity &times; Unit Price</div>
                <div class="card-desc">Commercial sheets calculate line total by multiplying Quantity by Unit Price: Total = Quantity * Price.</div>
                <div class="formula-pill">Cell D2: <span class="hl-green">=B2 * C2</span></div>
            </div>
            <div class="card">
                <div class="badge blue-badge">Store Inventory</div>
                <div class="card-title">Produce Market Ledger</div>
                <table class="data-tbl">
                    <tr><th>Item (Col A)</th><th>Quantity (Col B)</th><th>Price (Col C)</th><th>Formula (Col D)</th><th>Line Total</th></tr>
                    <tr class="hl-row"><td>Crisp Apples</td><td>5 kg</td><td>$4.00</td><td>=B2*C2</td><td><strong>$20.00</strong></td></tr>
                    <tr><td>Fresh Bananas</td><td>12 bunches</td><td>$1.50</td><td>=B3*C3</td><td><strong>$18.00</strong></td></tr>
                    <tr><td>Navel Oranges</td><td>8 kg</td><td>$3.25</td><td>=B4*C4</td><td><strong>$26.00</strong></td></tr>
                </table>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> Clean spreadsheets isolate raw numbers in separate columns, leaving calculations entirely to formulas.
        </div>
        """
    },
    # Slide 11: Relative References
    {
        "num": 11,
        "category": "MODULE 10 • RELATIVE REFERENCES",
        "title": "The True Power of Excel: Dynamic Relative Positioning",
        "subtitle": "Formulas remember spatial directions, adapting automatically as they are copied down or across",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge purple-badge">Spatial Vector</div>
                <div class="card-title">Excel Thinks in Directions</div>
                <div class="card-desc">In cell D2, =B2*C2 doesn't mean fixed coordinates. To Excel, it means: "Multiply the cell 2 steps left by the cell 1 step left!"</div>
                <div class="formula-pill">Vector: <span class="hl-blue">[&larr; 2 steps]</span> &times; <span class="hl-green">[&larr; 1 step]</span></div>
            </div>
            <div class="card">
                <div class="badge orange-badge">Row Propagation</div>
                <div class="card-title">Downward Copy Behavior</div>
                <table class="data-tbl">
                    <tr><th>Target Cell</th><th>Stored Formula</th><th>Relative Adjustment</th><th>Output Meaning</th></tr>
                    <tr><td><strong>Row 2 (D2)</strong></td><td><code>=B2*C2</code></td><td>Base formula</td><td>Evaluates Row 2 items</td></tr>
                    <tr class="hl-row"><td><strong>Row 3 (D3)</strong></td><td><code>=B3*C3</code></td><td>Row numbers +1</td><td>Evaluates Row 3 items</td></tr>
                    <tr><td><strong>Row 4 (D4)</strong></td><td><code>=B4*C4</code></td><td>Row numbers +2</td><td>Evaluates Row 4 items</td></tr>
                </table>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> Relative references mean you only write a formula ONCE—Excel adapts it for thousands of rows automatically.
        </div>
        """
    },
    # Slide 12: The Fill Handle
    {
        "num": 12,
        "category": "MODULE 11 • FILL HANDLE",
        "title": "The Fill Handle: Drag to Copy Formulas in Seconds",
        "subtitle": "The small square at the bottom-right corner of a cell duplicates logic instantly across rows",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge green-badge">UI Feature</div>
                <div class="card-title">The Tiny Green Square</div>
                <div class="card-desc">Select formula cell D2. Hover over the bottom-right corner until the cursor changes into a solid black crosshair (+). Click and drag down!</div>
                <div class="formula-pill">Hover Corner &rarr; <span class="hl-green">Black Crosshair (+)</span> &rarr; Drag</div>
            </div>
            <div class="card">
                <div class="badge blue-badge">Pro Shortcut</div>
                <div class="card-title">The Double-Click Miracle</div>
                <table class="data-tbl">
                    <tr><th>Method</th><th>Technique</th><th>Speed</th></tr>
                    <tr><td>Manual Typing</td><td>Re-typing formulas for 50 rows</td><td>~10 minutes (errors)</td></tr>
                    <tr><td>Drag & Fill</td><td>Drag handle down table</td><td>~3 seconds</td></tr>
                    <tr class="hl-row"><td><strong>Double-Click</strong></td><td>Double-click black crosshair</td><td><strong>0.5 seconds (flawless)</strong></td></tr>
                </table>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> Double-clicking the fill handle matches the exact height of adjacent columns—instant and error-free!
        </div>
        """
    },
    # Slide 13: Practice Lab 1
    {
        "num": 13,
        "category": "MODULE 12 • PRACTICE LAB 1",
        "title": "Theme Park Ticket Booth: Live Sales Calculator",
        "subtitle": "Calculating multi-tier ticketing revenue using cell coordinates and line-item multiplication",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge orange-badge">Ticketing Ledger</div>
                <div class="card-title">Admissions Ledger</div>
                <table class="data-tbl">
                    <tr><th>Ticket Tier</th><th>Visitors (B)</th><th>Price (C)</th><th>Formula (D)</th><th>Revenue</th></tr>
                    <tr><td>Adult Admission</td><td>140</td><td>$50.00</td><td>=B2*C2</td><td>$7,000.00</td></tr>
                    <tr><td>Child (Under 12)</td><td>85</td><td>$25.00</td><td>=B3*C3</td><td>$2,125.00</td></tr>
                    <tr><td>VIP FastPass</td><td>30</td><td>$120.00</td><td>=B4*C4</td><td>$3,600.00</td></tr>
                </table>
            </div>
            <div class="card">
                <div class="badge green-badge">Grand Total</div>
                <div class="card-title">Vertical Aggregation with SUM</div>
                <div class="card-desc">Line items calculate horizontal sales (=B2*C2). The bottom summary cell uses vertical summation to calculate grand daily revenue.</div>
                <div class="formula-pill">Daily Total: =SUM(D2:D4) &nbsp;&rarr;&nbsp; <span class="hl-green">$12,725.00</span></div>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> Horizontal formulas multiply across columns; vertical SUM functions aggregate totals down rows.
        </div>
        """
    },
    # Slide 14: Practice Lab 2
    {
        "num": 14,
        "category": "MODULE 13 • PRACTICE LAB 2",
        "title": "Hero Combat Formulas: Multi-term Compound Calculations",
        "subtitle": "Combining addition (+) and subtraction (-) in single formulas to evaluate fantasy game battle damage",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge purple-badge">Game Math</div>
                <div class="card-title">Combat Damage Rule</div>
                <div class="card-desc">Game Rule: Net Damage = (Base Attack + Weapon Buff) - Enemy Defense. In Excel formula syntax: =B2 + C2 - D2.</div>
                <div class="formula-pill">Final DMG: <span class="hl-blue">=B2 + C2 - D2</span></div>
            </div>
            <div class="card">
                <div class="badge red-badge">Battle Roster</div>
                <div class="card-title">Hero Party vs. Dragon Boss</div>
                <table class="data-tbl">
                    <tr><th>Hero Class</th><th>Base ATK (B)</th><th>Buff (C)</th><th>Boss DEF (D)</th><th>Formula</th><th>Net DMG</th></tr>
                    <tr class="hl-row"><td><strong>Knight</strong></td><td>120</td><td>45</td><td>50</td><td>=B2+C2-D2</td><td><strong>115 DMG</strong></td></tr>
                    <tr><td><strong>Mage</strong></td><td>160</td><td>80</td><td>50</td><td>=B3+C3-D3</td><td><strong>190 DMG</strong></td></tr>
                    <tr><td><strong>Archer</strong></td><td>140</td><td>30</td><td>50</td><td>=B4+C4-D4</td><td><strong>120 DMG</strong></td></tr>
                </table>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> You can chain unlimited math operations in a single formula. Use parentheses if addition must precede multiplication.
        </div>
        """
    },
    # Slide 15: Practice Lab 3
    {
        "num": 15,
        "category": "MODULE 14 • PRACTICE LAB 3",
        "title": "Pizza Party Budget: 1 Formula to Rule 5 Line Items",
        "subtitle": "Replicating budgeting formulas across varied items using a single downward fill handle drag",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge green-badge">Party Budget</div>
                <div class="card-title">5 Party Supplies</div>
                <table class="data-tbl">
                    <tr><th>Item Description</th><th>Qty (B)</th><th>Unit Cost (C)</th><th>Line Total (D)</th><th>Status</th></tr>
                    <tr class="hl-row"><td>Large Pepperoni</td><td>6</td><td>$15.00</td><td>=B2*C2</td><td>$90.00 (Entered)</td></tr>
                    <tr><td>Cheesy Bread</td><td>4</td><td>$6.50</td><td>=B3*C3</td><td>$26.00 (Filled)</td></tr>
                    <tr><td>2L Soda Pitchers</td><td>8</td><td>$3.50</td><td>=B4*C4</td><td>$28.00 (Filled)</td></tr>
                    <tr><td>Fresh Salad Bowls</td><td>3</td><td>$8.00</td><td>=B5*C5</td><td>$24.00 (Filled)</td></tr>
                    <tr><td>Ice Cream Cups</td><td>25</td><td>$1.20</td><td>=B6*C6</td><td>$30.00 (Filled)</td></tr>
                </table>
            </div>
            <div class="card">
                <div class="badge blue-badge">Summary Metric</div>
                <div class="card-title">Budget Health Check</div>
                <div class="card-desc">Writing =B2*C2 in cell D2 once and dragging down to D6 calculates the entire party in 2 seconds! Total budget: =SUM(D2:D6).</div>
                <div class="formula-pill">Party Total: =SUM(D2:D6) &nbsp;&rarr;&nbsp; <span class="hl-green">$198.00</span></div>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> Writing 1 formula and dragging it takes 3 seconds, eliminating repetitive manual typing while preventing mistakes.
        </div>
        """
    },
    # Slide 16: Practice Lab 4
    {
        "num": 16,
        "category": "MODULE 15 • PRACTICE LAB 4",
        "title": "Strategic Range Mining: Combining Multiple Disjoint Ranges",
        "subtitle": "Mastering multi-range formulas like =SUM(A1:B2) + SUM(I9:J10) to aggregate separate blocks",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge orange-badge">Syntax Options</div>
                <div class="card-title">Combining Disjoint Ranges</div>
                <div class="card-desc">When data is split across separate grid sectors, combine them using arithmetic operators (+) or function argument commas (,).</div>
                <div class="formula-pill">=SUM(A1:B2) + SUM(I9:J10) &nbsp;|&nbsp; <span class="hl-green">=SUM(A1:B2, I9:J10)</span></div>
            </div>
            <div class="card">
                <div class="badge green-badge">Range Rules</div>
                <div class="card-title">Range Geometry Verification</div>
                <table class="data-tbl">
                    <tr><th>Range Expression</th><th>Grid Location</th><th>Dimensions</th><th>Cell Count</th></tr>
                    <tr><td><code>A1:B2</code></td><td>Top-Left Quadrant</td><td>2 Cols &times; 2 Rows</td><td>4 cells</td></tr>
                    <tr><td><code>I9:J10</code></td><td>Bottom-Right Quadrant</td><td>2 Cols &times; 2 Rows</td><td>4 cells</td></tr>
                    <tr class="hl-row"><td><strong>Combined Span</strong></td><td>Both Quadrants</td><td>4 + 4 cells</td><td><strong>8 total cells</strong></td></tr>
                </table>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> In Excel functions, commas let you supply multiple separate ranges: =SUM(range1, range2, range3).
        </div>
        """
    },
    # Slide 17: Absolute References ($)
    {
        "num": 17,
        "category": "MODULE 16 • ABSOLUTE REFERENCES",
        "title": "The Dollar Sign Clamp ($): Locking Cell Coordinates",
        "subtitle": "How to anchor specific cells so they never shift when formulas are dragged or copied",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge red-badge">Anchor Modes</div>
                <div class="card-title">The 4 Reference Modes (F4 Key)</div>
                <table class="data-tbl">
                    <tr><th>Reference</th><th>Mode Name</th><th>Behavior When Dragged</th><th>F4 Shortcut</th></tr>
                    <tr><td><code>B1</code></td><td><strong>Relative</strong></td><td>Drifts freely in all directions</td><td>Default</td></tr>
                    <tr class="hl-row"><td><code>$B$1</code></td><td><strong>Absolute</strong></td><td><strong>Fully locked in place. Never moves</strong></td><td>Tap F4 1&times;</td></tr>
                    <tr><td><code>B$1</code></td><td><strong>Mixed Row</strong></td><td>Row 1 locked; column drifts</td><td>Tap F4 2&times;</td></tr>
                    <tr><td><code>$B1</code></td><td><strong>Mixed Col</strong></td><td>Column B locked; row drifts</td><td>Tap F4 3&times;</td></tr>
                </table>
            </div>
            <div class="card">
                <div class="badge blue-badge">Lab Application</div>
                <div class="card-title">Multiplying by a Fixed Rate</div>
                <div class="card-desc">When calculating tax, discounts, or chemistry reagent rates from cell $B$1, formula =A2*$B$1 keeps $B$1 pinned while A2 drifts down!</div>
                <div class="formula-pill">Formula: <span class="hl-green">=A2 * $B$1</span> &nbsp;&rarr;&nbsp; =A3 * $B$1</div>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> Put the dollar sign ($) before whatever you want to freeze: $B locks Column B; $1 locks Row 1. Tap F4 to cycle modes.
        </div>
        """
    },
    # Slide 18: Core Functions Studio
    {
        "num": 18,
        "category": "MODULE 17 • FUNCTION CATALOG",
        "title": "Excel Core Functions Studio: The 15 Must-Know Tools",
        "subtitle": "Built-in algorithms that execute advanced calculations, statistical analysis, and text tasks in one step",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge green-badge">Function Families</div>
                <div class="card-title">The 3 Major Function Families</div>
                <table class="data-tbl">
                    <tr><th>Family</th><th>Key Functions</th><th>What They Do</th></tr>
                    <tr class="hl-row"><td><strong>Math & Rounding</strong></td><td>SUM, ROUND, ROUNDUP, ROUNDDOWN, MOD</td><td>Addition, precision rules, remainder</td></tr>
                    <tr><td><strong>Stats & Extremes</strong></td><td>AVERAGE, MAX, MIN, LARGE, SMALL, MEDIAN</td><td>Mean, leaderboards, rankings, middle</td></tr>
                    <tr><td><strong>Counting & Text</strong></td><td>COUNT, COUNTA, COUNTIF, MID, CONCAT</td><td>Count numbers/text, criteria, string join</td></tr>
                </table>
            </div>
            <div class="card">
                <div class="badge blue-badge">Syntax Anatomy</div>
                <div class="card-title">Anatomy of a Function Call</div>
                <div class="card-desc">All functions follow =NAME(argument1, [argument2], ...). Arguments can be single numbers, coordinates, or continuous ranges.</div>
                <div class="formula-pill">=SUM(A1:A5) &nbsp;|&nbsp; <span class="hl-green">=ROUND(3.14159, 2) &rarr; 3.14</span></div>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> Functions replace complex manual arithmetic with proven, tested algorithms. SUM, AVERAGE, and ROUND form 80% of daily work.
        </div>
        """
    },
    # Slide 19: AVERAGE Visualizer
    {
        "num": 19,
        "category": "MODULE 18 • AVERAGE VISUALIZER",
        "title": "Visualizing AVERAGE: The Equal Redistribution Model",
        "subtitle": "The arithmetic mean conceptually pours all values into one bucket and distributes them into equal shares",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge teal-badge">Concept Model</div>
                <div class="card-title">The 2-Step Redistribution Process</div>
                <div class="card-desc">Step 1: Combine all observations into one grand sum (SUM). Step 2: Divide equally among all observations (COUNT).</div>
                <div class="formula-pill">=AVERAGE(range) &nbsp;&equiv;&nbsp; <span class="hl-green">SUM(range) &divide; COUNT(range)</span></div>
            </div>
            <div class="card">
                <div class="badge orange-badge">Equal Shares</div>
                <div class="card-title">Balancing Unequal Stacks</div>
                <table class="data-tbl">
                    <tr><th>Observation</th><th>Starting Value</th><th>Redistribution Step</th><th>Final Equal Share</th></tr>
                    <tr><td>Student 1</td><td>90 pts</td><td>Sum = 90 + 60 + 75 = 225</td><td><strong>75 pts</strong></td></tr>
                    <tr><td>Student 2</td><td>60 pts</td><td>Count = 3 students</td><td><strong>75 pts</strong></td></tr>
                    <tr class="hl-row"><td>Student 3</td><td>75 pts</td><td>Average = 225 &divide; 3</td><td><strong>75 pts (Equalized)</strong></td></tr>
                </table>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> The AVERAGE function levels all values into identical equal shares. Extreme outliers distort it—use MEDIAN for skewed data.
        </div>
        """
    },
    # Slide 20: Hash Errors Diagnostic Lab
    {
        "num": 20,
        "category": "MODULE 19 • ERROR DIAGNOSTICS",
        "title": "Excel Hash Errors Diagnostic Lab: Root Causes & Cures",
        "subtitle": "Demystifying Excel's four most common error flags and learning how to diagnose and shield sheets",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge red-badge">Error Doctor</div>
                <div class="card-title">The 4 Core Error Flags</div>
                <table class="data-tbl">
                    <tr><th>Error Flag</th><th>Root Cause</th><th>Instant Fix</th></tr>
                    <tr class="hl-row"><td><code>####</code></td><td>Column too narrow for digits</td><td>Double-click right edge of column header</td></tr>
                    <tr><td><code>#DIV/0!</code></td><td>Dividing by zero or blank cell</td><td>Check denominator; use =IF(B1=0, 0, A1/B1)</td></tr>
                    <tr><td><code>#VALUE!</code></td><td>Math applied to text string</td><td>Ensure cell contains numbers, not text</td></tr>
                    <tr><td><code>#NAME?</code></td><td>Misspelled formula name</td><td>Fix spelling (e.g. =SMU() &rarr; =SUM())</td></tr>
                </table>
            </div>
            <div class="card">
                <div class="badge green-badge">Defensive Design</div>
                <div class="card-title">Shielding with IFERROR</div>
                <div class="card-desc">Wrap error-prone formulas inside =IFERROR(formula, fallback). If an error occurs, Excel outputs your clean message instead!</div>
                <div class="formula-pill">=IFERROR(A1/B1, "N/A") &nbsp;&rarr;&nbsp; <span class="hl-green">Clean Fallback</span></div>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> Errors are diagnostic signposts, not system failures. They pinpoint exactly what needs correction.
        </div>
        """
    },
    # Slide 21: Master Cheat Sheet
    {
        "num": 21,
        "category": "MODULE 20 • MASTER REFERENCE",
        "title": "15 Core Functions Master Cheat Sheet: Complete Reference",
        "subtitle": "A definitive reference table of syntax and key behaviors across the Form 1 Excel curriculum",
        "html": """
        <div class="card-container" style="flex:1;">
            <div class="card" style="padding:10px 14px;">
                <div class="badge green-badge">Quick Reference</div>
                <table class="data-tbl" style="font-size:11px;">
                    <tr><th>#</th><th>Function</th><th>Syntax</th><th>Purpose & Behavior</th></tr>
                    <tr><td>1</td><td><strong>SUM</strong></td><td><code>=SUM(range)</code></td><td>Adds all numbers in range</td></tr>
                    <tr><td>2</td><td><strong>AVERAGE</strong></td><td><code>=AVERAGE(range)</code></td><td>Calculates arithmetic mean (Sum &divide; Count)</td></tr>
                    <tr><td>3</td><td><strong>ROUND</strong></td><td><code>=ROUND(val, digits)</code></td><td>Standard 5/4 rounding (&ge;5 up, &lt;5 down)</td></tr>
                    <tr><td>4</td><td><strong>ROUNDUP</strong></td><td><code>=ROUNDUP(val, digits)</code></td><td>Always rounds away from 0 (ceiling)</td></tr>
                    <tr><td>5</td><td><strong>ROUNDDOWN</strong></td><td><code>=ROUNDDOWN(val, digits)</code></td><td>Always rounds toward 0 (floor/truncate)</td></tr>
                    <tr><td>6</td><td><strong>MAX / MIN</strong></td><td><code>=MAX(range) / =MIN(range)</code></td><td>Returns highest / lowest value in range</td></tr>
                    <tr><td>7</td><td><strong>LARGE / SMALL</strong></td><td><code>=LARGE(range, k) / =SMALL(...)</code></td><td>Returns k-th largest / smallest value</td></tr>
                    <tr><td>8</td><td><strong>COUNT / COUNTA</strong></td><td><code>=COUNT(range) / =COUNTA(...)</code></td><td>Counts numbers only / counts all non-empty cells</td></tr>
                    <tr><td>9</td><td><strong>MEDIAN</strong></td><td><code>=MEDIAN(range)</code></td><td>Finds middle sorted value (outlier-proof)</td></tr>
                    <tr><td>10</td><td><strong>MOD</strong></td><td><code>=MOD(num, divisor)</code></td><td>Returns remainder after division</td></tr>
                </table>
            </div>
        </div>
        <div class="key-idea-box" style="margin-top:6px;padding:6px 12px;font-size:12px;">
            <strong>💡 Key idea:</strong> Bookmark this cheat sheet! These 10 foundational functions empower 90% of all data analysis workflows.
        </div>
        """
    },
    # Slide 22: Course Conclusion & Best Practices
    {
        "num": 22,
        "category": "COURSE COMPLETION • BEST PRACTICES",
        "title": "Excel Mastery Achieved: The 5 Golden Modeling Habits",
        "subtitle": "Five essential rules for building clean, resilient, and professional spreadsheets",
        "html": """
        <div class="card-container">
            <div class="card">
                <div class="badge green-badge">Golden Rules</div>
                <div class="card-title">The 5 Rules of Excel</div>
                <table class="data-tbl">
                    <tr><th>Rule #</th><th>Golden Principle</th><th>Practical Habit</th></tr>
                    <tr><td>1</td><td><strong>Always Start with '='</strong></td><td>Without it, Excel treats formulas as plain text</td></tr>
                    <tr><td>2</td><td><strong>Never Hardcode Numbers</strong></td><td>Reference cells so the sheet updates dynamically</td></tr>
                    <tr class="hl-row"><td>3</td><td><strong>Lock Constants with '$'</strong></td><td>Use F4 to anchor tax rates, discounts, and parameters</td></tr>
                    <tr><td>4</td><td><strong>Verify Colors on Click</strong></td><td>Use point-and-click to eliminate coordinate typos</td></tr>
                    <tr><td>5</td><td><strong>Double-Click Fill Handle</strong></td><td>Duplicate formulas across entire tables in 1 second</td></tr>
                </table>
            </div>
            <div class="card">
                <div class="badge blue-badge">Next Level</div>
                <div class="card-title">Ready for Advanced Modeling</div>
                <div class="card-desc">You have mastered the foundational mechanics of spreadsheets! Continue into logical testing (=IF) and lookup algorithms (=XLOOKUP).</div>
                <div class="formula-pill">Status: <span class="hl-green">&check; Form 1 Excel Mastery Certified</span></div>
            </div>
        </div>
        <div class="key-idea-box">
            <strong>💡 Key idea:</strong> Clean structure, relative referencing, and defensive formulas turn spreadsheets into powerful automated software.
        </div>
        """
    }
]

CARD_HTML_WRAPPER = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  width: 980px;
  height: 420px;
  justify-content: space-between;
}
.card-container { display: flex; gap: 14px; width: 100%; flex: 1; margin-bottom: 8px; }
.card {
  flex: 1;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
}
.badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 5px;
  margin-bottom: 6px;
}
.math-badge { background: #e0e7ff; color: #3730a3; }
.blue-badge { background: #dbeafe; color: #1e40af; }
.green-badge { background: #d1fae5; color: #065f46; }
.orange-badge { background: #ffedd5; color: #9a3412; }
.purple-badge { background: #f3e8ff; color: #6b21a8; }
.red-badge { background: #fee2e2; color: #991b1b; }
.teal-badge { background: #ccfbf1; color: #115e59; }

.card-title { font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
.card-desc { font-size: 13px; color: #475569; line-height: 1.35; margin-bottom: 8px; }

.formula-pill {
  background: #f1f5f9;
  border-radius: 7px;
  padding: 8px 12px;
  font-family: Consolas, monospace;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin-top: auto;
  border: 1px solid #cbd5e1;
}
.hl-green { color: #059669; font-weight: 800; }
.hl-blue { color: #2563eb; font-weight: 800; }

.data-tbl { width: 100%; border-collapse: collapse; font-size: 11.5px; margin-top: auto; }
.data-tbl th { background: #f8fafc; color: #475569; font-weight: 600; padding: 4px 6px; border: 1px solid #e2e8f0; text-align: left; }
.data-tbl td { padding: 4px 6px; border: 1px solid #e2e8f0; color: #1e293b; }
.hl-row { background: #ecfdf5; font-weight: 600; }

.key-idea-box {
  width: 100%;
  background: #ecfdf5;
  border-left: 5px solid #10b981;
  border-radius: 0 8px 8px 0;
  padding: 8px 14px;
  font-size: 13px;
  color: #064e3b;
  line-height: 1.35;
}
.key-idea-box strong { color: #047857; }
</style>
</head>
<body>
__BODY__
</body>
</html>
"""

def render_cards():
    if not os.path.exists(TMP_DIR):
        os.makedirs(TMP_DIR)

    print(f"Rendering {len(SLIDES_DATA)} slide visual cards using headless Chrome...")
    for item in SLIDES_DATA:
        s_num = item["num"]
        html_file = os.path.join(TMP_DIR, f"card_{s_num}.html")
        png_file = os.path.join(TMP_DIR, f"card_{s_num}.png")

        body_content = item["html"]
        full_html = CARD_HTML_WRAPPER.replace("__BODY__", body_content)

        with open(html_file, "w", encoding="utf-8") as f:
            f.write(full_html)

        cmd = [
            CHROME_BIN,
            "--headless",
            "--disable-gpu",
            "--force-device-scale-factor=2",
            "--window-size=1020,440",
            f"--screenshot={png_file}",
            html_file
        ]
        res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if not os.path.exists(png_file) or os.path.getsize(png_file) == 0:
            print(f"Warning: Failed to render {png_file}")
        else:
            item["png_path"] = png_file

    print("All card graphics successfully rendered!")

def assemble_pptx():
    prs = Presentation()
    # 16:9 Widescreen: 10.0 inches x 5.625 inches as specified in EXCEL_SLIDES_STYLE_GUIDE.md
    prs.slide_width = Inches(10.0)
    prs.slide_height = Inches(5.625)

    blank_layout = prs.slide_layouts[6]

    # ==========================================
    # SLIDE 1: Title Slide
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    bg1 = s1.background
    fill1 = bg1.fill
    fill1.solid()
    fill1.fore_color.rgb = COLOR_BG_TINT

    # Decorative top bar
    top_bar = s1.shapes.add_shape(pptx.enum.shapes.MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.8), Inches(8.4), Inches(0.08))
    top_bar.fill.solid()
    top_bar.fill.fore_color.rgb = COLOR_TEAL
    top_bar.line.fill.background()

    # Title Card
    card1 = s1.shapes.add_shape(pptx.enum.shapes.MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.1), Inches(8.4), Inches(3.8))
    card1.fill.solid()
    card1.fill.fore_color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    card1.line.color.rgb = RGBColor(0xE2, 0xE8, 0xF0)
    card1.line.width = Pt(1.5)

    tbox1 = s1.shapes.add_textbox(Inches(1.2), Inches(1.4), Inches(7.6), Inches(3.2))
    tf1 = tbox1.text_frame
    tf1.word_wrap = True

    p_cat = tf1.paragraphs[0]
    p_cat.text = "FORM 1 SPREADSHEET MASTERCLASS"
    p_cat.font.name, p_cat.font.size, p_cat.font.bold = "Arial", Pt(11), True
    p_cat.font.color.rgb = COLOR_TEAL

    p_title = tf1.add_paragraph()
    p_title.text = "What is Excel?"
    p_title.font.name, p_title.font.size, p_title.font.bold = "Arial", Pt(34), True
    p_title.font.color.rgb = COLOR_TITLE
    p_title.space_before = Pt(8)

    p_sub = tf1.add_paragraph()
    p_sub.text = "Interactive Visual Learning & Comprehensive Function Guide"
    p_sub.font.name, p_sub.font.size = "Arial", Pt(18)
    p_sub.font.color.rgb = COLOR_SUBTITLE
    p_sub.space_before = Pt(8)

    p_scope = tf1.add_paragraph()
    p_scope.text = "Grid Architecture • Formulas & Syntax • Cell References • Core Functions • Diagnostics"
    p_scope.font.name, p_scope.font.size, p_scope.font.bold = "Arial", Pt(12), True
    p_scope.font.color.rgb = COLOR_TEAL
    p_scope.space_before = Pt(18)

    p_author = tf1.add_paragraph()
    p_author.text = "Interlectic Learning Platform • Form 1 / Grade 7 Curriculum"
    p_author.font.name, p_author.font.size = "Arial", Pt(11)
    p_author.font.color.rgb = RGBColor(0x94, 0xA3, 0xB8)
    p_author.space_before = Pt(8)

    # ==========================================
    # SLIDES 2 to 22: Content Slides
    # ==========================================
    for item in SLIDES_DATA:
        slide = prs.slides.add_slide(blank_layout)
        bg = slide.background
        fill = bg.fill
        fill.solid()
        fill.fore_color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

        # Header Box (Category, Title, Subtitle)
        hdr_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.35), Inches(8.4), Inches(1.1))
        tf = hdr_box.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = item["category"]
        p0.font.name, p0.font.size, p0.font.bold = "Arial", Pt(9.5), True
        p0.font.color.rgb = COLOR_TEAL

        p1 = tf.add_paragraph()
        p1.text = item["title"]
        p1.font.name, p1.font.size, p1.font.bold = "Arial", Pt(18), True
        p1.font.color.rgb = COLOR_TITLE
        p1.space_before = Pt(2)

        p2 = tf.add_paragraph()
        p2.text = item["subtitle"]
        p2.font.name, p2.font.size = "Arial", Pt(11.5)
        p2.font.color.rgb = COLOR_SUBTITLE
        p2.space_before = Pt(2)

        # High-DPI Card Graphic
        png_path = item.get("png_path")
        if png_path and os.path.exists(png_path):
            slide.shapes.add_picture(png_path, Inches(0.80), Inches(1.50), width=Inches(8.40), height=Inches(3.70))

    # Save presentation with lock fallback
    try:
        prs.save(OUTPUT_PPTX)
        print(f"Presentation successfully saved to: {OUTPUT_PPTX}")
    except PermissionError:
        prs.save(OUTPUT_PPTX_V2)
        print(f"File locked. Presentation saved to fallback: {OUTPUT_PPTX_V2}")

    # Also update Excel_Functions_Course_Pages_18_to_20.pptx to keep both up to date
    try:
        shutil.copyfile(OUTPUT_PPTX, "Excel_Functions_Course_Pages_18_to_20.pptx")
        print("Synchronized with Excel_Functions_Course_Pages_18_to_20.pptx")
    except Exception as e:
        print(f"Could not copy to legacy filename: {e}")

def export_standalone_html():
    """Ensure a clean standalone HTML export of the course is available."""
    src_html = "excel_a_course.html"
    dest_html = "excel_course_export.html"
    if os.path.exists(src_html):
        shutil.copyfile(src_html, dest_html)
        print(f"Exported standalone HTML course to: {dest_html} ({os.path.getsize(dest_html)} bytes)")

def cleanup():
    if os.path.exists(TMP_DIR):
        shutil.rmtree(TMP_DIR)
        print("Cleaned up temporary rendering directory.")

if __name__ == "__main__":
    render_cards()
    assemble_pptx()
    export_standalone_html()
    cleanup()
    print("=== EXPORT PIPELINE COMPLETE ===")
