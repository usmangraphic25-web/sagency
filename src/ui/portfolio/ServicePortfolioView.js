"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  PlusCircle,
  Star,
  Video,
  Play,
  Layers,
  Globe,
  TrendingUp,
  BarChart2,
  Code
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getProjectAspectRatioClass, getValidImageUrl } from "@/lib/portfolioUtils";

export default function ServicePortfolioView({ category, initialProjects }) {
  const router = useRouter();
  const [projects] = useState(initialProjects || []);

  const handleOpenLightbox = (index) => {
    const project = projects[index];
    if (project?.id) {
      router.push(`/portfolio/project/${project.id}`);
    }
  };


  return (
    <main className="min-h-screen bg-[var(--background)] pt-20 md:pt-24 bg-agenko-grid overflow-hidden text-[var(--foreground)] flex flex-col justify-between">
      {/* Background Radial Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#9D26FF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="g-px relative z-10 pt-6 pb-24 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-[var(--foreground-muted)] hover:text-[#9D26FF] transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main Portfolio Directory</span>
        </Link>

        {/* Hero Header */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4 shadow-md">
            <Sparkles size={14} className="text-[#9D26FF]" />
            <span>{category.name} Portfolio Showcase</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight mb-4">
            {category.name} <br />
            <span className="text-[#9D26FF]">
              Projects Showcase
            </span>
          </h1>

          <p className="text-[var(--foreground-muted)] text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {category.description || `Explore our high-performance, enterprise-grade ${category.name} deliverables.`}
          </p>
        </div>

        {/* Projects Grid / Empty State */}
        {projects.length === 0 ? (
          <div className="max-w-xl mx-auto text-center bg-[var(--card)] border border-[var(--border)] rounded-3xl p-10 backdrop-blur-xl">
            <FolderOpen size={48} className="text-[#9D26FF] mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-extrabold text-[var(--foreground-heading)] mb-2">No Projects Uploaded Yet</h2>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] mb-6 leading-relaxed">
              There are currently no published projects under <span className="text-[#9D26FF] font-semibold">{category.name}</span>. Upload projects directly from the Admin Panel.
            </p>
            <Link
              href="/admin/leads"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold text-xs shadow-xl transition-all hover:scale-105"
            >
              <PlusCircle size={16} />
              <span>Upload Project in Admin Panel</span>
            </Link>
          </div>
        ) : (
          /* PREMIUM 3-COLUMN DESKTOP PORTFOLIO GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const mediaCount = project.mediaItems?.length || project.gallery?.length || 1;
              const coverUrl = getValidImageUrl(project, '/assets/portfolio-web-v4.jpg');
              const isVideoProject = category.name === 'Video & Motion Design' || project.mediaType === 'video';
              const aspectClass = getProjectAspectRatioClass({ ...project, service: project.service || category.name });

              return (
                <motion.div
                  key={project.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => handleOpenLightbox(index)}
                  className="bg-[var(--card)] border border-[var(--border)] hover:border-[#9D26FF] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col justify-between group cursor-pointer"
                >
                  {/* Card Thumbnail Header */}
                  <div
                    onClick={() => handleOpenLightbox(index)}
                    className={`relative w-full ${aspectClass} bg-[var(--background-alt)] overflow-hidden cursor-pointer`}
                  >
                    <Image
                      src={coverUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Subtle Gradient & Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Video Play Icon Indicator for Video Projects */}
                    {isVideoProject && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-[#9D26FF]/90 text-white flex items-center justify-center shadow-2xl border border-white/20 group-hover:scale-110 transition-transform">
                          <Play size={24} className="ml-1" fill="currentColor" />
                        </div>
                      </div>
                    )}

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3.5 right-3.5 z-10 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/90 border border-amber-400/50 text-black text-[10px] font-bold shadow-lg">
                        <Star size={11} fill="currentColor" />
                        <span>Featured</span>
                      </div>
                    )}

                    {/* Multi-Media Count Badge */}
                    {mediaCount > 1 && (
                      <div className="absolute top-3.5 left-3.5 z-10 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-black/80 border border-white/20 text-white text-[10px] font-semibold backdrop-blur-md">
                        <Layers size={11} className="text-[#9D26FF]" />
                        <span>{mediaCount} Items</span>
                      </div>
                    )}

                    {/* Hover Expand Icon (Appears ONLY on hover) */}
                    {!isVideoProject && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#9D26FF] text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <Maximize2 size={20} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Body Content */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-xl font-extrabold text-[var(--foreground-heading)] mb-2 group-hover:text-[#9D26FF] transition-colors line-clamp-1">
                        {project.title}
                      </h3>

                      {project.description && (
                        <p className="text-xs text-[var(--foreground-muted)] mb-6 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                    </div>

                    {/* Service & Subcategory Badges + View Button */}
                    <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between mt-auto">
                      <div className="flex flex-col items-start space-y-1">
                        <span className="text-[11px] font-bold text-[var(--foreground-muted)] uppercase tracking-wider">
                          {category.name}
                        </span>
                        {project.categoryName && (
                          <span className="text-[10px] text-[#9D26FF] font-medium">
                            {project.categoryName}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleOpenLightbox(index)}
                        className="inline-flex items-center text-xs font-bold text-[#9D26FF] hover:text-[#8500ED] transition-colors space-x-1"
                      >
                        <span>View Project</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* PROJECT DETAIL — cards navigate to /portfolio/project/[id]  */}
      {/* ========================================================= */}

      {/* Bottom Conversion CTA */}
      <section className="py-20 bg-[var(--card)] border-t border-[var(--border)] mt-auto">
        <div className="g-px text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--foreground-heading)] mb-4 tracking-tight">
            Ready to Build Your <span className="text-[#9D26FF]">{category.name}</span> Project?
          </h2>
          <p className="text-[var(--foreground-muted)] text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Partner with Derixio to deliver high-converting digital assets tailored to your business goals.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 text-sm inline-block"
          >
            Start Your Project Now
          </Link>
        </div>
      </section>
    </main>
  );
}
