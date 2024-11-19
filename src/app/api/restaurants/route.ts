import { NextResponse } from 'next/server';

import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('fine_dining');
    const restaurants = await db.collection('restaurants').find({}).toArray();
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('fine_dining');
    const body = await req.json();

    const result = await db.collection('restaurants').insertOne(body);
    return NextResponse.json({ message: 'Data inserted', result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
