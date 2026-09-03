const fs = require('fs');
const data = fs.readFileSync('public/admin-dashboard.html', 'utf8');
const idx = data.indexOf('function LockScreen');
console.log(data.substring(idx, idx + 1500));
