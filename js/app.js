(() => {
  const COLS = 6, ROWS = 8, HOUSE_COLS = 6, HOUSE_ROWS = 5;
  const SAVE_KEY = 'olivijos-pasaulis-v1';
  const $app = document.getElementById('app');
  const $top = document.getElementById('topbar');
  const $modal = document.getElementById('modal');
  const $toast = document.getElementById('toast');

  const STR = {
    lt: {
      title: 'Olivijos pasaulis', createTitle: 'Sukurk savo veikėją', name: 'Vardas', namePh: 'Tavo vardas',
      skin: 'Oda', hairStyle: 'Šukuosena', hairColor: 'Plaukai', eyes: 'Akys',
      top: 'Viršus', bottom: 'Apačia', shoes: 'Batai', hat: 'Galvai', glasses: 'Akiniai',
      start: 'Pradėti! ✨', save: 'Išsaugoti ✨', walk: 'Vaikščioti', build: 'Statyti', eraser: 'Trinti',
      city: 'Miestas', house: 'Mano namai', wardrobe: 'Garderobas', fridge: 'Šaldytuvas', wall: 'Sienos', floor: 'Grindys',
      changeLook: 'Keisti išvaizdą', foodShop: 'Maisto parduotuvė', clothesShop: 'Drabužių parduotuvė', petShop: 'Gyvūnų parduotuvė',
      buy: 'Pirkti', wear: 'Apsirengti', wearing: 'Dėvi ✓', notEnough: 'Trūksta monetų! Rink 🪙 mieste.', bought: 'Nupirkta!',
      yum: 'Mmm, skanu!', fridgeEmpty: 'Šaldytuvas tuščias. Nueik į maisto parduotuvę!', petName: 'Kaip pavadinsi savo augintinį?',
      ok: 'Gerai', cancel: 'Atšaukti', close: 'Uždaryti', yourPets: 'Tavo augintiniai', noPets: 'Dar neturi augintinių.',
      feed: 'Pamaitinti', eat: 'Ką valgysi?', cityHint: 'Paliesk langelį ir nueik ten. Rink monetas 🪙!',
      buildHint: 'Pasirink, ką statyti, ir paliesk langelį.', houseHint: 'Paliesk save ar augintinį, kad pavalgytumėte.',
      houseBuildHint: 'Pasirink baldą ir paliesk grindis.', none: 'Nieko', hi: 'Labas', inFridge: 'Šaldytuve',
      coinFound: 'Radai monetą!',
    },
    en: {
      title: "Olivia's World", createTitle: 'Create your character', name: 'Name', namePh: 'Your name',
      skin: 'Skin', hairStyle: 'Hairstyle', hairColor: 'Hair', eyes: 'Eyes',
      top: 'Top', bottom: 'Bottom', shoes: 'Shoes', hat: 'Head', glasses: 'Glasses',
      start: 'Start! ✨', save: 'Save ✨', walk: 'Walk', build: 'Build', eraser: 'Erase',
      city: 'City', house: 'My home', wardrobe: 'Wardrobe', fridge: 'Fridge', wall: 'Walls', floor: 'Floor',
      changeLook: 'Change look', foodShop: 'Food store', clothesShop: 'Clothes store', petShop: 'Pet store',
      buy: 'Buy', wear: 'Wear', wearing: 'Wearing ✓', notEnough: 'Not enough coins! Collect 🪙 in the city.', bought: 'Bought!',
      yum: 'Yummy!', fridgeEmpty: 'The fridge is empty. Go to the food store!', petName: 'What will you name your pet?',
      ok: 'OK', cancel: 'Cancel', close: 'Close', yourPets: 'Your pets', noPets: 'No pets yet.',
      feed: 'Feed', eat: 'What would you like to eat?', cityHint: 'Tap a square to walk there. Collect coins 🪙!',
      buildHint: 'Pick something to build and tap a square.', houseHint: 'Tap yourself or a pet to have a snack.',
      houseBuildHint: 'Pick furniture and tap the floor.', none: 'None', hi: 'Hi', inFridge: 'In the fridge',
      coinFound: 'You found a coin!',
    },
  };

  function defaultCity() {
    const c = Array(COLS * ROWS).fill(null);
    const set = (x, y, id) => { c[y * COLS + x] = id; };
    set(0, 0, 'tree'); set(5, 0, 'pine'); set(3, 0, 'sunflower');
    set(1, 1, 'home'); set(4, 1, 'flowers');
    for (let x = 0; x < COLS; x++) set(x, 3, 'road');
    set(0, 4, 'foodshop'); set(2, 4, 'clothshop'); set(4, 4, 'petshop');
    set(3, 6, 'fountain'); set(0, 7, 'tree'); set(5, 6, 'flowers'); set(5, 7, 'water'); set(4, 7, 'water');
    return c;
  }

  function defaultState() {
    return {
      lang: (navigator.language || '').startsWith('en') ? 'en' : 'lt',
      created: false, name: '',
      look: { skin: SKINS[1], hairStyle: 'long', hairColor: HAIR_COLORS[1], eyes: EYE_COLORS[0] },
      outfit: { top: 'tee-pink', bottom: 'skirt-pink', shoes: 'sneakers-white', hat: null, glasses: null },
      owned: CLOTHES.filter(c => c.price === 0).map(c => c.id),
      coins: 100, fridge: {}, pets: [],
      city: defaultCity(), pos: 2 * COLS + 1,
      house: { wall: WALLS[0], floor: FLOORS[0], items: Array(HOUSE_COLS * HOUSE_ROWS).fill(null) },
    };
  }

  let S;
  try { S = Object.assign(defaultState(), JSON.parse(localStorage.getItem(SAVE_KEY)) || {}); }
  catch { S = defaultState(); }
  const save = () => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch { } };

  // Transient UI state (not saved).
  const ui = {
    screen: S.created ? 'city' : 'create', build: false, tool: 'tree', hbuild: false, htool: FURNITURE[0],
    tab: 'top', tryOn: null, coins: new Set(), modal: null, mood: null,
  };

  const t = k => STR[S.lang][k];
  const nm = o => o.name[S.lang];
  const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const tileDef = id => CITY_TILES.find(x => x.id === id);
  const firstPet = () => S.pets[0] && PETS.find(p => p.id === S.pets[0].type);

  // ---------- sound + effects ----------
  let actx;
  function beep(freq = 660, dur = 0.08, delay = 0) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(), g = actx.createGain(), at = actx.currentTime + delay;
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.15, at); g.gain.exponentialRampToValueAtTime(0.001, at + dur + 0.1);
      o.connect(g).connect(actx.destination); o.start(at); o.stop(at + dur + 0.12);
    } catch { }
  }
  const chime = () => { beep(660); beep(880, 0.08, 0.09); beep(1320, 0.12, 0.18); };
  const sad = () => { beep(330, 0.12); beep(260, 0.15, 0.13); };

  function burst(emoji, el, count = 6) {
    const r = el ? el.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'burst';
      s.textContent = emoji;
      s.style.left = (r.left + r.width / 2) + 'px';
      s.style.top = (r.top + r.height / 2) + 'px';
      s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
      s.style.animationDelay = (i * 60) + 'ms';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1400);
    }
  }

  let toastTimer;
  function toast(msg) {
    $toast.textContent = msg;
    $toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $toast.classList.remove('show'), 2200);
  }

  // ---------- rendering ----------
  const me = (opts) => characterSVG(S.look, S.outfit, opts);
  const swatches = (act, list, current) => list.map(c =>
    `<button class="swatch ${c === current ? 'on' : ''}" style="background:${c}" data-act="${act}" data-arg="${c}"></button>`).join('');

  // The outfit with one item swapped in. A bottom can't be seen under a dress, so swap the dress for a plain top.
  function dressedWith(it) {
    const o = { ...S.outfit, [it.slot]: it.id };
    if (it.slot === 'bottom' && CLOTH_BY_ID[o.top] && CLOTH_BY_ID[o.top].full) {
      o.top = S.owned.find(id => CLOTH_BY_ID[id].slot === 'top' && !CLOTH_BY_ID[id].full);
    }
    return o;
  }

  function itemThumb(it) {
    return characterSVG(S.look, dressedWith(it), { view: it.slot });
  }

  function renderTop() {
    const back = ui.screen !== 'city' && ui.screen !== 'create'
      ? `<button class="tb-btn" data-act="go" data-arg="city">🏙️ <span>${t('city')}</span></button>` : '';
    const title = ui.screen === 'create' || !S.name ? t('title') : `${t('hi')}, ${esc(S.name)}!`;
    $top.innerHTML = `${back}<div class="tb-title">${title}</div>
      ${S.created ? `<div class="coins">🪙 ${S.coins}</div>` : ''}
      <button class="tb-btn lang" data-act="lang">${S.lang === 'lt' ? '🇬🇧 EN' : '🇱🇹 LT'}</button>`;
  }

  function renderCreate() {
    const slotRow = slot => CLOTHES.filter(c => c.slot === slot && S.owned.includes(c.id)).map(it =>
      `<button class="thumb ${S.outfit[slot] === it.id ? 'on' : ''}" data-act="wear" data-arg="${it.id}" title="${esc(nm(it))}">${itemThumb(it)}</button>`).join('');
    const hairRow = HAIR_STYLES.map(h =>
      `<button class="thumb ${S.look.hairStyle === h ? 'on' : ''}" data-act="hairStyle" data-arg="${h}">${characterSVG({ ...S.look, hairStyle: h }, {}, { view: 'hat' })}</button>`).join('');
    return `<section class="screen create">
      <h1>${t('createTitle')}</h1>
      <div class="split">
        <div class="stage">${me()}</div>
        <div class="options">
          <label class="field">${t('name')}<input id="name" maxlength="16" placeholder="${t('namePh')}" value="${esc(S.name)}" autocomplete="off"></label>
          <h3>${t('skin')}</h3><div class="row">${swatches('skin', SKINS, S.look.skin)}</div>
          <h3>${t('hairStyle')}</h3><div class="row">${hairRow}</div>
          <h3>${t('hairColor')}</h3><div class="row">${swatches('hairColor', HAIR_COLORS, S.look.hairColor)}</div>
          <h3>${t('eyes')}</h3><div class="row">${swatches('eyes', EYE_COLORS, S.look.eyes)}</div>
          <h3>${t('top')}</h3><div class="row">${slotRow('top')}</div>
          <h3>${t('bottom')}</h3><div class="row">${slotRow('bottom')}</div>
          <h3>${t('shoes')}</h3><div class="row">${slotRow('shoes')}</div>
        </div>
      </div>
      <button class="big-btn" data-act="start">${S.created ? t('save') : t('start')}</button>
    </section>`;
  }

  function renderCity() {
    const pet = firstPet();
    const tiles = S.city.map((id, i) => {
      const d = tileDef(id);
      const here = S.pos === i;
      return `<button class="tile ${id || 'grass'} ${d && d.enter ? 'enter' : ''}" data-act="tile" data-arg="${i}" title="${d ? esc(nm(d)) : ''}">
        <span class="tile-emoji">${d ? d.emoji : ''}</span>
        ${ui.coins.has(i) ? '<span class="coin">🪙</span>' : ''}
        ${here ? `<span class="avatar">${me()}</span>${pet ? `<span class="follower">${pet.emoji}</span>` : ''}` : ''}
      </button>`;
    }).join('');
    const palette = ui.build ? `<div class="palette">
        ${CITY_TILES.map(d => `<button class="pal ${ui.tool === d.id ? 'on' : ''}" data-act="tool" data-arg="${d.id}" title="${esc(nm(d))}">
          <span class="pal-swatch ${d.id}">${d.emoji}</span></button>`).join('')}
        <button class="pal ${ui.tool === 'erase' ? 'on' : ''}" data-act="tool" data-arg="erase" title="${t('eraser')}">🧽</button>
      </div>` : `<div class="quick">
        <button data-act="go" data-arg="house">🏠 ${t('house')}</button>
        <button data-act="go" data-arg="shop-food">🛒 ${t('foodShop')}</button>
        <button data-act="go" data-arg="shop-clothes">👗 ${t('clothesShop')}</button>
        <button data-act="go" data-arg="shop-pets">🐾 ${t('petShop')}</button>
      </div>`;
    return `<section class="screen city">
      ${modeToggle('mode', ui.build)}
      <p class="hint">${ui.build ? t('buildHint') : t('cityHint')}</p>
      <div class="city-grid ${ui.build ? 'building' : ''}" style="--cols:${COLS}">${tiles}</div>
      ${palette}
    </section>`;
  }

  function modeToggle(act, building) {
    return `<div class="toggle">
      <button class="${building ? '' : 'on'}" data-act="${act}" data-arg="walk">🚶 ${t('walk')}</button>
      <button class="${building ? 'on' : ''}" data-act="${act}" data-arg="build">🔨 ${t('build')}</button>
    </div>`;
  }

  function renderHouse() {
    const cells = S.house.items.map((f, i) =>
      `<button class="hcell" data-act="hcell" data-arg="${i}">${f || ''}</button>`).join('');
    const pets = S.pets.map((p, i) => {
      const def = PETS.find(x => x.id === p.type);
      return `<button class="resident pet" style="--i:${i}; left:${12 + ((i * 23) % 70)}%" data-act="feedPet" data-arg="${i}">
        <span class="pet-emoji">${def.emoji}</span><span class="label">${esc(p.name)}</span></button>`;
    }).join('');
    const tools = ui.hbuild ? `
      <h3>${t('wall')}</h3><div class="row">${swatches('wall', WALLS, S.house.wall)}</div>
      <h3>${t('floor')}</h3><div class="row">${swatches('floor', FLOORS, S.house.floor)}</div>
      <div class="palette">${FURNITURE.map(f => `<button class="pal ${ui.htool === f ? 'on' : ''}" data-act="htool" data-arg="${f}">${f}</button>`).join('')}
        <button class="pal ${ui.htool === 'erase' ? 'on' : ''}" data-act="htool" data-arg="erase">🧽</button></div>` : `
      <div class="quick">
        <button data-act="go" data-arg="wardrobe">👗 ${t('wardrobe')}</button>
        <button data-act="openFridge" data-arg="me">🧊 ${t('fridge')}</button>
      </div>`;
    return `<section class="screen house">
      ${modeToggle('hmode', ui.hbuild)}
      <p class="hint">${ui.hbuild ? t('houseBuildHint') : t('houseHint')}</p>
      <div class="room ${ui.hbuild ? 'building' : ''}">
        <div class="wall" style="background:${S.house.wall}"><span class="window">🪟</span><span class="window right">🪟</span></div>
        <div class="floor" style="background:${S.house.floor}; --cols:${HOUSE_COLS}">${cells}</div>
        <div class="residents">
          <button class="resident me" data-act="openFridge" data-arg="me">${me({ mood: ui.mood })}</button>
          ${pets}
        </div>
      </div>
      ${tools}
    </section>`;
  }

  function renderWardrobe() {
    const slots = ['top', 'bottom', 'shoes', 'hat', 'glasses'];
    const items = CLOTHES.filter(c => c.slot === ui.tab && S.owned.includes(c.id));
    const canRemove = ui.tab === 'hat' || ui.tab === 'glasses';
    return `<section class="screen wardrobe">
      <h1>👗 ${t('wardrobe')}</h1>
      <div class="split">
        <div class="stage">${me()}</div>
        <div class="options">
          <div class="tabs">${slots.map(s => `<button class="${ui.tab === s ? 'on' : ''}" data-act="tab" data-arg="${s}">${t(s)}</button>`).join('')}</div>
          <div class="row">
            ${canRemove ? `<button class="thumb none ${S.outfit[ui.tab] ? '' : 'on'}" data-act="unwear" data-arg="${ui.tab}">🚫<small>${t('none')}</small></button>` : ''}
            ${items.map(it => `<button class="thumb ${S.outfit[it.slot] === it.id ? 'on' : ''}" data-act="wear" data-arg="${it.id}" title="${esc(nm(it))}">${itemThumb(it)}</button>`).join('')}
          </div>
          <button class="soft-btn" data-act="go" data-arg="shop-clothes">🛍️ ${t('clothesShop')}</button>
          <button class="soft-btn" data-act="go" data-arg="create">✏️ ${t('changeLook')}</button>
          <button class="soft-btn" data-act="go" data-arg="house">🏠 ${t('house')}</button>
        </div>
      </div>
    </section>`;
  }

  function renderClothesShop() {
    if (!ui.tryOn) ui.tryOn = (CLOTHES.find(c => !S.owned.includes(c.id)) || CLOTHES[0]).id;
    const sel = CLOTH_BY_ID[ui.tryOn];
    const owned = S.owned.includes(sel.id);
    const wearing = S.outfit[sel.slot] === sel.id;
    const action = wearing ? `<button class="big-btn" disabled>${t('wearing')}</button>`
      : owned ? `<button class="big-btn" data-act="buyCloth">${t('wear')}</button>`
        : `<button class="big-btn" data-act="buyCloth">${t('buy')} · 🪙 ${sel.price}</button>`;
    return `<section class="screen shop">
      <h1>👗 ${t('clothesShop')}</h1>
      <div class="split">
        <div class="stage">${characterSVG(S.look, dressedWith(sel))}
          <div class="sel-name">${esc(nm(sel))}</div>${action}</div>
        <div class="options"><div class="cards">
          ${CLOTHES.map(it => `<button class="card ${it.id === ui.tryOn ? 'on' : ''}" data-act="tryOn" data-arg="${it.id}">
            <span class="card-img">${itemThumb(it)}</span>
            <span class="price">${S.owned.includes(it.id) ? '✓' : '🪙 ' + it.price}</span></button>`).join('')}
        </div></div>
      </div>
    </section>`;
  }

  function renderFoodShop() {
    const inFridge = Object.entries(S.fridge).filter(([, n]) => n > 0)
      .map(([id, n]) => `<span class="chip">${FOODS.find(f => f.id === id).emoji} ×${n}</span>`).join('');
    return `<section class="screen shop">
      <h1>🛒 ${t('foodShop')}</h1>
      <div class="shopkeeper">🧑‍🍳</div>
      <div class="cards">
        ${FOODS.map(f => `<button class="card" data-act="buyFood" data-arg="${f.id}">
          <span class="card-emoji">${f.emoji}</span><span class="card-name">${esc(nm(f))}</span><span class="price">🪙 ${f.price}</span></button>`).join('')}
      </div>
      ${inFridge ? `<h3>🧊 ${t('inFridge')}</h3><div class="row">${inFridge}</div>` : ''}
    </section>`;
  }

  function renderPetShop() {
    const mine = S.pets.map(p => `<span class="chip">${PETS.find(x => x.id === p.type).emoji} ${esc(p.name)}</span>`).join('');
    return `<section class="screen shop">
      <h1>🐾 ${t('petShop')}</h1>
      <div class="cards">
        ${PETS.map(p => `<button class="card" data-act="buyPet" data-arg="${p.id}">
          <span class="card-emoji bounce">${p.emoji}</span><span class="card-name">${esc(nm(p))}</span><span class="price">🪙 ${p.price}</span></button>`).join('')}
      </div>
      <h3>${t('yourPets')}</h3><div class="row">${mine || `<p class="hint">${t('noPets')}</p>`}</div>
    </section>`;
  }

  function renderModal() {
    if (!ui.modal) { $modal.className = ''; $modal.innerHTML = ''; return; }
    let body = '';
    if (ui.modal.type === 'fridge') {
      const foods = FOODS.filter(f => S.fridge[f.id] > 0);
      const who = ui.modal.target === 'me' ? t('eat') : `${t('feed')}: ${esc(S.pets[ui.modal.target].name)}`;
      body = `<h2>🧊 ${who}</h2>
        ${foods.length ? `<div class="cards">${foods.map(f => `<button class="card" data-act="eat" data-arg="${f.id}">
          <span class="card-emoji">${f.emoji}</span><span class="price">×${S.fridge[f.id]}</span></button>`).join('')}</div>`
          : `<p>${t('fridgeEmpty')}</p><button class="soft-btn" data-act="goFood">🛒 ${t('foodShop')}</button>`}
        <button class="soft-btn" data-act="closeModal">${t('close')}</button>`;
    } else if (ui.modal.type === 'petname') {
      const def = PETS.find(p => p.id === ui.modal.pet);
      body = `<div class="big-emoji">${def.emoji}</div><h2>${t('petName')}</h2>
        <input id="petname" maxlength="14" value="${esc(nm(def))}" autocomplete="off">
        <div class="row center"><button class="soft-btn" data-act="closeModal">${t('cancel')}</button>
        <button class="big-btn" data-act="confirmPet">${t('ok')} · 🪙 ${def.price}</button></div>`;
    }
    $modal.className = 'open';
    $modal.innerHTML = `<div class="sheet">${body}</div>`;
  }

  function render() {
    document.documentElement.lang = S.lang;
    document.title = t('title');
    renderTop();
    const screens = {
      create: renderCreate, city: renderCity, house: renderHouse, wardrobe: renderWardrobe,
      'shop-clothes': renderClothesShop, 'shop-food': renderFoodShop, 'shop-pets': renderPetShop,
    };
    $app.innerHTML = (screens[ui.screen] || renderCity)();
    $app.dataset.screen = ui.screen;
    renderModal();
  }

  // ---------- actions ----------
  function spend(price) {
    if (S.coins < price) { sad(); toast(t('notEnough')); return false; }
    S.coins -= price;
    return true;
  }

  const A = {
    lang() { S.lang = S.lang === 'lt' ? 'en' : 'lt'; },
    go(screen) {
      ui.screen = screen; ui.build = false; ui.hbuild = false;
      window.scrollTo(0, 0);
    },
    skin(v) { S.look.skin = v; beep(700); },
    hairStyle(v) { S.look.hairStyle = v; beep(700); },
    hairColor(v) { S.look.hairColor = v; beep(700); },
    eyes(v) { S.look.eyes = v; beep(700); },
    wear(id) {
      const it = CLOTH_BY_ID[id];
      const removable = it.slot === 'hat' || it.slot === 'glasses';
      S.outfit = removable && S.outfit[it.slot] === id ? { ...S.outfit, [it.slot]: null } : dressedWith(it);
      beep(780);
    },
    unwear(slot) { S.outfit[slot] = null; },
    tab(slot) { ui.tab = slot; },
    start() {
      if (!S.name.trim()) S.name = S.lang === 'lt' ? 'Olivija' : 'Olivia';
      const first = !S.created;
      S.created = true;
      ui.screen = first ? 'city' : 'wardrobe';
      chime();
      window.scrollTo(0, 0);
    },
    mode(m) { ui.build = m === 'build'; },
    tool(id) { ui.tool = id; beep(600); },
    tile(arg, el) {
      const i = +arg;
      if (ui.build) {
        S.city[i] = ui.tool === 'erase' ? null : ui.tool;
        beep(ui.tool === 'erase' ? 400 : 520);
        return;
      }
      S.pos = i;
      beep(500);
      if (ui.coins.has(i)) {
        ui.coins.delete(i);
        S.coins += 5;
        chime();
        burst('🪙', el, 5);
        toast(`${t('coinFound')} +5`);
      }
      const d = tileDef(S.city[i]);
      if (d && d.enter) setTimeout(() => { A.go(d.enter); save(); render(); }, 450);
    },
    hmode(m) { ui.hbuild = m === 'build'; },
    htool(f) { ui.htool = f; beep(600); },
    hcell(arg) {
      if (!ui.hbuild) return false;
      S.house.items[+arg] = ui.htool === 'erase' ? null : ui.htool;
      beep(ui.htool === 'erase' ? 400 : 520);
    },
    wall(c) { S.house.wall = c; },
    floor(c) { S.house.floor = c; },
    openFridge(target) {
      if (ui.hbuild) return false;
      ui.modal = { type: 'fridge', target: target === 'me' ? 'me' : +target };
    },
    feedPet(i) { return A.openFridge(i); },
    goFood() { ui.modal = null; A.go('shop-food'); },
    closeModal() { ui.modal = null; },
    eat(id, el) {
      S.fridge[id]--;
      if (S.fridge[id] <= 0) delete S.fridge[id];
      const forMe = ui.modal.target === 'me';
      ui.modal = null;
      chime();
      burst(forMe ? '😋' : '❤️', null, 7);
      toast(forMe ? t('yum') : '❤️');
      if (forMe) {
        ui.mood = 'yum';
        setTimeout(() => { ui.mood = null; if (ui.screen === 'house') render(); }, 1500);
      }
    },
    tryOn(id) { ui.tryOn = id; beep(700); },
    buyCloth(_, el) {
      const it = CLOTH_BY_ID[ui.tryOn];
      if (!S.owned.includes(it.id)) {
        if (!spend(it.price)) return;
        S.owned.push(it.id);
        chime();
        burst('✨', el, 8);
        toast(t('bought'));
      }
      S.outfit = dressedWith(it);
    },
    buyFood(id, el) {
      const f = FOODS.find(x => x.id === id);
      if (!spend(f.price)) return;
      S.fridge[id] = (S.fridge[id] || 0) + 1;
      beep(880);
      burst(f.emoji, el, 3);
    },
    buyPet(id) {
      const p = PETS.find(x => x.id === id);
      if (S.coins < p.price) { sad(); toast(t('notEnough')); return; }
      ui.modal = { type: 'petname', pet: id };
      setTimeout(() => { const inp = document.getElementById('petname'); if (inp) inp.select(); }, 50);
    },
    confirmPet() {
      const p = PETS.find(x => x.id === ui.modal.pet);
      const name = (document.getElementById('petname').value || '').trim() || nm(p);
      if (!spend(p.price)) return;
      S.pets.push({ type: p.id, name });
      ui.modal = null;
      chime();
      burst(p.emoji, null, 8);
      toast(`${p.emoji} ${name}!`);
    },
  };

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el || el.disabled) return;
    const fn = A[el.dataset.act];
    if (!fn) return;
    if (fn(el.dataset.arg, el) === false) return;
    save();
    render();
  });

  // Close a modal by tapping the dark backdrop.
  $modal.addEventListener('click', e => { if (e.target === $modal) { ui.modal = null; render(); } });

  document.addEventListener('input', e => {
    if (e.target.id === 'name') { S.name = e.target.value; save(); }
  });

  // Coins appear on empty grass in the city now and then.
  setInterval(() => {
    if (ui.screen !== 'city' || ui.build || ui.modal || ui.coins.size >= 3) return;
    const free = S.city.map((id, i) => (!id && i !== S.pos && !ui.coins.has(i) ? i : -1)).filter(i => i >= 0);
    if (!free.length) return;
    ui.coins.add(free[Math.floor(Math.random() * free.length)]);
    render();
  }, 5000);

  render();

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(() => { });
  }
})();
