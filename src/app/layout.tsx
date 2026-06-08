import type {Metadata} from 'next';
import './globals.css';
import {Navbar} from '@/components/layout/Navbar';
import {Footer} from '@/components/layout/Footer';
import {Toaster} from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'HealthSync Medical Solutions Corporation | Medical Equipment & Healthcare Solutions Philippines',
  description: 'HealthSync Medical Solutions Corporation provides medical equipment, laboratory equipment, healthcare supplies, packaging solutions, and healthcare services across the Philippines.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}