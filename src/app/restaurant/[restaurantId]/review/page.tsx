import dayjs from 'dayjs';
import { NotebookText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { ellipsis, flex } from 'styled-system/patterns';

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
        {isEmpty(posts) && (
          <div className={emptyBoxStyle}>
            <NotebookText size={40} color={'#888'} />
            <p className={emptyTextStyle}>{'아직 등록된 후기가 없습니다.\n첫 번째 후기를 남겨보세요!'}</p>
          </div>
        )}
        {!isEmpty(posts) &&
          posts!.map((post) => (
            <Link key={post.id} href={`/restaurant/${restaurantId}/review/${post.id}`} className={restaurantCardWrapStyle}>
              <div className={imageWrapStyle}>{!isEmpty(post.files) && <Image className={imageStyle} src={post.files[0]} alt={'image'} width={300} height={315} priority />}</div>
              <div>
                <div className={restaurantCardTitleStyle}>{post.title}</div>
                <div className={restaurantCardDateStyle}>{dayjs(post.created_at).format('YYYY. MM. DD')}</div>
                <div className={restaurantCardTextStyle}>{post.text}</div>
              </div>
            </Link>
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
  marginTop: '32px',
});

const restaurantCardWrapStyle = css({
  display: 'flex',
  gap: '16px',
});

const imageWrapStyle = css({
  flex: 'none',
  position: 'relative',
  display: 'flex',
  width: '160px',
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
  marginBottom: '4px',
  fontSize: '16px',
  fontWeight: '500',
  color: '#191a20',
});

const restaurantCardDateStyle = css({
  marginBottom: '4px',
  fontSize: '14px',
  color: '#666',
});

const restaurantCardTextStyle = ellipsis({
  fontSize: '16px',
  color: '#191a20',
  lines: 5,
});

const emptyBoxStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  padding: '40px 0',
  color: '#888',
});

const emptyTextStyle = css({
  fontSize: '24px',
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
});
