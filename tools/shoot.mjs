// Take the staged screenshots of Lantern Lane with headless Chromium:
// serve game/ on :8093, open each ?shot= scene from shots.json, wait for
// window.__shotReady, save a JPEG. Run from the repo root:
//   node serve.ts --port 8093 & node tools/shoot.mjs
import { chromium } from '/home/hatch/workspace/makefun/shot-tools/node_modules/playwright/index.mjs';
import { readFileSync } from 'node:fs';

const REPO = '/home/hatch/workspace/makefun/entry-spot-the-difference-20261121';
const shots = JSON.parse(readFileSync(`${REPO}/shots.json`, 'utf8'));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE-ERR', m.text()); });
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
for (const shot of shots) {
  await page.goto(`http://localhost:8093/${shot.query}`, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__shotReady === true, null, { timeout: 60000 });
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${REPO}/screenshots/${shot.name}`, type: 'jpeg', quality: 82 });
  console.log('shot', shot.name);
}
await browser.close();
console.log('done');
