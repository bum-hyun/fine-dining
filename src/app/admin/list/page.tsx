'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { css } from 'styled-system/css';

import { ROUTE_PATHS } from '@/constants/pathname';
import { useIntersect } from '@/hooks/useIntersect';
import { useDeleteRestaurant, useGetRestaurants } from '@/services/restaurant/restaurant_queries';

const Page = () => {
  const router = useRouter();

  const [params, setParams] = useState<IGetRestaurantsParams>({ page: 0, limit: 10 });

  const { data, fetchNextPage, hasNextPage, refetch } = useGetRestaurants(params);
  const { mutateAsync: deleteRestaurant } = useDeleteRestaurant();

  const onIntersect = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const intersectRef = useIntersect(onIntersect, hasNextPage);

  const handleDeleteRestaurant = useCallback(async (id: number) => {
    await deleteRestaurant(id);
    await refetch();
  }, []);

  const restaurants = data?.pages.flat() ?? [];

  return (
    <div className={listContainerStyle}>
      {restaurants.map((item) => (
        <div key={item.id} className={itemWrapStyle}>
          <div className={imageWrapStyle}>{item.thumbnail && <Image className={imageStyle} src={item.thumbnail} alt={'thumbnail'} width={100} height={150} />}</div>
          <div className={contentsWrapStyle}>
            <div className={contentsStyle}>{item.name}</div>
            <div className={contentsStyle}>{item.address}</div>
            <div className={contentsStyle}>{item.tel}</div>
            <div className={contentsStyle}>
              <Link href={item.reservation_url || ''}>예약 링크</Link>
            </div>
          </div>
          <div className={buttonWrapStyle}>
            <button className={`${buttonStyle} ${editButtonStyle}`} onClick={() => router.push(`${ROUTE_PATHS.ADMIN.EDIT}/${item.id!}`)}>
              수정
            </button>
            <button className={`${buttonStyle} ${deleteButtonStyle}`} onClick={() => handleDeleteRestaurant(item.id!)}>
              삭제
            </button>
          </div>
        </div>
      ))}
      <div ref={intersectRef} style={{ height: 1 }} />
    </div>
  );
};

export default Page;

const listContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 16px',
  gap: '16px',
  width: '100%',
  fontSize: '14px',
  overflow: 'auto',
  textOverflow: 'ellipsis',
});

const itemWrapStyle = css({
  display: 'flex',
  alignItems: 'center',
});

const imageWrapStyle = css({
  flex: 'none',
  width: '80px',
  height: '100px',
  backgroundColor: '#969696',
  borderRadius: '8px',
  overflow: 'hidden',
});

const imageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const contentsWrapStyle = css({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '24px',
  overflow: 'hidden',
});

const contentsStyle = css({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const buttonWrapStyle = css({
  flex: 'none',
  display: 'flex',
  marginLeft: '80px',
  gap: '8px',
});

const buttonStyle = css({
  padding: '8px 16px',
  color: '#fff',
  borderRadius: '8',
  cursor: 'pointer',
});

const editButtonStyle = css({
  backgroundColor: '#387e3e',
});

const deleteButtonStyle = css({
  backgroundColor: '#f26c52',
});
