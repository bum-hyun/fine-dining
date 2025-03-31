import './globals.css';

import type { Metadata } from 'next';
import { css } from 'styled-system/css';

import Header from '@/app/header';
import Providers from '@/app/provider';

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
      <head>
        <link rel="preconnect" href={`${process.env.NEXT_PUBLIC_SUPABASE_URL!}`} />
        <link rel="dns-prefetch" href={`${process.env.NEXT_PUBLIC_SUPABASE_URL!}`} />
      </head>
      <Providers>
        <body className={css({ display: 'flex', flexDirection: 'column', height: '100vh' })}>
          <Header />
          {children}
        </body>
        {/*{env === 'development' && (*/}
        {/*  <InitializeWorker>*/}
        {/*    <body>{children}</body>*/}
        {/*  </InitializeWorker>*/}
        {/*)}*/}
        {/*{env !== 'development' && <body>{children}</body>}*/}
      </Providers>
    </html>
  );
}
