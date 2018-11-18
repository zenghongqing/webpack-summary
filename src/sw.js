// 缓存当前的版本号
const cacheKey = _sw.hash

// 需要被缓存的文件列表
const cacheFileList = _sw.assets

// 监听install事件
self.addEventListener('install', (event) => {
    // 等待所有资源缓存完成时，才可以进行下一步
    if ('caches' in self) {
        event.waitUntil(caches.open(cacheKey)).then((cache) => {
            // 添加要缓存的文件URL列表
            return cache.addAll(cacheFileList)
        })
    }
})
// 拦截网络请求
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // 去缓存中查询对应的请求
        caches.match(event.request).then((response) => {
            // 如果命中本地缓存，就直接返回本地资源
            if (response) {
                return response
            }
            const requestToCache = event.request.clone()
            return fetch(requestToCache).then(res => {
                if (!res || res.status !== 200) {
                    return res
                }
                const responseToCache = res.clone()
                caches.open(cacheKey).then(cache => {
                    cache.put(requestToCache, responseToCache)
                })
            })
        })
    )
})

// 当sw.js文件更新时，新的Service Workers线程会取得控制权，将会触发activate事件
self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map(cacheName => {
            // 如果版本号不一致则删除缓存
            if (cacheKey !== cacheName) {
                return caches.delete(cacheName)
            }
        }))
    }))
})
