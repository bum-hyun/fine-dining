import { useMutation, useQuery } from '@tanstack/react-query';

import { deleteRestaurant, getRestaurant, getRestaurants, postRestaurant, putRestaurant } from '@/services/supabase_api';

export const useGetRestaurants = () =>
  useQuery<IRestaurant[]>({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  });

export const useGetRestaurant = (id: number) =>
  useQuery<IRestaurant>({
    queryKey: ['restaurant', id],
    queryFn: () => getRestaurant(id),
  });

export const usePostRestaurant = () =>
  useMutation({
    mutationKey: ['restaurants'],
    mutationFn: (payload: IRestaurant) => postRestaurant(payload),
  });

export const usePutRestaurant = () =>
  useMutation({
    mutationKey: ['restaurants'],
    mutationFn: (payload: IRestaurant) => putRestaurant(payload),
  });

export const useDeleteRestaurant = () =>
  useMutation({
    mutationKey: ['restaurants'],
    mutationFn: (id: number) => deleteRestaurant(id),
  });
