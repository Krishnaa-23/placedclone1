const fs = require('fs');
const filePath = 'public/admin-dashboard.html';
let content = fs.readFileSync(filePath, 'utf8');

const target = ` <button className="btn btn-ghost btn-sm" onClick={() => { if (window.top) window.top.location.href="/login"; else window.location.href="/login"; }} style={{ color: "#EF4444", borderColor: "rgba(239,68,68,0.3)", background: "#FEF2F2", fontWeight: "700", marginLeft: "8px" }}>Log Out</button>`;

if (content.includes(target)) {
  content = content.replace(target, '');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully removed Log Out button from public/admin-dashboard.html!');
} else {
  console.log('Target string not found');
}
