const https = require('https');
https.get('https://raw.githubusercontent.com/kavyakulothungan01-sketch/placed-student-dashboard/main/src/components/common/Sidebar.jsx', res => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    console.log('Total length:', data.length);
    const lines = data.split('\n');
    console.log('Total lines:', lines.length);
    lines.forEach((l, i) => {
      if (l.includes('Logout') || l.includes('LogOut') || l.includes('logout')) {
        console.log('Line ' + (i+1) + ': ' + l.trim());
      }
    });
  });
});
