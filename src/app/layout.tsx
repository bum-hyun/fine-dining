import './globals.css';

import type { Metadata } from 'next';
import { css } from 'styled-system/css';

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
            <body>
              <header className={header}>여기가 헤더여</header>
              {children}
            </body>
          </InitializeWorker>
        )}
        {env !== 'development' && (
          <body>
            <header className={header}>여기가 헤더여</header>
            {children}
          </body>
        )}
      </Providers>
    </html>
  );
}

const header = css({
  padding: '16px',
});
