"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Globe, Palette, Smartphone, ShoppingCart, Search, Settings, TrendingUp, Film, Sun, Moon } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SecondButton } from "../btn/Button";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "./ThemeToggle";


export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [logoTapped, setLogoTapped] = useState(false);
  const lastScrollY = useRef(0);
  const servicesRef = useRef(null);
  const logoRef = useRef(null);

  const isLinkActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Click outside to collapse logo on mobile/tablet tap
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoRef.current && !logoRef.current.contains(event.target)) {
        setLogoTapped(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const isLogoExpanded = logoHovered || logoTapped;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scrolled state for background blur effect
      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Services",
      href: "/services",
      dropdown: [
        { name: "Amazon Growth", href: "/services/ecommerce-development", icon: TrendingUp },
        { name: "Web Development", href: "/services/web-development", icon: Globe },
        { name: "Graphic Design", href: "/services/graphic-designing", icon: Palette },
        { name: "SEO", href: "/services/seo-content-strategy", icon: Search },
        { name: "Digital Marketing", href: "/services/digital-marketing", icon: Settings },
        { name: "Video & Motion Design", href: "/services/video-editing", icon: Film },
      ],
    },
    { name: "Plans", href: "/plans" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "backdrop-blur-xl shadow-lg border-b border-[var(--border)] bg-[var(--background)]/90 text-[var(--foreground)]"
          : "backdrop-blur-md border-b border-[var(--border)] bg-[var(--background)]/75 text-[var(--foreground)]"
      }`}
    >
      <div className={`g-px flex items-center justify-between transition-all duration-300 ${scrolled ? "py-2.5 md:py-3" : "py-3 md:py-3.5"}`}>
        {/* Clean Static Premium Agency Logo */}
        <Link href="/" className="relative flex items-center shrink-0 cursor-pointer">
          {/* Light Theme: Purple Symbol + Black Wordmark */}
          <Image
            src="/assets/derixio-official-logo-light.png"
            alt="Derixio Logo"
            width={844}
            height={224}
            className={`w-[88px] sm:w-[102px] md:w-[112px] h-auto object-contain transition-all duration-300 hover:opacity-90 ${
              theme === "light" ? "block" : theme === "dark" ? "hidden" : "block dark:hidden"
            }`}
            priority
          />
          {/* Dark Theme: Purple Symbol + White Wordmark */}
          <Image
            src="/assets/derixio-official-logo.png"
            alt="Derixio Logo"
            width={844}
            height={224}
            className={`w-[88px] sm:w-[102px] md:w-[112px] h-auto object-contain transition-all duration-300 hover:opacity-90 ${
              theme === "dark" ? "block" : theme === "light" ? "hidden" : "hidden dark:block"
            }`}
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-0.5 lg:space-x-1.5 xl:space-x-3 lg:ml-4 xl:ml-10 shrink">
          {navLinks.map((link, index) => (
            <div key={index} className="relative group">
              {link.dropdown ? (
                <div 
                  ref={link.name === "Services" ? servicesRef : null}
                  className="relative"
                  onMouseEnter={() => link.name === "Services" && setServicesOpen(true)}
                  onMouseLeave={() => link.name === "Services" && setServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`relative flex items-center px-2.5 lg:px-3 xl:px-3.5 py-1.5 text-xs lg:text-sm font-semibold transition-all duration-300 ease-in-out whitespace-nowrap ${isLinkActive(link.href) ? "text-[#9D26FF]" : "text-[var(--foreground)]"
                      } hover:text-[#9D26FF] group-hover:bg-[var(--background-alt)] rounded-lg`}
                  >
                    {link.name}
                    <ChevronDown
                      size={15}
                      className={`ml-1 transition-all duration-300 ${servicesOpen && link.name === "Services" ? "rotate-180 text-[#9D26FF]" : "rotate-0 text-[var(--foreground-muted)]"
                        }`}
                    />
                    <span className={`absolute bottom-0 left-0 h-[2px] bg-[#9D26FF] transition-all duration-300 ${isLinkActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                  </Link>
                </div>
              ) : (
                <Link
                  href={link.href}
                  className={`relative block px-2.5 lg:px-3 xl:px-3.5 py-1.5 text-xs lg:text-sm font-semibold transition-all duration-300 ease-in-out whitespace-nowrap ${isLinkActive(link.href) ? "text-[#9D26FF]" : "text-[var(--foreground)]"
                    } hover:text-[#9D26FF] group-hover:bg-[var(--background-alt)] rounded-lg`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-[#9D26FF] transition-all duration-300 ${isLinkActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                </Link>
              )}

              {link.dropdown && link.name === "Services" && (
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 mt-2 w-64 bg-[var(--card)] backdrop-blur-xl rounded-xl shadow-2xl border border-[var(--border)] overflow-hidden"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                          hidden: {},
                          show: {
                            transition: {
                              staggerChildren: 0.05
                            }
                          }
                        }}
                        className="p-2"
                      >
                        {link.dropdown.map((item, idx) => {
                          const IconComponent = item.icon;
                          return (
                            <motion.div
                              key={idx}
                              variants={{
                                hidden: { opacity: 0, y: 10 },
                                show: { opacity: 1, y: 0 }
                              }}
                            >
                              <Link
                                href={item.href}
                                className="flex items-center px-4 py-3 text-sm text-[var(--foreground)] hover:bg-[var(--background-alt)] hover:text-[#9D26FF] transition-all duration-300 rounded-lg group/item"
                                onClick={() => setServicesOpen(false)}
                              >
                                <IconComponent size={18} className="mr-3 text-[#9D26FF] group-hover/item:scale-110 transition-transform duration-300" />
                                <span className="font-medium">{item.name}</span>
                                <div className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                  <ChevronDown size={14} className="rotate-[-90deg] text-[#9D26FF]" />
                                </div>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                      <div className="h-1 bg-[#9D26FF]"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Compact Theme Toggle & CTA Button */}
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 shrink-0 ml-auto lg:ml-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-3.5 lg:px-4 xl:px-5 py-2 rounded-full bg-[#9D26FF] hover:bg-[#8500ED] text-white font-semibold text-xs sm:text-sm shadow-md transition-all duration-300 cursor-pointer whitespace-nowrap h-10 shrink-0"
          >
            Get Free Consultation
          </Link>
        </div>

        {/* Mobile Menu & Theme Toggle Controls */}
        <div className="flex lg:hidden items-center space-x-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-2 text-[var(--foreground)] focus:outline-none group cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${isOpen ? "rotate-45 top-3" : "top-1"
                  }`}
              ></span>
              <span
                className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ease-in-out top-3 ${isOpen ? "opacity-0" : "opacity-100"
                  }`}
              ></span>
              <span
                className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45 top-3" : "top-5"
                  }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden backdrop-blur-xl border-t border-[var(--border)] bg-[var(--card)]/95 text-[var(--foreground)] transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <nav className="flex flex-col px-6 py-4 space-y-2">
          {navLinks.map((link, index) => (
            <div key={index} className="relative">
              {link.dropdown ? (
                <button
                  onClick={() => {
                    setServicesOpen(!servicesOpen);
                  }}
                  className={`flex justify-between items-center w-full px-4 py-2 text-base font-semibold transition-all duration-300 rounded-lg ${isLinkActive(link.href) ? "text-[#9D26FF] bg-[var(--background-alt)]" : "text-[var(--foreground)]"
                    } hover:bg-[var(--background-alt)] hover:text-[#9D26FF]`}
                >
                  {link.name}
                  <ChevronDown
                    size={18}
                    className={`transition-all duration-300 ${servicesOpen ? "rotate-180 text-[#9D26FF]" : "rotate-0 text-[var(--foreground-muted)]"
                      }`}
                  />
                </button>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-base font-semibold transition-all duration-300 rounded-lg ${isLinkActive(link.href) ? "text-[#9D26FF] bg-[var(--background-alt)]" : "text-[var(--foreground)]"
                    } hover:bg-[var(--background-alt)] hover:text-[#9D26FF]`}
                >
                  {link.name}
                </Link>
              )}

              {link.dropdown && servicesOpen && (
                <div className="mt-2 ml-4 space-y-2 border-l-2 border-[#9D26FF]/40 pl-4">
                  {link.dropdown.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => {
                          setIsOpen(false);
                          setServicesOpen(false);
                        }}
                        className="flex items-center py-2 text-[var(--foreground-muted)] text-base hover:text-[#9D26FF] transition-all duration-300 hover:translate-x-2"
                      >
                        <IconComponent size={16} className="mr-3 text-[#9D26FF]" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3 mt-3 border-t border-[var(--border)]">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full px-5 py-2.5 text-center bg-[#9D26FF] hover:bg-[#8500ED] text-white font-semibold text-sm rounded-full transition-all duration-300 shadow-md"
            >
              Get Free Consultation
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
