const fs = require('fs');

['public/assets/index-BGzA7IQK.js', 'public/student-dashboard/assets/index-BGzA7IQK.js'].forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let js = fs.readFileSync(filePath, 'utf8');

  // Add catch-all route for MainDashboard
  const target = '(0,X.jsx)(Vt,{path:`/`,element:(0,X.jsx)(xu,{})}),(0,X.jsx)(Vt,{path:`/readiness`';
  const replacement = '(0,X.jsx)(Vt,{path:`*`,element:(0,X.jsx)(xu,{})}),(0,X.jsx)(Vt,{path:`/`,element:(0,X.jsx)(xu,{})}),(0,X.jsx)(Vt,{path:`/readiness`';

  if (js.includes(target)) {
    js = js.replace(target, replacement);
    fs.writeFileSync(filePath, js, 'utf8');
    console.log('Patched catch-all in', filePath);
  } else {
    console.log('Target not found in', filePath);
  }
});
