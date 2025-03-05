import React from 'react';
import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { QueryProvider } from '@/components/QueryProvider';

const font = Jost({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Hotel Booking System Dashboard',
  description: 'Hotel Booking System Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <QueryProvider>
          <main>{children}</main>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
