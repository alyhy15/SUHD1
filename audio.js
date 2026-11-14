/* Last Signal — cinematic sound design, synthesized live with the Web Audio API (no audio files). */
(function () {
  'use strict';
  let ctx = null, master, comp, noiseBuf, windG, windF, hissG, droneG, droneF, staticG, dataTimer = null, muted = false;
  const A = {};
  const now = () => ctx.currentTime;
  const ramp = (p, v, t = .8) => { if (!ctx) return; p.cancelScheduledValues(now()); p.setValueAtTime(p.value, now()); p.linearRampToValueAtTime(v, now() + t); };

  function brownNoise(sec = 3) {
    const len = ctx.sampleRate * sec, b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0); let last = 0;
    for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + .02 * w) / 1.02; d[i] = last * 3.2; }
    return b;
  }
  function whiteNoise(sec = 2) { const len = ctx.sampleRate * sec, b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1; return b; }
  function loopSrc(buf) { const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; s.start(); return s; }

  A.init = function () {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) { ctx = null; return; }
    comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 3;
    master = ctx.createGain(); master.gain.value = muted ? 0 : .9; master.connect(comp); comp.connect(ctx.destination);
    noiseBuf = brownNoise(4);
    // wind bed
    windF = ctx.createBiquadFilter(); windF.type = 'bandpass'; windF.frequency.value = 420; windF.Q.value = .6;
    windG = ctx.createGain(); windG.gain.value = 0;
    loopSrc(noiseBuf).connect(windF); windF.connect(windG); windG.connect(master);
    const lfo = ctx.createOscillator(); lfo.frequency.value = .13; const lfoG = ctx.createGain(); lfoG.gain.value = 180; lfo.connect(lfoG); lfoG.connect(windF.frequency); lfo.start();
    const lfo2 = ctx.createOscillator(); lfo2.frequency.value = .07; const lfo2G = ctx.createGain(); lfo2G.gain.value = .04; lfo2.connect(lfo2G); lfo2G.connect(windG.gain); lfo2.start();
    // storm hiss
    const hf = ctx.createBiquadFilter(); hf.type = 'highpass'; hf.frequency.value = 1800;
    hissG = ctx.createGain(); hissG.gain.value = 0; loopSrc(whiteNoise(2)).connect(hf); hf.connect(hissG); hissG.connect(master);
    // drone pad (low cinematic bed)
    droneF = ctx.createBiquadFilter(); droneF.type = 'lowpass'; droneF.frequency.value = 260; droneF.Q.value = .8;
    droneG = ctx.createGain(); droneG.gain.value = 0; droneF.connect(droneG); droneG.connect(master);
    [[55, 'sine', .55], [55.4, 'sawtooth', .12], [82.4, 'sine', .3], [110.2, 'triangle', .08]].forEach(([f, t, g]) => { const o = ctx.createOscillator(); o.type = t; o.frequency.value = f; const og = ctx.createGain(); og.gain.value = g; o.connect(og); og.connect(droneF); o.start(); });
    // data static
    const sf = ctx.createBiquadFilter(); sf.type = 'bandpass'; sf.frequency.value = 3200; sf.Q.value = .5;
    staticG = ctx.createGain(); staticG.gain.value = 0; loopSrc(whiteNoise(2)).connect(sf); sf.connect(staticG); staticG.connect(master);
  };

  A.ambient = (w = .05, t = 2) => { if (!ctx) return; ramp(windG.gain, w, t); };
  A.storm = (k, t = 2.5) => { if (!ctx) return; ramp(windG.gain, .05 + .32 * k, t); ramp(hissG.gain, .09 * k, t); ramp(windF.frequency, 420 + 520 * k, t); };
  A.drone = (v = .14, t = 3) => { if (!ctx) return; ramp(droneG.gain, v, t); };
  A.droneDark = (k, t = 4) => { if (!ctx) return; ramp(droneF.frequency, 260 - 170 * k, t); };

  function tone(f, dur, { type = 'sine', g = .12, at = .005, f2 = null, delay = 0 } = {}) {
    if (!ctx) return; const t0 = now() + delay; const o = ctx.createOscillator(), og = ctx.createGain(); o.type = type; o.frequency.setValueAtTime(f, t0);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
    og.gain.setValueAtTime(0, t0); og.gain.linearRampToValueAtTime(g, t0 + at); og.gain.exponentialRampToValueAtTime(.0001, t0 + dur);
    o.connect(og); og.connect(master); o.start(t0); o.stop(t0 + dur + .05);
  }
  function burst(dur, { g = .4, f = 400, type = 'lowpass', f2 = null, delay = 0 } = {}) {
    if (!ctx) return; const t0 = now() + delay; const s = ctx.createBufferSource(); s.buffer = noiseBuf; const fl = ctx.createBiquadFilter(); fl.type = type; fl.frequency.setValueAtTime(f, t0); if (f2) fl.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
    const gg = ctx.createGain(); gg.gain.setValueAtTime(g, t0); gg.gain.exponentialRampToValueAtTime(.0001, t0 + dur); s.connect(fl); fl.connect(gg); gg.connect(master); s.start(t0, Math.random() * 2); s.stop(t0 + dur + .05);
  }

  A.beep = (f = 1650) => { tone(f, .09, { g: .05 }); tone(f, .09, { g: .035, delay: .14 }); };
  A.warn = () => { tone(740, .22, { type: 'square', g: .03 }); tone(560, .28, { type: 'square', g: .03, delay: .26 }); };
  A.powerDown = () => { tone(440, 2.6, { type: 'sawtooth', g: .07, f2: 32 }); tone(220, 2.8, { g: .12, f2: 25 }); burst(.15, { g: .25, f: 3000, type: 'highpass', delay: 2.6 }); };
  A.dataStart = () => {
    if (!ctx) return; ramp(staticG.gain, .05, .3);
    clearInterval(dataTimer); dataTimer = setInterval(() => { if (Math.random() < .75) tone(500 + Math.random() * 2200, .025 + Math.random() * .03, { type: 'square', g: .022 }); }, 42);
  };
  A.dataStop = () => { clearInterval(dataTimer); dataTimer = null; if (!ctx) return; ramp(staticG.gain, 0, .05); burst(.08, { g: .35, f: 4000, type: 'highpass' }); };
  A.impact = () => { tone(62, 2.2, { g: .9, f2: 28, at: .01 }); tone(124, 1.2, { type: 'triangle', g: .18, f2: 50 }); burst(1.6, { g: .7, f: 900, f2: 60 }); };
  A.pad = () => { [220, 261.63, 329.63, 392].forEach((f, i) => tone(f, 7.5, { g: .035, at: 2.2, delay: i * .25 })); };
  A.whoosh = () => burst(.7, { g: .18, f: 300, type: 'bandpass', f2: 2600 });
  A.chime = () => { tone(880, .5, { g: .06 }); tone(1318.5, .7, { g: .05, delay: .12 }); };
  A.card = () => { tone(659.3, .4, { g: .05 }); tone(987.8, .5, { g: .05, delay: .1 }); tone(1318.5, .8, { g: .045, delay: .2 }); };
  A.wrong = () => tone(190, .22, { type: 'triangle', g: .08, f2: 150 });
  A.tick = () => tone(2200, .03, { g: .03 });
  A.stamp = () => { tone(90, .5, { g: .5, f2: 50 }); burst(.3, { g: .4, f: 1200 }); };
  A.stopAll = () => { if (!ctx) return; clearInterval(dataTimer); ramp(windG.gain, 0, .6); ramp(hissG.gain, 0, .6); ramp(droneG.gain, 0, .6); ramp(staticG.gain, 0, .2); };
  A.setMuted = m => { muted = m; if (ctx) ramp(master.gain, m ? 0 : .9, .3); };
  Object.defineProperty(A, 'muted', { get: () => muted });
  window.AUDIO = A;
})();
