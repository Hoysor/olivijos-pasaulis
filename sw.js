// Offline support. Always try the network first (so new versions show up right away), fall back to the cache offline.
const CACHE = 'olivijos-pasaulis-v3';
const ASSETS = [
  './', 'index.html', 'style.css', 'manifest.webmanifest',
  'js/data.js', 'js/character.js', 'js/props.js', 'js/sound.js', 'js/state.js', 'js/engine.js', 'js/map.js', 'js/app.js',
  'js/scenes/common.js', 'js/scenes/home.js', 'js/scenes/oldtown.js', 'js/scenes/river.js',
  'js/scenes/market.js', 'js/scenes/museum.js', 'js/scenes/beach.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  // cache: 'reload' skips the browser's HTTP cache so we never store stale copies.
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const old = (await caches.keys()).filter(k => k !== CACHE);
    await Promise.all(old.map(k => caches.delete(k)));
    await self.clients.claim();
    // Pages opened by an older version may be running a broken mix of files: reload them.
    if (old.length) (await self.clients.matchAll({ type: 'window' })).forEach(c => c.navigate(c.url));
  })());
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(cache =>
    fetch(e.request.url, { cache: 'no-cache' })
      .then(res => {
        if (res.ok) cache.put(e.request, res.clone());
        return res;
      })
      .catch(() => cache.match(e.request, { ignoreSearch: true }))));
});
