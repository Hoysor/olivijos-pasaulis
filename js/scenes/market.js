// The old market (Senoji turgavietė): stalls hand out food, amber, clothes, flowers and pets.
function displayItems(refs, w, y = 150, size = 64) {
  const step = (w - 40) / refs.length;
  return refs.map((ref, i) => {
    const x = 20 + i * step + (step - size) / 2;
    if (ref.startsWith('c:')) return clothIconSVG(CLOTH_BY_ID[ref.slice(2)]).replace('<svg ', `<svg x="${x}" y="${y}" width="${size}" height="${size}" `);
    const emoji = ref.startsWith('p:') ? PETS[ref.slice(2)].emoji : PROPS[ref].emoji;
    if (emoji) return `<text x="${x + size / 2}" y="${y + size * 0.85}" font-size="${size * 0.85}" text-anchor="middle">${emoji}</text>`;
    return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 100 100">${PROP_SVG[ref]}</svg>`;
  }).join('');
}

function stall(id, x, label, c1, c2, show, spawn, extra = '') {
  const w = 350, sign = Math.max(200, label.length * 16 + 40);
  return {
    id, x, y: 420, w, h: 460, spawn, spawnAt: [x + w / 2, 650],
    svg: st => `<path d="M14,60 V460 M${w - 14},60 V460" stroke="#6D4C41" stroke-width="12"/>
      <rect x="${w / 2 - sign / 2}" y="-30" width="${sign}" height="56" rx="12" fill="#FFF8E1" stroke="#8D6E63" stroke-width="5"/>
      ${G.label(w / 2, 10, label, 30, '#5D4037')}
      ${G.awning(0, 40, w, c1, c2, 60)}${extra}
      <rect x="0" y="280" width="${w}" height="180" fill="#A1887F"/>${[0, 1, 2, 3].map(i => `<path d="M0,${310 + i * 40} H${w}" stroke="#8D6E63" stroke-width="3"/>`).join('')}
      ${G.awning(0, 286, w, c1, c2, 30)}<rect x="-6" y="272" width="${w + 12}" height="16" rx="5" fill="#6D4C41"/>
      ${displayItems(show, w, 196, 76)}
      ${st ? `<rect x="0" y="40" width="${w}" height="420" fill="#fff" opacity=".12"/>` : ''}`,
  };
}

SCENES.market = {
  id: 'market', icon: '🧺', side: 'city', W: 2400,
  name: N('Senoji turgavietė', 'Old market'),
  bg() {
    const arches = Array.from({ length: 12 }, (_, i) => `<path d="M${70 + i * 195},700 V420 Q${70 + i * 195 + 60},340 ${70 + i * 195 + 120},420 V700 Z" fill="#FFE9C6" stroke="#8E3B2A" stroke-width="10"/>
      <path d="M${130 + i * 195},360 V700 M${70 + i * 195},520 H${190 + i * 195}" stroke="#8E3B2A" stroke-width="5"/>`).join('');
    const bricks = `<defs><pattern id="mk-brick" width="60" height="30" patternUnits="userSpaceOnUse"><rect width="60" height="30" fill="#B5523B"/>
      <path d="M0,29 H60 M0,14 H60 M30,0 V14 M0,14 V29 M60,14 V29" stroke="#9A4130" stroke-width="3"/></pattern></defs>`;
    return `${G.sky('mk-sky', 2400, '#9AD7FF', '#E8F7FF')}${bricks}${G.stones('mk-stones', '#C5B9AA', '#A1958A')}
      ${NIGHT_SKY(2400, 300)}${G.cloud(400, 110, 1)}${G.cloud(1500, 80, 0.8)}${G.cloud(2150, 130, 1)}
      <path d="M-20,250 L1200,170 L2420,250 Z" fill="#7A3E26"/>
      <rect x="0" y="250" width="2400" height="630" fill="url(#mk-brick)"/>${arches}
      <rect x="850" y="196" width="700" height="80" rx="16" fill="#FFF8E1" stroke="#7A3E26" stroke-width="6"/>
      ${G.label(1200, 252, 'SENOJI TURGAVIETĖ', 50, '#7A3E26')}
      <rect x="0" y="860" width="2400" height="20" fill="#D7CCC8"/><rect x="0" y="880" width="2400" height="120" fill="url(#mk-stones)"/>`;
  },
  platforms: [[0, 2400, 880], ...[20, 400, 780, 1160, 1540, 1920].map(x => [x, x + 350, 700])],
  seats: [],
  fixtures: [
    stall('veg', 20, 'Daržovės', '#43A047', '#fff', ['apple', 'carrot', 'cucumber', 'strawberry', 'mushroom'],
      ['apple', 'pear', 'strawberry', 'cherries', 'blueberries', 'cucumber', 'carrot', 'potato', 'tomato', 'mushroom', 'watermelon', 'corn']),
    stall('lt-food', 400, 'Lietuviška virtuvė', '#C1272D', '#FDB913', ['cepelinai', 'saltibarsciai', 'kibinai', 'duona'],
      ['cepelinai', 'saltibarsciai', 'kibinai', 'sakotis', 'duona', 'zuvis', 'surelis', 'gira', 'honey', 'cheese', 'pancakes']),
    stall('amber', 780, 'Gintaras', '#F39C12', '#FFF3D6', ['gintaras', 'c:amber', 'gintaras'], ['c:amber', 'gintaras', 'shell']),
    stall('clothes', 1160, 'Drabužiai', '#9B7BEA', '#fff', ['c:folk', 'c:rue-wreath', 'c:raincoat', 'c:jersey'], ALL_CLOTHES,
      `<path d="M30,120 H320" stroke="#90A4AE" stroke-width="6"/>${['#FF8FC7', '#FFD600', '#2E7D32', '#5DADE2', '#E53935', '#9B7BEA'].map((c, i) =>
        `<path d="M${50 + i * 46},120 l-12,24 v80 h24 v-80 z" fill="${c}"/>`).join('')}`),
    stall('flowers', 1540, 'Gėlės', '#EC407A', '#fff', ['tulip', 'sunflower', 'rose', 'bouquet', 'daisy'], ['tulip', 'sunflower', 'rose', 'bouquet', 'daisy']),
    stall('pets', 1920, 'Gyvūnai', '#26A69A', '#fff', ['p:dog', 'p:cat', 'p:bunny', 'p:hamster'],
      Object.keys(PETS).map(p => 'p:' + p),
      `${[30, 190].map(x => `<rect x="${x}" y="110" width="130" height="90" rx="8" fill="none" stroke="#78909C" stroke-width="4"/>${[1, 2, 3, 4, 5].map(i => `<path d="M${x + i * 22},110 V200" stroke="#78909C" stroke-width="2"/>`).join('')}`).join('')}
      <text x="95" y="185" font-size="60" text-anchor="middle">🦜</text><text x="255" y="185" font-size="60" text-anchor="middle">🐹</text>`),
    {
      id: 'register', x: 2285, y: 730, w: 100, h: 150,
      svg: () => `<rect x="0" y="70" width="100" height="80" fill="#8D6E63"/><rect x="10" y="20" width="80" height="50" rx="8" fill="#546E7A"/>
        <rect x="20" y="0" width="60" height="24" rx="4" fill="#263238"/>${G.label(50, 18, '€', 18, '#69F0AE')}
        ${[0, 1, 2].map(i => [0, 1].map(j => `<rect x="${20 + i * 22}" y="${30 + j * 18}" width="16" height="12" rx="3" fill="#ECEFF1"/>`).join('')).join('')}`,
      tap: c => { Sound.ding(); c.spawn('euro'); },
    },
  ],
  props: [],
  people: [
    who('Pardavėja Danutė', 'adult', look(1, 'bob', 2, 2), fit('apron', 'skirt-long', 'shoes-black', 'flower'), 385, 880),
    who('Pardavėjas Algis', 'adult', look(0, 'short', 3, 1, 'mustache'), fit('apron', 'jeans', 'boots-brown', 'cap-red'), 1530, 880),
  ],
};
