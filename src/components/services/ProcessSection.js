"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const ProcessSection = ({ process = [] }) => {
  if (!process || process.length === 0) return null;

  return (
    <section className="py-20 sm:py-24 px-6 bg-[var(--background-alt)] border-t border-b border-[var(--border)] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#9D26FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--card)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles size={14} />
            <span>HOW WE DELIVER RESULTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--foreground-heading)] tracking-tight">
            Our 4-Step <span className="text-[#9D26FF]">Execution Framework</span>
          </h2>
          <p className="text-[var(--foreground-muted)] mt-4 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A structured, repeatable methodology engineered to take your project from initial discovery to measurable growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {process.map((stepItem, index) => (
            <motion.div
              key={index}
              className="bg-[var(--card)] border border-[var(--border)] hover:border-[#9D26FF]/50 rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Step Number & Connector */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-[#9D26FF]">
                    {stepItem.step || `0${index + 1}`}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--foreground-heading)] group-hover:text-[#9D26FF] transition-colors mb-3">
                  {stepItem.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {stepItem.description}
                </p>
              </div>

              {index < process.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#9D26FF]/40 pointer-events-none">
                  <ArrowRight size={18} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
