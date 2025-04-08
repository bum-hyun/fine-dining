'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { css } from 'styled-system/css';

import Button from '@/components/Button/Button';
import { ROUTE_PATHS } from '@/constants/pathname';
import { useUserStore } from '@/stores/userStore';
import browserClient from '@/utils/supabase/client';

const LoginModal = dynamic(() => import('@/components/home/LoginModal'), {
  ssr: false,
  loading: () => null,
});

const Header = () => {
  const router = useRouter();

  const { isLoggedIn, setUser } = useUserStore();

  const [visible, setVisible] = useState(false);

  const getUser = async () => {
    const {
      data: { user },
    } = await browserClient.auth.getUser();
    if (!user) return;
    setUser({
      name: user.user_metadata.name,
      email: user.user_metadata.email,
      nickname: user.user_metadata.nickname,
      avatar_url: user.user_metadata.avatar_url,
      role: user.role,
      id: user.id,
      provider: user.app_metadata.provider,
    });

    return user;
  };

  const handleClickLogin = useCallback(() => {
    setVisible(true);
  }, []);

  const handleClickLogout = async () => {
    const { error } = await browserClient.auth.signOut();
    if (!error) setUser(null);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className={containerStyle}>
        <div className={lefSideContainerStyle}>
          <span className={logoStyle} onClick={() => router.push(ROUTE_PATHS.HOME)}>
            Fine Dining
          </span>
        </div>
        <div className={rightSideContainerStyle}>
          {!isLoggedIn && <Button onClick={handleClickLogin}>로그인</Button>}
          {isLoggedIn && <Button onClick={handleClickLogout}>로그아웃</Button>}
        </div>
      </div>
      <div className={emptyHeightStyle} />
      <LoginModal visible={visible} handleCloseModal={() => setVisible(false)} />
    </>
  );
};

export default Header;

const containerStyle = css({
  position: 'fixed',
  top: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '72px',
  backgroundColor: '#000',
  userSelect: 'none',
  zIndex: 100,
});

const lefSideContainerStyle = css({
  flex: 1,
  padding: '16px',
});

const logoStyle = css({
  fontSize: '24px',
  fontWeight: 700,
  color: '#fff',
  backgroundColor: '#000',
  cursor: 'pointer',
});

const emptyHeightStyle = css({
  flex: 'none',
  height: '72px',
  backgroundColor: '#000',
});

const rightSideContainerStyle = css({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '16px',
});
