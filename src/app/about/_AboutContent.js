"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, Users, Award, ShieldCheck, Zap } from 'lucide-react';
import TeamSection from '../../ui/team/TeamSection';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden pt-20 bg-agenko-grid">
      {/* Hero About Section */}
      <section className="relative pt-10 pb-20 bg-[var(--background)]">
        {/* Background Radial Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#9D26FF]/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Main Content Container */}
        <div className="relative z-10 g-px">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles size={14} className="text-[#9D26FF]" />
              <span>ABOUT DERIXIO</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl text-[var(--foreground-heading)] leading-tight tracking-tight">
              <span className="font-light">Engineering Digital </span>
              <span className="font-extrabold text-[var(--foreground-heading)]">Brilliance </span><br />
              <span className="font-extrabold text-[#9D26FF]">For Next-Gen Enterprises</span>
            </h1>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl text-[var(--foreground-heading)] mb-6 leading-tight tracking-tight">
                  <span className="font-light">Transforming Visions Into </span>
                  <span className="font-extrabold text-[#9D26FF]">Scalable Reality</span>
                </h2>
                
                <p className="text-[var(--foreground-muted)] text-lg leading-relaxed mb-6">
                  Derixio is a premier digital innovation studio specializing in Amazon brand growth, Web Development, bespoke UI/UX, e-commerce development, and high-performance digital marketing campaigns.
                </p>
                
                <p className="text-[var(--foreground-muted)] leading-relaxed">
                  Our mission is simple: deliver high-impact digital products that scale customer acquisition, elevate brand reputation, and maximize enterprise growth. We combine technical rigor with artistic design.
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                <motion.div
                  className="text-center bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)] shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="text-3xl font-extrabold text-[var(--foreground-heading)] mb-1">150+</div>
                  <div className="text-xs text-[var(--foreground-muted)] font-semibold uppercase tracking-wider">Projects Delivered</div>
                </motion.div>
                <motion.div
                  className="text-center bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)] shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="text-3xl font-extrabold text-[#9D26FF] mb-1">2+</div>
                  <div className="text-xs text-[var(--foreground-muted)] font-semibold uppercase tracking-wider">Years Experience</div>
                </motion.div>
                <motion.div
                  className="text-center bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)] shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="text-3xl font-extrabold text-[var(--foreground-heading)] mb-1">99%</div>
                  <div className="text-xs text-[var(--foreground-muted)] font-semibold uppercase tracking-wider">Client Retention</div>
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <a href="/contact" className="group relative inline-flex items-center px-8 py-4 bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105">
                  <span>Start Your Project</span>
                  <ArrowRight 
                    size={20} 
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-300 text-white" 
                  />
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Area */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <div className="relative h-[480px] rounded-3xl overflow-hidden bg-[var(--card)] border border-[var(--border)] shadow-2xl p-8 flex items-center justify-center text-center">
                <div className="glint-line" />
                <div className="space-y-6 relative z-10">
                  <div className="w-24 h-24 bg-[#9D26FF] rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-[#9D26FF]/20">
                    <Sparkles size={44} className="text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-extrabold text-[var(--foreground-heading)]">Innovation First</h3>
                    <p className="text-[var(--foreground-muted)] text-base leading-relaxed max-w-sm mx-auto">
                      Derixio merges cutting-edge software architecture with high-conversion visual design and data-driven Amazon growth strategies to deliver maximum enterprise ROI.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                className="hidden sm:flex absolute -bottom-6 -left-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 shadow-2xl z-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#9D26FF] rounded-xl flex items-center justify-center">
                    <Target size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[var(--foreground-heading)] font-bold text-sm">Goal Driven</div>
                    <div className="text-[var(--foreground-muted)] text-xs">Measurable Metrics</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="hidden sm:flex absolute -top-6 -right-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 shadow-2xl z-20"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#9D26FF] rounded-xl flex items-center justify-center">
                    <Users size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[var(--foreground-heading)] font-bold text-sm">Senior Engineers</div>
                    <div className="text-[var(--foreground-muted)] text-xs">World-Class Craft</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="hidden sm:flex absolute -bottom-6 -right-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 shadow-2xl z-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#9D26FF] rounded-xl flex items-center justify-center">
                    <Award size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[var(--foreground-heading)] font-bold text-sm">Amazon Growth Experts</div>
                    <div className="text-[var(--foreground-muted)] text-xs">Certified & Proven</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Values Section */}
      <section className="relative py-24 bg-[var(--background-alt)] border-t border-[var(--border)]">
        <div className="g-px">
          <motion.div
            className="text-center mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--card)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4">
              <span>OUR CORE PHILOSOPHY</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[var(--foreground-heading)] mb-4 tracking-tight">
              Why Partner With <span className="text-[#9D26FF]">Derixio?</span>
            </h2>
            <p className="text-[var(--foreground-muted)] text-base sm:text-lg leading-relaxed">
              We craft full-scale digital systems engineered to elevate user engagement, performance, and long-term enterprise brand value.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Creative Excellence",
                description: "We combine strong design with technical skill to create listings, brands, and websites that stand out."
              },
              {
                icon: Target,
                title: "Results Focused",
                description: "Every project is planned around clear performance metrics, so you can see the return on your investment."
              },
              {
                icon: Users,
                title: "Strategic Partnership",
                description: "We work as an extension of your team, with open communication and ongoing support."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-[var(--card)] rounded-3xl p-8 border border-[var(--border)] shadow-xl relative overflow-hidden group hover:border-[#9D26FF]/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              >
                <div className="glint-line" />
                <div className="w-14 h-14 bg-[#9D26FF] rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <item.icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-[var(--foreground-heading)] mb-3 tracking-tight">{item.title}</h3>
                <p className="text-[var(--foreground-muted)] leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />
    </main>
  );
};

export default AboutPage;
