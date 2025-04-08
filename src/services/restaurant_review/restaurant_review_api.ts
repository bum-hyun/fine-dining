import { DATABASE_NAMES, RESTAURANT_REVIEW_WITH_WRITER_SELECT } from '@/constants/database';
import supabase from '@/utils/supabase/client';

export const getRestaurantReview = async (id: number): Promise<IRestaurantReview> => {
  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).select(RESTAURANT_REVIEW_WITH_WRITER_SELECT).eq('id', id).single();

  if (error) {
    throw new Error(`GET Error: ${error.message}`);
  }

  return data;
};

export const postRestaurantReview = async (payload: IPostRestaurantReview): Promise<IRestaurant> => {
  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).insert(payload).select();
  console.log(data);
  if (error) {
    throw new Error(`POST Error: ${error.message}`);
  }

  return data[0];
};

export const putRestaurantReview = async (payload: IPutRestaurantReview) => {
  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).update(payload).eq('id', payload.id).select();

  if (error) {
    throw new Error(`PUT Error: ${error.message}`);
  }

  return data;
};
