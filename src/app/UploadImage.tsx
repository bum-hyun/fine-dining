'use client';
import { useRef } from 'react';

import { usePostFile } from '@/services/upload';

const UploadImage = () => {
  const ref = useRef(null);

  const { mutate } = usePostFile();

  const handleUpload = (file: FileList | null) => {
    mutate({ file: file![0] });
  };

  return (
    <div>
      <input type={'file'} ref={ref} onChange={(e) => handleUpload(e.target.files)} />
      이미지 올리기
      <img
        src={
          'https://loel-bucket.s3.ap-northeast-2.amazonaws.com/image/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-10-08%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2012.41.51.png'
        }
      />
    </div>
  );
};

export default UploadImage;
