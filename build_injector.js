const fs = require('fs');

const html = fs.readFileSync('public/course.html', 'utf8');

// UI is between <!-- Teacher Sync Controls --> and <!-- Progress Indicator -->
const uiStart = html.indexOf('<!-- Teacher Sync Controls -->');
const uiEnd = html.indexOf('<!-- Progress Indicator -->');
const uiCode = html.substring(uiStart, uiEnd).trim();

// JS is between `window.pollSyncState = async function()` block up to `// Initialize Grids`
// Let's just find the start of `let isTeacher = false;` until before `// Initialize Grids`
const jsStart = html.indexOf('let isTeacher = false;');
const jsEnd = html.indexOf('// Initialize Grids');
const jsCode = html.substring(jsStart, jsEnd).trim();

const fileContent = `export function getSyncInjectorHTML() {
  return \`${uiCode.replace(/`/g, '\\`')}\`;
}

export function getSyncInjectorJS() {
  return \`<script>
    document.addEventListener("DOMContentLoaded", () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      ${jsCode.replace(/`/g, '\\`')}
    });
  </script>\`;
}
`;

fs.writeFileSync('src/lib/syncInjector.ts', fileContent);
console.log('Successfully created syncInjector.ts');
