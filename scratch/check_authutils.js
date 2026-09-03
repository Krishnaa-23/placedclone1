const https = require('https');
https.get('https://raw.githubusercontent.com/kavyakulothungan01-sketch/placed-student-dashboard/main/src/utils/authUtils.js', res => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    console.log('=== authUtils.js ===');
    console.log(data);
  });
});
