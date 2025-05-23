'use client';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import RestaurantReview from '@/app/restaurant/[restaurantId]/review/[reviewId]/RestaurantReview';
import { DATABASE_NAMES, RESTAURANT_REVIEW_WITH_WRITER_SELECT } from '@/constants/database';
import { SERVICE_KEY } from '@/constants/service';
import { RestaurantReviewSchema } from '@/dto/restaurant_reviews.dto';
import { getRestaurantReview } from '@/services/restaurant_review/restaurant_review_api';
import serverClient from '@/utils/supabase/server';

// export async function generateMetadata({ params }: { params: Promise<{ reviewId: string }> }) {
//   const reviewId = Number((await params).reviewId);
//   const supabase = await serverClient();
//
//   const { data } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).select(RESTAURANT_REVIEW_WITH_WRITER_SELECT).eq('id', reviewId).single();
//   const post = RestaurantReviewSchema.parse(data);
//   const keywords = ['미식노트', '레스토랑 후기', '맛집 리뷰', '다이닝', '다이닝 후기'];
//
//   if (!post) {
//     return {
//       title: '리뷰를 찾을 수 없습니다',
//       description: '해당 리뷰가 존재하지 않거나 삭제되었습니다.',
//       keywords,
//     };
//   }
//
//   const title = `${post.title} - 미식노트`;
//   const description = `${post.text.substring(0, 100)}..`;
//   const images = post.files?.[0] ? [post.files[0]] : [];
//
//   return {
//     title,
//     description,
//     keywords: [...keywords, ...(post.restaurant?.tags ?? []), post.restaurant.name],
//     openGraph: {
//       title,
//       description,
//       images,
//     },
//   };
// }

const Page = async ({ params }: { params: Promise<{ reviewId: string }> }) => {
  // const queryClient = new QueryClient();
  const reviewId = Number((await params).reviewId);
  //
  // await queryClient.prefetchQuery({
  //   queryKey: [SERVICE_KEY.RESTAURANT_REVIEW.GET_RESTAURANT_REVIEW, reviewId],
  //   queryFn: () => getRestaurantReview(reviewId),
  // });
  //
  // const dehydratedState = dehydrate(queryClient);

  return (
    // <HydrationBoundary state={dehydratedState}>
    <RestaurantReview reviewId={reviewId} />
    // </HydrationBoundary>
  );
};

export default Page;
