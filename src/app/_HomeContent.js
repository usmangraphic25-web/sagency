"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HorizontalLogoLoop from '@/ui/logoloop/LogoLoop';
import ProcessSection from '@/ui/howwework/HowWeWork';
import WhyChooseUs from '@/ui/whychooseus/WhyChooseUs';
import Testimonials from '@/ui/testinomials/Testinomails';
import Button, { SecondButton } from '@/ui/btn/Button';
import CallToAction, { CallToActionS } from '@/ui/cta/Cta';
import HomePortfolioCarousel from '@/ui/portfolio/HomePortfolioCarousel';
import ServicesGrid from '@/ui/servicesection/ServicesSectionMini';
import { Sparkles } from 'lucide-react';
import DigitalAtmosphereBackground from '@/ui/hero/DigitalAtmosphereBackground';
import StatCounter from '@/ui/hero/StatCounter';

const TypewriterHeroHeading = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  React.useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 640);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const fullText = isDesktop ? "Everything Around\nThem." : "Everything\nAround Them.";
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  React.useEffect(() => {
    setDisplayText('');
    setIsDeleting(false);
  }, [isDesktop]);

  React.useEffect(() => {
    let timeout;

    if (!isDeleting) {
      if (displayText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 115);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        }, 40);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
        }, 400);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, fullText]);

  const lines = displayText.split('\n');
  const line2Typed = lines[0] || '';
  const hasLine3 = lines.length > 1;
  const line3Typed = hasLine3 ? lines[1] : '';

  return (
    <>
      <span className="font-light">And </span>
      {isDesktop ? (
        <>
          <span className="font-light">{line2Typed.slice(0, 11)}</span>
          <span className="font-bold">{line2Typed.slice(11)}</span>
        </>
      ) : (
        <span className="font-light">{line2Typed}</span>
      )}
      {!hasLine3 && (
        <span className="inline-block w-[3px] sm:w-[4px] h-[0.8em] bg-[#9D26FF] ml-1.5 align-baseline animate-pulse rounded-full" />
      )}

      <br />

      <span className="inline-flex items-baseline min-h-[1.1em] whitespace-nowrap">
        {isDesktop ? (
          <span className="font-extrabold text-[#9D26FF]">{line3Typed}</span>
        ) : (
          <>
            <span className="font-bold">{line3Typed.slice(0, 7)}</span>
            <span className="font-extrabold text-[#9D26FF]">{line3Typed.slice(7)}</span>
          </>
        )}
        {hasLine3 && (
          <span className="inline-block w-[3px] sm:w-[4px] h-[0.8em] bg-[#9D26FF] ml-1.5 align-baseline animate-pulse rounded-full" />
        )}
      </span>
    </>
  );
};

const HeroSection = () => {
  return (
    <>
      <div className="w-full relative bg-[var(--background)] bg-agenko-grid pt-20 sm:pt-24 md:pt-28 lg:pt-24 pb-16 sm:pb-20 isolate overflow-hidden">
        {/* Living Digital Atmosphere Background */}
        <DigitalAtmosphereBackground />

        <div className="g-px relative z-20 w-full">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-30">

            {/* Pill Badge — Compact 1-Line Badge */}
            <motion.div
              className="inline-flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-[8px] min-[360px]:text-[8.5px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest whitespace-nowrap max-w-[calc(100vw-32px)] sm:max-w-none overflow-hidden mb-2 sm:mb-4 relative z-30 shadow-md"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="text-[#9D26FF] shrink-0 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              <span className="truncate sm:overflow-visible">DERIXIO AMAZON & CREATIVE GROWTH AGENCY</span>
            </motion.div>

            {/* Main Headline — Prominent 4-Line Layout on Mobile (We Grow Amazon / Brands. / And Everything / Around Them.) */}
            <motion.h1
              className="text-[32px] xs:text-[34px] min-[390px]:text-[37px] min-[430px]:text-[40px] sm:text-4xl md:text-5xl lg:text-[60px] leading-[1.15] mb-5 tracking-tight text-[var(--foreground-heading)] relative z-30 drop-shadow-sm max-w-4xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="sr-only">We Grow Amazon Brands. And Everything Around Them.</span>
              <span aria-hidden="true">
                <span className="font-light">We Grow </span>
                <span className="font-extrabold text-[#9D26FF]">Amazon <br className="sm:hidden" />Brands.</span>
                <br />
                <TypewriterHeroHeading />
              </span>
            </motion.h1>

            {/* Description — Slightly enlarged ~6% for premium readability */}
            <motion.p
              className="text-sm sm:text-base md:text-[17px] text-[var(--foreground-muted)] max-w-3xl mb-9 leading-relaxed font-normal mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              From Amazon store optimization and advertising to web design, branding, and marketing&nbsp;— Derixio helps your brand grow everywhere it sells.
            </motion.p>

            {/* Action Buttons — Slightly scaled ~6% */}
            <motion.div
              className="flex flex-wrap gap-5 justify-center items-center mb-11 scale-[1.05] transform-gpu"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SecondButton text={"Explore Services"} href={"/services"} />
              <Button text={"Get Free Consultation"} href={"/contact"} />
            </motion.div>

            {/* Compact 4-Stat Panel — Slightly widened ~6% */}
            <motion.div
              className="w-full max-w-2xl lg:max-w-[820px] mx-auto mt-2 p-4 sm:p-5.5 rounded-[20px] bg-[var(--card)]/80 backdrop-blur-md border border-[var(--border)] shadow-lg relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="glint-line" />
              <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] items-center relative z-10">
                <div className="py-2.5 md:py-0 md:px-4 flex flex-col items-center justify-center text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--foreground-heading)] tracking-tight">
                    <StatCounter value={150} suffix="+" />
                  </div>
                  <div className="text-[var(--foreground-muted)] text-[11px] sm:text-xs font-medium mt-0.5 whitespace-nowrap">
                    Projects Delivered
                  </div>
                </div>

                <div className="py-2.5 md:py-0 md:px-4 flex flex-col items-center justify-center text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#9D26FF] tracking-tight">
                    <StatCounter value={99} suffix="%" />
                  </div>
                  <div className="text-[var(--foreground-muted)] text-[11px] sm:text-xs font-medium mt-0.5 whitespace-nowrap">
                    Client Satisfaction
                  </div>
                </div>

                <div className="py-2.5 md:py-0 md:px-4 flex flex-col items-center justify-center text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--foreground-heading)] tracking-tight">
                    <StatCounter value={3.5} suffix="x" decimals={1} />
                  </div>
                  <div className="text-[var(--foreground-muted)] text-[11px] sm:text-xs font-medium mt-0.5 whitespace-nowrap">
                    Average ROI Growth
                  </div>
                </div>

                <div className="py-2.5 md:py-0 md:px-4 flex flex-col items-center justify-center text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#9D26FF] tracking-tight">
                    <StatCounter value={300} suffix="%" />
                  </div>
                  <div className="text-[var(--foreground-muted)] text-[11px] sm:text-xs font-medium mt-0.5 whitespace-nowrap">
                    Average Growth
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="bg-[var(--background-alt)] relative z-20">
        <HorizontalLogoLoop />
      </div>

      {/* Problem & Solution Section */}
      <CallToActionS />

      {/* Services Capability Grid Section */}
      <div className="bg-[var(--background)] relative py-20 bg-agenko-grid">
        <div className="g-px text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles size={14} className="text-[#9D26FF]" />
            <span>DERIXIO CAPABILITIES</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[var(--foreground-heading)] leading-tight tracking-tight max-w-3xl mx-auto">
            <span className="font-light">Beyond Amazon, </span><br className="hidden sm:inline" />
            <span className="font-extrabold text-[#9D26FF]">We've Got You Covered</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="g-px"
        >
          <ServicesGrid />
        </motion.div>
      </div>

      {/* Methodology, Why Choose Us, Portfolio, Testimonials, Final CTA */}
      <div>
        <ProcessSection />
        <WhyChooseUs />
        <HomePortfolioCarousel limit={6} />
        <Testimonials />
        <CallToAction />
      </div>
    </>
  );
};

export default HeroSection;
