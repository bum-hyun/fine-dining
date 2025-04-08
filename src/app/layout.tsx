import './globals.css';

import { css } from 'styled-system/css';

import Header from '@/app/header';
import { ReactQueryProvider } from '@/app/provider';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href={`${process.env.NEXT_PUBLIC_SUPABASE_URL!}`} />
        <link rel="dns-prefetch" href={`${process.env.NEXT_PUBLIC_SUPABASE_URL!}`} />
      </head>
      <ReactQueryProvider>
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
      </ReactQueryProvider>
    </html>
  );
}
