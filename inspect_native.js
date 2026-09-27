const fs = require('fs');
const path = require('path');
const https = require('https');

function checkUrl(urlStr) {
  return new Promise((resolve) => {
    if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
      const localFilePath = path.join(process.cwd(), 'public', urlStr.startsWith('/') ? urlStr.slice(1) : urlStr);
      resolve({ url: urlStr, status: fs.existsSync(localFilePath) ? 200 : 404, type: 'local' });
      return;
    }
    const req = https.request(urlStr, { method: 'HEAD', timeout: 4000 }, (res) => {
      resolve({ url: urlStr, status: res.statusCode, type: 'remote' });
    });
    req.on('error', (err) => resolve({ url: urlStr, status: 'ERR: ' + err.message, type: 'remote' }));
    req.on('timeout', () => { req.destroy(); resolve({ url: urlStr, status: 'TIMEOUT', type: 'remote' }); });
    req.end();
  });
}

async function run() {
  const fileData = fs.readFileSync(path.join(process.cwd(), 'storage', 'projects.json'), 'utf8');
  const projects = JSON.parse(fileData);

  console.log(`Checking ${projects.length} projects from storage/projects.json:\n`);

  for (const p of projects) {
    console.log(`--------------------------------------------------`);
    console.log(`ID: ${p.id}`);
    console.log(`Title: ${p.title}`);
    console.log(`Service: ${p.service} | Category: ${p.categorySlug}`);
    console.log(`image: ${p.image}`);
    console.log(`coverImage: ${p.coverImage}`);
    
    const urls = [p.image, p.coverImage, ...(p.gallery || [])].filter(Boolean);
    const unique = Array.from(new Set(urls));
    for (const u of unique) {
      const res = await checkUrl(u);
      console.log(`   ${res.status === 200 ? '✅' : '❌'} ${u} => ${res.status}`);
    }
  }
}

run();
