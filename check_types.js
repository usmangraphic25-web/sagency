const url = "https://ftqwyzqaqiufnaendoko.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0cXd5enFhcWl1Zm5hZW5kb2tvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTUxMDYyMCwiZXhwIjoyMTAxMDg2NjIwfQ.xZ-OSuwsimnkebyQoJkJy57P3Kh_VpFLUXhPkF2x9LM";

async function checkDataTypes() {
  const res = await fetch(`${url}/rest/v1/portfolio_projects?select=*`, {
    headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
  });
  const projects = await res.json();

  console.log(`Checking data types for ${projects.length} projects:\n`);

  projects.forEach(p => {
    console.log(`ID: ${p.id} | Title: "${p.title}"`);
    console.log(`  image type: ${typeof p.image} => ${JSON.stringify(p.image)}`);
    console.log(`  coverImage type: ${typeof p.coverImage} => ${JSON.stringify(p.coverImage)}`);
    console.log(`  thumbnail type: ${typeof p.thumbnail} => ${JSON.stringify(p.thumbnail)}`);
    console.log(`  mediaItems type: ${typeof p.mediaItems} => ${Array.isArray(p.mediaItems) ? 'Array(' + p.mediaItems.length + ')' : typeof p.mediaItems}`);
    console.log(`  gallery type: ${typeof p.gallery} => ${Array.isArray(p.gallery) ? 'Array(' + p.gallery.length + ')' : typeof p.gallery}`);
    console.log('---');
  });
}

checkDataTypes();
