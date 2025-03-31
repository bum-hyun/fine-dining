'use client';

import { css } from 'styled-system/css';

const Editor = dynamic(() => import('@/components/editor/Editor'), {
  ssr: false,
  loading: () => null,
});
import dynamic from 'next/dynamic';

const Page = () => {
  return (
    <div className={editorContainerStyle}>
      <div className={titleContainerStyle}>
        <input className={titleInputStyle} placeholder={'제목을 입력해주세요.'} />
      </div>
      <Editor />
    </div>
  );
};

export default Page;

const editorContainerStyle = css({
  maxWidth: '900px',
  margin: '60px auto',
});

const titleContainerStyle = css({
  borderBottom: '1px solid #ddd',
});

const titleInputStyle = css({
  width: '100%',
  fontSize: '45px',
  fontWeight: '600',
});
