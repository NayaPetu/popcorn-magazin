import React from 'react';
import { useTime, interpolate, clamp, Easing, Stage } from './animations';
// popcorn-scene.jsx
// 2D popcorn explosion: kernel heats → trembles → cracks → flashes → bursts → settles.
// Composed of Sprites layered on top of a warm-dark stovetop background.

// ── Palette ─────────────────────────────────────────────────────────────────
const PAL = {
  bg0:        '#1a0c08',
  bg1:        '#3a160a',
  bg2:        '#6a230d',
  panShell:   '#0d0604',
  panBody:    '#1f1310',
  panRim:     '#2e1e18',
  panInner:   '#080403',
  oil:        '#5a3416',
  oilShine:   '#a86a2a',
  kernelHi:   '#fde9a3',
  kernelMid:  '#e6a73e',
  kernelLo:   '#8a4a17',
  kernelDark: '#3a1505',
  flameHot:   '#ffe066',
  flameMid:   '#ff7a1a',
  flameLo:    '#c2200d',
  popHi:      '#fffdf3',
  popMid:     '#fff3cf',
  popShade:   '#f0d28a',
  popCore:    '#c98b3a',
};

// ── Camera wrapper ──────────────────────────────────────────────────────────
// Reads `time` and applies a parallax/zoom transform around an anchor.
function Camera({ children }) {
  const time = useTime();

  // Zoom in toward kernel as heat builds, then snap wide for the burst.
  const scale = interpolate(
    [0,   1,    3,    5.0,  5.45,  5.55,  7,    12],
    [1.0, 1.05, 1.35, 1.85, 2.05,  1.0,   1.0,  1.0],
    Easing.easeInOutCubic
  )(time);

  // Anchor: kernel sits at (960, 700). Translate so kernel stays on-screen as we zoom.
  const ax = 960, ay = 700;
  const tx = (1920 / 2 - ax) * (scale - 1);
  const ty = (1080 / 2 - ay) * (scale - 1);

  // Camera shake during pressure build (4.0–5.45)
  let shakeX = 0, shakeY = 0;
  if (time > 3.8 && time < 5.45) {
    const intensity = clamp((time - 3.8) / 1.6, 0, 1);
    const amp = intensity * intensity * 18;
    shakeX = Math.sin(time * 73) * amp;
    shakeY = Math.cos(time * 91) * amp * 0.7;
  }

  return (
    <div style={{
      position: 'absolute', inset: 0,
      transform: `translate(${tx + shakeX}px, ${ty + shakeY}px) scale(${scale})`,
      transformOrigin: `${ax}px ${ay}px`,
      willChange: 'transform',
    }}>
      {children}
    </div>
  );
}

// ── Background: warm gradient + heat shimmer ────────────────────────────────
function BackgroundScene() {
  const time = useTime();
  // Radial heat glow pulses
  const glowAlpha = 0.55 + Math.sin(time * 2.4) * 0.07 + Math.min(time / 5, 1) * 0.15;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(ellipse 70% 55% at 50% 78%, ${PAL.bg2} 0%, ${PAL.bg1} 38%, ${PAL.bg0} 75%, #000 100%)`,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 38% 28% at 50% 72%, rgba(255,140,40,${glowAlpha}) 0%, rgba(255,90,20,0) 70%)`,
        mixBlendMode: 'screen',
      }} />
      {/* fine grain noise via repeating gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-radial-gradient(circle at 30% 40%, rgba(255,255,255,0.012) 0 1px, transparent 1px 3px)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}

// ── Flames under the pan ────────────────────────────────────────────────────
function Flame({ x, baseHeight, hue, phase, speed }) {
  const time = useTime();
  const wob = Math.sin(time * speed + phase) * 0.18 + 1;
  const sway = Math.sin(time * speed * 0.7 + phase * 1.3) * 14;
  const h = baseHeight * wob;
  return (
    <g transform={`translate(${x + sway}, 0)`}>
      <path
        d={`M -28,0 C -32,${-h*0.4} -18,${-h*0.7} -8,${-h*0.85} C -2,${-h*0.95} 2,${-h*0.95} 8,${-h*0.85} C 18,${-h*0.7} 32,${-h*0.4} 28,0 Z`}
        fill={hue}
        opacity="0.92"
      />
      <path
        d={`M -16,0 C -18,${-h*0.35} -10,${-h*0.55} -4,${-h*0.7} C 0,${-h*0.8} 4,${-h*0.7} 10,${-h*0.55} C 16,${-h*0.4} 18,${-h*0.2} 16,0 Z`}
        fill={PAL.flameHot}
        opacity="0.88"
      />
      <ellipse cx="0" cy={-h*0.32} rx="5" ry="9" fill="#fffbe0" opacity="0.85" />
    </g>
  );
}

function Flames() {
  const time = useTime();
  // Flames intensify between 0–4s, hold, then fade as kernel takes focus
  const intensity = interpolate([0, 1.5, 4, 6, 12], [0.5, 1.0, 1.15, 0.6, 0.6], Easing.easeInOutCubic)(time);
  const baseY = 870;
  return (
    <svg
      width="1920" height="1080"
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <g transform={`translate(0, ${baseY})`}>
        {[
          [780,  150, PAL.flameLo, 0.2, 6.0],
          [850,  200, PAL.flameMid, 1.1, 5.4],
          [920,  240 * intensity, PAL.flameMid, 2.4, 5.8],
          [990,  220, PAL.flameMid, 0.9, 6.2],
          [1060, 250 * intensity, PAL.flameMid, 1.8, 5.2],
          [1140, 200, PAL.flameLo, 0.6, 5.7],
        ].map(([x, h, hue, p, s], i) => (
          <Flame key={i} x={x} baseHeight={h} hue={hue} phase={p} speed={s} />
        ))}
      </g>
    </svg>
  );
}

// ── Pan (side view, cast iron) ──────────────────────────────────────────────
function Pan() {
  return (
    <svg
      width="1920" height="1080" viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {/* Handle */}
      <g transform="translate(960, 770)">
        <rect x="280" y="-22" width="340" height="44" rx="22" fill={PAL.panBody} stroke={PAL.panShell} strokeWidth="3"/>
        <rect x="290" y="-14" width="320" height="6" rx="3" fill="#2c1c16" opacity="0.6"/>
        <rect x="600" y="-30" width="22" height="60" rx="6" fill={PAL.panShell}/>
      </g>
      {/* Pan body */}
      <g transform="translate(960, 770)">
        {/* Outer body */}
        <path
          d="M -340,-30 L -300,70 L 300,70 L 340,-30 Z"
          fill={PAL.panBody}
          stroke={PAL.panShell}
          strokeWidth="3"
        />
        {/* Bottom shadow */}
        <ellipse cx="0" cy="70" rx="300" ry="12" fill={PAL.panShell} opacity="0.6"/>
        {/* Rim */}
        <ellipse cx="0" cy="-30" rx="340" ry="36" fill={PAL.panRim} stroke={PAL.panShell} strokeWidth="3"/>
        {/* Inner bowl */}
        <ellipse cx="0" cy="-30" rx="316" ry="30" fill={PAL.panInner}/>
        {/* Oil sheen */}
        <ellipse cx="0" cy="-26" rx="290" ry="22" fill={PAL.oil} opacity="0.85"/>
        <ellipse cx="-90" cy="-30" rx="140" ry="8" fill={PAL.oilShine} opacity="0.5"/>
        <ellipse cx="120" cy="-22" rx="60" ry="4" fill={PAL.oilShine} opacity="0.35"/>
      </g>
    </svg>
  );
}

// ── Kernel ──────────────────────────────────────────────────────────────────
function Kernel() {
  const time = useTime();
  // The kernel goes away when it explodes
  if (time > 5.5) return null;

  // Shake: builds up as we approach the burst
  const shakeIntensity = clamp((time - 1.5) / 3.5, 0, 1);
  const jitter = shakeIntensity * shakeIntensity * 10;
  const jx = Math.sin(time * 47) * jitter + Math.sin(time * 91) * jitter * 0.4;
  const jy = Math.cos(time * 53) * jitter * 0.7;

  // Vertical bounce: small hop pattern as it gets agitated
  const hopT = Math.max(0, time - 2.5);
  const hop = Math.abs(Math.sin(hopT * (3 + hopT))) * Math.min(hopT * 6, 18);

  // Scale pulse: pressure builds inside
  const pulse = 1 + Math.sin(time * (3 + time * 1.5)) * 0.04 * shakeIntensity
    + interpolate([0, 3, 5, 5.4], [0, 0, 0.18, 0.35], Easing.easeInQuad)(time);

  // Color/heat: white → amber → red-hot
  const heatT = clamp(time / 5, 0, 1);
  const glow = interpolate([0, 2, 4, 5.4], [0, 0.2, 0.6, 1.0], Easing.easeInQuad)(time);

  // Crack progress 4.2 → 5.4
  const crackP = clamp((time - 4.2) / 1.2, 0, 1);

  // Slight rotation jitter
  const rot = Math.sin(time * 31) * shakeIntensity * 4;

  const cx = 960, cy = 700;

  return (
    <svg
      width="1920" height="1080" viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <defs>
        <radialGradient id="kernel-grad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={PAL.kernelHi}/>
          <stop offset="55%" stopColor={PAL.kernelMid}/>
          <stop offset="100%" stopColor={PAL.kernelLo}/>
        </radialGradient>
        <radialGradient id="kernel-heat" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#ffec8a"/>
          <stop offset="50%" stopColor="#ff5c1c"/>
          <stop offset="100%" stopColor="#ff5c1c" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="kernel-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Drop shadow on pan (squashes as kernel hops) */}
      <ellipse
        cx={cx + jx * 0.5}
        cy={740}
        rx={62 + glow * 18 - hop * 0.4}
        ry={9 - hop * 0.1}
        fill="url(#kernel-shadow)"
      />

      {/* Heat halo */}
      <ellipse
        cx={cx + jx} cy={cy + jy - hop}
        rx={75 * pulse + glow * 30}
        ry={92 * pulse + glow * 30}
        fill="url(#kernel-heat)"
        opacity={glow * 0.85}
        style={{ filter: `blur(${4 + glow * 8}px)` }}
      />

      <g
        transform={`translate(${cx + jx}, ${cy + jy - hop}) rotate(${rot}) scale(${pulse})`}
      >
        {/* Body */}
        <ellipse cx="0" cy="0" rx="48" ry="62" fill="url(#kernel-grad)"/>
        {/* Red-hot tint overlay (intensifies) */}
        <ellipse cx="0" cy="0" rx="48" ry="62" fill="#ff4a14" opacity={glow * 0.45}/>
        {/* Germ/seed tip */}
        <path
          d="M -10,52 Q 0,68 10,52 Q 6,58 0,58 Q -6,58 -10,52 Z"
          fill={PAL.kernelDark}
          opacity={1 - glow * 0.5}
        />
        {/* Highlight */}
        <ellipse cx="-16" cy="-26" rx="11" ry="20" fill="#fff6d0" opacity={0.7 - glow * 0.5}/>
        {/* Subtle dimple/seam */}
        <path
          d="M 0,-58 Q 6,-30 4,0 Q 2,30 0,56"
          stroke={PAL.kernelDark} strokeWidth="1.5" fill="none"
          opacity={0.35 - glow * 0.3}
        />

        {/* Cracks (revealed by crackP) */}
        <g
          stroke={PAL.kernelDark}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity={crackP}
        >
          <path d="M -18,-38 L -8,-18 L -22,4 L -4,22 L -14,42"
            strokeDasharray="120"
            strokeDashoffset={120 * (1 - crackP)}
          />
          <path d="M 22,-30 L 8,-8 L 26,12 L 6,30"
            strokeDasharray="100"
            strokeDashoffset={100 * (1 - crackP)}
          />
          <path d="M -2,-50 L 4,-28 L -6,-10"
            strokeDasharray="70"
            strokeDashoffset={70 * (1 - crackP)}
          />
        </g>
        {/* Inner glow leaking through cracks */}
        <g opacity={crackP * 0.95} style={{ mixBlendMode: 'screen' }}>
          <path d="M -18,-38 L -8,-18 L -22,4 L -4,22 L -14,42"
            stroke="#fff6a8" strokeWidth="3.5" fill="none" strokeLinecap="round"
            style={{ filter: 'blur(2px)' }}
          />
          <path d="M 22,-30 L 8,-8 L 26,12 L 6,30"
            stroke="#fff6a8" strokeWidth="3.5" fill="none" strokeLinecap="round"
            style={{ filter: 'blur(2px)' }}
          />
        </g>
      </g>
    </svg>
  );
}

// ── Steam wisps rising from kernel during heat ──────────────────────────────
function Steam() {
  const time = useTime();
  const visible = time > 1.2 && time < 5.5;
  if (!visible) return null;

  const wisps = [
    { x: -22, phase: 0.0, speed: 0.7, size: 14 },
    { x:   8, phase: 1.3, speed: 0.9, size: 12 },
    { x:  22, phase: 2.4, speed: 0.8, size: 16 },
    { x: -10, phase: 3.1, speed: 1.0, size: 11 },
    { x:  30, phase: 0.7, speed: 0.85, size: 13 },
  ];

  return (
    <svg
      width="1920" height="1080" viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <g transform="translate(960, 640)">
        {wisps.map((w, i) => {
          const t = (time * w.speed + w.phase) % 2.4;
          const lifeT = t / 2.4;
          const y = -lifeT * 220;
          const drift = Math.sin(t * 2.2 + w.phase) * 18;
          const o = Math.sin(lifeT * Math.PI) * 0.55;
          const r = w.size + lifeT * 14;
          return (
            <circle
              key={i}
              cx={w.x + drift}
              cy={y}
              r={r}
              fill="#fff"
              opacity={o}
              style={{ filter: 'blur(6px)' }}
            />
          );
        })}
      </g>
    </svg>
  );
}

// ── White flash at the moment of detonation ─────────────────────────────────
function Flash() {
  const time = useTime();
  if (time < 5.42 || time > 5.95) return null;
  // Quick spike up, slower fade
  const t = time - 5.42;
  let alpha;
  if (t < 0.06) alpha = t / 0.06;
  else alpha = Math.max(0, 1 - (t - 0.06) / 0.45);
  // Yellow → white core
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(circle at 50% 65%, rgba(255,255,255,${alpha}) 0%, rgba(255,235,150,${alpha*0.85}) 25%, rgba(255,120,30,${alpha*0.6}) 50%, transparent 80%)`,
      pointerEvents: 'none',
      mixBlendMode: 'screen',
    }} />
  );
}

// ── Burst rays — radial speed lines from epicenter ──────────────────────────
function BurstRays() {
  const time = useTime();
  if (time < 5.5 || time > 6.4) return null;
  const t = time - 5.5;
  const reach = Math.min(t / 0.3, 1);
  const fade = clamp(1 - (t - 0.2) / 0.7, 0, 1);
  const cx = 960, cy = 700;
  const rays = 14;
  return (
    <svg
      width="1920" height="1080" viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <g transform={`translate(${cx}, ${cy})`} opacity={fade}>
        {Array.from({ length: rays }).map((_, i) => {
          const a = (i / rays) * Math.PI * 2;
          const r1 = 60 + reach * 80;
          const r2 = 60 + reach * 320;
          const x1 = Math.cos(a) * r1, y1 = Math.sin(a) * r1;
          const x2 = Math.cos(a) * r2, y2 = Math.sin(a) * r2;
          return (
            <line key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#ffe88a" strokeWidth="7" strokeLinecap="round"
              opacity="0.85"
            />
          );
        })}
      </g>
    </svg>
  );
}

// ── Smoke puff post-explosion ───────────────────────────────────────────────
function SmokePuff() {
  const time = useTime();
  if (time < 5.5 || time > 9.5) return null;
  const t = time - 5.5;
  const cx = 960, cy = 700;
  const puffs = [
    { dx:   0, dy:   0, r: 70, delay: 0.0 },
    { dx: -50, dy: -20, r: 55, delay: 0.05 },
    { dx:  60, dy: -10, r: 60, delay: 0.07 },
    { dx: -30, dy: -60, r: 50, delay: 0.1 },
    { dx:  40, dy: -70, r: 45, delay: 0.12 },
    { dx:   0, dy: -90, r: 40, delay: 0.15 },
  ];
  return (
    <svg
      width="1920" height="1080" viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {puffs.map((p, i) => {
        const lt = Math.max(0, t - p.delay);
        const grow = clamp(lt / 0.6, 0, 1);
        const drift = lt * 30;
        const fade = clamp(1 - (lt - 0.6) / 3.2, 0, 1);
        const r = p.r * (0.4 + grow * 1.1);
        return (
          <circle key={i}
            cx={cx + p.dx}
            cy={cy + p.dy - drift}
            r={r}
            fill="#d8c9b4"
            opacity={fade * 0.55}
            style={{ filter: 'blur(8px)' }}
          />
        );
      })}
    </svg>
  );
}

// ── A single popcorn piece ──────────────────────────────────────────────────
function PopShape({ seed = 0, size = 1 }) {
  // Pseudo-random shape based on seed: a few overlapping lobes
  const rand = (s) => {
    const x = Math.sin(seed * 999 + s * 13) * 10000;
    return x - Math.floor(x);
  };
  const lobes = 5 + Math.floor(rand(1) * 3);
  const circles = [];
  for (let i = 0; i < lobes; i++) {
    const a = (i / lobes) * Math.PI * 2 + rand(i * 2) * 0.6;
    const d = 18 + rand(i * 3 + 1) * 14;
    const r = 22 + rand(i * 5 + 2) * 14;
    circles.push({
      cx: Math.cos(a) * d,
      cy: Math.sin(a) * d,
      r,
    });
  }
  // Center lobe
  circles.push({ cx: 0, cy: 0, r: 26 + rand(99) * 6 });

  return (
    <svg viewBox="-60 -60 120 120" width="120" height="120" style={{ overflow: 'visible' }}>
      {/* Shadow side */}
      <g transform="translate(2, 4)">
        {circles.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={PAL.popShade} opacity="0.85"/>
        ))}
      </g>
      {/* Body */}
      {circles.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={PAL.popMid}/>
      ))}
      {/* Highlight */}
      {circles.map((c, i) => (
        <circle key={i}
          cx={c.cx - c.r * 0.25} cy={c.cy - c.r * 0.3}
          r={c.r * 0.55} fill={PAL.popHi} opacity="0.75"
        />
      ))}
      {/* Core/seed glimpse */}
      <circle cx={rand(0)*8-4} cy={rand(1)*8-4} r="5" fill={PAL.popCore} opacity="0.55"/>
    </svg>
  );
}

// ── Single launched piece ───────────────────────────────────────────────────
function PopPiece({ seed }) {
  const time = useTime();
  const START = 5.5;
  if (time < START) return null;

  const rand = (s) => {
    const x = Math.sin(seed * 731 + s * 17) * 10000;
    return x - Math.floor(x);
  };

  // Random launch angle (biased upward) + speed
  const angle = -Math.PI / 2 + (rand(1) - 0.5) * 2.4; // mostly upward, +/- ~70°
  const speed = 700 + rand(2) * 600;                  // px/s
  const gravity = 1100;                               // px/s²
  const rotSpeed = (rand(3) - 0.5) * 720;             // deg/s
  const size = 0.5 + rand(4) * 0.55;
  const launchDelay = rand(5) * 0.12;                 // staggered burst

  const t = Math.max(0, time - START - launchDelay);
  if (t <= 0) return null;

  let x = Math.cos(angle) * speed * t;
  let y = Math.sin(angle) * speed * t + 0.5 * gravity * t * t;

  // Floor: pan rim is at y ≈ 670 in world coords (kernel was at 700). Pieces land/rest.
  const startX = 960, startY = 700;
  const floorY = 720 + (rand(6) - 0.5) * 40;
  const worldY = startY + y;

  let restingY = null;
  if (worldY > floorY) {
    // Compute when it hit the floor
    // Solve startY + sin(angle)*speed*t + 0.5*g*t^2 = floorY
    const a = 0.5 * gravity;
    const b = Math.sin(angle) * speed;
    const c = startY - floorY;
    const disc = b * b - 4 * a * c;
    if (disc >= 0) {
      const tHit = (-b + Math.sqrt(disc)) / (2 * a);
      const xHit = Math.cos(angle) * speed * tHit;
      // Small horizontal slide & bounce decay after hit
      const since = t - tHit;
      const bounceY = Math.max(0, Math.sin(Math.min(since, 0.4) * Math.PI / 0.4)) * 22 * Math.exp(-since * 4);
      x = xHit + Math.cos(angle) * speed * 0.18 * (1 - Math.exp(-since * 3));
      y = floorY - startY - bounceY;
      restingY = floorY;
    }
  }

  // Clamp x to stage so pieces don't fly off forever
  const cx = startX + x;
  const cy = startY + y;
  if (cx < -100 || cx > 2020) return null;

  // Rotation
  const rot = rotSpeed * t;

  // Subtle pop-in scale
  const popIn = clamp(t / 0.12, 0, 1);
  const finalSize = size * (0.4 + 0.6 * popIn);

  return (
    <div style={{
      position: 'absolute',
      left: cx - 60 * finalSize,
      top: cy - 60 * finalSize,
      width: 120 * finalSize,
      height: 120 * finalSize,
      transform: `rotate(${rot}deg)`,
      transformOrigin: 'center',
      willChange: 'transform',
    }}>
      <div style={{ transform: `scale(${finalSize})`, transformOrigin: '0 0', width: 120, height: 120 }}>
        <PopShape seed={seed} size={1}/>
      </div>
    </div>
  );
}

// One large hero popcorn that emerges from the explosion epicenter.
function HeroPop() {
  const time = useTime();
  const START = 5.5;
  if (time < START) return null;
  const t = time - START;

  // Pop-in with big overshoot, then settle with a tiny float
  const scale = interpolate(
    [0, 0.25, 0.45, 0.7, 1.6, 6.5],
    [0, 3.0, 2.4, 2.7, 2.6, 2.6],
    Easing.easeOutCubic
  )(t);

  // Small upward hop on emergence, then gentle drift
  const yOff = interpolate(
    [0, 0.3, 0.7, 1.4, 6.5],
    [0, -60, -20, -32, -28],
    Easing.easeOutCubic
  )(t);

  // Gentle bobbing once settled
  const bob = t > 1.4 ? Math.sin((t - 1.4) * 1.8) * 6 : 0;

  // A touch of rotation wobble
  const rot = Math.sin(t * 1.3) * 4 + interpolate([0, 0.4, 1.2], [0, 18, 0], Easing.easeOutCubic)(t);

  // Fade in opacity quickly
  const opacity = clamp(t / 0.18, 0, 1);

  const cx = 960, cy = 700;

  return (
    <div style={{
      position: 'absolute',
      left: cx,
      top: cy + yOff + bob,
      width: 0, height: 0,
      pointerEvents: 'none',
      opacity,
    }}>
      <div style={{
        position: 'absolute',
        left: -160, top: -160,
        width: 320, height: 320,
        transform: `scale(${scale / 2.6}) rotate(${rot}deg)`,
        transformOrigin: 'center',
        willChange: 'transform',
        filter: 'drop-shadow(0 18px 30px rgba(0,0,0,0.55))',
      }}>
        <BigPopShape />
      </div>
    </div>
  );
}

// A larger, more detailed fluffy popcorn shape for the hero piece.
function BigPopShape() {
  // Hand-picked lobes for a balanced, very fluffy cluster.
  const lobes = [
    { cx:   0, cy:   0, r: 92 },
    { cx: -78, cy: -34, r: 70 },
    { cx:  82, cy: -28, r: 74 },
    { cx: -42, cy:  66, r: 64 },
    { cx:  56, cy:  72, r: 60 },
    { cx:  -8, cy: -96, r: 62 },
    { cx: -98, cy:  28, r: 54 },
    { cx:  96, cy:  36, r: 56 },
    { cx: -34, cy: -64, r: 50 },
    { cx:  46, cy: -68, r: 52 },
    { cx:   4, cy:  92, r: 48 },
  ];
  return (
    <svg viewBox="-160 -160 320 320" width="320" height="320" style={{ overflow: 'visible' }}>
      {/* Soft contact shadow */}
      <ellipse cx="0" cy="118" rx="110" ry="14" fill="#000" opacity="0.35" />
      {/* Shade layer */}
      <g transform="translate(4, 7)">
        {lobes.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={PAL.popShade} opacity="0.95" />
        ))}
      </g>
      {/* Body */}
      {lobes.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={PAL.popMid} />
      ))}
      {/* Highlights */}
      {lobes.map((c, i) => (
        <circle key={i}
          cx={c.cx - c.r * 0.28} cy={c.cy - c.r * 0.32}
          r={c.r * 0.55} fill={PAL.popHi} opacity="0.85"
        />
      ))}
      {/* Tiny inner sparkles */}
      <circle cx="-30" cy="-10" r="9" fill="#ffffff" opacity="0.9" />
      <circle cx="36" cy="22" r="6" fill="#ffffff" opacity="0.75" />
      {/* Faint golden core peek */}
      <circle cx="6" cy="6" r="10" fill={PAL.popCore} opacity="0.35" />
    </svg>
  );
}

// ── Timestamp label updater (for review comments) ───────────────────────────
function TimestampLabel() {
  const time = useTime();
  React.useEffect(() => {
    const root = document.querySelector('[data-anim-root]');
    if (root) {
      const sec = Math.floor(time);
      root.setAttribute('data-screen-label', `t=${String(sec).padStart(2, '0')}s`);
    }
  }, [Math.floor(time)]);
  return null;
}

// ── Full scene ──────────────────────────────────────────────────────────────
function PopcornAnimation({ playing = false }) {
  return (
    <Stage width={1920} height={1080} duration={12} background="#0a0504" persistKey="popcorn-anim" autoplay={playing} showControls={false}>
      <TimestampLabel />
      <BackgroundScene />
      <Camera>
        <Flames />
        <Pan />
        <Steam />
        <Kernel />
        <BurstRays />
        <SmokePuff />
        <HeroPop />
      </Camera>
      <Flash />
    </Stage>
  );
}

export default PopcornAnimation;
