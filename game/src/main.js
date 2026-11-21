// Lantern Lane — Spot the Difference: entry point. Wires the three scenes,
// the state, the renderer and the input together and runs the frame loop.
// Open game/index.html from any static server; ?shot=cover (and friends)
// freeze the game in a fixed state for screenshots — see src/shots.js.
import { lanternLane } from './scenes/lantern.js';
import { koiPond } from './scenes/pond.js';
import { starlightBakery } from './scenes/bakery.js';
import { newGame, advanceTimer } from './state.js';
import { renderFrame, updateHud } from './render.js';
import { attachInput } from './input.js';
import { applyShotPreset } from './shots.js';

const SCENES = [lanternLane, koiPond, starlightBakery];

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const hud = {
  sceneNum: document.getElementById('sceneNum'),
  sceneName: document.getElementById('sceneName'),
  foundCount: document.getElementById('foundCount'),
  totalCount: document.getElementById('totalCount'),
  remainCount: document.getElementById('remainCount'),
  timerPill: document.getElementById('timerPill'),
  timerText: document.getElementById('timerText'),
  scoreText: document.getElementById('scoreText'),
  hintBtn: document.getElementById('hintBtn'),
  hintCount: document.getElementById('hintCount'),
  restartBtn: document.getElementById('restartBtn'),
  message: document.getElementById('message'),
  status: document.getElementById('status'),
};

const state = newGame(SCENES);
const isShot = applyShotPreset(state, window.location.search);
attachInput(canvas, state, hud);

let lastTick = performance.now();
let shotReady = false;

function frame(now) {
  // A frozen shot keeps the clock the preset set, so its pulses and fades
  // never move between screenshots.
  if (!state.frozen) state.now = now;
  if (!state.frozen) {
    const dt = Math.min(0.1, (now - lastTick) / 1000);
    advanceTimer(state, dt);
  }
  lastTick = now;
  renderFrame(ctx, state);
  updateHud(state, hud);
  if (isShot && !shotReady) {
    shotReady = true;
    window.__shotReady = true;
  }
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
