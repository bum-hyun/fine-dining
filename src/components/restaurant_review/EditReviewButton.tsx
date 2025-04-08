'use client';

import Link from 'next/link';
import { css } from 'styled-system/css';

import { Button } from '@/components/Button';
import { useUserStore } from '@/stores/userStore';

interface IEditReviewButtonProps {
  post?: IRestaurantReview | null;
}

const EditReviewButton = ({ post }: IEditReviewButtonProps) => {
  const { user } = useUserStore();

  return (
    <>
      {user && post?.writer.id === user.id && (
        <Button className={buttonStyle}>
          <Link href={`/restaurant/${post.restaurant_id}/review/${post.id}/edit`}>수정</Link>
        </Button>
      )}
    </>
  );
};

export default EditReviewButton;

const buttonStyle = css({
  marginLeft: 'auto',
});
