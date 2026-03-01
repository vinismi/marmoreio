import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

import Script from 'next/script';
import Head from 'next/head';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700', '800'],
  variable: '--font-sora',
});

export const metadata: Metadata = {
  title: 'Efeito Mármore 💎 — Fature R$15K/mês com Pintura Marmorizada',
  description: 'O método completo que está transformando pintores comuns em especialistas premium. Aprenda a fechar contratos de R$5.000 a R$30.000 em até 7 dias.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable}`}>
      <head>
        {/* Pixel scripts moved to Next.js Script component for optimization */}
      </head>
      <body className="font-body antialiased overflow-x-hidden">
        <Script id="utmify-pixel" strategy="afterInteractive">
          {`
            window.pixelId = "691d35bfa6b29da467aa13a1";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
            document.head.appendChild(a);
          `}
        </Script>

        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2337888003308713');
            fbq('track', 'PageView');
          `}
        </Script>

        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          id="utmify-utms"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          strategy="afterInteractive"
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2337888003308713&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
