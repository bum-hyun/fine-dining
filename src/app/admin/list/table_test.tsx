'use client';
import { css } from 'styled-system/css';

const Page = () => {
  return (
    <div className={listContainerStyle}>
      {/*<div className={tableStyle}>*/}
      {/*  <div className={css({ display: 'contents' })}>*/}
      {/*    <div className={css({ position: 'sticky', left: '0', zIndex: 1, backgroundColor: '#fff', gridArea: '1/1/2/2', insetInlineStart: '65px' })}>식당명</div>*/}
      {/*    <div className={css({ gridArea: '1/2/2/3' })}>주소</div>*/}
      {/*    <div className={css({ gridArea: '1/3/2/4' })}>이메일</div>*/}
      {/*    <div className={css({ gridArea: '1/4/2/5' })}>전화번호</div>*/}
      {/*    <div className={css({ gridArea: '1/5/2/6' })}>예약링크</div>*/}
      {/*  </div>*/}
      {/*  {data?.map((item) => (*/}
      {/*    <div key={item.id} className={listStyle}>*/}
      {/*      <div*/}
      {/*        className={css({*/}
      {/*          position: 'sticky',*/}
      {/*          left: '0',*/}
      {/*          zIndex: 1,*/}
      {/*          gridColumn: '1/2',*/}
      {/*          whiteSpace: 'nowrap',*/}
      {/*          overflow: 'hidden',*/}
      {/*          insetInlineStart: '65px',*/}
      {/*          textOverflow: 'ellipsis',*/}
      {/*          backgroundColor: '#fff',*/}
      {/*        })}*/}
      {/*      >*/}
      {/*        {item.name}*/}
      {/*      </div>*/}
      {/*      <div className={css({ gridColumn: '2/3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' })}>{item.address}</div>*/}
      {/*      <div className={css({ gridColumn: '3/4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' })}>{item.email}</div>*/}
      {/*      <div className={css({ gridColumn: '4/5', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' })}>{item.tel}</div>*/}
      {/*      <div className={css({ gridColumn: '5/6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' })}>{item.reservation_url}</div>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  );
};

export default Page;

const listContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 16px',
  gap: '16px',
  fontSize: '14px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

// const tableStyle = css({
//   flexGrow: 1,
//   display: 'grid',
//   height: '100%',
//   gridTemplateRows: 'repeat(6, 35px)',
//   gridTemplateColumns: '130px 120px 189px 250px 250px 250px 250px 162px 198px 189px 250px 250px 250px 144px 144px 250px 100px',
//   overflowX: 'auto',
//   overflowY: 'scroll',
// });
//
// const listStyle = css({
//   display: 'contents',
//   gridRowStart: 2,
// });
//
// const cellStyle = css({
//   whiteSpace: 'nowrap',
//   overflow: 'hidden',
//   textOverflow: 'ellipsis',
// });
