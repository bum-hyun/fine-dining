import bcrypt from 'bcryptjs';

/**
 * 암호화 함수
 * @param plainTextPassword 평문 비밀번호
 * @returns 암호화된 비밀번호
 */
export async function hashPassword(plainTextPassword: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(plainTextPassword, saltRounds);
}

/**
 * 비밀번호 검증 함수
 * @param plainTextPassword 평문 비밀번호
 * @param hashedPassword 암호화된 비밀번호
 * @returns 비밀번호가 일치하면 true, 그렇지 않으면 false
 */
export async function verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}
