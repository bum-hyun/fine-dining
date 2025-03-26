import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import RestaurantList from '@/components/RestaurantList';

export default function Home() {
  return (
    <div className={containerStyle}>
      <div className={contentsWrapStyle}>
        <div className={flex({ flexDirection: 'column' })}>
          <h1 className={titleStyle}>전체</h1>
          <div className={descriptionStyle}>전 세계에 있는 레스토랑에 다녀온 후기를 남겨주세요!</div>
        </div>
        <RestaurantList />
      </div>
    </div>
  );
}

const containerStyle = css({
  flex: 1,
  overflowX: 'hidden',
  overflowY: 'auto',
});

const contentsWrapStyle = css({
  maxWidth: '1288px',
  margin: 'auto',
  padding: '16px 20px 60px',
});

const titleStyle = css({
  maxWidth: '750px',
  marginBottom: '8px',
  fontSize: '36px',
  fontWeight: '600',
  color: '#111',
  wordWrap: 'break-word',
});

const descriptionStyle = css({
  maxWidth: '750px',
  marginBottom: '16px',
  fontSize: '16px',
  color: '#111',
  wordWrap: 'break-word',
});
