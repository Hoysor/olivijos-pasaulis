// Smiltynė beach on the Curonian Spit: dunes and pines, the Baltic Sea, and amber in the seaweed.
const amberSpot = (id, x) => ({
  id, x, y: 866, w: 100, h: 34,
  svg: () => `<path d="M0,34 Q10,8 30,14 Q46,0 62,12 Q84,4 100,34 Z" fill="#558B2F"/><path d="M14,30 Q30,16 50,22 Q70,14 90,30" stroke="#33691E" stroke-width="4" fill="none"/>
    <circle cx="70" cy="26" r="5" fill="#F39C12"/>`,
  tap: c => { Sound.sparkle(); c.spawn('gintaras'); c.toast(T('amber')); },
});

SCENES.beach = {
  id: 'beach', icon: '🏖️', side: 'spit', W: 2600,
  name: N('Smiltynės paplūdimys', 'Smiltynė beach'),
  bg() {
    const grass = (x, y) => `<path d="M${x},${y} l-8,-30 M${x},${y} l2,-36 M${x},${y} l12,-28" stroke="#7CB342" stroke-width="4" stroke-linecap="round"/>`;
    return `${G.sky('bc-sky', 2600, '#7FCBFF', '#FFF6E0')}
      <defs><linearGradient id="bc-sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBE3A6"/><stop offset="1" stop-color="#F1CC7A"/></linearGradient></defs>
      <g class="sun"><circle cx="2200" cy="150" r="70" fill="#FFE082"/><circle cx="2200" cy="150" r="54" fill="#FFF176"/></g>${NIGHT_SKY(2600, 2200)}
      ${G.cloud(500, 120, 1)}${G.cloud(1400, 90, 0.8)}${G.cloud(1900, 200, 0.6)}
      <rect x="0" y="520" width="2600" height="480" fill="#3F8FD2"/><path d="${G.wave(0, 2600, 560, 5, 160)}" stroke="#90CAF9" stroke-width="4" fill="none"/>
      <path d="${G.wave(0, 2600, 620, 6, 200)}" stroke="#90CAF9" stroke-width="4" fill="none" opacity=".7"/>
      <path d="M1100,505 L1160,505 L1150,518 L1110,518 Z" fill="#fff"/><path d="M1130,505 V460 L1155,500 Z" fill="#fff" stroke="#666" stroke-width="2"/>
      <rect x="2440" y="520" width="160" height="16" fill="#9E9E9E"/>
      <path d="M0,520 Q300,440 600,520 Q700,560 760,640 Q900,700 1000,700 L1880,720 Q1940,760 1980,1000 L0,1000 Z" fill="url(#bc-sand)"/>
      <path d="M0,640 H420 L660,900 H2000 L2600,1000 H0 Z" fill="url(#bc-sand)"/>
      ${G.pine(60, 560, 0.8)}${G.pine(170, 540, 1)}${G.pine(290, 560, 0.85)}${G.pine(380, 600, 0.7)}
      ${[90, 230, 330, 470, 720, 860].map((x, i) => grass(x, [640, 640, 640, 660, 700, 710][i])).join('')}
      <path d="M420,640 L660,900" stroke="#A1887F" stroke-width="10"/>
      ${[[420, 700], [500, 770], [580, 840]].map(([x, y]) => `<rect x="${x}" y="${y - 6}" width="80" height="14" rx="4" fill="#8D6E63"/><rect x="${x + 70}" y="${y + 8}" width="10" height="${900 - y}" fill="#6D4C41"/>`).join('')}
      <rect x="0" y="634" width="420" height="14" rx="4" fill="#8D6E63"/>
      ${G.gull(700, 300)}${G.gull(760, 330, 0.7)}${G.gull(1700, 260, 0.9)}`;
  },
  front: () => `<path d="${G.wave(1880, 2600, 836, 10, 90)} V1000 H2060 Q1960,920 1880,836 Z" fill="#3F8FD2" opacity=".82"/>
    <path class="waves" d="${G.wave(1880, 2700, 840, 10, 90)}" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path class="waves slow" d="${G.wave(1940, 2700, 900, 8, 120)}" stroke="#B3E5FC" stroke-width="5" fill="none"/>`,
  platforms: [[0, 420, 640], [420, 500, 700], [500, 580, 770], [580, 660, 840], [660, 2600, 900], [770, 930, 570], [990, 1230, 760]],
  water: [{ x1: 1950, x2: 2600, y: 840 }],
  seats: [{ x: 1390, y: 815, pose: 'lie' }],
  fixtures: [
    {
      id: 'lighthouse', x: 2470, y: 330, w: 70, h: 200, init: 1,
      svg: st => `${st ? `<g class="beam"><path d="M35,30 L-260,-10 L-260,70 Z" fill="#FFF59D" opacity=".55"/></g>` : ''}
        <path d="M14,200 L22,40 H48 L56,200 Z" fill="#fff"/>${[70, 120, 170].map(y => `<path d="M${17 + (200 - y) * 0.02},${y} H${53 - (200 - y) * 0.02}" stroke="#E53935" stroke-width="22"/>`).join('')}
        <rect x="18" y="20" width="34" height="24" fill="${st ? '#FFEB3B' : '#B0BEC5'}" stroke="#333" stroke-width="3"/><path d="M14,20 L35,0 L56,20 Z" fill="#E53935"/>`,
      glow: { x: 2505, y: 362, r: 160, on: st => st === 1 },
      tap: c => { c.next(); Sound.click(); },
    },
    {
      id: 'ferry', x: 1500, y: 450, w: 260, h: 80,
      svg: () => `<path d="M0,40 H260 L240,74 H20 Z" fill="#fff"/><rect x="0" y="52" width="260" height="8" fill="#1E88E5"/>
        <rect x="60" y="14" width="140" height="28" rx="6" fill="#fff" stroke="#90A4AE" stroke-width="3"/>${[75, 105, 135, 165].map(x => `<rect x="${x}" y="20" width="20" height="12" rx="3" fill="#64B5F6"/>`).join('')}
        <rect x="120" y="0" width="16" height="16" fill="#E53935"/>`,
      tap: c => { Sound.horn(); c.anim('sail', 3000); },
    },
    {
      id: 'tower', x: 760, y: 380, w: 180, h: 520, states: 3,
      svg: st => `<path d="M20,520 L40,190 M160,520 L140,190 M40,300 L140,420 M140,300 L40,420" stroke="#8D6E63" stroke-width="12"/>
        <path d="M150,520 L190,250" stroke="#6D4C41" stroke-width="6"/>${[290, 340, 390, 440, 490].map(y => `<path d="M${150 + (520 - y) * 0.15},${y} h18" stroke="#6D4C41" stroke-width="5"/>`).join('')}
        <rect x="0" y="180" width="180" height="16" rx="4" fill="#A1887F"/><rect x="20" y="80" width="140" height="100" rx="8" fill="#E53935"/>
        <rect x="40" y="100" width="100" height="50" rx="6" fill="#B3E5FC"/><path d="M0,84 L90,30 L180,84 Z" fill="#fff"/>
        ${G.label(90, 172, '+', 30, '#fff')}<path d="M170,84 V-40" stroke="#555" stroke-width="5"/>
        <path d="M172,-40 L230,-25 L172,-8 Z" fill="${['#43A047', '#FDD835', '#E53935'][st]}"/>`,
      tap: c => { c.next(); Sound.whoosh(); },
    },
    {
      id: 'kiosk', x: 990, y: 560, w: 240, h: 340,
      svg: () => `<rect x="10" y="60" width="220" height="280" fill="#4FC3F7"/>${G.awning(0, 50, 240, '#FF7043', '#fff', 46)}
        <rect x="40" y="-10" width="160" height="50" rx="12" fill="#fff" stroke="#FF7043" stroke-width="5"/>${G.label(120, 28, 'LEDAI', 32, '#FF7043')}
        <rect x="30" y="110" width="180" height="80" rx="6" fill="#E1F5FE"/><text x="70" y="172" font-size="50" text-anchor="middle">🍦</text><text x="160" y="172" font-size="50" text-anchor="middle">🍉</text>
        <rect x="0" y="196" width="240" height="14" rx="5" fill="#0288D1"/>`,
      spawn: ['icecream', 'gira', 'kibinai', 'zuvis', 'watermelon', 'corn', 'lollipop', 'juice'], spawnAt: [1110, 700],
    },
    {
      id: 'umbrella', x: 1260, y: 560, w: 260, h: 340,
      svg: () => `<path d="M110,30 L140,340" stroke="#795548" stroke-width="8"/>
        <path d="M0,90 Q110,-30 230,70 Z" fill="#FF4081"/><path d="M60,74 Q110,-10 150,80" fill="#fff"/><path d="M0,90 Q115,60 230,70" stroke="#C2185B" stroke-width="4" fill="none"/>
        <rect x="30" y="322" width="220" height="18" rx="6" fill="#26C6DA"/><path d="M50,322 V340 M90,322 V340 M130,322 V340 M170,322 V340 M210,322 V340" stroke="#fff" stroke-width="6"/>`,
    },
    {
      id: 'castle', x: 1540, y: 760, w: 160, h: 140, states: 5,
      svg: st => {
        const tower = (x, h) => `<rect x="${x}" y="${140 - h}" width="34" height="${h}" fill="#E8C47A"/>${[0, 1, 2].map(i => `<rect x="${x + i * 12}" y="${132 - h}" width="10" height="10" fill="#E8C47A"/>`).join('')}`;
        let s = `<ellipse cx="80" cy="134" rx="80" ry="10" fill="#E1B86A"/>`;
        if (st === 0) s += `<path d="M30,136 Q80,90 130,136 Z" fill="#E8C47A"/>`;
        if (st >= 1) s += tower(64, 70);
        if (st >= 2) s += tower(14, 50) + tower(112, 50) + `<rect x="40" y="100" width="80" height="40" fill="#DDB56C"/>`;
        if (st >= 3) s += `<path d="M80,70 V30" stroke="#795548" stroke-width="3"/><rect x="80" y="30" width="30" height="7" fill="#FDB913"/><rect x="80" y="37" width="30" height="7" fill="#006A44"/><rect x="80" y="44" width="30" height="7" fill="#C1272D"/>`;
        if (st >= 4) s += `<path d="M66,140 V118 Q80,104 94,118 V140 Z" fill="#8D6E63"/><text x="30" y="128" font-size="22">🐚</text><text x="112" y="130" font-size="20">⭐</text>`;
        return s;
      },
      tap: c => { c.next(); if (c.st) Sound.pop(); else { Sound.whoosh(); c.burst('💨', 4); } },
    },
    amberSpot('seaweed1', 1730),
    amberSpot('seaweed2', 680),
    {
      id: 'toys', x: 1840, y: 820, w: 80, h: 80,
      svg: () => `<path d="M4,24 H76 L68,80 H12 Z" fill="#FFB74D"/><path d="M4,40 H76 M8,56 H72" stroke="#E65100" stroke-width="3"/>
        <text x="40" y="26" font-size="34" text-anchor="middle">🏐</text>`,
      spawn: ['beachball', 'bucket', 'kite', 'lifebuoy', 'shell', 'crab', 'umbrella'], spawnAt: [1880, 880],
    },
    {
      id: 'gull', x: 1200, y: 220, w: 90, h: 50,
      svg: () => `<path d="M5,30 Q25,0 45,26 Q65,0 85,30" stroke="#37474F" stroke-width="6" fill="none" stroke-linecap="round"/><ellipse cx="45" cy="30" rx="12" ry="7" fill="#fff"/>`,
      tap: c => { Sound.gull(); c.anim('fly', 2000); },
    },
  ],
  props: [['shell', 1800, 900], ['crab', 1460, 900], ['bucket', 1640, 900], ['beachball', 1250, 900]],
  people: [
    who('Gelbėtojas Mantas', 'adult', look(2, 'short', 3, 1), fit('tee-red', 'shorts-blue', null, null, 'sunglasses'), 850, 570),
    who('Austėja', 'kid', look(1, 'braids', 4, 1), fit('swim', null, null, 'sunhat'), 1500, 900),
  ],
};
