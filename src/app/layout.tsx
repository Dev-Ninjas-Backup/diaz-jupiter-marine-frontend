import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Jupiter Marine Sales',
  description: 'Hire with trust, Work with confidence.',
  // icons: {
  //   icon: "/favicon.svg",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.className} max-w-screen overflow-x-hidden antialiased font-inter`}
      >
        {/* Remove browser-extension-injected attributes (e.g. Grammarly) before React hydrates
            to avoid hydration mismatch warnings in development. This script runs
            `beforeInteractive` so it executes prior to React hydration. */}
        <Script id="remove-extension-attrs" strategy="beforeInteractive">
          {`(function(){try{var a=document.documentElement; if(a){a.removeAttribute('data-new-gr-c-s-check-loaded'); a.removeAttribute('data-gr-ext-installed');} var b=document.body; if(b){b.removeAttribute('data-new-gr-c-s-check-loaded'); b.removeAttribute('data-gr-ext-installed');}}catch(e){}})();`}
        </Script>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
