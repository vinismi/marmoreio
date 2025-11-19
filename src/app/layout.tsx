import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import SocialProofToast from '@/components/social-proof-toast';
import Script from 'next/script';
import Head from 'next/head';

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
      <head>
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        <link
          rel="preload"
          href={inter.style.fontFamily}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={poppins.style.fontFamily}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.pixelId = "691d35bfa6b29da467aa13a1";
              var a = document.createElement("script");
              a.setAttribute("async", "");
              a.setAttribute("defer", "");
              a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
              document.head.appendChild(a);
            `,
          }}
        />
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

        <script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          async
          defer
        ></script>
        
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2337888003308713&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="font-body antialiased overflow-x-hidden">
        {children}
        <Toaster />
        <SocialProofToast />
      </body>
    </html>
  );
}
