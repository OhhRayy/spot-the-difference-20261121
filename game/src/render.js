// Rendering: draws both pictures, the found markers, the hint ring, the
// fading wrong-click marks and the end-of-scene overlays, and keeps the DOM
// header (counter, timer, score) in step with the state.
import { currentScene, remainingCount } from './state.js';
import { framePanel, roundRect, circle, text } from './scenes/common.js';

export const PANEL = { leftX: 20, rightX: 660, y: 20, w: 600, h: 600 };

function drawPanel(ctx, state, scene, panelX, isRight) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(panelX, PANEL.y, PANEL.w, PANEL.h);
  ctx.clip();
  ctx.translate(panelX, PANEL.y);
  scene.draw(ctx);
  if (isRight) {
    for (const diff of scene.differences) diff.apply(ctx);
  }
  ctx.restore();
}

function drawFoundMarkers(ctx, state, scene, panelX) {
  for (const id of state.foundOrder) {
    const diff = scene.differences.find((d) => d.id === id);
    if (!diff) continue;
    const pulse = id === state.foundOrder[state.foundOrder.length - 1] && !state.frozen
      ? 1 + 0.08 * Math.sin(state.now / 130)
      : 1;
    const r = (diff.r + 7) * pulse;
    ctx.save();
    ctx.translate(panelX, PANEL.y);
    ctx.strokeStyle = '#ff3b30';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(diff.x, diff.y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(diff.x, diff.y, r + 3, 0, Math.PI * 2);
    ctx.stroke();
    // small tick at the top of the ring
    ctx.strokeStyle = '#ff3b30';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(diff.x - 5, diff.y - r - 12);
    ctx.lineTo(diff.x, diff.y - r - 6);
    ctx.lineTo(diff.x + 8, diff.y - r - 16);
    ctx.stroke();
    ctx.restore();
  }
}

function drawHintRing(ctx, state, scene, panelX) {
  if (!state.hint) return;
  const diff = scene.differences.find((d) => d.id === state.hint.id);
  if (!diff) return;
  const phase = state.frozen ? 0.5 : (state.now % 700) / 700;
  const r = diff.r + 10 + Math.sin(phase * Math.PI * 2) * 4;
  ctx.save();
  ctx.translate(panelX, PANEL.y);
  ctx.strokeStyle = '#ffd94a';
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 8]);
  ctx.lineDashOffset = -phase * 36;
  ctx.beginPath();
  ctx.arc(diff.x, diff.y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

function drawWrongMarks(ctx, state) {
  for (const mark of state.wrongMarks) {
    const age = state.frozen ? 0.3 : 1 - (mark.expiresAt - state.now) / 900;
    const panelX = mark.panel === 'left' ? PANEL.leftX : PANEL.rightX;
    ctx.save();
    ctx.translate(panelX, PANEL.y);
    ctx.globalAlpha = Math.max(0, 1 - age);
    ctx.strokeStyle = '#ff3b30';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    const s = 10;
    ctx.beginPath();
    ctx.moveTo(mark.x - s, mark.y - s); ctx.lineTo(mark.x + s, mark.y + s);
    ctx.moveTo(mark.x + s, mark.y - s); ctx.lineTo(mark.x - s, mark.y + s);
    ctx.stroke();
    ctx.restore();
  }
}

function drawOverlay(ctx, title, lines, action) {
  ctx.save();
  ctx.fillStyle = 'rgba(20,12,40,0.72)';
  ctx.fillRect(0, 0, 1280, 660);
  ctx.fillStyle = '#241a3d';
  roundRect(ctx, 390, 190, 500, 280, 18);
  ctx.fill();
  ctx.strokeStyle = '#ffd97a';
  ctx.lineWidth = 3;
  roundRect(ctx, 390, 190, 500, 280, 18);
  ctx.stroke();
  text(ctx, title, 640, 240, 'bold 34px "Trebuchet MS", sans-serif', '#ffd97a');
  let y = 292;
  for (const line of lines) {
    text(ctx, line, 640, y, '19px "Trebuchet MS", sans-serif', '#f5ead6');
    y += 34;
  }
  text(ctx, action, 640, 430, 'bold 19px "Trebuchet MS", sans-serif', '#ff9d5c');
  ctx.restore();
}

export function renderFrame(ctx, state) {
  const scene = currentScene(state);
  ctx.fillStyle = '#14101f';
  ctx.fillRect(0, 0, 1280, 660);
  framePanel(ctx, PANEL.leftX, PANEL.y, PANEL.w, PANEL.h, 'Picture A — original');
  framePanel(ctx, PANEL.rightX, PANEL.y, PANEL.w, PANEL.h, 'Picture B — changed');
  drawPanel(ctx, state, scene, PANEL.leftX, false);
  drawPanel(ctx, state, scene, PANEL.rightX, true);
  drawFoundMarkers(ctx, state, scene, PANEL.leftX);
  drawFoundMarkers(ctx, state, scene, PANEL.rightX);
  drawHintRing(ctx, state, scene, PANEL.leftX);
  drawHintRing(ctx, state, scene, PANEL.rightX);
  drawWrongMarks(ctx, state);

  if (state.status === 'sceneDone') {
    drawOverlay(ctx, 'Scene Complete!', [
      `You found all ${scene.differences.length} differences in ${scene.name}.`,
      `Score: ${state.score} — on to a harder scene!`,
    ], 'Press N or click for the next scene');
  } else if (state.status === 'gameDone') {
    drawOverlay(ctx, 'You found them all!', [
      'Every difference in all three scenes — Lantern Lane,',
      'Koi Pond Garden and Starlight Bakery — is circled.',
      `Final score: ${state.score}`,
    ], 'Press N or click to play again');
  } else if (state.status === 'timeUp') {
    drawOverlay(ctx, "Time's Up!", [
      `The lanterns burned out with ${remainingCount(state)} differences left`,
      `in ${scene.name}. Your score: ${state.score}.`,
    ], 'Press R or click to try this scene again');
  }
}

function formatTime(seconds) {
  const s = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function updateHud(state, els) {
  const scene = currentScene(state);
  els.sceneNum.textContent = String(state.sceneIndex + 1);
  els.sceneName.textContent = scene.name;
  els.foundCount.textContent = String(state.found.size);
  els.totalCount.textContent = String(scene.differences.length);
  els.remainCount.textContent = String(remainingCount(state));
  els.timerText.textContent = formatTime(state.timeLeft);
  els.timerPill.classList.toggle('warn', state.timeLeft <= 30 && state.status === 'playing');
  els.scoreText.textContent = String(state.score);
  els.hintCount.textContent = String(state.hintsLeft);
  els.hintBtn.disabled = state.hintsLeft <= 0 || state.status !== 'playing';
  els.message.textContent = state.message;
  els.status.textContent = state.status === 'playing'
    ? `${scene.name}: ${state.found.size} of ${scene.differences.length} found, ${remainingCount(state)} remain.`
    : state.message;
}
