// Last Signal — 3D scene (three.js). Exposes window.SCENE for app.js.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('gl');
const isMobile = () => innerWidth <= 860;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile() ? 1.75 : 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(36, innerWidth / innerHeight, 0.03, 400);
camera.position.set(3.2, 1.6, 3.6);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; controls.dampingFactor = 0.07;
controls.enablePan = false; controls.minDistance = 0.8; controls.maxDistance = 9;
controls.maxPolarAngle = Math.PI * 0.49; controls.rotateSpeed = 0.6; controls.zoomSpeed = 0.7;
controls.target.set(0, 0.6, 0);

/* ---------- sky dome (gradient shader) ---------- */
const skyU = { top: { value: new THREE.Color('#d9a882') }, hor: { value: new THREE.Color('#e6b991') }, bot: { value: new THREE.Color('#7a4a2e') }, dark: { value: 0 } };
const sky = new THREE.Mesh(new THREE.SphereGeometry(180, 32, 16), new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, uniforms: skyU,
  vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }',
  fragmentShader: `uniform vec3 top,hor,bot; uniform float dark; varying vec3 vP;
    void main(){ float h=vP.y; vec3 c = h>0. ? mix(hor,top,smoothstep(0.,.55,h)) : mix(hor,bot,smoothstep(0.,.25,-h));
      vec3 storm = vec3(.22,.13,.08)*(1.+h*.3); c = mix(c, storm, dark); gl_FragColor = vec4(c,1.); }`
}));
scene.add(sky);

/* environment map for reflections (Mars-tinted) */
const pmrem = new THREE.PMREMGenerator(renderer);
function buildEnv() {
  const s = new THREE.Scene(); s.add(sky.clone());
  const g = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshBasicMaterial({ color: '#8a5434' })); g.rotation.x = -Math.PI / 2; g.position.y = -1; s.add(g);
  const sunBall = new THREE.Mesh(new THREE.SphereGeometry(8, 16, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(6, 5.4, 4.6) })); sunBall.position.set(60, 80, 40); s.add(sunBall);
  return pmrem.fromScene(s, 0.02).texture;
}
scene.environment = buildEnv();
scene.environmentIntensity = 0.9;

scene.fog = new THREE.Fog(new THREE.Color('#d8a57e'), 18, 90);

/* ---------- lights ---------- */
const hemi = new THREE.HemisphereLight('#ffe0c2', '#5b2f18', 0.55); scene.add(hemi);
const sun = new THREE.DirectionalLight('#fff0dc', 3.0);
sun.position.set(5, 8, 4.5); sun.castShadow = true;
sun.shadow.mapSize.set(isMobile() ? 1024 : 2048, isMobile() ? 1024 : 2048);
Object.assign(sun.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 0.5, far: 30 });
sun.shadow.bias = -0.0003; sun.shadow.normalBias = 0.02; sun.shadow.radius = 4;
scene.add(sun);
// visible sun disk in the sky (fades as the storm blots it out)
function sunTex() { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'); const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, 'rgba(255,250,235,1)'); gr.addColorStop(.12, 'rgba(255,240,215,.95)'); gr.addColorStop(.22, 'rgba(255,215,170,.35)'); gr.addColorStop(.55, 'rgba(240,170,120,.08)'); gr.addColorStop(1, 'rgba(240,170,120,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 256, 256); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
const sunSpr = new THREE.Sprite(new THREE.SpriteMaterial({ map: sunTex(), transparent: true, depthWrite: false, fog: false, blending: THREE.AdditiveBlending }));
sunSpr.position.copy(new THREE.Vector3(5, 8, 4.5).normalize().multiplyScalar(150)); sunSpr.scale.setScalar(26); scene.add(sunSpr);
const rim = new THREE.DirectionalLight('#9fd8ff', 0.0); rim.position.set(-4, 3, -5); scene.add(rim);

/* ---------- ground ---------- */
function groundTex() {
  const S = 1024, c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d');
  g.fillStyle = '#a65a31'; g.fillRect(0, 0, S, S);
  let sd = 11; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 380; i++) { const x = r() * S, y = r() * S, rad = r() * 60 + 12; const gr = g.createRadialGradient(x, y, 0, x, y, rad);
    gr.addColorStop(0, r() < .5 ? 'rgba(84,36,14,.22)' : 'rgba(214,140,92,.2)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(x - rad, y - rad, rad * 2, rad * 2); }
  for (let i = 0; i < 26000; i++) { const x = r() * S, y = r() * S, s = r() * 2.2 + .3; g.fillStyle = r() < .55 ? `rgba(60,24,8,${.12 + r() * .2})` : `rgba(240,170,120,${.08 + r() * .16})`; g.fillRect(x, y, s, s); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(26, 26); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy(); return t;
}
function bumpTex() {
  const S = 512, c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d');
  g.fillStyle = '#808080'; g.fillRect(0, 0, S, S); let sd = 5; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 9000; i++) { const v = Math.floor(90 + r() * 90); g.fillStyle = `rgb(${v},${v},${v})`; g.beginPath(); g.arc(r() * S, r() * S, r() * 2.5 + .4, 0, 7); g.fill(); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(26, 26); return t;
}
// terrain height in plane-local coords (x, y); world z = -y
const hLocal = (x, y) => { const d = Math.hypot(x, y), k = THREE.MathUtils.smoothstep(d, 4, 18);
  return k * (Math.sin(x * .13) * Math.cos(y * .11) * .9 + Math.sin(x * .045 + y * .03) * 2.4 + Math.cos(y * .07) * 1.1) + Math.sin(x * 2.1) * Math.cos(y * 1.7) * .012; };
const heightAt = (wx, wz) => hLocal(wx, -wz);
const gGeo = new THREE.PlaneGeometry(240, 240, 200, 200);
{ const p = gGeo.attributes.position; for (let i = 0; i < p.count; i++) p.setZ(i, hLocal(p.getX(i), p.getY(i))); gGeo.computeVertexNormals(); }
const ground = new THREE.Mesh(gGeo, new THREE.MeshStandardMaterial({ map: groundTex(), bumpMap: bumpTex(), bumpScale: 1.2, roughness: .97, metalness: 0 }));
ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

/* rocks */
{ const geo = new THREE.IcosahedronGeometry(1, 1); { const p = geo.attributes.position; for (let i = 0; i < p.count; i++) { const v = new THREE.Vector3().fromBufferAttribute(p, i); v.multiplyScalar(.8 + Math.sin(v.x * 5 + v.y * 3) * .12 + Math.cos(v.z * 4) * .1); p.setXYZ(i, v.x, v.y, v.z); } geo.computeVertexNormals(); }
  const mat = new THREE.MeshStandardMaterial({ color: '#7a4026', roughness: .95, flatShading: true });
  const N = 520, inst = new THREE.InstancedMesh(geo, mat, N), m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), pp = new THREE.Vector3();
  let sd = 3; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < N; i++) { let x, z; do { x = (r() - .5) * 50; z = (r() - .5) * 50; } while (Math.hypot(x, z) < 2.4);
    const sc = .025 + Math.pow(r(), 3.2) * .38; pp.set(x, heightAt(x, z) + sc * .2, z); q.setFromEuler(new THREE.Euler(r() * 3, r() * 3, r() * 3)); s.set(sc * (.8 + r() * .7), sc * (.45 + r() * .4), sc * (.8 + r() * .7)); m.compose(pp, q, s); inst.setMatrixAt(i, m); }
  inst.castShadow = true; inst.receiveShadow = true; scene.add(inst); }

/* wheel tracks behind the rover */
{ const tm = new THREE.MeshStandardMaterial({ color: '#7b3f22', roughness: 1, transparent: true, opacity: .55, depthWrite: false });
  [-.5, .5].forEach(x => { const t = new THREE.Mesh(new THREE.PlaneGeometry(.18, 3.2), tm); t.rotation.x = -Math.PI / 2; t.position.set(x * 1.16, .006, -2.4); t.receiveShadow = true; scene.add(t); }); }

/* ---------- dust particles ---------- */
function dotTex() { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,220,190,1)'); gr.addColorStop(1, 'rgba(255,220,190,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); }
const DN = isMobile() ? 1400 : 2600;
const dGeo = new THREE.BufferGeometry(); const dPos = new Float32Array(DN * 3), dSeed = new Float32Array(DN);
for (let i = 0; i < DN; i++) { dPos[i * 3] = (Math.random() - .5) * 30; dPos[i * 3 + 1] = Math.random() * 5; dPos[i * 3 + 2] = (Math.random() - .5) * 30; dSeed[i] = Math.random(); }
dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
const dMat = new THREE.PointsMaterial({ map: dotTex(), color: '#e2b58f', size: .06, sizeAttenuation: true, transparent: true, opacity: .15, depthWrite: false });
const dust = new THREE.Points(dGeo, dMat); scene.add(dust);

/* ---------- dust layer for the solar panels ---------- */
function dustAlphaTex() {
  const S = 512, c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d');
  g.fillStyle = '#5a5a5a'; g.fillRect(0, 0, S, S); let sd = 21; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 260; i++) { const x = r() * S, y = r() * S, rad = 14 + r() * 60; const gr = g.createRadialGradient(x, y, 0, x, y, rad); const v = Math.floor(150 + r() * 105); gr.addColorStop(0, `rgba(${v},${v},${v},.9)`); gr.addColorStop(1, 'rgba(128,128,128,0)'); g.fillStyle = gr; g.fillRect(x - rad, y - rad, rad * 2, rad * 2); }
  for (let i = 0; i < 16000; i++) { const v = Math.floor(170 + r() * 85); g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(r() * S, r() * S, 1.5, 1.5); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
const dustMat = new THREE.MeshStandardMaterial({ color: '#c08a5c', roughness: 1, metalness: 0, transparent: true, opacity: 0, alphaMap: dustAlphaTex(), depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -6 });
/* falling dust that lands on the deck */
const FN = isMobile() ? 700 : 1400;
const fGeo = new THREE.BufferGeometry(); const fPos = new Float32Array(FN * 3), fLand = new Float32Array(FN), fVx = new Float32Array(FN), fOn = new Uint8Array(FN);
for (let i = 0; i < FN; i++) { fPos[i * 3] = (Math.random() - .5) * 2.2; fPos[i * 3 + 1] = -50; fPos[i * 3 + 2] = -.85 + Math.random() * 1.45; fLand[i] = .735 + Math.random() * .02; }
fGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
const fall = new THREE.Points(fGeo, new THREE.PointsMaterial({ map: dotTex(), color: '#e0a878', size: .022, sizeAttenuation: true, transparent: true, opacity: .95, depthWrite: false }));
scene.add(fall);

/* ---------- rover ---------- */
const rover = new THREE.Group(); scene.add(rover);
const parts = { solar: [], pancam: [], arm: [] };
const PART_MATS = { solar: ['tex_panels_n', 'tex_panels2_n'], pancam: ['tex_mast', 'foil_silver'], arm: ['tex_arm'] };
const ANCH = { solar: new THREE.Vector3(-.82, .72, -.2), pancam: new THREE.Vector3(-.04, 1.56, .42), arm: new THREE.Vector3(.11, .42, .52) };
const anchors = {};
const panelMats = [];
const highlight = { key: null, t: 0 };
let loaded = false;

const loader = new GLTFLoader();
const onModel = gltf => {
  const m = gltf.scene;
  m.traverse(o => {
    if (!o.isMesh) return;
    o.castShadow = true; o.receiveShadow = true;
    const mat = o.material; const name = mat.name || '';
    mat.envMapIntensity = 1;
    if (name.startsWith('tex_panels')) { mat.metalness = .35; mat.roughness = .32; panelMats.push(mat); mat.userData.base = mat.color.clone(); const d = new THREE.Mesh(o.geometry, dustMat); d.renderOrder = 2; o.add(d); }
    else if (name === 'Silver' || name === 'foil_silver') { mat.metalness = 1; mat.roughness = .28; }
    else { mat.metalness = .18; mat.roughness = Math.max(.5, mat.roughness); }
    mat.emissive = new THREE.Color(0x000000);
    for (const k in PART_MATS) if (PART_MATS[k].includes(name)) parts[k].push(mat);
  });
  rover.add(m);
  for (const k in ANCH) { const a = new THREE.Object3D(); a.position.copy(ANCH[k]); rover.add(a); anchors[k] = a; }
  loaded = true; window.dispatchEvent(new CustomEvent('scene-ready'));
};
(async () => {
  try {
    const res = await fetch('assets/rover.js');
    const total = 3765000; let got = 0; const chunks = [];
    const rd = res.body.getReader();
    for (;;) { const { done, value } = await rd.read(); if (done) break; chunks.push(value); got += value.length; window.dispatchEvent(new CustomEvent('scene-progress', { detail: Math.min(.99, got / total) })); }
    const txt = new TextDecoder().decode(await new Blob(chunks).arrayBuffer());
    const b64 = txt.slice(txt.indexOf('"') + 1, txt.lastIndexOf('"'));
    const bin = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    loader.parse(bin.buffer, '', onModel, err => { console.error(err); window.dispatchEvent(new CustomEvent('scene-error')); });
  } catch (err) { console.error(err); window.dispatchEvent(new CustomEvent('scene-error')); }
})();

/* ---------- camera shots ---------- */
const SHOTS = {
  opening: { p: [2.3, .75, 2.9], t: [0, .62, 0] },
  op1: { p: [7.8, 1.25, 7.4], t: [0, .9, 0] },
  op2: { p: [-2.6, 2.1, 2.9], t: [-.3, .72, 0] },
  op3: { p: [1.7, .32, 2.1], t: [0, 1.05, .1] },
  op4: { p: [.55, 1.3, 1.6], t: [-.03, 1.25, .35] },
  overview: { p: [3.1, 1.55, 3.5], t: [0, .62, 0] },
  solar: { p: [-2.0, 2.7, 1.5], t: [-.55, .68, -.15] },
  solarClose: { p: [-1.25, 1.55, .95], t: [-.55, .72, -.15] },
  pancam: { p: [.75, 1.85, 1.75], t: [-.04, 1.48, .4] },
  arm: { p: [1.05, .7, 1.75], t: [.08, .42, .48] },
  lab: { p: [2.6, 1.1, 3.0], t: [0, .62, 0] },
  storm: { p: [-2.6, 1.0, 3.0], t: [0, .62, 0] },
  dawn: { p: [-3.0, 1.3, 2.8], t: [0, .7, 0] }
};
let fly = null;
function shot(name, dur = 1.8) {
  const s = SHOTS[name]; if (!s) return;
  fly = { fp: camera.position.clone(), ft: controls.target.clone(), p: new THREE.Vector3(...s.p), t: new THREE.Vector3(...s.t), k: 0, d: dur };
  controls.enabled = false;
}
const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

/* ---------- moods ---------- */
const st = { shake: 0, storm: 0, stormGoal: 0, dust: 0, dustGoal: 0, gust: 0, mood: 'calm', moodK: { lab: 0, dawn: 0 }, autoRot: 0 };
function setStorm(v) { st.stormGoal = v; }
function setPanelDust(v) { st.dustGoal = v; }
function gust() { st.gust = 1; }
function mood(m) { st.mood = m; }
function focusPart(k) { highlight.key = k; highlight.t = 0; }
function autoRotate(v) { st.autoRot = v; }
function shake(v) { st.shake = v; }

/* ---------- view offset (keep rover in the visible area beside the panel) ---------- */
let offX = 0, offY = 0, wantOffX = 0, wantOffY = 0;
function setFrame(panelOpen) {
  const W = innerWidth, H = innerHeight;
  if (!panelOpen) { wantOffX = 0; wantOffY = 0; return; }
  const rtl = document.documentElement.dir === 'rtl';
  if (isMobile()) { const ph = H * (document.body.classList.contains('tallp') ? .62 : .52); wantOffX = 0; wantOffY = ph / 2 - 20; }
  else { const pw = 420 + 36; wantOffX = (rtl ? 1 : -1) * pw / 2; wantOffY = 0; }
}

/* ---------- hotspot projection ---------- */
const hotsEl = document.getElementById('hots'); let hotKey = null, hotEl = null;
function showHotspot(k, label, onClick) {
  hideHotspot(); hotKey = k;
  hotEl = document.createElement('button'); hotEl.className = 'hot'; hotEl.setAttribute('aria-label', label);
  hotEl.innerHTML = '<span class="w"></span><span class="w"></span><span class="c"></span><span class="l"></span>';
  hotEl.querySelector('.l').textContent = label;
  hotEl.onclick = () => { const cb = onClick; hideHotspot(); cb && cb(); };
  hotsEl.appendChild(hotEl);
}
function hideHotspot() { if (hotEl) hotEl.remove(); hotEl = null; hotKey = null; }

/* ---------- resize ---------- */
function resize() { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); }
addEventListener('resize', () => { resize(); window.SCENE && window.SCENE._reframe && window.SCENE._reframe(); }); resize();

/* ---------- loop ---------- */
const clock = new THREE.Clock(); const v3 = new THREE.Vector3();
const C_SKY_TOP = new THREE.Color('#d9a882'), C_SKY_HOR = new THREE.Color('#e6b991'), C_FOG = new THREE.Color('#d8a57e'), C_STORM = new THREE.Color('#3b2416');
const C_LAB_TOP = new THREE.Color('#1a1f26'), C_LAB_HOR = new THREE.Color('#2a2622');
const C_DAWN_TOP = new THREE.Color('#e7b892'), C_DAWN_HOR = new THREE.Color('#f6cfa4');
const DUSTY = new THREE.Color(.78, .5, .33);
let elapsed = 0;
function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), .05); elapsed += dt;
  // camera tween
  if (fly) { fly.k = Math.min(1, fly.k + dt / fly.d); const e = ease(fly.k); camera.position.lerpVectors(fly.fp, fly.p, e); controls.target.lerpVectors(fly.ft, fly.t, e); if (fly.k >= 1) { fly = null; controls.enabled = true; } }
  else if (st.autoRot) { const a = st.autoRot * dt; const t = controls.target; const x = camera.position.x - t.x, z = camera.position.z - t.z; camera.position.x = t.x + x * Math.cos(a) - z * Math.sin(a); camera.position.z = t.z + x * Math.sin(a) + z * Math.cos(a); }
  controls.update();
  // view offset easing
  offX += (wantOffX - offX) * Math.min(1, dt * 3); offY += (wantOffY - offY) * Math.min(1, dt * 3);
  if (Math.abs(offX) > .5 || Math.abs(offY) > .5) camera.setViewOffset(innerWidth, innerHeight, offX, offY, innerWidth, innerHeight); else camera.clearViewOffset();
  // moods
  st.storm += (st.stormGoal - st.storm) * Math.min(1, dt * .9);
  st.dust += (st.dustGoal - st.dust) * Math.min(1, dt * 1.4);
  st.moodK.lab += ((st.mood === 'lab' ? 1 : 0) - st.moodK.lab) * Math.min(1, dt * 1.2);
  st.moodK.dawn += ((st.mood === 'dawn' ? 1 : 0) - st.moodK.dawn) * Math.min(1, dt * .8);
  const S = st.storm, L = st.moodK.lab, D = st.moodK.dawn;
  skyU.top.value.copy(C_SKY_TOP).lerp(C_LAB_TOP, L).lerp(C_DAWN_TOP, D); skyU.hor.value.copy(C_SKY_HOR).lerp(C_LAB_HOR, L).lerp(C_DAWN_HOR, D); skyU.dark.value = S * .92;
  scene.fog.color.copy(C_FOG).lerp(C_LAB_HOR, L).lerp(C_DAWN_HOR, D).lerp(C_STORM, S);
  scene.fog.near = 18 - S * 16 - L * 6; scene.fog.far = 90 - S * 78 - L * 40;
  sun.intensity = (3.0 * (1 - S * .94)) * (1 - L * .55) * (1 + D * .15);
  sun.color.setRGB(1, .94 - D * .08, .86 - D * .14);
  hemi.intensity = .55 * (1 - S * .55) * (1 - L * .5);
  rim.intensity = L * 1.6;
  scene.environmentIntensity = .9 * (1 - S * .7) * (1 - L * .4);
  renderer.toneMappingExposure = 1.0 - S * .15;
  // dust particles
  dMat.opacity = .14 + S * .75 + st.gust * .4; dMat.size = .05 + S * .09;
  const sp = .25 + S * 4.5 + st.gust * 6; const arr = dGeo.attributes.position.array;
  for (let i = 0; i < DN; i++) { const j = i * 3; arr[j] += sp * dt * (.6 + dSeed[i]); arr[j + 1] += Math.sin(elapsed * 1.3 + dSeed[i] * 30) * dt * .08; arr[j + 2] += sp * dt * .25;
    if (arr[j] > 15) arr[j] -= 30; if (arr[j + 2] > 15) arr[j + 2] -= 30; }
  dGeo.attributes.position.needsUpdate = true; st.gust = Math.max(0, st.gust - dt * .45);
  // panel dust: tint + visible dust layer on the real panels
  panelMats.forEach(m => m.color.copy(m.userData.base).lerp(DUSTY, st.dust * .55));
  dustMat.opacity = Math.min(.93, st.dust * 1.05);
  // falling dust: particles drop onto the deck while dust settles, blow away with wind
  { const want = Math.round(FN * st.dustGoal), fa = fGeo.attributes.position.array; let active = 0; for (let i = 0; i < FN; i++) active += fOn[i] === 1 ? 1 : 0;
    for (let i = 0; i < FN && active < want; i++) if (fOn[i] === 0) { fOn[i] = 1; fa[i * 3 + 1] = 1.4 + Math.random() * 1.6; fVx[i] = 0; active++; }
    if (active > want) { let n = active - want; for (let i = 0; i < FN && n > 0; i++) if (fOn[i] === 1) { fOn[i] = 2; fVx[i] = 1.2 + Math.random() * 1.6; n--; } }
    for (let i = 0; i < FN; i++) { const j = i * 3;
      if (fOn[i] === 1) { if (fa[j + 1] > fLand[i]) fa[j + 1] = Math.max(fLand[i], fa[j + 1] - dt * (.55 + (i % 7) * .08)); }
      else if (fOn[i] === 2) { fa[j] += fVx[i] * dt; fa[j + 1] += dt * .35; fa[j + 2] += fVx[i] * dt * .3; if (fa[j] > 4) { fOn[i] = 0; fa[j] = (Math.random() - .5) * 2.2; fa[j + 1] = -50; fa[j + 2] = -.85 + Math.random() * 1.45; } }
    }
    fGeo.attributes.position.needsUpdate = true; }
  // part highlight
  for (const k in parts) { const on = highlight.key === k; parts[k].forEach(m => { const target = on ? (.18 + Math.sin(elapsed * 3.2) * .12) : 0; m.emissive.setRGB(.15 * target * 2.6, .55 * target * 2.6, .52 * target * 2.6); }); }
  // hotspot position
  if (hotEl && anchors[hotKey]) { anchors[hotKey].getWorldPosition(v3); v3.project(camera);
    if (v3.z < 1 && Math.abs(v3.x) < 1.1 && Math.abs(v3.y) < 1.1) { hotEl.style.display = 'block'; hotEl.style.transform = `translate(${(v3.x * .5 + .5) * innerWidth}px,${(-v3.y * .5 + .5) * innerHeight}px)`; } else hotEl.style.display = 'none'; }
  // sun disk fades with the storm
  sunSpr.material.opacity = Math.max(0, 1 - S * 1.15) * (1 - L * .9);
  const sh = st.shake * (.5 + S * .5); const sx = (Math.random() - .5) * .012 * sh, sy = (Math.random() - .5) * .012 * sh;
  camera.position.x += sx; camera.position.y += sy;
  renderer.render(scene, camera);
  camera.position.x -= sx; camera.position.y -= sy;
}
loop();

window.SCENE = { get loaded() { return loaded; }, shot, setStorm, setPanelDust, gust, mood, focusPart, autoRotate, shake, showHotspot, hideHotspot, setFrame, _reframe: () => {} };
window.dispatchEvent(new CustomEvent('scene-api'));
