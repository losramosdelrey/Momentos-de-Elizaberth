const CACHE = 'momentos-v3';
const CDN = /(images\.unsplash\.com|cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|unpkg\.com)$/;
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== CACHE).map((x) => caches.delete(x)))).then(() => self.clients.claim()));
});
const save = (req, res) => { if (res && (res.ok || res.type === 'opaque')) { const c = res.clone(); caches.open(CACHE).then((x) => x.put(req, c)); } return res; };
self.addEventListener('fetch', (e) => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET') return;
  if (r.mode === 'navigate') { // HTML: red primero, caché si no hay conexión
    e.respondWith(fetch(r).then((res) => save(r, res)).catch(() => caches.match(r)));
  } else if (u.origin === location.origin || CDN.test(u.hostname)) { // estáticos: caché al instante y actualiza en segundo plano
    e.respondWith(caches.match(r).then((hit) => { const net = fetch(r).then((res) => save(r, res)).catch(() => hit); return hit || net; }));
  }
});
