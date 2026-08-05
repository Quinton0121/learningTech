const fs = require('fs');
const content = fs.readFileSync('excel_b_course.html', 'utf8');
const lines = content.split('\n');
for(let i=0; i<lines.length; i++) {
    if(lines[i].includes('slide-11')) {
        console.log(`Line ${i+1}:`);
        for(let j=Math.max(0, i-5); j<=Math.min(lines.length-1, i+25); j++) {
            console.log(`${j+1}: ${lines[j]}`);
        }
    }
}
