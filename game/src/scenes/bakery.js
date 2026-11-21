// Scene 3 — Starlight Bakery: a cosy bakery at night, cakes in the case,
// a sleeping cat on the counter and a chalkboard menu. 12 differences,
// 2 minutes. The hardest set: smaller targets, more of them.
import { roundRect, circle, ellipse, polygon, text, glow, star } from './common.js';

const WALL = '#f2e3c8';
const COUNTER_TOP = '#8a5a34';
const BOARD = '#2e3a2e';

function drawWindow(ctx) {
  ctx.fillStyle = '#5d4429';
  ctx.fillRect(446, 36, 128, 138);
  ctx.fillStyle = '#1a1440';
  ctx.fillRect(454, 44, 112, 122);
  ctx.fillStyle = '#fff6c9';
  for (const [sx, sy] of [[470, 60], [500, 150], [552, 140], [480, 100]]) {
    circle(ctx, sx, sy, 2); ctx.fill();
  }
  ctx.fillStyle = '#ffe9a8';
  circle(ctx, 540, 80, 16); ctx.fill();
  ctx.fillStyle = '#e8c87e';
  circle(ctx, 534, 76, 3.5); ctx.fill();
  ctx.strokeStyle = '#5d4429';
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(510, 44); ctx.lineTo(510, 166); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(454, 105); ctx.lineTo(566, 105); ctx.stroke();
}

function drawMenuBoard(ctx) {
  ctx.fillStyle = BOARD;
  roundRect(ctx, 230, 55, 160, 110, 8); ctx.fill();
  ctx.strokeStyle = '#8a6a34';
  ctx.lineWidth = 4;
  roundRect(ctx, 230, 55, 160, 110, 8); ctx.stroke();
  text(ctx, 'TODAY', 310, 76, 'bold 17px "Trebuchet MS", sans-serif', '#f5ead6');
  text(ctx, 'Honey Cake  5', 310, 102, '16px "Trebuchet MS", sans-serif', '#f5ead6');
  text(ctx, 'Star Bun  3', 310, 126, '16px "Trebuchet MS", sans-serif', '#f5ead6');
  text(ctx, 'Moon Pie  4', 310, 150, '16px "Trebuchet MS", sans-serif', '#f5ead6');
}

function drawMitt(ctx) {
  ctx.fillStyle = '#c94a3a';
  roundRect(ctx, 408, 112, 26, 44, 10); ctx.fill();
  ctx.fillStyle = '#a83a2e';
  roundRect(ctx, 408, 112, 26, 12, 6); ctx.fill();
  ctx.strokeStyle = '#8a5a34';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(421, 112); ctx.lineTo(421, 98); ctx.stroke();
}

function drawClock(ctx, minuteDown) {
  ctx.fillStyle = '#fff8e8';
  circle(ctx, 95, 95, 36); ctx.fill();
  ctx.strokeStyle = '#5d4429';
  ctx.lineWidth = 4;
  circle(ctx, 95, 95, 36); ctx.stroke();
  ctx.fillStyle = '#2e2e2e';
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    circle(ctx, 95 + Math.sin(a) * 30, 95 - Math.cos(a) * 30, 2); ctx.fill();
  }
  ctx.strokeStyle = '#2e2e2e';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(95, 95); ctx.lineTo(95 + 16, 95); ctx.stroke(); // hour: 3
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(95, 95);
  if (minuteDown) ctx.lineTo(95, 95 + 24); else ctx.lineTo(95, 95 - 24); // minute: 12 or 6
  ctx.stroke();
  ctx.fillStyle = '#c94a3a';
  circle(ctx, 95, 95, 3.5); ctx.fill();
}

function drawCake(ctx, x, y, frosting, cherry) {
  ctx.fillStyle = '#e8c89a';
  roundRect(ctx, x - 24, y - 6, 48, 22, 4); ctx.fill();
  ctx.fillStyle = frosting;
  roundRect(ctx, x - 24, y - 14, 48, 12, 5); ctx.fill();
  ctx.fillStyle = '#fff';
  for (let i = 0; i < 4; i++) circle(ctx, x - 18 + i * 12, y - 2, 2); ctx.fill();
  if (cherry) {
    ctx.fillStyle = '#d93a4a';
    circle(ctx, x, y - 18, 5); ctx.fill();
  }
}

function drawJar(ctx, x, y, color, label) {
  ctx.fillStyle = color;
  roundRect(ctx, x - 16, y - 26, 32, 40, 8); ctx.fill();
  ctx.fillStyle = '#8a6a34';
  roundRect(ctx, x - 12, y - 32, 24, 8, 3); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  roundRect(ctx, x - 10, y - 14, 20, 14, 3); ctx.fill();
  text(ctx, label, x, y - 7, 'bold 11px "Trebuchet MS", sans-serif', '#5d4429');
}

function drawLamp(ctx, x, lit) {
  ctx.strokeStyle = '#5d4429';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 92); ctx.stroke();
  if (lit) glow(ctx, x, 128, 60, '#ffd97a', 0.5);
  ctx.fillStyle = lit ? '#c94a3a' : '#7a7a7a';
  polygon(ctx, [[x - 26, 92], [x + 26, 92], [x + 14, 122], [x - 14, 122]]); ctx.fill();
  ctx.fillStyle = lit ? '#ffe9a8' : '#b8b8b8';
  circle(ctx, x, 126, 9); ctx.fill();
}

function drawCat(ctx, x, y) {
  ctx.fillStyle = '#e8a84a';
  ellipse(ctx, x, y, 34, 15); ctx.fill();            // curled body
  circle(ctx, x + 30, y - 8, 13); ctx.fill();       // head
  polygon(ctx, [[x + 22, y - 16], [x + 24, y - 26], [x + 30, y - 17]]); ctx.fill();
  polygon(ctx, [[x + 32, y - 18], [x + 38, y - 27], [x + 40, y - 17]]); ctx.fill();
  ctx.strokeStyle = '#c98a3a';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(x - 18, y + 2, 14, Math.PI * 0.9, Math.PI * 1.9); ctx.stroke();
  ctx.fillStyle = '#8a5a34';
  ellipse(ctx, x - 34, y + 12, 8, 4); ctx.fill();    // tail tip
  ctx.strokeStyle = '#8a5a34';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x + 24, y - 6); ctx.lineTo(x + 30, y - 6); ctx.stroke();
}

function draw(ctx) {
  // wall + wooden floor
  ctx.fillStyle = WALL;
  ctx.fillRect(0, 0, 600, 500);
  ctx.fillStyle = '#a87a4a';
  ctx.fillRect(0, 500, 600, 100);
  ctx.fillStyle = '#96683e';
  for (let i = 0; i < 4; i++) ctx.fillRect(0, 524 + i * 24, 600, 2);
  ctx.fillStyle = '#8a5f36';
  for (const px of [120, 300, 480]) ctx.fillRect(px, 500, 3, 100);

  // rug with a red stripe
  ctx.fillStyle = '#c94a3a';
  roundRect(ctx, 200, 528, 200, 52, 10); ctx.fill();
  ctx.fillStyle = '#f5ead6';
  ctx.fillRect(210, 540, 180, 8);
  ctx.fillRect(210, 560, 180, 8);

  // window: night sky, moon, stars
  drawWindow(ctx);

  // wall clock, 3:00
  drawClock(ctx, false);

  // shelves with jars
  ctx.fillStyle = '#8a5a34';
  ctx.fillRect(40, 200, 170, 12);
  ctx.fillRect(40, 300, 170, 12);
  drawJar(ctx, 70, 186, '#e8a84a', 'H');
  drawJar(ctx, 118, 186, '#c95a7a', 'B');
  drawJar(ctx, 166, 186, '#7ab85a', 'M');
  drawJar(ctx, 70, 286, '#b88aff', 'J');
  drawJar(ctx, 118, 286, '#e8a84a', 'H');
  ctx.fillStyle = '#4a8a4a';
  ellipse(ctx, 168, 288, 14, 8); ctx.fill();
  ctx.fillStyle = '#b05a3a';
  roundRect(ctx, 158, 288, 20, 12, 3); ctx.fill();

  // chalkboard menu
  drawMenuBoard(ctx);

  // oven mitt on the wall
  drawMitt(ctx);

  // pendant lamps
  drawLamp(ctx, 210, true);
  drawLamp(ctx, 430, true);

  // counter
  ctx.fillStyle = COUNTER_TOP;
  ctx.fillRect(30, 420, 540, 16);
  ctx.fillStyle = '#6e4526';
  ctx.fillRect(30, 436, 540, 64);
  ctx.fillStyle = '#5d3a20';
  for (const px of [150, 300, 450]) ctx.fillRect(px, 436, 4, 64);

  // display case with three cakes
  ctx.fillStyle = 'rgba(190,220,240,0.35)';
  roundRect(ctx, 60, 330, 240, 90, 10); ctx.fill();
  ctx.strokeStyle = '#5d4429';
  ctx.lineWidth = 3;
  roundRect(ctx, 60, 330, 240, 90, 10); ctx.stroke();
  ctx.fillStyle = '#d8c9a8';
  ctx.fillRect(66, 404, 228, 10);
  drawCake(ctx, 110, 396, '#ff8ab8', true);
  drawCake(ctx, 180, 396, '#8a5a3a', true);
  drawCake(ctx, 250, 396, '#7ab85a', false);

  // rolling pin, cup, herb pot, sleeping cat on the counter
  ctx.fillStyle = '#d8b078';
  roundRect(ctx, 322, 442, 76, 12, 6); ctx.fill();
  ctx.fillStyle = '#b08a4a';
  roundRect(ctx, 314, 444, 10, 8, 3); ctx.fill();
  roundRect(ctx, 396, 444, 10, 8, 3); ctx.fill();
  ctx.fillStyle = '#7ab8d8';
  roundRect(ctx, 424, 428, 26, 22, 4); ctx.fill();
  ctx.strokeStyle = '#5a98b8';
  ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(452, 439, 7, -Math.PI / 2, Math.PI / 2); ctx.stroke();
  ctx.strokeStyle = 'rgba(200,200,210,0.9)';
  ctx.beginPath(); ctx.moveTo(430, 424); ctx.quadraticCurveTo(434, 414, 430, 408); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(440, 424); ctx.quadraticCurveTo(444, 414, 440, 408); ctx.stroke();
  ctx.fillStyle = '#b05a3a';
  polygon(ctx, [[548, 420], [572, 420], [568, 442], [552, 442]]); ctx.fill();
  ctx.fillStyle = '#4a8a4a';
  ellipse(ctx, 560, 412, 12, 9); ctx.fill();
  ellipse(ctx, 552, 416, 9, 7); ctx.fill();
  ellipse(ctx, 568, 416, 9, 7); ctx.fill();
  drawCat(ctx, 498, 404);
}

export const starlightBakery = {
  id: 'bakery',
  name: 'Starlight Bakery',
  timeLimit: 120,
  width: 600,
  height: 600,
  draw,
  differences: [
    {
      id: 'clock-hands', name: 'Clock hands', x: 95, y: 95, r: 36,
      apply(ctx) { drawClock(ctx, true); }, // 3:30, not 3:00
    },
    {
      id: 'sleeping-cat', name: 'Sleeping cat', x: 498, y: 404, r: 34,
      apply(ctx) {
        ctx.fillStyle = WALL;
        ctx.fillRect(456, 372, 88, 48); // bare wall above the counter, cat gone
      },
    },
    {
      id: 'middle-cake', name: 'Middle cake', x: 180, y: 390, r: 22,
      apply(ctx) {
        // repaint wall, then the glass tint over it, so no trace of the cake
        ctx.fillStyle = WALL;
        ctx.fillRect(152, 372, 56, 44);
        ctx.fillStyle = 'rgba(190,220,240,0.35)';
        ctx.fillRect(152, 372, 56, 44);
        ctx.fillStyle = '#d8c9a8';
        ctx.fillRect(152, 404, 56, 10); // empty tray slot
      },
    },
    {
      id: 'berry-jar', name: 'Berry jar', x: 118, y: 172, r: 20,
      apply(ctx) {
        ctx.fillStyle = WALL;
        ctx.fillRect(96, 148, 44, 52); // empty shelf spot
        ctx.fillStyle = '#8a5a34';
        ctx.fillRect(96, 200, 44, 12);
      },
    },
    {
      id: 'lamp-off', name: 'Right lamp off', x: 430, y: 112, r: 30,
      apply(ctx) {
        // the glow reaches the menu board, the mitt and the window: repaint
        // the whole patch, then redraw the neighbours, then the dark lamp.
        // NOTE: this redraws the menu board with price 5, so menu-price
        // must come after lamp-off in this list (it does).
        ctx.fillStyle = WALL;
        ctx.fillRect(366, 60, 130, 130);
        drawMenuBoard(ctx);
        drawWindow(ctx);
        drawMitt(ctx);
        drawLamp(ctx, 430, false); // dark lamp, no light
      },
    },
    {
      id: 'menu-price', name: 'Honey cake price', x: 352, y: 102, r: 14,
      apply(ctx) {
        ctx.fillStyle = BOARD;
        ctx.fillRect(342, 90, 22, 22);
        text(ctx, '6', 352, 102, '16px "Trebuchet MS", sans-serif', '#f5ead6');
      },
    },
    {
      id: 'rug-stripe', name: 'Rug stripe', x: 300, y: 544, r: 40,
      apply(ctx) {
        ctx.fillStyle = '#7a8ad8';
        ctx.fillRect(210, 540, 180, 8); // blue stripe, not cream
      },
    },
    {
      id: 'oven-mitt', name: 'Oven mitt', x: 421, y: 134, r: 22,
      apply(ctx) {
        // The mitt hangs half behind the right lamp: erase only the part
        // below the shade, then repaint the dark lamp over the patch.
        ctx.fillStyle = WALL;
        ctx.fillRect(404, 112, 34, 48); // bare wall, mitt gone
        drawLamp(ctx, 430, false);
      },
    },
    {
      id: 'window-moon', name: 'Moon in the window', x: 540, y: 80, r: 20,
      apply(ctx) {
        ctx.fillStyle = '#1a1440';
        circle(ctx, 540, 80, 17); ctx.fill();
        star(ctx, 540, 80, 14, 6, 4); // a star, not the moon
        ctx.fillStyle = '#fff6c9'; ctx.fill();
      },
    },
    {
      id: 'herb-pot', name: 'Herb pot', x: 560, y: 428, r: 20,
      apply(ctx) {
        // leaves end above the counter, the pot straddles its edge: repaint
        // each band with the colour that is really there
        ctx.fillStyle = WALL;
        ctx.fillRect(542, 398, 36, 22); // wall where the leaves were
        ctx.fillStyle = COUNTER_TOP;
        ctx.fillRect(542, 420, 36, 16); // counter top where the pot sat
        ctx.fillStyle = '#6e4526';
        ctx.fillRect(542, 436, 36, 8); // counter front under the pot's base
      },
    },
    {
      id: 'rolling-pin', name: 'Rolling pin', x: 360, y: 448, r: 22,
      apply(ctx) {
        // the pin lies on the counter's front face, below the top surface
        ctx.fillStyle = '#6e4526';
        ctx.fillRect(310, 438, 100, 20); // bare counter front
      },
    },
    {
      id: 'blue-cup', name: 'Blue cup', x: 437, y: 439, r: 18,
      apply(ctx) {
        // the cup straddles the counter's edge: wall, top, then front, and
        // the divider the handle crossed gets repainted too
        ctx.fillStyle = WALL;
        ctx.fillRect(420, 404, 40, 16); // wall where the steam was
        ctx.fillStyle = COUNTER_TOP;
        ctx.fillRect(420, 420, 40, 16); // counter top where the cup sat
        ctx.fillStyle = '#6e4526';
        ctx.fillRect(420, 436, 40, 16); // counter front under the cup's base
        ctx.fillStyle = '#5d3a20';
        ctx.fillRect(450, 436, 4, 16); // divider
      },
    },
  ],
};
