// Saved world state, translations and helpers for creating and moving things.
const STR = {
  lt: {
    title: 'Olivijos pasaulis', map: 'Žemėlapis', cast: 'Veikėjai', bagHint: 'Įmesk čia daiktus ar veikėjus ir pasiimk juos kitur',
    createTitle: 'Sukurk savo veikėją', editTitle: 'Keisk veikėją', name: 'Vardas', namePh: 'Vardas',
    skin: 'Oda', hairStyle: 'Šukuosena', hairColor: 'Plaukai', eyes: 'Akys', beard: 'Barzda', size: 'Ūgis', kid: 'Vaikas', adult: 'Suaugęs',
    top: 'Viršus', bottom: 'Apačia', shoes: 'Batai', hat: 'Galvai', glasses: 'Akiniai', neck: 'Kaklui',
    start: 'Pradėti! ✨', done: 'Gatava! ✨', newChar: 'Naujas', remove: 'Ištrinti', removeConfirm: 'Ištrinti šį veikėją?',
    newInBag: 'Naujas veikėjas laukia kuprinėje 🎒', welcome: 'Sveiki atvykę į Klaipėdą! Tempk veikėjus ir daiktus pirštu.',
    luck: 'Paliesk kaminkrėčio sagą – bus laimė!', wish: 'Pašnibždėk pelytei norą – jis išsipildys!',
    ghost: 'Buu! Čia Juodasis vaiduoklis.', amber: 'Radai gintaro! ✨', ferryThere: 'Keltu į Smiltynę!', ferryBack: 'Keltu į Klaipėdą!',
    city: 'Klaipėda', spit: 'Kuršių nerija', sea: 'Baltijos jūra', lagoon: 'Kuršių marios', river: 'Danė',
  },
  en: {
    title: "Olivia's World", map: 'Map', cast: 'Characters', bagHint: 'Drop things or characters here to take them somewhere else',
    createTitle: 'Create your character', editTitle: 'Edit character', name: 'Name', namePh: 'Name',
    skin: 'Skin', hairStyle: 'Hairstyle', hairColor: 'Hair', eyes: 'Eyes', beard: 'Beard', size: 'Size', kid: 'Kid', adult: 'Grown-up',
    top: 'Top', bottom: 'Bottom', shoes: 'Shoes', hat: 'Head', glasses: 'Glasses', neck: 'Neck',
    start: 'Start! ✨', done: 'Done! ✨', newChar: 'New', remove: 'Delete', removeConfirm: 'Delete this character?',
    newInBag: 'A new character is waiting in the bag 🎒', welcome: 'Welcome to Klaipėda! Drag characters and things with your finger.',
    luck: "Touch the chimney sweep's button for good luck!", wish: 'Whisper a wish to the mouse and it will come true!',
    ghost: 'Boo! It is the Black Ghost.', amber: 'You found amber! ✨', ferryThere: 'Taking the ferry to Smiltynė!', ferryBack: 'Taking the ferry to Klaipėda!',
    city: 'Klaipėda', spit: 'Curonian Spit', sea: 'Baltic Sea', lagoon: 'Curonian Lagoon', river: 'Danė',
  },
};

const SAVE_KEY = 'olivijos-pasaulis-v2';

function freshState() {
  return {
    lang: (navigator.language || '').startsWith('en') ? 'en' : 'lt',
    night: false, muted: false, created: false, seq: 1,
    mainChar: null, scene: 'home',
    chars: {}, ents: {}, fx: {}, seen: {}, scroll: {},
  };
}

let S;
try { S = JSON.parse(localStorage.getItem(SAVE_KEY)) || freshState(); } catch { S = freshState(); }

let saveTimer;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch { } }, 250);
}

const T = k => STR[S.lang][k];
const nm = o => o[S.lang];
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const newId = p => p + (S.seq++);

function addEnt(k, t, sc, x, y, pose = null) {
  const id = newId('e');
  S.ents[id] = { id, k, t, sc, x, y, pose, hold: null, by: null };
  return id;
}

function addChar(def, sc, x, y, pose = null) {
  const cid = newId('c');
  S.chars[cid] = { id: cid, name: def.name, size: def.size || 'kid', look: { ...def.look }, outfit: { ...def.outfit } };
  const eid = addEnt('char', cid, sc, x, y, pose);
  if (def.hold) attach(eid, spawnRef(def.hold, sc, x, y));
  return eid;
}

function spawnRef(ref, sc, x, y) {
  return ref.startsWith('p:') ? addEnt('pet', ref.slice(2), sc, x, y) : addEnt('prop', ref, sc, x, y);
}

function attach(holderId, itemId) {
  const h = S.ents[holderId], it = S.ents[itemId];
  if (h.hold && h.hold !== itemId) {
    const old = S.ents[h.hold];
    old.by = null; old.x = h.x + 60; old.y = h.y;
  }
  if (it.by) detach(itemId);
  h.hold = itemId; it.by = holderId; it.sc = h.sc; it.pose = null;
}

function detach(itemId) {
  const it = S.ents[itemId];
  if (!it || !it.by) return;
  const h = S.ents[it.by];
  if (h) h.hold = null;
  it.by = null;
}

function removeEnt(id) {
  const e = S.ents[id];
  if (!e) return;
  detach(id);
  if (e.hold && S.ents[e.hold]) S.ents[e.hold].by = null;
  if (e.k === 'char') delete S.chars[e.t];
  delete S.ents[id];
}

function setScene(id, sc) {
  const e = S.ents[id];
  e.sc = sc;
  if (e.hold && S.ents[e.hold]) S.ents[e.hold].sc = sc;
}

const entOfChar = cid => Object.values(S.ents).find(e => e.k === 'char' && e.t === cid);

// The first time a place is visited, put its things and people there.
function ensureScene(id) {
  if (S.seen[id]) return;
  S.seen[id] = true;
  const sc = SCENES[id];
  sc.props.forEach(([ref, x, y]) => spawnRef(ref, id, x, y));
  sc.people.forEach(p => addChar(p, id, p.x, p.y, p.pose));
}
