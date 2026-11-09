const C='cgs-toros-v1';
const BASE=['./','index.html','manifest.json','icon-192.png','icon-512.png','data.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(BASE.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 const key=u.search?new Request(u.origin+u.pathname):r;
 e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const c=res.clone();caches.open(C).then(ch=>ch.put(key,c))}return res}).catch(()=>caches.match(key,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))))});
