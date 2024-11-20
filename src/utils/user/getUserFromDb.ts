import { DATABASE_NAME } from '@/constants';
import { getDatabase } from '@/utils/db';

interface User {
  _id: string;
  username: string;
  email: string;
  [key: string]: any;
}

/**
 * MongoDB에서 특정 조건에 맞는 사용자를 검색하는 함수
 * @param filter 검색 조건 (예: { email: 'test@example.com' })
 * @returns 검색된 사용자 또는 null
 */
export async function getUserFromDb(filter: Partial<User>) {
  try {
    const db = await getDatabase(DATABASE_NAME);
    return await db.collection<User>('user').findOne(filter);
  } catch (error) {
    console.error('Error fetching user from DB:', error);
    throw new Error('Failed to fetch user from the database');
  }
}
