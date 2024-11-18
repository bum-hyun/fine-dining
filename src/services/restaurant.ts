import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';

export const useGetRestaurants = () =>
  useQuery<IRestaurant[], Error>({
    queryKey: ['restaurants'],
    queryFn: api.get('restaurants').json,
  });

export const useGetRestaurant = () =>
  useQuery<IRestaurant[], Error>({
    queryKey: ['restaurant'],
    queryFn: api.get('restaurant').json,
  });
