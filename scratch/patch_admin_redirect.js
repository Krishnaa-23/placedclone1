const fs = require('fs');
const filePath = 'public/admin-dashboard.html';
let data = fs.readFileSync(filePath, 'utf8');

const targetStr = `toast("You have been logged out of the administrative session."); 
        }}/>`;

const replaceStr = `toast("You have been logged out of the administrative session. Redirecting to login..."); 
          setTimeout(() => {
            if (window.top && window.top !== window) {
              window.top.location.href = "/login";
            } else {
              window.location.href = "/login";
            }
          }, 300);
        }}/>`;

if (data.includes(targetStr)) {
  data = data.replace(targetStr, replaceStr);
  fs.writeFileSync(filePath, data, 'utf8');
  console.log('Successfully added redirect to /login in admin confirm logout!');
} else {
  console.log('Target string not found, checking alternatives...');
  const alt = 'toast("You have been logged out of the administrative session.");';
  if (data.includes(alt)) {
    data = data.replace(alt, `toast("You have been logged out. Redirecting to login..."); setTimeout(() => { if (window.top) window.top.location.href = "/login"; else window.location.href = "/login"; }, 300);`);
    fs.writeFileSync(filePath, data, 'utf8');
    console.log('Successfully patched using alt target!');
  } else {
    console.log('No match found for toast text');
  }
}
