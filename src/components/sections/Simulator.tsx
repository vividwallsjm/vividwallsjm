'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Play, RotateCcw } from 'lucide-react';
import SectionDivider from '@/components/ui/SectionDivider';
import Button from '@/components/ui/Button';

const stages = [
  {
    id: 0,
    label: 'Preparing Surface',
    emoji: '🧹',
    status: 'Cleaning and priming the wall surface...',
    detail: 'Our technicians apply specialist cleaning solution and primer to ensure perfect ink adhesion.',
  },
  {
    id: 1,
    label: 'UV Printing',
    emoji: '🖨️',
    status: 'Printing at 1440 DPI directly on wall...',
    detail: 'The UV flatbed printer traverses the wall, depositing vibrant, high-resolution inks with laser-guided precision.',
  },
  {
    id: 2,
    label: 'UV Curing',
    emoji: '💡',
    status: 'UV lamps curing ink instantly...',
    detail: 'Integrated UV lamps cure each ink layer on contact — no drying time required. Colours are permanently locked in.',
  },
  {
    id: 3,
    label: 'Finished Mural',
    emoji: '🎨',
    status: 'Mural complete! Applying protective topcoat...',
    detail: 'Final quality inspection and protective sealant applied. Your Vivid Walls mural is ready to impress.',
  },
];

const STAGE_DURATION = 3000; // ms per stage

export default function Simulator() {
  const [currentStage, setCurrentStage] = useState(-1);
  const [completed, setCompleted] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSimulation = () => {
    setCurrentStage(0);
    setCompleted([]);
    setRunning(true);
    setDone(false);
  };

  const reset = () => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    setCurrentStage(-1);
    setCompleted([]);
    setRunning(false);
    setDone(false);
  };

  useEffect(() => {
    if (!running || currentStage < 0) return;

    intervalRef.current = setTimeout(() => {
      if (currentStage < stages.length - 1) {
        setCompleted(prev => [...prev, currentStage]);
        setCurrentStage(prev => prev + 1);
      } else {
        setCompleted(prev => [...prev, currentStage]);
        setRunning(false);
        setDone(true);
      }
    }, STAGE_DURATION);

    return () => { if (intervalRef.current) clearTimeout(intervalRef.current); };
  }, [running, currentStage]);

  const progress = currentStage < 0 ? 0 : done ? 100 : ((currentStage + 0.5) / stages.length) * 100;

  // Wall visual state
  const WallVisual = () => {
    if (currentStage < 0) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-warm-gray rounded-card">
          <p className="font-dmsans text-charcoal text-sm opacity-60">Click &quot;Start Simulation&quot; to begin</p>
        </div>
      );
    }
    if (currentStage === 0 && !completed.includes(0)) {
      return (
        <div className="relative w-full h-full bg-warm-gray rounded-card overflow-hidden">
          <p className="absolute top-3 left-3 text-charcoal text-xs font-dmsans opacity-60">Blank wall — preparation in progress</p>
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-16 h-6 bg-vivid-red/70 rounded"
            animate={{ x: ['-100%', '800%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute bottom-0 inset-x-0 h-8 bg-charcoal/20" />
        </div>
      );
    }
    if (currentStage === 1 && !completed.includes(1)) {
      return (
        <div className="relative w-full h-full bg-warm-gray rounded-card overflow-hidden">
          {/* Printing bands */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-deep-red via-vivid-red to-warm-gray"
            initial={{ width: '0%' }}
            animate={{ width: '60%' }}
            transition={{ duration: STAGE_DURATION / 1000 - 0.5, ease: 'linear' }}
          />
          {/* Printer head */}
          <motion.div
            className="absolute top-2 bg-jet-black text-white text-lg px-2 py-1 rounded shadow-lg z-10"
            animate={{ left: ['0%', '55%'] }}
            transition={{ duration: STAGE_DURATION / 1000 - 0.5, ease: 'linear' }}
          >
            🖨️
          </motion.div>
          <div className="absolute bottom-0 inset-x-0 h-8 bg-charcoal/30" />
        </div>
      );
    }
    if (currentStage === 2 && !completed.includes(2)) {
      return (
        <div className="relative w-full h-full rounded-card overflow-hidden" style={{ background: 'linear-gradient(135deg, #8C1518 0%, #E02226 50%, #c43b1a 100%)' }}>
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(255,255,255,0.1)' }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          {/* UV glow */}
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-white"
              style={{ left: `${15 + i * 22}%`, top: '40%' }}
              animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
          <p className="absolute bottom-3 left-0 right-0 text-center text-white/60 text-xs font-dmsans">
            UV curing in progress...
          </p>
          <div className="absolute bottom-0 inset-x-0 h-8 bg-charcoal/30" />
        </div>
      );
    }
    // Done / stage 3
    return (
      <div
        className="relative w-full h-full rounded-card overflow-hidden flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #1a4a2e 0%, #2d7a4a 40%, #E02226 80%, #8C1518 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 2px, transparent 2px, transparent 24px)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10 px-6"
        >
          <p className="font-poppins font-bold text-white uppercase text-2xl md:text-3xl drop-shadow-lg">
            VIVID WALLS
          </p>
          <p className="font-dmsans text-white/80 text-sm mt-1">Jamaica&apos;s Premier UV Wall Printing</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 inline-flex items-center gap-2 bg-vivid-red px-4 py-2 rounded-btn"
          >
            <CheckCircle size={16} className="text-white" />
            <span className="text-white text-sm font-dmsans font-semibold">Mural Complete!</span>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 inset-x-0 h-10 bg-charcoal/40" />
      </div>
    );
  };

  return (
    <section id="simulator" className="section-padding bg-jet-black">
      <div className="container-max">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="font-dmsans text-vivid-red text-sm font-semibold uppercase tracking-widest mb-2">
            See It In Action
          </p>
          <h2 className="font-poppins font-bold text-white uppercase text-4xl md:text-5xl leading-tight">
            LIVE PROJECT<br />SIMULATOR
          </h2>
          <SectionDivider />
          <p className="font-dmsans text-warm-gray text-lg leading-relaxed">
            Watch a simulated UV printing session — from bare wall to finished mural — step by step.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — Wall visual & progress */}
          <div className="space-y-5">
            {/* Wall preview */}
            <div className="h-72 md:h-96">
              <WallVisual />
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-xs font-dmsans text-warm-gray mb-2">
                <span>Progress</span>
                <span className="text-vivid-red font-semibold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-charcoal rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="h-full bg-vivid-red rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Status */}
            <AnimatePresence mode="wait">
              {currentStage >= 0 && (
                <motion.div
                  key={currentStage}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-start gap-3 bg-charcoal rounded-card p-4"
                >
                  <div className="w-2 h-2 rounded-full bg-vivid-red flex-shrink-0 mt-1.5 animate-pulse-red" />
                  <div>
                    <p className="font-dmsans font-semibold text-white text-sm">
                      {done ? stages[stages.length - 1].status : stages[Math.min(currentStage, stages.length - 1)].status}
                    </p>
                    <p className="font-dmsans text-warm-gray text-xs mt-0.5">
                      {done ? stages[stages.length - 1].detail : stages[Math.min(currentStage, stages.length - 1)].detail}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls */}
            <div className="flex gap-3">
              {!running && !done && (
                <Button variant="primary" size="md" onClick={startSimulation}>
                  <Play size={16} /> Start Simulation
                </Button>
              )}
              {(running || done) && (
                <Button variant="ghost" size="md" onClick={reset}>
                  <RotateCcw size={16} /> Reset
                </Button>
              )}
              {done && (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get a Quote
                </Button>
              )}
            </div>
          </div>

          {/* Right — Stage buttons */}
          <div className="space-y-3">
            {stages.map(stage => {
              const isActive = currentStage === stage.id && !completed.includes(stage.id);
              const isCompleted = completed.includes(stage.id);
              const isUpcoming = currentStage < stage.id || currentStage < 0;

              return (
                <motion.div
                  key={stage.id}
                  className={`flex items-center gap-4 p-4 rounded-card border-l-4 transition-all duration-300 ${
                    isActive
                      ? 'border-vivid-red bg-vivid-red/10'
                      : isCompleted
                      ? 'border-deep-red bg-deep-red/10'
                      : 'border-charcoal bg-charcoal'
                  }`}
                >
                  {/* Stage circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-vivid-red'
                        : isCompleted
                        ? 'bg-deep-red'
                        : 'bg-jet-black'
                    }`}
                  >
                    {isCompleted ? <CheckCircle size={22} className="text-white" /> : stage.emoji}
                  </div>

                  <div className="flex-1">
                    <p
                      className={`font-poppins font-bold uppercase text-sm tracking-wide ${
                        isActive ? 'text-vivid-red' : isCompleted ? 'text-white' : 'text-warm-gray'
                      }`}
                    >
                      Stage {stage.id + 1}: {stage.label}
                    </p>
                    <p className="font-dmsans text-warm-gray text-xs mt-0.5">
                      {stage.detail.substring(0, 70)}...
                    </p>
                  </div>

                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-vivid-red animate-pulse-red flex-shrink-0" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
