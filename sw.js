// Offline support: serve from cache, refresh the cache in the background.
const CACHE = 'olivijos-pasaulis-v2';
const ASSETS = [
  './', 'index.html', 'style.css', 'manifest.webmanifest',
  'js/data.js', 'js/character.js', 'js/props.js', 'js/sound.js', 'js/state.js', 'js/engine.js', 'js/map.js', 'js/app.js',
  'js/scenes/common.js', 'js/scenes/home.js', 'js/scenes/oldtown.js', 'js/scenes/river.js',
  'js/scenes/market.js', 'js/scenes/museum.js', 'js/scenes/beach.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(e.request, { ignoreSearch: true });
    const fresh = fetch(e.request).then(res => {
      if (res.ok) cache.put(e.request, res.clone());
      return res;
    }).catch(() => cached);
    return cached || fresh;
  }));
});
