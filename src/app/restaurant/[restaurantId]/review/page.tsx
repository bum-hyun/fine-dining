import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import RestaurantReviewList from '@/app/restaurant/[restaurantId]/review/RestaurantReviewList';
import { SERVICE_KEY } from '@/constants/service';
import { getRestaurantNames } from '@/services/restaurant/restaurant_api';
import { getRestaurantReviews } from '@/services/restaurant_review/restaurant_review_api';

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/restaurants?select=id`, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
    cache: 'no-store',
  });

  const restaurants = await res.json();

  return restaurants.map((r: { id: number }) => ({
    restaurantId: r.id.toString(),
  }));
}

export const dynamicParams = true;
export const revalidate = 60;

const Page = async (props: { params: Promise<{ restaurantId: string }> }) => {
  const queryClient = new QueryClient();
  const { restaurantId } = await props.params;

  const params: IGetRestaurantReviewsParams = { restaurantId: Number(restaurantId), page: 0, limit: 10 };

  await queryClient.prefetchQuery({
    queryKey: [SERVICE_KEY.RESTAURANT.RESTAURANT_NAMES],
    queryFn: getRestaurantNames,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: [SERVICE_KEY.RESTAURANT_REVIEW.GET_RESTAURANT_REVIEWS, params],
    queryFn: () => getRestaurantReviews(params),
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <RestaurantReviewList />
    </HydrationBoundary>
  );
};

export default Page;
