import './globals.css';

import type { Metadata } from 'next';

import Providers from '@/app/provider';

export const metadata: Metadata = {
  title: '타이틀',
  description: '설명',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
