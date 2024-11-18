'use client';

import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import Image from 'next/image';
import { css } from 'styled-system/css';
import { ellipsis } from 'styled-system/patterns';

import { useGetRestaurant } from '@/services/restaurant';

interface IRestaurantProps {
  initialData: any;
}

const Restaurant = ({ initialData }: IRestaurantProps) => {
  console.log(initialData.data);
  const { data } = useGetRestaurant();

  const sanitizedHTML = DOMPurify.sanitize(JSON.parse(initialData.data.content).content);

  return (
    <main className={article}>
      <div className={titleArea}>
        <h2 className={title}>아담한 복층도 괜찮아! 테라스 감성이 매력적인 아이보리 신혼집</h2>
      </div>
      <div className={profileContainer}>
        <button className={profileArea}>
          <Image className={profileImage} width={60} height={60} src={'https://vip.teepee.kr/2024/11/18/14/19/43/e399c590-b422-4672-a753-f45b30825382.png'} alt={'hh'} />
          <div className={profileWrap}>
            <span className={writerName}>dadsadjasdjwqeqeqeqdadsadjasdjwqeqeqeqdadsadjasdjwqeqeqeqdadsadjasdjwqeqeqeqdadsadjasdjwqeqeqeqdadsadjasdjwqeqeqeqdadsadjasdjwqeqeqeq</span>
            <span className={writerNickname}>dadsadjasdjwqeqeqeqdadsadjasdjwqeqeqeqdadsadjasdjwqeqeqeqdadsadjasdjwqeqeqeqdadsadjasdjwqeqeqeqdadsadjasdjwqeqeqeqdadsadjasdjwqeqeqeq</span>
          </div>
        </button>
      </div>
      <div className={content}>{parse(sanitizedHTML)}</div>
      <div className={commentArea}>
        <h5>
          댓글 <span className={commentCount}>22</span>
        </h5>
        <div className={commentInputArea}>
          <div className={commentInputWrap}>
            <input placeholder={'착한 댓글 부탁드립니다.'} className={commentInput} />
          </div>
        </div>
      </div>
    </main>
  );
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
