import './globals.css';

import type { Metadata } from 'next';

import Providers from '@/app/provider';
import Header from '@/app/ui/header';

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
        <body>
          <Header />
          {children}
        </body>
      </Providers>
    </html>
  );
}
