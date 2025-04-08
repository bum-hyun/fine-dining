import dayjs from 'dayjs';
import Image from 'next/image';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import { DATABASE_NAMES, RESTAURANT_NAMES } from '@/constants/database';
import { isEmpty } from '@/utils/common';
import serverClient from '@/utils/supabase/server';

const Page = async ({ params }: { params: Promise<{ restaurantId: string }> }) => {
  const { restaurantId } = await params;
  const supabase = await serverClient();

  const { data: restaurantData } = await supabase.from(DATABASE_NAMES.RESTAURANTS).select(RESTAURANT_NAMES).eq('id', restaurantId).single();
  const restaurantName: IRestaurantName | null = restaurantData;

  const { data } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).select('*').eq('restaurant_id', restaurantId);
  const posts: IRestaurantReview[] | null = data;

  return (
    <div className={contentsWrapStyle}>
      <div className={flex({ flexDirection: 'column' })}>
        <h1 className={titleStyle}>{restaurantName?.name}</h1>
        <div className={descriptionStyle}>{`${restaurantName?.name}에 다녀온 후기를 남겨주세요!`}</div>
      </div>
      <div className={restaurantListWrapStyle}>
        {posts?.map((post) => (
          <div key={post.id} className={restaurantCardWrapStyle}>
            <div className={imageWrapStyle}>{!isEmpty(post.files) && <Image className={imageStyle} src={post.files[0]} alt={'image'} width={300} height={315} priority />}</div>
            <div>
              <div className={restaurantCardTitleStyle}>{post.title}</div>
              <div className={restaurantCardDateStyle}>{dayjs(post.created_at).format('YYYY. MM. DD')}</div>
              <div className={restaurantCardTextStyle}>{post.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

const contentsWrapStyle = css({
  maxWidth: '1024px',
  margin: '24px auto',
  padding: '16px 20px 60px',
});
const titleStyle = css({
  maxWidth: '750px',
  marginBottom: '8px',
  fontSize: '36px',
  fontWeight: '600',
  color: '#111',
  wordWrap: 'break-word',
});

const descriptionStyle = css({
  maxWidth: '750px',
  marginBottom: '16px',
  fontSize: '16px',
  color: '#111',
  wordWrap: 'break-word',
});

const restaurantListWrapStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const restaurantCardWrapStyle = css({
  display: 'flex',
  gap: '16px',
});

const imageWrapStyle = css({
  position: 'relative',
  display: 'flex',
  width: '180px',
  height: '200px',
  backgroundColor: '#7c7c7c',
  borderRadius: '16px',
  overflow: 'hidden',
});

const imageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const restaurantCardTitleStyle = css({
  fontSize: '16px',
  fontWeight: '500',
  color: '#191a20',
});

const restaurantCardDateStyle = css({
  fontSize: '14px',
  color: '#666',
});

const restaurantCardTextStyle = css({
  fontSize: '16px',
  color: '#191a20',
});
