import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Technology from '@/components/sections/Technology';
import Visualizer from '@/components/sections/Visualizer';
import Gallery from '@/components/sections/Gallery';
import Quote from '@/components/sections/Quote';
import Simulator from '@/components/sections/Simulator';
import ChatWidget from '@/components/ChatWidget';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Technology />
        <Visualizer />
        <Gallery />
        <Quote />
        <Simulator />
      </main>
      <Footer />
      <ChatWidget />
      <WhatsAppButton />
    </>
  );
}
