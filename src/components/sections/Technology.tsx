'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import SectionDivider from '@/components/ui/SectionDivider';

const steps = [
  {
    number: '01',
    title: 'Surface Preparation',
    icon: '🧹',
    short: 'Cleaning, priming, and sealing the wall surface',
    description:
      'Our technicians begin with a thorough surface inspection and preparation. The wall is cleaned to remove dust, grease, and contaminants. A properly prepared surface is critical for ink adhesion and print longevity — this step ensures a perfect foundation.',
    bullets: [
      'Deep-cleaning with specialist solutions',
      'Primer application for optimal ink adhesion',
      'Final inspection and mock layout alignment',
    ],
  },
  {
    number: '02',
    title: 'UV Direct Printing',
    icon: '🖨️',
    short: 'High-resolution printing directly onto the wall surface',
    description:
      'Our industrial UV flatbed printer is positioned precisely in front of the prepared wall using a laser-guided alignment system. The print head travels across the surface, depositing UV-curable inks at up to 1440 DPI resolution. Multiple passes can be made to build depth and richness. For 3D/embossed effects, additional layers of clear textured ink are applied.',
    bullets: [
      'Up to 1440 DPI photographic resolution',
      'Laser-guided positioning for accuracy',
      'Multiple colour passes for vibrancy',
      '3D embossed layers applied where selected',
    ],
  },
  {
    number: '03',
    title: 'Instant UV Curing',
    icon: '💡',
    short: 'UV lamps cure inks immediately — no drying time',
    description:
      'As the print head moves, integrated UV lamps instantly cure (harden) the ink on contact with the surface. Unlike solvent or water-based inks that require hours of drying, UV-cured inks are touch-dry the moment printing completes. This also locks in the vivid colours permanently and creates a surface that is moisture, humidity, and scratch resistant from day one.',
    bullets: [
      'Zero drying time — instantly hardened',
      'Permanently colour-locked, no fading',
      'Humidity and moisture resistant from the start',
      'Eco-friendly — no VOCs, no fumes',
    ],
  },
  {
    number: '04',
    title: 'Finished Mural',
    icon: '🎨',
    short: 'Final protective coat, inspection, and client handover',
    description:
      'After printing, a clear protective topcoat is applied for exterior walls or high-traffic areas. We conduct a detailed quality inspection under controlled lighting to verify colour accuracy, edge definition, and surface consistency. The space is cleaned up completely, and we walk you through care instructions. Your wall is ready to amaze visitors the same day.',
    bullets: [
      'Optional UV-resistant protective topcoat',
      'Colour accuracy quality inspection',
      'Complete site cleanup',
      'Care guide and warranty documentation',
    ],
  },
];

const benefits = [
  { icon: '⚡', title: 'Fast Installation', desc: 'Done in hours, not days. Most projects are completed the same day with zero disruption.' },
  { icon: '✨', title: 'No Mess, No Fumes', desc: 'Completely clean process — no paint, no solvents, no harmful odours. Safe for everyone.' },
  { icon: '🧱', title: 'Works on Any Surface', desc: 'Brick, wood, concrete, plaster, drywall, ceramic tile — virtually any surface qualifies.' },
  { icon: '🎨', title: 'Long-Lasting Colour', desc: 'UV-cured inks lock in vibrancy permanently — fade-proof and scratch-resistant for years.' },
  { icon: '🛠️', title: 'Fully Customizable', desc: 'Your design, your vision. Tailored for residential homes, businesses, and everything in between.' },
];

export default function Technology() {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const toggle = (i: number) => setExpandedStep(prev => (prev === i ? null : i));

  return (
    <section id="technology" className="section-padding bg-white dark:bg-jet-black">
      <div className="container-max">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="font-dmsans text-vivid-red text-sm font-semibold uppercase tracking-widest mb-2">
            How It Works
          </p>
          <h2 className="font-poppins font-bold text-jet-black dark:text-white uppercase text-4xl md:text-5xl leading-tight">
            OUR TECHNOLOGY<br />&amp; PROCESS
          </h2>
          <SectionDivider />
          <p className="font-dmsans text-charcoal dark:text-warm-gray text-lg leading-relaxed">
            From blank wall to jaw-dropping mural in as little as one day. Here&apos;s exactly how Direct UV Wall Printing works.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-vivid-red hidden md:block" />

          <div className="space-y-4">
            {steps.map((step, i) => {
              const isExpanded = expandedStep === i;
              return (
                <div key={i} className="relative">
                  <button
                    onClick={() => toggle(i)}
                    className={`w-full flex items-center gap-5 p-5 rounded-card text-left transition-all duration-200 group ${
                      isExpanded
                        ? 'bg-jet-black'
                        : 'bg-smoke dark:bg-charcoal hover:bg-warm-gray dark:hover:bg-jet-black'
                    }`}
                  >
                    {/* Number circle */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-poppins font-bold text-sm transition-all duration-200 z-10 ${
                        isExpanded ? 'bg-vivid-red text-white' : 'bg-charcoal text-white group-hover:bg-vivid-red'
                      }`}
                    >
                      {step.number}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{step.icon}</span>
                        <span
                          className={`font-poppins font-bold uppercase tracking-wide text-base ${
                            isExpanded ? 'text-white' : 'text-jet-black dark:text-white'
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                      <p className={`font-dmsans text-sm mt-0.5 ${isExpanded ? 'text-warm-gray' : 'text-charcoal dark:text-warm-gray'}`}>
                        {step.short}
                      </p>
                    </div>

                    <ChevronDown
                      size={20}
                      className={`flex-shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-vivid-red' : 'text-charcoal dark:text-warm-gray'
                      }`}
                    />
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="bg-smoke dark:bg-charcoal border-l-4 border-vivid-red mx-0 mt-1 rounded-r-card p-6">
                          <p className="font-dmsans text-charcoal dark:text-warm-gray text-base leading-relaxed mb-4">
                            {step.description}
                          </p>
                          <ul className="space-y-2">
                            {step.bullets.map((b, bi) => (
                              <li key={bi} className="flex items-start gap-3">
                                <CheckCircle2 size={18} className="text-vivid-red flex-shrink-0 mt-0.5" />
                                <span className="font-dmsans text-charcoal dark:text-warm-gray text-sm">{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits grid */}
        <div className="mt-20">
          <h3 className="font-poppins font-bold text-jet-black dark:text-white uppercase text-2xl md:text-3xl mb-2">
            WHY CHOOSE UV WALL PRINTING?
          </h3>
          <SectionDivider />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-smoke dark:bg-charcoal rounded-card p-6 shadow-card border border-warm-gray dark:border-charcoal hover:border-vivid-red transition-colors"
              >
                <div className="text-3xl mb-3">{b.icon}</div>
                <h4 className="font-poppins font-bold text-jet-black dark:text-white text-sm uppercase tracking-wide mb-2">
                  {b.title}
                </h4>
                <p className="font-dmsans text-charcoal dark:text-warm-gray text-sm leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
