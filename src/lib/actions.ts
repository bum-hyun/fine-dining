'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return error.message;
    }
    return '알 수 없는 에러가 발생했습니다. 다시 시도해주세요.';
  }
}
