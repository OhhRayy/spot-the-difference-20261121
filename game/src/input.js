// Input: mouse clicks on the two pictures (hit-tested in scene coordinates)
// and the keyboard shortcuts. A click on an end-of-scene overlay advances
// the game instead of hunting, so the game is fully playable by mouse alone.
import { PANEL } from './render.js';
import {
  clickAt, wrongMark, useHint, nextScene, restartScene, startScene,
} from './state.js';
import { unlockAudio, playFound, playWrong, playHint, playWin } from './audio.js';

function panelHit(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
  if (y < PANEL.y || y > PANEL.y + PANEL.h) return null;
  if (x >= PANEL.leftX && x <= PANEL.leftX + PANEL.w) {
    return { panel: 'left', x: x - PANEL.leftX, y: y - PANEL.y };
  }
  if (x >= PANEL.rightX && x <= PANEL.rightX + PANEL.w) {
    return { panel: 'right', x: x - PANEL.rightX, y: y - PANEL.y };
  }
  return null;
}

export function attachInput(canvas, state, hud) {
  canvas.addEventListener('pointerdown', (event) => {
    unlockAudio();
    if (state.status === 'sceneDone' || state.status === 'gameDone') {
      playWin();
      nextScene(state);
      return;
    }
    if (state.status === 'timeUp') {
      restartScene(state);
      return;
    }
    const hit = panelHit(canvas, event);
    if (!hit) return;
    const result = clickAt(state, hit.x, hit.y);
    if (result === 'found') {
      playFound();
      if (state.status === 'sceneDone' || state.status === 'gameDone') playWin();
    } else if (result === 'miss') {
      playWrong();
      wrongMark(state, hit.panel, hit.x, hit.y);
    }
  });

  function hint() {
    unlockAudio();
    if (useHint(state)) playHint();
  }

  hud.hintBtn.addEventListener('click', hint);
  hud.restartBtn.addEventListener('click', () => {
    unlockAudio();
    restartScene(state);
  });

  window.addEventListener('keydown', (event) => {
    if (event.repeat) return;
    const key = event.key.toLowerCase();
    if (key === 'h') hint();
    else if (key === 'r') restartScene(state);
    else if (key === 'n' || key === 'enter') {
      if (state.status === 'sceneDone' || state.status === 'gameDone') nextScene(state);
    } else if (key === '1' || key === '2' || key === '3') {
      const index = Number(key) - 1;
      if (index < state.scenes.length) startScene(state, index);
    }
  });
}
