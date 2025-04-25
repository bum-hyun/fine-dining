'use client';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { NotebookText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { css } from 'styled-system/css';
import { ellipsis, flex } from 'styled-system/patterns';

import { SERVICE_KEY } from '@/constants/service';
import { TRestaurantReview } from '@/dto/restaurant_reviews.dto';
import { useIntersect } from '@/hooks/useIntersect';
import { useGetRestaurantName } from '@/services/restaurant/restaurant_queries';
import { useGetRestaurantReviews } from '@/services/restaurant_review/restaurant_review_queries';
import { isEmpty } from '@/utils/common';

const RestaurantReviewList = () => {
  const queryClient = useQueryClient();
  const restaurantId = Number(useParams().restaurantId);

  const params: IGetRestaurantReviewsParams = { restaurantId, page: 0, limit: 10 };

  const { data: restaurantName } = useGetRestaurantName(restaurantId);
  const { data, fetchNextPage, hasNextPage } = useGetRestaurantReviews(params);
  const restaurantReviews = data?.pages.flat() ?? [];

  const intersectRef = useIntersect(fetchNextPage, hasNextPage);

  const handleClickRestaurant = (review: TRestaurantReview) => {
    queryClient.setQueryData([SERVICE_KEY.RESTAURANT_REVIEW.GET_RESTAURANT_REVIEW, review.id], review);
  };

  return (
    <div className={contentsWrapStyle}>
      <div className={flex({ flexDirection: 'column' })}>
        <h1 className={titleStyle}>{restaurantName?.name}</h1>
        <div className={descriptionStyle}>{`${restaurantName?.name}에 다녀온 후기를 남겨주세요!`}</div>
      </div>
      <div className={restaurantListWrapStyle}>
        {isEmpty(restaurantReviews) && (
          <div className={emptyBoxStyle}>
            <NotebookText size={40} color={'#888'} />
            <p className={emptyTextStyle}>{'아직 등록된 후기가 없습니다.\n첫 번째 후기를 남겨보세요!'}</p>
          </div>
        )}
        {!isEmpty(restaurantReviews) && (
          <>
            {restaurantReviews.map((post) => (
              <Link key={post.id} className={restaurantCardWrapStyle} href={`/restaurant/${restaurantId}/review/${post.id}`} onClick={() => handleClickRestaurant(post)}>
                <div className={imageWrapStyle}>{!isEmpty(post.files) && <Image className={imageStyle} src={post.files[0]} alt={'image'} width={300} height={315} />}</div>
                <div>
                  <div className={restaurantCardTitleStyle}>{post.title}</div>
                  <div className={restaurantCardDateStyle}>{dayjs(post.created_at).format('YYYY. MM. DD')}</div>
                  <div className={restaurantCardTextStyle}>{post.text}</div>
                </div>
              </Link>
            ))}
            <div ref={intersectRef} style={{ height: 1 }} />
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantReviewList;

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

const restaurantCardTitleStyle = ellipsis({
  marginBottom: '4px',
  fontSize: '16px',
  fontWeight: '600',
  color: '#191a20',
  lines: 1,
});

const restaurantCardDateStyle = css({
  marginBottom: '4px',
  fontSize: '14px',
  color: '#666',
});

const restaurantCardTextStyle = ellipsis({
  fontSize: '16px',
  color: '#191a20',
  lines: 6,
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
