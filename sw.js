const CACHE_NAME = 'meow-health-v1';
const urlsToCache = [
  './',
  './index.html'
];

// Cài đặt Service Worker và lưu cache giao diện
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Chặn các yêu cầu mạng để ưu tiên tải nhanh từ cache khi cần
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
