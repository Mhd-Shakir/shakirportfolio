import './globals.css';
import Navigation from '@/components/layout/Navigation';
import HomeArrow from '@/components/layout/HomeArrow';
import CustomCursor from '@/components/layout/CustomCursor';
import { Outfit, Roboto } from 'next/font/google';
import type { Metadata } from 'next';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const roboto = Roboto({ subsets: ['latin'], weight: ['900'], variable: '--font-roboto' });

export const metadata: Metadata = {
  title: 'Muhammed Shakir | Senior MERN & Next.js Expert',
  description: 'Immersive 3D Portfolio of Muhammed Shakir — Full-Stack, React Native, Next.js developer.',
  keywords: ['MERN', 'Next.js', 'Full Stack', 'React Native', 'MongoDB', 'Node.js', 'Developer'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${roboto.variable}`}>
      <body className="font-[--font-outfit] bg-[#020617] text-white antialiased">
        <CustomCursor />
        <Navigation />
        <HomeArrow />
        <main className="relative z-10 w-full h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
