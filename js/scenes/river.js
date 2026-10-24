// The Danė river: the sailing ship Meridianas, the swing bridge and the Black Ghost.
SCENES.river = {
  id: 'river', icon: '⛵', side: 'city', W: 2400,
  name: N('Dangės krantinė', 'Danė riverside'),
  bg() {
    const far = [[60, 120, '#FFCC80'], [200, 160, '#EF9A9A'], [380, 110, '#FFF59D'], [520, 140, '#B39DDB'], [1500, 130, '#FFAB91'], [1660, 100, '#90CAF9']]
      .map(([x, w, c], i) => `<rect x="${x}" y="${470 + (i % 3) * 20}" width="${w}" height="${130 - (i % 3) * 20}" fill="${c}"/>
        <path d="M${x - 8},${470 + (i % 3) * 20} L${x + w / 2},${420 + (i % 3) * 20} L${x + w + 8},${470 + (i % 3) * 20} Z" fill="#C2452D"/>
        ${G.win(x + w * 0.3, 510 + (i % 3) * 20, w * 0.4, 40, '#fff', '#9FD3F5')}`).join('');
    return `${G.sky('rv-sky', 2400, '#9AD7FF', '#E8F7FF')}
      ${NIGHT_SKY(2400, 1600)}${G.cloud(500, 130, 1)}${G.cloud(1300, 80, 0.7)}${G.cloud(2050, 150, 1.2)}
      ${far}${G.crane(1950, 600, 0.9)}${G.crane(2200, 600, 0.8, '#42A5F5')}${G.crane(900, 600, 0.6, '#EF5350')}
      <rect x="0" y="600" width="2400" height="400" fill="#4A9FD8"/>
      <path d="${G.wave(0, 2400, 640, 6, 120)}" stroke="#8ECDF2" stroke-width="4" fill="none"/>
      <path d="${G.wave(0, 2400, 720, 6, 160)}" stroke="#8ECDF2" stroke-width="4" fill="none" opacity=".7"/>
      ${G.stones('rv-quay', '#9E9E9E', '#757575')}
      <rect x="0" y="780" width="620" height="220" fill="url(#rv-quay)"/><rect x="0" y="768" width="620" height="16" fill="#BDBDBD"/>
      <rect x="2020" y="780" width="380" height="220" fill="url(#rv-quay)"/><rect x="2020" y="768" width="380" height="16" fill="#BDBDBD"/>
      <rect x="1460" y="780" width="60" height="220" fill="url(#rv-quay)"/>
      <rect x="450" y="740" width="24" height="34" rx="8" fill="#37474F"/><rect x="2100" y="740" width="24" height="34" rx="8" fill="#37474F"/>
      <path d="M462,750 Q560,800 690,700" stroke="#C8A165" stroke-width="5" fill="none"/>
      <rect x="380" y="470" width="12" height="300" fill="#37474F"/><path d="M372,470 h28 l-6,-30 h-16 Z" fill="#FFF59D" stroke="#263238" stroke-width="4"/>
      ${G.gull(300, 260)}${G.gull(1700, 200, 0.8)}`;
  },
  front: () => `<rect x="620" y="874" width="840" height="126" fill="#3D8BC9" opacity=".8"/><rect x="1520" y="874" width="500" height="126" fill="#3D8BC9" opacity=".8"/>
    <path d="${G.wave(620, 1460, 876, 8, 80)}" stroke="#B3E5FC" stroke-width="5" fill="none"/><path d="${G.wave(1520, 2020, 876, 8, 80)}" stroke="#B3E5FC" stroke-width="5" fill="none"/>`,
  platforms: [[0, 620, 780], [2020, 2400, 780], [670, 1430, 640], [1460, 1520, 780], { x1: 1520, x2: 2020, y: 780, fx: 'bridge', on: 0 }],
  water: [{ x1: 620, x2: 1460, y: 880 }, { x1: 1520, x2: 2020, y: 880 }],
  seats: [{ x: 170, y: 740, pose: 'sit' }, { x: 270, y: 740, pose: 'sit' }],
  fixtures: [
    {
      id: 'ship', x: 640, y: 120, w: 820, h: 780,
      svg: st => {
        const masts = [[230, 30], [420, 0], [610, 40]];
        const sails = st
          ? `<path d="M240,70 Q300,90 360,70 L370,200 Q300,220 240,200 Z M240,220 Q300,240 360,220 L372,360 Q300,380 240,360 Z" fill="#FFFDF5" stroke="#D7CCC8" stroke-width="3"/>
             <path d="M430,40 Q490,60 550,40 L560,180 Q490,200 430,180 Z M430,200 Q490,220 550,200 L562,350 Q490,370 430,350 Z" fill="#FFFDF5" stroke="#D7CCC8" stroke-width="3"/>
             <path d="M620,80 L760,440 L620,440 Z" fill="#FFFDF5" stroke="#D7CCC8" stroke-width="3"/>`
          : masts.map(([x, y]) => `<rect x="${x - 70}" y="${y + 60}" width="140" height="14" rx="7" fill="#F5F5F5" stroke="#BDBDBD"/><rect x="${x - 60}" y="${y + 220}" width="120" height="14" rx="7" fill="#F5F5F5" stroke="#BDBDBD"/>`).join('');
        return `<path d="M-30,660 L70,520" stroke="#8D6E63" stroke-width="14" stroke-linecap="round"/><path d="M-30,640 L70,500" stroke="#BCAAA4" stroke-width="4"/>
          <path d="M820,470 L620,30 M820,470 L240,520 M40,500 L230,30 M230,30 L420,0 L610,40" stroke="#5D4037" stroke-width="2.5" fill="none"/>
          <path d="M780,470 L880,430" stroke="#5D4037" stroke-width="10" stroke-linecap="round"/>
          ${masts.map(([x, y]) => `<rect x="${x - 7}" y="${y}" width="14" height="${520 - y}" fill="#6D4C41"/>`).join('')}
          ${sails}
          <path d="M420,0 V-40" stroke="#6D4C41" stroke-width="6"/><rect x="420" y="-40" width="54" height="12" fill="#FDB913"/><rect x="420" y="-28" width="54" height="12" fill="#006A44"/><rect x="420" y="-16" width="54" height="12" fill="#C1272D"/>
          <rect x="300" y="460" width="180" height="60" rx="8" fill="#8D6E63"/>${[320, 370, 420].map(x => `<rect x="${x}" y="476" width="34" height="26" rx="5" fill="#BBDEFB"/>`).join('')}
          <path d="M10,500 H800" stroke="#5D4037" stroke-width="5"/>${Array.from({ length: 27 }, (_, i) => `<path d="M${14 + i * 30},500 V520" stroke="#5D4037" stroke-width="4"/>`).join('')}
          <path d="M0,520 L810,520 Q800,640 720,750 L110,750 Q30,650 0,520 Z" fill="#FAFAFA"/>
          <path d="M8,560 L800,560" stroke="#1E3A5F" stroke-width="18"/><path d="M40,640 Q400,660 770,640" stroke="#2E7D32" stroke-width="8" fill="none"/>
          ${G.label(410, 615, 'MERIDIANAS', 44, '#1E3A5F', 'letter-spacing="6"')}
          ${[120, 220, 600, 700].map(x => `<circle cx="${x}" cy="600" r="11" fill="#90A4AE" stroke="#1E3A5F" stroke-width="4"/>`).join('')}`;
      },
      tap: c => { c.next(); if (c.st) Sound.horn(); else Sound.whoosh(); },
    },
    {
      id: 'wheel', x: 1300, y: 556, w: 76, h: 84,
      svg: () => `<rect x="34" y="40" width="10" height="44" fill="#5D4037"/><g class="spin-me"><circle cx="38" cy="36" r="28" fill="none" stroke="#8D6E63" stroke-width="7"/>
        ${[0, 45, 90, 135].map(a => `<path d="M38,36 m${(36 * Math.cos(a * Math.PI / 180)).toFixed(1)},${(36 * Math.sin(a * Math.PI / 180)).toFixed(1)} L${(38 - 36 * Math.cos(a * Math.PI / 180)).toFixed(1)},${(36 - 36 * Math.sin(a * Math.PI / 180)).toFixed(1)}" stroke="#8D6E63" stroke-width="5" stroke-linecap="round"/>`).join('')}
        <circle cx="38" cy="36" r="7" fill="#FFC107"/></g>`,
      tap: c => { Sound.creak(); c.anim('spin', 1000); },
    },
    {
      id: 'bell', x: 740, y: 560, w: 60, h: 80,
      svg: () => `<path d="M10,80 V6 H50 V80" stroke="#5D4037" stroke-width="6" fill="none"/><g class="swing-me"><path d="M18,52 Q18,14 30,14 Q42,14 42,52 L46,58 H14 Z" fill="#FFC107" stroke="#C99700" stroke-width="2"/><circle cx="30" cy="62" r="5" fill="#C99700"/></g>`,
      tap: c => { Sound.bell(); c.anim('wiggle', 900); },
    },
    {
      // Pasukamas tiltas: the swing bridge opens to let boats through.
      id: 'bridge', x: 1450, y: 600, w: 580, h: 400,
      svg: st => `${st ? `<g class="passing-boat"><path d="M150,290 H290 L270,325 H170 Z" fill="#E53935"/><rect x="190" y="262" width="60" height="28" rx="6" fill="#fff"/><path d="M220,262 V220" stroke="#555" stroke-width="4"/><rect x="220" y="220" width="30" height="16" fill="#FDB913"/></g>` : ''}
        <rect x="10" y="150" width="60" height="30" fill="#616161"/><circle cx="40" cy="130" r="18" fill="#E53935"/><path d="M40,130 L64,112" stroke="#424242" stroke-width="6" stroke-linecap="round"/>
        ${st ? `<rect x="20" y="168" width="44" height="28" fill="#5D4037"/><path d="M18,130 V168 M66,130 V168" stroke="#37474F" stroke-width="6"/>`
          : `<rect x="40" y="170" width="535" height="26" fill="#6D4C41"/><path d="M40,130 H575 M40,150 H575" stroke="#37474F" stroke-width="6"/>
          ${Array.from({ length: 18 }, (_, i) => `<path d="M${46 + i * 30},130 V170" stroke="#37474F" stroke-width="5"/>`).join('')}
          <path d="M70,196 L180,240 L300,196 L420,240 L560,196" stroke="#455A64" stroke-width="8" fill="none"/>`}`,
      tap: c => { c.next(); Sound.creak(); if (c.st) setTimeout(Sound.horn, 500); },
    },
    {
      // Juodasis vaiduoklis: the Black Ghost climbing out of the water.
      id: 'ghost', x: 560, y: 690, w: 100, h: 200,
      svg: () => `<path d="M20,200 Q10,120 30,80 Q50,40 76,64 Q92,82 88,200 Z" fill="#263238"/><circle cx="56" cy="56" r="26" fill="#37474F"/>
        <path d="M30,56 Q56,16 82,56 L84,66 Q56,40 28,66 Z" fill="#263238"/>
        <circle cx="48" cy="58" r="4" fill="#90A4AE"/><circle cx="64" cy="58" r="4" fill="#90A4AE"/>
        <path d="M80,90 Q96,90 104,86" stroke="#263238" stroke-width="12" stroke-linecap="round"/><path d="M28,96 Q12,94 2,90" stroke="#263238" stroke-width="12" stroke-linecap="round"/>`,
      tap: c => { Sound.boo(); c.anim('shake', 700); c.toast(T('ghost')); },
    },
    {
      id: 'bench', x: 120, y: 660, w: 200, h: 120,
      svg: () => `<rect x="0" y="0" width="200" height="16" rx="6" fill="#8D6E63"/><rect x="0" y="26" width="200" height="16" rx="6" fill="#8D6E63"/>
        <rect x="0" y="70" width="200" height="18" rx="6" fill="#A1887F"/><path d="M20,0 V120 M180,0 V120" stroke="#37474F" stroke-width="10"/>`,
    },
    {
      id: 'gull', x: 1000, y: 260, w: 90, h: 50,
      svg: () => `<path d="M5,30 Q25,0 45,26 Q65,0 85,30" stroke="#37474F" stroke-width="6" fill="none" stroke-linecap="round"/><ellipse cx="45" cy="30" rx="12" ry="7" fill="#fff"/>`,
      tap: c => { Sound.gull(); c.anim('fly', 2000); },
    },
  ],
  props: [['lifebuoy', 900, 640], ['fish', 2300, 780]],
  people: [
    who('Kapitonas Vytautas', 'adult', look(1, 'short', 5, 1, 'beard'), fit('sailor', 'pants-dark', 'boots-brown', 'captain'), 1150, 640),
    who('Žvejys Petras', 'adult', look(2, 'bald', 1, 0, 'mustache'), fit('raincoat', 'jeans', 'gumboots', 'knit-hat'), 2250, 780, null, 'rod'),
  ],
};
