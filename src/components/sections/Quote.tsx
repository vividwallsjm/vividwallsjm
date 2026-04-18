'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, CheckCircle, X, Layers3 } from 'lucide-react';
import SectionDivider from '@/components/ui/SectionDivider';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';

// CUSTOMIZATION POINT: Adjust pricing constants here
const BASE_PRICE_PER_SQM = 2500; // JMD per square metre
const COMPLEXITY_MULTIPLIERS = [1.0, 1.4, 1.8]; // Simple, Medium, Complex
const TEXTURE_SURCHARGE = 0.25; // 25% surcharge for 3D effect
const PRICE_RANGE = 0.15; // ±15% range

const COMPLEXITY_LABELS = ['Simple / Solid Colours', 'Medium / Patterns', 'Complex / Photo-Realistic'];

function formatJMD(value: number) {
  return 'JMD $' + Math.round(value).toLocaleString('en-JM');
}

type QuotePhase = 'idle' | 'processing' | 'success';
type StyleOption = 'Photo-Realistic' | 'Abstract' | '3D Texture' | 'Branding';

export default function Quote() {
  const { addToast } = useToast();

  // Slider state
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(2.5);
  const [numWalls, setNumWalls] = useState(1);
  const [complexity, setComplexity] = useState(0);
  const [is3D, setIs3D] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [phase, setPhase] = useState<QuotePhase>('idle');
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [formData, setFormData] = useState({
    dimensions: '',
    style: 'Photo-Realistic' as StyleOption,
    notes: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Price calculation
  const area = width * height * numWalls;
  const base = area * BASE_PRICE_PER_SQM * COMPLEXITY_MULTIPLIERS[complexity];
  const total = base * (1 + (is3D ? TEXTURE_SURCHARGE : 0));
  const low = total * (1 - PRICE_RANGE);
  const high = total * (1 + PRICE_RANGE);

  // CUSTOMIZATION POINT: Replace this with a real API call to your backend
  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => setUploadedPhoto(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const submitQuote = () => {
    setPhase('processing');
    setTimeout(() => {
      setPhase('success');
      addToast('Quote request received! Our team will contact you within 24 hours.');
    }, 3000);
  };

  const resetModal = () => {
    setPhase('idle');
    setUploadedPhoto(null);
    setFormData({ dimensions: '', style: 'Photo-Realistic', notes: '' });
    setModalOpen(false);
  };

  const inputClass =
    'w-full border border-warm-gray dark:border-charcoal rounded-input px-4 py-3 text-sm font-dmsans text-jet-black dark:text-white bg-white dark:bg-jet-black outline-none focus:border-vivid-red focus:ring-1 focus:ring-vivid-red transition-all placeholder-warm-gray';

  const sliderRow = (
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    unit: string,
    setter: (v: number) => void
  ) => (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="font-dmsans font-medium text-charcoal dark:text-warm-gray text-sm">{label}</label>
        <span className="font-poppins font-bold text-vivid-red text-base">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => setter(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-warm-gray mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );

  return (
    <section id="quote" className="section-padding bg-smoke dark:bg-charcoal">
      <div className="container-max">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="font-dmsans text-vivid-red text-sm font-semibold uppercase tracking-widest mb-2">
            Pricing Tool
          </p>
          <h2 className="font-poppins font-bold text-jet-black dark:text-white uppercase text-4xl md:text-5xl leading-tight">
            GET A<br />QUOTE
          </h2>
          <SectionDivider />
          <p className="font-dmsans text-charcoal dark:text-warm-gray text-lg leading-relaxed">
            Use our interactive pricing simulator for an instant estimate, or upload a photo of your wall for a fully custom quote and design mockup.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Pricing simulator */}
          <div className="bg-white dark:bg-jet-black rounded-card shadow-card p-6 md:p-8 space-y-6">
            <h3 className="font-poppins font-bold text-jet-black dark:text-white uppercase text-lg tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vivid-red" />
              Instant Price Estimator
            </h3>

            {sliderRow('Wall Width', width, 1, 20, 0.5, 'm', setWidth)}
            {sliderRow('Wall Height', height, 1, 10, 0.5, 'm', setHeight)}
            {sliderRow('Number of Walls', numWalls, 1, 5, 1, '', setNumWalls)}

            {/* Complexity */}
            <div>
              <label className="font-dmsans font-medium text-charcoal dark:text-warm-gray text-sm mb-2 block">
                Design Complexity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {COMPLEXITY_LABELS.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setComplexity(i)}
                    className={`py-2 px-2 rounded-btn text-xs font-dmsans font-semibold text-center transition-all duration-200 ${
                      complexity === i
                        ? 'bg-vivid-red text-white'
                        : 'bg-smoke dark:bg-charcoal text-charcoal dark:text-warm-gray hover:border-vivid-red border border-transparent'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D toggle */}
            <div className="flex items-center justify-between py-3 border-t border-warm-gray dark:border-charcoal">
              <div className="flex items-center gap-2">
                <Layers3 size={18} className="text-vivid-red" />
                <span className="font-dmsans font-medium text-charcoal dark:text-warm-gray text-sm">
                  Add 3D Embossed Texture (+25%)
                </span>
              </div>
              <button
                onClick={() => setIs3D(p => !p)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${is3D ? 'bg-vivid-red' : 'bg-warm-gray dark:bg-charcoal'}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${is3D ? 'translate-x-6' : 'translate-x-0'}`}
                />
              </button>
            </div>

            {/* Price display */}
            <div className="bg-jet-black rounded-card p-5 text-center">
              <p className="font-dmsans text-warm-gray text-sm mb-1">
                {area.toFixed(1)} m² · {COMPLEXITY_LABELS[complexity]}{is3D ? ' · 3D Texture' : ''}
              </p>
              <p className="font-poppins font-bold text-vivid-red text-3xl md:text-4xl">
                {formatJMD(low)} – {formatJMD(high)}
              </p>
              <p className="font-dmsans text-warm-gray text-xs mt-1">
                Estimated range · Final price confirmed after site inspection
              </p>
            </div>
          </div>

          {/* Photo upload */}
          <div className="bg-white dark:bg-jet-black rounded-card shadow-card p-6 md:p-8 flex flex-col gap-6">
            <h3 className="font-poppins font-bold text-jet-black dark:text-white uppercase text-lg tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vivid-red" />
              Custom Quote from Your Photo
            </h3>
            <p className="font-dmsans text-charcoal dark:text-warm-gray text-sm leading-relaxed">
              Upload a photo of your wall and tell us what you have in mind. Our design team will send you a custom mockup and accurate quote within 24 hours — completely free.
            </p>

            <div className="space-y-3">
              {[
                '✓ Free design mockup included',
                '✓ Accurate quote with no hidden fees',
                '✓ Response within 24 hours',
                '✓ No commitment required',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm font-dmsans text-charcoal dark:text-warm-gray">
                  <span className="text-vivid-red">{item.split(' ')[0]}</span>
                  <span>{item.split(' ').slice(1).join(' ')}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => { setModalOpen(true); setPhase('idle'); }}
              >
                <Camera size={20} /> Upload Photo of Your Wall
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Photo upload modal */}
      <Modal
        open={modalOpen}
        onClose={resetModal}
        title="UPLOAD YOUR WALL PHOTO"
        maxWidth="max-w-2xl"
      >
        <div className="p-6">
          <AnimatePresence mode="wait">
            {phase === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {/* Drop zone */}
                <div
                  onDragOver={e => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-card p-8 bg-smoke dark:bg-jet-black text-center cursor-pointer transition-all duration-200 ${
                    dragging ? 'border-vivid-red bg-vivid-red/5' : 'border-vivid-red/40 hover:border-vivid-red'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); }}
                  />

                  {uploadedPhoto ? (
                    <div className="space-y-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={uploadedPhoto}
                        alt="Uploaded wall"
                        className="max-h-48 mx-auto rounded-card object-contain"
                      />
                      <p className="text-vivid-red text-sm font-dmsans font-semibold flex items-center justify-center gap-2">
                        <CheckCircle size={16} /> Photo uploaded successfully
                      </p>
                      <button
                        onClick={e => { e.stopPropagation(); setUploadedPhoto(null); }}
                        className="text-charcoal dark:text-warm-gray text-xs hover:text-vivid-red transition-colors flex items-center gap-1 mx-auto"
                      >
                        <X size={12} /> Remove photo
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload size={40} className="mx-auto text-vivid-red" />
                      <p className="font-dmsans font-semibold text-jet-black dark:text-white">
                        Drag &amp; Drop or Click to Upload
                      </p>
                      <p className="text-warm-gray text-sm">JPG, PNG, HEIC up to 20MB</p>
                    </div>
                  )}
                </div>

                {/* Form fields */}
                <div>
                  <label className="block font-dmsans font-medium text-charcoal dark:text-warm-gray text-sm mb-1">
                    Approximate Dimensions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4m wide × 2.8m high"
                    value={formData.dimensions}
                    onChange={e => setFormData(p => ({ ...p, dimensions: e.target.value }))}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block font-dmsans font-medium text-charcoal dark:text-warm-gray text-sm mb-2">
                    Preferred Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Photo-Realistic', 'Abstract', '3D Texture', 'Branding'] as StyleOption[]).map(style => (
                      <button
                        key={style}
                        onClick={() => setFormData(p => ({ ...p, style }))}
                        className={`py-2 px-3 rounded-btn text-sm font-dmsans font-medium border transition-all duration-200 ${
                          formData.style === style
                            ? 'bg-vivid-red border-vivid-red text-white'
                            : 'border-warm-gray dark:border-charcoal text-charcoal dark:text-warm-gray hover:border-vivid-red'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-dmsans font-medium text-charcoal dark:text-warm-gray text-sm mb-1">
                    Reference Ideas or Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your vision, colour preferences, or any inspiration..."
                    value={formData.notes}
                    onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
                    className={inputClass + ' resize-none'}
                  />
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={submitQuote}
                  disabled={!uploadedPhoto}
                >
                  Submit for Quote
                </Button>
                {!uploadedPhoto && (
                  <p className="text-center text-warm-gray text-xs font-dmsans">
                    Please upload a photo of your wall to continue
                  </p>
                )}
              </motion.div>
            )}

            {phase === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-jet-black rounded-card p-8 text-center space-y-6 min-h-[320px] flex flex-col items-center justify-center"
              >
                {/* Animated UV printer */}
                <div className="relative w-full h-20 overflow-hidden rounded-card bg-charcoal">
                  {/* Wall surface */}
                  <div className="absolute inset-0 opacity-30"
                    style={{ background: 'linear-gradient(90deg, #E02226 0%, #8C1518 50%, #E02226 100%)' }}
                  />
                  {/* Printer head */}
                  <motion.div
                    className="absolute top-3 w-16 h-14 bg-vivid-red rounded flex items-center justify-center text-white text-2xl shadow-red-glow"
                    animate={{ x: ['-100%', '500%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    🖨️
                  </motion.div>
                  {/* Pulse dots */}
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="absolute bottom-2 w-3 h-3 rounded-full bg-vivid-red"
                      style={{ left: `${20 + i * 30}%` }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                </div>

                <p className="font-poppins font-bold text-white uppercase tracking-wide text-lg">
                  Processing Your Quote...
                </p>
                <p className="font-dmsans text-warm-gray text-sm">
                  Our system is analysing your wall dimensions and design preferences
                </p>

                {/* Progress bar */}
                <div className="w-full bg-charcoal rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-vivid-red rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.8, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            )}

            {phase === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-0"
              >
                {/* Success header */}
                <div className="bg-vivid-red p-5 -mx-6 -mt-6 mb-6 text-center">
                  <CheckCircle size={40} className="mx-auto text-white mb-2" />
                  <h3 className="font-poppins font-bold text-white uppercase text-xl tracking-wide">
                    Quote Request Received!
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="font-dmsans text-charcoal dark:text-warm-gray text-center">
                    Our team will contact you within <strong className="text-vivid-red">24 hours</strong> with a custom price and design mockup — completely free.
                  </p>

                  {/* Mock summary */}
                  <div className="bg-smoke dark:bg-jet-black rounded-card border-l-4 border-vivid-red p-4 space-y-2">
                    <h4 className="font-poppins font-bold text-jet-black dark:text-white uppercase text-sm tracking-wide mb-3">
                      Quote Summary
                    </h4>
                    {[
                      { label: 'Preferred Style', value: formData.style },
                      { label: 'Dimensions', value: formData.dimensions || 'To be confirmed on-site' },
                      { label: 'Estimated Turnaround', value: '1–2 business days' },
                      { label: 'Next Step', value: 'Free on-site consultation' },
                      { label: 'Response Time', value: 'Within 24 hours' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between text-sm">
                        <span className="font-dmsans text-charcoal dark:text-warm-gray">{label}</span>
                        <span className="font-dmsans font-semibold text-jet-black dark:text-white text-right ml-4">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="primary" size="md" fullWidth onClick={resetModal}>
                      Close
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal>
    </section>
  );
}
