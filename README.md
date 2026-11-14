# آخر إشارة | Last Signal — v2.3
Team Suhd · NASA Space Apps Challenge 2026

## Files
- `index.html` — page layout and styles
- `app.js` — the experience flow (opening, chapters 1–3, finale, evidence board, mission guide)
- `content.js` — all Arabic/English text, NASA sources, and the guide's knowledge base
- `audio.js` — cinematic sound design (Web Audio, no audio files)
- `scene.js` — the 3D scene (three.js): Mars terrain, dust, lighting, camera shots, hotspots
- `assets/rover.js` — NASA/JPL-Caltech MER 3D model (GLB with JPEG textures, base64)
- `assets/rover_opt.glb` — the same model as a normal GLB file (for Vercel or other hosting)
- `assets/PIA*.jpg` — NASA images

## Run locally
The page needs a local web server (opening index.html directly won't load the model):

    cd site
    python3 -m http.server 8000

Then open http://localhost:8000

## Notes
- `PIA05587.jpg` (spectrum graph) is still missing; put it in `assets/`.
- The mission guide's AI works only inside the Claude artifact. On other hosting it shows ready hints instead.
- On Vercel you can load `assets/rover_opt.glb` directly with `loader.load(...)` instead of `rover.js`.

## v2
- Cinematic opening with captions, letterbox, film grain and synthesized sound (mute button in the top bar).
- Restart button (↺) in the top bar.
- Chapter 2 is now an investigation: 4 suspects, 3 real clues, eliminate, verdict.
- Downloadable legacy card (PNG).
- Admin text editor: open the sources (i) menu as the artifact owner → "Edit texts". Edits are saved in the artifact's database and shown to all visitors (only inside Claude).
- v2.1: finale is now "Complete the signal" (evidence cards complete the 3 sentences and fill the black part of PIA22929), name is required, new marketing keepsake card. The share link printed on the card can be set in the admin editor (fin.link).
- v2.2: dust settles visibly on the real 3D panels; evidence popup stays 5 s with OK; back button between stages; tidy toolbar; live animated keepsake card with "incoming transmission" reveal; public impact dashboard (bar-chart icon, or add #impact to the link) fed by anonymous session data; admin can clear impact data; NASA mission page facts (Opportunity only); PIA05587 graph added.
- v2.3: finale is a linked discovery chain (tool → evidence → result, 4 possible stories, score x/2); opening fills the whole screen (no black bars).
