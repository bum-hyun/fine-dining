import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { ellipsis } from 'styled-system/patterns';

import Button from '@/components/Button/Button';
import RestaurantTags from '@/components/RestaurantTags';
import { ROUTE_PATHS } from '@/constants/pathname';
import { usePageRouter } from '@/hooks/usePageRouter';

interface IRestaurantCardProps {
  item: IRestaurant;
}

const RestaurantCard = ({ item }: IRestaurantCardProps) => {
  const router = usePageRouter();

  const [isHover, setIsHover] = useState(false);

  const handleGoToRestaurantReview = (restaurantId: number) => {
    router.push({
      pathname: ROUTE_PATHS.RESTAURANT.REVIEW.LIST,
      query: { restaurantId },
    });
  };

  const handleGoToRestaurantReviewEdit = (restaurantId: number) => {
    router.push({
      pathname: ROUTE_PATHS.RESTAURANT.REVIEW.NEW,
      query: { restaurantId },
    });
  };

  return (
    <article className={containerStyle}>
      <div className={imageWrapStyle} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {isHover && (
          <div className={imageWrapOverlayStyle}>
            <div className={buttonWrapStyle}>
              {item.reservation_url && (
                <Button className={goToReservationButtonStyle}>
                  <Link href={item.reservation_url} target={'_blank'}>
                    예약 페이지
                  </Link>
                </Button>
              )}
              <Button className={seeReviewButtonStyle} onClick={() => handleGoToRestaurantReview(item.id!)}>
                <Link href={`/restaurant/${item.id}/review`}>후기 보기</Link>
              </Button>
              <Button className={writeReviewButtonStyle} onClick={() => handleGoToRestaurantReviewEdit(item.id!)}>
                <Link href={`/restaurant/${item.id}/review/new`}>후기 작성</Link>
              </Button>
            </div>
          </div>
        )}
        {item.thumbnail && <Image className={imageStyle} src={item.thumbnail} alt={'image'} fill sizes={'300px'} priority />}
      </div>
      <div className={infoWrapStyle}>
        <RestaurantTags tags={item.tags} />
        <h4 className={nameStyle}>{item.name}</h4>
        <p className={descriptionStyle}>{item.description}</p>
      </div>
    </article>
  );
};

export default RestaurantCard;

const containerStyle = css({
  position: 'relative',
  width: '100%',
});

const imageWrapStyle = css({
  position: 'relative',
  display: 'flex',
  width: '100%',
  height: '315px',
  backgroundColor: '#7c7c7c',
  borderRadius: '16px',
  overflow: 'hidden',
});

const imageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const infoWrapStyle = css({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '16px',
  overflowX: 'hidden',
});

const nameStyle = ellipsis({
  marginTop: '4px',
  color: '#111',
  lines: 2,
});

const descriptionStyle = ellipsis({
  lines: 2,
});

const imageWrapOverlayStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '#00000080',
  borderRadius: '16px',
  zIndex: 1,
});

const buttonWrapStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const goToReservationButtonStyle = css({
  backgroundColor: 'green.400',

  _hover: {
    backgroundColor: 'green.500',
  },
});

const seeReviewButtonStyle = css({
  backgroundColor: 'blue.400',

  _hover: {
    backgroundColor: 'blue.500',
  },
});

const writeReviewButtonStyle = css({});
