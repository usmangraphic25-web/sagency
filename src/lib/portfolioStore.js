import fs from 'fs';
import path from 'path';

// Memory fallback cache for serverless runtime persistence
let memoryProjects = [];

function getProjectsStoragePath() {
  if (process.env.VERCEL) {
    return '/tmp/derixio_projects.json';
  }
  return path.join(process.cwd(), 'storage', 'projects.json');
}

function ensureDirExists(filePath) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.error('Error ensuring portfolio storage directory exists:', err);
  }
}

function getSupabaseCredentials() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ftqwyzqaqiufnaendoko.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, key };
}

/**
 * Clean storage helper for local file system
 */
function updateLocalFileCache(projects) {
  try {
    const filePath = getProjectsStoragePath();
    ensureDirExists(filePath);
    fs.writeFileSync(filePath, JSON.stringify(projects, null, 2), 'utf8');
  } catch (err) {
    console.error('Local JSON cache write notice:', err);
  }
}

/**
 * Get all projects - SUPABASE DATABASE IS PRIMARY AUTHORITATIVE SOURCE
 */
export async function getProjects() {
  const { url, key } = getSupabaseCredentials();

  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/portfolio_projects?select=*&order=displayOrder.asc,createdAt.desc`, {
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`
        },
        cache: 'no-store'
      });
      if (res.ok) {
        const fetched = await res.json();
        if (Array.isArray(fetched)) {
          const parsed = fetched.map(p => {
            let mediaItems = p.mediaItems;
            if (typeof mediaItems === 'string') {
              try { mediaItems = JSON.parse(mediaItems); } catch (e) { mediaItems = []; }
            }
            let gallery = p.gallery;
            if (typeof gallery === 'string') {
              try { gallery = JSON.parse(gallery); } catch (e) { gallery = []; }
            }
            return {
              ...p,
              mediaItems: Array.isArray(mediaItems) ? mediaItems : [],
              gallery: Array.isArray(gallery) ? gallery : [],
              coverImage: p.coverImage || p.image || '/assets/portfolio-web-v4.jpg',
              image: p.image || p.coverImage || '/assets/portfolio-web-v4.jpg'
            };
          });
          memoryProjects = parsed;
          updateLocalFileCache(parsed);
          return parsed;
        }
      } else {
        console.error('Supabase getProjects HTTP Error:', res.status, await res.text());
      }
    } catch (err) {
      console.error('Error fetching projects from Supabase database:', err);
    }
  }

  // Fallback to local memory / file if network is unavailable
  const filePath = getProjectsStoragePath();
  let fileProjects = [];
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      fileProjects = JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading projects storage file:', error);
  }

  const mergedMap = new Map();
  [...memoryProjects, ...fileProjects].forEach(proj => {
    if (proj && proj.id && !proj.deleted) {
      mergedMap.set(proj.id, proj);
    }
  });

  return Array.from(mergedMap.values()).sort(
    (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0) || new Date(b.createdAt) - new Date(a.createdAt)
  );
}

/**
 * Get projects filtered by category slug
 */
export async function getProjectsByCategory(categorySlug) {
  const projects = await getProjects();
  const slugLower = (categorySlug || '').toLowerCase().trim();
  const isGraphic = ['graphic', 'graphic-design', 'graphic-designing'].includes(slugLower);
  const isLogoBranding = ['logo-branding', 'logo-brand-identity'].includes(slugLower);

  const GRAPHIC_SLUGS = [
    'logo-branding', 'logo-brand-identity', 'ui-ux-design',
    'packaging-print-design', 'social-media-ad-creatives',
    '3d-product-design-mockups', 'shopify-store-web-graphics'
  ];

  return projects.filter(p => {
    const statusUpper = (p.status || '').toUpperCase().trim();
    if (statusUpper === 'HIDDEN' || p.published === false || p.deleted) return false;

    const pCat = (p.categorySlug || '').toLowerCase().trim();
    const pSub = (p.subCategory || '').toLowerCase().trim();
    const pServ = (p.service || '').toLowerCase().trim();

    if (isGraphic) {
      return pServ.includes('graphic') || GRAPHIC_SLUGS.includes(pCat) || GRAPHIC_SLUGS.includes(pSub);
    }
    if (isLogoBranding) {
      return pCat === 'logo-branding' || pCat === 'logo-brand-identity' || pSub === 'logo-branding' || pSub === 'logo-brand-identity';
    }

    return pCat === slugLower || pSub === slugLower || pServ.replace(/\s+/g, '-') === slugLower;
  });
}

/**
 * Create or save a project - DIRECT PERSISTENCE TO SUPABASE DATABASE
 */
export async function saveProject(rawProjectData) {
  const isUpdate = Boolean(rawProjectData.id);
  const now = new Date().toISOString();

  // Multi-media gallery processing
  let rawMediaItems = Array.isArray(rawProjectData.mediaItems) ? rawProjectData.mediaItems : [];
  if (rawMediaItems.length === 0 && rawProjectData.image) {
    rawMediaItems = [{
      id: `media_${Date.now()}_0`,
      url: rawProjectData.image,
      mediaType: rawProjectData.mediaType || (rawProjectData.videoUrl || rawProjectData.videoFile ? 'video' : 'image'),
      videoUrl: rawProjectData.videoUrl || '',
      videoFile: rawProjectData.videoFile || '',
      isCover: true,
      displayOrder: 0
    }];
  }

  const coverItem = rawMediaItems.find(m => m.isCover) || rawMediaItems[0] || {};
  const coverImageUrl = coverItem.url || rawProjectData.coverImage || rawProjectData.image || '/assets/portfolio-web-v4.jpg';

  const projectToSave = {
    id: rawProjectData.id || `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: (rawProjectData.title || 'Untitled Project').trim(),
    service: (rawProjectData.service || 'Graphic Design').trim(),
    categorySlug: (rawProjectData.categorySlug || 'ui-ux-design').trim(),
    categoryName: (rawProjectData.categoryName || rawProjectData.service || 'Graphic Design').trim(),
    subCategory: (rawProjectData.subCategory || rawProjectData.categorySlug || '').trim(),
    description: (rawProjectData.description || '').trim(),
    client: (rawProjectData.client || '').trim(),
    projectUrl: (rawProjectData.projectUrl || '').trim(),
    image: coverImageUrl || '/assets/portfolio-web-v4.jpg',
    coverImage: coverImageUrl || '/assets/portfolio-web-v4.jpg',
    mediaItems: rawMediaItems,
    mediaCount: rawMediaItems.length || 1,
    gallery: rawMediaItems.map(m => m.url).filter(Boolean),
    tags: Array.isArray(rawProjectData.tags) ? rawProjectData.tags : (rawProjectData.tags ? String(rawProjectData.tags).split(',').map(s => s.trim()) : []),
    status: rawProjectData.status || (rawProjectData.published === false ? 'Hidden' : 'Published'),
    published: rawProjectData.published !== false && (rawProjectData.status || '').toUpperCase() !== 'HIDDEN',
    featured: Boolean(rawProjectData.featured),
    displayOrder: typeof rawProjectData.displayOrder === 'number' ? rawProjectData.displayOrder : Number(rawProjectData.displayOrder) || 0,
    
    // Media metadata
    mediaType: rawProjectData.mediaType || (coverItem.mediaType || (rawProjectData.videoUrl || rawProjectData.videoFile ? 'video' : 'image')),
    width: Number(rawProjectData.width) || 0,
    height: Number(rawProjectData.height) || 0,
    aspectRatio: rawProjectData.aspectRatio || 'auto',
    fileSize: Number(rawProjectData.fileSize) || 0,
    thumbnail: rawProjectData.thumbnail || coverImageUrl,

    // Amazon Growth & Portfolio Case Study Highlights
    metricValue: rawProjectData.metricValue || '',
    metricSub: rawProjectData.metricSub || '',
    problem: rawProjectData.problem || rawProjectData.caseStudyData || '',
    solution: rawProjectData.solution || '',
    beforeImage: rawProjectData.beforeImage || '',
    tag: rawProjectData.tag || '',

    // Web Development
    techStack: Array.isArray(rawProjectData.techStack) ? rawProjectData.techStack : (rawProjectData.techStack ? String(rawProjectData.techStack).split(',').map(s => s.trim()) : []),
    industry: rawProjectData.industry || '',
    websiteUrl: rawProjectData.websiteUrl || rawProjectData.projectUrl || '',

    // SEO
    keywordsImproved: rawProjectData.keywordsImproved || '',
    trafficGrowth: rawProjectData.trafficGrowth || '',
    caseStudyData: rawProjectData.caseStudyData || '',

    // Digital Marketing
    campaignName: rawProjectData.campaignName || rawProjectData.title || '',
    platform: rawProjectData.platform || '',
    results: rawProjectData.results || rawProjectData.campaignResults || '',

    // Amazon PPC
    brandName: rawProjectData.brandName || rawProjectData.client || '',
    revenueGrowth: rawProjectData.revenueGrowth || '',
    acosImprovement: rawProjectData.acosImprovement || '',
    campaignResults: rawProjectData.campaignResults || '',

    // Video & Motion Design
    videoType: rawProjectData.videoType || '',
    videoUrl: rawProjectData.videoUrl || '',
    videoFile: rawProjectData.videoFile || '',

    createdAt: rawProjectData.createdAt || now,
    updatedAt: now
  };

  // 1. Primary Save directly to Supabase Database
  const { url, key } = getSupabaseCredentials();
  if (url && key) {
    const endpoint = `${url}/rest/v1/portfolio_projects`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=representation'
      },
      body: JSON.stringify(projectToSave)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Supabase DB save error:', res.status, errText);
      throw new Error(`Supabase DB Save Error (${res.status}): ${errText}`);
    }
  }

  // 2. Update memory & local JSON cache after cloud confirmation
  let projects = await getProjects();
  if (isUpdate) {
    const idx = projects.findIndex(p => p.id === projectToSave.id);
    if (idx !== -1) {
      projects[idx] = projectToSave;
    } else {
      projects.unshift(projectToSave);
    }
  } else {
    projects.unshift(projectToSave);
  }

  memoryProjects = projects;
  updateLocalFileCache(projects);

  return projectToSave;
}

/**
 * Delete a project directly from Supabase Database and Storage
 */
export async function deleteProject(id) {
  const { url, key } = getSupabaseCredentials();
  
  let targetProject = null;
  const currentProjects = await getProjects();
  targetProject = currentProjects.find(p => p.id === id);

  if (url && key) {
    // 1. Delete DB record from Supabase
    const dbEndpoint = `${url}/rest/v1/portfolio_projects?id=eq.${id}`;
    const res = await fetch(dbEndpoint, {
      method: 'DELETE',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Supabase DB delete error:', res.status, errText);
      throw new Error(`Supabase DB Delete Error (${res.status}): ${errText}`);
    }

    // 2. Cleanup associated media files hosted in Supabase Storage 'portfolio' bucket
    if (targetProject) {
      const urlsToClean = [
        targetProject.image,
        targetProject.coverImage,
        targetProject.thumbnail,
        ...(Array.isArray(targetProject.mediaItems) ? targetProject.mediaItems.map(m => m.url) : []),
        ...(Array.isArray(targetProject.gallery) ? targetProject.gallery : [])
      ].filter(u => typeof u === 'string' && u.includes('/storage/v1/object/public/portfolio/'));

      for (const u of Array.from(new Set(urlsToClean))) {
        try {
          const pathPart = u.split('/storage/v1/object/public/portfolio/')[1];
          if (pathPart) {
            await fetch(`${url}/storage/v1/object/portfolio/${pathPart}`, {
              method: 'DELETE',
              headers: {
                'apikey': key,
                'Authorization': `Bearer ${key}`
              }
            });
          }
        } catch (err) {
          console.error('Notice: Storage file cleanup notice:', err);
        }
      }
    }
  }

  // 3. Remove from memory and file cache
  const remaining = currentProjects.filter(p => p.id !== id);
  memoryProjects = remaining;
  updateLocalFileCache(remaining);

  return true;
}
