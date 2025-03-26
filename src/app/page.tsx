import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import RestaurantList from '@/components/RestaurantList';

export default function Home() {
  return (
    <div className={css({ flex: 1, overflowX: 'hidden', overflowY: 'auto' })}>
      <div className={css({ maxWidth: '1244px', margin: 'auto', padding: '16px 0 60px' })}>
        <div className={flex({ flexDirection: 'column' })}>
          <h1 className={css({ maxWidth: '750px', marginBottom: '8px', fontSize: '36px', fontWeight: '600', color: '#111', wordWrap: 'break-word' })}>전체</h1>
          <div className={css({ maxWidth: '750px', marginBottom: '16px', fontSize: '16px', color: '#111', wordWrap: 'break-word' })}>세계 곳곳의 레스토랑을 예약해보세요!</div>
        </div>
        <RestaurantList />
      </div>
    </div>
  );
}
