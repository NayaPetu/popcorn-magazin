import { useEffect, useRef, useState } from "react";

const R = 14;

function lerpColor(a, b, t) {
  const p = (s) => parseInt(s, 16);
  const r1 = p(a.slice(1, 3)), g1 = p(a.slice(3, 5)), b1 = p(a.slice(5, 7));
  const r2 = p(b.slice(1, 3)), g2 = p(b.slice(3, 5)), b2 = p(b.slice(5, 7));
  const rr = Math.round(r1 + (r2 - r1) * t).toString(16).padStart(2, "0");
  const gg = Math.round(g1 + (g2 - g1) * t).toString(16).padStart(2, "0");
  const bb = Math.round(b1 + (b2 - b1) * t).toString(16).padStart(2, "0");
  return `#${rr}${gg}${bb}`;
}

function tempColor(t) {
  const stops = ["#378ADD", "#85B7EB", "#FAC775", "#EF9F27", "#D85A30", "#E24B4A"];
  const idx = t * (stops.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.min(lo + 1, stops.length - 1);
  return lerpColor(stops[lo], stops[hi], idx - lo);
}

function randSpeed(temp) {
  const base = 1.2 + temp * 3.2;
  const angle = Math.random() * Math.PI * 2;
  return { vx: Math.cos(angle) * base, vy: Math.sin(angle) * base };
}

function createBalls(n, W, H) {
  const balls = [];
  let tries = 0;
  while (balls.length < n && tries < 2000) {
    tries++;
    const x = R * 2 + Math.random() * (W - R * 4);
    const y = R * 2 + Math.random() * (H - R * 4);
    let ok = true;
    for (const b of balls) {
      if (Math.hypot(b.x - x, b.y - y) < R * 2.4) { ok = false; break; }
    }
    if (!ok) continue;
    const isHot = balls.length === 0;
    const temp = isHot ? 1 : 0;
    const sp = randSpeed(temp);
    balls.push({ x, y, vx: sp.vx, vy: sp.vy, temp, r: R, trail: [], pulsePhase: Math.random() * Math.PI * 2 });
  }
  return balls;
}

function collideBalls(a, b, transferFactor) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  if (dist < a.r + b.r && dist > 0.01) {
    const overlap = (a.r + b.r - dist) / 2;
    const nx = dx / dist, ny = dy / dist;
    a.x -= nx * overlap; a.y -= ny * overlap;
    b.x += nx * overlap; b.y += ny * overlap;

    const dvx = a.vx - b.vx, dvy = a.vy - b.vy;
    const dot = dvx * nx + dvy * ny;
    if (dot > 0) {
      a.vx -= dot * nx; a.vy -= dot * ny;
      b.vx += dot * nx; b.vy += dot * ny;
    }

    const dT = (a.temp - b.temp) * transferFactor;
    a.temp = Math.max(0, a.temp - dT);
    b.temp = Math.min(1, b.temp + dT);

    const rescale = (ball) => {
      const spd = Math.hypot(ball.vx, ball.vy);
      const target = 1.2 + ball.temp * 3.2;
      if (spd > 0.1) {
        ball.vx *= target / spd;
        ball.vy *= target / spd;
      } else {
        const sp = randSpeed(ball.temp);
        ball.vx = sp.vx; ball.vy = sp.vy;
      }
    };
    rescale(a); rescale(b);
    return true;
  }
  return false;
}

export default function MoleculeSimulation() {
  const canvasRef = useRef(null);
  const ballsRef = useRef([]);
  const flashesRef = useRef([]);
  const animRef = useRef(null);
  const [count, setCount] = useState(15);
  const [transfer, setTransfer] = useState(35);
  const countRef = useRef(count);
  const transferRef = useRef(transfer);

  useEffect(() => { countRef.current = count; }, [count]);
  useEffect(() => { transferRef.current = transfer; }, [transfer]);

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width;
    const H = canvas.height;
    ballsRef.current = createBalls(countRef.current, W, H);
    flashesRef.current = [];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 360;
      init();
    };

    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      const ctx = canvas.getContext("2d");
      const W = canvas.width, H = canvas.height;
      const balls = ballsRef.current;
      const flashes = flashesRef.current;
      const tf = transferRef.current / 100;

      // update
      for (const b of balls) {
        b.x += b.vx; b.y += b.vy;
        b.pulsePhase += 0.08;
        if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx); }
        if (b.x > W - b.r) { b.x = W - b.r; b.vx = -Math.abs(b.vx); }
        if (b.y < b.r) { b.y = b.r; b.vy = Math.abs(b.vy); }
        if (b.y > H - b.r) { b.y = H - b.r; b.vy = -Math.abs(b.vy); }
        b.trail.push({ x: b.x, y: b.y });
        if (b.trail.length > 12) b.trail.shift();
      }

      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const prev = balls[j].temp;
          const hit = collideBalls(balls[i], balls[j], tf);
          if (hit && balls[j].temp - prev > 0.05) {
            flashes.push({ x: balls[j].x, y: balls[j].y, alpha: 1, r: balls[j].r });
          }
        }
      }

      flashesRef.current = flashes.filter(f => f.alpha > 0.02);
      flashesRef.current.forEach(f => f.alpha *= 0.85);

      // draw
      ctx.clearRect(0, 0, W, H);

      for (const b of balls) {
        if (b.trail.length < 2) continue;
        for (let i = 1; i < b.trail.length; i++) {
          ctx.globalAlpha = (i / b.trail.length) * 0.18;
          ctx.strokeStyle = tempColor(b.temp);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(b.trail[i - 1].x, b.trail[i - 1].y);
          ctx.lineTo(b.trail[i].x, b.trail[i].y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      for (const f of flashesRef.current) {
        ctx.globalAlpha = f.alpha * 0.5;
        ctx.strokeStyle = "#EF9F27";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r + (1 - f.alpha) * 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      for (const b of balls) {
        const col = tempColor(b.temp);
        const pulse = b.temp > 0.3 ? 1 + Math.sin(b.pulsePhase) * 0.06 * b.temp : 1;

        if (b.temp > 0.5) {
          const grad = ctx.createRadialGradient(b.x, b.y, b.r * 0.4, b.x, b.y, b.r * 2);
          grad.addColorStop(0, col + "44");
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.28, b.y - b.r * 0.28, b.r * 0.38, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const addHot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const sp = randSpeed(1);
    ballsRef.current.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: sp.vx, vy: sp.vy,
      temp: 1, r: R, trail: [], pulsePhase: 0
    });
  };

  return (
    <div style={{ padding: "1rem 0", fontFamily: "sans-serif" }}>
      {/* Легенда */}
      <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#888", marginBottom: 8 }}>
        <span><span style={{ display:"inline-block", width:12, height:12, borderRadius:"50%", background:"#E24B4A", marginRight:4, verticalAlign:"middle" }}></span>горячая</span>
        <span><span style={{ display:"inline-block", width:12, height:12, borderRadius:"50%", background:"#378ADD", marginRight:4, verticalAlign:"middle" }}></span>холодная</span>
        <span><span style={{ display:"inline-block", width:12, height:12, borderRadius:"50%", background:"#EF9F27", marginRight:4, verticalAlign:"middle" }}></span>нагревается</span>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: 360, border: "1px solid #e0e0e0", borderRadius: 12, display: "block" }}
      />

      {/* Слайдеры */}
      <div style={{ marginTop: 12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8, fontSize:13, color:"#666" }}>
          <span style={{ minWidth:130 }}>Молекул</span>
          <input type="range" min="5" max="30" value={count} step="1"
            onChange={e => { setCount(+e.target.value); init(); }}
            style={{ flex:1 }} />
          <span style={{ minWidth:24, fontWeight:500, color:"#333" }}>{count}</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, color:"#666" }}>
          <span style={{ minWidth:130 }}>Скорость передачи</span>
          <input type="range" min="10" max="80" value={transfer} step="1"
            onChange={e => setTransfer(+e.target.value)}
            style={{ flex:1 }} />
          <span style={{ minWidth:24, fontWeight:500, color:"#333" }}>{transfer}</span>
        </div>
      </div>

      {/* Кнопки */}
      <div style={{ display:"flex", gap:8, marginTop:10 }}>
        <button onClick={init}
          style={{ padding:"6px 14px", border:"1px solid #ccc", borderRadius:8, background:"transparent", cursor:"pointer", fontSize:13 }}>
          ↺ Перезапустить
        </button>
        <button onClick={addHot}
          style={{ padding:"6px 14px", border:"1px solid #ccc", borderRadius:8, background:"transparent", cursor:"pointer", fontSize:13 }}>
          + Добавить горячую
        </button>
      </div>
    </div>
  );
}
