'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import EditRestaurantForm from '@/components/admin/edit/EditRestaurantForm';
import { ROUTE_PATHS } from '@/constants/pathname';
import { TPostRestaurant, TPutRestaurant } from '@/dto/restaurants.dto';
import { useGetRestaurant, usePutRestaurant } from '@/services/restaurant/restaurant_queries';

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id as string);
  const queryClient = useQueryClient();

  const [payload, setPayload] = useState<TPostRestaurant | TPutRestaurant>({
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
    thumbnail: '',
    currency: 'won',
  });

  const { data } = useGetRestaurant(id);
  const { mutateAsync: putRestaurant } = usePutRestaurant();

  const editRestaurant = async () => {
    await putRestaurant({ ...payload, id, status: 'active' });
    await queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    router.push(`${ROUTE_PATHS.ADMIN.LIST}`);
  };

  useEffect(() => {
    if (!data) return;
    setPayload({ ...data });
  }, [data]);

  return <EditRestaurantForm payload={payload} setPayload={setPayload} editRestaurant={editRestaurant} />;
};

export default Page;
