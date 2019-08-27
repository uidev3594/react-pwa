importScripts('./workbox-sw.js');

const Assets = [
    '/material.min.css',
    '/material.min.js',
    '/static/js/bundle.js',
    '/static/js/0.chunk.js',
    '/static/js/main.chunk.js',
    '/index.html',
    '/',
];

const workboxSW = new WorkboxSW();
workboxSW.precache(Assets);


workboxSW.router.registerRoute(
    'https://newsapi.org/(.*)',
    workboxSW.strategies.networkFirst()
);

workboxSW.router.registerRoute(
    /.*\.(png|jpg|jpeg|gif)/,
    workboxSW.strategies.cacheFirst({
        cacheName: 'news-images',
        cacheExpiration: {
            maxEntries: 20,
            maxAgeSeconds: 12 * 60 * 60,
        },
        cacheableResponse: {statuses: [0, 200]},
    })
);
