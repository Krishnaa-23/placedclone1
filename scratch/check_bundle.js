const https = require('https');
const fs = require('fs');

https.get('https://placed-student-dashboard.vercel.app/assets/index-BGzA7IQK.js', res => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    console.log('JS length:', data.length);
    const idx = data.indexOf('location.href');
    console.log('idx of location.href:', idx);
    if (idx !== -1) {
      console.log(data.substring(idx - 50, idx + 50));
    }
  });
});
