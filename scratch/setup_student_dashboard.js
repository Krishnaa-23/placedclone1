const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'student-dashboard');
const assetsDir = path.join(dir, 'assets');

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

async function main() {
  console.log('Downloading student dashboard assets...');
  
  // 1. Download index.html
  let html = await download('https://placed-student-dashboard.vercel.app/');
  // update asset paths to be relative: ./assets/
  html = html.replace('/assets/index-BGzA7IQK.js', './assets/index-BGzA7IQK.js');
  html = html.replace('/assets/index-DuKqt4nR.css', './assets/index-DuKqt4nR.css');
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log('Saved index.html');

  // 2. Download CSS
  const css = await download('https://placed-student-dashboard.vercel.app/assets/index-DuKqt4nR.css');
  fs.writeFileSync(path.join(assetsDir, 'index-DuKqt4nR.css'), css, 'utf8');
  console.log('Saved index-DuKqt4nR.css');

  // 3. Download JS and patch logout to redirect top window to /login
  let js = await download('https://placed-student-dashboard.vercel.app/assets/index-BGzA7IQK.js');
  
  const target = ',window.location.href=`/`}';
  const replacement = ',(window.top||window).location.href=`/login`}';
  
  if (js.includes(target)) {
    js = js.replace(target, replacement);
    console.log('Successfully patched logout in JS bundle to redirect to /login!');
  } else {
    console.log('Target not found in JS, searching alternative');
    const altTarget = 'window.location.href=`/`';
    if (js.includes(altTarget)) {
      js = js.replace(altTarget, '(window.top||window).location.href=`/login`');
      console.log('Successfully patched altTarget in JS bundle!');
    }
  }

  fs.writeFileSync(path.join(assetsDir, 'index-BGzA7IQK.js'), js, 'utf8');
  console.log('Saved index-BGzA7IQK.js');
  console.log('Student dashboard setup complete!');
}

main().catch(console.error);
