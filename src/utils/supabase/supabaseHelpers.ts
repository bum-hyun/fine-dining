import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { ZodSchema } from 'zod';

export const handleSupabaseSingle = async <T, R = T>(query: PromiseLike<PostgrestSingleResponse<T>>, schema?: ZodSchema<R>, label = 'Supabase Error'): Promise<R> => {
  const { data, error } = await query;

  if (error || data === null) {
    throw new Error(`${label}: ${error?.message || '데이터가 없습니다.'}`);
  }

  if (schema) {
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error('Zod Validation Error:', result.error);
      throw new Error(`${label}: 데이터 형식이 올바르지 않습니다.`);
    }
    return result.data;
  }

  return data as unknown as R;
};

export const handleSupabaseList = async <T, R = T>(query: PromiseLike<PostgrestSingleResponse<T[]>>, schema?: ZodSchema<R>, label = 'Supabase Error'): Promise<R[]> => {
  const { data, error } = await query;

  if (error) {
    throw new Error(`${label}: ${error.message}`);
  }

  if (schema) {
    return data.map((item) => {
      const result = schema.safeParse(item);
      if (!result.success) {
        console.error('Zod Validation Error:', result.error);
        throw new Error(`${label}: 데이터 형식 오류`);
      }
      return result.data;
    });
  }

  return data as unknown as R[];
};
