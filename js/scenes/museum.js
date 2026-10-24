// Lithuanian Sea Museum in Smiltynė: seals, dolphins, penguins and an aquarium.
const dolphin = (x, y, s = 1, flip = false) => `<g class="dolphin"><g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})">
  <path d="M-70,10 Q-40,-36 30,-24 Q60,-18 76,0 Q60,4 40,4 Q10,30 -50,20 Z" fill="#78909C"/>
  <path d="M-10,-26 L4,-52 L18,-24 Z" fill="#607D8B"/><path d="M-66,12 L-96,-10 L-88,14 L-98,34 Z" fill="#607D8B"/>
  <path d="M-40,14 Q0,26 40,6" stroke="#ECEFF1" stroke-width="8" fill="none" stroke-linecap="round"/>
  <circle cx="46" cy="-8" r="4" fill="#212121"/><path d="M60,2 Q66,4 74,2" stroke="#455A64" stroke-width="3" fill="none"/></g></g>`;

const seal = (x, y, flip = false) => `<g class="seal"><g transform="translate(${x},${y}) scale(${flip ? -1 : 1},1)">
  <path d="M-60,30 Q-50,-20 0,-30 Q30,-36 40,-60 Q60,-80 76,-60 Q86,-40 64,-20 Q50,10 40,30 Z" fill="#8D8D8D"/>
  <circle cx="66" cy="-58" r="4" fill="#212121"/><circle cx="78" cy="-50" r="3" fill="#333"/>
  <path d="M70,-48 l18,-4 M70,-46 l18,2" stroke="#333" stroke-width="1.5"/><path d="M-60,30 L-84,16 L-80,40 Z" fill="#757575"/>
  <path d="M10,10 L30,34 L0,30 Z" fill="#757575"/></g></g>`;

const penguin = (x, y, s = 1) => `<g class="penguin"><g transform="translate(${x},${y}) scale(${s})">
  <ellipse cx="0" cy="-50" rx="30" ry="50" fill="#263238"/><ellipse cx="0" cy="-42" rx="20" ry="38" fill="#fff"/>
  <circle cx="0" cy="-92" r="22" fill="#263238"/><circle cx="-7" cy="-96" r="5" fill="#fff"/><circle cx="7" cy="-96" r="5" fill="#fff"/>
  <circle cx="-7" cy="-96" r="2.5" fill="#000"/><circle cx="7" cy="-96" r="2.5" fill="#000"/><path d="M-6,-86 L6,-86 L0,-76 Z" fill="#FFA000"/>
  <ellipse cx="-12" cy="0" rx="11" ry="5" fill="#FFA000"/><ellipse cx="12" cy="0" rx="11" ry="5" fill="#FFA000"/></g></g>`;

const tankFront = (w, top, bottom) => `<rect x="0" y="${top}" width="${w}" height="${bottom - top}" fill="#4FC3F7" opacity=".35"/>
  <path d="M30,${top + 20} l60,0 l-60,60 Z" fill="#fff" opacity=".25"/><rect x="0" y="${top - 6}" width="${w}" height="12" fill="#E0F7FA" opacity=".8"/>
  <rect x="-10" y="${top - 30}" width="30" height="${bottom - top + 30}" fill="#90A4AE"/><rect x="${w - 20}" y="${top - 30}" width="30" height="${bottom - top + 30}" fill="#90A4AE"/>`;

SCENES.museum = {
  id: 'museum', icon: '🐬', side: 'spit', W: 2400,
  name: N('Jūrų muziejus', 'Sea Museum'),
  bg() {
    const brick = `<defs><pattern id="ms-brick" width="60" height="30" patternUnits="userSpaceOnUse"><rect width="60" height="30" fill="#A84432"/>
      <path d="M0,29 H60 M0,14 H60 M30,0 V14 M0,14 V29 M60,14 V29" stroke="#8C3426" stroke-width="3"/></pattern></defs>`;
    const tiers = [0, 1, 2, 3].map(i => `<rect x="740" y="${520 + i * 50}" width="840" height="50" fill="${i % 2 ? '#1E88E5' : '#42A5F5'}"/>`).join('');
    return `${G.sky('ms-sky', 2400, '#8FD3FF', '#E6F6FF')}${brick}${G.stones('ms-stones', '#CFC6B8', '#ABA195')}
      <rect x="0" y="470" width="2400" height="200" fill="#3D8BC9"/><path d="${G.wave(0, 2400, 500, 5, 140)}" stroke="#90CAF9" stroke-width="4" fill="none"/>
      ${NIGHT_SKY(2400, 1200)}${G.cloud(300, 130, 1)}${G.cloud(1200, 90, 0.9)}${G.cloud(2000, 150, 1.1)}${G.gull(900, 230)}${G.gull(1600, 280, 0.7)}
      <path d="M0,360 Q350,320 700,360 L700,880 L0,880 Z" fill="#6DBE5B"/><rect x="0" y="420" width="700" height="460" fill="url(#ms-brick)"/>
      <path d="M1700,360 Q2050,320 2400,360 L2400,880 L1700,880 Z" fill="#6DBE5B"/><rect x="1700" y="420" width="700" height="460" fill="url(#ms-brick)"/>
      ${[150, 450].map(x => `<path d="M${x},880 V560 Q${x + 60},490 ${x + 120},560 V880 Z" fill="#5D2A1F"/>`).join('')}
      <rect x="160" y="440" width="380" height="64" rx="12" fill="#FFF8E1" stroke="#5D2A1F" stroke-width="5"/>
      ${G.label(350, 484, 'JŪRŲ MUZIEJUS', 38, '#1E3A5F')}
      ${tiers}<path d="M740,520 H1580" stroke="#fff" stroke-width="6"/>
      ${[900, 1160, 1420].map(x => `<path d="M${x},520 V320" stroke="#90A4AE" stroke-width="8"/><rect x="${x}" y="320" width="70" height="20" fill="#FDB913"/><rect x="${x}" y="340" width="70" height="20" fill="#006A44"/><rect x="${x}" y="360" width="70" height="20" fill="#C1272D"/>`).join('')}
      <rect x="0" y="860" width="2400" height="20" fill="#D7CCC8"/><rect x="0" y="880" width="2400" height="120" fill="url(#ms-stones)"/>`;
  },
  platforms: [[0, 2400, 880], [40, 70, 760], [610, 640, 760], [700, 740, 700], [1560, 1600, 700], [1650, 1980, 760]],
  water: [{ x1: 70, x2: 610, y: 790 }, { x1: 740, x2: 1560, y: 720 }],
  seats: [],
  fixtures: [
    {
      id: 'seals', x: 40, y: 480, w: 600, h: 400, eats: ['fish'],
      svg: () => `<rect x="0" y="290" width="600" height="110" fill="#1976D2"/>
        <path d="M330,400 Q340,230 430,210 Q520,200 560,260 Q590,320 580,400 Z" fill="#8D8D8D"/><path d="M380,250 Q420,226 470,232" stroke="#BDBDBD" stroke-width="6" fill="none"/>
        ${seal(450, 210)}${seal(170, 300, true)}`,
      front: () => tankFront(600, 300, 400),
      tap: c => { Sound.seal(); c.anim('clap', 900); },
      onEat: c => { Sound.seal(); c.anim('clap', 900); c.burst('❤️', 4); },
    },
    {
      id: 'bucket', x: 645, y: 800, w: 50, h: 80,
      svg: () => `<path d="M2,20 H48 L42,80 H8 Z" fill="#1E88E5"/><path d="M4,20 Q25,-10 46,20" stroke="#90A4AE" stroke-width="3" fill="none"/>
        <text x="25" y="26" font-size="30" text-anchor="middle">🐟</text>`,
      spawn: ['fish'], spawnAt: [670, 860],
    },
    {
      id: 'dolphins', x: 700, y: 380, w: 900, h: 500, eats: ['fish'],
      svg: () => `<rect x="0" y="330" width="900" height="170" fill="#0288D1"/>
        ${[120, 300, 520, 720].map(x => `<path d="M${x},500 q-14,-40 0,-80 q14,-40 0,-70" stroke="#2E7D32" stroke-width="10" fill="none" stroke-linecap="round"/>`).join('')}
        ${dolphin(300, 420, 1)}${dolphin(620, 440, 0.9, true)}
        <circle cx="450" cy="230" r="34" fill="#FF7043"/><path d="M420,220 Q450,200 480,220" stroke="#fff" stroke-width="6" fill="none"/>
        <path d="M450,264 V330" stroke="#757575" stroke-width="3"/>`,
      front: () => tankFront(900, 340, 500),
      tap: c => { Sound.squeak(); setTimeout(Sound.splash, 900); c.anim('jump', 1300); },
      onEat: c => { Sound.squeak(); c.anim('jump', 1300); c.burst('❤️', 5); },
    },
    {
      id: 'penguins', x: 1650, y: 560, w: 330, h: 320, eats: ['fish'],
      svg: () => `<path d="M0,320 L0,220 Q60,190 120,200 Q200,170 260,200 Q310,190 330,220 V320 Z" fill="#E3F2FD"/>
        <path d="M20,230 Q80,210 140,220" stroke="#fff" stroke-width="8" fill="none"/><path d="M0,280 H330" stroke="#B3E5FC" stroke-width="6"/>
        ${penguin(80, 205, 0.9)}${penguin(180, 196, 1.05)}${penguin(270, 205, 0.8)}`,
      tap: c => { Sound.squeak(); c.anim('waddle', 1200); },
      onEat: c => { Sound.squeak(); c.anim('waddle', 1200); c.burst('❤️', 4); },
    },
    {
      id: 'aquarium', x: 2010, y: 420, w: 360, h: 460,
      svg: () => `<rect x="0" y="0" width="360" height="460" rx="16" fill="#37474F"/><rect x="16" y="16" width="328" height="400" rx="8" fill="#29B6F6"/>
        <path d="M16,380 Q100,350 180,380 T344,370 V416 H16 Z" fill="#FFE082"/>
        ${[60, 140, 280].map(x => `<path d="M${x},400 q-14,-40 0,-80 q14,-40 0,-80" stroke="#43A047" stroke-width="9" fill="none" stroke-linecap="round"/>`).join('')}
        <g class="swim-a"><text x="80" y="120" font-size="54">🐠</text></g><g class="swim-b"><text x="200" y="230" font-size="46">🐟</text></g>
        <g class="swim-a"><text x="120" y="310" font-size="50">🐡</text></g><g class="swim-b"><text x="230" y="110" font-size="40">🦑</text></g>
        <text x="260" y="400" font-size="46">🦀</text><rect x="16" y="416" width="328" height="44" fill="#263238"/>`,
      tap: c => { Sound.splash(); c.burst('🫧', 6); },
    },
  ],
  props: [['fish', 1620, 880], ['ticket', 2100, 880]],
  people: [
    who('Treneris Lukas', 'adult', look(2, 'short', 0, 1), fit('tee-blue', 'shorts-blue', 'sneakers-white', 'cap-red'), 1630, 880, null, 'fish'),
  ],
};
