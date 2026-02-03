// Basic frontend demo helpers for the proctor system
// Note: This is a client-side prototype. For production, integrate with a secure server, WebRTC signaling, and recording.

async function startLocalVideo(){
  const video = document.getElementById('localVideo');
  if(!video) return;
  try{
    const stream = await navigator.mediaDevices.getUserMedia({video:{width:640}, audio:false});
    video.srcObject = stream;
    log('Camera started');
    // Periodic snapshot for audit (demo only)
    window._snapInterval = setInterval(()=>{snapshot(stream)}, 7000);
  }catch(err){
    log('Camera access denied or not available');
    console.error(err);
    document.getElementById('warn').textContent = 'Camera access required for proctoring.';
  }
}

function snapshot(stream){
  const video = document.getElementById('localVideo');
  if(!video || !stream) return;
  try{
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 360;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video,0,0,canvas.width,canvas.height);
    // In production: send base64 to server for storage or ML analysis
    // const data = canvas.toDataURL('image/jpeg',0.7);
    log('Snapshot captured');
  }catch(e){ console.error(e); }
}

function log(msg){
  const l = document.getElementById('log');
  if(!l) return;
  const time = new Date().toLocaleTimeString();
  l.innerText = `[${time}] ${msg}\n` + l.innerText;
}

// Simple timer demo
function startTimer(durationSeconds){
  const el = document.getElementById('timer');
  if(!el) return;
  let remaining = durationSeconds;
  const tid = setInterval(()=>{
    if(remaining<=0){ clearInterval(tid); log('Time up'); return; }
    remaining--;
    const h = Math.floor(remaining/3600); const m = Math.floor((remaining%3600)/60); const s = remaining%60;
    el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  },1000);
}

// Hook up candidate page actions
document.addEventListener('DOMContentLoaded',()=>{
  const startBtn = document.getElementById('startBtn');
  if(startBtn) startBtn.addEventListener('click',()=>{ startLocalVideo(); startTimer(60*60); log('Exam started'); });

  const submitBtn = document.getElementById('submitBtn');
  if(submitBtn) submitBtn.addEventListener('click',()=>{ log('Exam submitted'); alert('Submitted (demo)'); if(window._snapInterval) clearInterval(window._snapInterval); });

  const flagBtn = document.getElementById('flagBtn');
  if(flagBtn) flagBtn.addEventListener('click',()=>{ log('Question flagged by student'); alert('Question flagged'); });

  // proctor page - live count demo
  const grid = document.getElementById('grid');
  if(grid){
    // In production: connect to signaling server to show live streams
    document.getElementById('liveCount').textContent = grid.children.length;
  }
});
