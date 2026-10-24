// Illustrated map of Klaipėda and the tip of the Curonian Spit. viewBox 1200x1000, north is up.
const MAP_PINS = { river: [560, 360], oldtown: [700, 480], home: [930, 360], market: [930, 560], museum: [395, 500], beach: [400, 690] };

// On tall (portrait) screens the map zooms in on the places so the pins stay big enough to tap.
function mapSVG(current, portrait) {
  const roofs = Array.from({ length: 18 }, (_, i) => {
    const x = 600 + (i % 6) * 70 + (Math.floor(i / 6) % 2) * 30, y = 410 + Math.floor(i / 6) * 70;
    return `<rect x="${x}" y="${y}" width="40" height="28" fill="#FFF3E0"/><path d="M${x - 5},${y} L${x + 20},${y - 18} L${x + 45},${y} Z" fill="#C2452D"/>`;
  }).join('');
  const pins = Object.entries(MAP_PINS).map(([id, [x, y]]) => {
    const s = SCENES[id], here = id === current;
    return `<g class="pin${here ? ' here' : ''}" data-go="${id}" transform="translate(${x},${y})">
      <circle r="${here ? 58 : 50}" fill="#fff" stroke="${here ? '#FF4FA0' : '#7E57C2'}" stroke-width="${here ? 10 : 7}"/>
      <text y="18" font-size="52" text-anchor="middle">${s.icon}</text>
      <text class="pin-label" y="${here ? 94 : 86}" text-anchor="middle">${esc(nm(s.name))}</text></g>`;
  }).join('');
  const L = (x, y, text, size, rot = 0, fill = '#fff') =>
    `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle" fill="${fill}" font-weight="800" opacity=".9" transform="rotate(${rot} ${x} ${y})" class="map-label">${text}</text>`;
  return `<svg class="map-svg" viewBox="${portrait ? '225 240 870 610' : '0 0 1200 1000'}" preserveAspectRatio="xMidYMid meet" overflow="visible" xmlns="http://www.w3.org/2000/svg">
    <rect x="-2000" y="-1000" width="5200" height="3000" fill="#5BA8DD"/>
    <path d="M-2000,-1000 H370 V0 Q380,200 400,420 Q370,600 320,1000 V2000 H-2000 Z" fill="#3F8FD2"/>
    ${[120, 260, 400, 560, 720, 880].map((y, i) => `<path d="${G.wave(40 + (i % 2) * 60, 300, y, 8, 60)}" stroke="#90CAF9" stroke-width="4" fill="none" opacity=".7"/>`).join('')}
    <path d="M370,-1000 H3200 V640 H1200 V620 Q1000,640 820,640 Q680,630 600,560 Q520,480 450,410 Q400,330 385,200 Z" fill="#A5D6A7"/>
    <rect x="370" y="-1000" width="22" height="1000" fill="#FBE3A6"/><path d="M370,0 Q380,200 395,300 Q405,370 440,410 L455,398 Q420,350 412,280 Q398,160 392,0 Z" fill="#FBE3A6"/>
    <path d="M330,460 Q380,440 450,452 Q480,470 470,520 Q450,700 440,1000 H330 Q345,800 320,620 Q315,520 330,460 Z" fill="#FBE3A6"/>
    <rect x="330" y="1000" width="110" height="1000" fill="#FBE3A6"/><rect x="370" y="1000" width="50" height="1000" fill="#81C784"/>
    <path d="M370,470 Q420,465 445,480 Q440,700 420,1000 H370 Q378,800 365,620 Z" fill="#81C784"/>
    ${[[380, 560], [410, 620], [390, 690], [415, 760], [395, 840], [420, 900], [400, 960]].map(([x, y]) => `<path d="M${x},${y - 30} l-14,28 h28 Z" fill="#2E6B3A"/>`).join('')}
    <path d="M3200,200 L1200,240 Q1000,260 900,320 Q780,390 640,400 Q540,405 470,420" stroke="#5BA8DD" stroke-width="30" fill="none" stroke-linecap="round"/>
    ${roofs}
    ${[[520, 520], [570, 570], [640, 610]].map(([x, y]) => `<g transform="translate(${x},${y}) scale(.18)">${G.crane(0, 0, 1)}</g>`).join('')}
    <g transform="translate(400,385)"><rect x="-8" y="-40" width="16" height="40" fill="#fff"/><rect x="-8" y="-30" width="16" height="8" fill="#E53935"/><rect x="-8" y="-14" width="16" height="8" fill="#E53935"/><path d="M-10,-40 L0,-52 L10,-40 Z" fill="#E53935"/></g>
    <path d="M455,425 Q440,440 430,458" stroke="#fff" stroke-width="5" stroke-dasharray="10 8" fill="none"/>
    <text x="482" y="452" font-size="40">⛴️</text>
    ${L(170, 520, T('sea'), 48, -90)}${L(880, 820, T('lagoon'), 46)}${L(905, 120, T('city'), 64, 0, '#2E7D32')}
    ${L(320, 900, T('spit'), 30, -86, '#5D4037')}${L(1090, 230, T('river'), 34, -10)}
    ${pins}
  </svg>`;
}
