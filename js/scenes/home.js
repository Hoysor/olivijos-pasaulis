// Home: an apartment in a half-timbered Old Town house. Bathroom, bedroom, living room, kitchen.
SCENES.home = {
  id: 'home', icon: '🏠', side: 'city', W: 2500,
  name: N('Namai', 'Home'),
  bg() {
    const tiles = Array.from({ length: 11 }, (_, i) => `<path d="M${i * 50},46 V880" stroke="#fff" stroke-width="3" opacity=".6"/>`).join('') +
      Array.from({ length: 17 }, (_, i) => `<path d="M0,${46 + i * 50} H510" stroke="#fff" stroke-width="3" opacity=".6"/>`).join('');
    const dots = Array.from({ length: 60 }, (_, i) => `<circle cx="${540 + (i % 10) * 58 + (Math.floor(i / 10) % 2) * 29}" cy="${90 + Math.floor(i / 10) * 130}" r="7" fill="#FFC1D9"/>`).join('');
    const stripes = Array.from({ length: 15 }, (_, i) => `<rect x="${1130 + i * 40}" y="46" width="18" height="834" fill="#FFE7A6" opacity=".7"/>`).join('');
    const backsplash = Array.from({ length: 16 }, (_, i) => Array.from({ length: 4 }, (_, j) =>
      `<rect x="${1870 + i * 40 + 2}" y="${560 + j * 36 + 2}" width="36" height="32" rx="4" fill="${(i + j) % 2 ? '#FFFFFF' : '#CDE8F6'}"/>`).join('')).join('');
    return `${G.planks('h-floor', '#C98F5B')}
      <rect x="0" y="0" width="520" height="900" fill="#BFE3F2"/>${tiles}
      <rect x="520" y="0" width="600" height="900" fill="#FFE1EC"/>${dots}
      <rect x="1120" y="0" width="600" height="900" fill="#FFF1C9"/>${stripes}
      <rect x="1720" y="0" width="780" height="900" fill="#E3F4DF"/>${backsplash}
      <rect x="0" y="0" width="2500" height="46" fill="#7A3E26"/>
      ${[0, 510, 1110, 1710, 2480].map(x => `<rect x="${x}" y="46" width="20" height="854" fill="#7A3E26"/>`).join('')}
      <rect x="0" y="880" width="2500" height="20" fill="#fff"/>
      <rect x="0" y="900" width="2500" height="100" fill="url(#h-floor)"/>

      <!-- bathroom: porthole window and towel -->
      <circle cx="210" cy="260" r="70" fill="#fff"/><circle cx="210" cy="260" r="56" fill="#8FD0F5"/>
      <path d="M154,290 Q210,270 266,290 L266,300 Q210,320 154,300 Z" fill="#3D8BC9"/><circle cx="210" cy="260" r="56" fill="none" stroke="#B0BEC5" stroke-width="8"/>
      <rect x="40" y="420" width="120" height="8" rx="4" fill="#90A4AE"/><rect x="60" y="428" width="80" height="120" rx="8" fill="#FF8FC7"/>
      <rect x="60" y="500" width="80" height="12" fill="#fff"/>
      <!-- bedroom: harbour view window with curtains, stork picture, rug -->
      <rect x="700" y="220" width="220" height="250" rx="8" fill="#fff"/>
      <rect x="708" y="228" width="204" height="234" fill="#A8DBFF"/>
      <rect x="708" y="400" width="204" height="62" fill="#3D8BC9"/>
      ${G.crane(760, 402, 0.4)}${G.crane(860, 402, 0.32, '#42A5F5')}
      ${G.cloud(800, 270, 0.5)}
      <path d="M810,228 V462 M708,345 H912" stroke="#fff" stroke-width="7"/>
      <path d="M680,200 Q700,340 690,500 L740,500 Q720,340 740,200 Z" fill="#FF6FB5"/><path d="M940,200 Q920,340 930,500 L880,500 Q900,340 880,200 Z" fill="#FF6FB5"/>
      <rect x="670" y="192" width="280" height="14" rx="7" fill="#C2185B"/>
      <rect x="565" y="560" width="110" height="110" rx="6" fill="#8D6E63"/><rect x="575" y="570" width="90" height="90" fill="#E3F2FD"/>
      <path d="M600,640 L610,600 Q620,580 640,590 L645,600 L660,602 L645,608 L640,615 L630,640 Z" fill="#fff" stroke="#333" stroke-width="2"/>
      <path d="M612,640 L606,656 M626,640 L630,656" stroke="#E53935" stroke-width="3"/>
      <ellipse cx="760" cy="955" rx="190" ry="30" fill="#F48FB1" opacity=".8"/>
      <rect x="870" y="800" width="90" height="100" rx="6" fill="#A1887F"/><rect x="882" y="830" width="66" height="10" rx="5" fill="#6D4C41"/>
      <!-- living room: Lithuanian flag garland, picture of the Meridianas -->
      ${G.garland(1140, 1700, 80)}
      <rect x="1450" y="230" width="150" height="110" rx="6" fill="#8D6E63"/><rect x="1460" y="240" width="130" height="90" fill="#B3E5FC"/>
      <rect x="1460" y="300" width="130" height="30" fill="#1E88E5"/><path d="M1480,300 L1570,300 L1560,316 L1490,316 Z" fill="#fff"/>
      <path d="M1505,300 V250 M1525,300 V246 M1545,300 V252" stroke="#5D4037" stroke-width="3"/>
      <path d="M1507,256 L1522,292 L1507,292 Z M1527,252 L1542,292 L1527,292 Z M1547,258 L1560,292 L1547,292 Z" fill="#fff"/>
      <ellipse cx="1520" cy="955" rx="230" ry="32" fill="#9575CD" opacity=".6"/>
      <!-- kitchen: window, counter with sink, shelf, table and chairs, clock -->
      <rect x="1960" y="330" width="170" height="200" rx="8" fill="#fff"/><rect x="1968" y="338" width="154" height="184" fill="#A8DBFF"/>
      <path d="M1968,480 L1995,440 L2020,480 Z M2010,480 L2045,425 L2080,480 Z M2070,480 L2100,445 L2122,480 Z" fill="#C2452D"/>
      <rect x="1968" y="480" width="154" height="42" fill="#FFF6E5"/><path d="M2045,338 V522 M1968,430 H2122" stroke="#fff" stroke-width="6"/>
      <path d="M1950,320 H2140" stroke="#43A047" stroke-width="10" stroke-linecap="round"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${1955 + i * 32},322 q16,24 32,0" fill="#81C784"/>`).join('')}
      <rect x="1990" y="700" width="140" height="200" fill="#F5F5F5"/><rect x="1985" y="690" width="150" height="16" rx="4" fill="#BDBDBD"/>
      <rect x="2000" y="720" width="58" height="160" rx="4" fill="#E0E0E0"/><rect x="2064" y="720" width="58" height="160" rx="4" fill="#E0E0E0"/>
      <circle cx="2050" cy="800" r="5" fill="#9E9E9E"/><circle cx="2072" cy="800" r="5" fill="#9E9E9E"/>
      <path d="M2075,690 V650 Q2075,635 2090,635 H2100" stroke="#9E9E9E" stroke-width="8" fill="none"/>
      <rect x="2230" y="420" width="190" height="12" rx="4" fill="#8D6E63"/>
      ${['#FFB74D', '#E57373', '#81C784', '#64B5F6'].map((c, i) => `<rect x="${2245 + i * 45}" y="${370}" width="32" height="50" rx="6" fill="${c}"/><rect x="${2243 + i * 45}" y="364" width="36" height="10" rx="3" fill="#8D6E63"/>`).join('')}
      <circle cx="2330" cy="260" r="50" fill="#fff" stroke="#8D6E63" stroke-width="8"/><path d="M2330,260 V228 M2330,260 L2352,272" stroke="#333" stroke-width="5" stroke-linecap="round"/>
      <rect x="2220" y="740" width="210" height="18" rx="6" fill="#A1887F"/><rect x="2240" y="758" width="14" height="142" fill="#8D6E63"/><rect x="2396" y="758" width="14" height="142" fill="#8D6E63"/>
      <path d="M2150,640 V900 M2170,815 H2230 M2230,815 V900" stroke="#8D6E63" stroke-width="14" fill="none"/>
      <path d="M2500,640 V900 M2480,815 H2420 M2420,815 V900" stroke="#8D6E63" stroke-width="14" fill="none"/>
      <rect x="2160" y="805" width="74" height="16" rx="5" fill="#A1887F"/><rect x="2416" y="805" width="74" height="16" rx="5" fill="#A1887F"/>
      <path d="M2220,742 L2430,742 L2415,790 L2235,790 Z" fill="#fff" opacity=".85"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${2240 + i * 26}" y="745" width="13" height="42" fill="#E53935" opacity=".5"/>`).join('')}`;
  },
  platforms: [[0, 2500, 900], [25, 295, 738], [320, 400, 690], [560, 860, 792], [875, 955, 800], [970, 1100, 520],
    [1135, 1225, 800], [1240, 1360, 480], [1385, 1655, 800], [1735, 1855, 560], [1870, 1990, 700], [1990, 2130, 700], [2230, 2420, 740]],
  seats: [{ x: 160, y: 850, pose: 'sit', inside: true }, { x: 455, y: 830, pose: 'sit' }, { x: 700, y: 770, pose: 'lie', inside: true },
    { x: 1430, y: 805, pose: 'sit' }, { x: 1520, y: 805, pose: 'sit' }, { x: 1610, y: 805, pose: 'sit' },
    { x: 2195, y: 815, pose: 'sit' }, { x: 2455, y: 815, pose: 'sit' }],
  fixtures: [
    {
      id: 'bath', x: 20, y: 640, w: 290, h: 260,
      svg: st => `<rect x="14" y="20" width="14" height="80" fill="#B0BEC5"/><path d="M21,30 H60 V50" stroke="#B0BEC5" stroke-width="12" fill="none" stroke-linecap="round"/>
        <circle cx="40" cy="22" r="10" fill="#E53935"/>${st ? `<path d="M60,56 V96" stroke="#81D4FA" stroke-width="8" stroke-linecap="round"/>` : ''}
        <rect x="6" y="96" width="278" height="${st ? 30 : 10}" fill="#81D4FA" opacity=".9"/>`,
      front: st => `<path d="M0,96 H290 V112 Q290,220 230,230 H60 Q0,220 0,112 Z" fill="#fff" stroke="#CFD8DC" stroke-width="4"/>
        <rect x="40" y="226" width="22" height="30" rx="8" fill="#FFC107"/><rect x="228" y="226" width="22" height="30" rx="8" fill="#FFC107"/>
        ${st ? [30, 70, 105, 150, 190, 230, 262].map((x, i) => `<circle cx="${x}" cy="${92 - (i % 3) * 10}" r="${16 + (i % 2) * 8}" fill="#fff" opacity=".9" stroke="#B3E5FC" stroke-width="2"/>`).join('') : ''}`,
      tap: c => { c.next(); Sound.splash(); if (c.st) c.burst('🫧', 5); },
    },
    {
      id: 'sink', x: 315, y: 470, w: 90, h: 430,
      svg: () => `<ellipse cx="45" cy="70" rx="40" ry="62" fill="#B0BEC5"/><ellipse cx="45" cy="70" rx="34" ry="56" fill="#E1F5FE"/>
        <path d="M24,40 L40,30 M22,58 L50,36" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
        <path d="M45,190 V176 Q45,168 54,168" stroke="#B0BEC5" stroke-width="7" fill="none"/>
        <path d="M0,206 H90 Q86,236 45,238 Q4,236 0,206 Z" fill="#fff" stroke="#CFD8DC" stroke-width="3"/><rect x="34" y="236" width="22" height="194" fill="#fff" stroke="#CFD8DC" stroke-width="3"/>`,
      tap: c => { Sound.splash(); c.burst('✨', 4); },
    },
    {
      id: 'toilet', x: 405, y: 700, w: 100, h: 200,
      svg: () => `<rect x="20" y="0" width="70" height="90" rx="10" fill="#fff" stroke="#CFD8DC" stroke-width="3"/><rect x="60" y="14" width="18" height="8" rx="4" fill="#B0BEC5"/>
        <rect x="10" y="110" width="90" height="22" rx="10" fill="#fff" stroke="#CFD8DC" stroke-width="3"/>
        <path d="M18,132 H92 Q90,170 70,176 L72,200 H38 L40,176 Q20,170 18,132 Z" fill="#fff" stroke="#CFD8DC" stroke-width="3"/>`,
      tap: c => { Sound.flush(); c.anim('shake', 600); c.burst('💧', 3); },
    },
    {
      id: 'lamp', x: 880, y: 680, w: 70, h: 120, init: 1,
      svg: st => `<rect x="30" y="50" width="10" height="60" fill="#8D6E63"/><ellipse cx="35" cy="114" rx="26" ry="8" fill="#6D4C41"/>
        <path d="M8,56 L18,0 H52 L62,56 Z" fill="${st ? '#FFE082' : '#F8BBD0'}" stroke="#F06292" stroke-width="3"/>`,
      glow: { x: 915, y: 720, r: 240, on: st => st === 1 },
      tap: c => { c.next(); Sound.click(); },
    },
    {
      id: 'wardrobe', x: 970, y: 520, w: 130, h: 380,
      svg: st => `<rect x="0" y="0" width="130" height="370" rx="8" fill="#A1887F"/><rect x="-6" y="0" width="142" height="18" rx="6" fill="#8D6E63"/>
        <rect x="14" y="370" width="16" height="10" fill="#6D4C41"/><rect x="100" y="370" width="16" height="10" fill="#6D4C41"/>
        ${st ? `<rect x="8" y="24" width="114" height="338" fill="#5D4037"/><path d="M14,50 H116" stroke="#BDBDBD" stroke-width="5"/>
          ${['#FF8FC7', '#5DADE2', '#FFD54F', '#9B7BEA', '#66BB6A', '#E53935'].map((c, i) => `<path d="M${22 + i * 16},52 l-8,22 v80 h16 v-80 z" fill="${c}"/>`).join('')}
          <rect x="-34" y="24" width="40" height="338" fill="#BCAAA4" stroke="#8D6E63" stroke-width="3"/><rect x="124" y="24" width="40" height="338" fill="#BCAAA4" stroke="#8D6E63" stroke-width="3"/>`
          : `<rect x="10" y="26" width="52" height="334" rx="4" fill="#BCAAA4"/><rect x="68" y="26" width="52" height="334" rx="4" fill="#BCAAA4"/>
          <circle cx="55" cy="190" r="6" fill="#FFC107"/><circle cx="75" cy="190" r="6" fill="#FFC107"/>
          <path d="M36,80 l6,-12 6,12 -6,12 Z M94,80 l6,-12 6,12 -6,12 Z" fill="#FF8FC7"/>`}`,
      spawn: ALL_CLOTHES, spawnAt: [1035, 880],
    },
    {
      id: 'toybox', x: 1135, y: 800, w: 90, h: 100,
      svg: st => `<rect x="0" y="22" width="90" height="78" rx="8" fill="#42A5F5"/>${[0, 1, 2].map(i => `<rect x="${8 + i * 28}" y="22" width="12" height="78" fill="#FFEB3B"/>`).join('')}
        ${st ? `<rect x="-4" y="-40" width="98" height="20" rx="6" fill="#1E88E5" transform="rotate(-25 0 22)"/><circle cx="45" cy="26" r="16" fill="#FF7043"/>`
          : `<rect x="-4" y="12" width="98" height="18" rx="6" fill="#1E88E5"/>`}`,
      spawn: ['basketball', 'football', 'teddy', 'duck', 'blocks', 'yoyo', 'guitar', 'balloon', 'kite', 'book', 'paint', 'gift', 'phone', 'broom'],
      spawnAt: [1180, 880],
    },
    {
      id: 'radio', x: 1140, y: 732, w: 80, h: 68,
      svg: () => `<path d="M14,18 L52,0" stroke="#555" stroke-width="3"/><rect x="0" y="16" width="80" height="52" rx="10" fill="#E57373"/>
        <circle cx="26" cy="42" r="16" fill="#5D4037"/><circle cx="26" cy="42" r="10" fill="#8D6E63"/>
        <rect x="48" y="28" width="24" height="10" rx="3" fill="#FFF8E1"/><circle cx="54" cy="52" r="5" fill="#FFC107"/><circle cx="68" cy="52" r="5" fill="#FFC107"/>`,
      tap: c => { Sound.tune(); c.anim('wiggle', 2400); c.burst('🎵', 5); },
    },
    {
      // Koklinė krosnis: traditional tiled stove.
      id: 'stove-tiles', x: 1240, y: 480, w: 120, h: 420,
      svg: st => `<rect x="-8" y="0" width="136" height="26" rx="6" fill="#2E7D32"/><rect x="0" y="26" width="120" height="394" fill="#43A047"/>
        ${Array.from({ length: 10 }, (_, j) => Array.from({ length: 3 }, (_, i) =>
          `<rect x="${4 + i * 38}" y="${30 + j * 38}" width="36" height="36" rx="5" fill="#66BB6A"/><circle cx="${22 + i * 38}" cy="${48 + j * 38}" r="8" fill="#FDD835" opacity=".8"/>`).join('')).join('')}
        <rect x="30" y="300" width="60" height="70" rx="8" fill="#212121"/>
        ${st ? `<path d="M40,366 Q38,336 52,326 Q50,346 60,340 Q62,318 74,310 Q72,340 82,366 Z" fill="#FF7043"/><path d="M50,366 Q52,346 60,350 Q66,340 72,366 Z" fill="#FFEB3B"/>` : ''}
        <rect x="26" y="296" width="68" height="8" rx="4" fill="#9E9E9E"/>`,
      glow: { x: 1300, y: 820, r: 220, on: st => st === 1 },
      tap: c => { c.next(); Sound.fire(); },
    },
    {
      id: 'sofa', x: 1380, y: 700, w: 280, h: 200,
      svg: () => `<rect x="20" y="0" width="240" height="110" rx="30" fill="#7E57C2"/><rect x="0" y="60" width="50" height="120" rx="20" fill="#673AB7"/>
        <rect x="230" y="60" width="50" height="120" rx="20" fill="#673AB7"/><rect x="40" y="95" width="200" height="60" rx="16" fill="#9575CD"/>
        <path d="M107,100 V150 M173,100 V150" stroke="#7E57C2" stroke-width="4"/><rect x="20" y="180" width="16" height="20" fill="#4E342E"/><rect x="244" y="180" width="16" height="20" fill="#4E342E"/>
        <rect x="40" y="150" width="200" height="34" rx="10" fill="#7E57C2"/><circle cx="70" cy="60" r="22" fill="#FFCA28"/><circle cx="210" cy="60" r="22" fill="#FF7043"/>`,
    },
    {
      id: 'tv', x: 1440, y: 430, w: 160, h: 120, states: 4,
      svg: st => {
        const screens = [
          `<rect x="10" y="10" width="140" height="92" fill="#263238"/><path d="M20,20 L50,20" stroke="#fff" stroke-width="3" opacity=".2"/>`,
          `<rect x="10" y="10" width="140" height="92" fill="#81D4FA"/><circle cx="120" cy="32" r="14" fill="#FFEB3B"/><rect x="10" y="80" width="140" height="22" fill="#66BB6A"/>
            <circle cx="60" cy="66" r="14" fill="#FF7043"/><circle cx="55" cy="62" r="3" fill="#000"/><circle cx="66" cy="62" r="3" fill="#000"/>`,
          `<rect x="10" y="10" width="140" height="92" fill="#FFB74D"/><path d="M10,70 H150 M80,10 V102" stroke="#fff" stroke-width="3"/>
            <rect x="118" y="26" width="24" height="16" fill="none" stroke="#fff" stroke-width="3"/><circle cx="60" cy="50" r="10" fill="#E65100"/>`,
          `<rect x="10" y="10" width="140" height="92" fill="#B3E5FC"/><rect x="10" y="62" width="140" height="40" fill="#1E88E5"/>
            <path d="M50,62 L110,62 L102,74 L58,74 Z" fill="#fff"/><path d="M80,62 V28 L100,58 Z" fill="#fff" stroke="#5D4037"/>`,
        ];
        return `<rect x="0" y="0" width="160" height="112" rx="10" fill="#37474F"/>${screens[st]}<rect x="70" y="112" width="20" height="8" fill="#37474F"/>`;
      },
      glow: { x: 1520, y: 490, r: 180, on: st => st > 0 },
      tap: c => { c.next(); Sound.tv(); },
    },
    {
      id: 'fridge', x: 1735, y: 560, w: 120, h: 340,
      svg: st => `<rect x="0" y="0" width="120" height="340" rx="14" fill="#ECEFF1" stroke="#CFD8DC" stroke-width="3"/>
        <path d="M0,112 H120" stroke="#CFD8DC" stroke-width="4"/><rect x="100" y="30" width="8" height="50" rx="4" fill="#90A4AE"/>
        ${st ? `<rect x="6" y="118" width="108" height="216" fill="#E1F5FE"/><path d="M6,180 H114 M6,250 H114" stroke="#B3E5FC" stroke-width="5"/>
          <circle cx="30" cy="165" r="12" fill="#E53935"/><rect x="50" y="150" width="20" height="28" rx="4" fill="#fff"/><ellipse cx="90" cy="168" rx="16" ry="10" fill="#FF5FA2"/>
          <rect x="20" y="220" width="40" height="28" rx="6" fill="#6B3D26"/><circle cx="85" cy="236" r="12" fill="#FFC107"/>
          <rect x="120" y="112" width="40" height="228" rx="8" fill="#ECEFF1" stroke="#CFD8DC" stroke-width="3"/>`
          : `<rect x="100" y="140" width="8" height="80" rx="4" fill="#90A4AE"/>
          <rect x="20" y="150" width="30" height="20" fill="#FDB913"/><rect x="20" y="170" width="30" height="20" fill="#006A44"/><rect x="20" y="190" width="30" height="20" fill="#C1272D"/>
          <circle cx="70" cy="260" r="12" fill="#FF8FC7"/><path d="M40,60 l8,-14 8,14 -8,14 Z" fill="#F39C12"/>`}`,
      spawn: ['saltibarsciai', 'cepelinai', 'duona', 'surelis', 'cheese', 'milk', 'egg', 'apple', 'cucumber', 'tomato', 'juice', 'cake', 'icecream', 'gira', 'honey', 'watermelon'],
      spawnAt: [1800, 880],
    },
    {
      id: 'cooker', x: 1870, y: 610, w: 120, h: 290,
      svg: st => `<rect x="0" y="90" width="120" height="200" fill="#FAFAFA" stroke="#CFD8DC" stroke-width="3"/>
        <rect x="14" y="140" width="92" height="90" rx="8" fill="#37474F"/><rect x="22" y="148" width="76" height="40" rx="4" fill="#546E7A"/>
        ${[22, 50, 78, 98].map(x => `<circle cx="${x}" cy="114" r="7" fill="#90A4AE"/>`).join('')}
        <rect x="-4" y="84" width="128" height="10" rx="3" fill="#455A64"/>
        <path d="M22,40 H98 V78 Q98,88 88,88 H32 Q22,88 22,78 Z" fill="#E53935"/><rect x="18" y="30" width="84" height="12" rx="6" fill="#C62828"/>
        <rect x="52" y="20" width="16" height="12" rx="4" fill="#C62828"/><circle cx="40" cy="62" r="5" fill="#fff"/><circle cx="56" cy="66" r="5" fill="#fff"/><circle cx="72" cy="62" r="5" fill="#fff"/>
        ${st ? `<g class="steam"><path d="M40,14 q-10,-15 0,-30 q10,-15 0,-30" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".85"/>
          <path d="M78,10 q-10,-15 0,-30 q10,-15 0,-30" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".85"/></g>
          <path d="M20,96 H100" stroke="#FF7043" stroke-width="4"/>` : ''}`,
      tap: c => { c.next(); Sound.fire(); },
    },
    {
      id: 'trash', x: 2140, y: 810, w: 55, h: 90, trash: true,
      svg: () => `<path d="M4,18 H51 L46,90 H9 Z" fill="#78909C"/><rect x="0" y="8" width="55" height="12" rx="5" fill="#546E7A"/>
        <rect x="20" y="0" width="15" height="10" rx="4" fill="#546E7A"/><path d="M18,32 V78 M28,32 V78 M38,32 V78" stroke="#90A4AE" stroke-width="3"/>`,
      tap: c => { Sound.click(); c.anim('wiggle', 500); },
    },
    {
      id: 'bed', x: 540, y: 640, w: 330, h: 260,
      svg: () => `<rect x="0" y="0" width="34" height="250" rx="12" fill="#F06292"/><circle cx="17" cy="0" r="18" fill="#F06292"/>
        <rect x="296" y="80" width="34" height="170" rx="12" fill="#F06292"/><circle cx="313" cy="80" r="18" fill="#F06292"/>
        <rect x="24" y="150" width="282" height="60" rx="14" fill="#fff"/><rect x="24" y="200" width="282" height="40" fill="#EC407A"/>
        <ellipse cx="85" cy="135" rx="55" ry="26" fill="#FFF8E1" stroke="#F8BBD0" stroke-width="3"/>`,
      front: () => `<path d="M120,128 Q210,112 306,132 L306,206 Q210,222 120,206 Z" fill="#BA68C8"/>
        ${[150, 190, 230, 270].map(x => `<circle cx="${x}" cy="${168}" r="9" fill="#fff" opacity=".7"/>`).join('')}
        <path d="M120,128 Q210,112 306,132" stroke="#9C27B0" stroke-width="6" fill="none"/>`,
    },
  ],
  props: [['saltibarsciai', 2280, 740], ['duona', 2370, 740], ['football', 1420, 900], ['teddy', 820, 792], ['duck', 240, 738],
    ['apple', 2030, 700], ['gira', 2080, 700], ['p:cat', 1690, 900]],
  people: HOME_CAST,
};
