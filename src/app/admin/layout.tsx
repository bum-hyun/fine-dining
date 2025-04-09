import Link from 'next/link';
import { css } from 'styled-system/css';

import { ROUTE_PATHS } from '@/constants/pathname';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={dashboardContainerStyle}>
      <nav className={navContainerStyle}>
        <div>
          <Link className={navWrapStyle} href={ROUTE_PATHS.ADMIN.LIST}>
            식당 리스트
          </Link>
        </div>
        <div>
          <Link className={navWrapStyle} href={ROUTE_PATHS.ADMIN.EDIT}>
            식당 추가
          </Link>
        </div>
      </nav>
      <div className={contentsContainerStyle}>{children}</div>
    </main>
  );
}

const dashboardContainerStyle = css({
  display: 'flex',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

const navContainerStyle = css({
  flex: 'none',
  display: 'flex',
  flexDirection: 'column',
  minWidth: '240px',
  color: '#fff',
  backgroundColor: '#2b2d40',
});

const navWrapStyle = css({
  display: 'flex',
  fontWeight: '600',
  cursor: 'pointer',
  padding: '16px',

  _hover: { opacity: '0.8' },
});

const contentsContainerStyle = css({
  flex: '1',
  display: 'flex',
  padding: '0 16px',
  overflow: 'hidden',
});
