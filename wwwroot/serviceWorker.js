const staticShaderGallery = "shader-Gallery-site-v1"
const assets = [
    "/",
    "/index.htm",
    "/logo.png",
    "/main.js",
    "/render.js",
    "/style.css",
    "/Shaders/BarTilesShader.txt",
    "/Shaders/CheckerLandscape.txt",
    "/Shaders/CheckerMapCircleShader.txt",
    "/Shaders/CurlesqueShader.txt",
    "/Shaders/PixellatedPlasmaShader.txt",
    "/Shaders/PlasmaShader.txt",
    "/Shaders/PlasmaShader2.txt",
    "/Shaders/RayMarchShader.txt",
    "/Shaders/RotatingLinesShader.txt"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticShaderGallery).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})