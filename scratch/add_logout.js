const fs = require('fs');
const filePath = 'public/admin-dashboard.html';
let content = fs.readFileSync(filePath, 'utf8');

const target = 'New assessment</button>';
const logoutBtnHtml = ` <button className="btn btn-ghost btn-sm" onClick={() => { if (window.top) window.top.location.href="/login"; else window.location.href="/login"; }} style={{ color: "#EF4444", borderColor: "rgba(239,68,68,0.3)", background: "#FEF2F2", fontWeight: "700", marginLeft: "8px" }}>Log Out</button>`;

if (content.includes(target)) {
  content = content.replace(target, target + logoutBtnHtml);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Native Log Out button inserted successfully into admin-dashboard.html!');
} else {
  console.log('Target string not found');
}
