import ky from 'ky';
import { Suspense } from 'react';

import Restaurant from '@/app/restaurant/[restaurantId]/Restaurant';

interface IPageProps {}

const Page = async ({}: IPageProps) => {
  const data = await ky.get('https://alpha-guardian-api.teepee.kr/v2/community/172').json();

  return (
    <Suspense fallback={<div>...loading</div>}>
      <Restaurant initialData={data} />
    </Suspense>
  );
};

export default Page;
