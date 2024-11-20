import { Db } from 'mongodb';

import clientPromise from '@/lib/mongodb';

/**
 * MongoDB 데이터베이스 인스턴스를 반환하는 함수
 * @param dbName 데이터베이스 이름
 * @returns 데이터베이스 인스턴스
 */
export async function getDatabase(dbName: string): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}
