import Image from 'next/image';
import { css } from 'styled-system/css';

const Header = () => {
  return (
    <>
      <div className={container}>
        <Image src={'/next.svg'} alt={''} width={200} height={48} />
      </div>
      <div className={emptyHeight} />
    </>
  );
};

export default Header;

const container = css({
  position: 'fixed',
  top: '0',
  display: 'flex',
  alignItems: 'center',
  height: '80px',
  padding: '16px',
});

const emptyHeight = css({
  flex: 'none',
  height: '80px',
});
