// Game state for Lantern Lane: which scene is up, what is found, the clock,
// the score and the hints. Pure transitions — no DOM, no canvas here, so the
// rules are easy to test and the renderer only reads this object.

export function newGame(scenes) {
  const state = {
    scenes,
    sceneIndex: 0,
    found: new Set(),
    foundOrder: [],
    score: 0,
    streak: 0,
    hintsLeft: 3,
    hint: null,            // { id, expiresAt } while a hint ring is showing
    timeLeft: scenes[0].timeLimit,
    status: 'playing',     // playing | sceneDone | gameDone | timeUp
    wrongMarks: [],        // { panel, x, y, expiresAt } fading red X marks
    lastFoundAt: 0,
    frozen: false,         // screenshots freeze the clock and animations
    now: 0,                // ms clock driven by the render loop
    message: 'Find all the differences before the lanterns burn out!',
  };
  return state;
}

export function currentScene(state) {
  return state.scenes[state.sceneIndex];
}

export function remainingCount(state) {
  return currentScene(state).differences.length - state.found.size;
}

export function startScene(state, index) {
  state.sceneIndex = index;
  state.found = new Set();
  state.foundOrder = [];
  state.hintsLeft = 3;
  state.hint = null;
  state.wrongMarks = [];
  state.timeLeft = currentScene(state).timeLimit;
  state.status = 'playing';
  state.streak = 0;
  state.message = `Scene ${index + 1}: ${currentScene(state).name} — find ${currentScene(state).differences.length} differences!`;
}

// A click inside a panel, in scene coordinates. Returns 'found' | 'miss' |
// 'already' | 'ignored' so the caller can play the right sound.
export function clickAt(state, x, y) {
  if (state.status !== 'playing') return 'ignored';
  const scene = currentScene(state);
  for (const diff of scene.differences) {
    if (state.found.has(diff.id)) continue;
    if (Math.hypot(x - diff.x, y - diff.y) <= diff.r + 6) {
      state.found.add(diff.id);
      state.foundOrder.push(diff.id);
      state.streak += 1;
      state.score += 100 + (state.streak - 1) * 10;
      state.lastFoundAt = state.now;
      const left = remainingCount(state);
      if (left === 0) {
        const bonus = Math.round(state.timeLeft) * 2;
        state.score += bonus;
        state.status = state.sceneIndex === state.scenes.length - 1 ? 'gameDone' : 'sceneDone';
        state.message = `All found! Time bonus +${bonus}.`;
      } else {
        state.message = `Found: ${diff.name} — ${left} to go!`;
      }
      return 'found';
    }
  }
  // A click on an already-found difference is not a miss.
  for (const diff of scene.differences) {
    if (state.found.has(diff.id) && Math.hypot(x - diff.x, y - diff.y) <= diff.r + 6) {
      return 'already';
    }
  }
  state.streak = 0;
  state.score = Math.max(0, state.score - 15);
  state.timeLeft = Math.max(0, state.timeLeft - 3);
  state.message = 'Not a difference — 3 seconds lost!';
  return 'miss';
}

export function wrongMark(state, panel, x, y) {
  state.wrongMarks.push({ panel, x, y, expiresAt: state.now + 900 });
  state.wrongMarks = state.wrongMarks.filter((m) => m.expiresAt > state.now);
}

export function useHint(state) {
  if (state.status !== 'playing' || state.hintsLeft <= 0 || state.hint) return null;
  const unfound = currentScene(state).differences.filter((d) => !state.found.has(d.id));
  if (unfound.length === 0) return null;
  const pick = unfound[Math.floor(unfound.length / 2)];
  state.hintsLeft -= 1;
  state.hint = { id: pick.id, expiresAt: state.now + 2500 };
  state.message = 'Hint: follow the golden ring!';
  return pick;
}

export function advanceTimer(state, dtSeconds) {
  if (state.frozen || state.status !== 'playing') return;
  state.timeLeft -= dtSeconds;
  if (state.timeLeft <= 0) {
    state.timeLeft = 0;
    state.status = 'timeUp';
    state.message = "Time's up! The differences slipped away.";
  }
  if (state.hint && state.now >= state.hint.expiresAt) state.hint = null;
  state.wrongMarks = state.wrongMarks.filter((m) => m.expiresAt > state.now);
}

export function nextScene(state) {
  if (state.status === 'sceneDone') startScene(state, state.sceneIndex + 1);
  else if (state.status === 'gameDone') startScene(state, 0);
}

export function restartScene(state) {
  startScene(state, state.sceneIndex);
}
