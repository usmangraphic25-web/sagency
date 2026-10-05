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

export const STATIC_PORTFOLIO_PROJECTS = [
  // --- AMAZON PPC PROJECTS ---
  {
    id: "fp1",
    title: "Scaling to $46,487/month at 13.89% ACoS",
    service: "Amazon Growth",
    categorySlug: "amazon-campaigns",
    categoryName: "Amazon PPC",
    subCategory: "amazon-campaigns",
    client: "Amazon Brand Partner",
    tag: "PPC · AD MANAGEMENT",
    image: "/assets/service-amazon-ppc.png",
    coverImage: "/assets/service-amazon-ppc.png",
    thumbnail: "/assets/service-amazon-ppc.png",
    metricValue: "$46K/mo",
    metricSub: "at 13.89% ACoS · 1,543 orders",
    result: "Scaled Amazon PPC sales to $46,487.44 in a single month while maintaining a highly efficient 13.89% ACoS through data-driven campaign optimization.",
    description: "Scaled Amazon PPC sales to $46,487.44 in a single month while maintaining a highly efficient 13.89% ACoS through data-driven campaign optimization.",
    problem: "Inefficient ad spend, high ACoS, poor keyword targeting, and inconsistent sales and profitability.",
    solution: "Full PPC campaign overhaul: restructured by separating high-converting keywords, implemented profit-driven bidding strategy, and leveraged peak season opportunities.",
    results: "Scaled Amazon PPC sales to $46,487.44 in a single month while maintaining a highly efficient 13.89% ACoS through data-driven campaign optimization with 1,543 orders.",
    gallery: ["/assets/service-amazon-ppc.png"],
    published: true,
    status: "Published"
  },
  {
    id: "ppc1",
    title: "ACoS: 181% → 49%",
    service: "Amazon Growth",
    categorySlug: "amazon-campaigns",
    categoryName: "Amazon PPC",
    subCategory: "amazon-campaigns",
    tag: "PPC · TURNAROUND",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652330911_olhcf.png",
    coverImage: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652330911_olhcf.png",
    thumbnail: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652330911_olhcf.png",
    client: "Amazon Brand Partner",
    metricValue: "−132%",
    metricSub: "ACoS in 5 months",
    result: "ACoS reduced from 181.43% to 49.07% in 5 months",
    description: "ACoS reduced from 181.43% to 49.07% in 5 months",
    problem: "ACoS of 181.43%, excessive ad spend, poor returns, weak campaign structure, limited organic growth, and inefficient bidding strategies.",
    solution: "Restructured campaigns by separating high-converting, testing, and exploratory keywords. Reallocated budget toward top-performing ads. Improved listings with A+ content.",
    results: "ACoS reduced from 181.43% to 49.07% in 5 months. Total sales increased from $1,075.61 to $8,997.16 with a 12.06% conversion rate.",
    gallery: ["https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652330911_olhcf.png"],
    published: true,
    status: "Published"
  },
  {
    id: "ppc2",
    title: "Scaling to $46K Monthly",
    service: "Amazon Growth",
    categorySlug: "amazon-campaigns",
    categoryName: "Amazon PPC",
    subCategory: "amazon-campaigns",
    tag: "PPC · SCALING",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652094670_ithea.png",
    coverImage: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652094670_ithea.png",
    thumbnail: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652094670_ithea.png",
    client: "Amazon Brand Partner",
    metricValue: "$46K",
    metricSub: "at 13.89% ACoS",
    result: "$46,487.44 in a single month at 13.89% ACoS with 1,543 orders",
    description: "$46,487.44 in a single month at 13.89% ACoS with 1,543 orders",
    problem: "Inefficient ad spend, high ACoS, poor keyword targeting, and inconsistent sales and profitability without a structured strategy.",
    solution: "Restructured campaigns into high-converting and exploratory keyword groups. Implemented a profit-driven bidding strategy and scaled high-ROI placements.",
    results: "Generated $46,487.44 in total sales with 1,543 orders in a single month at a 13.89% ACoS.",
    gallery: ["https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652094670_ithea.png"],
    published: true,
    status: "Published"
  },
  {
    id: "ppc3",
    title: "ACoS: 61% → 31%",
    service: "Amazon Growth",
    categorySlug: "amazon-campaigns",
    categoryName: "Amazon PPC",
    subCategory: "amazon-campaigns",
    tag: "PPC · OPTIMIZATION",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786649459574_5dirz.png",
    coverImage: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786649459574_5dirz.png",
    thumbnail: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786649459574_5dirz.png",
    client: "Amazon Brand Partner",
    metricValue: "−30%",
    metricSub: "ACoS improvement",
    result: "ACoS reduced from 61.72% to 31.98% via multi-ad type strategy: Sponsored Products, Sponsored Brands & Sponsored Display.",
    description: "ACoS reduced from 61.72% to 31.98% via multi-ad type strategy",
    problem: "High Advertising Cost of Sales (ACoS of 61.72%) affecting profitability and ineffective ad targeting across existing campaigns.",
    solution: "Conducted an in-depth audit, added negative keywords to eliminate wasted spend, adjusted bids for high intent, and launched Sponsored Brands & Display ads.",
    results: "ACoS reduced from 61.72% to 31.98%, while overall ad sales increased by +37%.",
    gallery: ["https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786649459574_5dirz.png"],
    published: true,
    status: "Published"
  },
  {
    id: "ppc4",
    title: "$100K+ Sales Period",
    service: "Amazon Growth",
    categorySlug: "amazon-campaigns",
    categoryName: "Amazon PPC",
    subCategory: "amazon-campaigns",
    tag: "PPC · GROWTH",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733750987_hkqvk.png",
    coverImage: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733750987_hkqvk.png",
    thumbnail: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733750987_hkqvk.png",
    client: "Amazon Brand Partner",
    metricValue: "$100K+",
    metricSub: "with 1,621 units",
    result: "$100,471.43 in sales with 1,621 units ordered in selected period (up from $70,333.77)",
    description: "$100,471.43 in sales with 1,621 units ordered in selected period",
    problem: "Client needed to improve Amazon sales performance and overall order volume compared with the previous period.",
    solution: "Focused on sales performance optimization, performance monitoring across date ranges, and bid scaling on top converting search queries.",
    results: "Generated $100,471.43 in ordered product sales with 1,621 units ordered (up from $70,333.77 in the previous year).",
    gallery: ["https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733750987_hkqvk.png"],
    published: true,
    status: "Published"
  },
  {
    id: "ppc_1786733798883_3ynez",
    title: "Sales Growth & Performance Improvement",
    service: "Amazon Growth",
    categorySlug: "amazon-campaigns",
    categoryName: "Amazon PPC",
    subCategory: "amazon-campaigns",
    client: "Amazon Brand Partner",
    tag: "PPC · GROWTH",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733750987_hkqvk.png",
    coverImage: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733750987_hkqvk.png",
    thumbnail: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733750987_hkqvk.png",
    metricValue: "$100,471",
    metricSub: "Revenue Generated",
    result: "Strong Amazon sales growth achieved with 1,621 units ordered and $100,471.43 in sales.",
    description: "Strong Amazon sales growth achieved with 1,621 units ordered and $100,471.43 in sales during the selected period.",
    problem: "The client needed to improve Amazon sales performance and increase overall order volume compared with the previous period.",
    solution: "1. Sales Performance Optimization: Focused on improving overall sales performance and increasing order volume.\n2. Performance Monitoring: Monitored sales and order performance across the selected period to identify growth opportunities.",
    results: "Generated 1,621 units ordered and $100,471.43 in sales (up from $70,333.77).",
    gallery: ["https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733750987_hkqvk.png"],
    published: true,
    status: "Published"
  },
  {
    id: "ppc_1786733422690_arx43",
    title: "Resolving Brand Registry Challenges to Protect Client’s Brand",
    service: "Amazon Growth",
    categorySlug: "amazon-campaigns",
    categoryName: "Amazon PPC",
    subCategory: "amazon-campaigns",
    client: "Amazon Brand Partner",
    tag: "PPC · BRAND",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733357398_hvysk.png",
    coverImage: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733357398_hvysk.png",
    thumbnail: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733357398_hvysk.png",
    metricValue: "Brand Protection",
    metricSub: "Registry Enforcement",
    result: "Successfully resolved Amazon Brand Registry issues and protected client brand.",
    description: "Successfully resolved Amazon Brand Registry issues, strengthened brand protection, and stabilized the client’s Amazon sales performance.",
    problem: "The client faced multiple issues during Amazon Brand Registry enrollment, including trademark verification complications and registration errors.",
    solution: "1. Trademark Assistance: Guided the client through the trademark registration process.\n2. Brand Registry Application Support: Reviewed and corrected the application.",
    results: "Enrolled brand in protection tools to secure listings from hijackers.",
    gallery: ["https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733357398_hvysk.png"],
    published: true,
    status: "Published"
  },
  {
    id: "ppc_1786652444754_sc1et",
    title: "Reducing ACoS from 181.43% to 49.07% in 5 Months",
    service: "Amazon Growth",
    categorySlug: "amazon-campaigns",
    categoryName: "Amazon PPC",
    subCategory: "amazon-campaigns",
    client: "HealthCare Brand",
    tag: "PPC · ACoS",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652330911_olhcf.png",
    coverImage: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652330911_olhcf.png",
    thumbnail: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652330911_olhcf.png",
    metricValue: "-132%",
    metricSub: "ACoS Reduction",
    result: "Reduced Amazon PPC ACoS from 181.43% down to 49.07% in 5 months.",
    description: "Reduced Amazon PPC ACoS from 181.43% to 49.07% in five months while increasing total sales through campaign optimization.",
    problem: "Struggling with an extremely high ACoS of 181.43%, excessive ad spend, poor returns, weak campaign structure, and inefficient bidding.",
    solution: "1. PPC Campaign Optimization: Restructured campaigns by separating high-converting keywords.\n2. ACoS Reduction & Budget Optimization: Reduced spend on unprofitable campaigns.",
    results: "ACoS reduced from 181.43% to 49.07% in 5 months. Total sales increased from $1,075.61 to $8,997.16.",
    gallery: ["https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652330911_olhcf.png"],
    published: true,
    status: "Published"
  },
  {
    id: "ppc_1786652094670_ithea",
    title: "Scaling to $46,487.44 in Sales with Just 13.89% ACoS",
    service: "Amazon Growth",
    categorySlug: "amazon-campaigns",
    categoryName: "Amazon PPC",
    subCategory: "amazon-campaigns",
    client: "Amazon Brand Partner",
    tag: "PPC · SCALING",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652094670_ithea.png",
    coverImage: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652094670_ithea.png",
    thumbnail: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652094670_ithea.png",
    metricValue: "$46,487.44",
    metricSub: "at 13.89% ACoS",
    result: "Scaled Amazon PPC sales to $46,487.44 in a single month at a 13.89% ACoS.",
    description: "Scaled Amazon PPC sales to $46,487.44 in a single month while maintaining a highly efficient 13.89% ACoS.",
    problem: "Inefficient ad spend, high ACoS, poor keyword targeting, and inconsistent sales and profitability.",
    solution: "1. PPC Campaign Overhaul: Restructured campaigns.\n2. ACoS Optimization & Budget Allocation: Implemented profit-driven bidding.",
    results: "Generated $46,487.44 in total sales with 1,543 orders in a single month at a 13.89% ACoS.",
    gallery: ["https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652094670_ithea.png"],
    published: true,
    status: "Published"
  },
  {
    id: "ppc_1786651651169_wxhsl",
    title: "New Single SKU Product Launch with Rapid Growth in Under 2 Months",
    service: "Amazon Growth",
    categorySlug: "amazon-campaigns",
    categoryName: "Amazon PPC",
    subCategory: "amazon-campaigns",
    client: "Amazon Brand Partner",
    tag: "PPC · LAUNCH",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786651474009_a2hyn.png",
    coverImage: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786651474009_a2hyn.png",
    thumbnail: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786651474009_a2hyn.png",
    metricValue: "$6,199.24",
    metricSub: "Launch Revenue",
    result: "Achieved $6,199.24 in sales within the first two months of product launch.",
    description: "Launched a new single-SKU Amazon product and achieved rapid sales growth within two months.",
    problem: "The client wanted to launch a completely new Amazon product under a single SKU and generate sales traction quickly.",
    solution: "Market research, high-converting listing optimization, and cost-efficient PPC strategy.",
    results: "Achieved $6,199.24 in sales within the first two months of product launch.",
    gallery: ["https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786651474009_a2hyn.png"],
    published: true,
    status: "Published"
  },
  {
    id: "ppc_1786650676902_n8xvx",
    title: "Successful Launch & Scaling of a New Brand on a Limited Budget",
    service: "Amazon Growth",
    categorySlug: "amazon-campaigns",
    categoryName: "Amazon PPC",
    subCategory: "amazon-campaigns",
    client: "Amazon Brand Partner",
    tag: "PPC · BRAND",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786650626010_g3kei.png",
    coverImage: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786650626010_g3kei.png",
    thumbnail: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786650626010_g3kei.png",
    metricValue: "£54,733.43",
    metricSub: "2,632 Orders",
    result: "Ranked product on page 1, achieving £54,733.43 in sales across 2,632 orders.",
    description: "Launched and scaled a new Amazon brand on a limited budget through strategic product selection and PPC optimization.",
    problem: "The client wanted to launch a new Amazon brand with a limited budget while achieving strong sales.",
    solution: "Market research, strategic launch & PPC, and organic rank optimization.",
    results: "Ranked product on page 1, achieving £54,733.43 in sales across 2,632 orders.",
    gallery: ["https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786650626010_g3kei.png"],
    published: true,
    status: "Published"
  },

  // --- VIDEO CONTENT PROJECTS ---
  {
    id: "v1",
    title: "Anker Soundcore Product Commercial",
    service: "Video & Motion Design",
    categorySlug: "video-motion-design",
    categoryName: "Video & Motion Design",
    subCategory: "video-motion-design",
    tag: "AMAZON VIDEO",
    thumbnail: "/assets/portfolio-video-v4.jpg",
    image: "/assets/portfolio-video-v4.jpg",
    coverImage: "/assets/portfolio-video-v4.jpg",
    client: "Anker Soundcore",
    description: "High-energy Amazon video ad featuring active noise cancellation demo and ergonomic design highlights.",
    duration: "0:45",
    result: "+28% CTR on sponsored ads",
    metricValue: "+28%",
    metricSub: "CTR lift",
    problem: "Static images were failing to communicate active noise cancellation features and audio quality.",
    solution: "Produced a dynamic 45-second Amazon product video ad with 3D callouts and noise cancellation motion visualizer.",
    results: "+28% CTR lift on sponsored video ads and +35% conversion increase on product page.",
    gallery: ["/assets/portfolio-video-v4.jpg"],
    published: true,
    status: "Published"
  },
  {
    id: "v2",
    title: "Derixio Corporate Brand Story",
    service: "Video & Motion Design",
    categorySlug: "video-motion-design",
    categoryName: "Video & Motion Design",
    subCategory: "video-motion-design",
    tag: "CORPORATE FILM",
    thumbnail: "/assets/real-video.jpg",
    image: "/assets/real-video.jpg",
    coverImage: "/assets/real-video.jpg",
    client: "Derixio",
    description: "Behind-the-scenes brand documentary showcasing our team, creative process, and agency ethos.",
    duration: "1:30",
    result: "3× engagement vs static ads",
    metricValue: "3×",
    metricSub: "engagement uplift",
    problem: "Target clients needed an authentic look into the team culture and end-to-end creative workflow.",
    solution: "Filmed an cinematic 90-second brand documentary highlighting agency capabilities and partner success stories.",
    results: "3× higher engagement vs static ad creatives and 45% increase in inbound enterprise inquiries.",
    gallery: ["/assets/real-video.jpg"],
    published: true,
    status: "Published"
  },
  {
    id: "v3",
    title: "3D Kinetic Motion Graphics",
    service: "Video & Motion Design",
    categorySlug: "video-motion-design",
    categoryName: "Video & Motion Design",
    subCategory: "video-motion-design",
    tag: "MOTION GRAPHICS",
    thumbnail: "/assets/showcase-video-motion.png",
    image: "/assets/showcase-video-motion.png",
    coverImage: "/assets/showcase-video-motion.png",
    client: "Tech Platform",
    description: "Sleek 3D particle motion graphics reveal for next-gen digital platforms and product launches.",
    duration: "0:30",
    result: "2.1× brand recall improvement",
    metricValue: "2.1×",
    metricSub: "brand recall",
    problem: "Abstract tech concepts were hard to explain to potential investors and customer segments.",
    solution: "Created high-end 3D particle motion graphics animation detailing key system architecture.",
    results: "2.1× brand recall improvement and award-winning campaign reception.",
    gallery: ["/assets/showcase-video-motion.png"],
    published: true,
    status: "Published"
  },
  {
    id: "v4",
    title: "Velox Smart Earbuds Explainer",
    service: "Video & Motion Design",
    categorySlug: "video-motion-design",
    categoryName: "Video & Motion Design",
    subCategory: "video-motion-design",
    tag: "3D ANIMATION",
    thumbnail: "/assets/user-video-motion.png",
    image: "/assets/user-video-motion.png",
    coverImage: "/assets/user-video-motion.png",
    client: "Velox Gear",
    description: "Photorealistic 3D explode render revealing internal acoustic engineering and IPX7 waterproofing.",
    duration: "1:00",
    result: "−34% support ticket volume",
    metricValue: "−34%",
    metricSub: "support tickets",
    problem: "Customers frequently submitted support tickets asking about earbud waterproofing and touch controls.",
    solution: "Designed 3D exploded view engineering video explaining water seals and touch control gestures.",
    results: "34% reduction in customer support ticket volume and positive user feedback.",
    gallery: ["/assets/user-video-motion.png"],
    published: true,
    status: "Published"
  },

  // --- WEB DEVELOPMENT PROJECTS ---
  {
    id: "wd1",
    title: "Shopify Fashion Storefront",
    service: "Web Development",
    categorySlug: "web-development",
    categoryName: "Web Development",
    subCategory: "web-development",
    tag: "WEB DEV · SHOPIFY",
    image: "/assets/webdev-shopify.png",
    coverImage: "/assets/webdev-shopify.png",
    thumbnail: "/assets/webdev-shopify.png",
    client: "Fashion & Lifestyle Brand",
    metricValue: "+55%",
    metricSub: "checkout completion",
    result: "+55% checkout completion rate after full Shopify UX redesign and conversion optimisation",
    description: "+55% checkout completion rate after full Shopify UX redesign and conversion optimisation",
    problem: "High cart abandonment rate and poor mobile checkout experience were costing the brand significant revenue.",
    solution: "Full Shopify theme redesign with streamlined one-page checkout, mobile-first product pages, and trust-signal optimisation.",
    results: "+55% checkout completion rate after full Shopify UX redesign.",
    gallery: ["/assets/webdev-shopify.png"],
    published: true,
    status: "Published"
  },
  {
    id: "wd2",
    title: "Next.js SaaS Dashboard",
    service: "Web Development",
    categorySlug: "web-development",
    categoryName: "Web Development",
    subCategory: "web-development",
    tag: "WEB DEV · NEXT.JS",
    image: "/assets/webdev-nextjs.png",
    coverImage: "/assets/webdev-nextjs.png",
    thumbnail: "/assets/webdev-nextjs.png",
    client: "SaaS Platform",
    metricValue: "3.8×",
    metricSub: "signup conversion lift",
    result: "3.8× organic signup conversion rate after Next.js portal rebuild with server-side rendering",
    description: "3.8× organic signup conversion rate after Next.js portal rebuild with server-side rendering",
    problem: "Slow page loads and poor SEO were hurting organic acquisition for the SaaS platform.",
    solution: "Rebuilt the marketing site and dashboard in Next.js 14 with App Router, ISR, and optimised Core Web Vitals.",
    results: "3.8× organic signup conversion rate lift after Next.js portal rebuild.",
    gallery: ["/assets/webdev-nextjs.png"],
    published: true,
    status: "Published"
  },
  {
    id: "wd3",
    title: "WooCommerce Brand Store",
    service: "Web Development",
    categorySlug: "web-development",
    categoryName: "Web Development",
    subCategory: "web-development",
    tag: "WEB DEV · WORDPRESS",
    image: "/assets/webdev-wordpress.png",
    coverImage: "/assets/webdev-wordpress.png",
    thumbnail: "/assets/webdev-wordpress.png",
    client: "Consumer Brand",
    metricValue: "−48%",
    metricSub: "bounce rate",
    result: "−48% bounce rate after WordPress WooCommerce redesign and performance optimisation",
    description: "−48% bounce rate after WordPress WooCommerce redesign and performance optimisation",
    problem: "Outdated WordPress theme with poor UX was driving visitors away before they reached the product pages.",
    solution: "Custom WooCommerce theme built on Elementor Pro with optimised images, lazy loading, and a redesigned shop flow.",
    results: "−48% bounce rate after WordPress WooCommerce redesign.",
    gallery: ["/assets/webdev-wordpress.png"],
    published: true,
    status: "Published"
  },

  // --- GRAPHIC DESIGN PROJECTS ---
  {
    id: "g1",
    title: "Velox Gear Brand Identity & Packaging",
    service: "Graphic Design",
    categorySlug: "logo-branding",
    categoryName: "Logo & Brand Identity",
    subCategory: "logo-branding",
    tag: "GRAPHIC · BRANDING",
    image: "/assets/portfolio-graphic-v4.jpg",
    coverImage: "/assets/portfolio-graphic-v4.jpg",
    thumbnail: "/assets/portfolio-graphic-v4.jpg",
    client: "Velox Gear",
    metricValue: "240%",
    metricSub: "retail distribution growth",
    result: "Full brand identity system, vector logo suite, and luxury box packaging drove +240% retail distribution growth",
    description: "Full brand identity system, vector logo suite, and luxury box packaging drove +240% retail distribution growth",
    problem: "Outdated visual identity and inconsistent packaging led to low retail buyer interest.",
    solution: "Designed cohesive brand style guide, logo marks, typography scale, color palette, and custom packaging.",
    results: "+240% retail distribution growth following packaging redesign.",
    gallery: ["/assets/portfolio-graphic-v4.jpg"],
    published: true,
    status: "Published"
  },
  {
    id: "g2",
    title: "AURA Wellness UI/UX Redesign",
    service: "Graphic Design",
    categorySlug: "ui-ux-design",
    categoryName: "UI/UX Design",
    subCategory: "ui-ux-design",
    tag: "GRAPHIC · UI/UX",
    image: "/assets/portfolio/p (1).jpg",
    coverImage: "/assets/portfolio/p (1).jpg",
    thumbnail: "/assets/portfolio/p (1).jpg",
    client: "AURA Wellness",
    metricValue: "-48%",
    metricSub: "bounce rate cut",
    result: "Clean UI/UX interface redesign reduced bounce rate by 48% and improved mobile engagement",
    description: "Clean UI/UX interface redesign reduced bounce rate by 48% and improved mobile engagement",
    problem: "Outdated UI/UX resulting in high drop-off rates on mobile devices.",
    solution: "Redesigned modern responsive UI layout with streamlined navigation and micro-interactions.",
    results: "48% reduction in bounce rate and significant improvement in user retention.",
    gallery: ["/assets/portfolio/p (1).jpg"],
    published: true,
    status: "Published"
  },
  {
    id: "g3",
    title: "Organic Skincare Packaging & Label Suite",
    service: "Graphic Design",
    categorySlug: "packaging-print-design",
    categoryName: "Packaging & Print Design",
    subCategory: "packaging-print-design",
    tag: "GRAPHIC · PACKAGING",
    image: "/assets/portfolio-amazon-v4.jpg",
    coverImage: "/assets/portfolio-amazon-v4.jpg",
    thumbnail: "/assets/portfolio-amazon-v4.jpg",
    client: "Pure Botanical",
    metricValue: "+180%",
    metricSub: "shelf appeal lift",
    result: "Eco-friendly luxury print packaging suite elevated premium retail positioning",
    description: "Eco-friendly luxury print packaging suite elevated premium retail positioning",
    problem: "Competitor packaging had stronger visual impact on physical and digital retail shelves.",
    solution: "Crafted minimal eco-friendly luxury packaging designs with metallic foil accents.",
    results: "+180% shelf appeal lift and increase in premium retail store placements.",
    gallery: ["/assets/portfolio-amazon-v4.jpg"],
    published: true,
    status: "Published"
  },

  // --- A+ CONTENT & BRAND STORE PROJECTS ---
  {
    id: "ap6",
    title: "Kitchen Craft Luxury Kettle Storefront",
    service: "Amazon Growth",
    categorySlug: "a-plus-content",
    categoryName: "A+ Content & Brand Store",
    subCategory: "amazon-brand-store",
    tag: "A+ · BRAND STORE",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786641376894_4bey6.jpg",
    coverImage: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786641376894_4bey6.jpg",
    thumbnail: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786641376894_4bey6.jpg",
    client: "Kitchen Craft",
    metricValue: "3.1×",
    metricSub: "brand store visits",
    result: "Custom Amazon Storefront drove 3.1× brand store visits and elevated premium perception",
    description: "Custom Amazon Storefront drove 3.1× brand store visits and elevated premium perception",
    problem: "Generic storefront layout resulted in low multi-product cross-selling.",
    solution: "Custom multi-page Amazon Brand Store with lifestyle hero videos, category tabs, and high-converting product showcases.",
    results: "3.1× increase in brand store visits and higher multi-item cart conversion.",
    gallery: ["https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786641376894_4bey6.jpg"],
    published: true,
    status: "Published"
  },
  {
    id: "nova_shampoo",
    title: "Nova Shampoo · listing redesign",
    service: "Amazon Growth",
    categorySlug: "amazon-listing-images",
    categoryName: "Amazon Listing Images",
    subCategory: "amazon-listing-images",
    tag: "LISTING REDESIGN",
    image: "/assets/portfolio/nova_after_designed.jpg",
    coverImage: "/assets/portfolio/nova_after_designed.jpg",
    thumbnail: "/assets/portfolio/nova_after_designed.jpg",
    client: "Nova Care",
    metricValue: "CTR +64%",
    metricSub: "Click-Through Rate Lift",
    result: "Complete product main image & listing image redesign increased CTR by +64%",
    description: "Complete product main image & listing image redesign increased CTR by +64%",
    problem: "Plain white bottle main image was getting lost among competitor listings with zero visual differentiation.",
    solution: "Redesigned main image with luxury lighting, ingredient callouts, and benefit-focused infographic modules.",
    results: "+64% CTR lift on Amazon search results and significant organic rank improvement.",
    gallery: [
      "/assets/portfolio/nova_before_plain.jpeg",
      "/assets/portfolio/nova_after_designed.jpg"
    ],
    published: true,
    status: "Published"
  }
];

/**
 * Get all projects - SUPABASE DATABASE IS PRIMARY AUTHORITATIVE SOURCE WITH STATIC FALLBACK MERGE
 */
export async function getProjects() {
  const { url, key } = getSupabaseCredentials();
  let dbProjects = [];

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
          dbProjects = fetched.map(p => {
            let mediaItems = p.mediaItems;
            if (typeof mediaItems === 'string') {
              try { mediaItems = JSON.parse(mediaItems); } catch (e) { mediaItems = []; }
            }
            let gallery = p.gallery;
            if (typeof gallery === 'string') {
              try { gallery = JSON.parse(gallery); } catch (e) { gallery = []; }
            }

            const itemsMap = new Map();
            if (Array.isArray(mediaItems)) {
              mediaItems.forEach((m, idx) => {
                const url = typeof m === 'string' ? m : (m?.url || '');
                if (url) {
                  itemsMap.set(url, {
                    id: m.id || `m_${idx}`,
                    url: url,
                    mediaType: m.mediaType || (url.match(/\.(mp4|webm|mov|m4v)$/i) ? 'video' : 'image'),
                    videoUrl: m.videoUrl || '',
                    videoFile: m.videoFile || '',
                    isCover: Boolean(m.isCover || idx === 0),
                    displayOrder: typeof m.displayOrder === 'number' ? m.displayOrder : idx
                  });
                }
              });
            }

            if (Array.isArray(gallery)) {
              gallery.forEach((g, idx) => {
                const url = typeof g === 'string' ? g : (g?.url || '');
                if (url && !itemsMap.has(url)) {
                  itemsMap.set(url, {
                    id: `g_${idx}`,
                    url: url,
                    mediaType: url.match(/\.(mp4|webm|mov|m4v)$/i) ? 'video' : 'image',
                    isCover: itemsMap.size === 0 && idx === 0,
                    displayOrder: itemsMap.size
                  });
                }
              });
            }

            const resolvedMediaItems = Array.from(itemsMap.values());
            if (resolvedMediaItems.length > 0 && !resolvedMediaItems.some(m => m.isCover)) {
              resolvedMediaItems[0].isCover = true;
            }

            const resolvedGallery = resolvedMediaItems.map(m => m.url).filter(Boolean);

            return {
              ...p,
              mediaItems: resolvedMediaItems,
              gallery: resolvedGallery,
              coverImage: p.coverImage || p.image || (resolvedMediaItems[0]?.url) || '/assets/portfolio-web-v4.jpg',
              image: p.image || p.coverImage || (resolvedMediaItems[0]?.url) || '/assets/portfolio-web-v4.jpg'
            };
          });
          memoryProjects = dbProjects;
          updateLocalFileCache(dbProjects);
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

  // 1. Add static fallback projects
  STATIC_PORTFOLIO_PROJECTS.forEach(proj => {
    if (proj && proj.id) {
      mergedMap.set(proj.id, proj);
    }
  });

  // 2. Add / merge dynamic projects from memory, file storage, and Supabase DB
  [...STATIC_PORTFOLIO_PROJECTS, ...memoryProjects, ...fileProjects, ...dbProjects].forEach(proj => {
    if (proj && proj.id) {
      const existing = mergedMap.get(proj.id) || {};
      mergedMap.set(proj.id, {
        ...existing,
        ...proj
      });
    }
  });

  return Array.from(mergedMap.values())
    .filter(p => !p.deleted && (p.status || '').toUpperCase() !== 'DELETED')
    .sort(
      (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0) || new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
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
 * Create or save a project - DIRECT PERSISTENCE TO SUPABASE DATABASE (UNLIMITED GALLERY IMAGES)
 */
export async function saveProject(rawProjectData) {
  const isUpdate = Boolean(rawProjectData.id);
  const now = new Date().toISOString();

  // Multi-media gallery processing with ZERO limits or caps
  let rawMediaItems = Array.isArray(rawProjectData.mediaItems) ? rawProjectData.mediaItems : [];
  if (typeof rawMediaItems === 'string') {
    try { rawMediaItems = JSON.parse(rawMediaItems); } catch { rawMediaItems = []; }
  }

  let rawGallery = rawProjectData.gallery;
  if (typeof rawGallery === 'string') {
    try { rawGallery = JSON.parse(rawGallery); } catch { rawGallery = []; }
  }

  const itemsMap = new Map();
  if (Array.isArray(rawMediaItems)) {
    rawMediaItems.forEach((m, idx) => {
      const url = typeof m === 'string' ? m : (m?.url || '');
      if (url) {
        itemsMap.set(url, {
          id: m.id || `media_${Date.now()}_${idx}`,
          url: url,
          mediaType: m.mediaType || (url.match(/\.(mp4|webm|mov|m4v)$/i) ? 'video' : 'image'),
          videoUrl: m.videoUrl || '',
          videoFile: m.videoFile || '',
          isCover: Boolean(m.isCover || idx === 0),
          displayOrder: typeof m.displayOrder === 'number' ? m.displayOrder : idx
        });
      }
    });
  }

  if (Array.isArray(rawGallery)) {
    rawGallery.forEach((g, idx) => {
      const url = typeof g === 'string' ? g : (g?.url || '');
      if (url && !itemsMap.has(url)) {
        itemsMap.set(url, {
          id: `media_${Date.now()}_g_${idx}`,
          url: url,
          mediaType: url.match(/\.(mp4|webm|mov|m4v)$/i) ? 'video' : 'image',
          isCover: itemsMap.size === 0 && idx === 0,
          displayOrder: itemsMap.size
        });
      }
    });
  }

  if (itemsMap.size === 0 && rawProjectData.image) {
    itemsMap.set(rawProjectData.image, {
      id: `media_${Date.now()}_0`,
      url: rawProjectData.image,
      mediaType: rawProjectData.mediaType || 'image',
      isCover: true,
      displayOrder: 0
    });
  }

  const finalMediaItems = Array.from(itemsMap.values());
  if (finalMediaItems.length > 0 && !finalMediaItems.some(m => m.isCover)) {
    finalMediaItems[0].isCover = true;
  }

  const coverItem = finalMediaItems.find(m => m.isCover) || finalMediaItems[0] || {};
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
    mediaItems: finalMediaItems,
    mediaCount: finalMediaItems.length || 1,
    gallery: finalMediaItems.map(m => m.url).filter(Boolean),
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
    // 1. Delete DB record from Supabase table
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

    // 2. Save a deletion tombstone to Supabase DB to permanently suppress static/cached items
    const tombstone = {
      id: id,
      title: 'DELETED',
      service: 'DELETED',
      categorySlug: 'DELETED',
      categoryName: 'DELETED',
      subCategory: 'DELETED',
      status: 'DELETED',
      published: false,
      deleted: true,
      updatedAt: new Date().toISOString()
    };

    try {
      const tombstoneEndpoint = `${url}/rest/v1/portfolio_projects`;
      await fetch(tombstoneEndpoint, {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates,return=minimal'
        },
        body: JSON.stringify(tombstone)
      });
    } catch (tombErr) {
      console.warn('Notice: Could not write deletion tombstone to Supabase DB:', tombErr);
    }

    // 3. Cleanup associated media files hosted in Supabase Storage 'portfolio' bucket
    if (targetProject) {
      const urlsToClean = [
        targetProject.image,
        targetProject.coverImage,
        targetProject.thumbnail,
        ...(Array.isArray(targetProject.mediaItems) ? targetProject.mediaItems.map(m => (typeof m === 'string' ? m : m.url)) : []),
        ...(Array.isArray(targetProject.gallery) ? targetProject.gallery.map(g => (typeof g === 'string' ? g : g.url)) : [])
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

  // 4. Update memory Projects and local file cache with deletion state
  const deletedTombstone = {
    id: id,
    title: 'DELETED',
    status: 'DELETED',
    published: false,
    deleted: true
  };

  memoryProjects = memoryProjects.map(p => p.id === id ? deletedTombstone : p).filter(p => p.id !== id);
  memoryProjects.push(deletedTombstone);

  const filePath = getProjectsStoragePath();
  let localProjects = [];
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      localProjects = JSON.parse(data);
    }
  } catch (e) {}

  const updatedLocal = localProjects.map(p => p.id === id ? deletedTombstone : p).filter(p => p.id !== id);
  updatedLocal.push(deletedTombstone);
  updateLocalFileCache(updatedLocal);

  return true;
}
