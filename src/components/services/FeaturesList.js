"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Film, Zap, Sparkles, Play, ShoppingBag,
  TrendingUp, Code, Search, Palette, Globe, BarChart,
  ShoppingCart, Store, ShieldCheck, Target, Megaphone, Clapperboard
} from 'lucide-react';

const iconMap = {
  Film,
  Zap,
  Sparkles,
  Play,
  ShoppingBag,
  TrendingUp,
  Code,
  Search,
  Palette,
  Globe,
  BarChart,
  CheckCircle2,
  ShoppingCart,
  Store,
  ShieldCheck,
  Target,
  Megaphone,
  Clapperboard
};

const FeaturesList = ({ features }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-20 sm:py-24 px-6 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-3">DERIXIO CAPABILITIES</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--foreground-heading)]">
            Included Deliverables & Features
          </h2>
          <p className="text-[var(--foreground-muted)] mt-4 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            Every service package is built with end-to-end deliverables designed to drive performance and measurable return on investment.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => {
            const IconComponent = (feature.icon && iconMap[feature.icon]) ? iconMap[feature.icon] : CheckCircle2;
            const tagLabel = feature.tag || `Deliverable #${index + 1}`;

            return (
              <motion.div
                key={index}
                className="bg-[var(--card)] backdrop-blur-md border border-[var(--border)] rounded-3xl p-6 sm:p-8 text-left group transition-all duration-300 hover:border-[#9D26FF]/60 hover:bg-[var(--card)] shadow-xl flex flex-col justify-between h-full"
                variants={itemVariants}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-[var(--background-alt)] rounded-2xl flex items-center justify-center border border-[var(--border)] group-hover:border-[#9D26FF] transition-all duration-300 shadow-md group-hover:scale-105 group-hover:bg-gradient-to-r group-hover:from-[#9D26FF] group-hover:to-[#7C3AED]">
                      <IconComponent className="w-6 h-6 text-[#9D26FF] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-muted)] px-3 py-1 rounded-full bg-[var(--background-alt)] border border-[var(--border)] group-hover:border-[#9D26FF]/40 group-hover:text-[#9D26FF] transition-colors">
                      {tagLabel}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground-heading)] mb-3 group-hover:text-[#9D26FF] transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-[var(--foreground-muted)] text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesList;
