// Scene 2 — Koi Pond Garden: a sunny garden with a cherry tree, a pond
// full of koi, a stone bridge and a stone lantern. 10 differences, 2:30.
import { makeRng, roundRect, circle, ellipse, polygon, text } from './common.js';

function skyFill(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 380);
  g.addColorStop(0, '#a8d8f8');
  g.addColorStop(1, '#e8f7ff');
  return g;
}

function skyPatch(ctx, x, y, w, h) {
  ctx.fillStyle = skyFill(ctx);
  ctx.fillRect(x, y, w, h);
}

function lawnPatch(ctx, x, y, w, h) {
  ctx.fillStyle = '#7ab85a';
  ctx.fillRect(x, y, w, h);
}

function cloud(ctx, x, y, s) {
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ellipse(ctx, x, y, 34 * s, 16 * s); ctx.fill();
  ellipse(ctx, x - 22 * s, y + 6 * s, 22 * s, 12 * s); ctx.fill();
  ellipse(ctx, x + 24 * s, y + 6 * s, 24 * s, 13 * s); ctx.fill();
}

function blossom(ctx, x, y, r, color) {
  ctx.fillStyle = color;
  for (const [dx, dy, dr] of [[0, 0, r], [-r * 0.8, r * 0.4, r * 0.7], [r * 0.8, r * 0.4, r * 0.7], [0, -r * 0.8, r * 0.7]]) {
    circle(ctx, x + dx, y + dy, dr); ctx.fill();
  }
  ctx.fillStyle = '#fff0c0';
  circle(ctx, x, y, r * 0.25); ctx.fill();
}

function koi(ctx, x, y, angle, body, spots) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = body;
  ellipse(ctx, 0, 0, 26, 10); ctx.fill();
  polygon(ctx, [[-24, 0], [-38, -10], [-38, 10]]); ctx.fill();
  ctx.fillStyle = spots;
  ellipse(ctx, 6, -3, 9, 5); ctx.fill();
  ellipse(ctx, -8, 4, 7, 4); ctx.fill();
  ctx.fillStyle = '#222';
  circle(ctx, 18, -3, 1.8); ctx.fill();
  circle(ctx, 18, 3, 1.8); ctx.fill();
  ctx.restore();
}

function draw(ctx) {
  // sky, sun with rays, clouds
  ctx.fillStyle = skyFill(ctx);
  ctx.fillRect(0, 0, 600, 380);
  ctx.fillStyle = '#7ab85a';
  ctx.fillRect(0, 380, 600, 220);
  ctx.fillStyle = '#6aa84f';
  const rng = makeRng(21);
  for (let i = 0; i < 14; i++) {
    ellipse(ctx, rng() * 600, 400 + rng() * 190, 20 + rng() * 40, 8 + rng() * 10);
    ctx.fill();
  }
  ctx.strokeStyle = '#ffcf4a';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    ctx.beginPath();
    ctx.moveTo(95 + Math.cos(a) * 42, 85 + Math.sin(a) * 42);
    ctx.lineTo(95 + Math.cos(a) * 56, 85 + Math.sin(a) * 56);
    ctx.stroke();
  }
  ctx.fillStyle = '#ffd94a';
  circle(ctx, 95, 85, 34); ctx.fill();
  cloud(ctx, 300, 70, 1);
  cloud(ctx, 470, 110, 0.8);
  cloud(ctx, 200, 150, 0.6);

  // cherry tree, left
  ctx.strokeStyle = '#6b4a3a';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(110, 390); ctx.lineTo(120, 240); ctx.stroke();
  ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(118, 280); ctx.lineTo(70, 210); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(118, 250); ctx.lineTo(180, 180); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(120, 240); ctx.lineTo(120, 150); ctx.stroke();
  blossom(ctx, 70, 190, 26, '#ffb8d1');
  blossom(ctx, 130, 130, 30, '#ffc2d6');
  blossom(ctx, 210, 120, 24, '#ffb8d1');
  blossom(ctx, 180, 200, 26, '#ff9ec4');
  blossom(ctx, 100, 90, 22, '#ffc2d6');
  blossom(ctx, 40, 250, 20, '#ff9ec4');
  // fallen petals on the lawn
  ctx.fillStyle = '#ffb8d1';
  for (const [px, py] of [[150, 420], [190, 440], [120, 460], [230, 410]]) {
    ellipse(ctx, px, py, 6, 4); ctx.fill();
  }

  // bamboo fence, back right
  ctx.fillStyle = '#c9a85a';
  for (let i = 0; i < 9; i++) {
    const sx = 400 + i * 20;
    ctx.fillRect(sx, 330, 12, 70);
    ctx.fillStyle = '#b89a4a';
    ctx.fillRect(sx, 352, 12, 3);
    ctx.fillRect(sx, 378, 12, 3);
    ctx.fillStyle = '#c9a85a';
  }
  ctx.fillStyle = '#a8873f';
  ctx.fillRect(396, 340, 188, 6);
  ctx.fillRect(396, 388, 188, 6);

  // pond
  ctx.fillStyle = '#4a90c8';
  ellipse(ctx, 370, 490, 190, 92); ctx.fill();
  ctx.fillStyle = '#5aa8d8';
  ellipse(ctx, 370, 488, 178, 82); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.ellipse(370, 488, 150, 62, 0, Math.PI * 1.1, Math.PI * 1.6); ctx.stroke();
  // lily pads
  ctx.fillStyle = '#3f9a4a';
  ellipse(ctx, 300, 500, 24, 12); ctx.fill();
  ellipse(ctx, 430, 530, 28, 13); ctx.fill();
  // pink lotus on the right pad
  ctx.fillStyle = '#ff8ab8';
  for (let i = 0; i < 5; i++) {
    const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
    ellipse(ctx, 430 + Math.cos(a) * 7, 526 + Math.sin(a) * 5, 6, 4); ctx.fill();
  }
  ctx.fillStyle = '#ffd94a';
  circle(ctx, 430, 526, 3.5); ctx.fill();
  // koi: three fish
  koi(ctx, 330, 470, 0.25, '#ff8a3d', '#fff');
  koi(ctx, 400, 515, -0.15, '#fff', '#ff8a3d');
  koi(ctx, 460, 478, 0.5, '#ff8a3d', '#222');
  // frog on the left lily pad
  ctx.fillStyle = '#5ab85a';
  ellipse(ctx, 300, 494, 13, 9); ctx.fill();
  circle(ctx, 292, 486, 5); ctx.fill();
  circle(ctx, 308, 486, 5); ctx.fill();
  ctx.fillStyle = '#fff';
  circle(ctx, 292, 485, 2.4); ctx.fill();
  circle(ctx, 308, 485, 2.4); ctx.fill();
  ctx.fillStyle = '#222';
  circle(ctx, 292, 485, 1.2); ctx.fill();
  circle(ctx, 308, 485, 1.2); ctx.fill();

  // stone bridge over the pond's top edge
  ctx.fillStyle = '#9a9aa8';
  for (let i = 0; i < 5; i++) {
    const bx = 285 + i * 38;
    const by = 428 - Math.sin((i / 4) * Math.PI) * 22;
    roundRect(ctx, bx, by, 34, 16, 6); ctx.fill();
  }
  ctx.fillStyle = '#7a7a88';
  ctx.fillRect(280, 440, 190, 6);

  // stepping stones, bottom left
  ctx.fillStyle = '#b8b8c0';
  for (const [sx, sy] of [[60, 520], [105, 545], [155, 528], [205, 552]]) {
    ellipse(ctx, sx, sy, 26, 12); ctx.fill();
  }

  // stone lantern (toro), right
  ctx.fillStyle = '#8a8a96';
  ctx.fillRect(508, 356, 26, 10);          // base
  ctx.fillRect(514, 330, 14, 28);          // pillar
  ctx.fillRect(502, 316, 38, 16);          // light box
  ctx.fillStyle = '#ffd94a';
  ctx.fillRect(512, 320, 18, 8);           // glowing window
  ctx.fillStyle = '#6a6a76';
  polygon(ctx, [[496, 316], [546, 316], [521, 296]]); ctx.fill(); // roof cap

  // butterfly over the flowers
  ctx.fillStyle = '#ff8a3d';
  ellipse(ctx, 138, 472, 10, 7); ctx.fill();
  ellipse(ctx, 162, 472, 10, 7); ctx.fill();
  ctx.fillStyle = '#ffb84a';
  ellipse(ctx, 142, 482, 7, 5); ctx.fill();
  ellipse(ctx, 158, 482, 7, 5); ctx.fill();
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(150, 468); ctx.lineTo(150, 488); ctx.stroke();

  // flowers, bottom left
  for (const [fx, fy, fc] of [[80, 560, '#ff6b9d'], [130, 578, '#ffd94a'], [180, 562, '#b88aff']]) {
    ctx.strokeStyle = '#3f9a4a';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx, fy + 18); ctx.stroke();
    ctx.fillStyle = fc;
    for (let i = 0; i < 5; i++) {
      const a = (i * Math.PI * 2) / 5;
      circle(ctx, fx + Math.cos(a) * 7, fy + Math.sin(a) * 7, 5); ctx.fill();
    }
    ctx.fillStyle = '#fff';
    circle(ctx, fx, fy, 4); ctx.fill();
  }
}

export const koiPond = {
  id: 'pond',
  name: 'Koi Pond Garden',
  timeLimit: 150,
  width: 600,
  height: 600,
  draw,
  differences: [
    {
      id: 'koi-count', name: 'Third koi', x: 460, y: 478, r: 34,
      apply(ctx) {
        ctx.fillStyle = '#5aa8d8';
        ellipse(ctx, 460, 478, 50, 30); ctx.fill(); // open water, fish gone
      },
    },
    {
      id: 'pond-frog', name: 'Frog on the lily pad', x: 300, y: 492, r: 20,
      apply(ctx) {
        ctx.fillStyle = '#3f9a4a';
        ellipse(ctx, 300, 500, 24, 12); ctx.fill(); // empty lily pad
      },
    },
    {
      id: 'butterfly', name: 'Butterfly', x: 150, y: 478, r: 22,
      apply(ctx) {
        lawnPatch(ctx, 124, 452, 52, 52); // lawn where the butterfly flew
      },
    },
    {
      id: 'blossom-white', name: 'Blossom colour', x: 210, y: 120, r: 26,
      apply(ctx) { blossom(ctx, 210, 120, 24, '#ffffff'); }, // white, not pink
    },
    {
      id: 'lantern-cap', name: 'Stone lantern roof', x: 521, y: 306, r: 26,
      apply(ctx) {
        skyPatch(ctx, 492, 288, 58, 32); // sky where the roof cap was
      },
    },
    {
      id: 'cloud-missing', name: 'Cloud', x: 470, y: 110, r: 40,
      apply(ctx) { skyPatch(ctx, 420, 82, 110, 56); }, // clear sky
    },
    {
      id: 'stepping-stone', name: 'Stepping stone', x: 155, y: 528, r: 26,
      apply(ctx) {
        lawnPatch(ctx, 125, 510, 60, 36); // lawn, one stone fewer
      },
    },
    {
      id: 'sun-rays', name: 'Sun rays', x: 95, y: 85, r: 56,
      apply(ctx) {
        skyPatch(ctx, 30, 20, 130, 130);
        ctx.fillStyle = '#ffd94a';
        circle(ctx, 95, 85, 34); ctx.fill(); // plain sun, no rays
      },
    },
    {
      id: 'fence-slat', name: 'Bamboo slat', x: 466, y: 365, r: 20,
      apply(ctx) {
        skyPatch(ctx, 458, 330, 16, 50);
        lawnPatch(ctx, 458, 380, 16, 20); // gap in the fence
      },
    },
    {
      id: 'lotus-colour', name: 'Lotus colour', x: 430, y: 526, r: 20,
      apply(ctx) {
        ctx.fillStyle = '#ffd94a';
        for (let i = 0; i < 5; i++) {
          const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
          ellipse(ctx, 430 + Math.cos(a) * 7, 526 + Math.sin(a) * 5, 6, 4); ctx.fill();
        }
        ctx.fillStyle = '#ff8a3d';
        circle(ctx, 430, 526, 3.5); ctx.fill(); // yellow lotus, not pink
      },
    },
  ],
};
