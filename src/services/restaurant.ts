'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';

export const useGetRestaurants = () =>
  useQuery({
    queryKey: ['restaurants'],
    queryFn: api.get('restaurants').json,
  });
