"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, FolderOpen, TrendingUp, ArrowRight, Layers, Layout, ShoppingBag, BarChart2, CheckCircle2 } from "lucide-react";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import { amazonGrowthCategories } from "@/lib/amazonGrowthData";
import { getValidImageUrl } from "@/lib/portfolioUtils";
import AmazonPpcProvenResults from "@/components/services/AmazonPpcProvenResults";
import AmazonConnectedWorkflow from "@/components/portfolio/AmazonConnectedWorkflow";

export default function AmazonGrowthPortfolioView() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(null);
  const [dbProjects, setDbProjects] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAmazonGrowthData() {
      try {
        setLoading(true);
        const [projRes, csRes] = await Promise.all([
          fetch("/api/portfolio/projects?status=Published"),
          fetch("/api/amazon-ppc")
        ]);

        if (projRes.ok) {
          const json = await projRes.json();
          if (json.success && Array.isArray(json.data)) {
            setDbProjects(json.data);
          }
        }

        if (csRes.ok) {
          const csJson = await csRes.json();
          if (csJson.success && Array.isArray(csJson.data)) {
            setCaseStudies(csJson.data);
          }
        }
      } catch (err) {
        console.error("Error loading Amazon Growth projects:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAmazonGrowthData();
  }, []);

  const amazonProjects = useMemo(() => {
    return dbProjects.filter(
      (p) =>
        !p.deleted &&
        p.published !== false &&
        (p.status || '').toUpperCase() !== "HIDDEN" &&
        ((p.service || "").toLowerCase().includes("amazon") ||
          (p.categorySlug || "").startsWith("amazon") ||
          (p.categorySlug || "").startsWith("a-plus"))
    );
  }, [dbProjects]);

  const categoryCounts = useMemo(() => {
    const counts = {
      "amazon-listing-images": 0,
      "a-plus-content": 0,
      "amazon-brand-store": 0,
      "amazon-campaigns": caseStudies.length
    };

    amazonProjects.forEach((p) => {
      const slug = p.categorySlug || p.subCategory;
      if (slug === "a-plus-content" || slug === "a-plus-content-storefront") {
        counts["a-plus-content"]++;
      } else if (slug === "amazon-brand-store") {
        counts["amazon-brand-store"]++;
      } else if (slug === "amazon-campaigns") {
        counts["amazon-campaigns"]++;
      } else {
        counts["amazon-listing-images"]++;
      }
    });

    return counts;
  }, [amazonProjects, caseStudies]);

  const currentItems = useMemo(() => {
    const mappedCaseStudies = caseStudies.map((cs) => {
      const imageUrl = getValidImageUrl(cs, "/assets/portfolio-amazon-v4.jpg");
      return {
        id: cs.id,
        isCaseStudy: true,
        title: cs.title,
        service: "Amazon Growth",
        categoryName: "Amazon Campaigns",
        categorySlug: "amazon-campaigns",
        slug: cs.slug,
        image: imageUrl,
        coverImage: imageUrl,
        shortDescription: cs.shortDescription || cs.summary,
        description: cs.fullCaseStudyData || cs.summary,
        client: cs.brandName,
        metrics: {
          acos: cs.acosImprovement,
          revenue: cs.revenueGrowth
        },
        caseStudyDetails: cs.caseStudyDetails,
        problem: cs.problem,
        solution: cs.solution,
        results: cs.results || cs.result
      };
    });

    if (!activeCategory) {
      return [...amazonProjects, ...mappedCaseStudies];
    }

    if (activeCategory === "amazon-campaigns") {
      return mappedCaseStudies;
    }

    return amazonProjects.filter((p) => {
      const slug = p.categorySlug || p.subCategory;
      if (activeCategory === "a-plus-content") {
        return slug === "a-plus-content" || slug === "a-plus-content-storefront";
      }
      if (activeCategory === "amazon-brand-store") {
        return slug === "amazon-brand-store";
      }
      return slug === "amazon-listing-images" || !slug;
    });
  }, [activeCategory, amazonProjects, caseStudies]);

  const activeCategoryObj = amazonGrowthCategories.find((c) => c.slug === activeCategory);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-24 pb-24 relative overflow-hidden bg-agenko-grid">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#9D26FF]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="g-px max-w-7xl mx-auto relative z-10">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-[var(--foreground-muted)] hover:text-[#9D26FF] transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main Portfolio Directory</span>
        </Link>

        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4 shadow-md">
            <Sparkles size={14} className="text-[#9D26FF]" />
            <span>AMAZON BRAND GROWTH HUB</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight mb-4">
            Amazon Growth <br />
            <span className="text-[#9D26FF]">Portfolio</span>
          </h1>

          <p className="text-[var(--foreground-muted)] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Listing Optimization, Premium A+ Content, Custom Brand Storefronts, and High-ROI Sponsored Ads PPC Campaigns.
          </p>
        </div>

        {/* Category Tabs Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-[var(--border)] pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-heading)]">
              {activeCategoryObj?.name || "All Amazon Growth Deliverables"}
            </h2>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">
              Select a category tab below to filter Amazon growth deliverables.
            </p>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === null
                  ? "bg-[#9D26FF] text-white"
                  : "bg-[var(--card)] text-[var(--foreground-muted)] border border-[var(--border)] hover:border-[#9D26FF]"
              }`}
            >
              All Deliverables
            </button>
            {amazonGrowthCategories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveCategory(c.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === c.slug
                    ? "bg-[#9D26FF] text-white"
                    : "bg-[var(--card)] text-[var(--foreground-muted)] border border-[var(--border)] hover:border-[#9D26FF]"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {currentItems.length === 0 ? (
          <div className="text-center py-20 bg-[var(--card)] rounded-3xl border border-[var(--border)] p-8">
            <FolderOpen size={40} className="text-[#9D26FF] mx-auto mb-3 opacity-60" />
            <h3 className="text-xl font-bold text-[var(--foreground-heading)] mb-1">No Projects Added Yet</h3>
            <p className="text-xs text-[var(--foreground-muted)] max-w-md mx-auto mb-6">
              Projects for this category will appear here soon.
            </p>
            <button
              onClick={() => setActiveCategory(null)}
              className="px-5 py-2.5 rounded-xl bg-[var(--background-alt)] border border-[var(--border)] text-xs font-bold text-[var(--foreground-heading)] hover:text-[#9D26FF]"
            >
              View All Categories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item, i) => (
              <PortfolioCard
                key={item.id || i}
                project={item}
                onClick={() => item.id && router.push(`/portfolio/project/${item.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
