import type { Metadata } from 'next';
import { Poppins, DM_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-poppins',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dmsans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vivid Walls Jamaica — Direct UV Wall Printing',
  description:
    'Jamaica\'s premier Direct-to-Wall UV Printing studio. Photo-realistic murals, 3D embossed feature walls, and vibrant brand graphics printed directly on any surface across Kingston and island-wide.',
  keywords: ['UV wall printing Jamaica', 'mural printing Kingston', '3D wall printing Jamaica', 'Vivid Walls'],
  icons: {
    icon: '/logo-transparent.jpg',
    apple: '/logo-transparent.jpg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${dmSans.variable}`}>
      <body className="font-dmsans leading-relaxed bg-white text-jet-black dark:bg-jet-black dark:text-smoke antialiased">
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
