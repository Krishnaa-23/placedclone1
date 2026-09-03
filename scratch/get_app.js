const https = require('https');
https.get('https://raw.githubusercontent.com/kavyakulothungan01-sketch/placed-student-dashboard/main/src/App.jsx', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => console.log(d));
});
