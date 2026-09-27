"use client";
import React from "react";
import { motion } from "framer-motion";
import Button, { SecondButton } from "../btn/Button";
import { XCircle, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section
      className="relative w-full overflow-hidden py-24 bg-[var(--background)] bg-agenko-grid"
    >
      {/* Content Box */}
      <div
        className="relative z-10 px-6 py-20 text-center overflow-hidden border-y border-[var(--border)] bg-[var(--card)]"
      >
        {/* Ambient Backlight Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9D26FF]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[#9D26FF] text-sm font-bold uppercase tracking-widest mb-4">
            Have A Project In Mind?
          </p>
          <h2 className="text-[var(--foreground-heading)] text-4xl sm:text-5xl md:text-6xl leading-tight mb-8">
            <span className="font-light">Let&apos;s Build Something </span><br className="hidden sm:inline" />
            <span className="font-extrabold text-[#9D26FF]">Extraordinary Together</span>
          </h2>
          <SecondButton text={"Start Your Project"} href={"/contact"} />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

export const CallToActionS = () => {
  const servicesData = [
    {
      id: "ppc",
      title: "PPC / Ad Management",
      problems: [
        "High ACoS bleeding profits without clear returns",
        "Wasted ad budget on non-converting search terms",
        "Unstructured campaigns with poor keyword targeting",
        "Inability to scale Sponsored Products & Display ads",
        "Inefficient bidding strategies eating into margins",
        "Competitors dominating top sponsored placements",
      ],
      solutions: [
        "Data-driven PPC campaign restructuring & isolation",
        "Aggressive negative keyword harvesting to cut waste",
        "Targeted long-tail & high-converting keyword focus",
        "Multi-ad format strategy (Products, Brands & Display)",
        "Profit-oriented algorithmic bid management",
        "Top-of-search dominance for key conversion terms",
      ],
    },
    {
      id: "listing",
      title: "Listing Images & Creatives",
      problems: [
        "Generic main images that fail to generate clicks",
        "Secondary graphics that don't highlight key benefits",
        "Outdated visuals losing sales to top competitors",
        "Unclear product sizing, dimensions, and usage callouts",
        "Low conversion rate despite steady listing traffic",
        "Visuals fail to build premium brand trust",
      ],
      solutions: [
        "High-CTR 2000x2000px hero image design",
        "Persuasive feature & infographic stack visuals",
        "Studio 3D renders & lifestyle imagery overhaul",
        "Clear dimension maps and comparison callouts",
        "Conversion-engineered image flow to drive orders",
        "Premium visual branding that elevates price authority",
      ],
    },
    {
      id: "aplus",
      title: "A+ Content / Brand Store",
      problems: [
        "Plain text product descriptions ignored by buyers",
        "Missed cross-sell opportunities for related items",
        "Weak brand story failing to create repeat customers",
        "Lack of high-res module layouts and comparison tables",
        "Unoptimized or missing Amazon Brand Storefront",
        "High bounce rate on detail pages with poor trust signals",
      ],
      solutions: [
        "Custom Premium A+ Content with rich visual modules",
        "Interactive cross-sell tables boosting multi-item sales",
        "Compelling Brand Story section building customer loyalty",
        "High-contrast 2000px graphics with benefit badges",
        "Immersive Amazon Brand Storefront architecture",
        "Strong conversion architecture that keeps buyers engaged",
      ],
    },
    {
      id: "graphic",
      title: "Graphic Design",
      problems: [
        "Inconsistent brand visuals failing to make an impact",
        "Outdated product graphics losing sales to competitors",
        "Lack of cohesive 3D renders, vector logos, and visual guides",
        "Social media and ad creatives fail to capture attention",
        "Product packaging fails to build premium brand authority",
        "Brand identity looks less professional than rivals",
      ],
      solutions: [
        "Consistent, high-impact brand visual identity system",
        "3D product renders and photorealistic packaging designs",
        "Creative vector logos, typography, and color tokens",
        "Scroll-stopping marketing & social ad graphics",
        "Premium packaging and print asset design suites",
        "Elevated brand authority that drives customer trust",
      ],
    },
    {
      id: "web-dev",
      title: "Website Development",
      problems: [
        "Outdated website design that loses visitor trust",
        "High mobile cart abandonment and slow page loads",
        "Confusing site navigation with weak calls-to-action",
        "Disconnect between Amazon brand and DTC storefront",
        "Poor SEO structure limiting organic Google traffic",
        "Low visitor-to-lead conversion rates",
      ],
      solutions: [
        "Modern Next.js & Shopify custom storefront design",
        "Mobile-first responsive UX with sub-second speed",
        "Streamlined checkout funnels and clear CTAs",
        "Seamless brand alignment across Amazon and DTC web",
        "Technical SEO optimization for search visibility",
        "High-converting landing pages built for revenue",
      ],
    },
    {
      id: "video",
      title: "Video Content",
      problems: [
        "Product videos fail to grab attention in first 3 seconds",
        "Generic editing that fails to show key features",
        "Low click-through rates on Amazon Sponsored Video ads",
        "Inconsistent visual style across video campaigns",
        "High video production cost with poor sales returns",
        "Videos generate views but fail to convert to sales",
      ],
      solutions: [
        "Scroll-stopping hooks engineered for immediate interest",
        "High-impact 3D product renders and commercial edits",
        "Optimized Amazon Sponsored Video ad creatives",
        "Consistent branded visual identity and motion graphics",
        "Cost-effective high-ROI video production workflow",
        "Conversion-focused video stories built for sales action",
      ],
    },
  ];

  const [activeServiceIdx, setActiveServiceIdx] = React.useState(0);
  const activeService = servicesData[activeServiceIdx];

  const handleNextService = () => {
    setActiveServiceIdx((prev) => (prev + 1) % servicesData.length);
  };

  const handlePrevService = () => {
    setActiveServiceIdx((prev) => (prev - 1 + servicesData.length) % servicesData.length);
  };

  return (
    <section className="relative w-full py-16 sm:py-20 bg-[var(--background)] bg-agenko-grid">
      {/* Content Container with Scroll-Reveal Animation */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 text-center max-w-7xl mx-auto px-4 sm:px-6"
      >
        {/* Eyebrow Label */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--card)]/80 border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4 shadow-xs">
          <span>SOUND FAMILIAR?</span>
        </div>

        {/* Headline — Slightly enlarged ~6% for premium desktop impact */}
        <h2 className="text-[var(--foreground-heading)] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold leading-tight mb-9 max-w-5xl mx-auto tracking-tight">
          Every Problem Has A Solution — <span className="text-[#9D26FF]">And We've Built Yours.</span>
        </h2>

        {/* Structured 2-Card Grid — Slightly enlarged ~6% card dimensions & padding */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-9 text-left items-stretch">
          {/* Left Card: THE PROBLEM */}
          <div className="p-6 sm:p-7 md:p-8 rounded-3xl bg-[var(--card)]/80 border border-[var(--border)] relative overflow-hidden flex flex-col h-full shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-400">
                THE PROBLEM
              </span>
              <span className="text-xs sm:text-sm text-[var(--foreground-muted)] font-normal">
                {activeService.title}
              </span>
            </div>

            <ul className="space-y-3.5 sm:space-y-4 flex-1 flex flex-col justify-start">
              {activeService.problems.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm md:text-[16.5px] text-[var(--foreground-muted)] font-normal leading-relaxed">
                  <XCircle size={18} className="text-amber-500/90 dark:text-amber-400/90 shrink-0 mt-0.5" />
                  <span className="font-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Card: THE DERIXIO SOLUTION */}
          <div className="p-6 sm:p-7 md:p-8 rounded-3xl bg-[var(--card)]/80 border border-[#9D26FF]/30 relative overflow-hidden flex flex-col h-full shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#9D26FF]/10 border border-[#9D26FF]/30 text-[#9D26FF]">
                THE DERIXIO SOLUTION
              </span>
              <span className="text-xs sm:text-sm text-[#9D26FF] font-normal">
                {activeService.title}
              </span>
            </div>

            <ul className="space-y-3.5 sm:space-y-4 flex-1 flex flex-col justify-start">
              {activeService.solutions.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm md:text-[16.5px] text-[var(--foreground-subtle)] font-normal leading-relaxed">
                  <CheckCircle2 size={18} className="text-[#9D26FF] shrink-0 mt-0.5" />
                  <span className="font-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Visual Services Flow Bar — Strict Single Line Horizontal Row */}
        <div className="w-full max-w-6xl mx-auto mb-8 sm:mb-10 p-1.5 sm:p-2 md:p-2.5 rounded-2xl bg-[var(--card)]/80 border border-[var(--border)] relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-0.5 px-0.5 gap-1 sm:gap-1.5 md:gap-2 font-medium w-full whitespace-nowrap flex-nowrap">
            {/* Left Arrow & Struggling Business Badge */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
              <div className="px-2 sm:px-2.5 md:px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-400 font-bold whitespace-nowrap text-[8px] sm:text-[8.5px] md:text-[9px] lg:text-[9.5px] w-max min-w-max inline-flex items-center justify-center shrink-0">
                Struggling business
              </div>
              <button
                onClick={handlePrevService}
                className="p-1 text-[var(--foreground-muted)] hover:text-[#9D26FF] hover:scale-110 transition-all duration-200 shrink-0 cursor-pointer"
                aria-label="Previous Service"
                title="Previous Service"
              >
                <ArrowRight size={13} className="rotate-180" />
              </button>
            </div>

            {/* 6 Service Tabs */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 shrink-0">
              {servicesData.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveServiceIdx(idx)}
                  className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[8.5px] md:text-[9px] lg:text-[9.5px] font-semibold whitespace-nowrap transition-all duration-300 shrink-0 cursor-pointer w-max min-w-max inline-flex items-center justify-center ${
                    activeServiceIdx === idx
                      ? "bg-[var(--card-hover)] text-[#9D26FF] border border-[#9D26FF]/50 shadow-sm scale-105"
                      : "bg-[var(--card-alt)] text-[var(--foreground-muted)] hover:text-[var(--foreground-heading)] border border-[var(--border)] hover:border-[#9D26FF]/30"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>

            {/* Right Arrow & Consistent Growth Badge */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
              <button
                onClick={handleNextService}
                className="p-1 text-[#9D26FF] hover:text-[#8B5CF6] hover:scale-110 transition-all duration-200 shrink-0 cursor-pointer"
                aria-label="Next Service"
                title="Next Service"
              >
                <ArrowRight size={13} />
              </button>
              <div className="px-2 sm:px-2.5 md:px-3 py-1 rounded-full bg-[#9D26FF]/10 border border-[#9D26FF]/30 text-[#9D26FF] font-extrabold whitespace-nowrap text-[8px] sm:text-[8.5px] md:text-[9px] lg:text-[9.5px] w-max min-w-max inline-flex items-center justify-center shrink-0">
                Consistent growth
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button — Clean Vertical Spacing Below Flow Bar */}
        <div className="flex justify-center pt-3 sm:pt-6">
          <Button text={"Get Free Consultation"} href={"/contact"} />
        </div>
      </motion.div>
    </section>
  );
};