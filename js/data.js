// Game catalog: looks, clothes, food, pets, city buildings and furniture.
const N = (lt, en) => ({ lt, en });

const SKINS = ['#FFE3CF', '#F6CBA8', '#E3AD84', '#C68642', '#8D5524', '#5C3A21'];
const HAIR_COLORS = ['#2B1B10', '#6B3E26', '#B5651D', '#E8C170', '#F7E7A8', '#D9534F', '#FF8FC7', '#9B7BEA', '#4FC3F7'];
const HAIR_STYLES = ['long', 'ponytail', 'pigtails', 'bun', 'bob', 'curly', 'short'];
const EYE_COLORS = ['#3B2416', '#2E6DB4', '#3C8D4F', '#7A7A7A'];

// slot: top | bottom | shoes | hat | glasses. A "full" top is a dress and hides the bottom.
const CLOTHES = [
  { id: 'tee-pink', slot: 'top', kind: 'tee', color: '#FF8FC7', price: 0, name: N('Rožiniai marškinėliai', 'Pink T-shirt') },
  { id: 'tee-blue', slot: 'top', kind: 'tee', color: '#5DADE2', price: 0, name: N('Mėlyni marškinėliai', 'Blue T-shirt') },
  { id: 'tee-stripe', slot: 'top', kind: 'stripes', color: '#FFC94D', price: 15, name: N('Dryžuoti marškinėliai', 'Striped T-shirt') },
  { id: 'hoodie-purple', slot: 'top', kind: 'hoodie', color: '#9B7BEA', price: 25, name: N('Violetinis džemperis', 'Purple hoodie') },
  { id: 'hoodie-green', slot: 'top', kind: 'hoodie', color: '#66BB6A', price: 25, name: N('Žalias džemperis', 'Green hoodie') },
  { id: 'dress-red', slot: 'top', kind: 'dress', full: true, color: '#EF5350', price: 30, name: N('Raudona suknelė', 'Red dress') },
  { id: 'dress-yellow', slot: 'top', kind: 'dress', full: true, color: '#FFD54F', price: 30, name: N('Geltona suknelė', 'Yellow dress') },
  { id: 'dress-mint', slot: 'top', kind: 'dress', full: true, color: '#7FDBCA', price: 30, name: N('Mėtinė suknelė', 'Mint dress') },
  { id: 'princess', slot: 'top', kind: 'princess', full: true, color: '#F8BBD0', price: 60, name: N('Princesės suknelė', 'Princess dress') },
  { id: 'pants-blue', slot: 'bottom', kind: 'pants', color: '#3F6FB5', price: 0, name: N('Džinsai', 'Jeans') },
  { id: 'skirt-pink', slot: 'bottom', kind: 'skirt', color: '#FF6FB5', price: 0, name: N('Rožinis sijonas', 'Pink skirt') },
  { id: 'skirt-purple', slot: 'bottom', kind: 'skirt', color: '#9B7BEA', price: 15, name: N('Violetinis sijonas', 'Purple skirt') },
  { id: 'shorts-green', slot: 'bottom', kind: 'shorts', color: '#66BB6A', price: 12, name: N('Žali šortai', 'Green shorts') },
  { id: 'pants-red', slot: 'bottom', kind: 'pants', color: '#E57373', price: 18, name: N('Raudonos kelnės', 'Red trousers') },
  { id: 'sneakers-white', slot: 'shoes', kind: 'sneakers', color: '#FFFFFF', price: 0, name: N('Balti sportbačiai', 'White sneakers') },
  { id: 'shoes-pink', slot: 'shoes', kind: 'sneakers', color: '#FF8FC7', price: 15, name: N('Rožiniai bateliai', 'Pink shoes') },
  { id: 'boots-brown', slot: 'shoes', kind: 'boots', color: '#8D6E63', price: 20, name: N('Rudi batai', 'Brown boots') },
  { id: 'shoes-gold', slot: 'shoes', kind: 'flats', color: '#FFC107', price: 35, name: N('Auksiniai bateliai', 'Golden shoes') },
  { id: 'bow-pink', slot: 'hat', kind: 'bow', color: '#FF4FA0', price: 10, name: N('Kaspinas', 'Hair bow') },
  { id: 'flower', slot: 'hat', kind: 'flower', color: '#FFEB3B', price: 12, name: N('Gėlytė', 'Flower') },
  { id: 'cap-red', slot: 'hat', kind: 'cap', color: '#E53935', price: 15, name: N('Kepuraitė', 'Cap') },
  { id: 'crown', slot: 'hat', kind: 'crown', color: '#FFC107', price: 50, name: N('Karūna', 'Crown') },
  { id: 'glasses-round', slot: 'glasses', kind: 'round', color: '#5D4037', price: 15, name: N('Akiniai', 'Glasses') },
  { id: 'sunglasses', slot: 'glasses', kind: 'sun', color: '#222222', price: 20, name: N('Akiniai nuo saulės', 'Sunglasses') },
  { id: 'glasses-heart', slot: 'glasses', kind: 'heart', color: '#FF4FA0', price: 25, name: N('Širdelių akiniai', 'Heart glasses') },
];

const FOODS = [
  { id: 'apple', emoji: '🍎', price: 2, name: N('Obuolys', 'Apple') },
  { id: 'banana', emoji: '🍌', price: 2, name: N('Bananas', 'Banana') },
  { id: 'strawberry', emoji: '🍓', price: 3, name: N('Braškė', 'Strawberry') },
  { id: 'carrot', emoji: '🥕', price: 2, name: N('Morka', 'Carrot') },
  { id: 'broccoli', emoji: '🥦', price: 2, name: N('Brokolis', 'Broccoli') },
  { id: 'bread', emoji: '🍞', price: 3, name: N('Duona', 'Bread') },
  { id: 'milk', emoji: '🥛', price: 3, name: N('Pienas', 'Milk') },
  { id: 'cheese', emoji: '🧀', price: 4, name: N('Sūris', 'Cheese') },
  { id: 'pizza', emoji: '🍕', price: 8, name: N('Pica', 'Pizza') },
  { id: 'pancakes', emoji: '🥞', price: 6, name: N('Blynai', 'Pancakes') },
  { id: 'icecream', emoji: '🍦', price: 5, name: N('Ledai', 'Ice cream') },
  { id: 'donut', emoji: '🍩', price: 5, name: N('Spurga', 'Donut') },
  { id: 'cupcake', emoji: '🧁', price: 6, name: N('Keksiukas', 'Cupcake') },
  { id: 'cookie', emoji: '🍪', price: 3, name: N('Sausainis', 'Cookie') },
  { id: 'cake', emoji: '🎂', price: 15, name: N('Tortas', 'Cake') },
  { id: 'bone', emoji: '🦴', price: 4, name: N('Gyvūnų skanėstas', 'Pet treat') },
];

const PETS = [
  { id: 'dog', emoji: '🐶', price: 40, name: N('Šuniukas', 'Puppy') },
  { id: 'cat', emoji: '🐱', price: 40, name: N('Kačiukas', 'Kitten') },
  { id: 'bunny', emoji: '🐰', price: 30, name: N('Triušiukas', 'Bunny') },
  { id: 'hamster', emoji: '🐹', price: 20, name: N('Žiurkėnukas', 'Hamster') },
  { id: 'parrot', emoji: '🦜', price: 35, name: N('Papūga', 'Parrot') },
  { id: 'fish', emoji: '🐠', price: 15, name: N('Žuvytė', 'Fish') },
  { id: 'turtle', emoji: '🐢', price: 25, name: N('Vėžliukas', 'Turtle') },
  { id: 'pony', emoji: '🐴', price: 80, name: N('Ponis', 'Pony') },
  { id: 'unicorn', emoji: '🦄', price: 150, name: N('Vienaragis', 'Unicorn') },
];

// `enter` = screen opened when the character walks onto the tile.
const CITY_TILES = [
  { id: 'home', emoji: '🏠', enter: 'house', name: N('Mano namai', 'My home') },
  { id: 'foodshop', emoji: '🛒', enter: 'shop-food', name: N('Maisto parduotuvė', 'Food store') },
  { id: 'clothshop', emoji: '👗', enter: 'shop-clothes', name: N('Drabužių parduotuvė', 'Clothes store') },
  { id: 'petshop', emoji: '🐾', enter: 'shop-pets', name: N('Gyvūnų parduotuvė', 'Pet store') },
  { id: 'road', emoji: '', name: N('Kelias', 'Road') },
  { id: 'water', emoji: '', name: N('Vanduo', 'Water') },
  { id: 'tree', emoji: '🌳', name: N('Medis', 'Tree') },
  { id: 'pine', emoji: '🌲', name: N('Eglė', 'Pine') },
  { id: 'flowers', emoji: '🌷', name: N('Gėlės', 'Flowers') },
  { id: 'sunflower', emoji: '🌻', name: N('Saulėgrąža', 'Sunflower') },
  { id: 'fountain', emoji: '⛲', name: N('Fontanas', 'Fountain') },
  { id: 'house2', emoji: '🏡', name: N('Namelis', 'Cottage') },
  { id: 'office', emoji: '🏢', name: N('Daugiaaukštis', 'Tower') },
  { id: 'school', emoji: '🏫', name: N('Mokykla', 'School') },
  { id: 'hospital', emoji: '🏥', name: N('Ligoninė', 'Hospital') },
  { id: 'castle', emoji: '🏰', name: N('Pilis', 'Castle') },
  { id: 'wheel', emoji: '🎡', name: N('Apžvalgos ratas', 'Ferris wheel') },
  { id: 'tent', emoji: '🎪', name: N('Cirkas', 'Circus') },
  { id: 'car', emoji: '🚗', name: N('Mašina', 'Car') },
  { id: 'bus', emoji: '🚌', name: N('Autobusas', 'Bus') },
];

const FURNITURE = ['🛏️', '🛋️', '🪑', '📺', '🪴', '💡', '🧸', '🛁', '🚽', '🎹', '📚', '🖼️', '🪞', '🎨', '💻', '🎸', '🕰️', '🎈', '🎁', '🧩', '⚽', '🪀', '🌈', '⭐'];

const WALLS = ['#FFE4EC', '#FFF4C7', '#DFF5E1', '#DDEBFF', '#EEE3FF', '#FFFFFF'];
const FLOORS = ['#E8C9A0', '#C99A6E', '#F3D9E8', '#CFE8F7', '#D8D8D8', '#B9E3B0'];
