'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { css } from 'styled-system/css';

import Button from '@/components/Button/Button';
import Modal from '@/components/Overlay/Modal';
import { ROUTE_PATHS } from '@/constants/pathname';
import browserClient from '@/utils/supabase/client';

const Header = () => {
  const router = useRouter();

  const [visible, setVisible] = useState(false);

  const signInWithKakao = async () => {
    await browserClient.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/callback` : 'http://localhost:3000/auth/callback',
      },
    });
  };

  const handleClickLogin = useCallback(() => {
    setVisible(true);
  }, []);

  return (
    <>
      <div className={containerStyle}>
        <div className={lefSideContainerStyle}>
          <span className={logoStyle} onClick={() => router.push(ROUTE_PATHS.HOME)}>
            Fine Dining
          </span>
        </div>
        {/*<Image src={'/logo.png'} alt={'logo'} width={200} height={48} />*/}
        <div className={rightSideContainerStyle}>
          <Button onClick={handleClickLogin}>로그인</Button>
        </div>
      </div>
      <div className={emptyHeightStyle} />
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <div className={loginCardStyle}>
          <div className={doLoginTextStlye}>로그인 하기</div>
          <Button className={buttonStyle} onClick={signInWithKakao}>
            <div className={kakaoLoginStyle}>
              <Image src={'small_kakao.svg'} alt={'카카오 아이콘'} width={18} height={18} />
              <span>카카오 로그인</span>
            </div>
          </Button>
        </div>
      </Modal>
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
  userSelect: 'none',
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

const loginCardStyle = css({
  padding: '1.25rem 2rem',
  backgroundColor: '#fff',
  borderRadius: '1rem',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, .1), 0px 8px 16px rgba(0, 0, 0, .1)',
});

const doLoginTextStlye = css({
  marginBottom: '16px',
  fontSize: '20px',
  fontWeight: '800',
});

const buttonStyle = css({
  width: '100%',
  backgroundColor: '#ffe500',
  color: '#191a20',
});

const kakaoLoginStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});
