import {
  ShoppingBag,
  Layers,
  UserCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import React from 'react';
import { motion } from "framer-motion";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className = "",
  highlighted = false,
}) => {
  const cardStyles = highlighted
    ? "bg-[#9D26FF] text-white shadow-2xl border border-[#9D26FF]"
    : "bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] shadow-lg";

  const textStyles = highlighted ? "text-purple-100" : "text-[var(--foreground-muted)]";
  const iconStyles = highlighted
    ? "text-white bg-white/20"
    : "text-[#9D26FF] bg-[var(--background-alt)] border border-[var(--border)]";

  return (
    <motion.div
      className={`relative flex h-full flex-col justify-between rounded-3xl p-7 sm:p-8 ${cardStyles} ${className} group overflow-hidden transition-all duration-300 hover:-translate-y-1`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="glint-line" />
      <div>
        <div
          className={`mb-6 flex items-center justify-center w-14 h-14 rounded-2xl ${iconStyles} transition-all duration-300 shadow-md group-hover:scale-110`}
        >
          <Icon size={28} />
        </div>

        <h3 className={`mb-3 text-lg sm:text-xl font-extrabold tracking-tight ${highlighted ? "text-white" : "text-[var(--foreground-heading)]"}`}>{title}</h3>

        {description && (
          <p className={`text-xs sm:text-sm leading-relaxed ${textStyles}`}>{description}</p>
        )}
      </div>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  return (
    <div className="flex min-h-screen w-full py-24 sm:py-32 bg-[var(--background)] relative overflow-hidden bg-agenko-grid">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9D26FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <main className="w-full relative z-10">
        <section className="g-px">
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Main Section Header */}
            <motion.div
              className="md:col-span-2 lg:col-span-4 lg:row-span-1 flex flex-col justify-center"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4 w-max shadow-sm">
                <Sparkles size={14} className="text-[#9D26FF]" />
                <span>WHY DERIXIO</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-tight text-[var(--foreground-heading)] leading-[1.15]">
                <span className="font-light">Built to Grow </span><br />
                <span className="font-extrabold text-[#9D26FF]">Your Brand —</span><br />
                <span className="font-light">From Amazon to </span><br />
                <span className="font-extrabold">Everywhere Else.</span>
              </h2>
              <p className="text-[var(--foreground-muted)] mt-4 text-xs sm:text-sm leading-relaxed">
                We pair deep Amazon expertise with full-stack execution: websites, branding, SEO, video, and marketing. Your brand grows on every channel it needs.
              </p>
            </motion.div>

            {/* Feature Cards */}
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}

            {/* CTA Bento Card */}
            <motion.div
              className="flex h-full flex-col justify-between rounded-3xl p-8 sm:p-10 md:col-span-2 lg:col-span-8 bg-[var(--card)] border border-[var(--border)] relative overflow-hidden group shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            >
              <div className="glint-line" />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
                <div>
                  <p className="text-[#9D26FF] font-medium mb-2 text-xs uppercase tracking-wider">
                    READY TO SCALE YOUR DIGITAL PRESENCE?
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-heading)] leading-tight">
                    Let&apos;s build your next breakthrough.
                  </h3>
                </div>

                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="/contact"
                    aria-label="Get Free Consultation"
                    className="inline-flex items-center px-6 py-3.5 rounded-2xl bg-[#9D26FF] text-white font-extrabold text-sm shadow-xl transition-all hover:bg-[#8500ED] whitespace-nowrap"
                  >
                    <span>Get Free Consultation</span>
                    <ArrowRight size={20} className="ml-2" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default WhyChooseUs;

const features = [
  {
    icon: ShoppingBag,
    title: 'Amazon Specialists',
    description: 'We know how Amazon works. Optimized listings, A+ Content, and ROI-focused ads built to turn clicks into sales.',
    className: 'lg:col-span-4',
  },
  {
    icon: Layers,
    title: 'Full-Stack Execution',
    description: 'Beyond Amazon, we build the websites, branding, SEO, and marketing your business needs to grow on every channel.',
    className: 'lg:col-span-4',
  },
  {
    icon: UserCheck,
    title: 'Direct Founder Access',
    description: 'You work directly with the founders. No account managers, no delays, just clear communication.',
    className: 'md:col-span-2 lg:col-span-8',
    highlighted: true,
  },
  {
    icon: TrendingUp,
    title: 'Results-Driven Delivery',
    description: 'We focus on measurable outcomes: rankings, conversions, and sales. No vanity metrics, no buzzwords.',
    className: 'lg:col-span-4',
  },
];