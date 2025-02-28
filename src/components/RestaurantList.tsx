'use client';

import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import RestaurantCard from '@/components/RestaurantCard';
import { useGetRestaurants } from '@/services/restaurant';

const RestaurantList = () => {
  const { data } = useGetRestaurants();

  return (
    <div className={css({})}>
      <div className={flex({ gap: '16px', flexWrap: 'wrap' })}>{data?.map((item, index) => <RestaurantCard key={index} item={item} />)}</div>
    </div>
  );
};

export default RestaurantList;
