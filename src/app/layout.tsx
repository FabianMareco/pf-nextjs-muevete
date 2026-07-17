// src/app/layout.tsx
import type { Metadata } from 'next';
import { Bricolage_Grotesque, Manrope } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'aos/dist/aos.css';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MUEVETE - El movimiento, con actitud',
  description: 'Clases de danza, yoga y nutrición en vivo y grabadas, más merchandising oficial. Movete a tu ritmo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bricolage.variable} ${manrope.variable}`}>
      <body className="flex flex-col min-h-screen bg-paper text-ink font-sans">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster position="bottom-right" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}