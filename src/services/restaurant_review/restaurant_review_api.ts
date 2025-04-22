import { DATABASE_NAMES, RESTAURANT_REVIEW_WITH_WRITER_SELECT } from '@/constants/database';
import { PostRestaurantReviewSchema, PutRestaurantReviewSchema, RestaurantReviewSchema, TRestaurantReview } from '@/dto/restaurant_reviews.dto';
import supabase from '@/utils/supabase/client';
import { handleSupabaseList, handleSupabaseSingle } from '@/utils/supabase/supabaseHelpers';

// 리뷰 리스트 조회
export const getRestaurantReviews = async (params: IGetRestaurantReviewsParams): Promise<TRestaurantReview[]> => {
  const limit = params.limit || 10;
  const from = params.page * limit;
  const to = from + limit - 1;

  let query = supabase
    .from(DATABASE_NAMES.RESTAURANT_REVIEWS)
    .select(RESTAURANT_REVIEW_WITH_WRITER_SELECT)
    .eq('restaurant_id', params.restaurantId)
    .order('created_at', { ascending: true })
    .range(from, to);

  if (params.status) {
    query = query.eq('status', params.status);
  }

  return handleSupabaseList(query, RestaurantReviewSchema, '리뷰 목록 조회 실패');
};

// 리뷰 단건 조회
export const getRestaurantReview = async (reviewId: number): Promise<TRestaurantReview> => {
  return handleSupabaseSingle(supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).select(RESTAURANT_REVIEW_WITH_WRITER_SELECT).eq('id', reviewId).single(), RestaurantReviewSchema, '리뷰 조회 실패');
};

// 리뷰 등록
export const postRestaurantReview = async (payload: IPostRestaurantReview): Promise<TRestaurantReview> => {
  PostRestaurantReviewSchema.parse(payload);

  return handleSupabaseSingle(supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).insert(payload).select().single(), RestaurantReviewSchema, '리뷰 등록 실패');
};

// 리뷰 수정
export const putRestaurantReview = async (payload: IPutRestaurantReview): Promise<TRestaurantReview> => {
  PutRestaurantReviewSchema.parse(payload);

  return handleSupabaseSingle(supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).update(payload).eq('id', payload.id).select().single(), RestaurantReviewSchema, '리뷰 수정 실패');
};
