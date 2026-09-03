const fs = require('fs');
const js = fs.readFileSync('public/student-dashboard/assets/index-BGzA7IQK.js', 'utf8');

const regex = /path:\`\/[a-z]*\`/g;
let match;
while ((match = regex.exec(js)) !== null) {
  console.log('Match at', match.index, ':', js.substring(match.index - 30, match.index + 80));
}
