"use client";
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ArrowRight,
  Send,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const BehanceIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...props}>
    <path d="M7.6 11.23c.87 0 1.48-.39 1.48-1.13 0-.69-.47-1.07-1.39-1.07H5.25v2.2h2.35zm.14 4.54c.98 0 1.65-.43 1.65-1.28 0-.82-.62-1.24-1.68-1.24H5.25v2.52h2.49zM2.5 6.5h5.45c2.3 0 3.73.98 3.73 2.5 0 1.11-.6 1.92-1.67 2.27 1.32.32 2.07 1.25 2.07 2.67 0 1.85-1.48 3.06-4.08 3.06H2.5V6.5zm14.15.5h5.36v1.5h-5.36V7zm.15 7.9c0-1.1.75-1.8 1.9-1.8 1.1 0 1.8.7 1.8 1.8h-3.7zm1.9-4.2c-2.48 0-4.1 1.7-4.1 4.1 0 2.45 1.62 4.2 4.2 4.2 1.9 0 3.4-1 3.9-2.6h-2.1c-.3.5-.9.9-1.7.9-1.1 0-1.9-.7-2-1.8h6c.03-.3.03-.5.03-.7 0-2.3-1.6-4.1-4.23-4.1z" />
  </svg>
);

const RedditIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...props}>
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.196-.491a1.69 1.69 0 0 1 1.692 1.692c0 .656-.37 1.221-.92 1.505.02.185.032.372.032.562 0 2.871-3.344 5.2-7.468 5.2-4.124 0-7.468-2.329-7.468-5.2 0-.19.012-.377.032-.562a1.683 1.683 0 0 1-.92-1.505 1.69 1.69 0 0 1 1.692-1.692c.466 0 .888.182 1.196.491 1.194-.856 2.85-1.418 4.674-1.488l.947-4.437a.375.375 0 0 1 .446-.29l3.074.648a1.25 1.25 0 0 1 1.05-.562zM9.25 12C8.56 12 8 12.56 8 13.25c0 .69.56 1.25 1.25 1.25.69 0 1.25-.56 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm5.5 0c-.69 0-1.25.56-1.25 1.25 0 .69.56 1.25 1.25 1.25.69 0 1.25-.56 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm-4.47 4.2c-.158 0-.28.118-.28.272 0 .154.122.272.28.272 1.034 0 2.406.002 3.44 0 .158 0 .28-.118.28-.272 0-.154-.122-.272-.28-.272-1.034 0-2.406-.002-3.44 0z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Amazon Growth", href: "/services/ecommerce-development" },
    { name: "Web Development", href: "/services/web-development" },
    { name: "Graphic Design", href: "/services/graphic-designing" },
    { name: "Digital Marketing", href: "/services/digital-marketing" },
    { name: "SEO", href: "/services/seo-content-strategy" },
    { name: "Video & Motion Design", href: "/services/video-editing" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Plans & Pricing", href: "/plans" },
    { name: "Contact Us", href: "/contact" },
    { name: "Insights", href: "/insights" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://web.facebook.com/derixio", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/derixio_official/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/derixio/?viewAsMember=true", label: "LinkedIn" },
    { icon: BehanceIcon, href: "https://www.behance.net/derixiosolutio", label: "Behance" },
    { icon: RedditIcon, href: "https://www.reddit.com/user/derixio/", label: "Reddit" },
  ];

  return (
    <footer className="relative bg-[var(--background)] border-t border-[var(--border)] text-[var(--foreground)]">
      <div className="relative z-10">
        
        {/* Main Footer Content */}
        <div className="px-6 py-16 bg-[var(--card)]">
          
          {/* Minimal Newsletter Section - Integrated into footer */}
          <div className="g-px mb-16 pb-12 border-b border-[var(--border)]">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold text-[var(--foreground-heading)] mb-2">
                  Ready to start your <span className="text-[#9D26FF]">next digital project?</span>
                </h3>
                <p className="text-[var(--foreground-muted)]">Join our newsletter for the latest insights, design trends, and tech updates.</p>
              </div>
              <div className="w-full lg:w-1/2 max-w-md">
                 <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full bg-[var(--background-alt)] border border-[var(--border)] px-5 py-3 text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] rounded-xl focus:outline-none focus:border-[#9D26FF] transition-colors"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="whitespace-nowrap px-6 py-3 rounded-xl font-bold text-white bg-[#9D26FF] hover:bg-[#8500ED] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                    >
                      Subscribe
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 g-px">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                {/* Light Mode Logo: Purple D/X + Black Text */}
                <Image 
                  src="/assets/derixio-official-logo-light.png" 
                  alt="Derixio Logo" 
                  width={350} 
                  height={93} 
                  className="mb-4 h-auto w-[115px] md:w-[130px] object-contain logo-light-mode dark:hidden" 
                />
                {/* Dark Mode Logo: Purple D/X + White Text */}
                <Image 
                  src="/assets/derixio-official-logo.png" 
                  alt="Derixio Logo" 
                  width={350} 
                  height={93} 
                  className="mb-4 h-auto w-[115px] md:w-[130px] object-contain logo-dark-mode hidden dark:block" 
                />
                <p className="text-[var(--foreground-muted)] leading-relaxed mb-6 text-sm">
                  Amazon growth is what we do best — from listing optimization and A+ Content to PPC and full-funnel strategy. We also support that growth with web development, design, SEO, and marketing built to scale your brand everywhere else.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 bg-[var(--background-alt)] border border-[var(--border)] rounded-xl flex items-center justify-center text-[var(--foreground-muted)] hover:bg-[#9D26FF] hover:border-[#9D26FF] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-1">
              <h3 className="text-base font-semibold text-[var(--foreground-heading)] mb-6 ml-1">
                Services
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="text-[var(--foreground-muted)] hover:text-[#9D26FF] transition-colors duration-200 flex items-center gap-2 group text-sm"
                    >
                      <ArrowRight className="w-3 h-3 text-[#9D26FF] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-1">
              <h3 className="text-base font-semibold text-[var(--foreground-heading)] mb-6 ml-1">
                Company
              </h3>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-[var(--foreground-muted)] hover:text-[#9D26FF] transition-colors duration-200 flex items-center gap-2 group text-sm"
                    >
                      <ArrowRight className="w-3 h-3 text-[#9D26FF] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="lg:col-span-1">
              <h3 className="text-base font-semibold text-[var(--foreground-heading)] mb-6">
                Contact Us
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-[var(--foreground-muted)]">
                  <Mail className="w-4 h-4 text-[#9D26FF] flex-shrink-0" />
                  <a href="mailto:hello@derixio.com" className="hover:text-[#9D26FF] transition-colors">hello@derixio.com</a>
                </div>
                <div className="flex items-center gap-3 text-[var(--foreground-muted)]">
                  <Phone className="w-4 h-4 text-[#9D26FF] flex-shrink-0" />
                  <a href="tel:+923024165348" className="hover:text-[#9D26FF] transition-colors">+92 302 4165348</a>
                </div>
                <div className="flex items-center gap-3 text-[var(--foreground-muted)]">
                  <MapPin className="w-4 h-4 text-[#9D26FF] flex-shrink-0" />
                  <span>Lahore, Pakistan</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--foreground-muted)]">
                  <Clock className="w-4 h-4 text-[#9D26FF] flex-shrink-0" />
                  <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[var(--border)] bg-[var(--background-alt)]">
          <div className="g-px px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-[var(--foreground-muted)] text-sm">
                © {currentYear} Derixio. All rights reserved. Crafted with precision for high-growth brands.
              </div>
              <div className="flex items-center gap-6 text-sm text-[var(--foreground-muted)]">
                <Link href="/privacy-policy" className="hover:text-[#9D26FF] transition-colors">Privacy Policy</Link>
                <Link href="/terms-of-service" className="hover:text-[#9D26FF] transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;