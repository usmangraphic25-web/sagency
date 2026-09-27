const fs = require('fs');
const path = require('path');

const url = "https://ftqwyzqaqiufnaendoko.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0cXd5enFhcWl1Zm5hZW5kb2tvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTUxMDYyMCwiZXhwIjoyMTAxMDg2NjIwfQ.xZ-OSuwsimnkebyQoJkJy57P3Kh_VpFLUXhPkF2x9LM";

async function inspectBrokenImages() {
  try {
    const res = await fetch(`${url}/rest/v1/portfolio_projects?select=*`, {
      headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
    });
    const projects = await res.json();

    console.log(`Checking ${projects.length} projects for broken URLs...\n`);

    for (const p of projects) {
      const urlsToCheck = [
        { field: 'image', url: p.image },
        { field: 'coverImage', url: p.coverImage },
        { field: 'thumbnail', url: p.thumbnail },
        ...(Array.isArray(p.gallery) ? p.gallery.map((u, i) => ({ field: `gallery[${i}]`, url: u })) : []),
        ...(Array.isArray(p.mediaItems) ? p.mediaItems.map((m, i) => ({ field: `mediaItems[${i}]`, url: typeof m === 'object' ? m.url : m })) : [])
      ].filter(item => Boolean(item.url));

      let hasBroken = false;
      const results = [];

      for (const item of urlsToCheck) {
        const u = item.url;
        try {
          let status = 0;

          if (u.startsWith('http://') || u.startsWith('https://')) {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 3000);
            const headRes = await fetch(u, { method: 'HEAD', signal: controller.signal });
            clearTimeout(timer);
            status = headRes.status;
          } else {
            const localFilePath = path.join(process.cwd(), 'public', u.startsWith('/') ? u.slice(1) : u);
            const exists = fs.existsSync(localFilePath);
            status = exists ? 200 : 404;
          }

          if (status !== 200) {
            hasBroken = true;
          }
          results.push({ field: item.field, url: u, status });
        } catch (err) {
          hasBroken = true;
          results.push({ field: item.field, url: u, status: 'ERROR (' + err.message + ')' });
        }
      }

      if (hasBroken) {
        console.log(`❌ BROKEN PROJECT: [${p.id}] "${p.title}"`);
        results.forEach(r => {
          console.log(`   ${r.field}: ${r.url} => Status: ${r.status}`);
        });
      } else {
        console.log(`✅ OK: [${p.id}] "${p.title}" (${results.length} URLs OK)`);
      }
    }
  } catch (e) {
    console.error("Top-level error:", e);
  }
}

inspectBrokenImages();
