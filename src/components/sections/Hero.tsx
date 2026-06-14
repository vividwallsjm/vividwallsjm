'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Camera } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCountUp } from '@/hooks/useCountUp';

function StatCard({ target, suffix, label }: { target: number; suffix?: string; label: string }) {
  const { ref, count } = useCountUp(target);
  return (
    <div ref={ref} className="bg-jet-black border border-charcoal rounded-card p-6 text-center shadow-card">
      <div className="font-poppins font-bold text-vivid-red text-4xl md:text-5xl">
        {count}{suffix}
      </div>
      <div className="font-dmsans text-warm-gray text-sm mt-2 leading-snug">{label}</div>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen min-h-[100svh] flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0a0505 0%, #1A1A1A 40%, #2D0A0B 70%, #1A1A1A 100%)',
        }}
      />
      {/* Architectural grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(224,34,38,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(224,34,38,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-jet-black/60 to-transparent" />

      {/* Red vertical accent */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-vivid-red opacity-60 hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-vivid-red animate-pulse-red" />
            <span className="font-dmsans text-warm-gray text-sm uppercase tracking-widest">
              Tired of Plain Walls?
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={item}
            className="font-poppins font-bold text-white uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-3"
          >
            BRING YOUR
            <br />
            <span className="text-vivid-red">WALLS</span> TO LIFE
          </motion.h1>

          {/* Red underline */}
          <motion.div variants={item} className="w-24 h-[3px] bg-vivid-red mb-6" />

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="font-dmsans text-warm-gray text-xl md:text-2xl mb-10 leading-relaxed max-w-2xl"
          >
            Bring your walls to life with vibrant, custom-printed designs that reflect your brand, style, or imagination.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-20">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollTo('#visualizer')}
            >
              Visualize Your Design <ArrowRight size={20} />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollTo('#quote')}
            >
              <Camera size={20} /> Get a Quote from Your Wall Photo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <StatCard target={50}  suffix="+"  label="Projects Completed Across Jamaica" />
            <StatCard target={4200} suffix=" m²" label="Square Metres of Wall Printed" />
            <StatCard target={98}   suffix="+"   label="Happy Clients Island-Wide" />
          </motion.div>
        </motion.div>

        {/* Intro blurb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 max-w-2xl border-l-4 border-vivid-red pl-5"
        >
          <p className="font-dmsans text-warm-gray text-base leading-relaxed">
            Vivid Walls uses state-of-the-art UV flatbed printing technology to apply permanent, weather-resistant, photo-quality artwork directly onto your walls — no wallpaper, no canvas, no mess. Our eco-friendly UV inks are cured instantly with ultraviolet light, creating crisp, durable, and vibrant results that last for years, even in Jamaica&apos;s tropical humidity.
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-vivid-red to-transparent" />
        <span className="text-warm-gray text-xs uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}
