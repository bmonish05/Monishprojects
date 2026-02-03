# College Proctor System — Frontend Prototype

This workspace contains a frontend prototype for a student proctoring system.

Files:
- `index.html` — (kept as generator) you can link to candidate or proctor pages
- `candidate.html` — Candidate exam page (webcam preview, timer, basic actions)
- `proctor.html` — Proctor dashboard (mock tiles)
- `style.css` — Shared styles
- `js/main.js` — Small demo helpers (getUserMedia, timer, logging)

Recommended production stack:
- Server: Node.js + Express or Fastify
- Real-time: WebRTC for video + Socket.io / WebSocket for signaling and events
- Recording: Use an SFU (Janus, Jitsi, mediasoup) or server-side recorder; store on S3
- Storage & DB: Postgres for sessions/audit logs, Redis for ephemeral state
- ML: Integrate face-detection / liveness checks with TensorFlow.js or a server-side ML pipeline
- Security & Privacy: strong encryption in transit (TLS), role-based access, transparent consent and retention policies

Next steps:
1. Do you want a full-stack example with a Node.js server (signaling + basic APIs)?
2. Should I add example Dockerfiles and scripts to run a local demo?

Ask me to scaffold the server + WebRTC signaling and I'll set it up for you. 
