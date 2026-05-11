'use client';

import { motion } from 'framer-motion';
import { Printer, Palette, Zap, Shield } from 'lucide-react';
import SectionDivider from '@/components/ui/SectionDivider';

const services = [
  {
    icon: Printer,
    title: 'Custom Wall & Floor Printing',
    desc: 'Professional UV printing for homes, offices, and commercial spaces — any size, any surface.',
  },
  {
    icon: Palette,
    title: 'Design Collaboration',
    desc: 'Upload your own artwork or let our design team create something unique for your space.',
  },
  {
    icon: Zap,
    title: 'Fast, Clean Installation',
    desc: 'Professional installation with no paint, no mess, and no fumes — done in hours, not days.',
  },
  {
    icon: Shield,
    title: 'Durable, Long-Lasting Finish',
    desc: 'Fade-proof, waterproof, and scratch-resistant results that stand the test of time.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white dark:bg-jet-black">
      <div className="container-max">
        <div className="mb-14 max-w-2xl">
          <p className="font-dmsans text-vivid-red text-sm font-semibold uppercase tracking-widest mb-2">
            What We Do
          </p>
          <h2 className="font-poppins font-bold text-jet-black dark:text-white uppercase text-4xl md:text-5xl leading-tight">
            OUR SERVICES
          </h2>
          <SectionDivider />
          <p className="font-dmsans text-charcoal dark:text-warm-gray text-lg leading-relaxed">
            Everything you need to transform any wall into a work of art — from concept to finished print.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {services.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group bg-smoke dark:bg-charcoal rounded-card shadow-card border border-warm-gray dark:border-charcoal hover:border-vivid-red transition-colors duration-200 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-card bg-vivid-red/10 flex items-center justify-center group-hover:bg-vivid-red transition-colors duration-200">
                <Icon size={22} className="text-vivid-red group-hover:text-white transition-colors duration-200" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-jet-black dark:text-white text-sm uppercase tracking-wide mb-2">
                  {title}
                </h3>
                <p className="font-dmsans text-charcoal dark:text-warm-gray text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
