import Image from 'next/image';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { ellipsis } from 'styled-system/patterns';

import RestaurantTags from '@/components/RestaurantTags';

interface IRestaurantCardProps {
  item: IRestaurant;
}

const RestaurantCard = ({ item }: IRestaurantCardProps) => {
  return (
    <article className={container}>
      <Link href={''} className={imageWrapper}>
        <Image className={image} src={item.thumbnail || ''} alt={'image'} width={500} height={500} />
      </Link>
      <div className={infoWrap}>
        <RestaurantTags tags={item.tags} />
        <h2 className={name}>{item.name}</h2>
        <p className={description}>{item.description}</p>
      </div>
    </article>
  );
};

export default RestaurantCard;

const container = css({
  flex: 'none',
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'column',
});

const infoWrap = css({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '8px',
  overflowX: 'hidden',
});

const imageWrapper = css({
  position: 'relative',
  display: 'flex',
  width: '236px',
  height: '315px',
  backgroundColor: '#7c7c7c',
  borderRadius: '16px',
  overflow: 'hidden',
});

const image = css({
  objectFit: 'cover',
});

const name = css({
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#111',
});

const description = ellipsis({
  fontSize: 14,
  lines: 2,
});
