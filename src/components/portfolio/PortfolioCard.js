"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getProjectAspectRatioClass, getCategoryDisplayName, getValidImageUrl } from "@/lib/portfolioUtils";

export default function PortfolioCard({ project, onClick, onOpenModal, priority = false }) {
  if (!project) return null;

  const handleCardClick = (e) => {
    if (typeof onClick === 'function') onClick(e);
    if (typeof onOpenModal === 'function') onOpenModal(project);
  };

  const defaultFallback = (project.service || "").toLowerCase().includes("amazon")
    ? "/assets/portfolio-amazon-v4.jpg"
    : "/assets/portfolio-web-v4.jpg";

  const resolvedUrl = getValidImageUrl(project, defaultFallback);
  const [imgSrc, setImgSrc] = useState(resolvedUrl);

  useEffect(() => {
    setImgSrc(getValidImageUrl(project, defaultFallback));
  }, [project, defaultFallback]);

  // Category / Service label to display (exact subcategory mapping)
  const categoryDisplay = getCategoryDisplayName(project);

  const aspectClass = getProjectAspectRatioClass(project);

  return (
    <div
      onClick={handleCardClick}
      className="group relative cursor-pointer flex flex-col w-full rounded-2xl bg-[var(--card)] hover:bg-[var(--card)] border border-[var(--border)] hover:border-[#9D26FF] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-950/50 overflow-hidden"
    >
      {/* CARD IMAGE CONTAINER - Service-specific & flexible video aspect ratio */}
      <div className={`relative w-full ${aspectClass} overflow-hidden rounded-xl bg-[var(--background)] m-1.5 mb-0 max-w-[calc(100%-12px)]`}>
        <Image
          src={imgSrc}
          alt={project.title || "Portfolio Project"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
          onError={() => setImgSrc(defaultFallback)}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-104"
        />

        {/* Subtle Dark Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b12]/90 via-[#080b12]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Purple Derixio Accent Arrow Badge */}
        <div className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-[var(--background)]/80 backdrop-blur-md border border-[var(--border)] text-white group-hover:border-[#9D26FF] group-hover:bg-gradient-to-r group-hover:from-[#9D26FF] group-hover:to-[#7C3AED] flex items-center justify-center transition-all duration-300 transform translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg">
          <ArrowUpRight size={18} />
        </div>
      </div>

      {/* CARD CONTENT BELOW IMAGE - Title & Service/Category ONLY (NO CLIENT NAME) */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--foreground-heading)] group-hover:text-[#9D26FF] transition-colors line-clamp-1 leading-snug">
            {project.title}
          </h3>

          <div className="flex items-center mt-1.5 space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9D26FF] inline-block" />
            <span className="text-xs sm:text-sm font-medium text-[var(--foreground-muted)] group-hover:text-[var(--foreground-muted)] transition-colors line-clamp-1">
              {categoryDisplay}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
