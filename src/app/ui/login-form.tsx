'use client';

import { useActionState } from 'react';
import { css } from 'styled-system/css';

import { Button } from '@/components/Button';
import { authenticate } from '@/lib/actions';

export default function LoginForm() {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);

  return (
    <div className={container}>
      <div className={loginCard}>
        <div>
          <form action={''}></form>
        </div>
        <form action={formAction}>
          <div>
            <label htmlFor={'email'} className={label}>
              이메일
            </label>
            <input id={'email'} className={input} placeholder={'이메일을 입력해주세요.'} required />
          </div>
          <div className={css({ marginTop: '1rem' })}>
            <label htmlFor={'password'} className={label}>
              비밀번호
            </label>
            <input id={'password'} className={input} placeholder={'비밀번호를 입력해주세요.'} required />
          </div>
          {errorMessage && <div className={errorStyle}>{errorMessage}</div>}
          <Button variant={'outline'}>로그인</Button>
        </form>
        <Button variant={'solid'}>회원가입</Button>
      </div>
    </div>
  );
}

const container = css({ position: 'fixed', width: '100%', height: '100%', display: 'grid', placeItems: 'center', margin: 0, padding: 0 });

const loginCard = css({
  width: '368px',
  margin: '2rem 0',
  padding: '1.25rem 2rem',
  backgroundColor: '#fff',
  borderRadius: '1rem',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, .1), 0px 8px 16px rgba(0, 0, 0, .1)',
});

const label = css({
  fontWeight: '500',
});

const input = css({
  width: '100%',
  marginTop: '0.5rem',
  padding: '0.5rem 1rem',
  border: '1px solid #ddd',
  borderRadius: '0.5rem',
});

const errorStyle = css({
  color: 'red',
  marginTop: '1rem',
  fontSize: '0.875rem',
});

const loginButton = css({
  width: '100%',
  marginTop: '2rem',
});
