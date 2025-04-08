import { css } from 'styled-system/css';

import { DATABASE_NAMES } from '@/constants/database';
import serverClient from '@/utils/supabase/server';

const Page = async ({ params }: { params: Promise<{ restaurantId: string }> }) => {
  const { restaurantId } = await params;
  const supabase = await serverClient();

  const { data: post } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).select('*').eq('id', restaurantId).single();

  return <div className={containerStyle}></div>;
};

export default Page;

const containerStyle = css({
  maxWidth: '786px',
  margin: '0 auto',
});
