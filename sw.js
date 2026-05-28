const CACHE_NAME = 'flowbook-v1';

// ไฟล์ที่ต้อง cache สำหรับใช้ offline
const STATIC_ASSETS = [
  './cashflow_tracker.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

// CDN libraries — cache เมื่อโหลดครั้งแรก
const CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap',
];

// ==================== INSTALL ====================
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache local files (required)
      return cache.addAll(STATIC_ASSETS).then(() => {
        // Cache CDN files (best effort — ไม่ fail ถ้า offline ตอน install)
        return Promise.allSettled(
          CDN_ASSETS.map(url =>
            fetch(url).then(res => { if (res.ok) cache.put(url, res); }).catch(() => {})
          )
        );
      });
    }).then(() => self.skipWaiting())
  );
});

// ==================== ACTIVATE ====================
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ==================== FETCH ====================
self.addEventListener('fetch', event => {
  // ข้าม non-GET requests
  if (event.request.method !== 'GET') return;

  // ข้าม GitHub API — ต้องออนไลน์เสมอ
  if (event.request.url.includes('api.github.com') ||
      event.request.url.includes('api.anthropic.com')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // มีใน cache — ใช้ได้เลย แต่ update cache ใน background (stale-while-revalidate)
        const fetchPromise = fetch(event.request).then(res => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return res;
        }).catch(() => {});
        return cached;
      }

      // ไม่มีใน cache — ดึงจาก network แล้ว cache ไว้
      return fetch(event.request).then(res => {
        if (!res || !res.ok || res.type === 'opaque') return res;
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return res;
      }).catch(() => {
        // Offline + ไม่มี cache — ส่ง fallback
        return caches.match('./cashflow_tracker.html');
      });
    })
  );
});
