const fs = require('fs');
const js = fs.readFileSync('public/student-dashboard/assets/index-BGzA7IQK.js', 'utf8');
const search = '<Routes>';
// let's search for Routes element definition
const idx = js.indexOf('path:`/`');
console.log('path:`/` idx:', idx);
if (idx !== -1) {
  console.log(js.substring(idx - 100, idx + 200));
} else {
  // search for path:"/"
  const idx2 = js.indexOf('path:"/"');
  console.log('path:"/" idx:', idx2);
  if (idx2 !== -1) {
    console.log(js.substring(idx2 - 100, idx2 + 200));
  }
}
