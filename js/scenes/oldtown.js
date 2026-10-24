// Theatre Square (Teatro aikštė) in Klaipėda Old Town.
SCENES.oldtown = {
  id: 'oldtown', icon: '🎭', side: 'city', W: 2200,
  name: N('Teatro aikštė', 'Theatre Square'),
  bg() {
    const theatreWins = (y, cls = '') => [860, 930, 1270, 1340].map(x => G.win(x, y, 50, 80, '#fff', '#9FD3F5')).join('');
    return `${G.sky('ot-sky', 2200, '#8FD3FF', '#E6F6FF')}${G.stones('ot-stones', '#B0A79C', '#8C8279')}
      ${NIGHT_SKY(2200, 1700)}${G.cloud(300, 140, 1.1)}${G.cloud(1100, 90, 0.8)}${G.cloud(1850, 170, 1)}
      ${G.timber(20, 860, 260, 380, '#FFF6E5', '#7A3E26', '#C2452D')}
      ${G.timber(300, 860, 240, 330, '#FFE0B2', '#5D4037', '#B23A26')}
      <!-- Drama theatre -->
      <rect x="820" y="330" width="620" height="530" fill="#F3E6C4"/><rect x="805" y="310" width="650" height="30" fill="#E0CFA3"/>
      <path d="M980,310 L1130,210 L1280,310 Z" fill="#E8D7AE" stroke="#CBB78A" stroke-width="6"/>
      <circle cx="1130" cy="270" r="22" fill="#FFF8E1" stroke="#CBB78A" stroke-width="5"/>
      ${G.label(1130, 385, 'DRAMOS TEATRAS', 38, '#7A5C2E')}
      ${[1000, 1060, 1200, 1260].map(x => `<rect x="${x - 14}" y="410" width="28" height="450" fill="#FFFDF3"/><rect x="${x - 20}" y="400" width="40" height="14" fill="#E0CFA3"/>`).join('')}
      ${theatreWins(430)}${theatreWins(600)}
      <rect x="1000" y="540" width="260" height="14" fill="#E0CFA3"/><path d="M1005,540 V510 M1255,540 V510 M1005,512 H1255" stroke="#7A5C2E" stroke-width="5"/>
      ${[1030, 1070, 1110, 1150, 1190, 1230].map(x => `<path d="M${x},512 V540" stroke="#7A5C2E" stroke-width="3"/>`).join('')}
      <!-- Café house and corner house -->
      ${G.timber(1500, 860, 300, 400, '#E3F2FD', '#455A64', '#C2452D')}
      ${G.awning(1500, 560, 300, '#2E7D32', '#fff', 46)}
      ${G.label(1650, 545, 'KAVINĖ', 36, '#2E7D32')}
      ${G.timber(1820, 860, 380, 350, '#FFF9C4', '#7A3E26', '#B23A26')}
      <rect x="0" y="860" width="2200" height="24" fill="#D7CCC8"/>
      <rect x="0" y="880" width="2200" height="120" fill="url(#ot-stones)"/>
      ${G.gull(600, 220)}${G.gull(650, 250, 0.7)}`;
  },
  platforms: [[0, 2200, 880], [530, 750, 822], [1510, 1700, 760], [1740, 1880, 760]],
  seats: [{ x: 1735, y: 815, pose: 'sit' }, { x: 1885, y: 815, pose: 'sit' }, { x: 2010, y: 838, pose: 'sit' }, { x: 2110, y: 838, pose: 'sit' }],
  fixtures: [
    {
      // Chimney sweep on the roof: touch him for good luck.
      id: 'sweep', x: 212, y: 345, w: 70, h: 115,
      svg: () => `<path d="M8,10 L30,110 M18,8 L40,108" stroke="#8D6E63" stroke-width="4"/>${[30, 50, 70, 90].map(y => `<path d="M${10 + y * 0.22},${y} L${20 + y * 0.22},${y}" stroke="#8D6E63" stroke-width="4"/>`).join('')}
        <rect x="30" y="0" width="22" height="22" rx="2" fill="#212121"/><rect x="24" y="20" width="34" height="5" fill="#212121"/>
        <circle cx="41" cy="36" r="12" fill="#F6CBA8"/><rect x="30" y="48" width="24" height="40" rx="6" fill="#212121"/>
        <circle cx="42" cy="62" r="4" fill="#FFC107"/><rect x="31" y="86" width="9" height="26" fill="#212121"/><rect x="45" y="86" width="9" height="26" fill="#212121"/>
        <circle cx="64" cy="34" r="10" fill="#424242"/><path d="M54,58 L64,40" stroke="#424242" stroke-width="4"/>`,
      tap: c => { Sound.sparkle(); c.burst('⭐', 6); c.anim('wiggle', 600); c.toast(T('luck')); },
    },
    {
      // The wish-granting mouse on the wall.
      id: 'mouse', x: 200, y: 795, w: 56, h: 50,
      svg: () => `<ellipse cx="30" cy="34" rx="22" ry="14" fill="#8D6E63"/><circle cx="12" cy="24" r="12" fill="#A1887F"/><circle cx="12" cy="24" r="6" fill="#D7CCC8"/>
        <circle cx="6" cy="34" r="3" fill="#222"/><path d="M52,36 Q64,30 58,18" stroke="#8D6E63" stroke-width="3" fill="none"/>`,
      tap: c => { Sound.sparkle(); c.burst('💖', 5); c.toast(T('wish')); },
    },
    {
      id: 'balloons', x: 310, y: 600, w: 160, h: 280,
      svg: () => `${[[40, 40, '#E53935'], [80, 20, '#FFEB3B'], [120, 45, '#42A5F5'], [60, 75, '#66BB6A'], [105, 85, '#FF8FC7']].map(([x, y, c]) =>
        `<path d="M${x},${y + 30} Q${x + 6},${y + 90} 80,170" stroke="#777" stroke-width="2" fill="none"/><ellipse cx="${x}" cy="${y}" rx="24" ry="30" fill="${c}"/><ellipse cx="${x - 8}" cy="${y - 10}" rx="6" ry="9" fill="#fff" opacity=".5"/>`).join('')}
        <rect x="10" y="170" width="140" height="70" rx="10" fill="#FF7043"/><rect x="10" y="170" width="140" height="16" fill="#E64A19"/>
        <circle cx="40" cy="250" r="22" fill="#424242"/><circle cx="120" cy="250" r="22" fill="#424242"/><circle cx="40" cy="250" r="8" fill="#BDBDBD"/><circle cx="120" cy="250" r="8" fill="#BDBDBD"/>`,
      spawn: ['balloon', 'kite', 'yoyo', 'lollipop', 'ticket', 'teddy'], spawnAt: [390, 860],
    },
    {
      // Ännchen von Tharau (Taravos Anikė) on the Simon Dach fountain.
      id: 'fountain', x: 520, y: 520, w: 240, h: 360, init: 1,
      svg: st => `<ellipse cx="120" cy="320" rx="120" ry="30" fill="#9E9E9E"/><rect x="0" y="300" width="240" height="60" rx="14" fill="#BDBDBD"/>
        <ellipse cx="120" cy="302" rx="110" ry="20" fill="${st ? '#4FC3F7' : '#90A4AE'}"/>
        <rect x="96" y="120" width="48" height="186" fill="#CFD8DC"/><rect x="86" y="112" width="68" height="16" fill="#B0BEC5"/>
        <path d="M103,112 L108,60 Q120,48 132,60 L137,112 Z" fill="#6D4C41"/><circle cx="120" cy="40" r="15" fill="#795548"/>
        <path d="M104,36 Q120,18 136,36 L138,46 Q120,36 102,46 Z" fill="#5D4037"/><path d="M108,66 L94,92 M132,66 L144,90" stroke="#6D4C41" stroke-width="8" stroke-linecap="round"/>
        ${st ? `<g class="water"><path d="M110,170 Q60,170 40,296 M130,170 Q180,170 200,296 M112,200 Q80,210 70,296 M128,200 Q160,210 170,296" stroke="#81D4FA" stroke-width="7" fill="none" stroke-linecap="round" opacity=".85"/></g>` : ''}`,
      tap: c => { c.next(); Sound.splash(); },
    },
    ...[780, 1450].map((x, i) => ({
      id: 'lamp' + i, x, y: 560, w: 40, h: 320, init: 1,
      svg: st => `<rect x="15" y="40" width="10" height="280" fill="#37474F"/><rect x="8" y="300" width="24" height="20" fill="#263238"/>
        <path d="M2,40 L8,6 H32 L38,40 Z" fill="${st ? '#FFF59D' : '#B0BEC5'}" stroke="#263238" stroke-width="4"/><path d="M12,0 H28 L20,-10 Z" fill="#263238"/>`,
      glow: { x: x + 20, y: 585, r: 200, on: st => st === 1 },
      tap: c => { c.next(); Sound.click(); },
    })),
    {
      id: 'theatre-door', x: 1090, y: 720, w: 80, h: 140,
      svg: st => `<path d="M0,140 V40 Q40,0 80,40 V140 Z" fill="#5D4037"/>
        ${st ? `<path d="M6,140 V44 Q40,8 74,44 V140 Z" fill="#B71C1C"/><path d="M6,44 Q20,90 12,140 M74,44 Q60,90 68,140" stroke="#FFC107" stroke-width="4" fill="none"/>`
          : `<path d="M40,18 V140" stroke="#3E2723" stroke-width="4"/><circle cx="32" cy="90" r="5" fill="#FFC107"/><circle cx="48" cy="90" r="5" fill="#FFC107"/>`}`,
      tap: c => { c.set(1); Sound.bravo(); c.burst('👏', 4); c.burst('🎭', 2); c.toast('Bravo!'); setTimeout(() => c.set(0), 1800); },
    },
    {
      id: 'cafe', x: 1510, y: 640, w: 190, h: 240,
      svg: () => `<rect x="0" y="120" width="190" height="120" fill="#A1887F"/><rect x="-6" y="112" width="202" height="16" rx="4" fill="#6D4C41"/>
        ${[0, 1, 2, 3].map(i => `<rect x="${10 + i * 46}" y="140" width="36" height="90" rx="4" fill="#BCAAA4"/>`).join('')}
        <rect x="20" y="40" width="60" height="72" rx="8" fill="#B0BEC5"/><rect x="30" y="56" width="40" height="20" rx="4" fill="#37474F"/><rect x="42" y="88" width="16" height="16" fill="#fff"/>
        <rect x="100" y="60" width="80" height="52" rx="6" fill="#E1F5FE" stroke="#90A4AE" stroke-width="3"/>
        <path d="M110,100 l10,-20 10,20 Z" fill="#E3A64A"/><circle cx="150" cy="92" r="9" fill="#FF8FC7"/><circle cx="166" cy="94" r="7" fill="#8D6E63"/>`,
      spawn: ['coffee', 'tea', 'juice', 'sakotis', 'kibinai', 'cake', 'pancakes', 'icecream', 'cookie', 'donut'], spawnAt: [1605, 740],
    },
    {
      id: 'cafe-table', x: 1700, y: 560, w: 220, h: 320,
      svg: () => `<path d="M110,10 V200" stroke="#5D4037" stroke-width="8"/>${G.awning(10, 10, 200, '#2E7D32', '#fff', 30)}
        <path d="M10,10 L110,-40 L210,10 Z" fill="#2E7D32"/>
        <rect x="35" y="200" width="150" height="14" rx="6" fill="#ECEFF1"/><rect x="104" y="214" width="12" height="100" fill="#90A4AE"/><rect x="80" y="308" width="60" height="10" rx="4" fill="#90A4AE"/>
        <path d="M0,170 V320 M0,255 H60 M60,255 V320 M220,170 V320 M220,255 H160 M160,255 V320" stroke="#2E7D32" stroke-width="8" fill="none"/>`,
    },
    {
      id: 'bench', x: 1960, y: 760, w: 200, h: 120,
      svg: () => `<rect x="0" y="0" width="200" height="16" rx="6" fill="#8D6E63"/><rect x="0" y="26" width="200" height="16" rx="6" fill="#8D6E63"/>
        <rect x="0" y="70" width="200" height="18" rx="6" fill="#A1887F"/><path d="M20,0 V120 M180,0 V120" stroke="#37474F" stroke-width="10"/>`,
    },
    {
      id: 'gull', x: 1200, y: 110, w: 90, h: 50,
      svg: () => `<path d="M5,30 Q25,0 45,26 Q65,0 85,30" stroke="#37474F" stroke-width="6" fill="none" stroke-linecap="round"/><ellipse cx="45" cy="30" rx="12" ry="7" fill="#fff"/>`,
      tap: c => { Sound.gull(); c.anim('fly', 2000); },
    },
  ],
  props: [['juice', 1780, 760], ['football', 1000, 880]],
  people: [
    who('Kajus', 'kid', look(3, 'curly', 0, 0), fit('hoodie-green', 'jeans', 'sneakers-white'), 950, 880),
    who('Ieva', 'adult', look(0, 'ponytail', 6, 2), fit('apron', 'jeans', 'sneakers-white'), 1440, 880),
    who('Senelis Jonas', 'adult', look(2, 'bald', 5, 0, 'mustache'), fit('suit', 'pants-dark', 'shoes-black', 'knit-hat'), 2010, 838, 'sit', 'book'),
  ],
};
