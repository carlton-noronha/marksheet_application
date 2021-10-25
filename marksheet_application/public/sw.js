const STATIC_CACHE_NAME = "static-v1";

const assets = [
	"/",
	"/static/js/bundle.js",
	"/static/js/vendors~main.chunk.js",
	"/static/js/main.chunk.js",
	"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
	"manifest.json",
	"https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxK.woff2",
	"https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9fBBc4.woff2",
	"logo192.png",
	"logo512.png",
	"/addMarksheet",
	"/noNetwork",
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(STATIC_CACHE_NAME).then((cache) => cache.addAll(assets))
	);
});

self.addEventListener("activated", () => {});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches
			.match(event.request)
			.then((cacheRes) => cacheRes || fetch(event.request))
			.catch((err) => {})
	);
});
