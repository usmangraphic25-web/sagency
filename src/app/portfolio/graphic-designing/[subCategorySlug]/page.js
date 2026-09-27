"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, FolderOpen } from "lucide-react";
import { graphicDesignCategories, graphicDesignProjects } from "@/lib/graphicDesignData";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import ProjectShowcaseModal from "@/components/portfolio/ProjectShowcaseModal";

export default function GraphicDesignSubCategoryPortfolioPage({ params }) {
  const { subCategorySlug } = use(params);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  // Find target category info
  const categoryInfo = graphicDesignCategories.find(
    (c) => c.slug === subCategorySlug || (Array.isArray(c.altSlugs) && c.altSlugs.includes(subCategorySlug))
  );

  // Fetch dynamic projects from API
  useEffect(() => {
    async function fetchCategoryProjects() {
      try {
        setLoading(true);
        const res = await fetch(`/api/portfolio/projects?category=${subCategorySlug}&status=Published`);
        let fetchedData = [];
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            fetchedData = json.data;
          }
        }

        // Merge with static fallback showcase items for this subcategory if present
        const staticFallback = graphicDesignProjects.filter(
          (p) =>
            p.categorySlug === subCategorySlug ||
            (categoryInfo?.altSlugs && categoryInfo.altSlugs.includes(p.categorySlug))
        );

        const existingIds = new Set(fetchedData.map((p) => p.id));
        staticFallback.forEach((p) => {
          if (!existingIds.has(p.id)) {
            fetchedData.push({
              ...p,
              service: "Graphic Design",
              categoryName: categoryInfo?.name || "Graphic Design",
              published: true,
            });
          }
        });

        setProjects(fetchedData);
      } catch (err) {
        console.error("Error fetching portfolio projects:", err);
      } finally {
        setLoading(false);
      }
    }

    if (subCategorySlug) {
      fetchCategoryProjects();
    }
  }, [subCategorySlug, categoryInfo]);

  if (!categoryInfo) {
    return (
      <main className="min-h-screen bg-[var(--background)] pt-32 pb-24 text-center text-[var(--foreground)]">
        <h1 className="text-3xl font-extrabold mb-4 text-[var(--foreground-heading)]">Category Not Found</h1>
        <Link href="/portfolio/graphic-designing" className="text-[#9D26FF] hover:underline">
          Return to Graphic Design Categories
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] pt-20 md:pt-24 bg-agenko-grid overflow-hidden text-[var(--foreground)] flex flex-col justify-between">
      {/* Background Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#9D26FF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="g-px relative z-10 pt-6 pb-24 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <Link
          href="/portfolio/graphic-designing"
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-[var(--foreground-muted)] hover:text-[#9D26FF] transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Graphic Design Showcase</span>
        </Link>

        {/* Hero Header */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4 shadow-md">
            <Sparkles size={14} className="text-[#9D26FF]" />
            <span>GRAPHIC DESIGN • {categoryInfo.name}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight mb-4">
            {categoryInfo.name} <br />
            <span className="text-[#9D26FF]">
              Portfolio Showcase
            </span>
          </h1>

          <p className="text-[var(--foreground-muted)] text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Explore our high-converting, enterprise-grade creative deliverables crafted specifically for {categoryInfo.name}.
          </p>
        </div>

        {/* Projects Grid / Empty State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="rounded-2xl bg-[var(--card)] border border-[var(--border)] p-2 animate-pulse space-y-3"
              >
                <div className="w-full aspect-[808/632] bg-[var(--background-alt)] rounded-xl" />
                <div className="h-4 bg-[var(--background-alt)] rounded w-3/4" />
                <div className="h-3 bg-[var(--background-alt)] rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="max-w-xl mx-auto text-center bg-[var(--card)] border border-[var(--border)] rounded-3xl p-10 backdrop-blur-xl">
            <FolderOpen size={48} className="text-[#9D26FF] mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-extrabold text-[var(--foreground-heading)] mb-2">No Projects Uploaded Yet</h2>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] mb-6 leading-relaxed">
              There are currently no projects published under <span className="text-[#9D26FF] font-semibold">{categoryInfo.name}</span>. Upload projects directly from the Admin Panel.
            </p>
          </div>
        ) : (
          /* RESPONSIVE 4-COLUMN BEHANCE-STYLE PORTFOLIO GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <PortfolioCard
                key={project.id || index}
                project={{
                  ...project,
                  categoryName: categoryInfo.name,
                  service: "Graphic Design",
                }}
                priority={index < 4}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX SHOWCASE MODAL */}
      <ProjectShowcaseModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        categoryName={categoryInfo.name}
      />

      {/* Bottom Conversion CTA */}
      <section className="py-20 bg-[var(--card)] border-t border-[var(--border)] mt-auto">
        <div className="g-px text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--foreground-heading)] mb-4 tracking-tight">
            Ready for Custom <span className="text-[#9D26FF]">{categoryInfo.name}</span>?
          </h2>
          <p className="text-[var(--foreground-muted)] text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Let's design high-impact visuals that elevate your brand and maximize revenue.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 text-sm inline-block"
          >
            Start Your Design Project
          </Link>
        </div>
      </section>
    </main>
  );
}
