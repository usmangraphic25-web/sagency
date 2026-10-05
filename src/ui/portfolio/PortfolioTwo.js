"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, ArrowUpRight } from "lucide-react";
import { getValidImageUrl } from "@/lib/portfolioUtils";

// Main category filter options
const MAIN_CATEGORIES = [
  { id: "all", label: "All Work" },
  { id: "amazon-growth", label: "Amazon Growth" },
  { id: "web-development", label: "Web Development" },
  { id: "graphic-designing", label: "Graphic Design" },
  { id: "seo", label: "SEO" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "video-editing", label: "Video Editing" },
];

// Sub-categories map (Only for Amazon Growth, Graphic Design, Video Editing)
// Web Development, SEO, and Digital Marketing are flat with NO sub-filters.
const SUB_CATEGORIES_MAP = {
  "amazon-growth": [
    { id: "all-amazon-growth", label: "All Amazon" },
    { id: "amazon-listing-images", label: "Amazon Listing Images" },
    { id: "a-plus-content", label: "A+ Content" },
    { id: "amazon-brand-store", label: "Amazon Brand Store" },
    { id: "amazon-ppc", label: "Amazon PPC" },
  ],
  "graphic-designing": [
    { id: "all-graphic-designing", label: "All Graphic Design" },
    { id: "3d-product-design-mockups", label: "3D Product Design & Mockups" },
    { id: "shopify-store-web-graphics", label: "Shopify Store & Web Graphics" },
    { id: "logo-brand-identity", label: "Logo & Brand Identity" },
    { id: "social-media-ad-creatives", label: "Social Media & Ad Creatives" },
    { id: "packaging-print-design", label: "Packaging & Print Design" },
    { id: "ui-ux-design", label: "UI/UX Design" },
  ],
  "video-editing": [
    { id: "all-video-editing", label: "All Video Editing" },
    { id: "social-media-video-editing", label: "Social Media Video Editing" },
    { id: "ad-creative-videos", label: "Ad Creative Videos" },
    { id: "motion-graphics", label: "Motion Graphics" },
    { id: "brand-promotional-videos", label: "Brand & Promotional Videos" },
    { id: "amazon-video-editing", label: "Amazon Video Editing" },
  ],
};

// ─── DB field → component shape mapper ───────────────────────────────────────
function mapDbProjectToItem(p, index) {
  // Resolve the main category slug from whatever the DB stored
  const service = (p.service || "").toLowerCase();
  let categorySlug = p.categorySlug || p.subCategory || "graphic-designing";

  // Normalise service → main category slug used by the filter tabs
  if (service.includes("amazon") || categorySlug.startsWith("amazon") || categorySlug === "a-plus-content" || categorySlug === "amazon-brand-store") {
    categorySlug = "amazon-growth";
  } else if (service.includes("web") || categorySlug === "web-development") {
    categorySlug = "web-development";
  } else if (service.includes("seo") || categorySlug === "seo") {
    categorySlug = "seo";
  } else if (service.includes("digital marketing") || categorySlug === "digital-marketing") {
    categorySlug = "digital-marketing";
  } else if (service.includes("video") || service.includes("motion") || categorySlug === "video-editing" || categorySlug === "video-motion-design") {
    categorySlug = "video-editing";
  } else if (service.includes("graphic") || categorySlug.startsWith("graphic") || categorySlug === "logo-brand-identity" || categorySlug === "logo-branding" || categorySlug === "ui-ux-design" || categorySlug === "packaging-print-design" || categorySlug === "social-media-ad-creatives" || categorySlug === "3d-product-design-mockups" || categorySlug === "shopify-store-web-graphics") {
    categorySlug = "graphic-designing";
  }

  // Resolve sub-category slug (the original DB value is the sub-filter id)
  const rawSub = (p.subCategory || p.categorySlug || "").toLowerCase().trim();
  let subCategorySlug = rawSub === "logo-branding" ? "logo-brand-identity" : rawSub;

  // Build a human-readable category label for the card badge
  const SUB_LABEL_MAP = {
    "amazon-listing-images": "AMAZON · LISTING IMAGES",
    "a-plus-content": "AMAZON · A+ CONTENT",
    "amazon-brand-store": "AMAZON · BRAND STORE",
    "amazon-ppc": "AMAZON · AMAZON PPC",
    "3d-product-design-mockups": "GRAPHIC · 3D MOCKUPS",
    "shopify-store-web-graphics": "GRAPHIC · SHOPIFY",
    "logo-brand-identity": "GRAPHIC · LOGO & BRANDING",
    "logo-branding": "GRAPHIC · LOGO & BRANDING",
    "social-media-ad-creatives": "GRAPHIC · SOCIAL MEDIA",
    "packaging-print-design": "GRAPHIC · PACKAGING",
    "ui-ux-design": "GRAPHIC · UI/UX",
    "social-media-video-editing": "VIDEO · SOCIAL MEDIA",
    "ad-creative-videos": "VIDEO · AD CREATIVES",
    "motion-graphics": "VIDEO · MOTION GRAPHICS",
    "brand-promotional-videos": "VIDEO · BRAND PROMO",
    "amazon-video-editing": "VIDEO · AMAZON",
    "web-development": "WEB DEVELOPMENT",
    "seo": "SEO",
    "digital-marketing": "DIGITAL MARKETING",
  };
  const categoryLabel = SUB_LABEL_MAP[rawSub] ||
    (categorySlug === "amazon-growth" ? "AMAZON GROWTH" :
      categorySlug === "web-development" ? "WEB DEVELOPMENT" :
        categorySlug === "graphic-designing" ? "GRAPHIC DESIGN" :
          categorySlug === "seo" ? "SEO" :
            categorySlug === "digital-marketing" ? "DIGITAL MARKETING" :
              categorySlug === "video-editing" ? "VIDEO EDITING" : (p.service || "PORTFOLIO").toUpperCase());

  // Resolve gallery (DB stores mediaItems as array of {url} objects or gallery as string[])
  const mediaItems = Array.isArray(p.mediaItems) ? p.mediaItems : [];
  const gallery = mediaItems.length > 0
    ? mediaItems.map(m => m.url).filter(Boolean)
    : (Array.isArray(p.gallery) ? p.gallery.filter(Boolean) : []);

  const coverImage = getValidImageUrl(p, "/assets/portfolio-web-v4.jpg");

  return {
    id: p.id,
    frame: `F${String(index + 1).padStart(2, "0")} / ${categorySlug === "amazon-growth" ? "AMZ" : categorySlug === "web-development" ? "WEB" : categorySlug === "graphic-designing" ? "GFX" : categorySlug === "seo" ? "SEO" : categorySlug === "digital-marketing" ? "MKT" : "VID"}`,
    title: p.title,
    categorySlug,
    subCategorySlug,
    categoryLabel,
    image: coverImage,
    client: p.client || p.brandName || "",
    description: p.description || "",
    problem: p.problem || p.caseStudyData || "",
    solution: p.solution || "",
    gallery,
    // PPC overlay extras
    cardBadge: p.metricSub ? (p.tag || null) : null,
    cardStat: p.metricValue || null,
  };
}

// Fallback items shown if the API call fails
const FALLBACK_ITEMS = [
  // --- REAL AMAZON PPC PROJECTS WITH PROBLEM & SOLUTION ---
  {
    id: "ppc_1786733798883_3ynez",
    frame: "F08 / PPC",
    title: "Sales Growth & Performance Improvement",
    categorySlug: "amazon-growth",
    subCategorySlug: "amazon-ppc",
    categoryLabel: "AMAZON · AMAZON PPC",
    cardBadge: "PPC · GROWTH",
    cardStat: "$100,471",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733750987_hkqvk.png",
    client: "Amazon Brand Partner",
    description: "Strong Amazon sales growth achieved with 1,621 units ordered and $100,471.43 in sales during the selected period.",
    problem: "The client needed to improve Amazon sales performance and increase overall order volume compared with the previous period.",
    solution: "1. Sales Performance Optimization: Focused on improving overall sales performance and increasing order volume.\n2. Performance Monitoring: Monitored sales and order performance across the selected period to identify growth opportunities.\n3. Growth Comparison: Compared current performance against the same date range from the previous year to measure sales and unit growth.\n4. Results: Generated 1,621 units ordered and $100,471.43 in sales (up from $70,333.77).",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733750987_hkqvk.png",
      "/assets/real-amazon-ppc-final.jpg",
      "/assets/showcase-amazon-ppc.png"
    ]
  },
  {
    id: "ppc_1786733422690_arx43",
    frame: "F09 / PPC",
    title: "Resolving Brand Registry Challenges to Protect Client’s Brand",
    categorySlug: "amazon-growth",
    subCategorySlug: "amazon-ppc",
    categoryLabel: "AMAZON · AMAZON PPC",
    cardBadge: "PPC · BRAND",
    cardStat: "Brand",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733357398_hvysk.png",
    client: "Amazon Brand Partner",
    description: "Successfully resolved Amazon Brand Registry issues, strengthened brand protection, and stabilized the client’s Amazon sales performance.",
    problem: "The client faced multiple issues during Amazon Brand Registry enrollment, including trademark verification complications, application delays, and registration errors. Without Brand Registry protection, the brand was vulnerable to unauthorized sellers and listing hijackers.",
    solution: "1. Trademark Assistance: Guided the client through the trademark registration process.\n2. Brand Registry Application Support: Reviewed and corrected the application to match Amazon’s guidelines.\n3. Registration Error Resolution: Corrected document inconsistencies causing rejections.\n4. Brand Protection Setup: Enrolled brand in protection tools to secure listings from hijackers.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733357398_hvysk.png",
      "/assets/user-amazon-ppc.png"
    ]
  },
  {
    id: "ppc_1786652444754_sc1et",
    frame: "F10 / PPC",
    title: "Reducing ACoS from 181.43% to 49.07% in 5 Months",
    categorySlug: "amazon-growth",
    subCategorySlug: "amazon-ppc",
    categoryLabel: "AMAZON · AMAZON PPC",
    cardBadge: "PPC · ACoS",
    cardStat: "-132%",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652330911_olhcf.png",
    client: "Amazon Brand Partner",
    description: "Reduced Amazon PPC ACoS from 181.43% to 49.07% in five months while increasing total sales through campaign optimization, budget control, and organic growth strategies.",
    problem: "The brand was struggling with an extremely high ACoS of 181.43%, excessive ad spend, poor returns, weak campaign structure, limited organic growth, and inefficient bidding strategies.",
    solution: "1. PPC Campaign Optimization: Restructured campaigns by separating high-converting, testing, and exploratory keywords.\n2. ACoS Reduction & Budget Optimization: Reduced spend on unprofitable campaigns and reallocated budget toward top-performing ads.\n3. Organic Growth & Listing Enhancements: Improved product listings with high-quality images and A+ content.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652330911_olhcf.png",
      "/assets/service-amazon-ppc.png"
    ]
  },
  {
    id: "ppc_1786652151169_7pzz3",
    frame: "F11 / PPC",
    title: "Scaling to $46,487.44 in Sales with Just 13.89% ACoS",
    categorySlug: "amazon-growth",
    subCategorySlug: "amazon-ppc",
    categoryLabel: "AMAZON · AMAZON PPC",
    cardBadge: "PPC · SCALING",
    cardStat: "$46,487.44",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652094670_ithea.png",
    client: "Amazon Brand Partner",
    description: "Scaled Amazon PPC sales to $46,487.44 in a single month while maintaining a highly efficient 13.89% ACoS through data-driven campaign optimization.",
    problem: "The brand was struggling with inefficient ad spend, high ACoS, poor keyword targeting, and inconsistent sales and profitability.",
    solution: "1. PPC Campaign Overhaul: Restructured campaigns by separating high-converting keywords.\n2. ACoS Optimization & Budget Allocation: Implemented a profit-driven bidding strategy.\n3. Strategic Sales Scaling: Leveraged peak season opportunities to generate $46,487.44 in sales with 1,543 orders.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652094670_ithea.png",
      "/assets/hero-amazon.png"
    ]
  },
  {
    id: "ppc_1786651651169_wxhsl",
    frame: "F12 / PPC",
    title: "New Single SKU Product Launch with Rapid Growth in Under 2 Months",
    categorySlug: "amazon-growth",
    subCategorySlug: "amazon-ppc",
    categoryLabel: "AMAZON · AMAZON PPC",
    cardBadge: "PPC · LAUNCH",
    cardStat: "$6,199.24",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786651474009_a2hyn.png",
    client: "Amazon Brand Partner",
    description: "Launched a new single-SKU Amazon product and achieved rapid sales growth within two months through listing optimization and PPC.",
    problem: "The client wanted to launch a completely new Amazon product under a single SKU and generate sales traction quickly within a limited budget.",
    solution: "1. Market Research & Positioning: Identified high-demand, low-competition product.\n2. High-Converting Listing Optimization: Designed high-quality images and copy.\n3. Cost-Efficient PPC Strategy: Launched structured campaigns focused on high-intent keywords generating $6,199.24 in sales.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786651474009_a2hyn.png",
      "/assets/portfolio-amazon-cover.jpg"
    ]
  },
  {
    id: "ppc_1786650676902_n8xvx",
    frame: "F13 / PPC",
    title: "Successful Launch & Scaling of a New Brand on a Limited Budget",
    categorySlug: "amazon-growth",
    subCategorySlug: "amazon-ppc",
    categoryLabel: "AMAZON · AMAZON PPC",
    cardBadge: "PPC · BRAND",
    cardStat: "£54,733.43",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786650626010_g3kei.png",
    client: "Amazon Brand Partner",
    description: "Launched and scaled a new Amazon brand on a limited budget through strategic product selection, cost-effective sourcing, and PPC optimization.",
    problem: "The client wanted to launch a new Amazon brand with a limited budget while achieving strong sales and maintaining a healthy profit margin.",
    solution: "1. Market Research & Product Selection: Analyzed competitor pricing and keywords.\n2. Strategic Launch & PPC: Created optimized listing and controlled ad spending.\n3. Ranking & Organic Growth: Ranked product on page 1, achieving £54,733.43 in sales across 2,632 orders.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786650626010_g3kei.png",
      "/assets/portfolio-amazon-v3.jpg"
    ]
  },
  {
    id: "ppc_1786649712564_x19y8",
    frame: "F14 / PPC",
    title: "High ACoS Optimization for Improved Profitability",
    categorySlug: "amazon-growth",
    subCategorySlug: "amazon-ppc",
    categoryLabel: "AMAZON · AMAZON PPC",
    cardBadge: "PPC · OPTIMIZE",
    cardStat: "-29.74%",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786649459574_5dirz.png",
    client: "Amazon Brand Partner",
    description: "Reduced ACoS through PPC campaign optimization, negative keyword targeting, bid adjustments, and strategic ad expansion.",
    problem: "The client was facing a high Advertising Cost of Sales (ACoS), which was affecting profitability. Ads were not converting effectively, resulting in higher costs.",
    solution: "1. Campaign Audit: Audited existing campaigns for underperforming keywords.\n2. Negative Keywords & Bidding: Added negative keywords and optimized bids.\n3. Sponsored Brands & Display: Launched multi-ad type strategy reducing ACoS from 61.72% to 31.98%.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786649459574_5dirz.png",
      "/assets/real-amazon-ppc-final.jpg"
    ]
  },
  {
    id: "ppc_1786649012840_symiu",
    frame: "F15 / PPC",
    title: "Product Listing Optimization for Increased Visibility",
    categorySlug: "amazon-growth",
    subCategorySlug: "amazon-ppc",
    categoryLabel: "AMAZON · AMAZON PPC",
    cardBadge: "PPC · SEO",
    cardStat: "Page #1",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786648761721_wcbih.png",
    client: "Amazon Brand Partner",
    description: "Improved Amazon product visibility and organic ranking through competitor analysis, keyword optimization, listing enhancement, and A/B testing.",
    problem: "The product had low visibility and poor organic ranking despite being high quality. It was getting low clicks and conversions.",
    solution: "1. Competitor Analysis: Analyzed top competitors for ranking keywords.\n2. Keyword Optimization: Incorporated high-volume keywords into title and bullet points.\n3. A/B Testing: Selected highest-performing title & image variations moving product to page 1.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786648761721_wcbih.png",
      "/assets/hero-amazon.png"
    ]
  },
];

// Dedicated Video Section Items
const VIDEO_SECTION_ITEMS = [
  {
    id: "v1",
    title: "Anker Soundcore Motion Product Commercial",
    categoryTag: "AMAZON VIDEO",
    thumbnail: "/assets/portfolio-video-v4.jpg",
    description: "High-energy Amazon video ad highlighting active noise cancellation and ergonomic design features.",
    duration: "0:45",
  },
  {
    id: "v2",
    title: "Derixio Corporate Brand & Culture Story",
    categoryTag: "CORPORATE FILM",
    thumbnail: "/assets/real-video.jpg",
    description: "Behind-the-scenes brand documentary showcasing our team, creative process, and agency ethos.",
    duration: "1:30",
  },
  {
    id: "v3",
    title: "3D Kinetic Motion Graphics & Logo Ident",
    categoryTag: "MOTION GRAPHICS",
    thumbnail: "/assets/showcase-video-motion.png",
    description: "Sleek 3D particle motion graphics reveal for next-gen digital platforms.",
    duration: "0:30",
  },
  {
    id: "v4",
    title: "Velox Smart Earbuds 3D Product Explainer",
    categoryTag: "3D ANIMATION",
    thumbnail: "/assets/user-video-motion.png",
    description: "Photorealistic 3D explode render revealing internal acoustic engineering and IPX7 waterproofing.",
    duration: "1:00",
  },
];

// Case Studies Data
const CASE_STUDIES = [
  {
    id: "cs1",
    categoryTag: "ECOMMERCE · AMAZON",
    projectName: "Anker Innovations Storefront & PPC",
    statNumber: "+64%",
    statLabel: "Revenue growth within 90 days of listing & campaign optimization",
  },
  {
    id: "cs2",
    categoryTag: "SAAS · WEB DEVELOPMENT",
    projectName: "Luminary Cloud Platform",
    statNumber: "3.8x",
    statLabel: "Organic signup conversion rate lift after Next.js portal launch",
  },
];

export default function PortfolioTwo({ limit = null }) {
  const [activeCategory, setActiveCategory] = useState("all");
  // Sub-filter active state per category
  const [activeSubFilterMap, setActiveSubFilterMap] = useState({
    "amazon-growth": "all-amazon-growth",
    "graphic-designing": "all-graphic-designing",
    "video-editing": "all-video-editing",
  });
  const router = useRouter();

  // ─── Live data state ─────────────────────────────────────────────
  // Start with empty items and loading state.
  // DB data fetches directly. Fallback data is only used if request times out (>5s) or fails.
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    let timeoutId;
    try {
      setIsLoading(true);
      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch("/api/portfolio/projects?status=Published", {
        cache: "no-store",
        signal: controller.signal,
      });
      if (timeoutId) clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const mapped = json.data
          .filter(p => (p.status || '').toUpperCase() !== "HIDDEN" && p.published !== false && !p.deleted)
          .map((p, i) => mapDbProjectToItem(p, i));
        if (mapped.length > 0) {
          setPortfolioItems(mapped);
          return;
        }
      }
      // If DB returns empty array, fall back
      setPortfolioItems(FALLBACK_ITEMS);
    } catch (err) {
      console.warn("PortfolioTwo: live fetch failed or timed out, using fallback data.", err);
      setPortfolioItems(FALLBACK_ITEMS);
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Sub-filter list for current active category (only Amazon Growth, Graphic Design, Video Editing)
  const currentSubFilterList = useMemo(() => {
    if (activeCategory === "all") return null;
    return SUB_CATEGORIES_MAP[activeCategory] || null;
  }, [activeCategory]);

  const activeSubFilterId = useMemo(() => {
    if (activeCategory === "all") return null;
    return activeSubFilterMap[activeCategory] || `all-${activeCategory}`;
  }, [activeCategory, activeSubFilterMap]);

  // Filter items based on activeCategory and sub-filter
  const allFilteredItems = useMemo(() => {
    return portfolioItems.filter((item) => {
      // 1. Check main category
      if (activeCategory !== "all" && item.categorySlug !== activeCategory) {
        return false;
      }
      // 2. Check sub-filter if category has sub-filters and active sub-filter is not "all-[cat]"
      if (activeCategory !== "all" && SUB_CATEGORIES_MAP[activeCategory]) {
        const currentSubId = activeSubFilterMap[activeCategory];
        const allPrefix = `all-${activeCategory}`;
        if (currentSubId && currentSubId !== allPrefix) {
          const isLogoSub = (currentSubId === "logo-brand-identity" || currentSubId === "logo-branding");
          const itemIsLogo = (item.subCategorySlug === "logo-brand-identity" || item.subCategorySlug === "logo-branding");
          if (isLogoSub) {
            if (!itemIsLogo) return false;
          } else if (item.subCategorySlug !== currentSubId) {
            return false;
          }
        }
      }
      return true;
    });
  }, [portfolioItems, activeCategory, activeSubFilterMap]);

  // Apply limit when on home page (limit prop is set)
  const filteredItems = useMemo(() => {
    if (limit !== null) return allFilteredItems.slice(0, limit);
    return allFilteredItems;
  }, [allFilteredItems, limit]);

  // Whether to show the "View All Work" CTA (only in limited/home mode)
  const showViewAllCta = limit !== null;

  // Dynamic live count label
  const countLabelText = useMemo(() => {
    const totalCount = allFilteredItems.length;
    const displayCount = filteredItems.length;
    const catObj = MAIN_CATEGORIES.find((c) => c.id === activeCategory);
    const catName = catObj ? catObj.label.toUpperCase() : "ALL WORK";

    if (activeCategory !== "all" && currentSubFilterList) {
      const activeSubId = activeSubFilterMap[activeCategory];
      const allPrefix = `all-${activeCategory}`;
      if (activeSubId && activeSubId !== allPrefix) {
        const subObj = currentSubFilterList.find((s) => s.id === activeSubId);
        const subName = subObj ? subObj.label.toUpperCase() : "";
        return `SHOWING ${displayCount} ${displayCount === 1 ? "PROJECT" : "PROJECTS"} IN ${catName} / ${subName}`;
      }
    }

    if (activeCategory === "all") {
      return limit !== null
        ? `SHOWING ${displayCount} OF ${totalCount} PORTFOLIO PROJECTS`
        : `SHOWING ALL ${totalCount} PORTFOLIO PROJECTS`;
    }

    return `SHOWING ${displayCount} ${displayCount === 1 ? "PROJECT" : "PROJECTS"} IN ${catName}`;
  }, [allFilteredItems.length, filteredItems.length, activeCategory, activeSubFilterMap, currentSubFilterList, limit]);

  const handleMainCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId !== "all" && SUB_CATEGORIES_MAP[catId] && !activeSubFilterMap[catId]) {
      setActiveSubFilterMap((prev) => ({ ...prev, [catId]: `all-${catId}` }));
    }
  };

  const handleSubFilterChange = (subId) => {
    if (activeCategory === "all" || !SUB_CATEGORIES_MAP[activeCategory]) return;
    setActiveSubFilterMap((prev) => ({
      ...prev,
      [activeCategory]: subId,
    }));
  };

  return (
    <section className="w-full relative isolate overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Background Atmosphere Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#9D26FF]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* ========================================================= */}
      {/* MAIN MASONRY GRID SECTION (THEME RESPONSIVE)               */}
      {/* ========================================================= */}
      <div className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)] relative z-10 bg-agenko-grid">
        <div className="max-w-7xl mx-auto">
          {/* 1. SECTION INTRO HEADER */}
          <div className="max-w-[720px] mx-auto text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-sm">
              <Sparkles size={14} className="text-[#9D26FF]" />
              <span>OUR WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[var(--foreground-heading)] leading-tight mb-4 tracking-tight">
              <span className="font-light">Every service, </span>
              <span className="font-extrabold text-[#9D26FF]">one growth story.</span>
            </h2>
            <p className="text-[var(--foreground-muted)] text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
              From Amazon listing transformations to full-scale digital platforms and visual branding, explore how we accelerate multi-channel growth.
            </p>
          </div>

          {/* 2. FILTER PILLS ROW (CENTERED, PILL-SHAPED) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-6">
            {MAIN_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleMainCategoryChange(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap ${isActive
                      ? "bg-[#9D26FF] text-white shadow-md shadow-purple-900/40 scale-[1.02]"
                      : "bg-[var(--card)] text-[var(--foreground-muted)] border border-[var(--border)] hover:border-[#9D26FF] hover:text-[var(--foreground-heading)] hover:bg-[var(--background-alt)]"
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* 3. SUB-FILTER ROW (ONLY FOR CATEGORIES WITH SUB-FILTERS) */}
          <AnimatePresence mode="wait">
            {currentSubFilterList && (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden mb-6"
              >
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-3">
                  {currentSubFilterList.map((sub) => {
                    const isSubActive = activeSubFilterId === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => handleSubFilterChange(sub.id)}
                        className={`font-mono text-xs px-3.5 py-1.5 rounded-full border border-dashed transition-all duration-200 cursor-pointer ${isSubActive
                            ? "bg-[#9D26FF] text-white border-[#9D26FF] font-bold shadow-sm"
                            : "bg-[var(--background-alt)] text-[var(--foreground-muted)] border-[#9D26FF]/40 hover:text-[#9D26FF] hover:border-[#9D26FF]"
                          }`}
                      >
                        {sub.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4. LIVE PROJECT COUNT TEXT */}
          <div className="text-center mb-10">
            <span className="font-mono text-xs font-bold tracking-wider text-[var(--foreground-muted)] uppercase bg-[var(--background-alt)] border border-[var(--border)] px-3.5 py-1.5 rounded-full inline-block shadow-sm">
              {countLabelText}
            </span>
          </div>

          {/* 5. PORTFOLIO GRID — UNIFORM 808x632 ASPECT RATIO CARDS */}
          {isLoading && portfolioItems.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="rounded-3xl bg-[var(--card)] border border-[var(--border)] overflow-hidden flex flex-col justify-between"
                >
                  <div className="w-full aspect-[808/632] bg-[var(--background-alt)]/60 relative overflow-hidden" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-[var(--background-alt)] rounded-full w-28" />
                    <div className="h-6 bg-[var(--background-alt)] rounded-xl w-3/4" />
                    <div className="h-3 bg-[var(--background-alt)] rounded-full w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35 }}
                    onClick={() => router.push(`/portfolio/project/${item.id}`)}
                    className="group relative rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-[#9D26FF] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden cursor-pointer flex flex-col justify-between"
                  >
                    {/* Thumbnail / Image Container - Uniform 808x632 Aspect Ratio */}
                    <div className="relative w-full aspect-[808/632] bg-[var(--background-alt)] overflow-hidden rounded-t-3xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* PPC Card Overlay: only on full portfolio page, not homepage */}
                      {!limit && item.cardBadge && (
                        <>
                          {/* Bottom-third dark gradient — fades from transparent at 60% to black/60 at 100% */}
                          <div
                            className="absolute inset-x-0 bottom-0 pointer-events-none"
                            style={{
                              height: "40%",
                              background:
                                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.62) 100%)",
                            }}
                          />

                          {/* Top-left Category Badge — solid pill, 16px from edges, above everything */}
                          <div className="absolute top-4 left-4 z-20">
                            <span
                              className="inline-flex items-center font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg"
                              style={{
                                background: "rgba(139,92,246,0.92)",
                                color: "#ffffff",
                                backdropFilter: "blur(6px)",
                                border: "1px solid rgba(255,255,255,0.18)",
                                letterSpacing: "0.08em",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.cardBadge}
                            </span>
                          </div>

                          {/* Bottom-left Stat Callout — on top of the dark gradient */}
                          <div className="absolute bottom-4 left-4 z-20">
                            <span
                              className="block font-extrabold leading-none"
                              style={{
                                fontSize: "clamp(1.45rem, 3.5vw, 2rem)",
                                color: "#8B5CF6",
                                textShadow:
                                  "0 2px 12px rgba(0,0,0,0.55), 0 0 32px rgba(139,92,246,0.35)",
                                letterSpacing: "-0.02em",
                              }}
                            >
                              {item.cardStat}
                            </span>
                          </div>
                        </>
                      )}

                      {/* Subtle Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <div className="w-10 h-10 rounded-full bg-[#9D26FF] text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                          <ArrowUpRight size={20} />
                        </div>
                      </div>
                    </div>

                    {/* Details Below Image */}
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        {/* Category Label Pill */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="font-mono text-[10px] font-bold tracking-widest text-[#9D26FF] uppercase bg-[var(--background-alt)] border border-[var(--border)] px-2.5 py-1 rounded-full">
                            {item.categoryLabel}
                          </span>
                          {item.frame && (
                            <span className="font-mono text-[10px] text-[var(--foreground-muted)] font-medium">
                              {item.frame}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-[var(--foreground-heading)] group-hover:text-[#9D26FF] transition-colors leading-snug mb-2 line-clamp-2">
                          {item.title}
                        </h3>

                        {/* Description */}
                        {item.description && (
                          <p className="text-xs text-[var(--foreground-muted)] line-clamp-2 leading-relaxed font-normal">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Bottom Client Footer */}
                      {item.client && (
                        <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--foreground-muted)]">
                          <span className="font-semibold">{item.client}</span>
                          <span className="text-[#9D26FF] font-bold text-[11px] group-hover:translate-x-0.5 transition-transform inline-flex items-center space-x-1">
                            <span>View Case Study</span>
                            <ArrowUpRight size={12} />
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Empty state fallback */}
          {!isLoading && filteredItems.length === 0 && (
            <div className="text-center py-16 bg-[var(--card)] rounded-3xl border border-[var(--border)] p-8 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-[var(--foreground-heading)] mb-2">No Projects Match</h3>
              <p className="text-xs text-[var(--foreground-muted)] mb-4 leading-relaxed">
                No portfolio items found under this sub-category. Try selecting another filter above.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                }}
                className="px-5 py-2.5 rounded-full bg-[#9D26FF] text-white text-xs font-bold hover:bg-[#8500ED] transition-colors shadow-md"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* View All Work CTA — only shown in limited/home mode */}
          {showViewAllCta && filteredItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 text-center"
            >
              <a
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#9D26FF] text-white text-sm font-bold hover:bg-[#8500ED] transition-all duration-300 shadow-lg hover:shadow-purple-900/40 hover:-translate-y-0.5 group"
              >
                View All {portfolioItems.length}+ Projects
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 6. VIDEO PORTFOLIO SECTION (THEME RESPONSIVE)             */}
      {/* ========================================================= */}
      <div className="w-full bg-[var(--background-alt)] text-[var(--foreground)] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[var(--border)]">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9D26FF]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--card)] border border-[var(--border)] text-[#9D26FF] text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-sm">
                <Sparkles size={13} className="text-[#9D26FF]" />
                <span>MOTION & REELS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl text-[var(--foreground-heading)] font-extrabold leading-tight tracking-tight">
                Films & product videos
              </h2>
            </div>
            <p className="font-mono text-xs text-[var(--foreground-muted)] uppercase tracking-wider max-w-xs text-left sm:text-right border-l sm:border-l-0 sm:border-r border-[var(--border)] pl-3 sm:pl-0 sm:pr-3">
              separate section — different format, own grid
            </p>
          </div>

          {/* 4-Column Responsive Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VIDEO_SECTION_ITEMS.map((vid) => (
              <div
                key={vid.id}
                onClick={() => vid.id && router.push(`/portfolio/project/${vid.id}`)}
                className="group relative flex flex-col justify-between rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-[#9D26FF] transition-all duration-300 p-4 cursor-pointer hover:-translate-y-1 shadow-lg"
              >
                {/* Video Thumbnail with Centered Play Button Overlay */}
                <div className="relative w-full aspect-video rounded-2xl bg-[var(--background-alt)] overflow-hidden mb-4">
                  <Image
                    src={vid.thumbnail}
                    alt={vid.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Centered Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#9D26FF] text-white flex items-center justify-center shadow-xl border border-white/20 group-hover:scale-110 transition-transform duration-300">
                      <Play size={20} className="ml-0.5" fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2.5 right-2.5 font-mono text-[10px] bg-black/80 text-white px-2 py-0.5 rounded border border-white/10 font-bold">
                    {vid.duration}
                  </div>
                </div>

                {/* Video Label & Title */}
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#9D26FF] uppercase tracking-wider block mb-1">
                    {vid.categoryTag}
                  </span>
                  <h3 className="text-base font-bold text-[var(--foreground-heading)] group-hover:text-[#9D26FF] transition-colors leading-snug line-clamp-2">
                    {vid.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 7. CASE STUDIES STRIP (THEME RESPONSIVE)                  */}
      {/* ========================================================= */}
      <div className="w-full bg-[var(--card)] text-[var(--foreground)] py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-mono font-bold uppercase tracking-widest mb-3">
              <Sparkles size={13} className="text-[#9D26FF]" />
              <span>PROVEN OUTCOMES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground-heading)] leading-tight mb-2 tracking-tight">
              Results behind the work
            </h2>
            <p className="text-[var(--foreground-muted)] text-sm sm:text-base leading-relaxed font-normal">
              Proven ROI and measurable growth metrics achieved for our clients.
            </p>
          </div>

          {/* 3-Column Case Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.id}
                className="flex flex-col justify-between p-7 rounded-3xl bg-[var(--background-alt)] border border-[var(--border)] hover:border-[#9D26FF] shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  {/* Category Label */}
                  <span className="font-mono text-[11px] font-bold text-[#9D26FF] tracking-wider uppercase block mb-2">
                    {cs.categoryTag}
                  </span>

                  {/* Project Name */}
                  <h3 className="text-xl font-bold text-[var(--foreground-heading)] leading-snug mb-4 group-hover:text-[#9D26FF] transition-colors">
                    {cs.projectName}
                  </h3>
                </div>

                <div>
                  {/* Large Stat Number */}
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#9D26FF] tracking-tight my-2">
                    {cs.statNumber}
                  </div>

                  {/* Explanation Label Under Stat */}
                  <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed pt-2 border-t border-[var(--border)]">
                    {cs.statLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox / Showcase Modal */}
    </section>
  );
}
