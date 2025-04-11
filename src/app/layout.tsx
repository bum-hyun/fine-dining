import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import Head from 'next/head';
import { css } from 'styled-system/css';

import Header from '@/app/header';
import { ReactQueryProvider } from '@/app/provider';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: '미식노트',
  description: '전 세계 레스토랑 후기 플랫폼',
  keywords: '레스토랑, 후기, 미식, 다이닝, 세계음식, 음식기록, 월드베스트레스토랑, 미슐랭',
  metadataBase: new URL('https://misiknote.com'),
  openGraph: {
    title: '미식노트',
    description: '전 세계 레스토랑 후기 플랫폼',
    url: 'https://misiknote.com',
    type: 'website',
    images: ['/background.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <Head>
        <link rel="preconnect" href={`${process.env.NEXT_PUBLIC_SUPABASE_URL!}`} />
        <link rel="dns-prefetch" href={`${process.env.NEXT_PUBLIC_SUPABASE_URL!}`} />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <ReactQueryProvider>
        <body className={css({ display: 'flex', flexDirection: 'column', height: '100vh' })}>
          <Header />
          {children}
          <SpeedInsights />
          <Analytics />
        </body>
        {/*{env === 'development' && (*/}
        {/*  <InitializeWorker>*/}
        {/*    <body>{children}</body>*/}
        {/*  </InitializeWorker>*/}
        {/*)}*/}
        {/*{env !== 'development' && <body>{children}</body>}*/}
      </ReactQueryProvider>
    </html>
  );
}
