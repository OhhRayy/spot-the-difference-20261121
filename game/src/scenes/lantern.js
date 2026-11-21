// Scene 1 — Lantern Lane: a quiet night street with paper lanterns, a tea
// house, a bicycle and a cat in the window. 10 differences, 3 minutes.
// The left picture is drawn by draw(); each difference's apply() repaints
// its own patch on the right picture, so the two panels match everywhere
// else, pixel for pixel.
import { makeRng, roundRect, circle, ellipse, polygon, text, glow, star } from './common.js';

function skyFill(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#150f2e');
  g.addColorStop(0.55, '#33245e');
  g.addColorStop(0.78, '#4a2c5e');
  g.addColorStop(1, '#2a2138');
  return g;
}

function drawWire(ctx) {
  ctx.strokeStyle = '#0f0a24';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(30, 150); ctx.quadraticCurveTo(300, 175, 570, 140); ctx.stroke();
}

function drawLantern(ctx, x, y, body) {
  ctx.strokeStyle = '#1a1330';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x, y - 26); ctx.lineTo(x, y - 12); ctx.stroke();
  glow(ctx, x, y, 30, body, 0.5);
  ctx.fillStyle = body;
  ellipse(ctx, x, y, 16, 20); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ellipse(ctx, x - 5, y - 6, 4, 8); ctx.fill();
  ctx.fillStyle = '#ffd97a';
  roundRect(ctx, x - 6, y - 24, 12, 5, 2); ctx.fill();
  roundRect(ctx, x - 6, y + 19, 12, 5, 2); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.35)';
  ctx.lineWidth = 1;
  for (const dy of [-10, 0, 10]) {
    ctx.beginPath(); ctx.ellipse(x, y + dy, 15, 4, 0, 0, Math.PI * 2); ctx.stroke();
  }
}

function drawCat(ctx, x, y) {
  ctx.fillStyle = '#241a30';
  ellipse(ctx, x, y, 16, 12); ctx.fill();            // body
  circle(ctx, x + 2, y - 14, 10); ctx.fill();       // head
  polygon(ctx, [[x - 5, y - 20], [x - 2, y - 30], [x + 2, y - 21]]); ctx.fill();
  polygon(ctx, [[x + 6, y - 21], [x + 10, y - 30], [x + 12, y - 20]]); ctx.fill();
  ctx.fillStyle = '#ffd97a';
  circle(ctx, x - 1, y - 15, 1.6); ctx.fill();
  circle(ctx, x + 6, y - 15, 1.6); ctx.fill();
}

function drawBicycle(ctx) {
  ctx.strokeStyle = '#d8c9a8';
  ctx.lineWidth = 4;
  circle(ctx, 400, 545, 26); ctx.stroke();
  circle(ctx, 510, 545, 26); ctx.stroke();
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(400, 545); ctx.lineTo(455, 505); ctx.lineTo(510, 545);
  ctx.moveTo(455, 505); ctx.lineTo(445, 545);
  ctx.moveTo(455, 505); ctx.lineTo(480, 490);
  ctx.moveTo(480, 490); ctx.lineTo(505, 490);
  ctx.moveTo(445, 545); ctx.lineTo(400, 545);
  ctx.stroke();
  ctx.beginPath(); ctx.moveTo(505, 490); ctx.lineTo(525, 505); ctx.stroke();
  // wicker basket on the front
  ctx.fillStyle = '#b08a4a';
  roundRect(ctx, 520, 498, 34, 28, 4); ctx.fill();
  ctx.strokeStyle = '#8a6a34';
  ctx.lineWidth = 1.5;
  for (const yy of [506, 514, 522]) {
    ctx.beginPath(); ctx.moveTo(522, yy); ctx.lineTo(552, yy); ctx.stroke();
  }
}

function draw(ctx) {
  // sky + ground
  ctx.fillStyle = skyFill(ctx);
  ctx.fillRect(0, 0, 600, 600);
  ctx.fillStyle = '#241a30';
  ctx.fillRect(0, 470, 600, 130);
  ctx.fillStyle = '#2e2540';
  for (let i = 0; i < 5; i++) ctx.fillRect(0, 486 + i * 26, 600, 3);

  // stars (fixed positions, seeded)
  const rng = makeRng(7);
  ctx.fillStyle = '#fff6c9';
  for (let i = 0; i < 26; i++) {
    const sx = 20 + rng() * 560;
    const sy = 18 + rng() * 230;
    if (Math.hypot(sx - 485, sy - 88) < 55) continue;
    const r = 1 + rng() * 1.8;
    circle(ctx, sx, sy, r); ctx.fill();
  }
  // one bright star with rays, top left
  star(ctx, 70, 60, 10, 4, 4);
  ctx.fillStyle = '#fff6c9'; ctx.fill();

  // moon with two craters
  glow(ctx, 485, 88, 70, '#ffe9a8', 0.55);
  ctx.fillStyle = '#ffe9a8';
  circle(ctx, 485, 88, 36); ctx.fill();
  ctx.fillStyle = '#e8c87e';
  circle(ctx, 472, 78, 7); ctx.fill();
  circle(ctx, 498, 100, 5); ctx.fill();

  // back rooftops
  ctx.fillStyle = '#241a3d';
  polygon(ctx, [[0, 470], [0, 340], [90, 300], [180, 340], [180, 470]]); ctx.fill();
  polygon(ctx, [[430, 470], [430, 330], [520, 295], [600, 330], [600, 470]]); ctx.fill();
  ctx.fillStyle = '#ffd97a';
  for (const [wx, wy] of [[40, 370], [120, 355], [480, 360], [545, 350]]) {
    ctx.fillRect(wx, wy, 16, 20);
  }

  // wire + paper lanterns
  drawWire(ctx);
  // bird on the wire
  ctx.fillStyle = '#0f0a24';
  ellipse(ctx, 330, 138, 10, 6); ctx.fill();
  circle(ctx, 338, 133, 4.5); ctx.fill();
  polygon(ctx, [[341, 131], [348, 133], [341, 135]]); ctx.fill();
  const lanternXs = [90, 175, 260, 345, 430, 515];
  const lanternColors = ['#ff5a4a', '#ffb84a', '#ff5a4a', '#ff8a5c', '#ff5a4a', '#ffb84a'];
  lanternXs.forEach((lx, i) => drawLantern(ctx, lx, 178 + (i % 2) * 6, lanternColors[i]));

  // tea house (left building)
  ctx.fillStyle = '#8a5a7d';
  ctx.fillRect(50, 250, 220, 220);
  ctx.fillStyle = '#4a2c50';
  polygon(ctx, [[40, 252], [160, 205], [280, 252]]); ctx.fill();
  // sign board with a little teapot
  ctx.fillStyle = '#3a2a1c';
  roundRect(ctx, 62, 258, 196, 38, 8); ctx.fill();
  ctx.fillStyle = '#ffd97a';
  circle(ctx, 92, 277, 9); ctx.fill();
  ctx.fillRect(84, 272, 16, 4);
  polygon(ctx, [[100, 272], [108, 276], [100, 280]]); ctx.fill();
  text(ctx, 'TEA HOUSE', 178, 278, 'bold 21px "Trebuchet MS", sans-serif', '#ffd97a');
  // window, warm light, curtains open, cat on the sill
  ctx.fillStyle = '#2e2149';
  ctx.fillRect(72, 318, 86, 104);
  ctx.fillStyle = '#ffd97a';
  ctx.fillRect(78, 324, 74, 92);
  ctx.fillStyle = '#c96f4a';
  polygon(ctx, [[78, 324], [100, 324], [92, 416], [78, 416]]); ctx.fill();
  polygon(ctx, [[152, 324], [130, 324], [138, 416], [152, 416]]); ctx.fill();
  ctx.fillStyle = '#5d4429';
  ctx.fillRect(70, 416, 90, 8);
  drawCat(ctx, 115, 408);
  // door
  ctx.fillStyle = '#4a2c50';
  ctx.fillRect(195, 350, 55, 120);
  ctx.fillStyle = '#ffd97a';
  circle(ctx, 240, 412, 4); ctx.fill();

  // right building with striped awning
  ctx.fillStyle = '#5a6b8a';
  ctx.fillRect(320, 290, 240, 180);
  ctx.fillStyle = '#3d4a63';
  polygon(ctx, [[312, 292], [440, 245], [568, 292]]); ctx.fill();
  // chimney + smoke
  ctx.fillStyle = '#7a4a3a';
  ctx.fillRect(505, 225, 30, 70);
  ctx.fillStyle = 'rgba(220,220,235,0.75)';
  circle(ctx, 520, 205, 12); ctx.fill();
  circle(ctx, 512, 188, 15); ctx.fill();
  circle(ctx, 524, 168, 18); ctx.fill();
  // awning stripes
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#ff5a4a' : '#f5ead6';
    ctx.fillRect(352 + i * 18, 300, 18, 24);
  }
  ctx.fillStyle = '#2e2149';
  ctx.fillRect(358, 326, 92, 84);
  ctx.fillStyle = '#ffd97a';
  ctx.fillRect(364, 332, 80, 72);
  ctx.strokeStyle = '#2e2149';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(404, 332); ctx.lineTo(404, 404); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(364, 368); ctx.lineTo(444, 368); ctx.stroke();

  // potted plant with one red flower
  ctx.fillStyle = '#b05a3a';
  polygon(ctx, [[285, 470], [325, 470], [318, 505], [292, 505]]); ctx.fill();
  ctx.fillStyle = '#4a8a4a';
  ellipse(ctx, 305, 458, 16, 12); ctx.fill();
  ellipse(ctx, 292, 466, 12, 9); ctx.fill();
  ellipse(ctx, 318, 466, 12, 9); ctx.fill();
  ctx.fillStyle = '#ff4a6b';
  circle(ctx, 305, 452, 8); ctx.fill();
  ctx.fillStyle = '#ffd97a';
  circle(ctx, 305, 452, 3); ctx.fill();

  // bicycle
  drawBicycle(ctx);

  // puddle with the moon's reflection
  ctx.fillStyle = '#3d4f7a';
  ellipse(ctx, 300, 540, 70, 14); ctx.fill();
  ctx.fillStyle = 'rgba(255,233,168,0.8)';
  ellipse(ctx, 300, 540, 26, 5); ctx.fill();
  ellipse(ctx, 300, 548, 16, 3); ctx.fill();
}

export const lanternLane = {
  id: 'lantern',
  name: 'Lantern Lane',
  timeLimit: 180,
  width: 600,
  height: 600,
  draw,
  differences: [
    {
      id: 'moon-crater', name: 'Moon crater', x: 485, y: 88, r: 36,
      apply(ctx) {
        ctx.fillStyle = '#ffe9a8';
        circle(ctx, 485, 88, 36); ctx.fill(); // plain moon, no craters
      },
    },
    {
      id: 'lantern-colour', name: 'Lantern colour', x: 260, y: 184, r: 22,
      apply(ctx) {
        ctx.fillStyle = skyFill(ctx);
        ctx.fillRect(238, 148, 44, 66);
        drawWire(ctx); // the patch erased a stretch of the wire
        drawLantern(ctx, 260, 184, '#3ab8a8'); // teal instead of red
      },
    },
    {
      id: 'window-cat', name: 'Cat in the window', x: 115, y: 405, r: 26,
      apply(ctx) {
        ctx.fillStyle = '#ffd97a';
        ctx.fillRect(78, 374, 74, 42); // empty warm window, no cat (ears included)
        ctx.fillStyle = '#5d4429';
        ctx.fillRect(70, 416, 90, 8);
      },
    },
    {
      id: 'teapot-sign', name: 'Teapot on the sign', x: 92, y: 277, r: 18,
      apply(ctx) {
        ctx.fillStyle = '#3a2a1c';
        ctx.fillRect(74, 262, 36, 30); // sign without the teapot
      },
    },
    {
      id: 'bike-basket', name: 'Bicycle basket', x: 537, y: 512, r: 22,
      apply(ctx) {
        ctx.fillStyle = '#241a30';
        ctx.fillRect(516, 494, 44, 36); // street where the basket was
        // the patch also cut the front wheel's top arc: redraw it
        ctx.strokeStyle = '#d8c9a8';
        ctx.lineWidth = 4;
        circle(ctx, 510, 545, 26); ctx.stroke();
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(505, 490); ctx.lineTo(525, 505); ctx.stroke();
      },
    },
    {
      id: 'curtain-closed', name: 'Curtain closed', x: 115, y: 370, r: 44,
      apply(ctx) {
        ctx.fillStyle = '#c96f4a';
        ctx.fillRect(78, 324, 74, 92); // curtain drawn across the window
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        for (const fx of [88, 104, 120, 136]) ctx.fillRect(fx, 324, 4, 92);
      },
    },
    {
      id: 'wire-bird', name: 'Bird on the wire', x: 330, y: 136, r: 16,
      apply(ctx) {
        ctx.fillStyle = skyFill(ctx);
        ctx.fillRect(314, 122, 40, 24); // empty wire
        ctx.strokeStyle = '#0f0a24';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(314, 148); ctx.quadraticCurveTo(334, 150, 354, 146); ctx.stroke();
      },
    },
    {
      id: 'puddle-moon', name: 'Moon in the puddle', x: 300, y: 540, r: 40,
      apply(ctx) {
        ctx.fillStyle = '#3d4f7a';
        ellipse(ctx, 300, 540, 70, 14); ctx.fill(); // plain water, no reflection
      },
    },
    {
      id: 'pot-flower', name: 'Flower in the pot', x: 305, y: 452, r: 16,
      apply(ctx) {
        ctx.fillStyle = '#4a8a4a';
        ellipse(ctx, 305, 452, 9, 8); ctx.fill(); // leaves only, no flower
      },
    },
    {
      id: 'chimney-smoke', name: 'Chimney smoke', x: 520, y: 190, r: 30,
      apply(ctx) {
        ctx.fillStyle = skyFill(ctx);
        ctx.fillRect(494, 148, 56, 72); // clear night sky, no smoke
      },
    },
  ],
};
