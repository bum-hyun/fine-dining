'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import EditRestaurantForm from '@/components/admin/edit/EditRestaurantForm';
import { ROUTE_PATHS } from '@/constants/pathname';
import { TPostRestaurant } from '@/dto/restaurants.dto';
import { usePostRestaurant } from '@/services/restaurant/restaurant_queries';

const Page = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [payload, setPayload] = useState<TPostRestaurant>({
    name: '',
    address: '',
    email: '',
    description: '',
    is_only_course: false,
    tel: '',
    reservation_url: '',
    tags: [],
    launch_price: 0,
    dinner_price: 0,
    currency: 'won',
    thumbnail: '',
    status: 'active',
  });

  const { mutateAsync: postRestaurant } = usePostRestaurant();

  const editRestaurant = useCallback(async () => {
    try {
      await postRestaurant(payload);
      await queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      router.push(`${ROUTE_PATHS.ADMIN.LIST}`);
    } catch (error) {
      console.log(error);
    }
  }, [payload]);

  return <EditRestaurantForm payload={payload} setPayload={setPayload} editRestaurant={editRestaurant} />;
};

export default Page;
