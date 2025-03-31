import { useMutation, useQuery } from '@tanstack/react-query';

import { getRestaurantReview, postRestaurantReview, putRestaurantReview } from '@/services/supabase_api';

export const useGetRestaurantReview = (id: number) =>
  useQuery<IRestaurantReview>({
    queryKey: ['restaurant_review', id],
    queryFn: () => getRestaurantReview(id),
  });

export const usePostRestaurantReview = () =>
  useMutation({
    mutationKey: ['restaurant_review'],
    mutationFn: (payload: IPostRestaurantReview) => postRestaurantReview(payload),
  });

export const usePutRestaurantReview = () =>
  useMutation({
    mutationKey: ['restaurant_review'],
    mutationFn: (payload: IPostRestaurantReview) => putRestaurantReview(payload),
  });
