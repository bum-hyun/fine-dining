'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import { usePostRestaurant } from '@/services/restaurant';
import supabase from '@/utils/supabase/client';

const Page = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [payload, setPayload] = useState<IRestaurant>({
    name: '',
    address: '',
    email: '',
    description: '',
    is_only_course: false,
    tel: '',
    reservation_url: '',
    tags: [],
    launch_price: 0,
    dinner_price: 0,
  });

  const { mutateAsync: postRestaurant } = usePostRestaurant();

  const handleChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name === 'tags') {
      const tags = value.split(',');
      setPayload((prev) => ({ ...prev, [name]: tags }));
      return;
    }
    if (name === 'thumbnail' && files && files[0]) {
      const file = files[0];
      const filePath = `files/${Date.now()}_fff`;

      const { data, error } = await supabase.storage.from('files').upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('files').getPublicUrl(filePath);

      inputRef.current!.value = '';
      console.log(publicUrl);
      setPayload((prev) => ({ ...prev, thumbnail: publicUrl }));
      return;
    }
    setPayload((prev) => ({ ...prev, [name]: value }));
  }, []);

  const register = useCallback(async () => {
    const data = await postRestaurant(payload);
    console.log(data);
  }, [payload]);

  useEffect(() => {
    console.log(payload);
  }, [payload]);

  return (
    <div className={css({ flex: 1, overflowX: 'hidden', overflowY: 'auto' })}>
      <div className={css({ height: '100%', padding: '8px 12px' })}>
        <div className={css({ maxWidth: '768px', margin: 'auto' })}>
          <div className={flex({ flexDirection: 'column', padding: '16px', gap: '24px' })}>
            <button className={imageWrap} onClick={() => inputRef.current?.click()}>
              {payload.thumbnail && <Image className={image} src={payload.thumbnail} width={236} height={315} alt={''} />}
              <input className={invisibleInput} ref={inputRef} name={'thumbnail'} type={'file'} accept={'image/*'} onChange={handleChange} tabIndex={-1} />
            </button>

            <div className={wrap}>
              <div className={label}>이름</div>
              <div className={value}>
                <input className={input} name={'name'} value={payload.name} onChange={handleChange} />
              </div>
            </div>

            <div className={wrap}>
              <div className={label}>주소</div>
              <div className={value}>
                <input className={input} name={'address'} value={payload.address} onChange={handleChange} />
              </div>
            </div>

            <div className={wrap}>
              <div className={label}>전화번호</div>
              <div className={value}>
                <input className={input} name={'tel'} value={payload.tel} onChange={handleChange} />
              </div>
            </div>

            <div className={wrap}>
              <div className={label}>이메일</div>
              <div className={value}>
                <input className={input} name={'email'} value={payload.email} onChange={handleChange} />
              </div>
            </div>

            <div className={wrap}>
              <div className={label}>예약 페이지</div>
              <div className={value}>
                <input className={input} name={'reservation_url'} value={payload.reservation_url} onChange={handleChange} />
              </div>
            </div>

            <div className={wrap}>
              <div className={label}>런치 가격</div>
              <div className={value}>
                <input className={input} name={'launch_price'} value={payload.launch_price} onChange={handleChange} />
              </div>
            </div>

            <div className={wrap}>
              <div className={label}>디너 가격</div>
              <div className={value}>
                <input className={input} name={'dinner_price'} value={payload.dinner_price} onChange={handleChange} />
              </div>
            </div>

            <div className={wrap}>
              <div className={label}>태그</div>
              <div className={value}>
                <input className={input} name={'tags'} value={payload.tags.join(',')} onChange={handleChange} />
              </div>
            </div>

            <div className={buttonWrap}>
              <button className={button} onClick={register}>
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

const wrap = css({
  display: 'flex',
  alignItems: 'center',
});

const imageWrap = css({
  width: '236px',
  height: '315px',
  marginBottom: '24px',
  backgroundColor: '#969696',
  borderRadius: '16px',
  overflow: 'hidden',
});

const label = css({
  flex: 'none',
  width: '120px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#111',
});

const value = css({
  flex: 1,
  width: '100%',
});

const input = css({
  width: '100%',
  borderBottom: '1px solid #ddd',
  outline: 'none',
});

const buttonWrap = css({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '16px',
});

const button = css({
  padding: '8px 16px',
  color: '#fff',
  backgroundColor: '#32bc69',
  borderRadius: '8px',
  cursor: 'pointer',
});

const invisibleInput = css({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: '0',
});

const image = css({
  width: '100%',
  height: '100%',
});
