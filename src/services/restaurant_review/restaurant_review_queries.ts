import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { SERVICE_KEY } from '@/constants/service';
import { getRestaurantReview, postRestaurantReview, putRestaurantReview } from '@/services/restaurant_review/restaurant_review_api';

export const useGetRestaurantReview = (id: number) =>
  useQuery<IRestaurantReview>({
    queryKey: [SERVICE_KEY.RESTAURANT_REVIEW.GET_RESTAURANT_REVIEW, id],
    queryFn: () => getRestaurantReview(id),
  });

export const usePostRestaurantReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [SERVICE_KEY.RESTAURANT_REVIEW.POST_RESTAURANT_REVIEW],
    mutationFn: (payload: IPostRestaurantReview) => postRestaurantReview(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SERVICE_KEY.RESTAURANT_REVIEW.GET_RESTAURANT_REVIEW] });
    },
  });
};

export const usePutRestaurantReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [SERVICE_KEY.RESTAURANT_REVIEW.PUT_RESTAURANT_REVIEW],
    mutationFn: (payload: IPutRestaurantReview) => putRestaurantReview(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SERVICE_KEY.RESTAURANT_REVIEW.GET_RESTAURANT_REVIEW] });
    },
  });
};
