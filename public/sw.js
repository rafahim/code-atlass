/* Code Atlas offline service worker.
 * - Pages you have visited are cached and open without internet.
 * - Hashed build assets (/_next/static/) are cached first, fonts/images revalidate in the background.
 * Bump VERSION to clear old caches after a breaking change. */
const VERSION = "v3";
const STATIC_CACHE = `codeatlas-static-${VERSION}`;
const PAGE_CACHE = `codeatlas-pages-${VERSION}`;
const MAX_PAGES = 200;

const SCOPE_PATH = new URL(self.registration.scope).pathname; // "/" or "/repo-name/"
const OFFLINE_URL = `${SCOPE_PATH}offline/`;
const PRECACHE = [SCOPE_PATH, OFFLINE_URL, `${SCOPE_PATH}search-index.json`];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(PAGE_CACHE);
    await Promise.all(PRECACHE.map(async (url) => {
      try { await cache.add(new Request(url, { cache: "reload" })); } catch (_) { /* ignore missing files */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keep = new Set([STATIC_CACHE, PAGE_CACHE]);
    for (const key of await caches.keys()) {
      if (key.startsWith("codeatlas-") && !keep.has(key)) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

async function trimPages(cache) {
  const keys = await cache.keys();
  const extra = keys.length - MAX_PAGES;
  for (let i = 0; i < extra; i += 1) {
    const url = new URL(keys[i].url);
    if (url.pathname === SCOPE_PATH || url.pathname === OFFLINE_URL) continue; // never drop the shell
    await cache.delete(keys[i]);
  }
}

async function networkFirst(request) {
  const cache = await caches.open(PAGE_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.ok && response.type === "basic") {
      await cache.put(request, response.clone());
      trimPages(cache);
    }
    return response;
  } catch (error) {
    const cached = (await cache.match(request)) || (request.mode === "navigate" ? await cache.match(request.url, { ignoreSearch: true }) : undefined);
    if (cached) return cached;
    if (request.mode === "navigate") {
      const offline = await cache.match(OFFLINE_URL);
      if (offline) return offline;
    }
    return Response.error();
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok) await cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response && (response.ok || response.type === "opaque")) cache.put(request, response.clone());
      return response;
    })
    .catch(() => undefined);
  return cached || (await network) || Response.error();
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!sameOrigin && !isFont) return;
  if (sameOrigin && url.pathname === `${SCOPE_PATH}sw.js`) return;

  if (sameOrigin && url.pathname.startsWith(`${SCOPE_PATH}_next/static/`)) {
    event.respondWith(cacheFirst(request));
  } else if (isFont || /\.(?:png|jpe?g|webp|gif|svg|ico|woff2?)$/i.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    event.respondWith(networkFirst(request)); // pages, RSC payloads, search index
  }
});
