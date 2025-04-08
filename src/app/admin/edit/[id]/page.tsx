'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import EditRestaurantForm from '@/components/admin/edit/EditRestaurantForm';
import { ROUTE_PATHS } from '@/constants/pathname';
import { useGetRestaurant, usePutRestaurant } from '@/services/restaurant/restaurant_queries';

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const queryClient = useQueryClient();

  const [payload, setPayload] = useState<IRestaurant>({
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
  });

  const { data } = useGetRestaurant(Number(id));
  const { mutateAsync: putRestaurant } = usePutRestaurant();

  const editRestaurant = useCallback(async () => {
    try {
      await putRestaurant(payload);
      await queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      router.push(`${ROUTE_PATHS.ADMIN.LIST}`);
    } catch (error) {
      console.log(error);
    }
  }, [payload]);

  useEffect(() => {
    if (!data) return;
    setPayload({ ...data });
  }, [data]);

  return <EditRestaurantForm payload={payload} setPayload={setPayload} editRestaurant={editRestaurant} />;
};

export default Page;
