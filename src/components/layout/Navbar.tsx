'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import Button from '@/components/ui/Button';

const navLinks = [
  { label: 'Technology', href: '#technology' },
  { label: 'Visualizer', href: '#visualizer' },
  { label: 'Gallery',    href: '#gallery' },
  { label: 'Quote',      href: '#quote' },
  { label: 'Simulator',  href: '#simulator' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setActiveLink(href);
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#000000] border-b border-warm-gray dark:border-charcoal transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.12)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <Image
              src="/logo-transparent.jpg"
              alt="Vivid Walls"
              width={138}
              height={46}
              className="h-[46px] w-auto object-contain dark:invert dark:hue-rotate-180"
              priority
            />
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`font-dmsans text-sm font-medium transition-colors duration-200 pb-0.5 border-b-2 ${
                  activeLink === link.href
                    ? 'text-vivid-red border-vivid-red'
                    : 'text-jet-black dark:text-warm-gray hover:text-vivid-red border-transparent hover:border-vivid-red'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-btn text-jet-black dark:text-warm-gray hover:text-vivid-red dark:hover:text-white transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* CTA — desktop */}
            <div className="hidden md:block">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleNav('#quote')}
              >
                Get a Quote
              </Button>
            </div>

            {/* Hamburger — mobile */}
            <button
              className="md:hidden p-2 text-jet-black dark:text-warm-gray hover:text-vivid-red dark:hover:text-white transition-colors"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white dark:bg-[#000000] border-t border-warm-gray dark:border-charcoal"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left font-dmsans text-base text-jet-black dark:text-warm-gray hover:text-vivid-red transition-colors py-2 border-b border-warm-gray dark:border-charcoal last:border-0"
                >
                  {link.label}
                </button>
              ))}
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => handleNav('#quote')}
              >
                Get a Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
