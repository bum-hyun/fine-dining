import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import RestaurantCard from '@/components/RestaurantCard';
import { useGetRestaurants } from '@/services/restaurant';

export default function Home() {
  const { data } = useGetRestaurants();

  return (
    <div className={css({ overflow: 'hidden' })}>
      <div className={flex({ gap: '12px', flexWrap: 'nowrap', overflow: 'auto' })}>
        <RestaurantCard item={{ title: '' }} />
        <RestaurantCard item={{ title: '' }} />
        <RestaurantCard item={{ title: '' }} />
        <RestaurantCard item={{ title: '' }} />
        <RestaurantCard item={{ title: '' }} />
      </div>
    </div>
  );
}
