import bcrypt from 'bcryptjs';
import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Kakao from 'next-auth/providers/kakao';
import { z } from 'zod';

import { authConfig } from '@/auth.config';
import { getUserFromDb } from '@/utils/user/getUserFromDb';

export class CustomAuthError extends AuthError {
  constructor(msg: string) {
    super();
    this.message = msg;
    this.stack = undefined;
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Kakao,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new CustomAuthError('올바른 이메일과 비밀번호를 입력해주세요.');
        }

        const { email, password } = parsedCredentials.data;

        const user = await getUserFromDb({ email });
        if (!user) {
          throw new CustomAuthError('등록되지 않은 이메일 주소입니다.  회원가입으로 이동해주세요.');
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          throw new CustomAuthError('비밀번호가 올바르지 않습니다.');
        }

        return user;
      },
    }),
  ],
});
