// service-worker.js

// Nombre de la cache
const CACHE_NAME = 'pwa-laptop-cache-v2';

// Archivos que se cachearán (Application Shell)
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
  './assets/icon-512.png'
];

// Evento install: cachea los archivos de APP_SHELL
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// Evento activate: elimina caches antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Estrategia fetch: cache first
self.addEventListener('fetch', (event) => {
  const { request } = event;
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (request.method === 'GET' && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
