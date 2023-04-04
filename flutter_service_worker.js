'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "fb0f1792efaf36004ee9563e5701ea99",
"assets/assets/animations/flutter_logo.json": "caf07791c9fdf8c951c1e5441b70fb03",
"assets/assets/animations/game_controller.json": "848de96dc80e6a12cc8f8301af7b9560",
"assets/assets/animations/hand.json": "2d27b677f9e5cda3a91bd25f9f788cc0",
"assets/assets/animations/heart.json": "9b2377ad2cf5fbc3e8121d1610b30bad",
"assets/assets/icons/email.png": "49b9a54d1a66305ee959325dc2ebc7c6",
"assets/assets/icons/github.png": "0a06027afca2f8aaea113e12b6974a8f",
"assets/assets/icons/instagram.png": "2da7ceb4d6cdd6e780b7ea5e39db7986",
"assets/assets/icons/linkedin.png": "7c1b887f847a833749699cb7a2acee15",
"assets/assets/icons/medium.png": "7c3b5f804c2e6ad4abfc1f3d0e6ac210",
"assets/assets/icons/twitter.png": "81c60b9e08abf549de1d04ccf760db5c",
"assets/assets/images/cansat_logo.png": "919d1b47e56246a662e6f1d0915f559c",
"assets/assets/images/google_akademi.png": "58335582bc86693588117ca883045a98",
"assets/assets/images/Photo.png": "01f9ad22911f6a57c6dbf5d8c5e11272",
"assets/assets/images/projects/arka_kapak_image.png": "a898e8f58418790a896cde83d7a46e2e",
"assets/assets/images/projects/cansat_image.png": "09fb8bc04ff7ead51d1765bc75445fe8",
"assets/assets/images/projects/hyper_image.png": "1ed59d587fd027d0a6befa5920f2ba73",
"assets/assets/images/projects/mongo_image.png": "b77e5efc268607387760a8995ceec3b8",
"assets/assets/images/projects/roller_game_image.png": "ac38796426570432995c8edfc8d98b80",
"assets/assets/images/projects/shop_app_image.png": "39171aa2c76e4740d6816b035f063aeb",
"assets/assets/images/projects/shop_list_image.png": "a2d96e08207c2fc2bcef35197887e78b",
"assets/assets/images/projects/spotify_image.png": "6adb98f293a5b2da188511b496b1cb8f",
"assets/assets/images/projects/teknofest_image.png": "5d01ec98e6db42fddd1ccf6f85a373ea",
"assets/assets/images/projects/test.png": "cb298f2f8d97618523ecbc3cd68e499a",
"assets/assets/images/projects/tubitak_image.png": "081093c2dd93abf201f807551fbc1b25",
"assets/assets/images/Resim.png": "62dcd622fbd792fa27dadcdadeaa0d01",
"assets/assets/images/teknofest_logo.png": "0fc4d95dcb66f03371f849832b585d72",
"assets/assets/images/tubitak.png": "2f260265ea30205b16479da2a7090cc4",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "6807561f03c5efef32ca9a038cddb67a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "1cfe996e845b3a8a33f57607e8b09ee4",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "a0d7985af88c5e5aa982a95f503ed6f0",
"/": "a0d7985af88c5e5aa982a95f503ed6f0",
"main.dart.js": "708b4799227fe1b24e7f4ce164b8cd95",
"manifest.json": "55632d4001d205197a7f0031c0a85ee8",
"version.json": "a32cbe89d51a3e073bba58946809702f"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
