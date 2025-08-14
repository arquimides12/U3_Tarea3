// service-worker.js
const CACHE_NAME = 'pwa-laptop-cache-v2';

// Importante: rutas RELATIVAS a la raíz del sitio (sin / inicial)
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './src/index.js',
  './src/components/login.js',
  './src/components/product-comment.js',
  './src/components/espe-envio-gratis.js',
  './src/components/espe-boton-carrito.js',
  './assets/icon-192.png',
  './assets/icon-512.png',
  // CDN de lit que usamos con import map (para que haya soporte offline)
  'https://unpkg.com/lit@3.3.1/index.js?module'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Estrategia: Cache First con fallback a red
self.addEventListener('fetch', (event) => {
  const { request } = event;
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        // Cache dinámico para GET
        if (request.method === 'GET' && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
