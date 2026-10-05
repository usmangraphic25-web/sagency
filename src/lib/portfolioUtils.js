/**
 * Portfolio System Utilities
 * Manages dynamic helper text, crop aspect ratios, and card dimensions per service.
 */

/**
 * Dynamic helper text for Project Media Gallery based on selected Main Service & Subcategory
 */
export function getMediaGalleryHelperText(service, subCategory = '') {
  const sub = (subCategory || '').toLowerCase();
  if ((service || '').toLowerCase().includes('graphic') && (sub.includes('logo-branding') || sub.includes('logo-brand-identity'))) {
    return 'Upload project media files. Selected Cover image uses fixed 808×632 crop size, while all other images retain original uploaded dimensions. Click ';
  }
  switch (service) {
    case 'Digital Marketing':
      return 'Upload all project files (e.g. campaign screenshots, ad creatives, or performance reports). Click ';
    case 'Web Development':
      return 'Upload all project files (e.g. website screenshots, before/after UI, or mobile views). Click ';
    case 'Graphic Design':
      return 'Upload all project files (e.g. logo files, social media creatives, or brand assets). Click ';
    case 'SEO':
      return 'Upload all project files (e.g. ranking reports, keyword screenshots, or analytics graphs). Click ';
    case 'Video & Motion Design':
      return 'Upload all project files (e.g. video thumbnails, before/after edits, or motion graphics previews). Click ';
    case 'Amazon Growth':
    case 'Amazon PPC':
    default:
      return 'Upload all project files (e.g. all 7 Amazon listing images, UI screens, or videos). Click ';
  }
}

/**
 * Returns aspect ratio crop dimensions/info for admin crop tool & cover preview
 */
export function getServiceCropDetails(service, aspectRatio = '16:9', subCategory = '') {
  const s = (service || '').toLowerCase();
  const sub = (subCategory || '').toLowerCase();
  
  if (s.includes('video') || s.includes('motion')) {
    if (aspectRatio === '9:16' || aspectRatio === 'vertical') {
      return { ratioClass: 'aspect-[9/16]', dimensions: 'Shorts/Reels/TikTok (9:16)', label: 'Vertical (9:16)' };
    }
    if (aspectRatio === '1:1' || aspectRatio === 'square') {
      return { ratioClass: 'aspect-[1/1]', dimensions: 'Square Social (1:1)', label: 'Square (1:1)' };
    }
    return { ratioClass: 'aspect-[16/9]', dimensions: 'YouTube / Commercial (16:9)', label: 'Landscape (16:9)' };
  }

  if (s.includes('graphic')) {
    if (sub.includes('logo-branding') || sub.includes('logo-brand-identity')) {
      return { ratioClass: 'aspect-[808/632]', dimensions: 'Cover: 808×632 px | Gallery: Original Dimensions', label: 'Graphic Design (808×632)' };
    }
    return { ratioClass: 'aspect-[808/632]', dimensions: '808×632 px', label: 'Graphic Design (808×632)' };
  }

  if (s.includes('web') || s.includes('seo') || s.includes('marketing')) {
    return { ratioClass: 'aspect-[16/9]', dimensions: '1280×720 px (16:9)', label: '1280×720 (16:9)' };
  }

  // Amazon Growth / Amazon PPC / Default
  return { ratioClass: 'aspect-[808/632]', dimensions: 'Amazon Sizing (808×632)', label: 'Amazon Growth (808×632)' };
}

/**
 * Resolves the aspect ratio Tailwind class for rendering portfolio cards
 */
export function getProjectAspectRatioClass(project) {
  if (!project) return 'aspect-[808/632]';
  const service = (project.service || project.category || '').toLowerCase();

  if (service.includes('video') || service.includes('motion')) {
    const format = (project.aspectRatio || project.videoType || '').toLowerCase();
    if (format.includes('9:16') || format.includes('vertical') || format.includes('shorts') || format.includes('reels') || format.includes('tiktok')) {
      return 'aspect-[9/16]';
    }
    if (format.includes('1:1') || format.includes('square')) {
      return 'aspect-[1/1]';
    }
    return 'aspect-[16/9]';
  }

  if (service.includes('web') || service.includes('seo') || service.includes('marketing')) {
    return 'aspect-[16/9]';
  }

  if (service.includes('graphic')) {
    return 'aspect-[808/632]';
  }

  // Amazon Growth / Amazon PPC / Default
  return 'aspect-[808/632]';
}

/**
 * Resolves exact human-readable category display name for portfolio cards
 */
export function getCategoryDisplayName(project) {
  if (!project) return "Graphic Design";

  const slug = (project.categorySlug || project.subCategory || "").toLowerCase().trim();
  const service = (project.service || "").trim();

  // 1. Amazon Growth Subcategories
  if (slug === "amazon-listing-images" || slug === "amazon-product-listing-graphics") {
    return "Amazon Listing Images";
  }
  if (slug === "a-plus-content" || slug === "a-plus-content-storefront") {
    return "Amazon A+ Content";
  }
  if (slug === "amazon-brand-store") {
    return "Amazon Storefront Design";
  }
  if (slug === "amazon-campaigns" || slug === "amazon-ppc") {
    return "Amazon PPC / Growth";
  }

  // 2. Graphic Design Subcategories
  if (slug === "logo-brand-identity" || slug === "logo-branding") return "Logo & Branding";
  if (slug === "ui-ux-design") return "UI/UX Design";
  if (slug === "packaging-print-design") return "Packaging & Print Design";
  if (slug === "social-media-ad-creatives") return "Social Media & Ad Creatives";
  if (slug === "3d-product-design-mockups") return "3D Product Design & Mockups";
  if (slug === "shopify-store-web-graphics") return "Shopify Store & Web Graphics";

  // 3. Main Services Fallback
  if (service === "Web Development" || slug === "web-development") return "Web Development";
  if (service === "SEO" || slug === "seo") return "SEO";
  if (service === "Digital Marketing" || slug === "digital-marketing") return "Digital Marketing";
  if (service === "Video & Motion Design" || slug === "video-motion-design") return "Video & Motion Design";
  if (service === "Graphic Design" || slug === "graphic-designing") return "Graphic Design";
  if (service === "Amazon Growth") return "Amazon Growth";

  return project.categoryName || project.service || project.category || "Graphic Design";
}

/**
 * Safely resolves and validates image URLs for portfolio project cards & detail pages.
 * Handles strings, object candidates, empty strings, relative paths, and fallbacks.
 */
export function getValidImageUrl(source, fallback = "/assets/portfolio-web-v4.jpg") {
  if (!source) return fallback;

  // Direct string input
  if (typeof source === "string") {
    const trimmed = source.trim();
    if (!trimmed || trimmed === '""' || trimmed === "''" || trimmed === "null" || trimmed === "undefined") {
      return fallback;
    }
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
      return trimmed;
    }
    return fallback;
  }

  // Object input (project / case study)
  if (typeof source === "object") {
    const candidates = [
      source.coverImage,
      source.image,
      source.thumbnail,
      source.resultImageUrl,
      source.mainResultImageUrl,
      source.coverImageUrl,
      Array.isArray(source.gallery) ? source.gallery[0] : null,
      Array.isArray(source.mediaItems) && source.mediaItems[0] ? (source.mediaItems[0].url || source.mediaItems[0]) : null,
    ];

    for (const cand of candidates) {
      if (cand && typeof cand === "string") {
        const trimmed = cand.trim();
        if (trimmed && trimmed !== '""' && trimmed !== "''" && trimmed !== "null" && trimmed !== "undefined") {
          if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
            return trimmed;
          }
        }
      }
    }
  }

  return fallback;
}

