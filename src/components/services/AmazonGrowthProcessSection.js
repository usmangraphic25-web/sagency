"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Layout, ShoppingBag, TrendingUp, CheckCircle, Sparkles, ArrowRight } from "lucide-react";

const processes = {
  "amazon-listing-images": {
    categoryName: "Amazon Listing Images",
    subtitle: "Our 5-Step Process for High-Converting Listing Graphics",
    icon: Layers,
    steps: [
      {
        number: "01",
        title: "Product & Category Audit",
        description: "We start by analyzing your product features, category benchmark listings, competitor image stacks, and main customer objections to establish what needs to be visually communicated."
      },
      {
        number: "02",
        title: "Visual Messaging Strategy",
        description: "We map out a 7-image sequence that addresses buyer intent—from high-impact main white background imagery and feature callouts to lifestyle context and infographics."
      },
      {
        number: "03",
        title: "Creative & Layout Direction",
        description: "Our design team plans the graphic hierarchy, visual callouts, typography choices, and color palette that align with Amazon’s visual standards while standing out in search results."
      },
      {
        number: "04",
        title: "Listing Graphic Production",
        description: "We design custom, pixel-perfect listing graphics that highlight key product specs, dimensional guides, comparison charts, and real-world usage scenarios."
      },
      {
        number: "05",
        title: "Compliance & Final Asset Export",
        description: "Every graphic is validated against Amazon image requirements, zoom resolution specs, and mobile rendering standards before delivering complete ready-to-upload files."
      }
    ]
  },
  "a-plus-content": {
    categoryName: "A+ Content",
    subtitle: "Our 5-Step Process for Enhanced Brand Content",
    icon: Layout,
    steps: [
      {
        number: "01",
        title: "Brand & Competitor Research",
        description: "We review top-ranking competitors in your niche, customer Q&A sections, and negative reviews across similar products to uncover what information buyers need before purchasing."
      },
      {
        number: "02",
        title: "Modular Storytelling Structure",
        description: "We select and structure the optimal combination of Amazon A+ Content modules to guide the customer from brand introduction down to product specs and cross-selling comparison tables."
      },
      {
        number: "03",
        title: "Copywriting & Benefit Mapping",
        description: "We write concise, persuasive copy optimized for natural reading flow and Amazon search intent, converting technical specifications into clear customer benefits."
      },
      {
        number: "04",
        title: "Custom Visual Design & Branding",
        description: "Our designers build bespoke banner graphics, feature highlight graphics, comparison charts, and brand story modules that elevate your brand image above competitor listings."
      },
      {
        number: "05",
        title: "Seller Central Review & Submission",
        description: "We format all assets for Seller Central submission, verify mobile and desktop preview responsiveness, and make final adjustments to ensure swift Amazon approval."
      }
    ]
  },
  "amazon-brand-store": {
    categoryName: "Amazon Brand Store",
    subtitle: "Our 5-Step Process for Amazon Storefront Design",
    icon: ShoppingBag,
    steps: [
      {
        number: "01",
        title: "Store Strategy & Catalog Architecture",
        description: "We audit your complete product line and organize your catalog into clear, intuitive sub-pages and category navigation that make multi-product browsing effortless."
      },
      {
        number: "02",
        title: "Shopper Journey & Layout Wireframing",
        description: "We map out the homepage hero banners, featured collection grids, best-seller sections, and video placements to guide shoppers through your complete brand catalog."
      },
      {
        number: "03",
        title: "Branded Graphic & Media Creation",
        description: "Our team designs high-resolution store header banners, lifestyle promotional tiles, category entry graphics, and custom visual modules matching your brand guidelines."
      },
      {
        number: "04",
        title: "Amazon Store Builder Implementation",
        description: "We configure the store within Amazon Store Builder, link product ASINs directly to custom tiles, set up deal modules, and format layouts for mobile and desktop screens."
      },
      {
        number: "05",
        title: "Store Launch & Performance Review",
        description: "After Amazon Store publication, we review Store Insights data to track traffic sources, page views, and sales, refining layouts as your product catalog expands."
      }
    ]
  },
  "amazon-campaigns": {
    categoryName: "Amazon Campaigns",
    subtitle: "Our 5-Step Process for PPC Advertising & Scaling",
    icon: TrendingUp,
    steps: [
      {
        number: "01",
        title: "Account & Ad Audit",
        description: "We analyze your historical ad spend, ACoS, TACoS, keyword performance, and campaign structure to identify wasted spend and immediate profitability opportunities."
      },
      {
        number: "02",
        title: "Keyword & Competitor Targeting",
        description: "Using advanced search volume tools, we build target keyword lists covering exact-match terms, competitor ASIN targets, and high-converting search intent."
      },
      {
        number: "03",
        title: "Structured Campaign Architecture",
        description: "We build isolated campaign structures for Sponsored Products, Sponsored Brands, and Sponsored Display, keeping automatic, exact, and phrase campaigns cleanly separated."
      },
      {
        number: "04",
        title: "Daily Bid & Budget Optimization",
        description: "We actively adjust bids based on conversion rate data, harvest profitable search terms, negate non-converting keywords, and reallocate ad budget toward top ROAS campaigns."
      },
      {
        number: "05",
        title: "Transparent Growth & ROAS Reporting",
        description: "You receive clear monthly performance breakdowns tracking ad sales, organic rank improvements, ACoS reduction, and ongoing strategic PPC recommendations."
      }
    ]
  }
};

export default function AmazonGrowthProcessSection() {
  const [activeTab, setActiveTab] = useState("amazon-listing-images");
  const currentProcess = processes[activeTab];
  const IconComponent = currentProcess.icon;

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-[var(--background-alt)] border-t border-b border-[var(--border)]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9D26FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="g-px max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--card)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4 shadow">
            <Sparkles size={14} className="text-[#9D26FF]" />
            <span>HOW WE EXECUTE AMAZON GROWTH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight mb-4">
            Our Amazon Growth <span className="text-[#9D26FF]">Workflows</span>
          </h2>

          <p className="text-[var(--foreground-muted)] text-sm sm:text-base leading-relaxed">
            Select an Amazon service below to see our step-by-step framework for listing graphics, A+ Content, storefront designs, and advertising campaigns.
          </p>
        </div>

        {/* SERVICE PROCESS CATEGORY TABS */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] backdrop-blur-xl">
            {Object.keys(processes).map((key) => {
              const item = processes[key];
              const isSelected = activeTab === key;
              const TabIcon = item.icon;

              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap flex items-center space-x-2 ${
                    isSelected
                      ? "bg-[#9D26FF] text-white shadow-lg shadow-[#9D26FF]/20"
                      : "text-[var(--foreground-muted)] hover:text-[var(--foreground-heading)] hover:bg-[var(--background-alt)]"
                  }`}
                >
                  <TabIcon size={14} />
                  <span>{item.categoryName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PROCESS STEPS DISPLAY */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="max-w-5xl mx-auto"
          >
            {/* Process Subtitle Header */}
            <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-[var(--border)]">
              <div className="w-10 h-10 rounded-xl bg-[#9D26FF]/15 border border-[#9D26FF]/30 flex items-center justify-center text-[#9D26FF]">
                <IconComponent size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground-heading)]">
                  {currentProcess.categoryName} Process
                </h3>
                <p className="text-xs text-[var(--foreground-muted)]">
                  {currentProcess.subtitle}
                </p>
              </div>
            </div>

            {/* Steps Timeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProcess.steps.map((step, idx) => (
                <div
                  key={step.number}
                  className="bg-[var(--card)] border border-[var(--border)] hover:border-[#9D26FF]/50 rounded-2xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
                >
                  <div>
                    {/* Step Number Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-[#9D26FF]">
                        {step.number}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[var(--foreground-heading)] group-hover:text-[#9D26FF] transition-colors mb-3">
                      {step.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
