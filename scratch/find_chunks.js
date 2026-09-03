const fs = require('fs');
const js = fs.readFileSync('public/student-dashboard/assets/index-BGzA7IQK.js', 'utf8');
const regex = /["'](?:\/assets\/|\.\/assets\/|assets\/)([a-zA-Z0-9_-]+\.js)["']/g;
let match;
const chunks = new Set();
while ((match = regex.exec(js)) !== null) {
  chunks.add(match[1]);
}
console.log('Chunks found:', Array.from(chunks));
