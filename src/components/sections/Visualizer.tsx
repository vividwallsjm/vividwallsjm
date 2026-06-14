'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { Maximize2, Layers, Type, Upload, X, Mail, ArrowUpLeft, ArrowUpRight, ArrowDownLeft, ArrowDownRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import SectionDivider from '@/components/ui/SectionDivider';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

const rooms = [
  {
    id: 'living',
    label: 'Living Room',
    photo: '/rooms/living-room.jpeg',
    photoFit: 'cover' as const,
    bg: 'linear-gradient(135deg, #d4c4b0 0%, #b8a898 40%, #e8ddd0 100%)',
    floorColor: '#8B7355',
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    photo: '/rooms/bedroom.jpeg',
    photoFit: 'contain' as const,
    bg: 'linear-gradient(135deg, #c8d4e8 0%, #a8b8d4 40%, #dce4f0 100%)',
    floorColor: '#5a4a3a',
  },
  {
    id: 'office',
    label: 'Office',
    photo: '/rooms/office.jpeg',
    photoFit: 'cover' as const,
    bg: 'linear-gradient(135deg, #d8d8d8 0%, #c0c0c0 40%, #e8e8e8 100%)',
    floorColor: '#4a4a4a',
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    photo: '/rooms/restaurant.jpeg',
    photoFit: 'contain' as const,
    bg: 'linear-gradient(135deg, #c8b090 0%, #b09070 40%, #d8c0a0 100%)',
    floorColor: '#3a2a1a',
  },
  {
    id: 'hotel',
    label: 'Hotel Lobby',
    photo: '/rooms/hotel-lobby.jpeg',
    photoFit: 'contain' as const,
    bg: 'linear-gradient(135deg, #e8e4d8 0%, #d4cfc0 40%, #f0ece0 100%)',
    floorColor: '#6a5a4a',
  },
  {
    id: 'retail',
    label: 'Retail',
    photo: '/rooms/retail.jpeg',
    photoFit: 'contain' as const,
    bg: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 40%, #fafafa 100%)',
    floorColor: '#2a2a2a',
  },
];


export default function Visualizer() {
  const [activeRoom, setActiveRoom] = useState(rooms[0]);
const [is3D, setIs3D] = useState(false);
  const [textOverlay, setTextOverlay] = useState('');
  const [fullscreen, setFullscreen] = useState(false);
  const [uploadedDesign, setUploadedDesign] = useState<string | null>(null);
  const [designWidth, setDesignWidth] = useState(180);
  const [dragging, setDragging] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentMsg, setSentMsg] = useState(false);

  const designMotionX = useMotionValue(0);
  const designMotionY = useMotionValue(0);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resizeStartRef = useRef<{ cx: number; cy: number; startDist: number; startWidth: number } | null>(null);
  const designElRef = useRef<HTMLDivElement>(null);
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const gestureRef = useRef<{
    startDist: number;
    startWidth: number;
    startCx: number;
    startCy: number;
    startX: number;
    startY: number;
  } | null>(null);

  const handleDesignUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 20 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = e => setUploadedDesign(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const onDropDesign = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleDesignUpload(file);
  };

  const handleSaveAndSend = async () => {
    if (!previewRef.current) return;
    setSending(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        scale: 2,
        onclone: (_doc, el) => {
          el.style.transform = 'none';
          el.style.boxShadow = 'none';
        },
      });
      const link = document.createElement('a');
      link.download = `vivid-walls-${activeRoom.id}-preview.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      const subject = encodeURIComponent('My Vivid Walls Design Preview');
      const body = encodeURIComponent(
        `Hi Vivid Walls,\n\nPlease find my wall design preview attached.\n\nRoom: ${activeRoom.label}\nDesign: ${uploadedDesign ? 'Custom Upload' : 'None'}\n3D Effect: ${is3D ? 'On' : 'Off'}\n\nI would love to get a quote for this design.\n\nThank you!`
      );
      window.open(`mailto:?subject=${subject}&body=${body}`);
      setSentMsg(true);
      setTimeout(() => setSentMsg(false), 4000);
    } finally {
      setSending(false);
    }
  };

  // Keep the design clamped inside the preview box.
  const clampPosition = useCallback(() => {
    const container = previewRef.current;
    const el = designElRef.current;
    if (!container || !el) return;
    const c = container.getBoundingClientRect();
    const e = el.getBoundingClientRect();
    const limitX = Math.max(0, (c.width - e.width) / 2);
    const limitY = Math.max(0, (c.height - e.height) / 2);
    designMotionX.set(Math.max(-limitX, Math.min(limitX, designMotionX.get())));
    designMotionY.set(Math.max(-limitY, Math.min(limitY, designMotionY.get())));
  }, [designMotionX, designMotionY]);

  // Unified pointer gestures: 1 finger = move, 2 fingers = pinch-resize + pan.
  const handleDesignPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointersRef.current.size === 2) {
      const [a, b] = Array.from(pointersRef.current.values());
      gestureRef.current = {
        startDist: Math.hypot(a.x - b.x, a.y - b.y),
        startWidth: designWidth,
        startCx: (a.x + b.x) / 2,
        startCy: (a.y + b.y) / 2,
        startX: designMotionX.get(),
        startY: designMotionY.get(),
      };
    }
  };

  const handleDesignPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const prev = pointersRef.current.get(e.pointerId);
    if (!prev) return;
    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    const gesture = gestureRef.current;
    if (pointersRef.current.size >= 2 && gesture) {
      const [a, b] = Array.from(pointersRef.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const cx = (a.x + b.x) / 2;
      const cy = (a.y + b.y) / 2;
      const maxFill = previewRef.current?.getBoundingClientRect().width ?? 600;
      setDesignWidth(Math.max(60, Math.min(maxFill, gesture.startWidth * (dist / gesture.startDist))));
      designMotionX.set(gesture.startX + (cx - gesture.startCx));
      designMotionY.set(gesture.startY + (cy - gesture.startCy));
      clampPosition();
      return;
    }

    designMotionX.set(designMotionX.get() + dx);
    designMotionY.set(designMotionY.get() + dy);
    clampPosition();
  };

  const handleDesignPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) gestureRef.current = null;
    clampPosition();
  };

  const wallStyle = {
    background: activeRoom.photo ? 'transparent' : activeRoom.bg,
    ...(is3D && {
      boxShadow: 'inset 0 0 60px rgba(0,0,0,0.3), inset 4px 4px 20px rgba(255,255,255,0.1)',
      transform: 'perspective(800px) rotateY(-2deg)',
    }),
  };

  const WallPreview = ({ height = 'h-80', innerRef }: { height?: string; innerRef?: React.RefObject<HTMLDivElement> }) => (
    <div
      ref={innerRef}
      className={`relative ${height} rounded-card overflow-hidden transition-all duration-500`}
      style={wallStyle}
    >
      {/* Room background photo */}
      <AnimatePresence mode="wait">
        {activeRoom.photo && (
          <motion.img
            key={activeRoom.id}
            src={activeRoom.photo}
            alt={`${activeRoom.label} room`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: activeRoom.photoFit }}
          />
        )}
      </AnimatePresence>

      {/* Uploaded design — draggable in main preview, static in fullscreen */}
      <AnimatePresence>
        {uploadedDesign && innerRef && (
          <motion.div
            key="uploaded-interactive"
            ref={designElRef}
            onPointerDown={handleDesignPointerDown}
            onPointerMove={handleDesignPointerMove}
            onPointerUp={handleDesignPointerUp}
            onPointerCancel={handleDesignPointerUp}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.3 } }}
            style={{
              x: designMotionX,
              y: designMotionY,
              width: designWidth,
              position: 'absolute',
              top: '50%',
              left: '50%',
              translateX: '-50%',
              translateY: '-50%',
            }}
            className="cursor-grab active:cursor-grabbing touch-none select-none z-10"
          >
            <img
              src={uploadedDesign}
              alt="Your design on wall"
              className="w-full h-auto block pointer-events-none rounded-sm"
              draggable={false}
            />
            {([
              { pos: '-top-2.5 -left-2.5', cursor: 'cursor-nwse-resize', Icon: ArrowUpLeft },
              { pos: '-top-2.5 -right-2.5', cursor: 'cursor-nesw-resize', Icon: ArrowUpRight },
              { pos: '-bottom-2.5 -left-2.5', cursor: 'cursor-nesw-resize', Icon: ArrowDownLeft },
              { pos: '-bottom-2.5 -right-2.5', cursor: 'cursor-nwse-resize', Icon: ArrowDownRight },
            ] as const).map(({ pos, cursor, Icon }) => (
              <div
                key={pos}
                className={`absolute ${pos} ${cursor} w-6 h-6 bg-vivid-red rounded-full border-2 border-white shadow-md flex items-center justify-center`}
                style={{ touchAction: 'none' }}
                onPointerDown={e => {
                  e.stopPropagation();
                  e.currentTarget.setPointerCapture(e.pointerId);
                  const rect = designElRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  const cx = rect.left + rect.width / 2;
                  const cy = rect.top + rect.height / 2;
                  resizeStartRef.current = {
                    cx,
                    cy,
                    startDist: Math.hypot(e.clientX - cx, e.clientY - cy),
                    startWidth: designWidth,
                  };
                }}
                onPointerMove={e => {
                  const start = resizeStartRef.current;
                  if (!start) return;
                  e.stopPropagation();
                  const dist = Math.hypot(e.clientX - start.cx, e.clientY - start.cy);
                  const maxFill = previewRef.current?.getBoundingClientRect().width ?? 600;
                  setDesignWidth(Math.max(60, Math.min(maxFill, start.startWidth * (dist / start.startDist))));
                  clampPosition();
                }}
                onPointerUp={e => { e.stopPropagation(); resizeStartRef.current = null; }}
                onPointerCancel={e => { e.stopPropagation(); resizeStartRef.current = null; }}
              >
                <Icon size={13} className="text-white pointer-events-none" strokeWidth={2.5} />
              </div>
            ))}
          </motion.div>
        )}
        {uploadedDesign && !innerRef && (
          <motion.img
            key="uploaded-static"
            src={uploadedDesign}
            alt="Your design on wall"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.93 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: 'contain' }}
          />
        )}
      </AnimatePresence>

      {/* Text overlay */}
      {textOverlay && (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p className="font-poppins font-bold text-white text-3xl md:text-4xl uppercase text-center drop-shadow-lg">
            {textOverlay}
          </p>
        </div>
      )}

      {/* Floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12"
        style={{ background: activeRoom.floorColor, opacity: 0.6 }}
      />

      {/* 3D badge */}
      {is3D && (
        <div className="absolute top-3 right-3 bg-vivid-red text-white text-xs font-poppins font-bold px-2 py-1 rounded-btn uppercase tracking-wider">
          3D Effect
        </div>
      )}

      {/* Empty state */}
      {!textOverlay && !uploadedDesign && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/40 font-dmsans text-sm">Upload your design or add text below</p>
        </div>
      )}
    </div>
  );

  return (
    <section id="visualizer" className="section-padding bg-smoke dark:bg-charcoal">
      <div className="container-max">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="font-dmsans text-vivid-red text-sm font-semibold uppercase tracking-widest mb-2">
            Interactive Tool
          </p>
          <h2 className="font-poppins font-bold text-jet-black dark:text-white uppercase text-4xl md:text-5xl leading-tight">
            DESIGN<br />VISUALIZER
          </h2>
          <SectionDivider />
          <p className="font-dmsans text-charcoal dark:text-warm-gray text-lg leading-relaxed">
            Experiment with different rooms, design styles, and text overlays to see how UV wall printing could transform your space.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls column */}
          <div className="space-y-6">
            {/* Room selector */}
            <div>
              <h3 className="font-poppins font-bold text-jet-black dark:text-white uppercase text-sm tracking-wide mb-3">
                Select Room
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {rooms.map(room => (
                  <button
                    key={room.id}
                    onClick={() => setActiveRoom(room)}
                    className={`py-2 px-3 rounded-btn text-sm font-dmsans font-medium transition-all duration-200 border-b-2 ${
                      activeRoom.id === room.id
                        ? 'bg-vivid-red text-white border-dark-red'
                        : 'bg-white dark:bg-jet-black text-charcoal dark:text-warm-gray border-transparent hover:border-vivid-red hover:text-vivid-red'
                    }`}
                  >
                    {room.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload your design */}
            <div id="upload-design">
              <h3 className="font-poppins font-bold text-jet-black dark:text-white uppercase text-sm tracking-wide mb-3 flex items-center gap-2">
                <Upload size={14} /> Upload Your Design
              </h3>
              {uploadedDesign ? (
                <div className="relative rounded-card overflow-hidden bg-white dark:bg-jet-black border border-vivid-red/30">
                  <img src={uploadedDesign} alt="Uploaded design preview" className="w-full h-24 object-contain" />
                  <button
                    onClick={() => setUploadedDesign(null)}
                    className="absolute top-1.5 right-1.5 bg-jet-black/60 text-white rounded-full p-0.5 hover:bg-vivid-red transition-colors"
                    aria-label="Remove uploaded design"
                  >
                    <X size={13} />
                  </button>
                  <p className="text-xs text-warm-gray font-dmsans px-1.5 pb-1.5">
                    Drag to move · Pinch or drag <span className="text-vivid-red font-medium">any corner</span> to resize
                  </p>
                </div>
              ) : (
                <div
                  onDragOver={e => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDropDesign}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-card p-5 text-center cursor-pointer transition-all duration-200 ${
                    dragging
                      ? 'border-vivid-red bg-vivid-red/5'
                      : 'border-charcoal/30 dark:border-warm-gray/20 hover:border-vivid-red hover:bg-vivid-red/5'
                  }`}
                >
                  <Upload size={22} className="mx-auto mb-2 text-warm-gray" />
                  <p className="text-xs font-dmsans text-charcoal dark:text-warm-gray leading-relaxed">
                    Drop your design here<br />
                    or <span className="text-vivid-red font-semibold">click to browse</span>
                  </p>
                  <p className="text-xs text-warm-gray/70 mt-1.5">JPG, PNG, WEBP · max 20 MB</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  const f = e.target.files?.[0];
                  if (f) handleDesignUpload(f);
                  e.target.value = '';
                }}
              />
            </div>

            {/* Text overlay */}
            <div>
              <h3 className="font-poppins font-bold text-jet-black dark:text-white uppercase text-sm tracking-wide mb-3 flex items-center gap-2">
                <Type size={14} /> Custom Text
              </h3>
              <input
                type="text"
                placeholder="Type text to overlay..."
                maxLength={40}
                value={textOverlay}
                onChange={e => setTextOverlay(e.target.value)}
                className="w-full border border-charcoal dark:border-warm-gray/30 rounded-input px-4 py-3 text-sm font-dmsans text-jet-black dark:text-white bg-white dark:bg-jet-black outline-none focus:border-vivid-red focus:ring-1 focus:ring-vivid-red transition-all placeholder-warm-gray"
              />
            </div>

            {/* 3D toggle */}
            <div>
              <h3 className="font-poppins font-bold text-jet-black dark:text-white uppercase text-sm tracking-wide mb-3 flex items-center gap-2">
                <Layers size={14} /> 3D Embossed Effect
              </h3>
              <button
                onClick={() => setIs3D(prev => !prev)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${is3D ? 'bg-vivid-red' : 'bg-warm-gray dark:bg-charcoal'}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300 ${is3D ? 'translate-x-7' : 'translate-x-0'}`}
                />
              </button>
              <p className="text-warm-gray text-xs mt-2 font-dmsans">
                {is3D ? 'ON — 3D perspective & depth effect active' : 'OFF — flat UV print view'}
              </p>
            </div>
          </div>

          {/* Preview column */}
          <div className="lg:col-span-2 space-y-4">
            <WallPreview height="h-96 md:h-[480px]" innerRef={previewRef} />
            <div className="flex gap-3 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFullscreen(true)}
              >
                <Maximize2 size={16} /> Fullscreen Preview
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveAndSend}
                disabled={sending}
              >
                <Mail size={16} /> {sending ? 'Saving…' : 'Save & Send'}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => { setTextOverlay(''); setIs3D(false); setUploadedDesign(null); setDesignWidth(180); designMotionX.set(0); designMotionY.set(0); }}
              >
                Reset
              </Button>
            </div>
            {sentMsg && (
              <p className="text-sm font-dmsans text-vivid-red font-medium">
                Preview saved — attach the downloaded image to the email that just opened.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      <Modal open={fullscreen} onClose={() => setFullscreen(false)} title="WALL PREVIEW — FULLSCREEN">
        <div className="p-6">
          <WallPreview height="h-[60svh]" />
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-dmsans text-charcoal dark:text-warm-gray">
            <div><span className="font-semibold text-jet-black dark:text-white">Room:</span> {activeRoom.label}</div>
            <div><span className="font-semibold text-jet-black dark:text-white">Design:</span> {uploadedDesign ? 'Custom Upload' : 'None'}</div>
            <div><span className="font-semibold text-jet-black dark:text-white">3D Effect:</span> {is3D ? 'On' : 'Off'}</div>
            <div><span className="font-semibold text-jet-black dark:text-white">Text:</span> {textOverlay || 'None'}</div>
          </div>
          <div className="mt-4">
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => { setFullscreen(false); document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Get a Quote for This Design
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
