import Link, { LinkProps } from 'next/link';
import { css } from 'styled-system/css';

const OverlayLink = ({ ...rest }: LinkProps) => {
  return <Link {...rest} className={link} />;
};

export default OverlayLink;

const link = css({ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', textDecoration: 'none', zIndex: 1000 });
