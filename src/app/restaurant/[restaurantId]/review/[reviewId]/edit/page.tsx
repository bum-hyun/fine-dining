'use client';

import { css } from 'styled-system/css';

const Editor = dynamic(() => import('@/components/editor/Editor'), {
  ssr: false,
  loading: () => null,
});
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import Select from '@/components/Select';
import { useGetRestaurantNames, useGetRestaurantReview } from '@/services/restaurant_review';
import { useEditorStore } from '@/stores/editorStore';

const Page = () => {
  const params = useParams();

  const [restaurantId, setRestaurantId] = useState<string | number>(params.restaurantId as string);
  const [reviewId, setReviewId] = useState<string | number>(params.reviewId as string);

  const { reviewTitle, editor, setReviewTitle } = useEditorStore();

  const { data: restaurantNames } = useGetRestaurantNames();
  const { data: restaurantReview } = useGetRestaurantReview(Number(reviewId));

  const options = useMemo(() => {
    if (!restaurantNames) return [];
    return restaurantNames.map((item) => ({ label: item.name, value: item.id }));
  }, [restaurantNames]);

  useEffect(() => {
    console.log(editor);
    console.log(restaurantReview);
    if (editor && restaurantReview) {
      editor.render(restaurantReview.editor_object);
    }
  }, [editor, restaurantReview]);

  console.log(restaurantId);
  return (
    <div className={editorContainerStyle}>
      <div className={titleContainerStyle}>
        <input className={titleInputStyle} value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} placeholder={'제목을 입력해주세요.'} />
      </div>
      {restaurantNames && <Select value={Number(restaurantId)} options={options} onChange={(value) => setRestaurantId(value)} />}
      <Editor />
    </div>
  );
};

export default Page;

const editorContainerStyle = css({
  position: 'relative',
  maxWidth: '900px',
  width: '100%',
  margin: '60px auto',
});

const titleContainerStyle = css({
  marginBottom: '16px',
  borderBottom: '1px solid #ddd',
});

const titleInputStyle = css({
  width: '100%',
  fontSize: '45px',
  fontWeight: '600',
});
