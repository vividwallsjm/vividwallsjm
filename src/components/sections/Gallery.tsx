'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Maximize } from 'lucide-react';
import SectionDivider from '@/components/ui/SectionDivider';
import Modal from '@/components/ui/Modal';
import { galleryProjects, categories, GalleryCategory, GalleryProject } from '@/data/gallery';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('All');
  const [selected, setSelected] = useState<GalleryProject | null>(null);

  const filtered = activeFilter === 'All'
    ? galleryProjects
    : galleryProjects.filter(p => p.category === activeFilter);

  return (
    <section id="gallery" className="section-padding bg-white dark:bg-jet-black">
      <div className="container-max">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="font-dmsans text-vivid-red text-sm font-semibold uppercase tracking-widest mb-2">
            Our Work
          </p>
          <h2 className="font-poppins font-bold text-jet-black dark:text-white uppercase text-4xl md:text-5xl leading-tight">
            GALLERY &amp;<br />APPLICATIONS
          </h2>
          <SectionDivider />
          <p className="font-dmsans text-charcoal dark:text-warm-gray text-lg leading-relaxed">
            Browse real Vivid Walls projects across Jamaica — from luxury residences to boutique hotels and vibrant restaurants.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-dmsans font-semibold transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-vivid-red text-white shadow-md'
                  : 'bg-smoke dark:bg-charcoal text-charcoal dark:text-warm-gray hover:bg-warm-gray dark:hover:bg-jet-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filtered.map(project => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelected(project)}
                className="group cursor-pointer rounded-card overflow-hidden shadow-card hover:shadow-card-hover border border-warm-gray dark:border-charcoal hover:border-vivid-red transition-all duration-300"
              >
                {/* Thumbnail */}
                <div
                  className="relative h-52 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${project.colors[0]} 0%, ${project.colors[1]} 100%)` }}
                >
                  {/* Pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 2px, transparent 2px, transparent 20px)',
                    }}
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-vivid-red text-white text-xs font-poppins font-bold px-2 py-1 rounded-btn uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-jet-black/0 group-hover:bg-jet-black/40 transition-all duration-300 flex items-center justify-center">
                    <Maximize size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  {/* Size badge */}
                  <div className="absolute bottom-3 right-3">
                    <span
                      className="text-white/60 text-xs font-dmsans px-2 py-1 rounded"
                      style={{ background: 'rgba(0,0,0,0.4)' }}
                    >
                      {project.size}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4 bg-white dark:bg-charcoal">
                  <h3 className="font-poppins font-bold text-jet-black dark:text-white text-sm uppercase tracking-wide leading-snug mb-1 group-hover:text-vivid-red transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-charcoal dark:text-warm-gray text-xs">
                    <MapPin size={12} className="text-vivid-red flex-shrink-0" />
                    <span>{project.location}</span>
                  </div>
                  <p className="font-dmsans text-charcoal dark:text-warm-gray text-xs mt-2 leading-relaxed line-clamp-2">
                    {project.story}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-charcoal dark:text-warm-gray font-dmsans">
            No projects found in this category.
          </div>
        )}
      </div>

      {/* Project modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
        maxWidth="max-w-3xl"
      >
        {selected && (
          <div>
            {/* Hero thumbnail */}
            <div
              className="h-56 md:h-72 relative"
              style={{ background: `linear-gradient(135deg, ${selected.colors[0]} 0%, ${selected.colors[1]} 100%)` }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 2px, transparent 2px, transparent 20px)',
                }}
              />
              <div className="absolute inset-0 flex items-end p-6">
                <span
                  className="text-white font-poppins font-bold text-4xl uppercase opacity-20"
                  style={{ lineHeight: 1 }}
                >
                  {selected.category}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Location',  value: selected.location },
                  { label: 'Print Size', value: selected.size },
                  { label: 'Surface',   value: selected.material },
                  { label: 'Category',  value: selected.category },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-smoke dark:bg-jet-black rounded-card p-3 border-l-2 border-vivid-red">
                    <p className="font-dmsans text-xs text-charcoal dark:text-warm-gray uppercase tracking-wide mb-1">{label}</p>
                    <p className="font-dmsans font-semibold text-jet-black dark:text-white text-sm">{value}</p>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-poppins font-bold text-jet-black dark:text-white uppercase text-sm tracking-wide mb-2">
                  Client Story
                </h4>
                <p className="font-dmsans text-charcoal dark:text-warm-gray text-base leading-relaxed">
                  {selected.story}
                </p>
              </div>

              <div className="bg-vivid-red/5 border border-vivid-red/20 rounded-card p-4">
                <p className="font-dmsans text-charcoal dark:text-warm-gray text-sm">
                  <span className="text-vivid-red font-semibold">Want a similar project?</span>{' '}
                  Use our Quote Tool to upload a photo of your wall and get a custom price and design mockup within 24 hours.
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
