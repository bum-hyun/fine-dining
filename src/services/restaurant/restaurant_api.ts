import { DATABASE_NAMES, RESTAURANT_NAMES } from '@/constants/database';
import supabase from '@/utils/supabase/client';

const database = DATABASE_NAMES.RESTAURANTS;

export const getRestaurants = async (params: IGetRestaurantsParams): Promise<IRestaurant[]> => {
  const limit = params.limit || 10;
  const from = params.page * limit;
  const to = from + limit - 1;

  let query = supabase.from(database).select('*').range(from, to);

  if (params.status) {
    query = query.eq('status', params.status);
  }

  const { data, error } = await query;

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

export const postRestaurant = async (payload: IPostRestaurant): Promise<IRestaurant> => {
  const { data, error } = await supabase.from(database).insert(payload).select();

  if (error) {
    throw new Error(`POST Error: ${error.message}`);
  }

  return data[0];
};

export const putRestaurant = async (payload: IPutRestaurant) => {
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

export const getRestaurantNames = async (): Promise<Pick<IRestaurant, 'id' | 'name'>[]> => {
  const { data, error } = await supabase.from(database).select(RESTAURANT_NAMES).neq('status', 'rejected').order('name', { ascending: true });

  if (error) {
    throw new Error(`GET Error: ${error.message}`);
  }

  return data;
};
