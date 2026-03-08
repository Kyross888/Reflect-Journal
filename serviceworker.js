// Name of the cache storage
const CACHE_NAME = "reflect-cache-v1";


// Files we want to store for offline usage
const urlsToCache = [
    "/",
    "/index.html",
    "/app.js",
    "/manifest.json"
];


// Install event
// Runs when the service worker is first installed
self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => {

            console.log("Caching files");

            // Save files to cache
            return cache.addAll(urlsToCache);

        })

    );

});


// Fetch event
// Intercepts network requests
self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
        .then(response => {

            // If file exists in cache, return it
            // otherwise fetch from internet
            return response || fetch(event.request);

        })

    );

});