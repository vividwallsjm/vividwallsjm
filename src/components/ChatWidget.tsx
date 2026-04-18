'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { getBotResponse, greetingMessage } from '@/data/chatResponses';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  quickReplies?: string[];
}

const mkId = () => Math.random().toString(36).slice(2);

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Greet on first open
  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([{
          id: mkId(),
          role: 'bot',
          text: greetingMessage.response,
          quickReplies: greetingMessage.quickReplies,
        }]);
      }, 900);
    }
    if (open) inputRef.current?.focus();
  }, [open, greeted]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: mkId(), role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // CUSTOMIZATION POINT: Replace getBotResponse with an API call for live agent
    setTimeout(() => {
      const resp = getBotResponse(text);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { id: mkId(), role: 'bot', text: resp.response, quickReplies: resp.quickReplies },
      ]);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 z-[998] w-[calc(100vw-2rem)] sm:w-96 flex flex-col rounded-card shadow-2xl overflow-hidden"
            style={{ maxHeight: '75vh' }}
          >
            {/* Header */}
            <div className="bg-jet-black px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-vivid-red flex items-center justify-center flex-shrink-0">
                <span className="font-poppins font-bold text-white text-xs">VW</span>
              </div>
              <div className="flex-1">
                <p className="font-poppins font-bold text-white text-sm">Vivid Walls — 24/7 Support</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-vivid-red animate-pulse-red" />
                  <span className="text-warm-gray text-xs font-dmsans">Online now</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-warm-gray hover:text-white transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Red accent */}
            <div className="h-[2px] bg-vivid-red flex-shrink-0" />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-smoke dark:bg-charcoal p-4 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-vivid-red flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="font-poppins font-bold text-white text-[10px]">VW</span>
                    </div>
                  )}
                  <div className="max-w-[80%] space-y-2">
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm font-dmsans leading-relaxed whitespace-pre-line ${
                        msg.role === 'user'
                          ? 'bg-vivid-red text-white rounded-br-sm'
                          : 'bg-white dark:bg-jet-black text-charcoal dark:text-smoke rounded-bl-sm shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    {/* Quick replies */}
                    {msg.role === 'bot' && msg.quickReplies && (
                      <div className="flex flex-wrap gap-1.5 pl-1">
                        {msg.quickReplies.map(qr => (
                          <button
                            key={qr}
                            onClick={() => sendMessage(qr)}
                            className="border border-vivid-red text-vivid-red text-xs font-dmsans px-3 py-1.5 rounded-full hover:bg-vivid-red hover:text-white transition-all duration-200"
                          >
                            {qr}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div className="w-7 h-7 rounded-full bg-vivid-red flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-poppins font-bold text-white text-[10px]">VW</span>
                  </div>
                  <div className="bg-white dark:bg-jet-black px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1.5 items-center">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-charcoal dark:bg-warm-gray inline-block"
                        style={{ animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Input bar */}
            <div className="flex-shrink-0 bg-white dark:bg-jet-black border-t border-warm-gray dark:border-charcoal px-3 py-3 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Type a message..."
                className="flex-1 bg-smoke dark:bg-charcoal text-jet-black dark:text-white placeholder-warm-gray text-sm font-dmsans px-4 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-vivid-red transition-all"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-vivid-red hover:bg-dark-red disabled:opacity-40 flex items-center justify-center transition-all flex-shrink-0"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(prev => !prev)}
        className="fixed bottom-6 right-4 z-[999] w-14 h-14 rounded-full bg-vivid-red hover:bg-dark-red flex items-center justify-center shadow-red-glow transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={24} className="text-white" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={24} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
