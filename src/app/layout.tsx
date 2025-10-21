import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: '800',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Mestre Marmorista',
  description: 'A técnica que transforma qualquer piso comum em um mármore de luxo.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-body antialiased overflow-x-hidden">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
