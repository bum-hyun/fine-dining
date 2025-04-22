import { DATABASE_NAMES, RESTAURANT_NAMES } from '@/constants/database';
import { PostRestaurantSchema, PutRestaurantSchema, RestaurantNameSchema, RestaurantSchema, TRestaurant } from '@/dto/restaurants.dto';
import supabase from '@/utils/supabase/client';
import { handleSupabaseList, handleSupabaseSingle } from '@/utils/supabase/supabaseHelpers';

// 레스토랑 리스트 조회
export const getRestaurants = async (params: IGetRestaurantsParams): Promise<TRestaurant[]> => {
  const limit = params.limit || 10;
  const from = params.page * limit;
  const to = from + limit - 1;

  let query = supabase.from(DATABASE_NAMES.RESTAURANTS).select('*').range(from, to);

  if (params.status) {
    query = query.eq('status', params.status);
  }

  return handleSupabaseList(query, RestaurantSchema, '레스토랑 목록 조회 실패');
};

// 레스토랑 단건 조회
export const getRestaurant = async (id: number): Promise<TRestaurant> => {
  return handleSupabaseSingle(supabase.from(DATABASE_NAMES.RESTAURANTS).select('*').eq('id', id).single(), RestaurantSchema, '레스토랑 조회 실패');
};

// 레스토랑 등록
export const postRestaurant = async (payload: IPostRestaurant): Promise<TRestaurant> => {
  PostRestaurantSchema.parse(payload);

  return handleSupabaseSingle(supabase.from(DATABASE_NAMES.RESTAURANTS).insert(payload).select().single(), RestaurantSchema, '레스토랑 등록 실패');
};

// 레스토랑 수정
export const putRestaurant = async (payload: IPutRestaurant): Promise<TRestaurant> => {
  PutRestaurantSchema.parse(payload);

  return handleSupabaseSingle(supabase.from(DATABASE_NAMES.RESTAURANTS).update(payload).eq('id', payload.id).select().single(), RestaurantSchema, '레스토랑 수정 실패');
};

// 레스토랑 삭제
export const deleteRestaurant = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from(DATABASE_NAMES.RESTAURANTS).delete().eq('id', id);

  if (error) {
    throw new Error(`레스토랑 삭제 실패: ${error.message}`);
  }

  return true;
};

// 레스토랑 이름 목록 조회
export const getRestaurantNames = async (): Promise<Pick<TRestaurant, 'id' | 'name'>[]> => {
  return handleSupabaseList(
    supabase.from(DATABASE_NAMES.RESTAURANTS).select(RESTAURANT_NAMES).neq('status', 'rejected').order('name', { ascending: true }),
    RestaurantNameSchema,
    '레스토랑 이름 목록 조회 실패'
  );
};

// 레스토랑 이름 단건 조회
export const getRestaurantName = async (restaurantId: number): Promise<Pick<TRestaurant, 'id' | 'name'>> => {
  return handleSupabaseSingle(supabase.from(DATABASE_NAMES.RESTAURANTS).select(RESTAURANT_NAMES).eq('id', restaurantId).single(), RestaurantNameSchema, '레스토랑 이름 조회 실패');
};
