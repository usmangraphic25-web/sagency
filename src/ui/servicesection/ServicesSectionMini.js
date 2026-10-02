"use client";

import React from "react";
import { Search, Megaphone, Palette, Globe, TrendingUp, Clapperboard, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

const cards = [
  {
    title: 'Amazon Growth',
    description: 'Listings, A+ Content, storefronts, and PPC, managed end to end to lift your visibility, sales, and ROI on Amazon.',
    icon: TrendingUp,
    href: '/services/ecommerce-development',
    featured: true,
  },
  {
    title: 'Web Development',
    description: "Fast, custom Next.js websites that turn your brand's traffic into customers beyond Amazon.",
    icon: Globe,
    href: '/services/web-development',
  },
  {
    title: 'Graphic Design',
    description: 'Brand identity and visual design that keeps your brand sharp and consistent on every channel.',
    icon: Palette,
    href: '/services/graphic-designing',
  },
  {
    title: 'SEO',
    description: 'Technical and content SEO that raises your rankings and builds steady organic traffic.',
    icon: Search,
    href: '/services/seo-content-strategy',
  },
  {
    title: 'Digital Marketing',
    description: 'Data-driven campaigns that bring new customers to your brand across channels outside Amazon.',
    icon: Megaphone,
    href: '/services/digital-marketing',
  },
  {
    title: 'Video & Motion Design',
    description: 'Product videos, motion graphics, and edits made for social, ads, and brand campaigns.',
    icon: Clapperboard,
    href: '/services/video-editing',
  },
];

const CardGridTailwind = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const isFeatured = card.featured;

        return (
          <Link
            key={idx}
            href={card.href}
            className={`relative border shadow-lg rounded-3xl p-8 flex flex-col justify-between overflow-hidden group cursor-pointer w-full h-full transition-all duration-300 hover:-translate-y-1 ${
              isFeatured
                ? 'bg-[var(--card)] border-[#9D26FF] shadow-2xl shadow-[#9D26FF]/10 ring-1 ring-[#9D26FF]/40'
                : 'bg-[var(--card)] border-[var(--border)] hover:border-[#9D26FF]'
            }`}
          >
            <div className="glint-line" />

            <div>
              {/* Header Icon + Arrow */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-110 ${
                    isFeatured
                      ? 'bg-[#9D26FF] text-white'
                      : 'bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] group-hover:bg-[#9D26FF] group-hover:text-white'
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)] group-hover:text-[#9D26FF] group-hover:border-[#9D26FF] transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-extrabold text-lg sm:text-xl mb-3 text-[var(--foreground-heading)] tracking-tight group-hover:text-[#9D26FF] transition-colors">
                {card.title}
              </h3>
              <p className="text-[var(--foreground-muted)] text-xs sm:text-sm leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Accent border highlight on hover */}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#9D26FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl"></span>
          </Link>
        );
      })}
    </div>
  );
};

export default CardGridTailwind;