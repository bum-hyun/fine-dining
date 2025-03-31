'use client';

import { css } from 'styled-system/css';
import { ellipsis } from 'styled-system/patterns';

interface IRestaurantProps {
  initialData: any;
}

const Restaurant = ({ initialData }: IRestaurantProps) => {
  console.log(initialData.data);

  return <main className={article}></main>;
};

export default Restaurant;

const article = css({
  flex: 'none',
  position: 'relative',
  maxWidth: '840px',
  margin: '0 auto',
});

const titleArea = css({
  marginTop: '16px',
  marginBottom: '12px',
});

const title = css({
  marginTop: '16px',
  color: '#121212',
});

const profileContainer = css({
  marginTop: '20px',
});

const profileArea = css({
  display: 'flex',
  alignItems: 'center',
});

const profileImage = css({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  objectFit: 'cover',
});

const profileWrap = css({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '200px',
  marginLeft: '12px',
  textAlign: 'left',
});

const writerName = ellipsis({
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '700',
  color: '#2f3438',
});

const writerNickname = ellipsis({
  fontSize: '13px',
  lineHeight: '18px',
  color: '#828C94',
  fontWeight: 500,
});

const content = css({
  marginTop: '16px',
});

const commentArea = css({
  marginTop: '60px',
});

const commentCount = css({
  marginLeft: '4px',
  color: '#f26c52',
});

const commentInputArea = css({
  width: '100%',
  marginTop: '24px',
  marginBottom: '16px',
});

const commentInputWrap = css({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #ddd',
});

const commentInput = css({
  width: '100%',
  margin: '8px 16px',
});
