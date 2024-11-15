import './globals.css';

import type { Metadata } from 'next';

import Providers from '@/app/provider';
import InitializeWorker from '@/components/InitializeWorker';

export const metadata: Metadata = {
  title: '타이틀',
  description: '설명',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const env = process.env.NODE_ENV;

  return (
    <html lang="ko">
      <Providers>
        {env === 'development' && (
          <InitializeWorker>
            <body>{children}</body>
          </InitializeWorker>
        )}
        {env !== 'development' && <body>{children}</body>}
      </Providers>
    </html>
  );
}
