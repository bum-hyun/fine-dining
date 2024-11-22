'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';

type AuthenticateResult = {
  errorMessage: string;
  shouldRedirectToSignup: boolean;
};

export async function authenticate(prevState: string, formData: FormData): Promise<AuthenticateResult> {
  try {
    await signIn('credentials', formData);
    return { errorMessage: '', shouldRedirectToSignup: false };
  } catch (error) {
    if (error instanceof AuthError) {
      const isSignupError = error.message.includes('회원가입으로 이동');
      return {
        errorMessage: error.message,
        shouldRedirectToSignup: isSignupError,
      };
    }
    return {
      errorMessage: '알 수 없는 에러가 발생했습니다. 다시 시도해주세요.',
      shouldRedirectToSignup: false,
    };
  }
}
