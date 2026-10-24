// Screens: character editor, cast, map and places. Boots the game.
(() => {
  const $app = document.getElementById('app');
  const $top = document.getElementById('topbar');
  const ui = { screen: null, draft: null, editing: null, tab: 'top' };
  const pick = list => list[Math.floor(Math.random() * list.length)];
  const icon = (act, label, arg = '') => `<button class="tb-btn" data-act="${act}" data-arg="${arg}">${label}</button>`;

  // ---------- top bar ----------
  function renderTop() {
    let left = '', title = T('title'), right = '';
    if (ui.screen === 'scene') {
      left = icon('map', `🗺️ <span>${T('map')}</span>`);
      title = nm(SCENES[S.scene].name);
      right = icon('cast', '👥') + icon('night', S.night ? '🌙' : '☀️');
    } else if (ui.screen === 'map') {
      left = icon('back', '←');
      right = icon('cast', '👥') + icon('mute', S.muted ? '🔇' : '🔊') + icon('lang', S.lang === 'lt' ? 'EN' : 'LT');
    } else if (ui.screen === 'cast') {
      left = icon('back', '←');
      title = T('cast');
    } else if (ui.screen === 'edit') {
      if (S.created) left = icon('cast', '←');
      else right = icon('lang', S.lang === 'lt' ? 'EN' : 'LT');
      title = S.created ? T('editTitle') : T('createTitle');
    }
    $top.innerHTML = `${left}<div class="tb-title">${esc(title)}</div>${right}`;
  }

  // ---------- character editor ----------
  function dressedWith(o, it) {
    const out = { ...o, [it.slot]: it.id };
    if (it.slot === 'bottom' && CLOTH_BY_ID[out.top] && CLOTH_BY_ID[out.top].full) out.top = null;
    return out;
  }

  function renderEdit() {
    const d = ui.draft;
    const sw = (act, list, cur) => list.map(c => `<button class="swatch ${c === cur ? 'on' : ''}" style="background:${c}" data-act="${act}" data-arg="${c}"></button>`).join('');
    const head = (lk, on, act, arg) => `<button class="thumb ${on ? 'on' : ''}" data-act="${act}" data-arg="${arg}">${characterSVG(lk, { hat: null }, { view: 'face' })}</button>`;
    const items = CLOTHES.filter(c => c.slot === ui.tab).map(it =>
      `<button class="thumb ${d.outfit[it.slot] === it.id ? 'on' : ''}" data-act="wear" data-arg="${it.id}">${characterSVG(d.look, dressedWith(d.outfit, it), { view: it.slot })}</button>`).join('');
    const none = ui.tab !== 'top' ? `<button class="thumb none ${d.outfit[ui.tab] ? '' : 'on'}" data-act="unwear" data-arg="${ui.tab}">🚫</button>` : '';
    const canDelete = S.created && ui.editing !== 'new' && ui.editing !== S.mainChar;
    return `<section class="screen edit">
      <div class="split">
        <div class="stage">${characterSVG(d.look, d.outfit)}
          <input id="name" maxlength="18" placeholder="${T('namePh')}" value="${esc(d.name)}" autocomplete="off">
          <button class="big-btn" data-act="done">${S.created ? T('done') : T('start')}</button>
          ${canDelete ? `<button class="soft-btn danger" data-act="delete">🗑️ ${T('remove')}</button>` : ''}
        </div>
        <div class="options">
          <h3>${T('size')}</h3><div class="row">${SIZES.map(s => `<button class="chip-btn ${d.size === s ? 'on' : ''}" data-act="size" data-arg="${s}">${s === 'kid' ? '🧒' : '🧑'} ${T(s)}</button>`).join('')}</div>
          <h3>${T('skin')}</h3><div class="row">${sw('skin', SKINS, d.look.skin)}</div>
          <h3>${T('hairStyle')}</h3><div class="row">${HAIR_STYLES.map(h => head({ ...d.look, hairStyle: h }, d.look.hairStyle === h, 'hairStyle', h)).join('')}</div>
          <h3>${T('hairColor')}</h3><div class="row">${sw('hairColor', HAIR_COLORS, d.look.hairColor)}</div>
          <h3>${T('eyes')}</h3><div class="row">${sw('eyes', EYE_COLORS, d.look.eyes)}</div>
          <h3>${T('beard')}</h3><div class="row">${BEARDS.map(b => head({ ...d.look, beard: b }, d.look.beard === b, 'beard', b)).join('')}</div>
          <div class="tabs">${SLOTS.map(s => `<button class="${ui.tab === s ? 'on' : ''}" data-act="tab" data-arg="${s}">${T(s)}</button>`).join('')}</div>
          <div class="row">${none}${items}</div>
        </div>
      </div>
    </section>`;
  }

  function randomDraft() {
    return {
      name: '', size: pick(SIZES),
      look: { skin: pick(SKINS), hairStyle: pick(HAIR_STYLES), hairColor: pick(HAIR_COLORS), eyes: pick(EYE_COLORS), beard: 'none' },
      outfit: { top: pick(['tee-blue', 'tee-stripe', 'hoodie-purple', 'dress-yellow', 'sailor']), bottom: pick(['jeans', 'skirt-pink', 'shorts-green']), shoes: 'sneakers-white', hat: null, glasses: null, neck: null },
    };
  }

  function editChar(id) {
    ui.editing = id;
    if (id === 'new') ui.draft = randomDraft();
    else {
      const c = S.chars[id];
      ui.draft = { name: c.name, size: c.size, look: { ...c.look }, outfit: { ...c.outfit } };
    }
    ui.tab = 'top';
    show('edit');
  }

  // ---------- cast and map ----------
  function renderCast() {
    const cards = Object.values(S.chars).map(c => {
      const e = entOfChar(c.id), where = !e ? '' : e.sc === 'bag' ? '🎒' : SCENES[e.sc].icon;
      return `<button class="cast-card" data-act="edit" data-arg="${c.id}">${characterSVG(c.look, c.outfit, { view: 'face' })}
        <span class="cast-name">${esc(c.name)}</span><span class="cast-where">${where}</span></button>`;
    }).join('');
    return `<section class="screen cast"><div class="cast-grid">
      <button class="cast-card new" data-act="edit" data-arg="new"><span class="plus">＋</span><span class="cast-name">${T('newChar')}</span></button>${cards}
    </div></section>`;
  }

  function renderMap() {
    return `<section class="screen map">${mapSVG(S.scene, innerHeight > innerWidth)}</section>`;
  }

  // ---------- navigation ----------
  function show(screen) {
    ui.screen = screen;
    renderTop();
    $app.dataset.screen = screen;
    if (screen === 'scene') { Engine.open(S.scene, $app); return; }
    Engine.close();
    $app.innerHTML = { edit: renderEdit, cast: renderCast, map: renderMap }[screen]();
    $app.scrollTop = 0;
  }

  function travel(id) {
    const from = SCENES[S.scene].side, to = SCENES[id].side;
    S.scene = id;
    save();
    if (from === to) { Sound.whoosh(); show('scene'); return; }
    const ferry = document.createElement('div');
    ferry.className = 'ferry';
    ferry.innerHTML = `<div class="ferry-sea"></div><div class="ferry-boat">⛴️</div><p>${to === 'spit' ? T('ferryThere') : T('ferryBack')}</p>`;
    document.body.appendChild(ferry);
    Sound.horn();
    setTimeout(() => { ferry.remove(); show('scene'); }, 2200);
  }

  const A = {
    map() { show('map'); },
    back() { show('scene'); },
    cast() { show('cast'); },
    edit(id) { editChar(id); },
    night() { S.night = !S.night; Engine.setNight(); renderTop(); Sound.click(); },
    mute() { S.muted = !S.muted; Sound.setMuted(S.muted); renderTop(); },
    lang() { S.lang = S.lang === 'lt' ? 'en' : 'lt'; document.documentElement.lang = S.lang; show(ui.screen); },
    size(v) { ui.draft.size = v; return 'edit'; },
    skin(v) { ui.draft.look.skin = v; return 'edit'; },
    hairStyle(v) { ui.draft.look.hairStyle = v; return 'edit'; },
    hairColor(v) { ui.draft.look.hairColor = v; return 'edit'; },
    eyes(v) { ui.draft.look.eyes = v; return 'edit'; },
    beard(v) { ui.draft.look.beard = v; return 'edit'; },
    tab(v) { ui.tab = v; return 'edit'; },
    wear(id) { ui.draft.outfit = dressedWith(ui.draft.outfit, CLOTH_BY_ID[id]); return 'edit'; },
    unwear(slot) { ui.draft.outfit[slot] = null; return 'edit'; },
    done() {
      const d = ui.draft;
      d.name = d.name.trim() || (S.created ? '…' : S.lang === 'lt' ? 'Olivija' : 'Olivia');
      Sound.chime();
      if (!S.created) {
        S.mainChar = S.ents[addChar(d, 'home', 820, 900)].t;
        ensureScene('home');
        S.created = true;
        S.scene = 'home';
        save();
        show('scene');
        setTimeout(() => toast(T('welcome')), 400);
        return;
      }
      if (ui.editing === 'new') { addChar(d, 'bag', 0, 0); toast(T('newInBag')); }
      else Object.assign(S.chars[ui.editing], { name: d.name, size: d.size, look: d.look, outfit: d.outfit });
      save();
      show('scene');
    },
    delete() {
      if (!confirm(T('removeConfirm'))) return;
      removeEnt(entOfChar(ui.editing).id);
      save();
      show('cast');
    },
  };

  document.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (go) { travel(go.dataset.go); return; }
    const el = e.target.closest('[data-act]');
    if (!el || !A[el.dataset.act]) return;
    if (A[el.dataset.act](el.dataset.arg) === 'edit') {
      Sound.click();
      const y = $app.scrollTop;
      $app.innerHTML = renderEdit();
      $app.scrollTop = y;
    }
  });

  document.addEventListener('input', e => { if (e.target.id === 'name') ui.draft.name = e.target.value; });

  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(Engine.relayout, 150); });

  document.documentElement.lang = S.lang;
  Sound.setMuted(S.muted);
  if (S.created) show('scene');
  else {
    ui.draft = { name: '', size: 'kid', look: look(1, 'long', 1, 0), outfit: fit('tee-pink', 'skirt-pink', 'sneakers-white') };
    ui.editing = 'main';
    show('edit');
  }
})();
