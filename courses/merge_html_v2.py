import re
import os

with open('c:\\learning_tech\\courses\\update_link.html', 'r', encoding='utf-8') as f:
    slides_html = f.read()

with open('c:\\learning_tech\\courses\\excel\\interactive_excel_sandbox.html', 'r', encoding='utf-8') as f:
    sandbox_html = f.read()

# Extract Sandbox CSS
css_match = re.search(r'<style>(.*?)</style>', sandbox_html, re.DOTALL)
sandbox_css = css_match.group(1) if css_match else ''
sandbox_css = re.sub(r'body\s*{[^}]*}', '', sandbox_css, flags=re.DOTALL)

# Extract Sandbox HTML (between <body> and <script>)
html_match = re.search(r'<body>(.*?)<script>', sandbox_html, re.DOTALL)
sandbox_body = html_match.group(1) if html_match else ''

# Extract Sandbox JS
js_match = re.search(r'<script>(.*?)</script>\s*</body>', sandbox_html, re.DOTALL)
sandbox_js = js_match.group(1) if js_match else ''

# 1. Inject CSS into slides HTML
slides_html = slides_html.replace('</style>', f'\n/* Sandbox CSS */\n{sandbox_css}\n</style>')

# 2. Inject Sandbox HTML into slides HTML right before the final </body> tag
sandbox_wrapper = f"""
    <!-- MERGED SANDBOX -->
    <div id="sandbox-wrapper" class="absolute top-0 left-0 w-full h-full z-50 bg-[#0f172a] flex-col" style="display: none;">
        {sandbox_body}
    </div>
"""
# 3. Inject JS into slides HTML
slides_html = slides_html.replace('</body>', f'{sandbox_wrapper}\n<script>\n/* Sandbox JS */\n{sandbox_js}\n</script>\n</body>')

# 4. Modify the button on Slide 10 to show the sandbox instead of linking out
# I will use a robust regex that matches any <a> or <button> with id="final-sandbox-btn"
# and replaces it with a fully visible button.
slides_html = re.sub(
    r'<a[^>]*id="final-sandbox-btn"[^>]*>(.*?)</a>',
    r"""<button id="final-sandbox-btn" class="mt-12 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all transform hover:scale-105 flex items-center gap-3 opacity-0 pointer-events-none" onclick="document.getElementById('sandbox-wrapper').style.display = 'flex';">\1</button>""",
    slides_html,
    flags=re.DOTALL
)

# Fix back button
slides_html = slides_html.replace(
    '<a href="index.html" class="text-slate-400 hover:text-white transition-colors">',
    '<button onclick="document.getElementById(\'sandbox-wrapper\').style.display = \'none\';" class="text-slate-400 hover:text-white transition-colors">'
)
slides_html = slides_html.replace('Back to Lesson\n            </a>', 'Back to Lesson\n            </button>')

# Write to the DB directly
import sqlite3
# Oh wait, Prisma uses SQLite, let's just write to a file and run a node script to update the DB
with open('c:\\learning_tech\\courses\\merged_course_v2.html', 'w', encoding='utf-8') as f:
    f.write(slides_html)

print("Merged successfully to merged_course_v2.html")
