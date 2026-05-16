'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Instagram, Facebook, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export default function Footer() {
  const { addToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    addToast('Message sent! We\'ll reply within 24 hours.');
    setForm({ name: '', email: '', message: '' });
  };

  const inputClass =
    'w-full bg-smoke text-jet-black placeholder-gray-400 border border-warm-gray rounded-input px-4 py-3 text-sm font-dmsans outline-none focus:border-vivid-red focus:ring-1 focus:ring-vivid-red transition-all';

  return (
    <footer className="bg-white border-t-2 border-vivid-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Column 1 — Brand */}
          <div className="space-y-5">
            <div>
              <div className="inline-block mb-2">
                <Image
                  src="/logo-transparent.jpg"
                  alt="Vivid Walls"
                  width={160}
                  height={54}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-charcoal font-dmsans italic mt-1">
                Bold Finishes. Lasting Impressions.
              </p>
            </div>
            <p className="text-charcoal text-sm leading-relaxed">
              Jamaica&apos;s leading Direct-to-Wall UV Printing studio. Transforming homes, offices, hotels, and restaurants across the island with vibrant, permanent, high-resolution murals.
            </p>

            {/* Jamaica notes */}
            <div className="space-y-2">
              {[
                'Humidity-resistant UV inks',
                'Fast 1–2 day installation',
                'Island-wide service — all 14 parishes',
                'Eco-friendly, odour-free process',
              ].map(note => (
                <div key={note} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-vivid-red flex-shrink-0" />
                  <span className="text-charcoal text-sm">{note}</span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-4 pt-2">
              {[
                { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/vividwallsjm' },
                { icon: Facebook,  label: 'Facebook',  href: '#' },
                { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/8764142349' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-btn border border-warm-gray flex items-center justify-center text-vivid-red hover:bg-vivid-red hover:text-white hover:border-vivid-red transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Service Areas & Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-poppins font-bold text-jet-black uppercase tracking-wide text-sm mb-3">
                Service Areas
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {[
                  'Kingston', 'St. Andrew', 'Portmore', 'Spanish Town',
                  'Montego Bay', 'Ocho Rios', 'Mandeville', 'Negril',
                  'May Pen', 'Savanna-la-Mar', 'Port Antonio', 'Falmouth',
                ].map(area => (
                  <div key={area} className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-vivid-red flex-shrink-0" />
                    <span className="text-charcoal text-sm">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-poppins font-bold text-jet-black uppercase tracking-wide text-sm">
                Contact
              </h3>
              <p className="font-dmsans text-vivid-red text-xs uppercase tracking-widest font-semibold">Hakeem Bailey</p>
              <div className="flex items-center gap-3 text-charcoal text-sm">
                <Phone size={16} className="text-vivid-red flex-shrink-0" />
                <a href="tel:8764142349" className="text-charcoal hover:text-vivid-red transition-colors">876-414-2349</a>
              </div>
              <div className="flex items-center gap-3 text-charcoal text-sm">
                <MessageCircle size={16} className="text-vivid-red flex-shrink-0" />
                <a href="https://wa.me/8764142349" target="_blank" rel="noopener noreferrer" className="text-charcoal hover:text-vivid-red transition-colors">WhatsApp: 876-414-2349</a>
              </div>
              <div className="flex items-center gap-3 text-charcoal text-sm">
                <Mail size={16} className="text-vivid-red flex-shrink-0" />
                <a href="mailto:vividwallsjm@gmail.com" className="text-charcoal hover:text-vivid-red transition-colors">vividwallsjm@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Column 3 — Contact Form */}
          <div>
            <h3 className="font-poppins font-bold text-jet-black uppercase tracking-wide text-sm mb-4">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className={inputClass}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className={inputClass}
              />
              <textarea
                placeholder="Your message..."
                rows={4}
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className={inputClass + ' resize-none'}
              />
              <Button variant="primary" size="md" fullWidth type="submit">
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-warm-gray mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-charcoal text-sm">
            © {new Date().getFullYear()} Vivid Walls Jamaica. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service'].map(link => (
              <a
                key={link}
                href="#"
                className="text-charcoal text-sm hover:text-vivid-red transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
