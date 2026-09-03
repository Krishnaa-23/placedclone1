const https = require('https');
const fs = require('fs');

const url = 'https://raw.githubusercontent.com/Krishnaa-23/admindashboard-placed/main/index.html';
https.get(url, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Downloaded admin index.html, length:', data.length);
    fs.writeFileSync('public/admin-dashboard.html', data, 'utf8');
    console.log('Saved to public/admin-dashboard.html');
    
    // Check for logout in the file
    const regex = /logout|log out|Sign Out|signout/gi;
    let match;
    while ((match = regex.exec(data)) !== null) {
      console.log('Found match at', match.index, ':', data.substring(match.index - 50, match.index + 80));
    }
  });
});
