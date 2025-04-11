'use client';

import dayjs from 'dayjs';
import { css } from 'styled-system/css';

import EditReviewButton from '@/components/restaurant_review/EditReviewButton';
import { useGetRestaurantReview } from '@/services/restaurant_review/restaurant_review_queries';

interface IRestaurantReviewProps {
  reviewId: number;
}

const RestaurantReview = ({ reviewId }: IRestaurantReviewProps) => {
  const { data: post } = useGetRestaurantReview(reviewId);

  return (
    <main className={containerStyle}>
      <h1 className={titleStyle}>{post?.title}</h1>
      <div className={writerAndDateContainerStyle}>
        <div className={writerStyle}>{post?.writer.nickname}</div>
        <div className={dateStyle}>{dayjs(post?.created_at).format('YYYY. MM. DD. HH:mm')}</div>
        <EditReviewButton post={post} />
      </div>
      <hr className={dividerStyle} />
      <article className={articleStyle}>{post?.editor_html && <div dangerouslySetInnerHTML={{ __html: post.editor_html.replace(/<p>\s*<\/p>/g, '<p>&nbsp;</p>') }} />}</article>
    </main>
  );
};

export default RestaurantReview;

const containerStyle = css({
  maxWidth: '786px',
  margin: '0 auto',
  padding: '32px 16px',
});

const titleStyle = css({
  width: '100%',
  fontWeight: '500',
  marginBottom: '16px',
});

const writerAndDateContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const dividerStyle = css({
  margin: '16px 0',
  height: '1px',
  borderColor: '#eee',
});

const writerStyle = css({
  color: '#666',
});

const dateStyle = css({
  color: '#666',
});

const articleStyle = css({
  '& img': {
    marginTop: '6px',
  },
});
