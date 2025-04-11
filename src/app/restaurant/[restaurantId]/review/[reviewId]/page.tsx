import dayjs from 'dayjs';
import { css } from 'styled-system/css';

import EditReviewButton from '@/components/restaurant_review/EditReviewButton';
import { DATABASE_NAMES, RESTAURANT_REVIEW_WITH_WRITER_SELECT } from '@/constants/database';
import serverClient from '@/utils/supabase/server';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ reviewId: string }> }) {
  const { reviewId } = await params;
  const supabase = await serverClient();

  const { data } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).select(RESTAURANT_REVIEW_WITH_WRITER_SELECT).eq('id', reviewId).single();
  const post: IRestaurantReview | null = data;
  const keywords = ['미식노트', '레스토랑 후기', '맛집 리뷰', '다이닝', '다이닝 후기'];

  if (!post) {
    return {
      title: '리뷰를 찾을 수 없습니다',
      description: '해당 리뷰가 존재하지 않거나 삭제되었습니다.',
      keywords,
    };
  }

  const title = `${post.title} - 미식노트`;
  const description = `${post.text.substring(0, 100)}..`;
  const images = post.files?.[0] ? [post.files[0]] : [];

  return {
    title,
    description,
    keywords: [...keywords, ...(post.restaurant?.tags ?? []), post.restaurant.name],
    openGraph: {
      title,
      description,
      images,
    },
  };
}

const Page = async ({ params }: { params: Promise<{ reviewId: string }> }) => {
  const { reviewId } = await params;
  const supabase = await serverClient();

  const { data } = await supabase.from(DATABASE_NAMES.RESTAURANT_REVIEWS).select(RESTAURANT_REVIEW_WITH_WRITER_SELECT).eq('id', reviewId).single();
  const post: IRestaurantReview | null = data;

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

export default Page;

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
