import { css } from 'styled-system/css';

const Page = async ({ params }: { params: Promise<{ restaurantId: string }> }) => {
  console.log(params);

  return <div className={containerStyle}></div>;
};

export default Page;

const containerStyle = css({
  maxWidth: '786px',
  margin: '0 auto',
});
