const fs = require('fs');
const data = fs.readFileSync('public/admin-dashboard.html', 'utf8');
const idx = data.indexOf('confirm_logout');
const lastIdx = data.lastIndexOf('confirm_logout');
console.log('=== Modal Handling ===');
console.log(data.substring(lastIdx - 50, lastIdx + 500));
