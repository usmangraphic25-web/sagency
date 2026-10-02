"use client";
import React from "react";
import { Clock, Target, Users, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HowWeWorkCard = ({ card, index }) => {
  const IconComponent = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: "easeOut",
      }}
      className={`relative p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-[#9D26FF] shadow-lg overflow-hidden group h-full flex flex-col justify-between transition-all duration-300 ${card.highlight ? "border-[#9D26FF]/60" : ""}`}
    >
      <div className="glint-line" />

      <div>
        {/* Step Number Badge */}
        <div className="flex items-center justify-between mb-6">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 ${
              card.highlight
                ? "bg-[#9D26FF] text-white font-bold"
                : "bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF]"
            }`}
          >
            <IconComponent className="w-7 h-7" />
          </div>
          <span className="text-3xl font-black text-white group-hover:text-[#9D26FF] transition-colors font-mono">
            0{index + 1}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-extrabold mb-3 text-[var(--foreground-heading)] tracking-tight">
          {card.title}
        </h3>

        {/* Description */}
        <p className="leading-relaxed text-xs sm:text-sm text-[var(--foreground-muted)]">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
};

const HowWeWork = () => {
  return (
    <section className="relative w-full py-28 bg-[var(--background)] overflow-hidden bg-agenko-grid">
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#9D26FF]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="g-px relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} className="text-[#9D26FF]" />
            <span>DERIXIO METHODOLOGY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[var(--foreground-heading)] leading-tight tracking-tight">
            <span className="font-light">Our 4-Step Blueprint to </span><br className="hidden sm:inline" />
            <span className="font-extrabold text-[#9D26FF]">Real Growth</span>
          </h2>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howWeWorkCards.map((card, index) => (
            <HowWeWorkCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;

const howWeWorkCards = [
  {
    id: 1,
    title: "Discovery & Audit",
    description:
      "We analyze your Amazon listings, website, and market position to identify exactly where the growth opportunity is.",
    icon: Target,
    highlight: false,
  },
  {
    id: 2,
    title: "Strategy & Planning",
    description:
      "We map out the right approach — whether it's Amazon optimization, a new website, or a marketing plan — with clear timelines and priorities.",
    icon: Users,
    highlight: true,
  },
  {
    id: 3,
    title: "Execution & Craft",
    description:
      "Our team builds and delivers with precision — from Amazon listings and creatives to code and campaigns — matched to what each project needs.",
    icon: Clock,
    highlight: false,
  },
  {
    id: 4,
    title: "Launch & Growth",
    description:
      "We track real performance and continuously optimize for better rankings, conversions, and ROI.",
    icon: TrendingUp,
    highlight: true,
  },
];