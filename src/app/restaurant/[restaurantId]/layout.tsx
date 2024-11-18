import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '111',
  description: '222',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
