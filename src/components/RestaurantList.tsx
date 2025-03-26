'use client';

import { css } from 'styled-system/css';

import RestaurantCard from '@/components/RestaurantCard';
import { useGetRestaurants } from '@/services/restaurant';

const RestaurantList = () => {
  const { data } = useGetRestaurants();

  return <div className={containerStyle}>{data?.map((item, index) => <RestaurantCard key={index} item={item} />)}</div>;
};

export default RestaurantList;

const containerStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  justifyItems: 'center',
  gap: '16px',

  '@media (max-width: 480px)': {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },

  '@media (min-width: 481px) and (max-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@media (min-width: 769px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },

  '@media (min-width: 1024px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },

  '@media (min-width: 1440px)': {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
});
