import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Hotel Booking System',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
