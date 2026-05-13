import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Technology from '@/components/sections/Technology';
import Audience from '@/components/sections/Audience';
import Visualizer from '@/components/sections/Visualizer';
import Gallery from '@/components/sections/Gallery';
import Quote from '@/components/sections/Quote';
import Simulator from '@/components/sections/Simulator';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Technology />
        <Audience />
        <Visualizer />
        <Gallery />
        <Quote />
        <Simulator />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
