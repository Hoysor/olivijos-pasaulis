// Catalog: looks, clothes, props (food, toys, things) and pets.
const N = (lt, en) => ({ lt, en });

const SKINS = ['#FFE3CF', '#F6CBA8', '#E3AD84', '#C68642', '#8D5524', '#5C3A21'];
const HAIR_COLORS = ['#2B1B10', '#6B3E26', '#B5651D', '#E8C170', '#F7E7A8', '#D9D9D9', '#D9534F', '#FF8FC7', '#9B7BEA', '#4FC3F7'];
const HAIR_STYLES = ['long', 'ponytail', 'pigtails', 'braids', 'bun', 'bob', 'curly', 'short', 'spiky', 'bald'];
const EYE_COLORS = ['#3B2416', '#2E6DB4', '#3C8D4F', '#7A7A7A'];
const BEARDS = ['none', 'mustache', 'beard'];
const SIZES = ['kid', 'adult'];
const SLOTS = ['top', 'bottom', 'shoes', 'hat', 'glasses', 'neck'];

// A "full" top is a dress or costume and hides the bottom.
const CLOTHES = [
  { id: 'tee-pink', slot: 'top', kind: 'tee', color: '#FF8FC7' },
  { id: 'tee-blue', slot: 'top', kind: 'tee', color: '#5DADE2' },
  { id: 'tee-red', slot: 'top', kind: 'tee', color: '#E53935' },
  { id: 'tee-stripe', slot: 'top', kind: 'stripes', color: '#FFC94D' },
  { id: 'sailor', slot: 'top', kind: 'sailor', color: '#FFFFFF' },
  { id: 'jersey', slot: 'top', kind: 'jersey', color: '#1B8A3E' },
  { id: 'knit', slot: 'top', kind: 'knit', color: '#C62828' },
  { id: 'hoodie-purple', slot: 'top', kind: 'hoodie', color: '#9B7BEA' },
  { id: 'hoodie-green', slot: 'top', kind: 'hoodie', color: '#66BB6A' },
  { id: 'raincoat', slot: 'top', kind: 'raincoat', color: '#FFD600' },
  { id: 'suit', slot: 'top', kind: 'suit', color: '#37474F' },
  { id: 'apron', slot: 'top', kind: 'apron', color: '#FFFFFF' },
  { id: 'dress-red', slot: 'top', kind: 'dress', full: true, color: '#EF5350' },
  { id: 'dress-yellow', slot: 'top', kind: 'dress', full: true, color: '#FFD54F' },
  { id: 'dress-mint', slot: 'top', kind: 'dress', full: true, color: '#7FDBCA' },
  { id: 'princess', slot: 'top', kind: 'princess', full: true, color: '#F8BBD0' },
  { id: 'folk', slot: 'top', kind: 'folk', full: true, color: '#2E7D32' },
  { id: 'swim', slot: 'top', kind: 'swim', full: true, color: '#FF6FB5' },
  { id: 'jeans', slot: 'bottom', kind: 'pants', color: '#3F6FB5' },
  { id: 'pants-dark', slot: 'bottom', kind: 'pants', color: '#455A64' },
  { id: 'pants-red', slot: 'bottom', kind: 'pants', color: '#E57373' },
  { id: 'skirt-pink', slot: 'bottom', kind: 'skirt', color: '#FF6FB5' },
  { id: 'skirt-purple', slot: 'bottom', kind: 'skirt', color: '#9B7BEA' },
  { id: 'skirt-long', slot: 'bottom', kind: 'longskirt', color: '#5D4037' },
  { id: 'shorts-green', slot: 'bottom', kind: 'shorts', color: '#66BB6A' },
  { id: 'shorts-blue', slot: 'bottom', kind: 'shorts', color: '#1E88E5' },
  { id: 'sneakers-white', slot: 'shoes', kind: 'sneakers', color: '#FFFFFF' },
  { id: 'shoes-pink', slot: 'shoes', kind: 'sneakers', color: '#FF8FC7' },
  { id: 'boots-brown', slot: 'shoes', kind: 'boots', color: '#8D6E63' },
  { id: 'gumboots', slot: 'shoes', kind: 'boots', color: '#FFD600' },
  { id: 'shoes-gold', slot: 'shoes', kind: 'flats', color: '#FFC107' },
  { id: 'shoes-black', slot: 'shoes', kind: 'flats', color: '#333333' },
  { id: 'bow-pink', slot: 'hat', kind: 'bow', color: '#FF4FA0' },
  { id: 'flower', slot: 'hat', kind: 'flower', color: '#FFEB3B' },
  { id: 'rue-wreath', slot: 'hat', kind: 'wreath', color: '#2E7D32' },
  { id: 'cap-red', slot: 'hat', kind: 'cap', color: '#E53935' },
  { id: 'knit-hat', slot: 'hat', kind: 'knithat', color: '#1E88E5' },
  { id: 'sunhat', slot: 'hat', kind: 'sunhat', color: '#F3D58A' },
  { id: 'captain', slot: 'hat', kind: 'captain', color: '#1A237E' },
  { id: 'chef', slot: 'hat', kind: 'chef', color: '#FFFFFF' },
  { id: 'crown', slot: 'hat', kind: 'crown', color: '#FFC107' },
  { id: 'glasses-round', slot: 'glasses', kind: 'round', color: '#5D4037' },
  { id: 'sunglasses', slot: 'glasses', kind: 'sun', color: '#222222' },
  { id: 'glasses-heart', slot: 'glasses', kind: 'heart', color: '#FF4FA0' },
  { id: 'amber', slot: 'neck', kind: 'amber', color: '#F39C12' },
  { id: 'scarf', slot: 'neck', kind: 'scarf', color: '#E53935' },
  { id: 'bowtie', slot: 'neck', kind: 'bowtie', color: '#7B1FA2' },
];

// Props. kind: food | toy | thing | fish. `svg` refers to PROP_SVG, otherwise the emoji is drawn.
const P = (id, kind, emoji, size = 80) => ({ id, kind, emoji, size });
const PROPS = Object.fromEntries([
  // Lithuanian dishes (drawn in props.js)
  P('cepelinai', 'food', null), P('saltibarsciai', 'food', null), P('kibinai', 'food', null), P('sakotis', 'food', null, 100),
  P('duona', 'food', null), P('zuvis', 'food', null), P('surelis', 'food', null), P('gira', 'food', null),
  // Everyday food
  P('apple', 'food', '🍎'), P('pear', 'food', '🍐'), P('strawberry', 'food', '🍓'), P('cherries', 'food', '🍒'), P('blueberries', 'food', '🫐'),
  P('cucumber', 'food', '🥒'), P('carrot', 'food', '🥕'), P('potato', 'food', '🥔'), P('tomato', 'food', '🍅'), P('mushroom', 'food', '🍄'),
  P('watermelon', 'food', '🍉'), P('corn', 'food', '🌽'), P('cheese', 'food', '🧀'), P('milk', 'food', '🥛'), P('egg', 'food', '🥚'),
  P('honey', 'food', '🍯'), P('pancakes', 'food', '🥞'), P('cake', 'food', '🍰'), P('icecream', 'food', '🍦'), P('lollipop', 'food', '🍭'),
  P('cookie', 'food', '🍪'), P('donut', 'food', '🍩'), P('coffee', 'food', '☕'), P('tea', 'food', '🍵'), P('juice', 'food', '🧃'),
  P('fish', 'fish', '🐟'),
  // Toys and things
  P('basketball', 'toy', '🏀'), P('football', 'toy', '⚽'), P('beachball', 'toy', '🏐'), P('balloon', 'toy', '🎈', 100), P('kite', 'toy', '🪁', 110),
  P('teddy', 'toy', '🧸'), P('duck', 'toy', '🦆', 60), P('blocks', 'toy', '🧩'), P('yoyo', 'toy', '🪀', 60), P('guitar', 'toy', '🎸', 110),
  P('bucket', 'toy', '🪣'), P('lifebuoy', 'toy', '🛟', 90), P('umbrella', 'thing', '☂️', 110), P('book', 'thing', '📚'),
  P('paint', 'thing', '🎨'), P('phone', 'thing', '📱', 60), P('gift', 'thing', '🎁'), P('rod', 'thing', '🎣', 110), P('broom', 'thing', '🧹', 120),
  P('tulip', 'thing', '🌷'), P('sunflower', 'thing', '🌻'), P('rose', 'thing', '🌹'), P('bouquet', 'thing', '💐'), P('daisy', 'thing', '🌼'),
  P('shell', 'thing', '🐚', 60), P('crab', 'thing', '🦀', 70), P('gintaras', 'thing', null, 60), P('euro', 'thing', null, 50), P('ticket', 'thing', '🎟️', 60),
].map(p => [p.id, p]));

const PETS = {
  dog: { emoji: '🐕', sound: 'bark' }, poodle: { emoji: '🐩', sound: 'bark' }, cat: { emoji: '🐈', sound: 'meow' },
  blackcat: { emoji: '🐈‍⬛', sound: 'meow' }, bunny: { emoji: '🐇', sound: 'squeak' }, hamster: { emoji: '🐹', sound: 'squeak' },
  parrot: { emoji: '🦜', sound: 'tweet' }, turtle: { emoji: '🐢', sound: 'squeak' }, hedgehog: { emoji: '🦔', sound: 'squeak' },
  squirrel: { emoji: '🐿️', sound: 'squeak' },
};

// Lists used by dispensers (fridge, stalls, wardrobe...). Cloth ids are prefixed "c:", pets "p:".
const ALL_CLOTHES = CLOTHES.map(c => 'c:' + c.id);
