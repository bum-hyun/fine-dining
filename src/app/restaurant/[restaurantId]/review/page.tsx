import { createServerClient } from '@supabase/ssr';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import RestaurantReviewList from '@/app/restaurant/[restaurantId]/review/RestaurantReviewList';
import { SERVICE_KEY } from '@/constants/service';
import { getRestaurantName } from '@/services/restaurant/restaurant_api';
import { getRestaurantReviews } from '@/services/restaurant_review/restaurant_review_api';

export async function generateStaticParams() {
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {
        return;
      },
    },
  });
  const { data } = await supabase.from('restaurants').select('id').eq('status', 'active').order('popularity', { ascending: false }).limit(50);

  return data?.map((r) => ({ restaurantId: r.id.toString() })) || [];
}

const Page = async ({ params }: { params: Promise<{ restaurantId: string }> }) => {
  const queryClient = new QueryClient();
  const restaurantId = Number((await params).restaurantId);

  const reviewsParams: IGetRestaurantReviewsParams = { restaurantId: restaurantId, page: 0, limit: 10 };

  await queryClient.prefetchQuery({
    queryKey: [SERVICE_KEY.RESTAURANT.RESTAURANT_NAME, restaurantId],
    queryFn: () => getRestaurantName(restaurantId),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: [SERVICE_KEY.RESTAURANT_REVIEW.GET_RESTAURANT_REVIEWS, reviewsParams],
    queryFn: () => getRestaurantReviews(reviewsParams),
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <RestaurantReviewList key={restaurantId} />
    </HydrationBoundary>
  );
};

export default Page;
