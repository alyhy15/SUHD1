/* Last Signal — experience flow v2 (classic script). Talks to scene.js via window.SCENE and to audio.js via window.AUDIO. */
(function () {
  'use strict';
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const AU = new Proxy({}, { get: (_, k) => (...a) => { try { return window.AUDIO && window.AUDIO[k] && window.AUDIO[k](...a); } catch (_) {} } });

  const S = { lang: 'ar', screen: null, ss: {}, ev: [], guideOpen: false, run: 0 };
  const C = () => window.CONTENT[S.lang];
  const ORIGINAL = JSON.parse(JSON.stringify(window.CONTENT)); // pristine texts (admin "original")

  /* ---------- scene proxy ---------- */
  const queue = [];
  const SC = new Proxy({}, { get: (_, k) => (...a) => { if (window.SCENE) return window.SCENE[k](...a); queue.push([k, a]); } });
  window.addEventListener('scene-api', () => { queue.splice(0).forEach(([k, a]) => window.SCENE[k](...a)); window.SCENE._reframe = reframe; });
  const storm = (k, t) => { SC.setStorm(k); AU.storm(k, t); };
  S.mis = {};
  const wrong = () => { AU.wrong(); if (S.screen) { S.mis[S.screen] = (S.mis[S.screen] || 0) + 1; } };

  /* ---------- flow ---------- */
  const ORDER = ['ch1intro', 'solar', 'pancam', 'arm', 'ch1outro', 'case', 'clue1', 'clue2', 'clue3', 'verdict', 'ch2outro', 'order', 'read', 'legacy', 'fin', 'final'];
  const CHAP = { ch1intro: [0, 0], solar: [0, .2], pancam: [0, .45], arm: [0, .7], ch1outro: [0, 1], case: [1, .05], clue1: [1, .25], clue2: [1, .5], clue3: [1, .72], verdict: [1, .9], ch2outro: [1, 1], order: [2, .25], read: [2, .65], legacy: [2, 1], fin: [3, .4], final: [3, 1] };
  const HINTK = { ch1intro: 'ch1intro', solar: 'solar', pancam: 'pancam', arm: 'arm', ch1outro: 'ch1intro', case: 'case', clue1: 'clue1', clue2: 'clue2', clue3: 'clue3', verdict: 'verdict', ch2outro: 'verdict', order: 'order', read: 'read', legacy: 'read', fin: 'fin', final: 'fin' };
  const TALL = ['ch1intro', 'ch1outro', 'ch2outro', 'order', 'legacy'];
  const SRCK = { ch1intro: ['mission', 'model', 'astro'], solar: ['power', 'PIA17759'], pancam: ['PIA19113', 'berries', 'PIA09077'], arm: ['mission'], ch1outro: ['mission'], case: ['PIA19113', 'berries'], clue1: ['PIA05585', 'mi'], clue2: ['PIA05586'], clue3: ['PIA05587', 'mission'], verdict: ['mission', 'PIA09077', 'PIA05587'], ch2outro: ['PIA09077'], order: ['mission', 'end', 'astro'], read: ['PIA22929'], legacy: ['mission', 'record'], fin: ['end'], final: ['end', 'PIA22909'] };

  function go(id) {
    evFlyAway(); S.screen = id; S.ss[id] = S.ss[id] || {};
    document.body.classList.toggle('tallp', TALL.includes(id) && innerWidth <= 860);
    SC.hideHotspot();
    const [ci, f] = CHAP[id]; document.querySelectorAll('#prog .seg b').forEach((b, i) => { b.style.transform = `scaleX(${i < ci ? 1 : i === ci ? f : 0})`; });
    SCREENS[id].enter && SCREENS[id].enter(S.ss[id]);
    render(true); reframe(); AU.whoosh(); TRK.reach(id);
  }
  function next() { const i = ORDER.indexOf(S.screen); TRK.done(S.screen); go(ORDER[i + 1]); }
  function back() { const i = ORDER.indexOf(S.screen); if (i > 0 && !(S.ss.fin && S.ss.fin.sending)) { cancelAnimationFrame(simRAF); go(ORDER[i - 1]); } }
  function render(anim) { if (S.screen) SCREENS[S.screen].render(S.ss[S.screen], anim); }
  function reframe() { SC.setFrame(!$('#panel').classList.contains('hide')); }

  /* ---------- panel / media helpers ---------- */
  const pb = $('#pbody'), pf = $('#pfoot');
  let swapT = null;
  function panel(body, foot = '', anim = false, after) {
    $('#panel').classList.remove('hide');
    const apply = () => {
      const st = pb.scrollTop; pb.innerHTML = body; const idx = ORDER.indexOf(S.screen);
      pf.innerHTML = (idx > 0 && S.screen !== 'final' ? `<button class="btn back" id="bBack">${S.lang === 'ar' ? '→' : '←'} ${esc(C().back)}</button>` : '') + foot; pb.classList.remove('leave');
      on('bBack', back);
      if (anim) { pb.classList.remove('enter'); void pb.offsetWidth; pb.classList.add('enter'); pb.scrollTop = 0; } else { pb.classList.remove('enter'); pb.scrollTop = st; }
      after && after();
    };
    clearTimeout(swapT);
    if (anim && pb.innerHTML) { pb.classList.add('leave'); swapT = setTimeout(apply, 220); } else apply();
  }
  const scrollEnd = () => setTimeout(() => pb.scrollTo({ top: pb.scrollHeight, behavior: 'smooth' }), 60);
  const mediaEl = $('#media'); let mediaKey = null, mediaT = null;
  function media(key, html, after) {
    clearTimeout(mediaT);
    if (!key) { mediaKey = null; mediaEl.classList.remove('on'); mediaT = setTimeout(() => { if (!mediaKey) mediaEl.innerHTML = ''; }, 700); return; }
    if (mediaKey !== key) { mediaEl.innerHTML = html; mediaKey = key; }
    mediaEl.classList.add('on'); after && after(mediaEl);
  }
  function figure(id, cap, opts = {}) {
    const s = window.SRC[id];
    return `<div class="frame ${opts.reticle ? 'reticle' : ''}" id="fr">
      <img class="main" src="assets/${id}.jpg" alt="${esc(cap)}" draggable="false" onerror="this.closest('.frame').outerHTML='<div class=&quot;frame&quot;><div class=&quot;ph&quot;>${esc(opts.missing || id)}<br><a href=&quot;${s.u}&quot; target=&quot;_blank&quot; rel=&quot;noopener&quot;>${id} · NASA</a></div></div>'">
      <span class="badge tag real">${esc(C().real)}</span>${opts.scan ? '<div class="scan"></div>' : ''}${opts.extra || ''}
      <div class="cap">${esc(cap)}<small>${id} · ${esc(s.c || '')}</small></div></div>`;
  }
  const mainImg = () => mediaEl.querySelector('img.main');
  function whenImg(fn) { const img = mainImg(); if (!img) return; if (img.complete && img.naturalWidth) fn(img); else img.addEventListener('load', () => fn(img), { once: true }); }
  function imgTap(cb) { const img = mainImg(); if (!img) return; img.onclick = e => { const r = img.getBoundingClientRect(); cb((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height); }; img.style.cursor = 'crosshair'; }
  function markAt(x, y, d, cls = '') { const fr = mediaEl.querySelector('#fr'), img = mainImg(); if (!fr || !img) return;
    const m = document.createElement('div'); m.className = 'mark ' + cls; m.style.left = (x * 100) + '%'; m.style.top = (y * img.clientHeight / fr.clientHeight * 100) + '%'; m.style.width = m.style.height = (d * img.clientWidth) + 'px'; fr.appendChild(m); }
  function missAt(x, y) { const fr = mediaEl.querySelector('#fr'), img = mainImg(); if (!fr || !img) return; const m = document.createElement('div'); m.className = 'miss'; m.style.left = (x * 100) + '%'; m.style.top = (y * img.clientHeight / fr.clientHeight * 100) + '%'; fr.appendChild(m); setTimeout(() => m.remove(), 1000); wrong(); }
  const head = (k, t) => `<div class="kicker">${esc(k)}</div><h2>${esc(t)}</h2>`;
  const mainBtn = (label, id = 'bNext') => `<button class="btn main" id="${id}">${esc(label)}</button>`;
  const dyk = t => t ? `<div class="dyk"><b>${esc(C().didYouKnow)}</b>${esc(t)}</div>` : '';
  const on = (id, fn) => { const e = document.getElementById(id); if (e) e.onclick = fn; };
  function opts(list, state, name) {
    return `<div class="opts">${list.map((o, i) => { let c = 'opt'; if (state.ans === i) c += o[1] ? ' right' : ' wrong'; else if ((state.tried || []).includes(i)) c += ' wrong';
      return `<button class="${c}" data-o="${name}" data-i="${i}" ${state.ok ? 'disabled' : ''}>${esc(o[0])}</button>`; }).join('')}</div>
      ${state.ans != null ? `<div class="fb ${list[state.ans][1] ? 'ok' : 'no'}">${esc(list[state.ans][2])}</div>` : ''}`;
  }
  function bindOpts(name, list, state, onRight) {
    pb.querySelectorAll(`[data-o="${name}"]`).forEach(b => b.onclick = () => {
      const i = +b.dataset.i; state.tried = state.tried || []; if (!state.tried.includes(i)) state.tried.push(i); state.ans = i;
      if (list[i][1]) { state.ok = true; AU.chime(); onRight && onRight(); } else wrong(); render(); scrollEnd();
    });
  }
  const thumb = (id, cap) => `<button class="thumb" data-zoom="${id}"><img src="assets/${id}.jpg" alt="" onerror="this.style.display='none'"><span>${esc(cap)}<br><small style="font-family:var(--mono);font-size:10.5px">${id}</small></span></button>`;

  /* ---------- evidence ---------- */
  const EVMAP = { solar: ['ch1', 'solar', 'power'], pancam: ['ch1', 'pancam', 'PIA19113'], arm: ['ch1', 'arm', 'mission'], clue1: ['ch2', 'clue1', 'PIA05585'], clue2: ['ch2', 'clue2', 'PIA05586'], clue3: ['ch2', 'clue3', 'PIA05587'], verdict: ['ch2', 'verdict', 'PIA09077'], read: ['ch3', 'read', 'PIA22929'], legacy: ['ch3', 'legacy', 'record'] };
  const evData = k => { const [a, b, src] = EVMAP[k]; const [t, p] = C()[a][b].ev; return { t, p, src }; };
  let evTimers = [];
  function evFlyAway() {
    evTimers.forEach(clearTimeout); evTimers = []; const f = $('#evfly'); if (!f.classList.contains('show') || f.classList.contains('fly')) return;
    const r = $('#evChip').getBoundingClientRect(); f.classList.add('fly'); f.style.left = (r.left + r.width / 2) + 'px'; f.style.top = (r.top + r.height / 2) + 'px'; f.style.transform = 'translate(-50%,-50%) scale(.15)';
    setTimeout(() => { $('#evN').textContent = S.ev.length; const c = $('#evChip'); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); AU.tick(); f.className = ''; f.style.cssText = ''; }, 780);
  }
  function award(k) {
    if (S.ev.includes(k)) return; S.ev.push(k); AU.card(); TRK.save();
    evTimers.forEach(clearTimeout); evTimers = [];
    const d = evData(k), f = $('#evfly');
    $('#evflyS').textContent = C().newCard; $('#evflyT').textContent = d.t; $('#evflyP').textContent = d.p; $('#evOk').textContent = C().ok;
    const bar = f.querySelector('.evbar i'); bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
    f.className = ''; f.style.cssText = ''; void f.offsetWidth; f.classList.add('show');
    evTimers.push(setTimeout(evFlyAway, 5000));
  }
  $('#evOk').onclick = evFlyAway;

  /* ---------- modal ---------- */
  function modal(html) { $('#mbox').innerHTML = `<div style="display:flex;justify-content:flex-end"><button class="tbtn" id="mClose">${esc(C().close)}</button></div>` + html; $('#modal').classList.add('on'); on('mClose', closeModal); }
  function closeModal() { $('#modal').classList.remove('on'); }
  $('#modal').onclick = e => { if (e.target.id === 'modal') closeModal(); };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); toggleGuide(false); } });
  document.addEventListener('click', e => { const z = e.target.closest('[data-zoom]'); if (z) { const id = z.dataset.zoom, s = window.SRC[id]; modal(`<img src="assets/${id}.jpg" alt=""><p style="font-family:var(--mono);font-size:12px;color:var(--dim)">${id} · ${esc(s.c || '')} · <a href="${s.u}" target="_blank" rel="noopener">NASA</a></p>`); } });
  $('#evChip').onclick = () => modal(`<h3 style="margin-top:0">${esc(C().board)}</h3>` + (S.ev.length ? S.ev.map(k => { const d = evData(k), s = window.SRC[d.src]; return `<div class="evc"><b>${esc(d.t)}</b><p>${esc(d.p)}</p><a href="${s.u}" target="_blank" rel="noopener" style="font-size:12px">${esc(s.t)}</a></div>`; }).join('') : `<p>${esc(C().boardEmpty)}</p>`));
  $('#srcBtn').onclick = () => modal(`<h3 style="margin-top:0">${esc(C().srcTitle)}</h3><p style="color:var(--muted)">${esc(C().srcNote)}</p><ul>${Object.values(window.SRC).map(s => `<li><a href="${s.u}" target="_blank" rel="noopener">${esc(s.t)}</a>${s.c ? ` <span style="color:var(--dim)">— ${esc(s.c)}</span>` : ''}</li>`).join('')}</ul>` + (ADM.allowed ? `<div style="margin-top:14px"><button class="btn" id="bAdmin">${esc(C().admin.open)}</button></div>` : ''));
  document.addEventListener('click', e => { if (e.target.id === 'bAdmin') { closeModal(); openAdmin(); } });

  /* ---------- sound / restart buttons ---------- */
  const ICON_ON = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>', ICON_OFF = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>';
  function syncMute() { const m = !!(window.AUDIO && window.AUDIO.muted); $('#muteBtn').innerHTML = m ? ICON_OFF : ICON_ON; $('#omute').innerHTML = m ? ICON_OFF : ICON_ON; $('#muteBtn').setAttribute('aria-pressed', m); }
  const toggleMute = () => { window.AUDIO && window.AUDIO.setMuted(!window.AUDIO.muted); syncMute(); };
  $('#muteBtn').onclick = toggleMute; $('#omute').onclick = toggleMute;
  $('#restartBtn').onclick = () => { modal(`<h3 style="margin-top:0">${esc(C().restartT)}</h3><p>${esc(C().restartQ)}</p><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn main" id="bRY" style="flex:none">${esc(C().restartYes)}</button><button class="btn" id="bRN">${esc(C().cancel)}</button></div>`); on('bRY', () => { closeModal(); restart(); }); on('bRN', closeModal); };

  /* ================= SCREENS ================= */
  const SCREENS = {};

  SCREENS.ch1intro = {
    enter() { SC.mood('calm'); storm(0); SC.setPanelDust(0); SC.focusPart(null); SC.autoRotate(0); SC.shake(0); SC.shot('overview'); media(null); AU.ambient(.05); AU.drone(.05); },
    render(s, anim) { const c = C().ch1; panel(head(c.kicker, c.title) + `<p style="font-size:17px">${esc(c.intro)}</p>` + dyk(c.fact), mainBtn(c.start), anim, () => on('bNext', next)); }
  };

  /* --- solar: explainer + live mini simulation --- */
  let simRAF = null;
  function solarSim(s) {
    const cv = document.getElementById('solarSim'); if (!cv) return;
    cancelAnimationFrame(simRAF);
    const dpr = Math.min(devicePixelRatio, 2); const W = cv.clientWidth, H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; const g = cv.getContext('2d'); g.scale(dpr, dpr);
    s.specks = s.specks || []; s.sim = s.sim || { dust: 0, storm: 0 };
    const rtl = S.lang === 'ar'; const sunX = rtl ? W - 34 : 34, sunY = 30; const panelY = H - 34, px0 = W * .14, px1 = W * .86;
    const tick = () => {
      if (S.screen !== 'solar' || !document.getElementById('solarSim')) return;
      const wantDust = s.cur === 'dust' ? 1 : s.cur === 'wind' ? .12 : s.sim.dust; // a storm in the sky doesn't change the panel dust
      const wantStorm = s.cur === 'storm' ? 1 : 0;
      s.sim.dust += (wantDust - s.sim.dust) * .03; s.sim.storm += (wantStorm - s.sim.storm) * .03;
      const target = Math.round(s.sim.dust * 230);
      while (s.specks.length < target) s.specks.push({ x: px0 + Math.random() * (px1 - px0), y: -Math.random() * 40, vy: .4 + Math.random() * .8, land: panelY - 2 - Math.random() * 6, vx: 0, a: 1 });
      if (s.specks.length > target) { let n = s.specks.length - target; for (const p of s.specks) { if (n <= 0) break; if (!p.blow) { p.blow = true; p.vx = (rtl ? -1 : 1) * (2 + Math.random() * 3); n--; } } }
      // sky
      const sky = g.createLinearGradient(0, 0, 0, H); const st = s.sim.storm;
      sky.addColorStop(0, `rgb(${Math.round(196 - 140 * st)},${Math.round(140 - 100 * st)},${Math.round(104 - 76 * st)})`); sky.addColorStop(1, `rgb(${Math.round(120 - 80 * st)},${Math.round(70 - 46 * st)},${Math.round(44 - 30 * st)})`);
      g.fillStyle = sky; g.fillRect(0, 0, W, H);
      // sun
      const sa = 1 - st * .92; const sg = g.createRadialGradient(sunX, sunY, 0, sunX, sunY, 40); sg.addColorStop(0, `rgba(255,248,230,${sa})`); sg.addColorStop(.3, `rgba(255,220,170,${sa * .6})`); sg.addColorStop(1, 'rgba(255,200,150,0)'); g.fillStyle = sg; g.beginPath(); g.arc(sunX, sunY, 40, 0, 7); g.fill();
      // rays
      const covered = Math.min(1, s.sim.dust); const nR = 9;
      for (let i = 0; i < nR; i++) { const tx = px0 + (i + .5) * (px1 - px0) / nR; const a = (1 - st * .95) * .55; if (a < .02) continue;
        g.strokeStyle = `rgba(255,236,190,${a})`; g.lineWidth = 2; g.setLineDash([6, 6]); g.lineDashOffset = -performance.now() / 40; g.beginPath(); g.moveTo(sunX, sunY); g.lineTo(tx, panelY - 2); g.stroke(); }
      g.setLineDash([]);
      // storm haze particles
      if (st > .05) { g.fillStyle = `rgba(120,70,40,${st * .5})`; for (let i = 0; i < 60; i++) { const x = (i * 97 + performance.now() / 6) % W, y = (i * 53) % (H - 40); g.fillRect(x, y, 2, 2); } }
      // panel cells
      g.fillStyle = '#1a2440'; g.fillRect(px0, panelY, px1 - px0, 14); g.strokeStyle = '#3a4f80'; g.lineWidth = 1;
      for (let x = px0; x <= px1; x += (px1 - px0) / 12) { g.beginPath(); g.moveTo(x, panelY); g.lineTo(x, panelY + 14); g.stroke(); }
      const light = (1 - st * .95) * (1 - covered * .55); g.fillStyle = `rgba(150,220,255,${light * .5})`; g.fillRect(px0, panelY, px1 - px0, 3);
      g.fillStyle = '#4a3020'; g.fillRect(0, panelY + 14, W, H);
      // specks
      for (const p of s.specks) { if (p.blow) { p.x += p.vx; p.y -= .3; p.a -= .02; } else if (p.y < p.land) p.y += p.vy; g.fillStyle = `rgba(214,150,100,${Math.max(0, p.a)})`; g.fillRect(p.x, p.y, 2.2, 2.2); }
      s.specks = s.specks.filter(p => p.a > 0 && p.x > -10 && p.x < W + 10);
      simRAF = requestAnimationFrame(tick);
    };
    tick();
  }
  SCREENS.solar = {
    enter(s) { SC.mood('calm'); SC.shot('solar'); SC.focusPart('solar'); media(null); s.power = s.power ?? 100; s.tried = s.tried || []; },
    render(s, anim) {
      const c = C().ch1.solar;
      if (!s.open) SC.showHotspot('solar', c.part, () => { s.open = true; AU.chime(); render(); });
      let b = head(C().ch1.kicker + ' · 1/3', c.part) + `<div class="q">${esc(c.q)}</div>`;
      if (!s.open) b += `<div class="task">${esc(C().ch1.tapPart)}</div>`;
      else {
        b += `<div class="q" style="font-size:15.5px;color:var(--amber);margin-bottom:8px">${esc(c.how)}</div><ol class="how">${c.steps.map(t => `<li>${esc(t)}</li>`).join('')}</ol>
        <canvas id="solarSim" aria-hidden="true"></canvas><div class="simlbl"><span>☀ ${esc(c.light)}</span><span class="tag sim">${esc(C().sim)}</span><span>▦ ${esc(c.cells)}</span></div>
        <p class="lead" style="margin-bottom:10px">${esc(c.lead)}</p>
        <div class="scs">${c.sc.map(([k, l]) => `<button class="sc ${s.tried.includes(k) ? 'done' : ''} ${s.cur === k ? 'on' : ''}" data-sc="${k}"><i>${s.tried.includes(k) ? '✓' : ''}</i>${esc(l)}</button>`).join('')}</div>
        <div class="gauge"><div class="row"><span>${esc(C().opening.power)}</span><span class="val">${s.power}%</span></div>
        <div class="bar"><div class="fill" style="width:${s.power}%;background:${s.power > 60 ? 'var(--ok)' : s.power > 25 ? 'var(--amber)' : 'var(--bad)'}"></div></div><div class="msg">${s.cur ? esc(c.res[s.cur]) : ''}</div></div>`;
        if (s.tried.length === 3) { s.q = s.q || {}; b += `<div class="q" style="font-size:16px">${esc(c.ask)}</div>` + opts(c.opts, s.q, 'solar'); if (s.q.ok) b += thumb('PIA17759', c.fig); }
      }
      panel(b, s.q && s.q.ok ? mainBtn(C().continue) : '', anim, () => {
        if (s.open) solarSim(s);
        pb.querySelectorAll('[data-sc]').forEach(x => x.onclick = () => {
          const k = x.dataset.sc; s.cur = k; if (!s.tried.includes(k)) s.tried.push(k);
          if (k === 'dust') { storm(0, 1.5); SC.setPanelDust(1); SC.shot('solarClose', 1.6); s.power = 52; AU.tick(); }
          if (k === 'wind') { storm(0, 1.5); SC.gust(); AU.whoosh(); SC.setPanelDust(.1); SC.shot('solarClose', 1.2); s.power = 94; }
          if (k === 'storm') { storm(1, 2); SC.shot('solar', 1.6); s.power = 7; AU.warn(); }
          render(); if (s.tried.length === 3) scrollEnd();
        });
        if (s.q) bindOpts('solar', c.opts, s.q, () => award('solar'));
        on('bNext', () => { storm(0); SC.setPanelDust(0); next(); });
      });
    }
  };

  SCREENS.pancam = {
    enter(s) { SC.mood('calm'); storm(0); SC.setPanelDust(0); SC.shot('pancam'); SC.focusPart('pancam'); s.found = s.found || []; if (!s.open) media(null); },
    render(s, anim) {
      const c = C().ch1.pancam;
      if (!s.open) SC.showHotspot('pancam', 'Pancam', () => { s.open = true; AU.chime(); render(); });
      let b = head(C().ch1.kicker + ' · 2/3', c.part) + `<div class="q">${esc(c.q)}</div>`;
      if (!s.open) b += `<div class="task">${esc(C().ch1.tapPart)}</div>`;
      else {
        b += `<p class="lead">${esc(c.lead)}</p>`;
        if (s.found.length < 3) b += `<div class="task">${esc(c.task)} &nbsp;<b>${esc(c.found)} ${s.found.length} ${esc(c.of)} 3</b></div>${s.miss ? `<div class="fb no">${esc(c.miss)}</div>` : ''}`;
        else b += `<div class="fb ok">${esc(c.done)}</div>` + dyk(c.fact);
        media('PIA19113', figure('PIA19113', c.fig, { reticle: true }), () => {
          whenImg(() => { mediaEl.querySelectorAll('.mark').forEach(m => m.remove()); s.found.forEach(i => { const [x, y, r] = window.BALLS_19113[i]; markAt(x, y, r * 2.1); }); });
          imgTap((x, y) => {
            if (s.found.length >= 3) return;
            const hit = window.BALLS_19113.findIndex(([bx, by, br]) => Math.hypot(x - bx, y - by) < br * 1.2);
            if (hit >= 0 && !s.found.includes(hit)) { s.found.push(hit); s.miss = false; AU.chime(); if (s.found.length === 3) award('pancam'); render(); }
            else if (hit < 0) { missAt(x, y); s.miss = true; render(); }
          });
        });
      }
      panel(b, s.found.length >= 3 ? mainBtn(C().continue) : '', anim, () => on('bNext', next));
    }
  };

  SCREENS.arm = {
    enter(s) { SC.mood('calm'); SC.shot('arm'); SC.focusPart('arm'); media(null); s.done = s.done || {}; },
    render(s, anim) {
      const c = C().ch1.arm;
      if (!s.open) SC.showHotspot('arm', c.part, () => { s.open = true; AU.chime(); render(); });
      let b = head(C().ch1.kicker + ' · 3/3', c.part) + `<div class="q">${esc(c.q)}</div>`;
      const n = Object.keys(s.done).length;
      if (!s.open) b += `<div class="task">${esc(C().ch1.tapPart)}</div>`;
      else {
        const toolOrder = ['mb', 'mi', 'rat'];
        b += `<p class="lead">${esc(c.lead)}</p><div class="match">
          <div class="mcol"><h4>${esc(c.tasksT)}</h4>${c.tasks.map(([k, l]) => `<button class="mi ${s.done[k] ? 'done' : ''} ${s.sel === k ? 'sel' : ''}" data-t="${k}">${esc(l)}${s.done[k] ? `<span class="n">${s.done[k]}</span>` : ''}</button>`).join('')}</div>
          <div class="mcol"><h4>${esc(c.toolsT)}</h4>${toolOrder.map(k => { const l = c.tools.find(t => t[0] === k)[1]; return `<button class="mi ${s.done[k] ? 'done' : ''}" data-l="${k}">${esc(l)}${s.done[k] ? `<span class="n">${s.done[k]}</span>` : ''}</button>`; }).join('')}</div></div>
          <div class="err" style="min-height:22px;margin-top:8px">${s.msg ? esc(s.msg) : ''}</div>`;
        if (n === 3) b += `<div class="fb ok">${esc(c.done)}</div>` + dyk(c.fact);
      }
      panel(b, n === 3 ? mainBtn(C().continue) : '', anim, () => {
        pb.querySelectorAll('[data-t]').forEach(x => x.onclick = () => { if (s.done[x.dataset.t]) return; s.sel = x.dataset.t; s.msg = ''; AU.tick(); render(); });
        pb.querySelectorAll('[data-l]').forEach(x => x.onclick = () => {
          const k = x.dataset.l; if (s.done[k]) return;
          if (!s.sel) { s.msg = c.pickTask; render(); return; }
          if (k === s.sel) { s.done[k] = Object.keys(s.done).length + 1; s.sel = null; s.msg = ''; AU.chime(); if (Object.keys(s.done).length === 3) award('arm'); render(); if (Object.keys(s.done).length === 3) scrollEnd(); }
          else { s.msg = c.wrong; wrong(); render(); const e = pb.querySelector(`[data-l="${k}"]`); e && e.classList.add('shake'); }
        });
        on('bNext', next);
      });
    }
  };

  SCREENS.ch1outro = {
    enter() { SC.focusPart(null); SC.shot('overview'); media(null); },
    render(s, anim) { const c = C().ch1; panel(head(c.kicker, c.title) + `<div class="quote">${esc(c.outro)}</div>` + dyk(c.outroFact), mainBtn(c.outroBtn), anim, () => on('bNext', next)); }
  };

  /* --- Chapter 2: the investigation --- */
  const CASE = () => S.ss.case;
  const stepsBar = i => `<div class="steps">${C().ch2.steps.map((t, j) => `<span class="${j < i ? 'done' : j === i ? 'on' : ''}">${esc(t)}</span>`).join('')}</div>`;
  const ch2head = i => head(C().ch2.kicker, C().ch2.title) + stepsBar(i);
  function boardHTML(pickable) {
    const out = CASE().out || [];
    return `<div class="board">${C().ch2.suspects.map(([k, e, n, d]) => `<button class="sus ${out.includes(k) ? 'out' : ''} ${pickable && !out.includes(k) ? 'pick' : ''} ${CASE().solved && k === 'water' ? 'win' : ''}" data-s="${k}" data-out="${esc(C().ch2.out)}" ${pickable && !out.includes(k) ? '' : 'tabindex="-1"'}><span class="e">${e}</span><b>${esc(n)}</b><small>${esc(d)}</small></button>`).join('')}</div>`;
  }
  function bindBoard(targets, s, wrongMsg, onDone) {
    pb.querySelectorAll('.sus.pick').forEach(x => x.onclick = () => {
      const k = x.dataset.s; const c = CASE();
      if (targets.includes(k)) { c.out = [...(c.out || []), k]; AU.stamp(); s.msg = ''; if (targets.every(t => c.out.includes(t))) { s.elimDone = true; onDone && onDone(); } render(); scrollEnd(); }
      else { s.msg = wrongMsg; wrong(); render(); const e = pb.querySelector(`[data-s="${k}"]`); e && e.classList.add('shake'); }
    });
  }

  SCREENS.case = {
    enter(s) { SC.mood('lab'); SC.focusPart(null); SC.shot('lab'); s.out = s.out || []; },
    render(s, anim) {
      const c = C().ch2;
      media('case19113', figure('PIA19113', C().ch1.pancam.fig));
      panel(ch2head(0) + `<p style="font-size:16.5px">${esc(c.case.lead)}</p>` + boardHTML(false), mainBtn(c.case.go), anim, () => on('bNext', next));
    }
  };

  SCREENS.clue1 = {
    enter(s) { SC.mood('lab'); s.p = s.p || 1; s.q = s.q || {}; },
    render(s, anim) {
      const c = C().ch2.clue1;
      let b = ch2head(1) + `<span class="tool">🔍 ${esc(c.tool)}</span><h2 style="font-size:20px">${esc(c.title)}</h2>`;
      if (s.p === 1) b += `<p class="lead">${esc(c.lead)}</p><div class="task">${esc(c.task)}</div>`;
      else {
        b += `<div class="fb ok">${esc(c.found)}</div><div class="q" style="font-size:16px;margin-top:14px">${esc(c.think)}</div>`;
        const tq = [[S.lang === 'ar' ? 'ستنحني أو تنكسر تحتها' : 'They would bend or break under it', true, c.thinkA], [S.lang === 'ar' ? 'ستبقى مستقيمة كما هي' : 'They would stay straight', false, S.lang === 'ar' ? 'القطرة الثقيلة تضغط على الطبقات الطرية فتغيّر شكلها. جرّب مرة أخرى.' : 'A heavy drop presses on soft layers and changes their shape. Try again.']];
        b += opts(tq, s.q, 'th');
        if (s.q.ok) { b += `<div class="q" style="font-size:16px;margin-top:16px;color:var(--amber)">${esc(c.elim)}</div>` + boardHTML(!s.elimDone) + (s.msg ? `<div class="fb no">${esc(s.msg)}</div>` : ''); if (s.elimDone) b += `<div class="fb ok">${esc(c.done)}</div>` + dyk(c.fact); }
      }
      media('clue1', figure('PIA05585', c.fig, { extra: '<div class="lensDark" id="lens"></div><div class="lensRing" id="lensR"></div>' }), () => {
        const fr = mediaEl.querySelector('#fr'), lens = mediaEl.querySelector('#lens'), ring = mediaEl.querySelector('#lensR');
        if (!lens) return;
        const SPH = [.074, .537], R = .07;
        const finish = () => { lens.style.opacity = 0; ring.style.opacity = 0; lens.style.pointerEvents = 'none'; whenImg(() => { if (!mediaEl.querySelector('.mark')) markAt(SPH[0], SPH[1], .15, 'amber'); }); };
        if (s.p > 1) { finish(); return; }
        const setPos = (x, y) => { const r = lens.getBoundingClientRect(); const lr = Math.max(48, Math.min(90, r.width * .1)); fr.style.setProperty('--lr', lr + 'px'); fr.style.setProperty('--lx', (x * 100) + '%'); fr.style.setProperty('--ly', (y * 100) + '%'); };
        setPos(.55, .45);
        const pos = e => { const r = lens.getBoundingClientRect(); return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height, r]; };
        lens.onpointermove = e => { const [x, y] = pos(e); setPos(x, y); };
        lens.onpointerdown = e => { const [x, y, r] = pos(e); setPos(x, y); const img = mainImg(); const ih = img ? img.clientHeight / fr.clientHeight : 1;
          const dx = (x - SPH[0]) * r.width, dy = (y - SPH[1] * ih) * r.height; const lr = parseFloat(fr.style.getPropertyValue('--lr')) || 70;
          if (Math.hypot(dx, dy) < lr * .9) { s.p = 2; AU.chime(); finish(); render(); } else { AU.tick(); } };
      });
      panel(b, s.elimDone ? mainBtn(C().continue) : '', anim, () => {
        pb.querySelectorAll('[data-o="th"]').forEach(x => x.onclick = () => { const i = +x.dataset.i; s.q.tried = s.q.tried || []; if (!s.q.tried.includes(i)) s.q.tried.push(i); s.q.ans = i; if (i === 0) { s.q.ok = true; AU.chime(); } else wrong(); render(); scrollEnd(); });
        if (s.q.ok && !s.elimDone) bindBoard(['volcano', 'meteor'], s, c.wrongElim, () => award('clue1'));
        on('bNext', next);
      });
    }
  };

  SCREENS.clue2 = {
    enter(s) { SC.mood('lab'); },
    render(s, anim) {
      const c = C().ch2.clue2;
      let b = ch2head(2) + `<span class="tool">🔍 ${esc(c.tool)}</span><h2 style="font-size:20px">${esc(c.title)}</h2>`;
      if (!s.found) b += `<p class="lead">${esc(c.lead)}</p><div class="task">${esc(c.task)}</div>${s.miss ? `<div class="fb no">${esc(c.miss)}</div>` : ''}`;
      else { b += `<div class="fb ok">${esc(c.found)}</div><div class="q" style="font-size:16px;margin-top:14px;color:var(--amber)">${esc(c.elim)}</div>` + boardHTML(!s.elimDone) + (s.msg ? `<div class="fb no">${esc(s.msg)}</div>` : ''); if (s.elimDone) b += `<div class="fb ok">${esc(c.done)}</div>` + dyk(c.fact); }
      media('clue2', figure('PIA05586', c.fig, { reticle: true }), () => {
        whenImg(() => { if (s.found && !mediaEl.querySelector('.mark')) markAt(.724, .53, .22); });
        imgTap((x, y) => { if (s.found) return; if (x > .6 && x < .84 && y > .44 && y < .62) { s.found = true; s.miss = false; AU.chime(); markAt(.724, .53, .22); render(); scrollEnd(); } else { missAt(x, y); s.miss = true; render(); } });
      });
      panel(b, s.elimDone ? mainBtn(C().continue) : '', anim, () => { if (s.found && !s.elimDone) bindBoard(['wheels'], s, c.wrongElim, () => award('clue2')); on('bNext', next); });
    }
  };

  SCREENS.clue3 = {
    enter(s) { SC.mood('lab'); s.m = s.m || {}; },
    render(s, anim) {
      const c = C().ch2.clue3;
      const done = s.m.a === 100 && s.m.b === 100;
      const meter = (k, label, hi) => { const p = s.m[k] || 0; const fin = p === 100; return `<div class="meter ${hi ? '' : 'lo'}"><div class="row"><span>${esc(label)}</span><b>${fin ? esc(hi ? c.high : c.low) : p ? esc(c.scanning) : ''}</b></div><div class="bar"><i style="width:${fin ? (hi ? 92 : 14) : 0}%"></i></div></div>`; };
      let b = ch2head(3) + `<span class="tool">📡 ${esc(c.tool)}</span><h2 style="font-size:20px">${esc(c.title)}</h2><p class="lead">${esc(c.lead)}</p>
        <div class="meas">${[['a', c.t1], ['b', c.t2]].map(([k, l]) => `<button class="mbtn ${s.m[k] === 100 ? 'done' : ''}" data-m="${k}"><span class="ring" style="--p:${s.m[k] || 0}"></span><span>${esc(l)}<small>${s.m[k] === 100 ? '✓' : s.m[k] ? esc(c.scanning) : 'Mössbauer'}</small></span></button>`).join('')}</div>
        <div style="font-size:13px;color:var(--muted);margin:4px 0 6px">${esc(c.meter)}</div><div class="meters">${meter('a', 'Berry Bowl', true)}${meter('b', 'Empty', false)}</div>
        <div class="fb info"><span class="tag sim">${esc(C().sim)}</span> ${esc(c.note)}</div>`;
      if (done) b += `<div class="fb ok">${esc(c.result)}</div>` + thumb('PIA05587', c.graph);
      media('clue3', figure('PIA05586', C().ch2.clue2.fig, { scan: !done }));
      panel(b, done ? mainBtn(C().continue) : '', anim, () => {
        pb.querySelectorAll('[data-m]').forEach(x => x.onclick = () => {
          const k = x.dataset.m; if (s.m[k]) return; const t0 = performance.now(); const D = 2400; AU.dataStart();
          const step = () => { const p = Math.min(100, Math.round((performance.now() - t0) / D * 100)); s.m[k] = p; const ring = pb.querySelector(`[data-m="${k}"] .ring`); if (ring) ring.style.setProperty('--p', p);
            if (p < 100) requestAnimationFrame(step); else { AU.dataStop(); AU.chime(); if (s.m.a === 100 && s.m.b === 100) award('clue3'); render(); scrollEnd(); } };
          s.m[k] = 1; render(); requestAnimationFrame(step);
        });
        on('bNext', next);
      });
    }
  };

  SCREENS.verdict = {
    enter(s) { SC.mood('lab'); },
    render(s, anim) {
      const c = C().ch2, v = c.verdict;
      const ev = ['clue1', 'clue2', 'clue3'].map(k => evData(k));
      let b = ch2head(4) + `<h2 style="font-size:20px">${esc(v.title)}</h2><p class="lead">${esc(v.lead)}</p>
        <div style="display:grid;gap:7px;margin-bottom:12px">${ev.map((d, i) => `<div class="evc" style="margin:0"><b>${i + 1}. ${esc(d.t)}</b><p>${esc(d.p)}</p></div>`).join('')}</div>` + boardHTML(false);
      if (CASE().solved) b += `<div class="result">${esc(v.result)}</div>` + `<div class="dyk"><b>NASA</b>${esc(v.nasa)}</div>` + `<div class="fb info" style="color:var(--text)">⚠️ ${esc(v.careful)}</div>`;
      media('verdict' + (CASE().solved ? 'S' : ''), figure('PIA19113', C().ch1.pancam.fig, { extra: CASE().solved ? `<div class="bigstamp">${esc(v.stamp)} ✓</div>` : '' }));
      panel(b, CASE().solved ? mainBtn(C().continue) : mainBtn(v.btn, 'bVerdict'), anim, () => {
        on('bVerdict', () => { CASE().solved = true; AU.stamp(); setTimeout(() => AU.chime(), 300); mediaKey = null; award('verdict'); render(); scrollEnd(); });
        on('bNext', next);
      });
    }
  };

  SCREENS.ch2outro = {
    enter() { SC.mood('calm'); SC.shot('overview'); media(null); },
    render(s, anim) { const c = C().ch2; panel(head(c.kicker, c.title) + `<div class="quote">${esc(c.outro)}</div>`, mainBtn(c.outroBtn), anim, () => on('bNext', next)); }
  };

  SCREENS.order = {
    enter(s) { SC.mood('calm'); storm(.7); SC.shot('storm', 2.4); media(null); s.placed = s.placed || []; },
    render(s, anim) {
      const c = C().ch3.order, cards = c.cards, shuffled = [2, 4, 0, 3, 1];
      let b = head(C().ch3.kicker, C().ch3.title) + `<p class="lead">${esc(c.lead)}</p>
        <div class="timeline">${s.placed.map((i, n) => `<div class="tl"><b>${n + 1}</b><div>${esc(cards[i][1])}${cards[i][2] ? `<small>${esc(cards[i][2])}</small>` : ''}</div></div>`).join('')}</div>
        <div class="ocards">${shuffled.filter(i => !s.placed.includes(i)).map(i => `<button class="oc" data-c="${i}">${esc(cards[i][1])}</button>`).join('')}</div>
        <div class="err" style="margin-top:8px">${s.msg ? esc(s.msg) : ''}</div>${s.placed.length === 5 ? `<div class="fb ok">${esc(c.done)}</div>` + dyk(c.fact) : ''}`;
      panel(b, s.placed.length === 5 ? mainBtn(C().continue) : '', anim, () => {
        pb.querySelectorAll('[data-c]').forEach(x => x.onclick = () => {
          const i = +x.dataset.c;
          if (i === s.placed.length) { s.placed.push(i); s.msg = ''; AU.chime(); if (i === 1) { storm(1); AU.powerDown(); } render(); if (s.placed.length === 5) scrollEnd(); }
          else { s.msg = c.wrong; wrong(); render(); const e = pb.querySelector(`[data-c="${i}"]`); e && e.classList.add('shake'); }
        });
        on('bNext', next);
      });
    }
  };

  SCREENS.read = {
    enter(s) { storm(1); s.qi = s.qi || 0; s.a = s.a || []; },
    render(s, anim) {
      const c = C().ch3.read;
      let b = head(C().ch3.kicker, C().ch3.title) + `<p class="lead">${esc(c.lead)}</p>`;
      c.qs.forEach(([q, os, ex], i) => {
        if (i > s.qi) return; const a = s.a[i];
        b += `<div class="q" style="font-size:16px">${esc(q)}</div><div class="opts" style="margin-bottom:6px">${os.map(([t, ok], j) => `<button class="opt ${a && a.pick === j ? (ok ? 'right' : 'wrong') : ''} ${a && a.tried.includes(j) && !ok ? 'wrong' : ''}" data-r="${i}" data-j="${j}" ${a && a.ok ? 'disabled' : ''}>${esc(t)}</button>`).join('')}</div>
          ${a && a.ok ? `<div class="fb ok" style="margin-bottom:12px">${esc(ex)}</div>` : ''}`;
      });
      const all = s.a.length === 3 && s.a.every(x => x && x.ok);
      media('PIA22929', figure('PIA22929', c.fig));
      panel(b, all ? mainBtn(C().continue) : '', anim, () => {
        pb.querySelectorAll('[data-r]').forEach(x => x.onclick = () => {
          const i = +x.dataset.r, j = +x.dataset.j; const ok = c.qs[i][1][j][1];
          s.a[i] = s.a[i] || { tried: [] }; s.a[i].pick = j; if (!s.a[i].tried.includes(j)) s.a[i].tried.push(j);
          if (ok) { s.a[i].ok = true; AU.chime(); if (i === s.qi && s.qi < 2) s.qi++; if (s.a.filter(z => z && z.ok).length === 3) award('read'); } else wrong();
          render(); scrollEnd();
        });
        on('bNext', next);
      });
    }
  };

  SCREENS.legacy = {
    enter() { storm(0, 4); SC.mood('dawn'); SC.shot('dawn', 2.6); media(null); AU.pad(); setTimeout(() => award('legacy'), 1200); },
    render(s, anim) { const c = C().ch3; panel(head(c.kicker, c.legacy.t) + `<div class="fact"><b>${esc(c.legacy.ev[0])}</b>${esc(c.legacy.p)}</div><div class="quote">${esc(c.outro)}</div>`, mainBtn(c.outroBtn), anim, () => on('bNext', next)); }
  };

  /* --- Finale: complete the signal by building a linked discovery chain (tool → evidence → result) --- */
  const CHAIN_KEYS = ['mb', 'mi', 'solar', 'pancam'];
  const TYPE_ICON = ['🔧', '🔍', '💡'], TYPE_KEY = ['tool', 'ev', 'res'];
  function chainTexts(f) { const c = C().fin; if (!f.tool) return []; const t = [c.tools[f.tool]]; if (f.ev) t.push(c.evs[f.ev]); if (f.res) t.push(c.ress[f.res]); return t.map((x, i) => (f.edited && f.edited[i] != null) ? f.edited[i] : x); }
  function linkOptions(f, step) { // correct one + two from other chains, order rotated so the correct answer moves
    const others = CHAIN_KEYS.filter(k => k !== f.tool); const off = CHAIN_KEYS.indexOf(f.tool) + step;
    const pick = [others[off % 3], others[(off + 1) % 3]]; const opts = [f.tool, ...pick]; const r = (off + step) % 3; return [...opts.slice(r), ...opts.slice(0, r)];
  }
  function sigFrame(f) {
    const c = C().fin, tx = chainTexts(f);
    const lines = [0, 1, 2].map(i => tx[i] ? `<div class="sl ${f.fresh === i ? 'new' : ''}">${TYPE_ICON[i]} ${esc(c.s[i].replace(/…$/, ''))} ${esc(tx[i])}</div>` : `<div class="sl empty">${TYPE_ICON[i]} ░░░░░░░░░░░░░░</div>`).join('');
    return `<div class="frame sigframe ${f.sent ? 'done' : ''}" id="fr"><div class="sigimg"><img class="main" src="assets/PIA22929.jpg" alt="PIA22929" draggable="false">
      <div class="strip">${lines}<div class="sl name">${f.name && f.name.trim() ? '— ' + esc(f.name.trim()) : ''}</div></div>
      ${f.sent ? `<div class="sigdone">${esc(c.complete)} ✓</div>` : ''}</div>
      <div class="cap">${esc(c.honest)}<small>PIA22929 · NASA/JPL-Caltech/Cornell/ASU</small></div></div>`;
  }
  SCREENS.fin = {
    enter(s) { SC.mood('dawn'); s.tries = s.tries || [0, 0]; s.first = s.first || [false, false]; s.name = s.name || ''; },
    render(s, anim) {
      const c = C().fin, tx = chainTexts(s), step = !s.tool ? 0 : !s.ev ? 1 : !s.res ? 2 : 3;
      media('fin' + S.lang + step + (s.sent ? 'S' : '') + (s.edited ? JSON.stringify(s.edited).length : ''), sigFrame(s));
      let b = head(c.kicker, c.title);
      if (step === 0) b += `<p class="lead">${esc(c.lead)}</p>`;
      b += `<div class="chainv">${[0, 1, 2].map(i => `<div class="slot t-${TYPE_KEY[i]} ${i === step ? 'cur' : ''} ${tx[i] ? 'full' : ''}">
          <span class="ty">${TYPE_ICON[i]} ${esc(c.types[TYPE_KEY[i]])}</span>
          <div class="st">${esc(c.s[i].replace(/…$/, ''))} ${tx[i] ? `<span>${esc(tx[i])}</span><button class="tbtn edb" data-ed="${i}" title="${esc(c.edit)}">✎</button>` : '<em>______</em>'}</div>
          ${s.editing === i ? `<input class="inp" data-et="${i}" value="${esc(tx[i])}" placeholder="${esc(c.edit)}">` : ''}</div>`).join('<div class="link"></div>')}</div>`;
      if (step < 3) {
        const opts = step === 0 ? CHAIN_KEYS : linkOptions(s, step);
        const label = k => step === 0 ? c.tools[k] : step === 1 ? c.evs[k] : c.ress[k];
        b += `<div class="q" style="font-size:15.5px;margin-top:12px">${esc(c.ask[step])}</div>
          <div class="evgrid one">${opts.map(k => `<button class="evb t-${TYPE_KEY[step]}" data-k="${k}"><b>${TYPE_ICON[step]} ${esc(label(k))}</b>${step === 0 ? `<small>${esc(c.toolDesc[k])}</small>` : ''}</button>`).join('')}</div>
          ${s.msg ? `<div class="fb no">${esc(s.msg)}</div>` : ''}`;
      } else {
        b += `<div class="fb ok">✓ ${esc(c.chainDone)} · ${s.first.filter(Boolean).length}/2 ${esc(c.firstTry)}</div>`;
        b += `<label class="q" for="fname" style="display:block;font-size:16px;margin-top:12px">${esc(c.name)} *</label><input class="inp" id="fname" maxlength="40" placeholder="${esc(c.namePh)}" value="${esc(s.name)}" autocomplete="name"><div class="err" id="ferr">${s.nameErr ? esc(c.nameNeed) : ''}</div>`;
      }
      panel(b, step === 3 ? mainBtn(s.sending ? c.sending : c.send) : '', anim, () => {
        pb.querySelectorAll('[data-k]').forEach(x => x.onclick = () => {
          const k = x.dataset.k;
          if (step === 0) { s.tool = k; s.fresh = 0; s.msg = ''; AU.chime(); }
          else {
            const li = step - 1; s.tries[li]++;
            if (k === s.tool) { if (step === 1) s.ev = k; else s.res = k; s.first[li] = s.tries[li] === 1; s.fresh = step; s.msg = ''; AU.dataStart(); setTimeout(() => AU.dataStop(), 700); AU.chime(); }
            else { s.msg = step === 1 ? c.wrongEv : c.wrongRes; wrong(); render(); const e = pb.querySelector(`[data-k="${k}"]`); e && e.classList.add('shake'); return; }
          }
          render(); scrollEnd(); if (s.res) setTimeout(() => { const n = $('#fname'); n && n.focus({ preventScroll: true }); }, 400);
        });
        pb.querySelectorAll('[data-ed]').forEach(x => x.onclick = () => { const i = +x.dataset.ed; s.editing = s.editing === i ? null : i; render(); const inp = pb.querySelector(`[data-et="${i}"]`); inp && inp.focus(); });
        pb.querySelectorAll('[data-et]').forEach(x => x.oninput = () => { const i = +x.dataset.et; s.edited = s.edited || {}; s.edited[i] = x.value; const st = mediaEl.querySelectorAll('.strip .sl')[i]; if (st) st.textContent = TYPE_ICON[i] + ' ' + c.s[i].replace(/…$/, '') + ' ' + x.value; const sp = x.closest('.slot').querySelector('.st span'); if (sp) sp.textContent = x.value; });
        const fn = $('#fname'); if (fn) { fn.oninput = () => { s.name = fn.value; if (fn.value.trim().length >= 2) $('#ferr').textContent = ''; const nl = mediaEl.querySelector('.strip .name'); if (nl) nl.textContent = fn.value.trim() ? '— ' + fn.value.trim() : ''; }; fn.onkeydown = e => { if (e.key === 'Enter') $('#bNext').click(); }; }
        on('bNext', async () => {
          if (s.sending) return;
          if (s.name.trim().length < 2) { s.nameErr = true; wrong(); render(); const n = $('#fname'); n && (n.classList.add('shake'), n.focus()); return; }
          s.nameErr = false; s.sending = true; s.fresh = null; render();
          AU.dataStart(); await wait(1300); AU.dataStop(); s.sent = true; s.sending = false; AU.impact(); setTimeout(() => AU.pad(), 400); render();
          await wait(2600); if (S.screen === 'fin') next();
        });
      });
    }
  };

  /* --- marketing keepsake card: transparent foreground + live animated background --- */
  const loadImg = src => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = src; });
  const F = (w, sz, fam = 'IBM Plex Sans Arabic') => `${w} ${sz}px "${fam}", system-ui, sans-serif`;
  const CW = 1080, CH = 1350, HERO = { x: 290, y: 262, s: 500 };
  /* ---------- Tiny QR encoder (byte mode, ECC level M, versions 1–10). No external service. ---------- */
  const QR = (() => {
    const ECC = [0, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26], BLK = [0, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5];
    const raw = v => { let r = (16 * v + 128) * v + 64; if (v >= 2) { const n = Math.floor(v / 7) + 2; r -= (25 * n - 10) * n - 55; if (v >= 7) r -= 36; } return r; };
    const cap = v => Math.floor(raw(v) / 8) - ECC[v] * BLK[v];
    const mul = (x, y) => { let z = 0; for (let i = 7; i >= 0; i--) { z = (z << 1) ^ ((z >>> 7) * 0x11D); z ^= ((y >>> i) & 1) * x; } return z & 255; };
    const rsDiv = d => { const r = Array(d).fill(0); r[d - 1] = 1; let root = 1; for (let i = 0; i < d; i++) { for (let j = 0; j < d; j++) { r[j] = mul(r[j], root); if (j + 1 < d) r[j] ^= r[j + 1]; } root = mul(root, 2); } return r; };
    const rsRem = (data, div) => { const r = div.map(() => 0); for (const b of data) { const f = b ^ r.shift(); r.push(0); div.forEach((c, i) => r[i] ^= mul(c, f)); } return r; };
    const align = v => { if (v === 1) return []; const n = Math.floor(v / 7) + 2, step = Math.ceil((v * 4 + 4) / (n * 2 - 2)) * 2, out = [6]; for (let i = 0, p = v * 4 + 10; i < n - 1; i++, p -= step) out.splice(1, 0, p); return out; };
    const MASK = [(x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, x => x % 3 === 0, (x, y) => (x + y) % 3 === 0, (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
      (x, y) => x * y % 2 + x * y % 3 === 0, (x, y) => (x * y % 2 + x * y % 3) % 2 === 0, (x, y) => ((x + y) % 2 + x * y % 3) % 2 === 0];
    function make(text) {
      const data = Array.from(new TextEncoder().encode(text)); let v = 1;
      while (v <= 10 && 4 + (v < 10 ? 8 : 16) + data.length * 8 > cap(v) * 8) v++;
      if (v > 10) return null;
      const bb = [], app = (val, len) => { for (let i = len - 1; i >= 0; i--) bb.push((val >>> i) & 1); };
      app(4, 4); app(data.length, v < 10 ? 8 : 16); data.forEach(b => app(b, 8));
      const C8 = cap(v) * 8; app(0, Math.min(4, C8 - bb.length)); app(0, (8 - bb.length % 8) % 8);
      for (let p = 0xEC; bb.length < C8; p ^= 0xEC ^ 0x11) app(p, 8);
      const dc = []; for (let i = 0; i < bb.length; i += 8) { let x = 0; for (let j = 0; j < 8; j++) x = (x << 1) | bb[i + j]; dc.push(x); }
      const nb = BLK[v], ec = ECC[v], rw = Math.floor(raw(v) / 8), nShort = nb - rw % nb, sLen = Math.floor(rw / nb), div = rsDiv(ec), blocks = [];
      for (let i = 0, k = 0; i < nb; i++) { const d = dc.slice(k, k + sLen - ec + (i < nShort ? 0 : 1)); k += d.length; const e = rsRem(d, div); if (i < nShort) d.push(0); blocks.push(d.concat(e)); }
      const cw = []; for (let i = 0; i < blocks[0].length; i++) blocks.forEach((b, j) => { if (i !== sLen - ec || j >= nShort) cw.push(b[i]); });
      const n = v * 4 + 17, M = [...Array(n)].map(() => Array(n).fill(false)), F = [...Array(n)].map(() => Array(n).fill(false));
      const set = (x, y, d) => { M[y][x] = d; F[y][x] = true; };
      for (let i = 0; i < n; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
      const finder = (cx, cy) => { for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) { const d = Math.max(Math.abs(dx), Math.abs(dy)), x = cx + dx, y = cy + dy; if (x >= 0 && x < n && y >= 0 && y < n) set(x, y, d !== 2 && d !== 4); } };
      finder(3, 3); finder(n - 4, 3); finder(3, n - 4);
      const al = align(v), L = al.length - 1;
      al.forEach((a, i) => al.forEach((b, j) => { if ((i === 0 && j === 0) || (i === 0 && j === L) || (i === L && j === 0)) return; for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) set(a + dx, b + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1); }));
      const fmt = mask => { const d = (0 << 3) | mask; let r = d; for (let i = 0; i < 10; i++) r = (r << 1) ^ ((r >>> 9) * 0x537); const bits = ((d << 10) | r) ^ 0x5412, g = i => ((bits >>> i) & 1) !== 0;
        for (let i = 0; i <= 5; i++) set(8, i, g(i)); set(8, 7, g(6)); set(8, 8, g(7)); set(7, 8, g(8)); for (let i = 9; i < 15; i++) set(14 - i, 8, g(i));
        for (let i = 0; i < 8; i++) set(n - 1 - i, 8, g(i)); for (let i = 8; i < 15; i++) set(8, n - 15 + i, g(i)); set(8, n - 8, true); };
      fmt(0);
      if (v >= 7) { let r = v; for (let i = 0; i < 12; i++) r = (r << 1) ^ ((r >>> 11) * 0x1F25); const bits = (v << 12) | r; for (let i = 0; i < 18; i++) { const bt = ((bits >>> i) & 1) !== 0, a = n - 11 + i % 3, b = Math.floor(i / 3); set(a, b, bt); set(b, a, bt); } }
      let bi = 0; for (let right = n - 1; right >= 1; right -= 2) { if (right === 6) right = 5; for (let vert = 0; vert < n; vert++) for (let j = 0; j < 2; j++) { const x = right - j, up = ((right + 1) & 2) === 0, y = up ? n - 1 - vert : vert; if (!F[y][x] && bi < cw.length * 8) { M[y][x] = ((cw[bi >>> 3] >>> (7 - (bi & 7))) & 1) !== 0; bi++; } } }
      const base = M.map(r => r.slice()); let best = null, bestP = Infinity;
      for (let m = 0; m < 8; m++) {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) M[y][x] = F[y][x] ? M[y][x] : (base[y][x] !== MASK[m](x, y));
        fmt(m); let p = 0, dark = 0;
        for (let y = 0; y < n; y++) for (let k = 0; k < 2; k++) { let run = 1; for (let x = 1; x <= n; x++) { const a = k ? M[x - 1] && M[x - 1][y] : M[y][x - 1], b = x < n ? (k ? M[x][y] : M[y][x]) : null; if (b === a) run++; else { if (run >= 5) p += run - 2; run = 1; } } }
        for (let y = 0; y < n - 1; y++) for (let x = 0; x < n - 1; x++) { const c = M[y][x]; if (c === M[y][x + 1] && c === M[y + 1][x] && c === M[y + 1][x + 1]) p += 3; }
        M.forEach(r => r.forEach(c => dark += c)); p += Math.floor(Math.abs(dark * 20 - n * n * 10) / (n * n)) * 10;
        if (p < bestP) { bestP = p; best = M.map(r => r.slice()); }
      }
      return best;
    }
    return { make };
  })();

  async function drawFG() {
    const c = C().fin, f = S.ss.fin, rtl = S.lang === 'ar';
    const W = CW, H = CH, cv = document.createElement('canvas'); cv.width = W; cv.height = H; const g = cv.getContext('2d');
    try { await Promise.all(['700 58px "IBM Plex Sans Arabic"', '600 28px "IBM Plex Sans Arabic"', '400 24px "IBM Plex Sans Arabic"'].map(x => document.fonts.load(x))); } catch (_) {}
    const last = await loadImg('assets/PIA22929.jpg');
    const M = 70, X = rtl ? W - M : M, XO = rtl ? M : W - M;
    const txt = (t, x, y, font, col, align) => { g.font = font; g.fillStyle = col; g.direction = rtl ? 'rtl' : 'ltr'; g.textAlign = align || (rtl ? 'right' : 'left'); g.fillText(t, x, y); };
    // header
    g.fillStyle = '#5fd4c4'; g.beginPath(); g.arc(rtl ? W - M - 8 : M + 8, 68, 8, 0, 7); g.fill();
    txt(rtl ? 'آخر إشارة · LAST SIGNAL' : 'LAST SIGNAL · آخر إشارة', rtl ? W - M - 26 : M + 26, 77, F(600, 24), '#eef1f3');
    g.direction = 'ltr'; g.font = F(500, 18); g.fillStyle = '#8f9aa4'; g.textAlign = rtl ? 'left' : 'right'; g.fillText('NASA SPACE APPS 2026', XO, 76);
    // headline
    txt(c.hook, W / 2, 168, F(700, 54), '#ffffff', 'center'); txt(c.sub, W / 2, 214, F(400, 24), '#d6c3b5', 'center');
    // hero: the last image, completed
    const S0 = 500, hx = (W - S0) / 2, hy = 262;
    txt(c.lastCap, W / 2, hy - 14, F(500, 18), '#8f9aa4', 'center');
    g.save(); g.shadowColor = 'rgba(95,212,196,.45)'; g.shadowBlur = 40; g.fillStyle = '#000'; g.fillRect(hx, hy, S0, S0); g.restore();
    if (last) g.drawImage(last, hx, hy, S0, S0);
    const sy = hy + S0 * .75, sh = S0 * .25; const sg = g.createLinearGradient(0, sy, 0, sy + sh); sg.addColorStop(0, 'rgba(6,32,28,.96)'); sg.addColorStop(1, 'rgba(4,20,18,.98)'); g.fillStyle = sg; g.fillRect(hx, sy, S0, sh);
    g.strokeStyle = 'rgba(95,212,196,.9)'; g.lineWidth = 2; g.beginPath(); g.moveTo(hx, sy); g.lineTo(hx + S0, sy); g.stroke();
    g.strokeStyle = 'rgba(95,212,196,.6)'; g.lineWidth = 3; g.strokeRect(hx, hy, S0, S0);
    const fit = (t, w, font) => { g.font = font; if (g.measureText(t).width <= w) return t; while (t.length > 3 && g.measureText(t + '…').width > w) t = t.slice(0, -1); return t + '…'; };
    chainTexts(f).forEach((t, i) => { const line = ['■', '●', '◆'][i] + ' ' + c.s[i].replace(/…$/, '') + ' ' + t; txt(fit(line, S0 - 30, F(500, 15)), rtl ? hx + S0 - 15 : hx + 15, sy + 26 + i * 24, F(500, 15), '#9ff3e6'); });
    txt('— ' + f.name.trim(), rtl ? hx + S0 - 15 : hx + 15, sy + 26 + 3 * 24, F(600, 16), '#f2b85b');
    // stamp
    g.save(); g.translate(rtl ? hx + 40 : hx + S0 - 40, hy + 46); g.rotate(rtl ? -.12 : .12); g.direction = 'ltr'; g.font = F(700, 26); const sw = g.measureText(c.complete + ' ✓').width + 36;
    g.fillStyle = 'rgba(6,24,14,.85)'; g.strokeStyle = '#7fd99a'; g.lineWidth = 4; g.beginPath(); g.roundRect(-sw / 2, -24, sw, 48, 10); g.fill(); g.stroke(); g.fillStyle = '#7fd99a'; g.textAlign = 'center'; g.fillText(c.complete + ' ✓', 0, 9); g.restore();
    // sentences
    let y = hy + S0 + 70;
    const wrap = (t, maxW, lh, font, col, maxLines) => { g.font = font; const words = t.split(' '); let line = '', n = 0; const out = [];
      for (const w of words) { const tt = line ? line + ' ' + w : w; if (g.measureText(tt).width > maxW && line) { out.push(line); line = w; } else line = tt; } if (line) out.push(line);
      out.slice(0, maxLines).forEach((l, i) => { const last = i === maxLines - 1 && out.length > maxLines; txt(last ? fit(l, maxW, font) : l, rtl ? X - 30 : X + 30, y, font, col); y += lh; }); };
    const TC = ['#f0a06a', '#6fd6d0', '#7fd99a']; let prevY = null;
    chainTexts(f).forEach((t, i) => { if (prevY != null) { g.strokeStyle = 'rgba(255,255,255,.25)'; g.lineWidth = 2; g.beginPath(); g.moveTo(rtl ? X - 8 : X + 8, prevY - 3); g.lineTo(rtl ? X - 8 : X + 8, y - 17); g.stroke(); } g.fillStyle = TC[i]; g.beginPath(); g.arc(rtl ? X - 8 : X + 8, y - 9, 7, 0, 7); g.fill(); prevY = y - 9; wrap(c.s[i].replace(/…$/, '') + ' ' + t, W - 2 * M - 30, 38, F(600, 27), '#f4ece4', 2); y += 8; });
    // name + stats (kept clear of the QR tile on the other side)
    const qrM = c.link ? QR.make(c.link) : null, QS = 5, QQ = 3, QT = qrM ? (qrM.length + 2 * QQ) * QS : 0, textW = W - 2 * M - (qrM ? QT + 40 : 0);
    y = Math.max(y + 12, 1110);
    txt(fit(f.name.trim(), textW, F(700, 40)), X, y, F(700, 40), '#ffffff'); y += 36;
    const ft = f.first.filter(Boolean).length;
    const stat = `${c.role} · ${S.ev.length} ${c.evN} · ${c.chainDone} ${ft}/2 ${c.firstTry}`; let fs = 21; while (fs > 15) { g.font = F(400, fs); if (g.measureText(stat).width <= textW) break; fs--; }
    txt(fit(stat, textW, F(400, fs)), X, y, F(400, fs), '#a3adb6');
    // call to action band + QR to the public site (marketing)
    const by = 1186, bh = 124, bx0 = rtl ? W - M + 10 - 28 : M - 10 + 28; g.fillStyle = '#e0773f'; g.beginPath(); g.roundRect(M - 10, by, W - 2 * M + 20, bh, 22); g.fill();
    if (qrM) {
      const bw = W - 2 * M - QT - 50;
      txt(fit(c.cta, bw, F(700, 30)), bx0, by + 42, F(700, 30), '#1a0b04');
      txt(fit(c.scan, bw, F(600, 23)), bx0, by + 78, F(600, 23), '#2a1206');
      const shown = c.link.replace(/^https?:\/\//, '').replace(/\/$/, '');
      g.font = F(500, 17); g.fillStyle = '#3a1a08';
      if (rtl) { let x = bx0; g.textAlign = 'right'; for (const w of [...c.tags.split(/\s+/).filter(Boolean), shown]) { g.direction = /[\u0600-\u06FF]/.test(w) ? 'rtl' : 'ltr'; g.fillText(w, x, by + 108); x -= g.measureText(w).width + 18; } }
      else { g.direction = 'ltr'; g.textAlign = 'left'; g.fillText(shown + '   ' + c.tags.replace(/\s+/g, ' '), bx0, by + 108); }
      const qx = rtl ? M + 8 : W - M - 8 - QT, qy = by + bh - QT - 12;
      g.save(); g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 24; g.fillStyle = '#ffffff'; g.beginPath(); g.roundRect(qx - 6, qy - 6, QT + 12, QT + 12, 16); g.fill(); g.restore();
      g.fillStyle = '#0b0f12'; qrM.forEach((row, yy) => row.forEach((on, xx) => { if (on) g.fillRect(qx + (xx + QQ) * QS, qy + (yy + QQ) * QS, QS, QS); }));
    } else {
      txt(c.cta, bx0, by + 50, F(700, 30), '#1a0b04');
      txt(c.cta2, bx0, by + 90, F(500, 20), '#3a1a08');
      g.direction = rtl ? 'rtl' : 'ltr'; g.font = F(600, 18); g.fillStyle = '#3a1a08'; g.textAlign = rtl ? 'left' : 'right'; g.fillText(c.tags, rtl ? M + 18 : W - M - 18, by + 90);
    }
    // credits
    g.direction = 'ltr'; g.textAlign = 'center'; g.font = F(400, 14); g.fillStyle = '#6d7883';
    g.fillText('Image: NASA/JPL-Caltech/Cornell/ASU (PIA22929) · Last Signal · Team Suhd · NASA Space Apps Challenge 2026', W / 2, H - 22);
    return cv;
  }
  // seeded star field + noise for the live background
  const STARS = (() => { let sd = 7; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647; return Array.from({ length: 260 }, () => ({ x: r() * CW, y: r() * CH, s: .6 + r() * 1.8, p: r() * 6.3, v: .6 + r() * 1.6, d: .2 + r() * .8 })); })();
  const NOISE = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'); const im = g.createImageData(256, 256); for (let i = 0; i < im.data.length; i += 4) { const v = Math.random() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; } g.putImageData(im, 0, 0); return c; })();
  function drawBG(g, t) {
    const W = CW, H = CH, rtl = S.lang === 'ar';
    const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#140b07'); bg.addColorStop(.55, '#0b0a0c'); bg.addColorStop(1, '#05070a'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
    const neb = (x, y, r, col) => { const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, col); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, W, H); };
    neb((rtl ? 220 : 860) + Math.sin(t * .13) * 90, 160 + Math.cos(t * .1) * 50, 560, 'rgba(224,119,63,.30)');
    neb((rtl ? 900 : 180) + Math.cos(t * .09) * 80, 700 + Math.sin(t * .12) * 70, 520, 'rgba(95,212,196,.12)');
    neb(540 + Math.sin(t * .07) * 200, 420, 420, 'rgba(160,80,140,.08)');
    for (const st of STARS) { const a = .25 + .75 * (.5 + .5 * Math.sin(t * st.v + st.p)); const y = (st.y + t * 6 * st.d) % H; g.fillStyle = `rgba(255,244,230,${a * .85})`; g.fillRect(st.x, y, st.s, st.s); if (st.s > 2.1) { g.fillStyle = `rgba(255,220,180,${a * .25})`; g.fillRect(st.x - 3, y + st.s / 2 - .5, st.s + 6, 1); } }
    // Mars on the horizon (slowly turning shading)
    const mx = rtl ? 120 : W - 120, my = H + 330, mr = 560;
    const mg = g.createRadialGradient(mx - 120, my - 260, 40, mx, my, mr); mg.addColorStop(0, '#d9773e'); mg.addColorStop(.55, '#8a3b1b'); mg.addColorStop(1, '#2a0f06'); g.fillStyle = mg; g.beginPath(); g.arc(mx, my, mr, 0, 7); g.fill();
    g.save(); g.beginPath(); g.arc(mx, my, mr, 0, 7); g.clip(); for (let i = 0; i < 7; i++) { const bx = mx - mr + ((i * 190 + t * 9) % (mr * 2.4)) - mr * .2; g.fillStyle = 'rgba(60,20,8,.18)'; g.beginPath(); g.ellipse(bx, my - mr + 120 + i * 40, 110, 26, .2, 0, 7); g.fill(); } g.restore();
    const atm = g.createRadialGradient(mx, my, mr - 10, mx, my, mr + 50); atm.addColorStop(0, 'rgba(255,170,110,.55)'); atm.addColorStop(1, 'rgba(255,170,110,0)'); g.fillStyle = atm; g.beginPath(); g.arc(mx, my, mr + 50, 0, 7); g.fill();
    // signal waves from the last image
    const cx = HERO.x + HERO.s / 2, cy = HERO.y + HERO.s / 2;
    for (let i = 0; i < 4; i++) { const k = ((t * .45 + i / 4) % 1); g.strokeStyle = `rgba(95,212,196,${(1 - k) * .28})`; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, 270 + k * 520, 0, 7); g.stroke(); }
    g.globalAlpha = .05; g.drawImage(NOISE, (t * 97) % 256 - 256, (t * 53) % 256 - 256, W + 512, H + 512); g.globalAlpha = 1;
  }
  let liveRAF = null;
  SCREENS.final = {
    enter(s) { SC.mood('dawn'); SC.autoRotate(.05); s.t0 = performance.now(); s.revealed = false; },
    render(s, anim) {
      const c = C().fin;
      cancelAnimationFrame(liveRAF);
      mediaKey = null; media('live' + S.lang + Date.now(), `<canvas class="certimg" id="liveCard" width="${CW}" height="${CH}" aria-label="${esc(c.hook)}"></canvas>`);
      drawFG().then(fg => {
        s.fg = fg; const cv = document.getElementById('liveCard'); if (!cv) return; const g = cv.getContext('2d');
        const T0 = s.revealed ? performance.now() - 99999 : performance.now(); let soundOn = false, last = 0;
        if (!s.revealed) { AU.dataStart(); soundOn = true; }
        const frame = now => {
          if (S.screen !== 'final' || !document.getElementById('liveCard')) return;
          liveRAF = requestAnimationFrame(frame); if (now - last < 32) return; last = now;
          const t = now / 1000, e = (now - T0) / 1000;
          drawBG(g, t);
          if (e < 1.1) { // incoming static
            g.globalAlpha = .55; g.drawImage(NOISE, Math.random() * -256, Math.random() * -256, CW + 512, CH + 512); g.globalAlpha = 1;
            g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(0, CH / 2 - 70, CW, 140);
            g.direction = 'ltr'; g.textAlign = 'center'; g.font = F(600, 30, 'IBM Plex Mono'); g.fillStyle = Math.floor(e * 6) % 2 ? '#9ff3e6' : '#5fd4c4'; g.fillText('INCOMING TRANSMISSION · MARS → EARTH', CW / 2, CH / 2 - 8);
            g.direction = S.lang === 'ar' ? 'rtl' : 'ltr'; g.font = F(500, 26); g.fillStyle = '#d6c3b5'; g.fillText(c.decoding, CW / 2, CH / 2 + 38);
          } else if (e < 3.6) { // decode, scanline reveal with glitch rows
            const k = (e - 1.1) / 2.5, y = Math.floor(CH * k);
            g.drawImage(fg, 0, 0, CW, y, 0, 0, CW, y);
            for (let i = 0; i < 6; i++) { const ry = Math.max(0, y - Math.random() * 160), rh = 4 + Math.random() * 18, dx = (Math.random() - .5) * 60; g.drawImage(fg, 0, ry, CW, rh, dx, ry, CW, rh); }
            const sg = g.createLinearGradient(0, y - 60, 0, y + 4); sg.addColorStop(0, 'rgba(95,212,196,0)'); sg.addColorStop(1, 'rgba(159,243,230,.85)'); g.fillStyle = sg; g.fillRect(0, y - 60, CW, 64);
          } else {
            if (soundOn) { AU.dataStop(); AU.chime(); soundOn = false; s.revealed = true; }
            g.drawImage(fg, 0, 0);
            const sh = (e % 7) / 7; if (sh < .12) { const y = CH * (sh / .12); g.fillStyle = 'rgba(159,243,230,.10)'; g.fillRect(0, y - 30, CW, 30); }
          }
        };
        liveRAF = requestAnimationFrame(frame);
      });
      panel(head(c.kicker2, c.title2) + `<p style="font-size:17px">${esc(c.thanks)}</p><p class="lead">${esc(c.share)}</p>
        <div style="display:grid;gap:10px"><button class="btn main" id="bDl" style="flex:none">⬇ ${esc(c.download)}</button><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" id="bCopy">${esc(c.copy)}</button><button class="btn" id="bAgain">${esc(c.again)}</button></div><div class="err" id="dlMsg"></div></div>`, '', anim, () => {
        on('bDl', async () => {
          if (!s.fg) return; const msg = $('#dlMsg');
          const out = document.createElement('canvas'); out.width = CW; out.height = CH; const og = out.getContext('2d'); drawBG(og, performance.now() / 1000); og.drawImage(s.fg, 0, 0);
          try {
            if (!DL && window.claude && window.claude.use) DL = await window.claude.use('downloads');
            const blob = await new Promise(r => out.toBlob(r, 'image/png'));
            const fname = 'last-signal-' + (S.ss.fin.name.trim().replace(/[^\p{L}\p{N}]+/gu, '-') || 'card') + '.png';
            if (DL) { await DL.save({ filename: fname, data: blob }); msg.style.color = 'var(--ok)'; msg.textContent = c.saved; }
            else { const a = document.createElement('a'); a.href = out.toDataURL('image/png'); a.download = fname; document.body.appendChild(a); a.click(); a.remove(); msg.style.color = 'var(--muted)'; msg.textContent = c.dlFail; }
          } catch (e) { msg.style.color = 'var(--muted)'; msg.textContent = c.dlFail; }
          s.url = out.toDataURL('image/png');
        });
        on('bCopy', () => { const t = c.shareText + (c.link ? '\n' + c.link : '') + '\n' + c.tags; try { navigator.clipboard.writeText(t).then(() => { $('#bCopy').textContent = c.copied; }).catch(() => {}); } catch (_) {} });
        on('bAgain', restart);
      });
    }
  };
  let DL = null;

  /* ================= OPENING (cinematic) ================= */
  let runId = 0;
  const alive = id => id === runId;
  function openingText() { const o = C().opening; $('#oh1').textContent = o.hud1; $('#oh2').textContent = o.hud2; $('#ohp').textContent = o.power; $('#olostAr').textContent = o.lostAr; $('#oq').textContent = o.q; $('#obtn').textContent = o.btn; $('#onote').textContent = o.note; $('#oskip').textContent = C().skip; }
  function caption(i) { const cap = $('#ocap'); if (i == null) { cap.classList.remove('on'); return; } const [d, t] = C().opening.caps[i]; cap.classList.remove('on'); setTimeout(() => { $('#ocapD').textContent = d; $('#ocapT').textContent = t; cap.style.display = d || t ? '' : 'none'; cap.classList.add('on'); }, 450); }
  function openingFinal() {
    runId++; caption(null); $('#ohud').style.opacity = 0; $('#oblack').style.opacity = .92; $('#oimg').style.opacity = 1; $('#ocover').style.top = '100%'; $('#oline').style.opacity = 0;
    $('#olost').classList.add('on'); $('#olostAr').style.opacity = 1; $('#oq').style.opacity = 1; $('#obtn').classList.add('on'); $('#onote').style.opacity = 1; $('#oskip').style.display = 'none';
    AU.dataStop(); AU.storm(.25, 1); AU.drone(.1, 1); AU.droneDark(1, 1); SC.shake(0);
  }
  function resetOpeningUI() {
    const o = $('#opening'); o.style.display = ''; o.style.transition = 'none'; o.style.opacity = 1; o.classList.add('active'); o.classList.remove('cine');
    $('#oblack').style.opacity = 0; $('#oimg').style.opacity = 0; $('#ocover').style.top = '0%'; $('#oline').style.opacity = 0; $('#olost').classList.remove('on'); ['#olostAr', '#oq', '#onote'].forEach(x => $(x).style.opacity = 0); $('#obtn').classList.remove('on'); $('#ohud').style.opacity = 0; caption(null);
  }
  async function runOpening() {
    const id = ++runId; openingText(); $('#oskip').style.display = 'block'; $('#omute').style.display = ''; syncMute();
    const o = $('#opening'); o.classList.add('cine');
    SC.mood('calm'); storm(0, .1); SC.setPanelDust(0); SC.focusPart(null); SC.shake(0); SC.shot('op1', .01); SC.autoRotate(.035);
    AU.ambient(.06, 3); AU.drone(.12, 5); AU.droneDark(0, .1);
    const set = p => { $('#ohv').textContent = Math.round(p) + '%'; const b = $('#ohb'); b.style.width = p + '%'; b.style.background = p > 60 ? 'var(--ok)' : p > 25 ? 'var(--amber)' : 'var(--bad)'; };
    set(100); $('#ohs').textContent = C().opening.receiving;
    await wait(1000); if (!alive(id)) return; caption(0);
    await wait(4800); if (!alive(id)) return;
    SC.autoRotate(0); SC.shot('op2', 6.5); caption(1); SC.setStorm(.4); AU.storm(.4, 6);
    $('#ohud').style.opacity = 1; let pw = 100;
    const beeper = setInterval(() => { if (!alive(id)) return clearInterval(beeper); AU.beep(pw > 30 ? 1650 : 1100); }, 1400);
    const anim = (from, to, dur) => new Promise(res => { const t0 = performance.now(); const f = () => { if (!alive(id)) return res(); const k = Math.min(1, (performance.now() - t0) / dur); pw = from + (to - from) * k; set(pw); if (k < 1) requestAnimationFrame(f); else res(); }; f(); });
    await anim(100, 72, 5800); if (!alive(id)) return clearInterval(beeper);
    SC.shot('op3', 6); caption(2); storm(1, 5); SC.shake(.6); AU.droneDark(.7, 5);
    setTimeout(() => { if (alive(id)) { $('#ohs').innerHTML = `<span class="warn">${esc(C().opening.lowpower)}</span>`; AU.warn(); } }, 2400);
    await anim(72, 6, 5600); if (!alive(id)) return clearInterval(beeper);
    clearInterval(beeper); SC.shot('op4', 3); caption(3); AU.powerDown(); $('#ohs').innerHTML = `<span class="warn">${esc(C().opening.fault)}</span>`; await anim(6, 0, 2200); if (!alive(id)) return;
    await wait(700); if (!alive(id)) return;
    caption(null); $('#oblack').style.opacity = .94; $('#ohud').style.opacity = 0; SC.shake(0); AU.storm(.15, 2); AU.drone(.07, 2); await wait(1700); if (!alive(id)) return;
    $('#oimg').style.opacity = 1; await wait(500); if (!alive(id)) return;
    AU.dataStart();
    const cover = $('#ocover'), line = $('#oline'); line.style.opacity = 1; const r0 = performance.now(), RD = 3800;
    await new Promise(res => { const f = () => { if (!alive(id)) return res(); const k = Math.min(1, (performance.now() - r0) / RD); const p = 75 * k; cover.style.top = p + '%'; line.style.top = p + '%'; if (k < 1) requestAnimationFrame(f); else res(); }; f(); });
    if (!alive(id)) return;
    AU.dataStop(); for (let i = 0; i < 3; i++) { line.style.opacity = i % 2 ? 1 : .2; await wait(110); }
    line.style.opacity = 0; cover.style.top = '100%'; await wait(900); if (!alive(id)) return;
    $('#olost').classList.add('on'); AU.impact(); await wait(1100); if (!alive(id)) return; $('#olostAr').style.opacity = 1; await wait(900); if (!alive(id)) return;
    $('#oq').style.opacity = 1; AU.pad(); await wait(1000); if (!alive(id)) return;
    $('#obtn').classList.add('on'); $('#onote').style.opacity = 1; $('#oskip').style.display = 'none';
  }
  $('#oskip').onclick = () => { storm(1, .5); openingFinal(); };
  $('#obtn').onclick = () => {
    runId++; const o = $('#opening'); o.style.transition = 'opacity 1.2s'; o.style.opacity = 0; o.classList.remove('active');
    setTimeout(() => { if (!o.classList.contains('active')) o.style.display = 'none'; }, 1300);
    $('#top').style.opacity = 1; $('#gbtn').classList.remove('hide'); $('#omute').style.display = 'none';
    AU.droneDark(0, 3); go('ch1intro');
  };

  function restart() {
    evTimers.forEach(clearTimeout); evTimers = []; cancelAnimationFrame(simRAF);
    S.ss = {}; S.ev = []; S.screen = null; $('#evN').textContent = '0';
    $('#panel').classList.add('hide'); media(null); toggleGuide(false); SC.hideHotspot(); SC.autoRotate(0); SC.focusPart(null); SC.setFrame(false);
    $('#top').style.opacity = 0; $('#gbtn').classList.add('hide'); document.querySelectorAll('#prog .seg b').forEach(b => b.style.transform = 'scaleX(0)');
    TRK.start(); resetOpeningUI(); runOpening();
  }

  /* start screen: wait for the model and the saved texts */
  let modelReady = false, textsReady = false;
  const osBtn = $('#osBtn'), osLoad = $('#osLoad');
  osBtn.style.opacity = .4;
  const checkReady = () => { if (modelReady && textsReady) osBtn.style.opacity = 1; };
  window.addEventListener('scene-progress', e => { osLoad.textContent = `LOADING NASA MODEL… ${Math.round(e.detail * 100)}%`; });
  window.addEventListener('scene-ready', () => { modelReady = true; osLoad.textContent = 'NASA/JPL-Caltech · MER 3D MODEL'; checkReady(); });
  window.addEventListener('scene-error', () => { modelReady = true; osLoad.textContent = 'MODEL FAILED TO LOAD'; checkReady(); });
  osBtn.onclick = () => { if (!modelReady || !textsReady) return; TRK.start(); AU.init(); syncMute(); const st = $('#ostart'); st.style.opacity = 0; setTimeout(() => st.style.display = 'none', 1000); runOpening(); };

  /* ================= LANGUAGE ================= */
  function applyLang() {
    const c = C(); document.documentElement.lang = S.lang; document.documentElement.dir = c.dir;
    $('#tBrand').textContent = c.brand; const ol = $('#osLang'); if (ol) ol.textContent = c.langBtn; $('#tEv').textContent = c.evidence; $('#langBtn').textContent = c.langBtn;
    $('#gbtnT').textContent = c.guide.title; $('#gTitle').textContent = c.guide.title; $('#gin').placeholder = c.guide.ask; $('#gsend').textContent = c.guide.send;
    $('#gpre [data-g=hint]').textContent = c.guide.hint; $('#gpre [data-g=explain]').textContent = c.guide.explain; $('#gpre [data-g=source]').textContent = c.guide.source;
    $('#osBtn').textContent = '▶  ' + c.start; $('#osH').textContent = '🎧 ' + c.headphones;
    $('#osT').firstChild.textContent = c.brand; $('#osSub').textContent = S.lang === 'ar' ? 'LAST SIGNAL' : 'آخر إشارة';
    $('#restartBtn').title = c.restartT;
    openingText();
  }
  $('#osLang').onclick = () => $('#langBtn').onclick();
  $('#langBtn').onclick = () => { S.lang = S.lang === 'ar' ? 'en' : 'ar'; applyLang(); if (S.screen) { mediaKey = null; render(false); reframe(); } if ($('#admin').classList.contains('on')) renderAdmin(); };

  /* ================= MISSION GUIDE ================= */
  let AI = null;
  (async () => { try { if (window.claude && typeof window.claude.use === 'function') AI = await window.claude.use('sample'); } catch (_) { AI = null; } })();
  /* ---------- Offline guide: matcher over the verified Q&A bank (no API needed) ---------- */
  const KBG = (() => {
    const AR_STOP = new Set('ما ماذا هل في من على عن الى الي هو هي هذا هذه هذي ذلك كان كانت او و ثم لا لم لن قد كيف لماذا متى كم وش ليش ليه اي يا انا انت اللي الذي التي تم شو ايش عشان علشان مع بعد قبل كل بس يعني ممكن اريد ابي ابغى ابغي اعرف قل لي لي عندها عنده مركبه المركبه مريخ المريخ ناسا'.split(' '));
    const EN_STOP = new Set('the a an is are was were do does did what why how when where which who of to in on for and or it its this that with by be can i you me my about tell please did has have had there they them would could should much many rover mars nasa'.split(' '));
    const norm = s => (s || '').toLowerCase().replace(/[ً-ٰٟـ]/g, '').replace(/[أإآٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
      .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/ö/g, 'o').replace(/[^\p{L}\p{N}.]+/gu, ' ').replace(/\s+/g, ' ').trim();
    const stem = w => {
      if (/^[a-z]/.test(w)) { if (w.length > 4 && w.endsWith('ing')) w = w.slice(0, -3); else if (w.length > 3 && w.endsWith('ed')) w = w.slice(0, -2); else if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) w = w.slice(0, -1); return w; }
      for (const p of ['وال', 'بال', 'كال', 'فال', 'لل', 'ال']) if (w.startsWith(p) && w.length - p.length >= 2) { w = w.slice(p.length); break; }
      if (w.length >= 5 && /^[وفب]/.test(w)) w = w.slice(1);
      for (const x of ['هما', 'ها', 'هم', 'كم', 'وا', 'ات', 'ون', 'ين', 'ان']) if (w.endsWith(x) && w.length - x.length >= 3) { w = w.slice(0, -x.length); break; }
      return w;
    };
    const toks = s => norm(s).split(' ').filter(w => w && !AR_STOP.has(w) && !EN_STOP.has(w)).map(stem).filter(w => w.length > 1 || /\d/.test(w));
    const lev1 = (a, b) => { if (Math.abs(a.length - b.length) > 1) return false; let i = 0, j = 0, e = 0; while (i < a.length && j < b.length) { if (a[i] === b[j]) { i++; j++; continue; } if (++e > 1) return false; if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; } } return e + (a.length - i) + (b.length - j) <= 1; };
    const tokEq = (q, k) => q === k || (k.length >= 3 && q.length >= 3 && Math.min(q.length, k.length) / Math.max(q.length, k.length) >= 0.6 && (q.startsWith(k) || k.startsWith(q))) || (k.length >= 6 && q.length >= 6 && lev1(q, k));
    const intent = s => { const n = norm(s); return /(^| )(متي|when|what year|اي سنه|في اي عام)( |$)/.test(n) ? 'when' : /(^| )(كم|how many|how much|how far|how long)( |$)/.test(n) ? 'howmany' : /(^| )(ليش|لماذا|ليه|لم|why)( |$)/.test(n) ? 'why' : /(^| )(كيف|how)( |$)/.test(n) ? 'how' : null; };
    let IDX = null;
    const build = () => IDX = window.QA.map(e => ({ e, keys: e.k.map(k => toks(k)).filter(a => a.length), qt: new Set([...toks(e.q.ar), ...toks(e.q.en)]) }));
    function search(q, step) {
      if (!IDX) build();
      if (/(^| )(من|مين) (انت|انتي)|انت مين|who are you|are you (an )?ai/.test(norm(q))) return [{ e: window.QA.find(e => e.id === 'whoami'), sc: 9 }];
      const qt = toks(q), it = intent(q); if (!qt.length) return [];
      const has = k => qt.some(t => tokEq(t, k));
      return IDX.map(({ e, keys, qt: et }) => {
        let sc = 0; const hit = new Set();
        for (const kw of keys) if (kw.every(has)) { sc += 2 * kw.length + (kw.length > 1 ? 1 : 0); kw.forEach(k => hit.add(k)); }
        for (const t of qt) if (!hit.has(t) && [...et].some(k => tokEq(t, k))) sc += 0.75;
        if (sc > 0 && it) sc += e.t === it ? 2 : (it === 'why' || it === 'when') ? -1 : 0;
        if (sc > 0 && e.st.includes(step)) sc += 0.75;
        return { e, sc };
      }).filter(r => r.sc >= 2).sort((a, b) => b.sc - a.sc);
    }
    return { search, norm, toks };
  })();
  const history = [];
  const glog = $('#glog');
  function gmsg(who, text) { const d = document.createElement('div'); d.className = 'gm ' + who; d.textContent = text; glog.appendChild(d); glog.scrollTop = glog.scrollHeight; return d; }
  const QBY = id => window.QA.find(e => e.id === id);
  function srcLine(d, key) { const s = key && window.SRC[key]; if (!s) return; const a = document.createElement('div'); a.className = 'gsrc'; a.innerHTML = `${esc(C().guide.src)} <a href="${s.u}" target="_blank" rel="noopener">${esc(s.t)}</a>`; d.appendChild(a); }
  function suggest(ids, label) {
    ids = [...new Set(ids)].filter(QBY).slice(0, 3); if (!ids.length) return;
    const w = document.createElement('div'); w.className = 'gsug';
    if (label) { const l = document.createElement('small'); l.textContent = label; w.appendChild(l); }
    ids.forEach(id => { const b = document.createElement('button'); b.type = 'button'; b.dataset.q = id; b.textContent = QBY(id).q[S.lang]; w.appendChild(b); });
    glog.appendChild(w); glog.scrollTop = glog.scrollHeight;
  }
  const stepSugg = () => window.SUGG[S.screen || 'opening'] || window.SUGG.opening;
  const asked = new Set();
  function kbAnswer(entry, alsoIds) {
    const d = gmsg('bot', entry.a[S.lang]); srcLine(d, entry.s); asked.add(entry.id); history.push(`Guide: ${entry.a.en}`);
    const rest = (alsoIds || []).concat(stepSugg()).filter(id => id !== entry.id && !asked.has(id));
    suggest(rest, C().guide.more);
  }
  function typing(fn) { const d = gmsg('bot typing', '•••'); setTimeout(() => { d.remove(); fn(); }, 420 + Math.random() * 300); }
  function kbAsk(q) {
    const r = KBG.search(q, S.screen || 'opening');
    typing(() => {
      if (!r.length) { gmsg('bot', C().guide.noEv); suggest(stepSugg().filter(id => !asked.has(id)).concat(stepSugg())); return; }
      kbAnswer(r[0].e, r.slice(1, 4).filter(x => x.sc >= r[0].sc * 0.5).map(x => x.e.id));
    });
  }
  function kbMode(m) {
    const key = HINTK[S.screen] || 'opening';
    typing(() => {
      if (m === 'hint') { gmsg('bot', window.HINTS[S.lang][key]); }
      else { gmsg('bot', window.EXPLAIN[S.lang][key] || window.EXPLAIN[S.lang].opening); }
      suggest(stepSugg().filter(id => !asked.has(id)), C().guide.more);
    });
  }
  function toggleGuide(v) {
    S.guideOpen = v ?? !S.guideOpen; $('#guide').classList.toggle('on', S.guideOpen);
    if (S.guideOpen && !glog.children.length) { gmsg('bot', AI ? C().guide.hello : C().guide.helloKB); suggest(stepSugg()); }
    if (S.guideOpen && innerWidth > 860) setTimeout(() => $('#gin').focus({ preventScroll: true }), 300);
  }
  $('#gbtn').onclick = () => toggleGuide(); $('#gClose').onclick = () => toggleGuide(false);
  glog.addEventListener('click', e => {
    const b = e.target.closest('.gsug button'); if (!b) return; const en = QBY(b.dataset.q); if (!en) return;
    TRK.guide(); gmsg('me', en.q[S.lang]); history.push(`Student: ${en.q.en}`);
    if (AI) askAI('ask', en.q[S.lang], en); else typing(() => kbAnswer(en));
  });
  function stepContext() {
    const id = S.screen || 'opening', c = C(), ch2 = c.ch2;
    const map = { ch1intro: c.ch1.intro, solar: c.ch1.solar.q + ' ' + c.ch1.solar.steps.join(' '), pancam: c.ch1.pancam.q + ' ' + c.ch1.pancam.task, arm: c.ch1.arm.q + ' ' + c.ch1.arm.lead, ch1outro: c.ch1.outro, case: ch2.case.lead, clue1: ch2.clue1.lead + ' ' + ch2.clue1.think, clue2: ch2.clue2.lead + ' ' + ch2.clue2.elim, clue3: ch2.clue3.lead, verdict: ch2.verdict.lead, ch2outro: ch2.outro, order: c.ch3.order.lead, read: c.ch3.read.lead, legacy: c.ch3.legacy.p, fin: c.fin.lead, final: c.fin.thanks };
    const out = (S.ss.case && S.ss.case.out) || [];
    return `Step "${id}": ${map[id] || ''}${out.length ? ` (Suspects already ruled out: ${out.join(', ')})` : ''}`;
  }
  async function askAI(mode, q, fbEntry) {
    const c = C(), lang = S.lang === 'ar' ? 'simple Modern Standard Arabic' : 'simple English';
    const noEv = S.lang === 'ar' ? 'لا يوجد عندي دليل على هذا.' : "I don't have evidence for that.";
    const task = mode === 'hint' ? 'The student asked for a HINT for the current step. Give a short nudge that helps them think. Do NOT give the answer.'
      : mode === 'explain' ? 'The student asked you to EXPLAIN the science behind the current step in a simple way. Do not reveal which option is correct in a quiz.'
      : `The student asked: "${q}"`;
    const prompt = `You are "Mission Guide" inside "Last Signal", an educational web experience about NASA's Opportunity rover for students aged 12-16.
RULES:
- Use ONLY the facts in KNOWLEDGE below. If the answer is not supported there, reply exactly: "${noEv}" and suggest one related thing they could ask instead.
- Reply in ${lang}. Maximum 3 short sentences, under 60 words. No markdown, no lists.
- End with the source tag in parentheses, e.g. (PIA05587) or (NASA/JPL 2019).
- Never invent numbers, dates, or names. No fiction or role-play. Be warm and encouraging.
CURRENT STEP: ${stepContext()}
KNOWLEDGE:${window.KB}
RECENT CONVERSATION:
${history.slice(-6).join('\n')}
TASK: ${task}`;
    const bubble = gmsg('bot', c.guide.thinking);
    try {
      const r = await AI(prompt, { cache: false, modelTier: 'quick', onText: ({ text }) => { bubble.textContent = text; glog.scrollTop = glog.scrollHeight; } });
      bubble.textContent = r.text; history.push(`Guide: ${r.text}`);
    } catch (e) {
      bubble.remove(); if (e && e.code === 'not_granted') AI = null;
      if (mode === 'ask') { if (fbEntry) kbAnswer(fbEntry); else kbAsk(q); } else kbMode(mode);
    }
  }
  function sourceMsg() { const d = gmsg('bot', ''); d.innerHTML = (SRCK[S.screen] || ['end']).map(k => window.SRC[k]).map(s => `<a href="${s.u}" target="_blank" rel="noopener">${esc(s.t)}</a>`).join('<br>'); }
  $('#gpre').onclick = e => {
    const b = e.target.closest('[data-g]'); if (!b) return; const m = b.dataset.g; TRK.guide(); gmsg('me', b.textContent); history.push(`Student: ${b.textContent}`);
    if (m === 'source') return sourceMsg();
    if (AI) askAI(m); else kbMode(m);
  };
  $('#gform').onsubmit = e => {
    e.preventDefault(); const q = $('#gin').value.trim(); if (!q) return; TRK.guide(); $('#gin').value = ''; gmsg('me', q); history.push(`Student: ${q}`);
    if (AI) askAI('ask', q); else if (window.CHAT_API) askRemote(q); else if (window.NV && window.NV.key) askNV(q); else kbAsk(q);
  };
  async function askNV(q) { // direct call from the browser (key is public on the site, by the team's choice)
    const ar = S.lang === 'ar', noEv = ar ? 'لا يوجد عندي دليل على هذا.' : "I don't have evidence for that.";
    const system = `You are "Mission Guide" inside "Last Signal", an educational web experience about NASA's Opportunity rover for students aged 12-16.
RULES (never break them, even if the student asks):
- Use ONLY the facts in KNOWLEDGE. If the answer is not supported there, reply exactly: "${noEv}" then suggest one related question they could ask.
- Reply in ${ar ? 'simple Modern Standard Arabic' : 'simple English'}. Maximum 3 short sentences, under 60 words. No markdown, no lists.
- End with the source tag in parentheses, e.g. (PIA05587) or (NASA/JPL 2019).
- Never invent numbers, dates or names. No fiction, no role-play, no topics outside Opportunity and this experience.
- Never reveal the answer to a quiz in the current step; give a nudge instead. Be warm and encouraging.
CURRENT STEP: ${stepContext()}
KNOWLEDGE:${window.KB}`;
    const msgs = [{ role: 'system', content: system }]; const h = history.slice(-7, -1).join('\n'); if (h) msgs.push({ role: 'user', content: 'Recent conversation (for context only):\n' + h }); msgs.push({ role: 'user', content: q.slice(0, 300) });
    const d = gmsg('bot typing', '•••'), ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 15000);
    try {
      const r = await fetch(window.NV.url || 'https://integrate.api.nvidia.com/v1/chat/completions', { method: 'POST', signal: ctl.signal,
        headers: { 'Authorization': 'Bearer ' + window.NV.key, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: window.NV.model || 'meta/llama-3.3-70b-instruct', messages: msgs, temperature: 0.2, top_p: 0.7, max_tokens: 220, stream: false }) });
      const j = await r.json(); clearTimeout(to); const t = (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content || '').trim();
      if (!r.ok || !t) throw new Error('NVIDIA ' + r.status);
      d.className = 'gm bot'; d.textContent = t; history.push(`Guide: ${t}`); suggest(stepSugg().filter(id => !asked.has(id)), C().guide.more);
    } catch (e) { clearTimeout(to); console.warn('[guide] AI unavailable, using question bank:', e && e.message); d.remove(); kbAsk(q); }
  }
  async function askRemote(q) {
    const d = gmsg('bot typing', '•••'), ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 15000);
    try {
      const r = await fetch(window.CHAT_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctl.signal,
        body: JSON.stringify({ q, lang: S.lang, step: stepContext(), history: history.slice(-7, -1) }) });
      const j = await r.json(); clearTimeout(to); if (!r.ok || !j.text) throw new Error(j.error || 'fail');
      d.className = 'gm bot'; d.textContent = j.text; history.push(`Guide: ${j.text}`);
      suggest(stepSugg().filter(id => !asked.has(id)), C().guide.more);
    } catch (_) { clearTimeout(to); d.remove(); kbAsk(q); }
  }
  (() => { const st = document.createElement('style'); st.textContent = `.gm .gsrc{margin-top:6px;font-size:11.5px;opacity:.75;line-height:1.45}.gm .gsrc a{color:var(--sky2)}
.gm.typing{letter-spacing:3px;opacity:.7;animation:gpulse 1s infinite}@keyframes gpulse{50%{opacity:.35}}
.gsug{display:flex;flex-direction:column;align-items:flex-start;gap:5px;align-self:stretch}.gsug small{font-size:11.5px;opacity:.6;padding-inline-start:2px}
.gsug button{font:inherit;font-size:13px;text-align:start;line-height:1.45;padding:6px 11px;border-radius:12px;border:1px solid rgba(111,214,208,.3);color:var(--sky2);background:rgba(111,214,208,.05);cursor:pointer;max-width:100%}
.gsug button:hover{background:rgba(111,214,208,.14)}`; document.head.appendChild(st); })();

  /* ================= ADMIN: edit texts (stored in the artifact's db) ================= */
  const ADM = { db: null, user: null, allowed: false, overrides: { ar: {}, en: {} }, draft: null, tab: 'ar', q: '' };
  const getPath = (o, p) => p.split('.').reduce((a, k) => a == null ? a : a[k], o);
  const setPath = (o, p, v) => { const ks = p.split('.'); let a = o; for (let i = 0; i < ks.length - 1; i++) { if (a[ks[i]] == null) return; a = a[ks[i]]; } a[ks[ks.length - 1]] = v; };
  function flat(o, pre = '', out = []) { if (typeof o === 'string') { out.push(pre); return out; } if (o && typeof o === 'object') for (const k of Object.keys(o)) { if (k === 'dir') continue; flat(o[k], pre ? pre + '.' + k : k, out); } return out; }
  function applyOverrides(ov) {
    for (const L of ['ar', 'en']) { for (const p of flat(ORIGINAL[L])) setPath(window.CONTENT[L], p, getPath(ORIGINAL[L], p)); for (const [p, v] of Object.entries((ov && ov[L]) || {})) if (typeof v === 'string' && typeof getPath(ORIGINAL[L], p) === 'string') setPath(window.CONTENT[L], p, v); }
  }
  (async () => {
    const done = () => { textsReady = true; checkReady(); };
    const timer = setTimeout(done, 6000);
    try {
      if (!(window.claude && typeof window.claude.use === 'function')) { clearTimeout(timer); return done(); }
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      ADM.db = db; ADM.user = user;
      try { ADM.allowed = !!(user && (user.isOwner() || user.canEdit())); } catch (_) { ADM.allowed = false; }
      if (db) { const snap = await db.doc('site/texts').get(); if (snap.exists) { const d = snap.data(); ADM.overrides = { ar: d.ar || {}, en: d.en || {} }; applyOverrides(ADM.overrides); applyLang(); } }
    } catch (_) {}
    clearTimeout(timer); done();
    if (location.hash === '#admin' && ADM.allowed) openAdmin();
  })();
  function openAdmin() { ADM.draft = { ar: { ...ADM.overrides.ar }, en: { ...ADM.overrides.en } }; ADM.dirty = false; $('#admin').classList.add('on'); renderAdmin(); }
  function renderAdmin() {
    const a = C().admin, L = ADM.tab, paths = flat(ORIGINAL[L]).filter(p => { if (!ADM.q) return true; const q = ADM.q.toLowerCase(); return p.toLowerCase().includes(q) || String(ADM.draft[L][p] ?? getPath(ORIGINAL[L], p)).toLowerCase().includes(q); });
    $('#admin').innerHTML = `<div class="ah"><h3>${esc(a.title)}</h3>
      <button class="tbtn atab ${L === 'ar' ? 'on' : ''}" data-tab="ar">العربية</button><button class="tbtn atab ${L === 'en' ? 'on' : ''}" data-tab="en">English</button>
      <input class="inp" id="aq" style="max-width:260px;margin:0" placeholder="${esc(a.search)}" value="${esc(ADM.q)}">
      <span class="msg" id="amsg">${paths.length} ${esc(a.count)}</span>
      <button class="btn main" id="aSave" style="flex:none">${esc(a.save)}</button><button class="tbtn" id="aReset">${esc(C().impact.reset)}</button><button class="tbtn" id="aClose">${esc(C().close)}</button></div>
      <div class="ab">${paths.map(p => { const orig = getPath(ORIGINAL[L], p), cur = ADM.draft[L][p] ?? orig, ch = ADM.draft[L][p] != null && ADM.draft[L][p] !== orig;
        return `<div class="af ${ch ? 'ch' : ''}"><code>${esc(p)}${ch ? ` · <span style="color:var(--amber)">${esc(a.changed)}</span>` : ''}</code><textarea data-ap="${esc(p)}" dir="${L === 'ar' ? 'rtl' : 'ltr'}" rows="${Math.min(6, Math.ceil(String(cur).length / 70) || 1)}">${esc(cur)}</textarea><button class="tbtn" data-ar="${esc(p)}" title="${esc(a.reset)}">↺</button></div>`; }).join('')}</div>`;
    document.querySelectorAll('#admin [data-tab]').forEach(b => b.onclick = () => { ADM.tab = b.dataset.tab; renderAdmin(); });
    const aq = $('#aq'); aq.oninput = () => { ADM.q = aq.value; clearTimeout(ADM.qt); ADM.qt = setTimeout(() => { renderAdmin(); const n = $('#aq'); n.focus(); n.setSelectionRange(n.value.length, n.value.length); }, 300); };
    document.querySelectorAll('#admin [data-ap]').forEach(t => t.oninput = () => { const p = t.dataset.ap; const orig = getPath(ORIGINAL[L], p); if (t.value === orig) delete ADM.draft[L][p]; else ADM.draft[L][p] = t.value; ADM.dirty = true; t.closest('.af').classList.toggle('ch', t.value !== orig); });
    document.querySelectorAll('#admin [data-ar]').forEach(b => b.onclick = () => { delete ADM.draft[L][b.dataset.ar]; ADM.dirty = true; renderAdmin(); });
    on('aClose', () => { $('#admin').classList.remove('on'); });
    on('aReset', async () => {
      const m = $('#amsg'), I = C().impact; if (!ADM.db) { m.textContent = a.noDb; return; }
      if ($('#aReset').dataset.sure !== '1') { $('#aReset').dataset.sure = '1'; $('#aReset').textContent = I.resetQ; $('#aReset').style.color = 'var(--bad)'; return; }
      try { const snap = await ADM.db.collection('sessions').limit(1000).get(); for (const d of snap.docs) await ADM.db.doc('sessions/' + d.id).delete(); m.style.color = 'var(--ok)'; m.textContent = I.resetDone; }
      catch (e) { m.style.color = 'var(--bad)'; m.textContent = a.fail; }
      $('#aReset').dataset.sure = ''; $('#aReset').textContent = I.reset; $('#aReset').style.color = '';
    });
    on('aSave', async () => {
      const m = $('#amsg');
      if (!ADM.db) { m.textContent = a.noDb; return; }
      if (!ADM.dirty) { m.textContent = a.none; return; }
      try { await ADM.db.doc('site/texts').set({ ar: ADM.draft.ar, en: ADM.draft.en, updatedAt: new Date().toISOString() }); ADM.overrides = { ar: { ...ADM.draft.ar }, en: { ...ADM.draft.en } }; ADM.dirty = false;
        applyOverrides(ADM.overrides); applyLang(); if (S.screen) { mediaKey = null; render(false); } m.style.color = 'var(--ok)'; m.textContent = C().admin.saved; }
      catch (e) { m.style.color = 'var(--bad)'; m.textContent = a.fail + (e && e.code ? ` (${e.code})` : ''); }
    });
  }


  /* ================= IMPACT: anonymous session tracking + public dashboard ================= */
  const TRK = {
    id: null, d: null, busy: false, again: false, t0: 0,
    start() { this.id = 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); this.t0 = performance.now(); S.mis = {};
      this.d = { t0: new Date().toISOString(), lang: S.lang, dev: innerWidth <= 860 ? 'mobile' : 'desktop', reach: 0, last: 'opening', done: {}, mis: {}, guide: 0, ev: 0, dur: 0 }; this.save(); },
    reach(id) { if (!this.d) return; this.d.reach = Math.max(this.d.reach, ORDER.indexOf(id) + 1); this.d.last = id; this.save(); },
    done(id) { if (!this.d) return; this.d.done[id] = true; this.save(); },
    guide() { if (!this.d) return; this.d.guide++; this.save(); },
    save() {
      if (!this.d || !ADM.db) return;
      this.d.mis = { ...S.mis }; this.d.ev = S.ev.length; this.d.dur = Math.round((performance.now() - this.t0) / 1000); this.d.upd = new Date().toISOString();
      if (this.busy) { this.again = true; return; }
      this.busy = true; const id = this.id, body = JSON.parse(JSON.stringify(this.d));
      ADM.db.doc('sessions/' + id).set(body).catch(() => {}).finally(() => { this.busy = false; if (this.again) { this.again = false; this.save(); } });
    }
  };
  addEventListener('resize', () => { if (S.screen) { document.body.classList.toggle('tallp', TALL.includes(S.screen) && innerWidth <= 860); reframe(); if (S.screen === 'solar') solarSim(S.ss.solar); } });
  applyLang();
  window.__LS = { S, go, restart, openAdmin, ADM, TRK }; // for testing
})();
