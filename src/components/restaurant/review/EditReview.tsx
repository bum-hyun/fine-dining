import EditorJSHTML from 'editorjs-html';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import Button from 'src/components/Button/Button';
import { css } from 'styled-system/css';

import Select from '@/components/Select';
import { useGetRestaurantNames, usePostRestaurantReview, usePutRestaurantReview } from '@/services/restaurant_review';
import { useEditorStore } from '@/stores/editorStore';
import { useUserStore } from '@/stores/userStore';
const Editor = dynamic(() => import('@/components/editor/Editor'), {
  ssr: false,
  loading: () => null,
});

interface IEditReviewProps {
  reviewId?: string | number;
}

const EditReview = ({ reviewId }: IEditReviewProps) => {
  const params = useParams();

  const [restaurantId, setRestaurantId] = useState<string | number>(params.restaurantId as string);

  const { user } = useUserStore();
  const { reviewTitle, setReviewTitle, editor } = useEditorStore();

  const { data: restaurantNames } = useGetRestaurantNames();
  const { mutateAsync: postRestaurantReview } = usePostRestaurantReview();
  const { mutateAsync: putRestaurantReview } = usePutRestaurantReview();

  const options = useMemo(() => {
    if (!restaurantNames) return [];
    return restaurantNames.map((item) => ({ label: item.name, value: item.id }));
  }, [restaurantNames]);

  const handleClickEdit = async () => {
    const data = await editor!.save();
    const filteredBlocks = data.blocks.filter((block) => {
      const { type, data } = block;

      if (type === 'image' || type === 'video') {
        return typeof data.url === 'string' && data.url.trim() !== '';
      }

      return true;
    });
    const newData = { ...data, blocks: filteredBlocks };

    const edjsParser = EditorJSHTML();
    const htmlBlocks = edjsParser.parse(newData);

    const textTypes = ['paragraph', 'header', 'quote', 'list'];
    const text = data.blocks
      .filter((block) => textTypes.includes(block.type) && block.data?.text)
      .map((block) => {
        const text = block.data.text;
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.innerText;
      })
      .join('\n');
    const files = filteredBlocks.filter((block) => ['image', 'video'].includes(block.type)).map((block) => block.data.url);

    const payload: IPostRestaurantReview = {
      editor_object: newData,
      editor_html: htmlBlocks,
      restaurant_id: 1,
      title: reviewTitle,
      user_id: user!.id,
      files,
      text,
    };

    if (reviewId) {
      await putRestaurantReview({ id: Number(reviewId), ...payload });
    } else {
      await postRestaurantReview(payload);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
    setReviewTitle(el.value);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [reviewTitle]);

  return (
    <div className={editorContainerStyle}>
      <div className={topButtonContainerStyle}>
        <Button onClick={handleClickEdit}>등록</Button>
      </div>
      <div className={titleContainerStyle}>
        <textarea ref={textareaRef} className={titleInputStyle} rows={1} value={reviewTitle} onChange={handleChange} placeholder={'제목을 입력해주세요.'} />
      </div>
      {restaurantNames && <Select value={Number(restaurantId)} options={options} onChange={(value) => setRestaurantId(value)} />}
      <Editor />
    </div>
  );
};

export default EditReview;

const editorContainerStyle = css({
  position: 'relative',
  maxWidth: '836px',
  width: '100%',
  margin: '60px auto',
  padding: '0 64px',
});

const topButtonContainerStyle = css({
  display: 'flex',
  justifyContent: 'flex-end',
});

const titleContainerStyle = css({
  marginBottom: '16px',
  borderBottom: '1px solid #ddd',
});

const titleInputStyle = css({
  width: '100%',
  fontSize: '45px',
  fontWeight: '600',
  border: 'none',
  resize: 'none',
  overflow: 'hidden',
  lineHeight: '1.4',
  padding: '8px 0',
  outline: 'none',
});
