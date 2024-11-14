import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

export const useGetRestaurants = () =>
  useQuery({
    queryKey: ['restaurants'],
    queryFn: ky.get('/restaurants').json,
  });
