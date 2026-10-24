// Scene engine: draws a place, and lets you drag, drop, tap and combine everything in it.
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function burst(emoji, x, y, n = 5) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span');
    s.className = 'burst';
    s.textContent = emoji;
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    s.style.setProperty('--dx', (Math.random() * 140 - 70) + 'px');
    s.style.animationDelay = (i * 70) + 'ms';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1600);
  }
}

let toastTimer;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

const Engine = (() => {
  const MAX_PROPS = 70;
  let sc = null, scale = 1, root, wrap, sceneEl, fxLayer, insideLayer, entsLayer, frontsEl, glowLayer, bagEl, bagItems, panelEl;
  let drag = null, panelFx = null;
  const moods = {}, moodTimers = {};
  const dragLayer = document.getElementById('drag-layer');

  // ---------- sizes and markup ----------
  function dims(e) {
    if (e.k === 'char') {
      const h = S.chars[e.t].size === 'adult' ? 330 : 265;
      return { w: h * 200 / 280, h, ay: CHAR_ANCHOR[e.pose] || CHAR_ANCHOR.stand };
    }
    const s = e.k === 'pet' ? 110 : (PROPS[e.t] && PROPS[e.t].size) || 80;
    return { w: s, h: s, ay: e.pose === 'swim' ? 0.7 : 0.97 };
  }

  function inner(e) {
    if (e.k === 'char') {
      const c = S.chars[e.t];
      const mood = moods[e.id] || (e.pose === 'lie' ? 'sleep' : null);
      return characterSVG(c.look, c.outfit, { pose: e.pose === 'sit' ? 'sit' : 'stand', mood });
    }
    if (e.k === 'pet') return `<span class="emo">${PETS[e.t].emoji}</span>`;
    return itemHTML(e.t);
  }

  function entHTML(e, pos = '') {
    const d = dims(e), held = e.hold && S.ents[e.hold];
    return `<div class="ent ent-${e.k} pose-${e.pose || 'stand'}" data-id="${e.id}"
      style="${pos}width:${d.w * scale}px;height:${d.h * scale}px;font-size:${d.h * scale * 0.8}px;--ay:${d.ay * 100}%">
      <div class="body">${inner(e)}${held ? `<div class="held">${entHTML(held)}</div>` : ''}</div></div>`;
  }

  const posOf = e => `left:${e.x * scale}px;top:${e.y * scale}px;`;
  const box = (x, y, w, h) => `left:${x * scale}px;top:${y * scale}px;width:${w * scale}px;height:${h * scale}px`;
  const fst = f => S.fx[sc.id + '.' + f.id] ?? (f.init || 0);
  const fxById = id => sc.fixtures.find(f => f.id === id);
  const kindOf = e => e.k !== 'prop' ? e.k : e.t.startsWith('c:') ? 'cloth' : PROPS[e.t].kind;

  // ---------- rendering ----------
  function open(id, el) {
    close();
    root = el;
    sc = SCENES[id];
    S.scene = id;
    ensureScene(id);
    save();
    root.innerHTML = `<div class="play"><div class="scene-wrap"><div class="scene"></div></div>
      <div class="panel"></div><div class="bag"><span class="bag-icon">🎒</span><div class="bag-items"></div></div></div>`;
    wrap = root.querySelector('.scene-wrap');
    sceneEl = root.querySelector('.scene');
    panelEl = root.querySelector('.panel');
    bagEl = root.querySelector('.bag');
    bagItems = root.querySelector('.bag-items');
    layout();
    const main = entOfChar(S.mainChar);
    wrap.scrollLeft = S.scroll[id] ?? (main && main.sc === id ? main.x * scale - wrap.clientWidth / 2 : 0);
    wrap.addEventListener('scroll', () => { if (sc) { S.scroll[sc.id] = wrap.scrollLeft; save(); } }, { passive: true });
    sceneEl.addEventListener('click', onSceneClick);
    panelEl.addEventListener('click', onPanelClick);
  }

  function close() {
    if (drag) { clearInterval(drag.timer); drag = null; dragLayer.innerHTML = ''; }
    panelFx = null;
    sc = null;
  }

  function layout() {
    scale = wrap.clientHeight / 1000;
    sceneEl.style.width = sc.W * scale + 'px';
    sceneEl.style.height = wrap.clientHeight + 'px';
    sceneEl.classList.toggle('night', S.night);
    sc._bg = sc._bg || sc.bg();
    if (sc.front) sc._front = sc._front || sc.front();
    const svg = body => `<svg class="full" viewBox="0 0 ${sc.W} 1000" preserveAspectRatio="none">${body}</svg>`;
    // Things inside something (swimming, in the bath, in bed) go below the front pieces; everything else above.
    sceneEl.innerHTML = `${svg(sc._bg)}<div class="layer fx-layer"></div><div class="layer ents inside-layer"></div>
      <div class="layer front-layer">${sc._front ? svg(sc._front) : ''}<div class="fx-fronts"></div></div>
      <div class="layer ents ents-layer"></div><div class="night-ov"></div><div class="layer glow-layer"></div>`;
    fxLayer = sceneEl.querySelector('.fx-layer');
    insideLayer = sceneEl.querySelector('.inside-layer');
    entsLayer = sceneEl.querySelector('.ents-layer');
    frontsEl = sceneEl.querySelector('.fx-fronts');
    glowLayer = sceneEl.querySelector('.glow-layer');
    renderFixtures();
    renderEnts();
    renderBag();
  }

  function relayout() {
    if (!sc) return;
    const ratio = wrap.scrollLeft / (sc.W * scale);
    layout();
    wrap.scrollLeft = ratio * sc.W * scale;
  }

  const fxSvg = (f, w, h, body) => `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" overflow="visible">${body}</svg>`;
  const fxHTML = f => `<div class="fx fx-${f.id}${f.spawn || f.tap ? ' tappable' : ''}" data-fx="${f.id}" style="${box(f.x, f.y, f.w, f.h)}">${fxSvg(f, f.w, f.h, f.svg(fst(f)))}</div>`;
  const frontHTML = f => `<div class="fx-front" data-fx="${f.id}" style="${box(f.x, f.y, f.w, f.h)}">${fxSvg(f, f.w, f.h, f.front(fst(f)))}</div>`;

  function renderFixtures() {
    fxLayer.innerHTML = sc.fixtures.map(fxHTML).join('');
    frontsEl.innerHTML = sc.fixtures.filter(f => f.front).map(frontHTML).join('');
    renderGlows();
  }

  function renderFixture(f) {
    const el = fxLayer.querySelector(`[data-fx="${f.id}"]`);
    if (el) el.outerHTML = fxHTML(f);
    const fe = f.front && frontsEl.querySelector(`[data-fx="${f.id}"]`);
    if (fe) fe.outerHTML = frontHTML(f);
    renderGlows();
  }

  function renderGlows() {
    glowLayer.innerHTML = sc.fixtures.filter(f => f.glow && f.glow.on(fst(f))).map(f =>
      `<div class="glow" style="${box(f.glow.x - f.glow.r, f.glow.y - f.glow.r, f.glow.r * 2, f.glow.r * 2)}"></div>`).join('');
  }

  function renderEnts() {
    const list = Object.values(S.ents).filter(e => e.sc === sc.id && !e.by && !(drag && drag.id === e.id));
    list.sort((a, b) => (a.y + (a.k === 'char' ? 1 : 0)) - (b.y + (b.k === 'char' ? 1 : 0)));
    const inside = e => e.pose === 'swim' || e.inside;
    insideLayer.innerHTML = list.filter(inside).map(e => entHTML(e, posOf(e))).join('');
    entsLayer.innerHTML = list.filter(e => !inside(e)).map(e => entHTML(e, posOf(e))).join('');
  }

  const entEl = id => sceneEl.querySelector(`.ents > [data-id="${id}"]`);

  function rerenderEnt(id) {
    const e = S.ents[id];
    if (!e || !sc) return null;
    const top = e.by ? S.ents[e.by] : e;
    const el = entEl(top.id);
    if (!el) return null;
    el.outerHTML = entHTML(top, posOf(top));
  }

  function renderBag() {
    const list = Object.values(S.ents).filter(e => e.sc === 'bag' && !e.by && !(drag && drag.id === e.id));
    bagItems.innerHTML = list.length
      ? list.map(e => {
        const c = e.k === 'char' && S.chars[e.t];
        return `<div class="ent bag-ent ent-${e.k}" data-id="${e.id}">${c ? characterSVG(c.look, c.outfit, { view: 'face' }) : inner(e)}</div>`;
      }).join('')
      : `<span class="bag-hint">${T('bagHint')}</span>`;
  }

  // ---------- effects ----------
  function burstAt(e, emoji, n = 4) {
    const r = sceneEl.getBoundingClientRect(), d = dims(e);
    burst(emoji, r.left + e.x * scale, r.top + (e.y - d.h * d.ay * 0.8) * scale, n);
  }

  function animEnt(id, cls) {
    const el = sceneEl.querySelector(`[data-id="${id}"] > .body`);
    if (!el) return;
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
    el.addEventListener('animationend', () => el.classList.remove(cls), { once: true });
  }

  function setMood(id, mood, ms) {
    moods[id] = mood;
    clearTimeout(moodTimers[id]);
    moodTimers[id] = setTimeout(() => { delete moods[id]; rerenderEnt(id); }, ms);
    rerenderEnt(id);
  }

  function fxAnim(f, cls, ms) {
    [fxLayer.querySelector(`[data-fx="${f.id}"]`), frontsEl.querySelector(`[data-fx="${f.id}"]`)].forEach(el => {
      if (!el) return;
      el.classList.remove(cls);
      void el.offsetWidth;
      el.classList.add(cls);
      setTimeout(() => el.classList.remove(cls), ms);
    });
  }

  // ---------- physics ----------
  function landing(x, y) {
    const surfaces = sc.platforms.map(p => Array.isArray(p) ? { x1: p[0], x2: p[1], y: p[2] } : p)
      .filter(p => !p.fx || fst(fxById(p.fx)) === p.on)
      .concat((sc.water || []).map(w => ({ ...w, swim: true })))
      .filter(p => x >= p.x1 && x <= p.x2);
    const below = surfaces.filter(p => p.y >= y - 40).sort((a, b) => a.y - b.y)[0];
    return below || surfaces.sort((a, b) => b.y - a.y)[0] || { y: 900 };
  }

  const occupied = (seat, self) => Object.values(S.ents).some(e => e.id !== self && e.sc === sc.id && e.k === 'char' &&
    e.pose === seat.pose && Math.abs(e.x - seat.x) < 5 && Math.abs(e.y - seat.y) < 5);

  function place(ent, x, y, fromY = y) {
    if (ent.k === 'char') {
      const seat = sc.seats.find(s => Math.hypot(s.x - x, s.y - y) < 110 && !occupied(s, ent.id));
      if (seat) {
        Object.assign(ent, { x: seat.x, y: seat.y, pose: seat.pose, inside: !!seat.inside });
        renderEnts();
        animEnt(ent.id, 'land');
        Sound.drop();
        return;
      }
    }
    const land = landing(x, y);
    Object.assign(ent, { x, y: land.y, pose: land.swim ? 'swim' : null, inside: false });
    renderEnts();
    fall(ent, fromY, land.swim);
  }

  function fall(ent, fromY, splash) {
    const el = entEl(ent.id);
    const dist = ent.y - fromY;
    if (!el || Math.abs(dist) < 6) { if (splash) Sound.splash(); else Sound.drop(); return; }
    const t = Math.min(0.6, 0.12 + Math.abs(dist) / 1800);
    el.style.top = fromY * scale + 'px';
    void el.offsetWidth;
    el.style.transition = `top ${t}s cubic-bezier(.45,0,1,1)`;
    el.style.top = ent.y * scale + 'px';
    setTimeout(() => {
      el.style.transition = '';
      if (splash) { Sound.splash(); burstAt(ent, '💦', 4); } else Sound.drop();
      animEnt(ent.id, 'land');
    }, t * 1000);
  }

  // After something changes (like the bridge opening), let things fall to wherever they now rest.
  function settle() {
    const moved = [];
    Object.values(S.ents).forEach(e => {
      if (e.sc !== sc.id || e.by || e.pose === 'sit' || e.pose === 'lie') return;
      const land = landing(e.x, e.y);
      if (Math.abs(land.y - e.y) > 2) { moved.push([e, e.y, land.swim]); e.y = land.y; e.pose = land.swim ? 'swim' : null; }
    });
    if (!moved.length) return;
    renderEnts();
    moved.forEach(([e, from, swim]) => fall(e, from, swim));
  }

  // ---------- combining things ----------
  function targetAt(px, py, ent) {
    for (const el of document.elementsFromPoint(px, py)) {
      const te = el.closest('.ents > .ent');
      if (te && te.dataset.id !== ent.id) return { ent: S.ents[te.dataset.id] };
      const tf = el.closest('.fx');
      if (tf) return { fx: fxById(tf.dataset.fx) };
    }
    return null;
  }

  function interact(ent, px, py) {
    const t = targetAt(px, py, ent);
    if (!t) return false;
    const kind = kindOf(ent);
    if (t.ent) {
      const who = t.ent;
      if (who.k === 'char' && kind === 'food') {
        removeEnt(ent.id);
        renderEnts();
        setMood(who.id, 'yum', 1500);
        Sound.nom();
        burstAt(who, '😋', 3);
        return true;
      }
      if (who.k === 'char' && kind === 'cloth') {
        const it = CLOTH_BY_ID[ent.t.slice(2)], c = S.chars[who.t];
        c.outfit[it.slot] = it.id;
        if (it.slot === 'bottom' && CLOTH_BY_ID[c.outfit.top] && CLOTH_BY_ID[c.outfit.top].full) c.outfit.top = null;
        removeEnt(ent.id);
        renderEnts();
        Sound.sparkle();
        burstAt(who, '✨', 5);
        return true;
      }
      if (who.k === 'char' && ent.k !== 'char') {
        const old = who.hold && S.ents[who.hold];
        attach(who.id, ent.id);
        renderEnts();
        if (old) place(old, who.x + 80, who.y - 120, who.y - 120);
        Sound.pop();
        return true;
      }
      if (who.k === 'pet' && (kind === 'food' || kind === 'fish')) {
        removeEnt(ent.id);
        renderEnts();
        Sound.nom();
        animEnt(who.id, 'jump');
        burstAt(who, '❤️', 3);
        return true;
      }
      return false;
    }
    const f = t.fx;
    if (f.trash && ent.k !== 'char') {
      removeEnt(ent.id);
      renderEnts();
      Sound.whoosh();
      fxAnim(f, 'wiggle', 500);
      return true;
    }
    if (f.eats && f.eats.includes(kind)) {
      removeEnt(ent.id);
      renderEnts();
      Sound.nom();
      f.onEat(ctxFor(f));
      return true;
    }
    return false;
  }

  function drop(ent, ax, ay, px, py) {
    if (py > bagEl.getBoundingClientRect().top) {
      setScene(ent.id, 'bag');
      ent.pose = null;
      Sound.drop();
      renderEnts();
      renderBag();
      return;
    }
    setScene(ent.id, sc.id);
    renderBag();
    if (interact(ent, px, py)) return;
    const r = sceneEl.getBoundingClientRect();
    const x = clamp((ax - r.left) / scale, 30, sc.W - 30), y = clamp((ay - r.top) / scale, 0, 995);
    place(ent, x, y);
  }

  // ---------- pointer handling ----------
  function onDown(e) {
    if (!sc || drag || e.button > 0) return;
    const el = e.target.closest('.ent');
    if (!el || !root.contains(el)) return;
    e.preventDefault();
    drag = { id: el.dataset.id, pid: e.pointerId, sx: e.clientX, sy: e.clientY, lx: e.clientX, ly: e.clientY, moved: false };
  }

  function onMove(e) {
    if (!drag || e.pointerId !== drag.pid) return;
    drag.lx = e.clientX;
    drag.ly = e.clientY;
    if (!drag.moved) {
      if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 10) return;
      startDrag();
    }
    drag.ghost.style.left = drag.lx + 'px';
    drag.ghost.style.top = (drag.ly + drag.offY) + 'px';
  }

  function startDrag() {
    const ent = S.ents[drag.id];
    drag.moved = true;
    detach(ent.id);
    ent.pose = null;
    ent.inside = false;
    if (ent.k === 'char') moods[ent.id] = 'surprised';
    const d = dims(ent);
    drag.offY = d.h * scale * (d.ay - (ent.k === 'char' ? 0.3 : 0.5));
    dragLayer.innerHTML = entHTML(ent);
    drag.ghost = dragLayer.firstElementChild;
    drag.ghost.classList.add('dragging');
    renderEnts();
    renderBag();
    Sound.pick();
    drag.timer = setInterval(() => {
      const r = wrap.getBoundingClientRect();
      if (drag.lx < r.left + 70) wrap.scrollLeft -= 18;
      else if (drag.lx > r.right - 70) wrap.scrollLeft += 18;
    }, 30);
  }

  function onUp(e) {
    if (!drag || e.pointerId !== drag.pid) return;
    const d = drag, ent = S.ents[d.id];
    drag = null;
    clearInterval(d.timer);
    if (!ent) return;
    if (!d.moved) { tapEnt(ent); return; }
    dragLayer.innerHTML = '';
    delete moods[ent.id];
    drop(ent, d.lx, d.ly + d.offY, d.lx, d.ly);
    save();
  }

  function tapEnt(ent) {
    if (ent.sc === 'bag') return;
    if (ent.k === 'char') {
      setMood(ent.id, 'laugh', 1200);
      animEnt(ent.id, 'jump');
      Sound.giggle();
    } else if (ent.k === 'pet') {
      animEnt(ent.id, 'jump');
      Sound[PETS[ent.t].sound]();
      burstAt(ent, '❤️', 1);
    } else {
      animEnt(ent.id, 'wiggle');
      Sound.pop();
    }
  }

  // ---------- fixtures and dispensers ----------
  function ctxFor(f) {
    const sid = sc.id;
    const ctx = {
      st: fst(f),
      set(n) {
        S.fx[sid + '.' + f.id] = n;
        ctx.st = n;
        if (sc && sc.id === sid) { renderFixture(f); settle(); }
        save();
      },
      next() { ctx.set((ctx.st + 1) % (f.states || 2)); },
      burst(emoji, n = 5) {
        const r = sceneEl.getBoundingClientRect();
        burst(emoji, r.left + (f.x + f.w / 2) * scale, r.top + (f.y + f.h * 0.3) * scale, n);
      },
      anim(cls, ms) { fxAnim(f, cls, ms); },
      toast,
      spawn(ref) { spawnFrom(f, ref); },
    };
    return ctx;
  }

  function spawnFrom(f, ref) {
    const props = Object.values(S.ents).filter(e => e.sc === sc.id && e.k === 'prop' && !e.by);
    if (props.length >= MAX_PROPS) removeEnt(props[0].id);
    const [sx, sy] = f.spawnAt || [f.x + f.w / 2, f.y + f.h];
    const x = sx + Math.random() * 80 - 40;
    const ent = S.ents[spawnRef(ref, sc.id, x, sy)];
    place(ent, x, sy, f.y + f.h * 0.35);
    Sound.pop();
    save();
  }

  function onSceneClick(e) {
    const el = e.target.closest('.fx');
    if (!el) { closePanel(); return; }
    const f = fxById(el.dataset.fx);
    if (f.spawn) { togglePanel(f); return; }
    if (f.tap) f.tap(ctxFor(f));
  }

  function togglePanel(f) {
    const same = panelFx === f;
    closePanel();
    if (same) return;
    panelFx = f;
    ctxFor(f).set(1);
    panelEl.innerHTML = `<div class="panel-items">${f.spawn.map(ref => `<button class="panel-item" data-ref="${ref}">${itemHTML(ref)}</button>`).join('')}</div>
      <button class="panel-close" aria-label="close">✕</button>`;
    panelEl.classList.add('open');
    Sound.pop();
  }

  function closePanel() {
    if (!panelFx) return;
    const f = panelFx;
    panelFx = null;
    panelEl.classList.remove('open');
    panelEl.innerHTML = '';
    ctxFor(f).set(0);
  }

  function onPanelClick(e) {
    const item = e.target.closest('.panel-item');
    if (item && panelFx) spawnFrom(panelFx, item.dataset.ref);
    else if (e.target.closest('.panel-close')) closePanel();
  }

  function setNight() {
    if (!sc) return;
    sceneEl.classList.toggle('night', S.night);
  }

  document.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);

  return { open, close, relayout, setNight };
})();
