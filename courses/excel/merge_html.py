import re
import os

with open('c:\\learning_tech\\courses\\excel\\update_link.html', 'r', encoding='utf-8') as f:
    slides_html = f.read()

with open('c:\\learning_tech\\courses\\excel\\interactive_excel_sandbox.html', 'r', encoding='utf-8') as f:
    sandbox_html = f.read()

# Extract Sandbox CSS
css_match = re.search(r'<style>(.*?)</style>', sandbox_html, re.DOTALL)
sandbox_css = css_match.group(1) if css_match else ''
# Remove body selector from sandbox css as it conflicts
sandbox_css = re.sub(r'body\s*{[^}]*}', '', sandbox_css, flags=re.DOTALL)

# Extract Sandbox HTML (between <body> and <script>)
html_match = re.search(r'<body>(.*?)<script>', sandbox_html, re.DOTALL)
sandbox_body = html_match.group(1) if html_match else ''

# Extract Sandbox JS
js_match = re.search(r'<script>(.*?)</script>\s*</body>', sandbox_html, re.DOTALL)
sandbox_js = js_match.group(1) if js_match else ''

# 1. Inject CSS into slides HTML
slides_html = slides_html.replace('</style>', f'\n/* Sandbox CSS */\n{sandbox_css}\n</style>')

# 2. Inject Sandbox HTML into slides HTML right before the final <script> tag
sandbox_wrapper = f"""
    <!-- MERGED SANDBOX -->
    <div id="sandbox-wrapper" class="absolute top-0 left-0 w-full h-full z-50 bg-[#0f172a]" style="display: none;">
        {sandbox_body}
    </div>
"""
# Find the first <script> block at the end (the main app script)
slides_html = slides_html.replace('<script>', f'{sandbox_wrapper}\n<script>', 1)

# 3. Inject JS into slides HTML
slides_html = slides_html.replace('</script>', f'\n/* Sandbox JS */\n{sandbox_js}\n</script>')

# 4. Modify the button on Slide 10 to show the sandbox instead of linking out
slides_html = re.sub(
    r'<a href="sandbox\.html"[^>]*id="final-sandbox-btn"[^>]*>(.*?)</a>',
    r'<button id="final-sandbox-btn" class="mt-12 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all transform hover:scale-105 flex items-center gap-3 opacity-0 pointer-events-none" onclick="document.getElementById(\'sandbox-wrapper\').style.display = \'flex\';">\1</button>',
    slides_html,
    flags=re.DOTALL
)

# Also fix the back button inside the sandbox to close the sandbox instead of going to index.html
slides_html = slides_html.replace(
    '<a href="index.html" class="text-slate-400 hover:text-white transition-colors">',
    '<button onclick="document.getElementById(\'sandbox-wrapper\').style.display = \'none\';" class="text-slate-400 hover:text-white transition-colors">'
)
slides_html = slides_html.replace('Back to Lesson\n            </a>', 'Back to Lesson\n            </button>')

with open('c:\\learning_tech\\courses\\excel\\merged_course.html', 'w', encoding='utf-8') as f:
    f.write(slides_html)

print("Merged successfully to merged_course.html")
