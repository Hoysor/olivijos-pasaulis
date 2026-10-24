// Builds characters (and clothing icons) as SVG strings. Character viewBox is 200x280, feet at y≈272.
const CLOTH_BY_ID = Object.fromEntries(CLOTHES.map(c => [c.id, c]));

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const c = v => Math.max(0, Math.min(255, v + amt));
  return '#' + ((1 << 24) | (c(n >> 16) << 16) | (c((n >> 8) & 255) << 8) | c(n & 255)).toString(16).slice(1);
}

const VIEWBOXES = {
  full: '0 0 200 280',
  face: '38 14 124 124',
  top: '20 110 160 150',
  bottom: '30 170 140 110',
  shoes: '45 215 110 65',
  hat: '30 0 140 120',
  glasses: '45 50 110 80',
  neck: '55 100 90 70',
};

function hairBack(style, c) {
  switch (style) {
    case 'long': return `<path d="M52,82 C52,26 148,26 148,82 L152,176 Q100,192 48,176 Z" fill="${c}"/>`;
    case 'bob': return `<path d="M50,82 C50,26 150,26 150,82 L152,130 Q100,140 48,130 Z" fill="${c}"/>`;
    case 'ponytail': return `<path d="M138,58 C182,56 186,132 160,172 C156,140 150,110 136,92 Z" fill="${c}"/><circle cx="142" cy="62" r="8" fill="#FF4FA0"/>`;
    case 'pigtails': return `<ellipse cx="42" cy="112" rx="15" ry="30" fill="${c}"/><ellipse cx="158" cy="112" rx="15" ry="30" fill="${c}"/>
      <circle cx="50" cy="86" r="7" fill="#FF4FA0"/><circle cx="150" cy="86" r="7" fill="#FF4FA0"/>`;
    case 'bun': return `<circle cx="100" cy="30" r="20" fill="${c}"/>`;
    case 'curly': {
      let s = '';
      for (let i = 0; i < 12; i++) {
        const a = Math.PI * (0.95 + i * 1.1 / 11);
        s += `<circle cx="${(100 + Math.cos(a) * 46).toFixed(1)}" cy="${(84 + Math.sin(a) * 46).toFixed(1)}" r="17" fill="${c}"/>`;
      }
      return s + `<circle cx="52" cy="108" r="15" fill="${c}"/><circle cx="148" cy="108" r="15" fill="${c}"/>`;
    }
    default: return '';
  }
}

function hairFront(style, c) {
  switch (style) {
    case 'curly': return [64, 82, 100, 118, 136].map((x, i) => `<circle cx="${x}" cy="${i % 2 ? 50 : 56}" r="14" fill="${c}"/>`).join('');
    case 'short': return `<path d="M54,88 C46,16 154,16 146,88 C142,70 132,62 120,62 C108,56 86,56 74,64 C64,66 57,74 54,88 Z" fill="${c}"/>`;
    case 'spiky': return `<path d="M54,86 L50,50 L66,56 L68,30 L84,46 L96,22 L108,44 L124,26 L128,52 L146,44 L146,86 C140,68 124,60 100,60 C76,60 60,68 54,86 Z" fill="${c}"/>`;
    case 'bald': return `<path d="M56,96 C52,80 56,70 62,66 L64,96 Z M144,96 C148,80 144,70 138,66 L136,96 Z" fill="${c}"/>`;
    case 'braids': {
      const braid = x => [0, 1, 2, 3, 4].map(i => `<ellipse cx="${x}" cy="${112 + i * 16}" rx="${9 - i * 0.6}" ry="10" fill="${c}" stroke="${shade(c, -25)}" stroke-width="1.5"/>`).join('');
      return braid(58) + braid(142) + `<circle cx="58" cy="186" r="5" fill="#FF4FA0"/><circle cx="142" cy="186" r="5" fill="#FF4FA0"/>` +
        `<path d="M56,84 C48,18 152,18 144,84 C136,64 116,54 100,56 C84,54 64,64 56,84 Z" fill="${c}"/><line x1="100" y1="36" x2="100" y2="58" stroke="${shade(c, -25)}" stroke-width="2"/>`;
    }
    default: return `<path d="M56,84 C48,18 152,18 144,84 C138,66 124,58 112,62 C104,52 84,54 78,64 C68,64 60,72 56,84 Z" fill="${c}"/>`;
  }
}

function face(look, mood) {
  const e = look.eyes, brow = shade(look.hairColor === '#D9D9D9' ? '#9E9E9E' : look.hairColor, -20);
  const browY = mood === 'surprised' ? 66 : 74;
  let eyes, mouth;
  if (mood === 'sleep') {
    eyes = `<path d="M77,89 Q84,94 91,89 M109,89 Q116,94 123,89" stroke="#3B2416" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  } else if (mood === 'laugh') {
    eyes = `<path d="M77,90 Q84,81 91,90 M109,90 Q116,81 123,90" stroke="#3B2416" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  } else {
    const ry = mood === 'surprised' ? 9.5 : 8;
    eyes = `<ellipse cx="84" cy="88" rx="6.5" ry="${ry}" fill="${e}"/><ellipse cx="116" cy="88" rx="6.5" ry="${ry}" fill="${e}"/>
      <circle cx="86.5" cy="85" r="2.4" fill="#fff"/><circle cx="118.5" cy="85" r="2.4" fill="#fff"/>`;
  }
  switch (mood) {
    case 'yum': mouth = `<ellipse cx="100" cy="108" rx="9" ry="7" fill="#8B3A3A"/><ellipse cx="100" cy="111" rx="5" ry="3" fill="#FF8A8A"/>`; break;
    case 'surprised': mouth = `<ellipse cx="100" cy="109" rx="6" ry="8" fill="#8B3A3A"/>`; break;
    case 'laugh': mouth = `<path d="M86,102 Q100,124 114,102 Z" fill="#8B3A3A"/><path d="M92,112 Q100,118 108,112" fill="#FF8A8A"/>`; break;
    case 'sleep': mouth = `<ellipse cx="100" cy="107" rx="4" ry="3" fill="#8B3A3A"/>`; break;
    default: mouth = `<path d="M88,104 Q100,117 112,104" stroke="#8B3A3A" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  }
  return `
    <path d="M76,${browY} Q84,${browY - 5} 92,${browY}" stroke="${brow}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M108,${browY} Q116,${browY - 5} 124,${browY}" stroke="${brow}" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${eyes}
    <circle cx="72" cy="101" r="7" fill="#FF8FA3" opacity=".45"/><circle cx="128" cy="101" r="7" fill="#FF8FA3" opacity=".45"/>
    <path d="M98,96 Q100,99 102,96" stroke="${shade(look.skin, -45)}" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${beardSVG(look)}
    ${mouth}`;
}

function beardSVG(look) {
  const c = look.hairColor;
  if (look.beard === 'mustache') return `<path d="M84,103 Q92,96 100,101 Q108,96 116,103 Q108,106 100,103 Q92,106 84,103 Z" fill="${c}"/>`;
  if (look.beard === 'beard') return `<path d="M58,92 Q60,132 100,134 Q140,132 142,92 Q136,112 120,104 Q100,98 80,104 Q64,112 58,92 Z" fill="${c}"/>
    <path d="M84,103 Q92,97 100,101 Q108,97 116,103 Q108,106 100,103 Q92,106 84,103 Z" fill="${shade(c, -15)}"/>`;
  return '';
}

const TORSO = 'M62,138 Q62,125 77,125 L123,125 Q138,125 138,138 L138,202 L62,202 Z';
const longSleeves = (c, cuff) => `<rect x="41" y="127" width="24" height="68" rx="11" fill="${c}"/><rect x="135" y="127" width="24" height="68" rx="11" fill="${c}"/>` +
  (cuff ? `<rect x="42" y="186" width="22" height="8" rx="4" fill="${cuff}"/><rect x="136" y="186" width="22" height="8" rx="4" fill="${cuff}"/>` : '');
const shortSleeves = c => `<rect x="41" y="127" width="24" height="30" rx="10" fill="${c}"/><rect x="135" y="127" width="24" height="30" rx="10" fill="${c}"/>`;

function topSVG(it) {
  const c = it.color, d = shade(c, -35);
  const torso = `<path d="${TORSO}" fill="${c}"/>`;
  const collar = `<path d="M88,125 Q100,138 112,125" stroke="${d}" stroke-width="3" fill="none"/>`;
  switch (it.kind) {
    case 'stripes':
      return torso + [142, 160, 178, 194].map(y => `<rect x="62" y="${y}" width="76" height="7" fill="#fff" opacity=".75"/>`).join('') + shortSleeves(c) + collar;
    case 'sailor':
      return torso + [168, 182, 196].map(y => `<rect x="62" y="${y}" width="76" height="5" fill="#1A3C8F"/>`).join('') + shortSleeves(c) +
        `<rect x="41" y="148" width="24" height="7" fill="#1A3C8F"/><rect x="135" y="148" width="24" height="7" fill="#1A3C8F"/>
        <path d="M70,125 L130,125 L118,150 L100,138 L82,150 Z" fill="#1A3C8F"/><path d="M74,128 L126,128" stroke="#fff" stroke-width="2"/>
        <path d="M92,138 L108,138 L100,156 Z" fill="#E53935"/>`;
    case 'jersey':
      return `<path d="M68,130 L80,124 Q100,140 120,124 L132,130 L136,202 L64,202 Z" fill="${c}"/>
        <path d="M80,124 Q100,140 120,124" stroke="#fff" stroke-width="4" fill="none"/>
        <path d="M68,130 Q76,150 66,170 M132,130 Q124,150 134,170" stroke="#fff" stroke-width="4" fill="none"/>
        <text x="100" y="185" text-anchor="middle" font-size="34" font-weight="900" font-family="Arial, sans-serif" fill="#fff">7</text>`;
    case 'knit': {
      const row = y => Array.from({ length: 9 }, (_, i) => `<path d="M${66 + i * 8.5},${y} l4,-5 l4,5 l-4,5 z" fill="#fff"/>`).join('');
      return torso + row(150) + row(180) + longSleeves(c, '#fff') + collar;
    }
    case 'hoodie':
      return torso + longSleeves(c, d) + `<path d="M76,124 Q100,146 124,124" stroke="${d}" stroke-width="7" fill="none" stroke-linecap="round"/>
        <line x1="94" y1="134" x2="93" y2="156" stroke="#fff" stroke-width="2.5"/><line x1="106" y1="134" x2="107" y2="156" stroke="#fff" stroke-width="2.5"/>
        <rect x="78" y="170" width="44" height="22" rx="6" fill="${d}" opacity=".6"/>`;
    case 'raincoat':
      return `<path d="M62,138 Q62,125 77,125 L123,125 Q138,125 138,138 L144,230 L56,230 Z" fill="${c}"/>` + longSleeves(c, d) +
        `<line x1="100" y1="130" x2="100" y2="230" stroke="${d}" stroke-width="2.5"/>
        ${[148, 172, 196].map(y => `<circle cx="108" cy="${y}" r="4" fill="${d}"/>`).join('')}
        <path d="M78,124 L100,140 L122,124" stroke="${d}" stroke-width="5" fill="none" stroke-linejoin="round"/>
        <rect x="68" y="190" width="20" height="14" rx="3" fill="${d}" opacity=".5"/>`;
    case 'suit':
      return torso + longSleeves(c, '#fff') + `<path d="M86,125 L100,170 L114,125 Z" fill="#fff"/><path d="M97,132 L103,132 L105,162 L100,170 L95,162 Z" fill="#C62828"/>
        <path d="M84,125 L98,168 L84,150 L78,128 Z M116,125 L102,168 L116,150 L122,128 Z" fill="${shade(c, -18)}"/>
        <circle cx="100" cy="182" r="3" fill="#111"/><circle cx="100" cy="194" r="3" fill="#111"/>`;
    case 'apron':
      return torso + shortSleeves(c) + collar + `<path d="M74,150 L126,150 L130,236 Q100,242 70,236 Z" fill="#E53935"/>
        <path d="M74,150 L126,150 L130,236 Q100,242 70,236 Z" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="6 5"/>
        <rect x="88" y="190" width="24" height="18" rx="4" fill="#fff" opacity=".8"/><path d="M78,150 L88,126 M122,150 L112,126" stroke="#E53935" stroke-width="5"/>`;
    case 'dress':
      return `<path d="M64,138 Q64,125 78,125 L122,125 Q136,125 136,138 L136,176 L152,238 Q100,252 48,238 L64,176 Z" fill="${c}"/>
        <rect x="64" y="172" width="72" height="8" fill="${d}"/>` + shortSleeves(c) + collar;
    case 'princess': {
      const stars = [[78, 200], [110, 214], [128, 192], [92, 226], [70, 226]].map(([x, y]) =>
        `<path d="M${x},${y - 5} L${x + 1.5},${y - 1.5} L${x + 5},${y} L${x + 1.5},${y + 1.5} L${x},${y + 5} L${x - 1.5},${y + 1.5} L${x - 5},${y} L${x - 1.5},${y - 1.5} Z" fill="#fff"/>`).join('');
      return `<path d="M64,138 Q64,125 78,125 L122,125 Q136,125 136,138 L136,172 L160,244 Q100,262 40,244 L64,172 Z" fill="${c}"/>
        <path d="M54,236 Q100,256 146,236" stroke="${d}" stroke-width="5" fill="none"/>
        <rect x="64" y="168" width="72" height="9" rx="4" fill="#FFC107"/>` + stars +
        `<circle cx="52" cy="138" r="15" fill="${shade(c, 15)}"/><circle cx="148" cy="138" r="15" fill="${shade(c, 15)}"/>
        <circle cx="100" cy="134" r="5" fill="#9B7BEA"/>`;
    }
    case 'folk': {
      // Lithuanian folk costume: white blouse, dark vest, striped skirt and an apron.
      const stripes = ['#C62828', '#2E7D32', '#F9A825', '#C62828', '#1A237E', '#2E7D32', '#F9A825', '#C62828', '#2E7D32', '#C62828'];
      const skirt = stripes.map((s, i) => `<rect x="${50 + i * 10}" y="178" width="10" height="78" fill="${s}"/>`).join('');
      return `<defs><clipPath id="folkskirt"><path d="M64,176 L136,176 L150,252 Q100,262 50,252 Z"/></clipPath></defs>
        <g clip-path="url(#folkskirt)">${skirt}</g>
        <path d="M80,180 L120,180 L124,246 Q100,252 76,246 Z" fill="#FFF8E7"/>
        ${[196, 214, 232].map(y => `<path d="M80,${y} L120,${y}" stroke="#C62828" stroke-width="4" stroke-dasharray="5 3"/>`).join('')}
        <path d="${TORSO}" fill="#FFFFFF"/>
        <circle cx="52" cy="140" r="15" fill="#fff"/><circle cx="148" cy="140" r="15" fill="#fff"/>
        <rect x="42" y="140" width="22" height="52" rx="10" fill="#fff"/><rect x="136" y="140" width="22" height="52" rx="10" fill="#fff"/>
        <path d="M66,134 L88,126 L100,160 L112,126 L134,134 L136,182 L64,182 Z" fill="${c}"/>
        <path d="M88,126 L100,160 L112,126" stroke="#F9A825" stroke-width="3" fill="none"/>
        <rect x="64" y="176" width="72" height="6" fill="#F9A825"/>`;
    }
    case 'swim':
      return `<path d="M72,128 L80,128 Q100,150 120,128 L128,128 L134,200 Q116,214 100,206 Q84,214 66,200 Z" fill="${c}"/>
        ${[[84, 160], [110, 154], [96, 182], [122, 184], [76, 186]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#fff" opacity=".8"/>`).join('')}`;
    default:
      return torso + shortSleeves(c) + collar;
  }
}

function bottomSVG(it) {
  const c = it.color, d = shade(c, -35);
  switch (it.kind) {
    case 'skirt': return `<path d="M64,194 L136,194 L148,236 Q100,246 52,236 Z" fill="${c}"/><rect x="64" y="192" width="72" height="8" fill="${d}"/>`;
    case 'longskirt': return `<path d="M64,194 L136,194 L150,256 Q100,264 50,256 Z" fill="${c}"/><rect x="64" y="192" width="72" height="8" fill="${d}"/>`;
    case 'shorts': return `<rect x="66" y="192" width="68" height="16" rx="4" fill="${c}"/>
      <rect x="73" y="196" width="26" height="30" rx="5" fill="${c}"/><rect x="101" y="196" width="26" height="30" rx="5" fill="${c}"/>`;
    default: return `<rect x="66" y="192" width="68" height="16" rx="4" fill="${c}"/>
      <rect x="73" y="196" width="26" height="62" rx="5" fill="${c}"/><rect x="101" y="196" width="26" height="62" rx="5" fill="${c}"/>
      <line x1="100" y1="200" x2="100" y2="212" stroke="${d}" stroke-width="2"/>`;
  }
}

function shoesSVG(it) {
  const c = it.color, d = shade(c, -45);
  switch (it.kind) {
    case 'boots': return `<rect x="74" y="232" width="25" height="38" rx="6" fill="${c}"/><rect x="101" y="232" width="25" height="38" rx="6" fill="${c}"/>
      <rect x="68" y="256" width="31" height="15" rx="7" fill="${c}"/><rect x="101" y="256" width="31" height="15" rx="7" fill="${c}"/>
      <rect x="68" y="266" width="31" height="5" rx="2" fill="${d}"/><rect x="101" y="266" width="31" height="5" rx="2" fill="${d}"/>`;
    case 'flats': return `<ellipse cx="85" cy="263" rx="16" ry="8" fill="${c}" stroke="${d}" stroke-width="2"/><ellipse cx="115" cy="263" rx="16" ry="8" fill="${c}" stroke="${d}" stroke-width="2"/>
      <circle cx="85" cy="259" r="3" fill="#fff"/><circle cx="115" cy="259" r="3" fill="#fff"/>`;
    default: return `<rect x="68" y="253" width="31" height="17" rx="8" fill="${c}" stroke="${d}" stroke-width="2"/><rect x="101" y="253" width="31" height="17" rx="8" fill="${c}" stroke="${d}" stroke-width="2"/>
      <rect x="68" y="265" width="31" height="5" rx="2" fill="${d}"/><rect x="101" y="265" width="31" height="5" rx="2" fill="${d}"/>`;
  }
}

function hatSVG(it) {
  const c = it.color, d = shade(c, -40);
  switch (it.kind) {
    case 'cap': return `<path d="M54,64 C54,18 146,18 146,64 Z" fill="${c}"/><path d="M112,60 Q156,56 170,66 Q140,72 112,68 Z" fill="${d}"/><circle cx="100" cy="27" r="5" fill="${d}"/>`;
    case 'crown': return `<path d="M68,50 L66,18 L84,34 L100,10 L116,34 L134,18 L132,50 Z" fill="${c}" stroke="${d}" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="100" cy="38" r="5" fill="#E53935"/><circle cx="80" cy="42" r="3.5" fill="#42A5F5"/><circle cx="120" cy="42" r="3.5" fill="#66BB6A"/>`;
    case 'flower': {
      const petals = [0, 1, 2, 3, 4].map(i => {
        const a = i * Math.PI * 2 / 5;
        return `<circle cx="${(132 + Math.cos(a) * 9).toFixed(1)}" cy="${(46 + Math.sin(a) * 9).toFixed(1)}" r="7.5" fill="#fff"/>`;
      }).join('');
      return petals + `<circle cx="132" cy="46" r="6" fill="${c}"/>`;
    }
    case 'wreath': {
      // Rūtų vainikas: a rue wreath with little flowers.
      let s = '';
      for (let i = 0; i <= 12; i++) {
        const a = Math.PI * (1.05 + i * 0.9 / 12), x = 100 + Math.cos(a) * 50, y = 66 + Math.sin(a) * 30;
        s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="9" ry="5" transform="rotate(${(a * 180 / Math.PI + 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${i % 2 ? c : shade(c, 30)}"/>`;
      }
      return s + [64, 100, 136].map((x, i) => `<circle cx="${x}" cy="${i === 1 ? 37 : 46}" r="5" fill="${i === 1 ? '#FFEB3B' : '#fff'}"/>`).join('');
    }
    case 'knithat': return `<path d="M54,70 C52,16 148,16 146,70 Z" fill="${c}"/><rect x="52" y="58" width="96" height="16" rx="8" fill="${d}"/>
      ${[64, 76, 88, 100, 112, 124, 136].map(x => `<line x1="${x}" y1="60" x2="${x}" y2="72" stroke="${c}" stroke-width="3"/>`).join('')}
      <circle cx="100" cy="16" r="13" fill="#fff"/>`;
    case 'sunhat': return `<ellipse cx="100" cy="54" rx="78" ry="16" fill="${c}"/><path d="M62,54 C62,14 138,14 138,54 Z" fill="${c}"/>
      <path d="M63,46 Q100,54 137,46 L138,54 Q100,60 62,54 Z" fill="#FF6FB5"/><ellipse cx="100" cy="54" rx="78" ry="16" fill="none" stroke="${shade(c, -30)}" stroke-width="2"/>`;
    case 'captain': return `<path d="M58,58 C50,20 150,20 142,58 Z" fill="#fff"/><rect x="58" y="50" width="84" height="14" rx="4" fill="${c}"/>
      <path d="M62,62 Q100,82 138,62 L132,70 Q100,84 68,70 Z" fill="#111"/><circle cx="100" cy="46" r="7" fill="#FFC107"/>`;
    case 'chef': return `<rect x="68" y="40" width="64" height="24" rx="4" fill="#fff" stroke="#ddd" stroke-width="2"/>
      <circle cx="76" cy="26" r="18" fill="#fff"/><circle cx="100" cy="16" r="20" fill="#fff"/><circle cx="124" cy="26" r="18" fill="#fff"/>
      <path d="M70,40 L130,40" stroke="#ddd" stroke-width="2"/>`;
    default: return `<path d="M130,46 L108,32 L110,60 Z M130,46 L152,32 L150,60 Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/><circle cx="130" cy="46" r="6" fill="${d}"/>`;
  }
}

function glassesSVG(it) {
  const c = it.color;
  switch (it.kind) {
    case 'sun': return `<rect x="70" y="79" width="28" height="19" rx="7" fill="${c}"/><rect x="102" y="79" width="28" height="19" rx="7" fill="${c}"/>
      <line x1="97" y1="85" x2="103" y2="85" stroke="${c}" stroke-width="3"/><rect x="74" y="82" width="8" height="4" rx="2" fill="#fff" opacity=".5"/><rect x="106" y="82" width="8" height="4" rx="2" fill="#fff" opacity=".5"/>`;
    case 'heart': {
      const heart = x => `<path d="M${x},98 C${x - 20},86 ${x - 12},72 ${x},81 C${x + 12},72 ${x + 20},86 ${x},98 Z" fill="${c}" opacity=".85"/>`;
      return heart(84) + heart(116) + `<line x1="94" y1="84" x2="106" y2="84" stroke="${c}" stroke-width="3"/>`;
    }
    default: return `<circle cx="84" cy="88" r="12" fill="#fff" fill-opacity=".25" stroke="${c}" stroke-width="3"/><circle cx="116" cy="88" r="12" fill="#fff" fill-opacity=".25" stroke="${c}" stroke-width="3"/>
      <line x1="96" y1="87" x2="104" y2="87" stroke="${c}" stroke-width="3"/>`;
  }
}

function neckSVG(it) {
  const c = it.color;
  switch (it.kind) {
    case 'amber': return Array.from({ length: 9 }, (_, i) => {
      const a = Math.PI * (0.15 + i * 0.7 / 8), x = 100 + Math.cos(a) * 26, y = 118 + Math.sin(a) * 22;
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i === 4 ? 7 : 5}" fill="${i % 2 ? c : shade(c, -30)}" stroke="#fff" stroke-opacity=".5"/>`;
    }).join('');
    case 'scarf': return `<rect x="76" y="118" width="48" height="16" rx="8" fill="${c}"/><rect x="106" y="126" width="14" height="40" rx="5" fill="${c}"/>
      <path d="M106,160 L120,160" stroke="#fff" stroke-width="3"/><path d="M80,126 L120,126" stroke="#fff" stroke-width="2" stroke-dasharray="4 4"/>`;
    default: return `<path d="M100,130 L84,120 L84,140 Z M100,130 L116,120 L116,140 Z" fill="${c}"/><circle cx="100" cy="130" r="5" fill="${shade(c, -30)}"/>`;
  }
}

const PART_FN = { top: topSVG, bottom: bottomSVG, shoes: shoesSVG, hat: hatSVG, glasses: glassesSVG, neck: neckSVG };

function clothIconSVG(it) {
  return `<svg class="char" viewBox="${VIEWBOXES[it.slot]}" xmlns="http://www.w3.org/2000/svg">${PART_FN[it.slot](it)}</svg>`;
}

// Where the character is anchored, as a fraction of its height: feet when standing, hips when sitting, middle when lying.
const CHAR_ANCHOR = { stand: 272 / 280, sit: 200 / 280, lie: 0.5, swim: 150 / 280 };

function characterSVG(look, outfit, opts = {}) {
  const skin = look.skin, sd = shade(skin, -25);
  const top = CLOTH_BY_ID[outfit.top], bottom = CLOTH_BY_ID[outfit.bottom], shoes = CLOTH_BY_ID[outfit.shoes];
  const hat = CLOTH_BY_ID[outfit.hat], glasses = CLOTH_BY_ID[outfit.glasses], neck = CLOTH_BY_ID[outfit.neck];
  const vb = VIEWBOXES[opts.view || 'full'];
  const legs = `<rect x="77" y="196" width="19" height="66" rx="8" fill="${skin}"/><rect x="104" y="196" width="19" height="66" rx="8" fill="${skin}"/>
    ${bottom && !(top && top.full) ? bottomSVG(bottom) : ''}
    ${shoes ? shoesSVG(shoes) : ''}`;
  // Sitting: squash the legs so the knees point at us.
  const legGroup = opts.pose === 'sit' ? `<g transform="translate(0,196) scale(1,.6) translate(0,-196)">${legs}</g>` : legs;
  return `<svg class="char" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    ${hairBack(look.hairStyle, look.hairColor)}
    ${legGroup}
    <rect x="44" y="130" width="18" height="68" rx="9" fill="${skin}"/><rect x="138" y="130" width="18" height="68" rx="9" fill="${skin}"/>
    <circle cx="53" cy="198" r="9" fill="${skin}"/><circle cx="147" cy="198" r="9" fill="${skin}"/>
    <rect x="91" y="112" width="18" height="18" fill="${sd}"/>
    ${top ? topSVG(top) : `<path d="${TORSO}" fill="#f4f4f4"/>`}
    ${neck ? neckSVG(neck) : ''}
    <circle cx="56" cy="88" r="8" fill="${skin}"/><circle cx="144" cy="88" r="8" fill="${skin}"/>
    <circle cx="100" cy="82" r="44" fill="${skin}"/>
    ${face(look, opts.mood)}
    ${hairFront(look.hairStyle, look.hairColor)}
    ${glasses ? glassesSVG(glasses) : ''}
    ${hat ? hatSVG(hat) : ''}
  </svg>`;
}
