const fs = require('fs');
const js = fs.readFileSync('public/student-dashboard/assets/index-BGzA7IQK.js', 'utf8');
const search = 'path:`/`';
let pos = 0;
while ((pos = js.indexOf(search, pos)) !== -1) {
  console.log('Found path:`/` at', pos, ':\n', js.substring(pos - 40, pos + 120));
  pos += search.length;
}
