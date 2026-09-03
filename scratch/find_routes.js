const fs = require('fs');
const js = fs.readFileSync('public/student-dashboard/assets/index-BGzA7IQK.js', 'utf8');
const searchList = ['/readiness', 'readiness', 'MainDashboard', 'Assessments'];
searchList.forEach(s => {
  const idx = js.indexOf(s);
  console.log(s, 'idx:', idx);
  if (idx !== -1) {
    console.log(js.substring(idx - 60, idx + 100));
  }
});
