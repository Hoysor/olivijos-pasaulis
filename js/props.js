// Hand-drawn props that have no emoji (Lithuanian dishes, amber, euro). viewBox 0 0 100 100, resting on y≈95.
const PROP_SVG = {
  cepelinai: `<ellipse cx="50" cy="84" rx="46" ry="12" fill="#fff" stroke="#cfd8dc" stroke-width="3"/>
    <ellipse cx="34" cy="70" rx="24" ry="13" fill="#E8D9B5"/><ellipse cx="64" cy="66" rx="24" ry="13" fill="#F0E2C0"/>
    <ellipse cx="60" cy="62" rx="10" ry="4" fill="#fff" opacity=".6"/>
    <path d="M40,58 Q52,48 66,56 Q60,64 44,64 Z" fill="#FFFDF5"/>
    <rect x="46" y="52" width="5" height="4" rx="1" fill="#A0412D"/><rect x="56" y="55" width="5" height="4" rx="1" fill="#A0412D"/><rect x="50" y="59" width="4" height="3" rx="1" fill="#A0412D"/>`,
  saltibarsciai: `<path d="M8,52 L92,52 Q90,92 50,94 Q10,92 8,52 Z" fill="#4FA3E0"/><path d="M14,60 Q50,66 86,60" stroke="#fff" stroke-width="3" fill="none" stroke-dasharray="4 5"/>
    <ellipse cx="50" cy="52" rx="42" ry="10" fill="#FF5FA2"/><ellipse cx="50" cy="51" rx="34" ry="6" fill="#FF7DB5"/>
    <ellipse cx="38" cy="50" rx="9" ry="6" fill="#fff"/><circle cx="38" cy="50" r="4" fill="#FFC107"/>
    <path d="M58,48 l5,-3 M64,52 l4,2 M54,53 l3,-4 M70,48 l2,4" stroke="#43A047" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="66" cy="50" r="4" fill="#C5E1A5" stroke="#7CB342"/>`,
  kibinai: `<path d="M10,86 Q14,44 50,40 Q86,44 90,86 Z" fill="#E3A64A"/><path d="M18,78 Q50,62 82,78" stroke="#C47F2A" stroke-width="3" fill="none"/>
    ${Array.from({ length: 9 }, (_, i) => `<circle cx="${14 + i * 9}" cy="86" r="5" fill="#D89235"/>`).join('')}
    <ellipse cx="40" cy="56" rx="10" ry="4" fill="#fff" opacity=".35"/>`,
  sakotis: `<rect x="44" y="6" width="12" height="90" fill="#F3D27A"/>
    ${Array.from({ length: 8 }, (_, i) => {
      const y = 14 + i * 10, w = 10 + i * 4;
      return `<path d="M50,${y} L${50 - w},${y + 6} L50,${y + 4} Z" fill="${i % 2 ? '#D9A441' : '#C98A2E'}"/><path d="M50,${y + 3} L${50 + w},${y + 9} L50,${y + 7} Z" fill="${i % 2 ? '#C98A2E' : '#D9A441'}"/>`;
    }).join('')}
    <path d="M48,4 L52,4 L50,0 Z" fill="#5D4037"/><ellipse cx="50" cy="96" rx="40" ry="4" fill="#fff" stroke="#cfd8dc" stroke-width="2"/>`,
  duona: `<ellipse cx="50" cy="72" rx="44" ry="24" fill="#4E2C1C"/><ellipse cx="50" cy="66" rx="40" ry="18" fill="#6B3D26"/>
    <path d="M26,60 Q32,52 38,60 M44,58 Q50,50 56,58 M62,60 Q68,52 74,60" stroke="#3B1F12" stroke-width="3" fill="none"/>
    ${[[30, 70], [46, 68], [60, 72], [72, 66], [38, 76]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2" ry="1" fill="#D7B98E"/>`).join('')}`,
  zuvis: `<path d="M8,60 Q40,30 76,58 Q40,84 8,60 Z" fill="#C8892F"/><path d="M76,58 L96,42 L92,60 L96,76 Z" fill="#A86B1F"/>
    <path d="M20,60 Q40,52 70,58" stroke="#E0B060" stroke-width="3" fill="none"/><circle cx="20" cy="56" r="3.5" fill="#222"/>
    <path d="M36,46 Q40,52 36,58 M48,46 Q52,54 48,60 M60,48 Q63,55 60,62" stroke="#A86B1F" stroke-width="2" fill="none"/>`,
  surelis: `<rect x="14" y="54" width="72" height="28" rx="8" fill="#5D3A1A"/><rect x="14" y="54" width="72" height="10" rx="5" fill="#7B4A22"/>
    <path d="M4,58 L16,56 L16,80 L4,78 L10,68 Z M96,58 L84,56 L84,80 L96,78 L90,68 Z" fill="#E53935"/>
    <rect x="34" y="62" width="32" height="12" rx="3" fill="#fff"/><circle cx="50" cy="68" r="4" fill="#E53935"/>`,
  gira: `<rect x="34" y="34" width="32" height="60" rx="10" fill="#6D3B16"/><rect x="42" y="12" width="16" height="26" rx="4" fill="#6D3B16"/>
    <rect x="40" y="8" width="20" height="8" rx="3" fill="#FFC107"/><rect x="34" y="52" width="32" height="24" fill="#FFF3D6"/>
    <path d="M40,66 Q50,56 60,66" stroke="#C62828" stroke-width="3" fill="none"/><rect x="38" y="38" width="5" height="40" rx="2" fill="#fff" opacity=".25"/>`,
  gintaras: `<path d="M20,70 L30,36 L58,24 L82,40 L86,70 L60,90 L32,88 Z" fill="#F39C12"/>
    <path d="M30,36 L58,24 L56,50 Z" fill="#FFC966"/><path d="M56,50 L86,70 L60,90 Z" fill="#D35400" opacity=".6"/>
    <circle cx="44" cy="44" r="5" fill="#fff" opacity=".6"/><circle cx="58" cy="66" r="3" fill="#8E4400" opacity=".5"/>`,
  euro: `<circle cx="50" cy="56" r="40" fill="#FFC107" stroke="#C99700" stroke-width="5"/><circle cx="50" cy="56" r="30" fill="none" stroke="#FFE082" stroke-width="3"/>
    <text x="50" y="72" text-anchor="middle" font-size="44" font-weight="900" font-family="Arial, sans-serif" fill="#A67C00">€</text>`,
};

// Inner HTML for a dispensable item id ("c:<cloth>", "p:<pet>" or a prop id).
function itemHTML(ref) {
  if (ref.startsWith('c:')) return clothIconSVG(CLOTH_BY_ID[ref.slice(2)]);
  if (ref.startsWith('p:')) return `<span class="emo">${PETS[ref.slice(2)].emoji}</span>`;
  const p = PROPS[ref];
  return p.emoji ? `<span class="emo">${p.emoji}</span>` : `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${PROP_SVG[ref]}</svg>`;
}
