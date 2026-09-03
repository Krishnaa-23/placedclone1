const fs = require('fs');
const filePath = 'public/admin-dashboard.html';
let data = fs.readFileSync(filePath, 'utf8');

// 1. Update onConfirm in LogoutModal
const targetConfirm = `modal.type==="confirm_logout" && (
        <LogoutModal onClose={closeModal} onConfirm={()=>{ closeModal(); setIsLoggedOut(true); toast("You have been logged out."); }}`;

const replacementConfirm = `modal.type==="confirm_logout" && (
        <LogoutModal onClose={closeModal} onConfirm={()=>{ 
          closeModal(); 
          setIsLoggedOut(true); 
          toast("You have been logged out. Redirecting to login portal..."); 
          setTimeout(()=>{
            if (window.top) window.top.location.href = "/login";
            else window.location.href = "/login";
          }, 350);
        }}`;

if (data.includes(targetConfirm)) {
  data = data.replace(targetConfirm, replacementConfirm);
  console.log('Successfully patched LogoutModal confirm handler!');
} else {
  console.log('Target confirm not found, trying partial replace');
  const partialTarget = 'onConfirm={()=>{ closeModal(); setIsLoggedOut(true); toast("You have been logged out."); }}';
  const partialReplacement = 'onConfirm={()=>{ closeModal(); setIsLoggedOut(true); toast("You have been logged out."); setTimeout(()=>{ if (window.top) window.top.location.href = "/login"; else window.location.href = "/login"; }, 350); }}';
  if (data.includes(partialTarget)) {
    data = data.replace(partialTarget, partialReplacement);
    console.log('Successfully patched partialTarget confirm handler!');
  }
}

// 2. In LockScreen, make handleSignIn or back button return to /login portal as well
const lockTarget = 'toast("Welcome back! Admin session restored.");';
const lockReplacement = 'toast("Redirecting to login portal..."); if (window.top) window.top.location.href = "/login"; else window.location.href = "/login";';

if (data.includes(lockTarget)) {
  data = data.replace(lockTarget, lockReplacement);
  console.log('Successfully patched LockScreen sign in handler!');
}

fs.writeFileSync(filePath, data, 'utf8');
console.log('public/admin-dashboard.html updated successfully!');
