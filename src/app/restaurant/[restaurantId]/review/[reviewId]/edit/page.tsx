'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import EditReview from '@/components/restaurant/review/EditReview';
import { useGetRestaurantReview } from '@/services/restaurant_review';
import { useEditorStore } from '@/stores/editorStore';

const Page = () => {
  const params = useParams();

  const [reviewId] = useState<string | number>(params.reviewId as string);

  const { editor, setReviewTitle } = useEditorStore();

  const { data: restaurantReview } = useGetRestaurantReview(Number(reviewId));

  useEffect(() => {
    if (editor && restaurantReview) {
      editor.render(restaurantReview.editor_object);
      setReviewTitle(restaurantReview.title);
    }
  }, [editor, restaurantReview]);

  return <EditReview reviewId={reviewId} />;
};

export default Page;
