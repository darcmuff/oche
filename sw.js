/* DuffDarts — offline cache; HTML prefers network so updates land */
var CACHE = 'oche-v22';
var SHELL = ['./', './index.html', './sw.js'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) {
        return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

function putInCache(req, res) {
  if (!res || !res.ok) return res;
  var clone = res.clone();
  caches.open(CACHE).then(function (c) { c.put(req, clone); });
  return res;
}

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  var same = url.origin === self.location.origin;
  var font = url.hostname.indexOf('fonts.googleapis.com') !== -1 || url.hostname.indexOf('fonts.gstatic.com') !== -1;
  if (!same && !font) return;

  var isDoc = e.request.mode === 'navigate' || (e.request.headers.get('accept') || '').indexOf('text/html') !== -1;

  if (isDoc && same) {
    // Network first so design updates show up; fall back to cache offline
    e.respondWith(
      fetch(e.request).then(function (res) {
        return putInCache(e.request, res);
      }).catch(function () {
        return caches.match(e.request).then(function (cached) {
          return cached || caches.match('./index.html');
        });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function (cached) {
      var net = fetch(e.request).then(function (res) {
        return putInCache(e.request, res);
      }).catch(function () { return cached; });
      return cached || net;
    })
  );
});
