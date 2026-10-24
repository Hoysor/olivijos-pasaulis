// Builds the character as an SVG string from a look + outfit.
const CLOTH_BY_ID = Object.fromEntries(CLOTHES.map(c => [c.id, c]));

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const c = v => Math.max(0, Math.min(255, v + amt));
  const r = c(n >> 16), g = c((n >> 8) & 255), b = c(n & 255);
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

const VIEWBOXES = {
  full: '0 0 200 280',
  top: '20 110 160 140',
  bottom: '30 170 140 110',
  shoes: '45 215 110 65',
  hat: '35 0 130 130',
  glasses: '45 40 110 100',
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
  if (style === 'curly') {
    return [64, 82, 100, 118, 136].map((x, i) => `<circle cx="${x}" cy="${i % 2 ? 50 : 56}" r="14" fill="${c}"/>`).join('');
  }
  if (style === 'short') {
    return `<path d="M54,88 C46,16 154,16 146,88 C142,70 132,62 120,62 C108,56 86,56 74,64 C64,66 57,74 54,88 Z" fill="${c}"/>`;
  }
  return `<path d="M56,84 C48,18 152,18 144,84 C138,66 124,58 112,62 C104,52 84,54 78,64 C68,64 60,72 56,84 Z" fill="${c}"/>`;
}

function face(look, mood) {
  const e = look.eyes;
  const mouth = mood === 'yum'
    ? `<ellipse cx="100" cy="108" rx="9" ry="7" fill="#8B3A3A"/><ellipse cx="100" cy="111" rx="5" ry="3" fill="#FF8A8A"/>`
    : `<path d="M88,104 Q100,117 112,104" stroke="#8B3A3A" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  return `
    <path d="M76,74 Q84,69 92,74" stroke="${shade(look.hairColor, -20)}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M108,74 Q116,69 124,74" stroke="${shade(look.hairColor, -20)}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="84" cy="88" rx="6.5" ry="8" fill="${e}"/><ellipse cx="116" cy="88" rx="6.5" ry="8" fill="${e}"/>
    <circle cx="86.5" cy="85" r="2.4" fill="#fff"/><circle cx="118.5" cy="85" r="2.4" fill="#fff"/>
    <circle cx="72" cy="101" r="7" fill="#FF8FA3" opacity=".45"/><circle cx="128" cy="101" r="7" fill="#FF8FA3" opacity=".45"/>
    <path d="M98,96 Q100,99 102,96" stroke="${shade(look.skin, -45)}" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${mouth}`;
}

function topSVG(it) {
  const c = it.color, d = shade(c, -35);
  const torso = `<path d="M62,138 Q62,125 77,125 L123,125 Q138,125 138,138 L138,202 L62,202 Z" fill="${c}"/>`;
  const shortSleeves = `<rect x="41" y="127" width="24" height="30" rx="10" fill="${c}"/><rect x="135" y="127" width="24" height="30" rx="10" fill="${c}"/>`;
  const collar = `<path d="M88,125 Q100,138 112,125" stroke="${d}" stroke-width="3" fill="none"/>`;
  switch (it.kind) {
    case 'stripes': {
      const stripes = [142, 160, 178, 194].map(y => `<rect x="62" y="${y}" width="76" height="7" fill="#fff" opacity=".75"/>`).join('');
      return torso + stripes + shortSleeves + collar;
    }
    case 'hoodie':
      return torso + `<rect x="41" y="127" width="24" height="68" rx="11" fill="${c}"/><rect x="135" y="127" width="24" height="68" rx="11" fill="${c}"/>
        <rect x="42" y="186" width="22" height="8" rx="4" fill="${d}"/><rect x="136" y="186" width="22" height="8" rx="4" fill="${d}"/>
        <path d="M76,124 Q100,146 124,124" stroke="${d}" stroke-width="7" fill="none" stroke-linecap="round"/>
        <line x1="94" y1="134" x2="93" y2="156" stroke="#fff" stroke-width="2.5"/><line x1="106" y1="134" x2="107" y2="156" stroke="#fff" stroke-width="2.5"/>
        <rect x="78" y="170" width="44" height="22" rx="6" fill="${d}" opacity=".6"/>`;
    case 'dress':
      return `<path d="M64,138 Q64,125 78,125 L122,125 Q136,125 136,138 L136,176 L152,238 Q100,252 48,238 L64,176 Z" fill="${c}"/>
        <rect x="64" y="172" width="72" height="8" fill="${d}"/>` + shortSleeves + collar;
    case 'princess': {
      const stars = [[78, 200], [110, 214], [128, 192], [92, 226], [70, 226]].map(([x, y]) =>
        `<path d="M${x},${y - 5} L${x + 1.5},${y - 1.5} L${x + 5},${y} L${x + 1.5},${y + 1.5} L${x},${y + 5} L${x - 1.5},${y + 1.5} L${x - 5},${y} L${x - 1.5},${y - 1.5} Z" fill="#fff"/>`).join('');
      return `<path d="M64,138 Q64,125 78,125 L122,125 Q136,125 136,138 L136,172 L160,244 Q100,262 40,244 L64,172 Z" fill="${c}"/>
        <path d="M54,236 Q100,256 146,236" stroke="${d}" stroke-width="5" fill="none"/>
        <rect x="64" y="168" width="72" height="9" rx="4" fill="#FFC107"/>` + stars +
        `<circle cx="52" cy="138" r="15" fill="${shade(c, 15)}"/><circle cx="148" cy="138" r="15" fill="${shade(c, 15)}"/>
        <circle cx="100" cy="134" r="5" fill="#9B7BEA"/>`;
    }
    default:
      return torso + shortSleeves + collar;
  }
}

function bottomSVG(it) {
  const c = it.color, d = shade(c, -35);
  switch (it.kind) {
    case 'skirt': return `<path d="M64,194 L136,194 L148,236 Q100,246 52,236 Z" fill="${c}"/><rect x="64" y="192" width="72" height="8" fill="${d}"/>`;
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

function characterSVG(look, outfit, opts = {}) {
  const skin = look.skin, sd = shade(skin, -25);
  const top = CLOTH_BY_ID[outfit.top], bottom = CLOTH_BY_ID[outfit.bottom];
  const shoes = CLOTH_BY_ID[outfit.shoes], hat = CLOTH_BY_ID[outfit.hat], glasses = CLOTH_BY_ID[outfit.glasses];
  const vb = VIEWBOXES[opts.view || 'full'];
  return `<svg class="char" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    ${hairBack(look.hairStyle, look.hairColor)}
    <rect x="77" y="196" width="19" height="66" rx="8" fill="${skin}"/><rect x="104" y="196" width="19" height="66" rx="8" fill="${skin}"/>
    ${bottom && !(top && top.full) ? bottomSVG(bottom) : ''}
    ${shoes ? shoesSVG(shoes) : ''}
    <rect x="44" y="130" width="18" height="68" rx="9" fill="${skin}"/><rect x="138" y="130" width="18" height="68" rx="9" fill="${skin}"/>
    <circle cx="53" cy="198" r="9" fill="${skin}"/><circle cx="147" cy="198" r="9" fill="${skin}"/>
    <rect x="91" y="112" width="18" height="18" fill="${sd}"/>
    ${top ? topSVG(top) : `<path d="M62,138 Q62,125 77,125 L123,125 Q138,125 138,138 L138,202 L62,202 Z" fill="#f4f4f4"/>`}
    <circle cx="56" cy="88" r="8" fill="${skin}"/><circle cx="144" cy="88" r="8" fill="${skin}"/>
    <circle cx="100" cy="82" r="44" fill="${skin}"/>
    ${face(look, opts.mood)}
    ${hairFront(look.hairStyle, look.hairColor)}
    ${glasses ? glassesSVG(glasses) : ''}
    ${hat ? hatSVG(hat) : ''}
  </svg>`;
}
