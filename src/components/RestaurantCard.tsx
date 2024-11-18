import Image from 'next/image';
import { css } from 'styled-system/css';
import { ellipsis } from 'styled-system/patterns';

import OverlayLink from '@/components/OverlayLink';

interface IRestaurantCardProps {
  item: IRestaurant;
}

const RestaurantCard = ({ item }: IRestaurantCardProps) => {
  return (
    <li className={container}>
      <OverlayLink href={''} />
      <div className={imageWrapper}>
        <Image src={'https://vip.teepee.kr/2024/11/13/09/33/05/a5ee4198-7ac5-4590-bab7-848c10c35e08.png?width=500'} alt={'image'} width={500} height={500} />
      </div>
      <div className={infoWrap}>
        <h5>{item.name}</h5>
        <p className={description}>{item.description}</p>
      </div>
      <OverlayLink href={`/restaurant/${1}`} />
    </li>
  );
};

export default RestaurantCard;

const container = css({
  flex: 'none',
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'column',
  maxWidth: '300px',
  boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)',
  transition: 'all ease-in-out 0.2s',

  '&:hover': {
    transform: 'translateY(2px)',
  },
});

const infoWrap = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
});

const imageWrapper = css({
  display: 'flex',
});

const description = ellipsis({
  fontSize: 14,
  lines: 2,
});
