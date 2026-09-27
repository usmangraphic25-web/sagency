"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";
import { getValidImageUrl } from "@/lib/portfolioUtils";

// ─── Instant Fallback Projects ────────────────────────────────────────────────
const FALLBACK_PROJECTS = [
  // PPC / Ad Management
  {
    id: "ppc_1786733798883_3ynez",
    title: "Sales & PPC Growth Performance Overhaul",
    categoryLabel: "PPC · AD MANAGEMENT",
    categorySlug: "ppc",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733750987_hkqvk.png",
    client: "Amazon Brand Partner",
    statBadge: "$100,471 Revenue",
    description: "Strong Amazon sales growth achieved with 1,621 units ordered and $100,471 in sales.",
    problem: "Needed to improve Amazon sales performance and increase overall order volume.",
    solution: "Restructured campaigns, optimized bids, and boosted organic ranking to scale revenue.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733750987_hkqvk.png",
    ],
  },
  {
    id: "ppc_1786652444754_sc1et",
    title: "Drastic ACoS Reduction & Profit Optimization",
    categoryLabel: "PPC · TURNAROUND",
    categorySlug: "ppc",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652330911_olhcf.png",
    client: "HealthCare Brand",
    statBadge: "-132% ACoS Cut",
    description: "Reduced Amazon PPC ACoS from 181.43% down to 49.07% in 5 months while scaling sales.",
    problem: "Excessive ad spend bleeding profits with high ACoS.",
    solution: "Eliminated wasteful ad spend, targeted high-converting long-tail keywords, and optimized search terms.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652330911_olhcf.png",
    ],
  },
  {
    id: "ppc_1786652094670_ithea",
    title: "Scaling to $46K Monthly at 13.89% ACoS",
    categoryLabel: "PPC · SCALING",
    categorySlug: "ppc",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652094670_ithea.png",
    client: "Amazon Brand Partner",
    statBadge: "$46K/mo at 13.89% ACoS",
    description: "Scaled Amazon PPC sales to $46,487.44 in a single month while maintaining a 13.89% ACoS.",
    problem: "Inefficient ad spend, high ACoS, and poor keyword targeting.",
    solution: "Restructured campaigns, separated high-converting keywords, and implemented profit-driven bidding.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652094670_ithea.png",
    ],
  },


  // Website Development
  {
    id: "wd1",
    title: "Shopify Fashion Storefront & Conversion UX",
    categoryLabel: "WEBSITE DEVELOPMENT",
    categorySlug: "webdev",
    image: "/assets/webdev-shopify.png",
    client: "Fashion & Lifestyle Brand",
    statBadge: "+55% Checkout Uplift",
    description: "+55% checkout completion rate after full Shopify theme redesign and mobile conversion UX optimization.",
    problem: "High cart abandonment and poor mobile checkout experience.",
    solution: "Streamlined one-page checkout, mobile-first product pages, and trust signal optimization.",
    gallery: ["/assets/webdev-shopify.png"],
  },
  {
    id: "wd2",
    title: "Next.js SaaS Dashboard & Marketing Hub",
    categoryLabel: "WEBSITE DEVELOPMENT",
    categorySlug: "webdev",
    image: "/assets/webdev-nextjs.png",
    client: "SaaS Platform",
    statBadge: "3.8x Conversion Lift",
    description: "3.8x organic signup conversion rate after Next.js 14 rebuild with sub-second page speed.",
    problem: "Slow page loads and poor SEO hurting organic acquisition.",
    solution: "Rebuilt marketing site and portal in Next.js 14 with App Router and optimized Core Web Vitals.",
    gallery: ["/assets/webdev-nextjs.png"],
  },

  // Video Content
  {
    id: "v1",
    title: "Anker Soundcore Product Commercial Video",
    categoryLabel: "VIDEO CONTENT",
    categorySlug: "video",
    image: "/assets/portfolio-video-v4.jpg",
    client: "Anker Soundcore",
    statBadge: "+28% CTR Lift",
    description: "High-energy Amazon Sponsored Video ad featuring active noise cancellation demo and 3D explode views.",
    problem: "Low click-through rates on static ad campaigns.",
    solution: "Produced high-impact 45-second commercial video ad optimized for Amazon Sponsored Video.",
    gallery: ["/assets/portfolio-video-v4.jpg"],
  },
  {
    id: "v2",
    title: "3D Kinetic Motion Graphics Reveal",
    categoryLabel: "VIDEO CONTENT",
    categorySlug: "video",
    image: "/assets/showcase-video-motion.png",
    client: "Velox Motion Tech",
    statBadge: "2.1x Brand Recall",
    description: "Sleek 3D particle motion graphics reveal for next-gen digital product launch.",
    problem: "Generic product animation failing to create viral impact.",
    solution: "Created photorealistic 3D explode renders and kinetic motion graphic teasers.",
    gallery: ["/assets/showcase-video-motion.png"],
  },
];

// Exact 6 services matching main portfolio + All Work
const CATEGORY_FILTERS = [
  { id: "all", label: "All Work" },
  { id: "ppc", label: "PPC / Ad Management" },
  { id: "listing", label: "Listing Images & Creatives" },
  { id: "aplus", label: "A+ Content / Brand Store" },
  { id: "graphic", label: "Graphic Design" },
  { id: "webdev", label: "Website Development" },
  { id: "video", label: "Video Content" },
];

function mapDbProject(p) {
  const service = (p.service || "").toLowerCase();
  const rawSub = (p.subCategory || p.categorySlug || "").toLowerCase().trim();
  const tag = (p.tag || "").toLowerCase();

  let categorySlug = "graphic";

  if (
    service.includes("graphic") ||
    ["logo-brand-identity", "logo-branding", "ui-ux-design", "packaging-print-design", "3d-product-design-mockups", "shopify-store-web-graphics", "social-media-ad-creatives"].includes(rawSub)
  ) {
    categorySlug = "graphic";
  } else if (
    service.includes("ppc") ||
    rawSub.includes("ppc") ||
    rawSub === "amazon-ppc" ||
    rawSub === "amazon-campaigns" ||
    tag.includes("ppc")
  ) {
    categorySlug = "ppc";
  } else if (
    service.includes("listing") ||
    rawSub === "amazon-listing-images" ||
    rawSub === "listing-images" ||
    (rawSub.includes("listing") && !service.includes("graphic"))
  ) {
    categorySlug = "listing";
  } else if (
    service.includes("a-plus") ||
    service.includes("a+") ||
    service.includes("brand store") ||
    rawSub === "a-plus-content" ||
    rawSub === "amazon-brand-store" ||
    tag.includes("a+")
  ) {
    categorySlug = "aplus";
  } else if (
    service.includes("account") ||
    rawSub.includes("account") ||
    tag.includes("account") ||
    rawSub === "amazon-growth"
  ) {
    categorySlug = "graphic";
  } else if (
    service.includes("web") ||
    rawSub.includes("web") ||
    rawSub === "web-development"
  ) {
    categorySlug = "webdev";
  } else if (
    service.includes("video") ||
    service.includes("motion") ||
    rawSub.includes("video") ||
    rawSub === "video-editing"
  ) {
    categorySlug = "video";
  }

  const SUB_LABEL_MAP = {
    "amazon-ppc": "PPC · AD MANAGEMENT",
    "amazon-campaigns": "PPC · AD MANAGEMENT",
    "amazon-listing-images": "LISTING IMAGES & CREATIVES",
    "a-plus-content": "A+ CONTENT · BRAND STORY",
    "amazon-brand-store": "A+ CONTENT · BRAND STORE",
    "full-account-management": "GRAPHIC DESIGN",
    "amazon-growth": "GRAPHIC DESIGN",
    "3d-product-design-mockups": "GRAPHIC · 3D MOCKUPS",
    "shopify-store-web-graphics": "GRAPHIC · SHOPIFY WEB",
    "logo-brand-identity": "GRAPHIC · LOGO & BRANDING",
    "logo-branding": "GRAPHIC · LOGO & BRANDING",
    "ui-ux-design": "GRAPHIC · UI/UX DESIGN",
    "packaging-print-design": "GRAPHIC · PACKAGING",
    "social-media-ad-creatives": "GRAPHIC · SOCIAL MEDIA",
    "web-development": "WEBSITE DEVELOPMENT",
    "video-editing": "VIDEO CONTENT",
    "video-motion-design": "VIDEO CONTENT",
  };

  const categoryLabel = SUB_LABEL_MAP[rawSub] || (p.service || "PORTFOLIO").toUpperCase();

  const mediaItems = Array.isArray(p.mediaItems) ? p.mediaItems : [];
  const gallery = mediaItems.length > 0
    ? mediaItems.map((m) => m.url).filter(Boolean)
    : Array.isArray(p.gallery) ? p.gallery.filter(Boolean) : [];
  const coverImage = getValidImageUrl(p, "/assets/portfolio-web-v4.jpg");

  let statBadge = p.metricValue || p.tag || null;
  if (!statBadge) {
    if (categorySlug === "ppc") statBadge = "PPC Growth Case";
    else if (categorySlug === "listing") statBadge = "Conversion Lift";
    else if (categorySlug === "aplus") statBadge = "Brand Story";
    else if (categorySlug === "graphic") statBadge = "Brand Identity";
    else if (categorySlug === "webdev") statBadge = "Custom Web";
    else if (categorySlug === "video") statBadge = "Video Creative";
    else statBadge = "Featured Work";
  }

  return {
    id: p.id,
    title: p.title,
    categorySlug,
    subCategorySlug: rawSub,
    categoryLabel,
    image: coverImage,
    client: p.client || p.brandName || "",
    description: p.description || "",
    problem: p.problem || p.caseStudyData || "",
    solution: p.solution || "",
    gallery,
    statBadge,
  };
}

export default function HomePortfolioCarousel({ limit = 6 }) {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  // Background fetch live projects
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);

    fetch("/api/portfolio/projects?status=Published", { cache: "no-store", signal: controller.signal })
      .then((res) => res.json())
      .then((json) => {
        clearTimeout(timer);
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data
            .filter((p) => (p.status || '').toUpperCase() !== "HIDDEN" && p.published !== false && !p.deleted)
            .map(mapDbProject);
          if (mapped.length > 0) {
            // Combine mapped live DB projects with fallback projects for unpopulated categories
            const merged = [...mapped];
            FALLBACK_PROJECTS.forEach((fb) => {
              if (!merged.some((m) => m.categorySlug === fb.categorySlug)) {
                merged.push(fb);
              }
            });
            setProjects(merged);
            setIsLoading(false);
            return;
          }
        }
        setProjects(FALLBACK_PROJECTS);
        setIsLoading(false);
      })
      .catch(() => {
        clearTimeout(timer);
        setProjects(FALLBACK_PROJECTS);
        setIsLoading(false);
      });
  }, []);

  // Filter projects based on selected service tab
  const filteredProjects = useMemo(() => {
    let list = projects;
    if (activeFilter !== "all") {
      const categoryMatches = projects.filter((p) => p.categorySlug === activeFilter);
      if (categoryMatches.length > 0) {
        list = categoryMatches;
      } else {
        const fallbackMatches = FALLBACK_PROJECTS.filter((p) => p.categorySlug === activeFilter);
        list = fallbackMatches.length > 0 ? fallbackMatches : projects;
      }
    }
    return list.slice(0, limit);
  }, [projects, activeFilter, limit]);

  // Reset activeIndex when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter]);

  const total = filteredProjects.length;

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play timer
  useEffect(() => {
    if (isHovered || total <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [isHovered, total, handleNext]);

  if (total === 0 && isLoading) {
    return (
      <section className="w-full relative py-20 bg-[var(--background)] border-b border-[var(--border)] animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-64 bg-[var(--card)] rounded-3xl border border-[var(--border)]" />
        </div>
      </section>
    );
  }

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0] || FALLBACK_PROJECTS[0];
  const nextProjectIndex = (activeIndex + 1) % total;
  const nextProject = filteredProjects[nextProjectIndex] || activeProject;
  const prevProjectIndex = (activeIndex - 1 + total) % total;
  const prevProject = filteredProjects[prevProjectIndex] || activeProject;

  return (
    <section className="w-full relative py-20 sm:py-28 bg-[var(--background)] bg-agenko-grid overflow-hidden border-b border-[var(--border)]">
      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-[#9D26FF]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── 1. Section Header ────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-sm">
              <Sparkles size={14} className="text-[#9D26FF]" />
              <span>SPOTLIGHT SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[var(--foreground-heading)] leading-tight tracking-tight">
              <span className="font-light">Featured </span>
              <span className="font-extrabold text-[#9D26FF]">Growth Stories.</span>
            </h2>
            <p className="text-[var(--foreground-muted)] text-sm sm:text-base leading-relaxed font-normal mt-3">
              From high-converting Amazon listing stacks to PPC scaling and brand identity platforms.
            </p>
          </motion.div>

          {/* Category Pill Filters */}
          <motion.div
            className="mt-6 md:mt-0 flex flex-wrap gap-2 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {CATEGORY_FILTERS.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveFilter(cat.id);
                  }}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap ${isActive
                    ? "bg-[#9D26FF] text-white shadow-md shadow-purple-900/30 scale-[1.03]"
                    : "bg-[var(--card)] text-[var(--foreground-muted)] border border-[var(--border)] hover:border-[#9D26FF] hover:text-[var(--foreground-heading)]"
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ── 2. Interactive Spotlight Hero & Side Queue Deck ────────── */}
        <div
          className="relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

            {/* MAIN SPOTLIGHT CARD (Spans 7 cols on desktop) */}
            <div className="lg:col-span-7 w-full relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeProject.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -direction * 40, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="group relative rounded-3xl overflow-hidden bg-[var(--card)] border border-[#9D26FF]/80 ring-2 ring-[#9D26FF]/20 shadow-2xl shadow-purple-950/40 cursor-pointer"
                  onClick={() => activeProject.id && router.push(`/portfolio/project/${activeProject.id}`)}
                >
                  {/* Spotlight Image Box — capped at max-h-[440px] while maintaining aspect-[1418/1109] */}
                  <div className="relative w-full aspect-[1418/1109] max-h-[420px] sm:max-h-[450px] overflow-hidden bg-black/80">
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 700px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Top Glassmorphism Badges */}
                    <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                      <span className="font-mono text-[9px] sm:text-[11px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-black/75 text-white border border-white/20 backdrop-blur-md shadow-lg">
                        {activeProject.categoryLabel}
                      </span>

                      {activeProject.statBadge && (
                        <span className="inline-flex items-center gap-1 font-sans text-[11px] sm:text-xs font-extrabold px-3.5 py-1.5 rounded-full bg-[#9D26FF] text-white border border-white/25 backdrop-blur-md shadow-lg">
                          <TrendingUp size={13} className="text-white" />
                          {activeProject.statBadge}
                        </span>
                      )}
                    </div>

                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                    {/* Hover Glow Tint */}
                    <div className="absolute inset-0 bg-[#9D26FF]/0 group-hover:bg-[#9D26FF]/10 transition-colors duration-300 pointer-events-none" />

                    {/* Bottom Details Banner with Integrated CTA */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
                      <div className="max-w-[75%]">
                        {activeProject.client && (
                          <p className="text-white/70 text-xs font-semibold tracking-wider uppercase mb-1.5">
                            {activeProject.client}
                          </p>
                        )}
                        <h3 className="text-xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                          {activeProject.title}
                        </h3>
                        {activeProject.description && (
                          <p className="text-white/80 text-xs sm:text-sm line-clamp-2 mt-2 hidden sm:block font-normal">
                            {activeProject.description}
                          </p>
                        )}
                      </div>

                      <div className="pointer-events-auto shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (activeProject.id) router.push(`/portfolio/project/${activeProject.id}`);
                          }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-extrabold shadow-2xl hover:bg-[#9D26FF] hover:text-white transition-colors duration-200 cursor-pointer"
                        >
                          Explore Case Study
                          <ArrowUpRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* SIDE PREVIEW QUEUE CARDS (Spans 5 cols on desktop) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">
                  UP NEXT IN QUEUE
                </span>
                <span className="font-mono text-xs font-bold text-[#9D26FF] bg-[var(--card)] px-3 py-1 rounded-full border border-[var(--border)] shadow-sm">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>

              {/* Next Project Preview Card */}
              {nextProject && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setDirection(1);
                    setActiveIndex(nextProjectIndex);
                  }}
                  className="group relative rounded-2xl overflow-hidden bg-[var(--card)] border border-[var(--border)] hover:border-[#9D26FF] p-3.5 flex gap-4 items-center cursor-pointer shadow-md transition-all"
                >
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-black/60 border border-[var(--border)]">
                    <Image
                      src={nextProject.image}
                      alt={nextProject.title}
                      fill
                      sizes="140px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-[9px] font-bold text-[#9D26FF] uppercase tracking-wider block mb-1">
                      {nextProject.categoryLabel}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[var(--foreground-heading)] truncate group-hover:text-[#9D26FF] transition-colors">
                      {nextProject.title}
                    </h4>
                    {nextProject.client && (
                      <p className="text-[10px] text-[var(--foreground-muted)] truncate mt-0.5 font-medium">
                        {nextProject.client}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Prev Project Preview Card */}
              {prevProject && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setDirection(-1);
                    setActiveIndex(prevProjectIndex);
                  }}
                  className="group relative rounded-2xl overflow-hidden bg-[var(--card)] border border-[var(--border)] hover:border-[#9D26FF] p-3.5 flex gap-4 items-center cursor-pointer shadow-md transition-all"
                >
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-black/60 border border-[var(--border)]">
                    <Image
                      src={prevProject.image}
                      alt={prevProject.title}
                      fill
                      sizes="140px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-[9px] font-bold text-[#9D26FF] uppercase tracking-wider block mb-1">
                      {prevProject.categoryLabel}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[var(--foreground-heading)] truncate group-hover:text-[#9D26FF] transition-colors">
                      {prevProject.title}
                    </h4>
                    {prevProject.client && (
                      <p className="text-[10px] text-[var(--foreground-muted)] truncate mt-0.5 font-medium">
                        {prevProject.client}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

          </div>
        </div>

        {/* ── 3. Controls & Progress Indicator Bar ─────────────────────── */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
          {/* Progress Bar & Dots */}
          <div className="flex items-center gap-2">
            {filteredProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === activeIndex
                  ? "w-8 bg-[#9D26FF]"
                  : "w-2 bg-[var(--border)] hover:bg-[var(--foreground-muted)]"
                  }`}
              />
            ))}
          </div>

          {/* Left / Right Navigation Arrow Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Project"
              className="w-11 h-11 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground-heading)] hover:border-[#9D26FF] hover:text-[#9D26FF] flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Project"
              className="w-11 h-11 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground-heading)] hover:border-[#9D26FF] hover:text-[#9D26FF] flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Full Portfolio CTA */}
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#9D26FF] hover:text-[#8500ED] group transition-colors"
          >
            View Full Portfolio ({projects.length}+ Projects)
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>

    </section>
  );
}
