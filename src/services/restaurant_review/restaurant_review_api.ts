import { DATABASE_NAMES, RESTAURANT_REVIEW_WITH_WRITER_SELECT } from '@/constants/database';
import { RestaurantReviewSchema, TRestaurantReview } from '@/dto/restaurant_reviews.dto';
import supabase from '@/utils/supabase/client';

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

  const { data, error } = await query;

  if (error || !data) {
    throw new Error(`GET Error: ${error.message}`);
  }

  return data.map((item) => RestaurantReviewSchema.parse(item));
};

export const getRestaurantReview = async (reviewId: number): Promise<TRestaurantReview> => {
  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).select(RESTAURANT_REVIEW_WITH_WRITER_SELECT).eq('id', reviewId).single();

  if (error) {
    throw new Error(`GET Error: ${error.message}`);
  }

  return RestaurantReviewSchema.parse(data);
};

export const postRestaurantReview = async (payload: IPostRestaurantReview): Promise<TRestaurantReview> => {
  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).insert(payload).select();
  console.log(data);
  if (error) {
    throw new Error(`POST Error: ${error.message}`);
  }

  return RestaurantReviewSchema.parse(data[0]);
};

export const putRestaurantReview = async (payload: IPutRestaurantReview) => {
  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).update(payload).eq('id', payload.id).select();

  if (error) {
    throw new Error(`PUT Error: ${error.message}`);
  }

  return data;
};
