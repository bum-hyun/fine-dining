'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import EditRestaurantForm from '@/components/admin/edit/EditRestaurantForm';
import { ROUTE_PATHS } from '@/constants/pathname';
import { usePostRestaurant } from '@/services/restaurant';

const Page = () => {
  const router = useRouter();

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
  });

  const { mutateAsync: postRestaurant } = usePostRestaurant();

  const editRestaurant = useCallback(async () => {
    try {
      await postRestaurant(payload);
      router.push(`${ROUTE_PATHS.ADMIN.LIST}`);
    } catch (error) {
      console.log(error);
    }
  }, [payload]);

  return <EditRestaurantForm payload={payload} setPayload={setPayload} editRestaurant={editRestaurant} />;
};

export default Page;
