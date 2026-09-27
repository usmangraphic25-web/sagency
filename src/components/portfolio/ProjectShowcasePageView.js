"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles
} from "lucide-react";

// Helper function to return customized 5-step workflow strategy per category
const getWorkflowData = (category, title) => {
  const catLower = (category || "").toLowerCase();
  const titleLower = (title || "").toLowerCase();

  if (catLower.includes("ppc") || titleLower.includes("ppc") || titleLower.includes("acos")) {
    return {
      badge: "OUR PPC WORKFLOW",
      title: "How We Execute Amazon PPC & Ad Strategy",
      subtitle: "A data-driven framework for eliminating wasted ad spend, scaling revenue, and driving organic rank.",
      steps: [
        { num: "01", title: "Audit & Keyword Research", desc: "Analyze search term reports, competitor bid strategy, and identify high-converting keyword targets." },
        { num: "02", title: "Campaign Restructuring", desc: "Isolate top exact keywords, set negative match filters, and establish target ACoS threshold parameters." },
        { num: "03", title: "Bidding & Placement Rules", desc: "Optimize Top-of-Search placement multipliers, Sponsored Display retargeting, and dynamic bid rules." },
        { num: "04", title: "Continuous Optimization", desc: "Perform daily bid adjustments, search query harvesting, and shift budget to top-performing campaigns." },
        { num: "05", title: "Review & Scaling", desc: "Track ACoS reductions, organic rank gains, and scale high-ROI campaigns month-over-month." },
      ],
    };
  }

  if (catLower.includes("web") || catLower.includes("dev") || catLower.includes("code")) {
    return {
      badge: "OUR DEV WORKFLOW",
      title: "How We Execute Website & Digital Platforms",
      subtitle: "A systematic engineering workflow built for high speed, conversion optimization, and modern UI.",
      steps: [
        { num: "01", title: "Discovery & Architecture", desc: "Understand brand positioning, technical requirements, user flow, and competitive benchmarks." },
        { num: "02", title: "UX Strategy & Wireframes", desc: "Plan information architecture, conversion funnels, responsive layouts, and interactive prototypes." },
        { num: "03", title: "Creative Direction & UI", desc: "Design modern UI tokens, typography, dark/light aesthetics, micro-animations, and component libraries." },
        { num: "04", title: "Next.js & Frontend Build", desc: "Develop high-performance code, optimize image assets, implement SEO schema, and test responsive layouts." },
        { num: "05", title: "Audit, QA & Launch", desc: "Perform cross-browser testing, page speed validation, security audits, and production deployment." },
      ],
    };
  }

  return {
    badge: "OUR LISTING WORKFLOW",
    title: "How We Execute Amazon Listing Images",
    subtitle: "A practical framework for transforming product information and customer insights into clear, conversion-focused Amazon listing visuals.",
    steps: [
      { num: "01", title: "Product & Market Research", desc: "Understand the product, target customer, category, competitors, and existing listing." },
      { num: "02", title: "Listing Creative Strategy", desc: "Identify key selling points, product benefits, customer concerns, and visual order." },
      { num: "03", title: "Creative Direction", desc: "Plan main image, feature graphics, lifestyle visuals, comparisons, and content." },
      { num: "04", title: "Design & Refinement", desc: "Create polished Amazon-ready listing images and refine visual presentation." },
      { num: "05", title: "Final Review & Delivery", desc: "Check consistency, quality, Amazon specs, and prepare final listing assets." },
    ],
  };
};

export default function ProjectShowcasePageView({ project }) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBack = () => {
    router.back();
  };

  // Process project media items & gallery with robust JSON parsing
  let mediaList = [];
  let rawMedia = project.mediaItems;
  if (typeof rawMedia === "string") {
    try { rawMedia = JSON.parse(rawMedia); } catch { rawMedia = []; }
  }

  let rawGallery = project.gallery;
  if (typeof rawGallery === "string") {
    try { rawGallery = JSON.parse(rawGallery); } catch { rawGallery = []; }
  }

  if (Array.isArray(rawMedia) && rawMedia.length > 0) {
    mediaList = rawMedia.map((m, i) => ({
      id: m.id || `m_${i}`,
      url: typeof m === "string" ? m : (m.url || ""),
      mediaType: m.mediaType || (m.url && m.url.match(/\.(mp4|webm|mov|m4v)$/i) ? "video" : "image"),
      videoUrl: m.videoUrl || "",
      videoFile: m.videoFile || "",
      isCover: Boolean(m.isCover || i === 0),
      displayOrder: typeof m.displayOrder === "number" ? m.displayOrder : i,
    }));
  } else if (Array.isArray(rawGallery) && rawGallery.length > 0) {
    mediaList = rawGallery.map((url, i) => ({
      id: `g_${i}`,
      url: typeof url === "string" ? url : (url?.url || ""),
      mediaType: "image",
      isCover: i === 0,
      displayOrder: i,
    }));
  } else {
    const fallbackUrl = project.coverImage || project.image || project.thumbnail || "/assets/portfolio-web-v4.jpg";
    mediaList = [{ id: "m_0", url: fallbackUrl, mediaType: project.mediaType || "image", isCover: true, displayOrder: 0 }];
  }

  mediaList = mediaList.filter((m) => m.url || m.videoUrl || m.videoFile);

  if (mediaList.length === 0) {
    mediaList = [{ id: "m_fallback", url: project.coverImage || project.image || "/assets/portfolio-web-v4.jpg", mediaType: "image", isCover: true, displayOrder: 0 }];
  }

  mediaList.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const coverItem = mediaList.find((m) => m.isCover) || mediaList[0] || {};
  const allOrderedItems = [coverItem, ...mediaList.filter((m) => (m.id ? m.id !== coverItem.id : m.url !== coverItem.url))];

  const currentMedia = allOrderedItems[activeIndex] || allOrderedItems[0] || {};
  const hasMultipleMedia = allOrderedItems.length > 1;

  const handleNext = () => { if (hasMultipleMedia) setActiveIndex((prev) => (prev + 1) % allOrderedItems.length); };
  const handlePrev = () => { if (hasMultipleMedia) setActiveIndex((prev) => (prev === 0 ? allOrderedItems.length - 1 : prev - 1)); };

  const displayCategory = project.categoryName || project.service || "Graphic Design";
  const subCategory = project.subCategory || project.categorySlug || "";

  let prob = project.problem || "";
  let sol = project.solution || "";
  let res = project.results || project.result || "";

  if (project.caseStudyDetails && (!prob || !sol || !res)) {
    const cleanHtml = project.caseStudyDetails.replace(/<!--[\s\S]*?-->/g, "");
    const probMatch = cleanHtml.match(/(?:<b>\s*Client Problem:?\s*<\/b>|<b>\s*Problem:?\s*<\/b>)([\s\S]*?)(?:<h2|<b>\s*Our Solution|<b>\s*Solution:?|<b>\s*Results:?|$)/i);
    const solMatch = cleanHtml.match(/(?:<b>\s*Our Solution:?\s*<\/b>|<b>\s*Solution:?\s*<\/b>)([\s\S]*?)(?:<h2|<b>\s*Results:?|<b>\s*Result:?|$)/i);
    const resMatch = cleanHtml.match(/(?:<b>\s*Results:?\s*<\/b>|<b>\s*Result:?\s*<\/b>)([\s\S]*?)(?:$)/i);
    if (!prob && probMatch) prob = probMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!sol && solMatch) sol = solMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!res && resMatch) res = resMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  }

  if (!res && (project.shortDescription || project.description)) {
    res = project.shortDescription || project.description;
  }

  const hasBreakdown = prob || sol || res || project.caseStudyDetails;
  const wf = getWorkflowData(displayCategory, project.title);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Subtle Ambient Glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#9D26FF]/5 rounded-full blur-[200px] pointer-events-none" />


      {/* SCROLLABLE SHOWCASE BODY */}
      <main className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 space-y-8 sm:space-y-12">

        {/* 1. PROJECT INFORMATION HEADER */}
        <div className="space-y-6 text-left border-b border-[var(--border)] pb-8">
          {/* Standalone Back to Portfolio Button above Category Badge */}
          <div>
            <button
              onClick={handleBack}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#9D26FF]/10 hover:bg-[#9D26FF] text-[#9D26FF] hover:text-white border border-[#9D26FF]/30 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-sm group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Portfolio</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-wider">
              {displayCategory}
            </span>
            {subCategory && (
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--foreground-muted)] text-xs font-semibold capitalize">
                {subCategory.replace(/-/g, " ")}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight">
            {project.title}
          </h1>

          {project.description && (
            <p className="text-[var(--foreground-muted)] text-base sm:text-lg leading-relaxed max-w-4xl pt-1">
              {project.description}
            </p>
          )}

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[var(--foreground-muted)] font-medium">
            {project.client && (
              <div>
                <span className="text-gray-500 uppercase font-bold mr-1.5">Client:</span>
                <span className="text-[var(--foreground-heading)] font-semibold">{project.client}</span>
              </div>
            )}
            <div>
              <span className="text-gray-500 uppercase font-bold mr-1.5">Agency:</span>
              <span className="text-[#9D26FF] font-semibold">Derixio Digital Agency</span>
            </div>
            {(project.projectUrl || project.websiteUrl) && (
              <a
                href={project.projectUrl || project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-[#9D26FF] hover:text-[#8500ED] font-bold transition-colors ml-auto"
              >
                <span>Live Project Link</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* 2. CASE STUDY BREAKDOWN */}
        {hasBreakdown && (
          <div className="space-y-6 pt-2 border-t border-[var(--border)]">
            <div className="flex items-center space-x-2 text-[#9D26FF] font-mono text-xs font-bold uppercase tracking-wider">
              <Layers size={14} />
              <span>CASE STUDY BREAKDOWN & PROGRESS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-red-500/30 shadow-lg flex flex-col">
                <h3 className="text-sm font-mono font-bold text-red-400 uppercase tracking-wider mb-2.5 flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2 inline-block" />
                  1. Problem:
                </h3>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed whitespace-pre-line flex-grow">
                  {prob || "High advertising costs, ineffective keyword targeting, and limited organic sales visibility."}
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-emerald-500/30 shadow-lg flex flex-col">
                <h3 className="text-sm font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2.5 flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2 inline-block" />
                  2. Solution:
                </h3>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed whitespace-pre-line flex-grow">
                  {sol || "Complete PPC campaign overhaul, negative keyword filtering, placement bid optimization, and listing enhancement."}
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-purple-500/30 shadow-lg flex flex-col">
                <h3 className="text-sm font-mono font-bold text-[#9D26FF] uppercase tracking-wider mb-2.5 flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9D26FF] mr-2 inline-block" />
                  3. Results & Progress:
                </h3>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed whitespace-pre-line flex-grow">
                  {res || "Significant reduction in ACoS, increased monthly ad sales, and improved conversion performance."}
                </p>
              </div>
            </div>
            {project.caseStudyDetails && !prob && !sol && (
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed prose prose-invert max-w-none mt-4">
                <div dangerouslySetInnerHTML={{ __html: project.caseStudyDetails }} />
              </div>
            )}
          </div>
        )}

        {/* 3. WORKFLOW STRATEGY ROADMAP */}
        <div className="relative w-full rounded-3xl py-12 px-4 sm:px-6 md:px-8 overflow-hidden my-4 shadow-sm">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#9D26FF]/8 rounded-full blur-[100px] pointer-events-none" />
          <div className="flex justify-center mb-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--background)] border border-[#9D26FF]/30 text-[#9D26FF] text-[10px] font-mono font-bold uppercase tracking-widest shadow-sm">
              <Sparkles size={12} className="text-[#9D26FF]" />
              <span>{wf.badge}</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold text-center text-[var(--foreground-heading)] tracking-tight leading-tight mb-3 relative z-10 font-sans">
            {wf.title}
          </h2>
          <p className="text-center text-[var(--foreground-muted)] text-xs sm:text-sm max-w-xl mx-auto mb-14 leading-relaxed relative z-10">
            {wf.subtitle}
          </p>
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="hidden lg:block absolute top-[28px] left-[8%] right-[8%] h-[2.5px] bg-gradient-to-r from-[#9D26FF]/40 via-[#9D26FF] to-[#9D26FF]/40 z-0" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
              {wf.steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-full bg-[var(--background)] border-2 border-[#9D26FF] text-[#9D26FF] font-mono font-bold text-base flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 group-hover:bg-[#9D26FF] group-hover:text-white transition-all duration-300 mb-5 relative z-10">
                    {step.num}
                  </div>
                  <h3 className="text-sm font-extrabold text-[var(--foreground-heading)] group-hover:text-[#9D26FF] transition-colors leading-snug mb-2 font-sans">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-[var(--foreground-muted)] leading-relaxed max-w-[200px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. INTERACTIVE LIGHTBOX GALLERY */}
        <div className="relative w-full group pt-2 border-t border-[var(--border)]">
          <div className="flex items-center space-x-2 text-[#9D26FF] font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <span>CASE STUDY SCREENSHOTS & ASSETS</span>
          </div>
          <div className="relative w-full rounded-2xl overflow-hidden bg-[var(--card)] border border-[var(--border)] shadow-2xl min-h-[300px] flex items-center justify-center p-2 sm:p-4">
            {/* Media Content */}
            {currentMedia.mediaType === "video" || (activeIndex === 0 && project.service === "Video & Motion Design") ? (
              currentMedia.videoFile || project.videoFile ? (
                <video controls autoPlay key={currentMedia.url || currentMedia.videoFile} poster={currentMedia.url || project.coverImage} className="w-full h-auto max-h-[75vh] block rounded-xl object-contain">
                  <source src={currentMedia.videoFile || project.videoFile} type="video/mp4" />
                </video>
              ) : (currentMedia.videoUrl || project.videoUrl) ? (
                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden">
                  <iframe src={currentMedia.videoUrl || project.videoUrl} className="w-full h-full" allowFullScreen />
                </div>
              ) : (
                <img src={currentMedia.url} alt={`${project.title} - Asset ${activeIndex + 1}`} className="w-full h-auto max-h-[75vh] block rounded-xl object-contain mx-auto" />
              )
            ) : (
              <img
                src={currentMedia.url || "/assets/portfolio-web-v4.jpg"}
                alt={`${project.title} - Asset ${activeIndex + 1}`}
                onError={(e) => { e.currentTarget.src = "/assets/portfolio-web-v4.jpg"; }}
                className="w-full h-auto max-h-[75vh] block rounded-xl object-contain mx-auto"
              />
            )}

            {/* Cover Tag */}
            {activeIndex === 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-bold shadow-lg z-20">
                Cover Image
              </span>
            )}

            {/* Navigation Arrows */}
            {hasMultipleMedia && (
              <>
                <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/80 hover:bg-[#9D26FF] text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-110" aria-label="Previous Image">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/80 hover:bg-[#9D26FF] text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-110" aria-label="Next Image">
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {hasMultipleMedia && (
            <div className="flex items-center space-x-3 overflow-x-auto pt-4 pb-3 px-1 thin-scrollbar">
              {allOrderedItems.map((item, idx) => (
                <button
                  key={item.id || idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${idx === activeIndex ? "border-[#9D26FF] ring-2 ring-[#9D26FF]/50 scale-105 opacity-100" : "border-[var(--border)] opacity-60 hover:opacity-100"}`}
                >
                  <img
                    src={item.url || "/assets/portfolio-web-v4.jpg"}
                    alt={`Thumbnail ${idx + 1}`}
                    onError={(e) => { e.currentTarget.src = "/assets/portfolio-web-v4.jpg"; }}
                    className="w-full h-full object-cover"
                  />
                  {idx === 0 && (
                    <span className="absolute top-0.5 left-0.5 px-1 rounded bg-amber-500 text-black text-[8px] font-bold">Cover</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 5. BOTTOM CTA */}
        <section className="mt-16 py-12 px-6 sm:px-10 rounded-3xl bg-[var(--card)] border border-[var(--border)] text-center backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground-heading)] mb-3">
            Inspired by This {displayCategory} Showcase?
          </h2>
          <p className="text-[var(--foreground-muted)] text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Let Derixio engineering and design teams create a high-converting portfolio piece for your brand.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] hover:from-[#8B5CF6] hover:to-[#6D28D9] text-white font-bold rounded-2xl shadow-xl shadow-purple-950/60 transition-all duration-300 hover:scale-105 text-sm inline-flex items-center space-x-2"
            >
              <span>Request Project Proposal</span>
              <ArrowRight size={16} />
            </Link>
            <button
              onClick={handleBack}
              className="px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-[var(--foreground-muted)] hover:text-white font-bold text-sm transition-all"
            >
              Back to Portfolio
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
