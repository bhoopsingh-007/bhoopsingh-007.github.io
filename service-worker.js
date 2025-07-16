const CACHE_NAME = "bhoop-singh-v1";
const urlsToCache = [
    "./",
    "./index.html",
    "./assets/css/main.css",
    "./assets/vendor/bootstrap/css/bootstrap.min.css",
    "./assets/img/favicon.png",
    "./assets/img/profile/profile-1.webp",
    "./assets/img/profile/profile-img.jpg",
    "./assets/img/misc/signature-1.png",
    "./assets/img/portfolio/portfolio-1.webp",
    "./assets/img/portfolio/portfolio-10.webp",
    "./assets/img/portfolio/portfolio-7.webp",
    "./assets/img/portfolio/portfolio-4.webp",
    "./assets/img/portfolio/portfolio-2.webp",
    "./assets/img/portfolio/portfolio-11.webp",
    "./assets/img/person/person-m-7.webp",
    "./assets/img/person/person-f-8.webp",
    "./assets/img/person/person-m-9.webp",
    "./assets/img/person/person-f-10.webp"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            )
        )
    );
});
