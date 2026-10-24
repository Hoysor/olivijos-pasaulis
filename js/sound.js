// Tiny synthesized sound effects (no audio files needed).
const Sound = (() => {
  let ctx;
  let muted = false;
  const ac = () => (ctx = ctx || new (window.AudioContext || window.webkitAudioContext)());

  function tone(freq, dur = 0.1, { type = 'sine', vol = 0.15, delay = 0, slide = 0 } = {}) {
    if (muted) return;
    try {
      const c = ac(), t = c.currentTime + delay, o = c.createOscillator(), g = c.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur + 0.05);
      o.connect(g).connect(c.destination);
      o.start(t);
      o.stop(t + dur + 0.08);
    } catch { }
  }

  function noise(dur = 0.3, { vol = 0.2, delay = 0, filter = 1200 } = {}) {
    if (muted) return;
    try {
      const c = ac(), t = c.currentTime + delay, len = Math.floor(c.sampleRate * dur);
      const buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
      const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      src.buffer = buf; f.type = 'lowpass'; f.frequency.value = filter; g.gain.value = vol;
      src.connect(f).connect(g).connect(c.destination);
      src.start(t);
    } catch { }
  }

  const notes = (list, step = 0.18, opts = {}) => list.forEach((f, i) => f && tone(f, step * 0.9, { ...opts, delay: i * step }));

  return {
    setMuted(m) { muted = m; },
    pop: () => tone(520, 0.06, { slide: 300 }),
    pick: () => tone(440, 0.08, { slide: 400, vol: 0.1 }),
    drop: () => tone(300, 0.08, { slide: -150, vol: 0.12 }),
    nom: () => { noise(0.08, { vol: 0.3, filter: 900 }); noise(0.08, { vol: 0.3, filter: 900, delay: 0.16 }); tone(700, 0.1, { delay: 0.32, slide: 250 }); },
    giggle: () => [700, 820, 700, 900].forEach((f, i) => tone(f, 0.06, { delay: i * 0.08, type: 'triangle', vol: 0.1 })),
    chime: () => notes([660, 880, 1320], 0.09),
    sparkle: () => notes([1200, 1500, 1800, 2400], 0.06, { vol: 0.08 }),
    splash: () => noise(0.5, { vol: 0.3, filter: 2500 }),
    squeak: () => { tone(1800, 0.15, { slide: 900 }); tone(2200, 0.12, { delay: 0.18, slide: -600 }); },
    seal: () => { tone(300, 0.15, { type: 'sawtooth', vol: 0.07, slide: 120 }); tone(300, 0.15, { type: 'sawtooth', vol: 0.07, delay: 0.25, slide: 120 }); },
    gull: () => { tone(1400, 0.2, { slide: -500, type: 'triangle', vol: 0.08 }); tone(1300, 0.25, { delay: 0.25, slide: -500, type: 'triangle', vol: 0.08 }); },
    horn: () => { tone(110, 0.9, { type: 'sawtooth', vol: 0.07 }); tone(165, 0.9, { type: 'sawtooth', vol: 0.04 }); },
    ding: () => { tone(1568, 0.3, { type: 'triangle' }); tone(2093, 0.4, { type: 'triangle', delay: 0.1 }); },
    bell: () => { tone(880, 0.6, { type: 'triangle', vol: 0.12 }); tone(1320, 0.5, { type: 'sine', vol: 0.05 }); },
    click: () => tone(900, 0.03, { vol: 0.08 }),
    boo: () => tone(400, 0.7, { type: 'triangle', slide: -250, vol: 0.12 }),
    flush: () => { noise(1.2, { vol: 0.25, filter: 800 }); },
    creak: () => tone(140, 0.6, { type: 'sawtooth', vol: 0.05, slide: 60 }),
    bark: () => { noise(0.06, { vol: 0.2, filter: 1500 }); tone(500, 0.08, { type: 'square', vol: 0.06, slide: -200 }); tone(500, 0.08, { type: 'square', vol: 0.06, slide: -200, delay: 0.18 }); },
    meow: () => tone(750, 0.35, { type: 'triangle', vol: 0.1, slide: -350 }),
    tweet: () => notes([2000, 2400, 2000, 2600], 0.07, { vol: 0.07 }),
    whoosh: () => noise(0.4, { vol: 0.15, filter: 600 }),
    fire: () => { noise(0.25, { vol: 0.12, filter: 3000 }); noise(0.2, { vol: 0.1, filter: 3000, delay: 0.3 }); },
    // A cheerful little tune for the radio.
    tune: () => notes([523, 659, 784, 659, 698, 880, 784, 0, 659, 587, 523, 587, 659, 523], 0.17, { type: 'triangle', vol: 0.09 }),
    tv: () => notes([392, 523, 392, 659], 0.12, { type: 'square', vol: 0.04 }),
    bravo: () => { noise(0.9, { vol: 0.2, filter: 4000 }); notes([523, 659, 784, 1047], 0.12, { type: 'triangle', vol: 0.08 }); },
  };
})();
