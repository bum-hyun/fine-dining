import { DATABASE_NAMES, RESTAURANT_NAMES } from '@/constants/database';
import { RestaurantSchema, TPostRestaurant, TPutRestaurant, TRestaurant } from '@/dto/restaurants.dto';
import supabase from '@/utils/supabase/client';

export const getRestaurants = async (params: IGetRestaurantsParams): Promise<TRestaurant[]> => {
  const limit = params.limit || 10;
  const from = params.page * limit;
  const to = from + limit - 1;

  let query = supabase.from(DATABASE_NAMES.RESTAURANTS).select('*').range(from, to);

  if (params.status) {
    query = query.eq('status', params.status);
  }

  const { data, error } = await query;

  if (error || !data) {
    throw new Error(`GET Error: ${error.message}`);
  }

  return data.map((item) => RestaurantSchema.parse(item));
};

export const getRestaurant = async (id: number): Promise<TRestaurant> => {
  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANTS).select('*').eq('id', id).single();

  if (error || !data) {
    throw new Error(`GET Error: ${error.message}`);
  }

  return RestaurantSchema.parse(data);
};

export const postRestaurant = async (payload: TPostRestaurant): Promise<TRestaurant> => {
  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANTS).insert(payload).select();

  if (error) {
    throw new Error(`POST Error: ${error.message}`);
  }

  return RestaurantSchema.parse(data[0]);
};

export const putRestaurant = async (payload: TPutRestaurant) => {
  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANTS).update(payload).eq('id', payload.id).select();

  if (error) {
    throw new Error(`PUT Error: ${error.message}`);
  }

  return data;
};

export const deleteRestaurant = async (id: number) => {
  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANTS).delete().eq('id', id);

  if (error) {
    throw new Error(`DELETE Error: ${error.message}`);
  }

  return data;
};

export const getRestaurantNames = async (): Promise<Pick<TRestaurant, 'id' | 'name'>[]> => {
  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANTS).select(RESTAURANT_NAMES).neq('status', 'rejected').order('name', { ascending: true });

  if (error) {
    throw new Error(`GET Error: ${error.message}`);
  }

  return data;
};

export const getRestaurantName = async (restaurantId: number): Promise<Pick<TRestaurant, 'id' | 'name'>> => {
  const { data, error } = await supabase.from(DATABASE_NAMES.RESTAURANTS).select('*').eq('id', restaurantId).single();

  if (error) {
    throw new Error(`GET Error: ${error.message}`);
  }

  return data;
};
