import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

import { precacheAndRoute } from 'workbox-precaching';

registerRoute(
    // Cache font awesome js files
    /^https:\/\/use\.fontawesome\.com/,
    new CacheFirst({
        cacheName: 'fontawesome-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                // Cache for a maximum of a week
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
        ],
    }),
);

registerRoute(
    // Cache font polyfill js files
    /^https:\/\/polyfill\.io/,
    new CacheFirst({
        cacheName: 'polyfill-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                // Cache for a maximum of a week
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
        ],
    }),
);

// not sure why we need this
precacheAndRoute(self.__WB_MANIFEST);

