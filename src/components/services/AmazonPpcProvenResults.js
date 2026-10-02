"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AmazonPpcProvenResults() {
  const stats = [
    {
      value: "$46.4K+",
      label: "Monthly Sales"
    },
    {
      value: "13.89%",
      label: "Lowest ACoS"
    },
    {
      value: "73% ↓",
      label: "ACoS Reduction"
    },
    {
      value: "37% ↑",
      label: "Ad Sales Growth"
    }
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-3 shadow-lg shadow-purple-950/40">
          <Sparkles size={12} className="text-[#9D26FF]" />
          <span>PROVEN RESULTS</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground-heading)] tracking-tight">
          Real Performance Across <span className="text-[#9D26FF]">Amazon PPC</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 text-center shadow-xl hover:border-[#9D26FF] transition-all duration-300 relative overflow-hidden group hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#9D26FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#9D26FF] via-[#C084FC] to-[#7C3AED] mb-2 tracking-tight">
              {stat.value}
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[var(--foreground-muted)] leading-snug">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
