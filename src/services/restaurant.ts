import { useMutation, useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';

export const useGetRestaurants = () =>
  useQuery<IRestaurant[], Error>({
    queryKey: ['restaurants'],
    queryFn: api.get('api/restaurants').json,
  });

export const useGetRestaurant = () =>
  useQuery<IRestaurant[], Error>({
    queryKey: ['restaurant'],
    queryFn: api.get('restaurant').json,
  });

export const usePostRestaurant = () =>
  useMutation<IRestaurant[], Error>({
    mutationKey: ['restaurant'],
    mutationFn: () =>
      api
        .post('api/restaurants', {
          json: { name: 'New Restaurant', location: 'New York' },
        })
        .json(),
  });
