// Deterministic screenshot presets, driven by the ?shot= query parameter.
// Each preset puts the game in one exact state — same found differences, same
// clock, no running timer — so a screenshot taken twice looks identical.
//   ?shot=cover   Scene 1, 3 found, 7 left, 2:34 on the clock
//   ?shot=hint    Scene 2, 5 found, hint ring showing, 1:58 left
//   ?shot=almost  Scene 3, 9 of 12 found, 0:47 left
//   ?shot=win     Scene 1, all found, scene-complete overlay
//   ?shot=start   Scene 1, nothing found yet, full time
//   ?scene=2      jump to a scene (1-based) before applying a preset
import { startScene, newGame } from './state.js';

const PRESETS = {
  cover: { scene: 0, found: ['moon-crater', 'window-cat', 'wire-bird'], timeLeft: 154 },
  hint: { scene: 1, found: ['koi-count', 'pond-frog', 'blossom-white', 'cloud-missing', 'stepping-stone'], timeLeft: 118, hint: 'fence-slat' },
  almost: { scene: 2, found: ['clock-hands', 'middle-cake', 'berry-jar', 'menu-price', 'rug-stripe', 'oven-mitt', 'window-moon', 'herb-pot', 'rolling-pin'], timeLeft: 47 },
  win: { scene: 0, found: 'all', timeLeft: 132 },
  start: { scene: 0, found: [], timeLeft: null },
};

export function applyShotPreset(state, search) {
  const params = new URLSearchParams(search);
  const sceneParam = Number(params.get('scene'));
  if (sceneParam >= 1 && sceneParam <= state.scenes.length) {
    startScene(state, sceneParam - 1);
  }
  const name = params.get('shot');
  const preset = PRESETS[name];
  if (!preset) return false;
  startScene(state, preset.scene);
  const scene = state.scenes[preset.scene];
  const ids = preset.found === 'all' ? scene.differences.map((d) => d.id) : preset.found;
  for (const id of ids) {
    state.found.add(id);
    state.foundOrder.push(id);
  }
  state.score = ids.length * 100;
  if (preset.timeLeft !== null) state.timeLeft = preset.timeLeft;
  if (preset.hint) {
    const diff = scene.differences.find((d) => d.id === preset.hint);
    if (diff) {
      state.hint = { id: diff.id, expiresAt: Infinity };
      state.hintsLeft = 2;
      state.message = 'Hint: follow the golden ring!';
    }
  }
  if (preset.found === 'all') {
    state.score += Math.round(state.timeLeft) * 2;
    state.status = state.sceneIndex === state.scenes.length - 1 ? 'gameDone' : 'sceneDone';
    state.message = 'All found! Time bonus added.';
  }
  state.frozen = true;
  state.now = 1000; // fixed clock, so pulses and fades never move
  return true;
}

export { newGame };
