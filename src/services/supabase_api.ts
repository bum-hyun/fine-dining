import { DATABASE_NAMES } from '@/constants/database';
import supabase from '@/utils/supabase/client';

const database = DATABASE_NAMES.RESTAURANTS;

export const getRestaurants = async (): Promise<IRestaurant[]> => {
  const { data, error } = await supabase.from(database).select('*').range(0, 10);

  if (error) {
    throw new Error(`GET Error: ${error.message}`);
  }

  return data;
};

export const getRestaurant = async (id: number): Promise<IRestaurant> => {
  const { data, error } = await supabase.from(database).select('*').eq('id', id).single();

  if (error) {
    throw new Error(`GET Error: ${error.message}`);
  }

  return data;
};

export const postRestaurant = async (payload: IRestaurant): Promise<IRestaurant> => {
  const { data, error } = await supabase.from(database).insert(payload).select();

  if (error) {
    throw new Error(`POST Error: ${error.message}`);
  }

  return data[0];
};

export const putRestaurant = async (payload: Partial<IRestaurant>) => {
  const { data, error } = await supabase.from(database).update(payload).eq('id', payload.id).select();

  if (error) {
    throw new Error(`PUT Error: ${error.message}`);
  }

  return data;
};

export const deleteRestaurant = async (id: number) => {
  const { data, error } = await supabase.from(database).delete().eq('id', id);

  if (error) {
    throw new Error(`DELETE Error: ${error.message}`);
  }

  return data;
};

export const getRestaurantReview = async (id: number): Promise<IRestaurantReview> => {
  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).select('*').eq('id', id).single();

  if (error) {
    throw new Error(`GET Error: ${error.message}`);
  }

  return data;
};

export const postRestaurantReview = async (payload: IPostRestaurantReview): Promise<IRestaurant> => {
  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).insert(payload).select();

  if (error) {
    throw new Error(`POST Error: ${error.message}`);
  }

  return data[0];
};

export const putRestaurantReview = async (payload: Partial<IPostRestaurantReview>) => {
  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).update(payload).eq('id', payload.id).select();

  if (error) {
    throw new Error(`PUT Error: ${error.message}`);
  }

  return data;
};
