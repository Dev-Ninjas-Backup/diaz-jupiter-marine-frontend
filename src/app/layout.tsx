import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

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
        className={`${inter.className} max-w-screen overflow-x-hidden antialiased font-inter`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
