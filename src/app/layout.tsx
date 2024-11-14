import './globals.css';

import type { Metadata } from 'next';

import Providers from '@/app/provider';

export const metadata: Metadata = {
  title: '타이틀',
  description: '설명',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
