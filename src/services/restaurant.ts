import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import { deleteRestaurant, getRestaurant, getRestaurants, postRestaurant, putRestaurant } from '@/services/supabase_api';

export const useGetRestaurants = (params: IGetRestaurantsParams) =>
  useInfiniteQuery({
    queryKey: ['restaurants', params],
    queryFn: ({ pageParam = 0 }) => getRestaurants({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === (params.limit || 10) ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

export const useGetRestaurant = (id: number) =>
  useQuery<IRestaurant>({
    queryKey: ['restaurant', id],
    queryFn: () => getRestaurant(id),
  });

export const usePostRestaurant = () =>
  useMutation({
    mutationKey: ['restaurants'],
    mutationFn: (payload: IPostRestaurant) => postRestaurant(payload),
  });

export const usePutRestaurant = () =>
  useMutation({
    mutationKey: ['restaurants'],
    mutationFn: (payload: IPutRestaurant) => putRestaurant(payload),
  });

export const useDeleteRestaurant = () =>
  useMutation({
    mutationKey: ['restaurants'],
    mutationFn: (id: number) => deleteRestaurant(id),
  });
