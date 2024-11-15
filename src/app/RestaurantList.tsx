'use client';

import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import RestaurantCard from '@/components/RestaurantCard';
import { useGetRestaurants } from '@/services/restaurant';

const RestaurantList = () => {
  const { data } = useGetRestaurants();

  return (
    <div className={css({ overflow: 'hidden' })}>
      <ul className={flex({ padding: '16px', gap: '32px', flexWrap: 'nowrap', overflow: 'auto', scrollbar: 'hidden' })}>{data?.map((item, index) => <RestaurantCard key={index} item={item} />)}</ul>
    </div>
  );
};

export default RestaurantList;
