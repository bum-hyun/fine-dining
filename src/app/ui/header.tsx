'use client';
import { css } from 'styled-system/css';

import LoginForm from '@/app/ui/login-form';
import Modal from '@/components/Overlay/Modal';
import { useOverlay } from '@/hooks/useOverlay';

const Header = () => {
  const { open, close } = useOverlay();
  const handleClickButton = () => {
    open(
      <Modal onClose={close}>
        <LoginForm />
      </Modal>
    );
  };

  return (
    <header className={header}>
      <button onClick={handleClickButton}>회원가입</button>
      <button>로그인</button>
    </header>
  );
};

export default Header;

const header = css({
  padding: '16px',
});
