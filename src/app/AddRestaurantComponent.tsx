'use client';

import { usePostRestaurant } from '@/services/restaurant';

const AddRestaurantComponent = () => {
  const { mutate } = usePostRestaurant();

  const handleClickButton = () => {
    console.log('here');
    mutate();
  };
  return <button>asdadsad</button>;
};

export default AddRestaurantComponent;
