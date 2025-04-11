import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import RestaurantReview from '@/app/restaurant/[restaurantId]/review/[reviewId]/RestaurantReview';
import { DATABASE_NAMES, RESTAURANT_REVIEW_WITH_WRITER_SELECT } from '@/constants/database';
import { SERVICE_KEY } from '@/constants/service';
import { getRestaurantReview } from '@/services/restaurant_review/restaurant_review_api';
import serverClient from '@/utils/supabase/server';

export const revalidate = 60;

const Page = async ({ params }: { params: Promise<{ reviewId: string }> }) => {
  const queryClient = new QueryClient();
  const { reviewId } = await params;

  await queryClient.prefetchQuery({
    queryKey: [SERVICE_KEY.RESTAURANT_REVIEW.GET_RESTAURANT_REVIEW, reviewId],
    queryFn: () => getRestaurantReview(Number(reviewId)),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <RestaurantReview reviewId={Number(reviewId)} />
    </HydrationBoundary>
  );
};

export default Page;
