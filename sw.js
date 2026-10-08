// Service worker de Momentos
const CACHE = 'momentos-v5';
const OFFLINE = 'offline.html';
const NET_TIMEOUT = 3000; // ms: con conexión lenta se usa la copia guardada

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll([OFFLINE])).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const save = (req, res) => {
  if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
  return res;
};

// Red primero con tiempo límite; si falla o tarda, copia en caché; si no hay, página offline
const networkFirst = (req) => {
  const net = fetch(req).then((res) => save(req, res));
  const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), NET_TIMEOUT));
  return Promise.race([net, timeout])
    .catch(() => caches.match(req).then((hit) => hit || net.catch(() => caches.match(OFFLINE))));
};

// Caché al instante y actualización en segundo plano
const staleWhileRevalidate = (req) =>
  caches.match(req).then((hit) => {
    const net = fetch(req).then((res) => save(req, res)).catch(() => hit);
    return hit || net;
  });

self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== location.origin) return; // sin respuestas opacas de terceros en la caché
  e.respondWith(r.mode === 'navigate' ? networkFirst(r) : staleWhileRevalidate(r));
});
