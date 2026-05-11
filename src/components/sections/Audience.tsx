'use client';

import { motion } from 'framer-motion';
import { Building2, Home, GraduationCap, CalendarDays } from 'lucide-react';
import SectionDivider from '@/components/ui/SectionDivider';

const audiences = [
  {
    icon: Building2,
    label: 'Businesses',
    title: 'Offices, Restaurants & Retail',
    desc: 'Make your brand impossible to ignore. Turn lobby walls, feature walls, and storefronts into bold, lasting statements.',
  },
  {
    icon: Home,
    label: 'Homeowners',
    title: 'Turn Any Wall Into Art',
    desc: 'Express your personality in every room — bedrooms, living rooms, entryways, and beyond. Your home, your canvas.',
  },
  {
    icon: GraduationCap,
    label: 'Schools & Institutions',
    title: 'Inspiring Learning Spaces',
    desc: 'Create motivating, vibrant environments that engage students and reflect your institution\'s values and identity.',
  },
  {
    icon: CalendarDays,
    label: 'Events & Pop-Ups',
    title: 'Art That Makes a Lasting Impression',
    desc: 'Temporary or permanent — our prints transform event spaces, pop-up shops, and exhibitions with striking visual impact.',
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

export default function Audience() {
  return (
    <section id="audience" className="section-padding bg-jet-black">
      <div className="container-max">
        <div className="mb-14 max-w-2xl">
          <p className="font-dmsans text-vivid-red text-sm font-semibold uppercase tracking-widest mb-2">
            Who It&apos;s For
          </p>
          <h2 className="font-poppins font-bold text-white uppercase text-4xl md:text-5xl leading-tight">
            BUILT FOR<br />EVERY SPACE
          </h2>
          <SectionDivider />
          <p className="font-dmsans text-warm-gray text-lg leading-relaxed">
            Whether it&apos;s a home, a business, or a once-in-a-lifetime event — we bring the same precision and quality to every project.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {audiences.map(({ icon: Icon, label, title, desc }, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group bg-charcoal rounded-card border border-charcoal hover:border-vivid-red transition-colors duration-200 p-7 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-card bg-vivid-red/10 flex items-center justify-center group-hover:bg-vivid-red transition-colors duration-200">
                <Icon size={22} className="text-vivid-red group-hover:text-white transition-colors duration-200" />
              </div>
              <div>
                <span className="font-dmsans text-vivid-red text-xs uppercase tracking-widest font-semibold">
                  {label}
                </span>
                <h3 className="font-poppins font-bold text-white text-sm uppercase tracking-wide mt-1 mb-2 leading-snug">
                  {title}
                </h3>
                <p className="font-dmsans text-warm-gray text-sm leading-relaxed">
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
