'use client';

import { FormEvent } from 'react';
import { css } from 'styled-system/css';

import { Button } from '@/components/Button';

export default function LoginForm() {
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    console.log(response);
    if (response.ok) {
    } else {
      // Handle errors
    }
  };

  return (
    <div className={loginCard}>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor={'email'} className={label}>
            이메일
          </label>
          <input id={'email'} name={'email'} className={input} placeholder={'이메일을 입력해주세요.'} />
        </div>
        <div className={css({ marginTop: '1rem' })}>
          <label htmlFor={'password'} className={label}>
            비밀번호
          </label>
          <input id={'password'} name={'password'} className={input} placeholder={'비밀번호를 입력해주세요.'} />
        </div>
        <Button className={loginButton}>계속</Button>
      </form>
    </div>
  );
}

const loginCard = css({
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
  marginTop: '1rem',
});
