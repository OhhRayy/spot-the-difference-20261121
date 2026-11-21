# Lantern Lane — Spot the Difference

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/OhhRayy/spot-the-difference-20261121/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/OhhRayy/spot-the-difference-20261121/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

An entry for the make.fun bounty [Make the best spot the difference game](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451).

A complete, original spot-the-difference game that runs offline in a desktop
browser from static files. Two near-identical pictures stand side by side;
click a difference in either picture and it gets circled in both. Three
hand-drawn scenes, each harder than the last:

1. **Lantern Lane** — a quiet night street with paper lanterns, a tea house,
   a bicycle and a cat in the window. 10 differences, 3:00 on the clock.
2. **Koi Pond Garden** — a sunny garden with a cherry tree, a pond full of
   koi, a stone bridge and a bamboo fence. 10 differences, 2:30.
3. **Starlight Bakery** — a cosy bakery at night, cakes in the case, a
   sleeping cat on the counter and a chalkboard menu. 12 differences, 2:00.

Every picture is drawn in code on canvas — no image files, no copied art.
Sounds are synthesised with WebAudio; nothing is downloaded at run time.

## How to play

- **Click** a difference in either picture — a red ring marks it in both.
- A wrong click costs 3 seconds and 15 points.
- **H** spends a hint (3 per scene): a golden ring pulses around a difference
  you have not found yet.
- Find them all before the clock runs out for a time bonus. **N** moves to
  the next scene, **R** restarts the scene, **1–3** jump between scenes.
- Streaks pay: each find in a row without a miss is worth 10 points more
  than the last.

## Play it

```sh
node serve.ts
# open http://localhost:8080
```

## Screenshots

The four screenshots in `screenshots/` are real renders of this game's own
code, taken in headless Chromium (see `tools/shoot.mjs`):

- `1-cover.jpg` — Lantern Lane mid-hunt: 3 found, 7 remain, 2:34 left
- `2-hint.jpg` — Koi Pond Garden with a hint ring showing
- `3-almost.jpg` — Starlight Bakery: 9 of 12 found, 0:47 left
- `4-win.jpg` — Lantern Lane cleared, scene-complete overlay

## Layout

- `main.ts` — the hand-in program: copies `game/` and `screenshots/` to
  `/output` (or `$MAKEFUN_OUTPUT_DIR`) and writes `dossier.json`
- `game/index.html` — the page: header, canvas board, footer
- `game/src/main.js` — wiring and the frame loop
- `game/src/state.js` — the rules: scenes, finds, timer, score, hints
- `game/src/render.js` — both panels, markers, hint ring, overlays, HUD
- `game/src/input.js` — mouse clicks and keyboard shortcuts
- `game/src/audio.js` — synthesised sounds (found / wrong / hint / win)
- `game/src/shots.js` — deterministic `?shot=` presets for screenshots
- `game/src/scenes/common.js` — seeded random generator and shape helpers
- `game/src/scenes/lantern.js` — Scene 1: Lantern Lane
- `game/src/scenes/pond.js` — Scene 2: Koi Pond Garden
- `game/src/scenes/bakery.js` — Scene 3: Starlight Bakery
- `vendor/makefun-game.ts` — the kit's dossier library, unchanged
- `shots.json` — the four screenshot scenes
- `tools/shoot.mjs` — takes the screenshots with headless Chromium
- `serve.ts` — tiny static server for local play-testing

## License

MIT — see `LICENSE`.
