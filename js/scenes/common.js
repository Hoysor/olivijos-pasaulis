// Shared drawing helpers and shorthands for scene definitions. Every scene is 1000 units tall.
const SCENES = {};

const look = (skin, hairStyle, hairColor, eyes = 0, beard = 'none') =>
  ({ skin: SKINS[skin], hairStyle, hairColor: HAIR_COLORS[hairColor], eyes: EYE_COLORS[eyes], beard });
const fit = (top, bottom, shoes, hat = null, glasses = null, neck = null) => ({ top, bottom, shoes, hat, glasses, neck });
const who = (name, size, lk, of, x, y, pose = null, hold = null) => ({ name, size, look: lk, outfit: of, x, y, pose, hold });

// The family that lives at home with the player's character.
const HOME_CAST = [
  who('Mama Rūta', 'adult', look(1, 'long', 3, 1), fit('dress-mint', null, 'shoes-black', null, null, 'amber'), 1930, 900),
  who('Tėtis Tomas', 'adult', look(1, 'short', 1, 0, 'beard'), fit('knit', 'jeans', 'boots-brown'), 1490, 805, 'sit'),
  who('Močiutė Aldona', 'adult', look(0, 'bun', 5, 1), fit('apron', 'skirt-long', 'shoes-black', null, 'glasses-round'), 2175, 805, 'sit'),
  who('Jokūbas', 'kid', look(1, 'spiky', 3, 1), fit('jersey', 'shorts-blue', 'sneakers-white'), 1180, 900),
];

const G = {
  sky: (id, W, top, bottom, h = 1000) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
    <rect width="${W}" height="${h}" fill="url(#${id})"/>`,
  cloud: (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})" fill="#fff" opacity=".92">
    <ellipse cx="0" cy="0" rx="60" ry="28"/><ellipse cx="-42" cy="10" rx="40" ry="22"/><ellipse cx="46" cy="8" rx="44" ry="24"/><ellipse cx="6" cy="-18" rx="38" ry="26"/></g>`,
  gull: (x, y, s = 1) => `<path transform="translate(${x},${y}) scale(${s})" d="M-22,0 Q-11,-13 0,0 Q11,-13 22,0" stroke="#37474F" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  pine: (x, base, s = 1, c = '#2E6B3A') => `<g transform="translate(${x},${base}) scale(${s})">
    <rect x="-7" y="-60" width="14" height="60" fill="#7A4B2A"/>
    <path d="M0,-250 L-45,-150 L-25,-150 L-70,-60 L70,-60 L25,-150 L45,-150 Z" fill="${c}"/>
    <path d="M0,-250 L-20,-205 L20,-205 Z" fill="${shade(c, 25)}"/></g>`,
  tree: (x, base, s = 1, c = '#5CB85C') => `<g transform="translate(${x},${base}) scale(${s})">
    <rect x="-10" y="-90" width="20" height="90" rx="6" fill="#8D5A3B"/>
    <circle cx="0" cy="-140" r="70" fill="${c}"/><circle cx="-50" cy="-110" r="45" fill="${shade(c, -15)}"/><circle cx="50" cy="-115" r="48" fill="${shade(c, -10)}"/>
    <circle cx="-20" cy="-165" r="30" fill="${shade(c, 20)}" opacity=".7"/></g>`,
  win: (x, y, w, h, frame = '#fff', glass = '#BFE6FF') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${frame}"/>
    <rect x="${x + 6}" y="${y + 6}" width="${w - 12}" height="${h - 12}" rx="3" fill="${glass}"/>
    <path d="M${x + w / 2},${y + 6} V${y + h - 6} M${x + 6},${y + h / 2} H${x + w - 6}" stroke="${frame}" stroke-width="5"/>
    <path d="M${x + 14},${y + 14} l${w * 0.2},0 l-${w * 0.2},${h * 0.2} Z" fill="#fff" opacity=".5"/>`,
  // Klaipėda Old Town half-timbered house (fachverkas).
  timber: (x, base, w, h, wall = '#FFF6E5', beam = '#7A3E26', roof = '#C2452D') => {
    const top = base - h, n = Math.max(2, Math.round(w / 90));
    let s = `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`;
    s += `<path d="M${x - 14},${top} L${x + w / 2},${top - w * 0.55} L${x + w + 14},${top} Z" fill="${roof}"/>`;
    s += `<path d="M${x + w / 2 - 6},${top - w * 0.55 + 8} L${x + w / 2 + 6},${top - w * 0.55 + 8}" stroke="${shade(roof, -30)}" stroke-width="6"/>`;
    for (let i = 1; i < 4; i++) s += `<path d="M${x - 14 + i * 14},${top - i * 12} L${x + w + 14 - i * 14},${top - i * 12}" stroke="${shade(roof, -20)}" stroke-width="3" opacity=".5"/>`;
    s += `<rect x="${x + w * 0.7}" y="${top - w * 0.42}" width="22" height="60" fill="#8D4A33"/>`;
    s += `<rect x="${x}" y="${top}" width="${w}" height="10" fill="${beam}"/><rect x="${x}" y="${top + h / 2 - 5}" width="${w}" height="10" fill="${beam}"/>`;
    for (let i = 0; i <= n; i++) s += `<rect x="${x + i * (w - 10) / n}" y="${top}" width="10" height="${h}" fill="${beam}"/>`;
    for (let i = 0; i < n; i++) {
      const cx = x + 5 + i * (w - 10) / n, cw = (w - 10) / n;
      s += `<path d="M${cx + 5},${top + h / 2} L${cx + cw},${top + 10}" stroke="${beam}" stroke-width="8"/>`;
      s += G.win(cx + cw * 0.28, top + h / 2 + 30, cw * 0.44, h * 0.22, '#fff', '#9FD3F5');
    }
    return s;
  },
  awning: (x, y, w, c1, c2, h = 50) => {
    const n = Math.round(w / 40), sw = w / n;
    let s = '';
    for (let i = 0; i < n; i++) s += `<path d="M${x + i * sw},${y} h${sw} v${h} a${sw / 2},${sw / 3} 0 0 1 -${sw},0 Z" fill="${i % 2 ? c2 : c1}"/>`;
    return s;
  },
  // Lithuanian flag pennants: yellow, green, red.
  garland: (x1, x2, y) => {
    const cols = ['#FDB913', '#006A44', '#C1272D'];
    let s = `<path d="M${x1},${y} Q${(x1 + x2) / 2},${y + 40} ${x2},${y}" stroke="#795548" stroke-width="3" fill="none"/>`;
    const n = Math.round((x2 - x1) / 44);
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n, px = x1 + (x2 - x1) * t, py = y + 40 * 4 * t * (1 - t) * 0.5;
      s += `<path d="M${px - 16},${py} L${px + 16},${py} L${px},${py + 34} Z" fill="${cols[i % 3]}"/>`;
    }
    return s;
  },
  crane: (x, base, s = 1, c = '#F2B33D') => `<g transform="translate(${x},${base}) scale(${s})" fill="none" stroke="${c}" stroke-width="10" stroke-linejoin="round">
    <path d="M-40,0 L-20,-260 L20,-260 L40,0 M-30,-120 L30,-120 M-34,-60 L34,-60"/>
    <path d="M-80,-260 L200,-260 M-20,-260 L0,-320 L20,-260 M0,-320 L200,-262 M0,-320 L-80,-262"/>
    <path d="M150,-260 L150,-170" stroke-width="4"/><rect x="138" y="-170" width="24" height="16" fill="${c}"/></g>`,
  label: (x, y, text, size = 40, fill = '#fff', extra = '') => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="900"
    font-family="ui-rounded, 'Arial Rounded MT Bold', Arial, sans-serif" fill="${fill}" ${extra}>${text}</text>`,
  stones: (id, c1, c2) => `<defs><pattern id="${id}" width="60" height="34" patternUnits="userSpaceOnUse">
    <rect width="60" height="34" fill="${c2}"/><rect x="2" y="2" width="26" height="13" rx="6" fill="${c1}"/><rect x="32" y="2" width="26" height="13" rx="6" fill="${c1}"/>
    <rect x="-13" y="19" width="26" height="13" rx="6" fill="${c1}"/><rect x="17" y="19" width="26" height="13" rx="6" fill="${c1}"/><rect x="47" y="19" width="26" height="13" rx="6" fill="${c1}"/></pattern></defs>`,
  planks: (id, c) => `<defs><pattern id="${id}" width="160" height="34" patternUnits="userSpaceOnUse">
    <rect width="160" height="34" fill="${c}"/><path d="M0,33 H160 M80,0 V17 M20,17 V34 M0,17 H160" stroke="${shade(c, -30)}" stroke-width="2.5"/></pattern></defs>`,
  wave: (x1, x2, y, amp = 10, len = 80) => {
    let d = `M${x1},${y}`;
    for (let x = x1; x < x2; x += len) d += ` q${len / 4},-${amp} ${len / 2},0 t${len / 2},0`;
    return d;
  },
};

// Moon and stars, only visible at night (see .moon in style.css).
const NIGHT_SKY = (W, mx = W * 0.8) => `<g class="moon"><circle cx="${mx}" cy="140" r="56" fill="#FFF9C4"/>
  ${Array.from({ length: Math.round(W / 70) }, (_, i) => `<circle cx="${(i * 137) % W}" cy="${30 + ((i * 89) % 330)}" r="${2.5 + (i % 3)}" fill="#fff"/>`).join('')}</g>`;

// Little stars for night windows.
const STARS = (x, y, w, h, n = 6) => Array.from({ length: n }, (_, i) =>
  `<circle cx="${x + ((i * 53) % w)}" cy="${y + ((i * 37) % h)}" r="${2 + (i % 2)}" fill="#fff"/>`).join('');
