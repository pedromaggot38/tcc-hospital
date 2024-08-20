import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`min-h-screen ${inter.className}`}>
      <main>{children}</main>
    </div>
  );
}
