import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { ellipsis } from 'styled-system/patterns';

import RestaurantTags from '@/components/RestaurantTags';

interface IRestaurantCardProps {
  item: IRestaurant;
}

const RestaurantCard = ({ item }: IRestaurantCardProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <article className={containerStyle}>
      <div className={imageWrapStyle} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {isHover && (
          <div className={imageWrapOverlayStyle}>
            <div className={buttonWrapStyle}>
              <button className={buttonStyle}>
                <Link href={item.reservation_url} target={'_blank'}>
                  예약 페이지
                </Link>
              </button>
              <button className={buttonStyle}>수정 제안</button>
            </div>
          </div>
        )}
        {item.thumbnail && <Image className={imageStyle} src={item.thumbnail} alt={'image'} width={500} height={500} />}
      </div>
      <div className={infoWrapStyle}>
        <RestaurantTags tags={item.tags} />
        <h4 className={nameStyle}>{item.name}</h4>
        <p className={descriptionStyle}>{item.description}</p>
      </div>
    </article>
  );
};

export default RestaurantCard;

const containerStyle = css({
  flex: 'none',
  position: 'relative',
  maxWidth: '236px',
});

const imageWrapStyle = css({
  position: 'relative',
  display: 'flex',
  width: '236px',
  height: '315px',
  backgroundColor: '#7c7c7c',
  borderRadius: '16px',
  overflow: 'hidden',
});

const imageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const infoWrapStyle = css({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '16px',
  overflowX: 'hidden',
});

const nameStyle = ellipsis({
  marginTop: '4px',
  color: '#111',
  lines: 2,
});

const descriptionStyle = ellipsis({
  lines: 2,
});

const imageWrapOverlayStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '#00000080',
  borderRadius: '16px',
});

const buttonWrapStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const buttonStyle = css({
  padding: '8px 16px',
  fontSize: '16px',
  fontWeight: '600',
  color: '#ffffff',
  backgroundColor: '#737373',
  borderRadius: '4px',
});
