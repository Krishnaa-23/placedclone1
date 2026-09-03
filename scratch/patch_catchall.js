const fs = require('fs');
const filePath = 'public/student-dashboard/assets/index-BGzA7IQK.js';
let js = fs.readFileSync(filePath, 'utf8');

const target = '(Ru,{children:(0,X.jsxs)(Ut,{children:[(0,X.jsx)(Vt,{path:`/`,element:(0,X.jsx)(xu,{})}),';
const replacement = '(Ru,{children:(0,X.jsxs)(Ut,{children:[(0,X.jsx)(Vt,{path:`*`,element:(0,X.jsx)(xu,{})}),(0,X.jsx)(Vt,{path:`/`,element:(0,X.jsx)(xu,{})}),';

if (js.includes(target)) {
  js = js.replace(target, replacement);
  fs.writeFileSync(filePath, js, 'utf8');
  console.log('Successfully added catch-all route for MainDashboard!');
} else {
  console.log('Target not found in bundle');
}
