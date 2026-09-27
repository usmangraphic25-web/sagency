const fs = require('fs');
const https = require('https');

const url = "https://ftqwyzqaqiufnaendoko.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0cXd5enFhcWl1Zm5hZW5kb2tvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTUxMDYyMCwiZXhwIjoyMTAxMDg2NjIwfQ.xZ-OSuwsimnkebyQoJkJy57P3Kh_VpFLUXhPkF2x9LM";

function getUrlStatus(urlStr) {
  return new Promise((resolve) => {
    if (!urlStr || typeof urlStr !== 'string') {
      resolve({ status: 'EMPTY' });
      return;
    }
    if (!urlStr.startsWith('http')) {
      const localFile = `./public${urlStr.startsWith('/') ? '' : '/'}${urlStr}`;
      resolve({ status: fs.existsSync(localFile) ? 200 : 404 });
      return;
    }
    const req = https.request(urlStr, { method: 'GET', timeout: 5000 }, (res) => {
      // Consume response stream to avoid memory leak
      res.on('data', () => {});
      res.on('end', () => resolve({ status: res.statusCode }));
    });
    req.on('error', (err) => resolve({ status: 'ERR: ' + err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 'TIMEOUT' }); });
    req.end();
  });
}

async function run() {
  const res = await fetch(`${url}/rest/v1/portfolio_projects?select=*`, {
    headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
  });
  const projects = await res.json();

  console.log(`Checking ${projects.length} projects in Supabase DB:\n`);

  for (const p of projects) {
    console.log(`\n========================================`);
    console.log(`Project ID: ${p.id}`);
    console.log(`Title: ${p.title}`);
    console.log(`Service: ${p.service} | Category: ${p.categorySlug}`);
    console.log(`status: ${p.status} | published: ${p.published}`);

    const imageRes = await getUrlStatus(p.image);
    console.log(`image: "${p.image}" => Status ${imageRes.status}`);

    const coverRes = await getUrlStatus(p.coverImage);
    console.log(`coverImage: "${p.coverImage}" => Status ${coverRes.status}`);

    const thumbRes = await getUrlStatus(p.thumbnail);
    console.log(`thumbnail: "${p.thumbnail}" => Status ${thumbRes.status}`);

    let mediaItems = p.mediaItems;
    if (typeof mediaItems === 'string') {
      try { mediaItems = JSON.parse(mediaItems); } catch(e) { mediaItems = []; }
    }
    console.log(`mediaItems (${Array.isArray(mediaItems) ? mediaItems.length : 0}):`);
    if (Array.isArray(mediaItems)) {
      for (let i = 0; i < mediaItems.length; i++) {
        const m = mediaItems[i];
        const mUrl = typeof m === 'object' ? m.url : m;
        const mRes = await getUrlStatus(mUrl);
        console.log(`  [${i}] ${mUrl} => Status ${mRes.status}`);
      }
    }

    let gallery = p.gallery;
    if (typeof gallery === 'string') {
      try { gallery = JSON.parse(gallery); } catch(e) { gallery = []; }
    }
    console.log(`gallery (${Array.isArray(gallery) ? gallery.length : 0}):`);
    if (Array.isArray(gallery)) {
      for (let i = 0; i < gallery.length; i++) {
        const gUrl = gallery[i];
        const gRes = await getUrlStatus(gUrl);
        console.log(`  [${i}] ${gUrl} => Status ${gRes.status}`);
      }
    }
  }
}

run();
