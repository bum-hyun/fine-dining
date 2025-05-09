import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import RestaurantList from '@/components/RestaurantList';
import { SERVICE_KEY } from '@/constants/service';
import { getRestaurants } from '@/services/restaurant/restaurant_api';

export const metadata: Metadata = {};

export default async function Home() {
  const queryClient = new QueryClient();
  const params: IGetRestaurantsParams = { page: 0, limit: 10, status: 'active' };

  await queryClient.prefetchInfiniteQuery({
    queryKey: [SERVICE_KEY.RESTAURANT.GET_RESTAURANTS, params],
    queryFn: () => getRestaurants(params),
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={containerStyle}>
      <div className={contentsWrapStyle}>
        <div className={flex({ flexDirection: 'column' })}>
          <h1 className={titleStyle}>전체</h1>
          <div className={descriptionStyle}>전 세계에 있는 레스토랑에 다녀온 후기를 남겨주세요!</div>
        </div>
        <HydrationBoundary state={dehydratedState}>
          <RestaurantList />
        </HydrationBoundary>
      </div>
    </div>
  );
}

const containerStyle = css({
  flex: 1,
  overflowX: 'hidden',
  overflowY: 'auto',
});

const contentsWrapStyle = css({
  maxWidth: '1288px',
  margin: 'auto',
  padding: '16px 20px 60px',
});

const titleStyle = css({
  maxWidth: '750px',
  marginBottom: '8px',
  fontSize: '36px',
  fontWeight: '600',
  color: '#111',
  wordWrap: 'break-word',
});

const descriptionStyle = css({
  maxWidth: '750px',
  marginBottom: '16px',
  fontSize: '16px',
  color: '#111',
  wordWrap: 'break-word',
});
