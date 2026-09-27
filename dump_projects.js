const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(process.cwd(), 'storage', 'projects.json'), 'utf8');
const projects = JSON.parse(fileData);

console.log(`Total projects in projects.json: ${projects.length}`);

projects.forEach((p, index) => {
  console.log(`\n--- Project #${index + 1} ---`);
  console.log(`ID: ${p.id}`);
  console.log(`Title: "${p.title}"`);
  console.log(`Service: "${p.service}" | Category: "${p.categorySlug}" | Sub: "${p.subCategory}"`);
  console.log(`image: "${p.image}"`);
  console.log(`coverImage: "${p.coverImage}"`);
  console.log(`thumbnail: "${p.thumbnail}"`);
  console.log(`mediaItems (${Array.isArray(p.mediaItems) ? p.mediaItems.length : 0}):`, p.mediaItems);
  console.log(`gallery (${Array.isArray(p.gallery) ? p.gallery.length : 0}):`, p.gallery);
});
