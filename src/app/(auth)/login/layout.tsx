import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '타이틀',
  description: '설명',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: RootLayoutProps) {
  return <>{children}</>;
}
