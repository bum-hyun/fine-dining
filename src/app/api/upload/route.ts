import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';

import clientPromise from '@/lib/mongodb';

const Bucket = 'loel-bucket';
const Region = 'ap-northeast-2';

const s3 = new S3Client({
  region: Region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

/**
 * Generate a pre-signed URL for S3 and return the uploaded file's URL.
 */
const generatePresignedUrl = async (name: string, type: string): Promise<string> => {
  try {
    const params = {
      Bucket,
      Key: `image/${name}`,
      ContentType: type,
    };
    const command = new PutObjectCommand(params);
    return await getSignedUrl(s3, command, { expiresIn: 3600 });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw new Error('Failed to generate presigned URL');
  }
};

/**
 * Save file metadata to MongoDB.
 */
const saveFile = async (metadata: Omit<IFile, 'id' | 'preSignedUrl'>) => {
  try {
    const client = await clientPromise;
    const db = client.db('fine_dining');

    return await db.collection('files').insertOne(metadata);
  } catch (error) {
    console.error('Error saving file metadata:', error);
    throw new Error('Failed to save file metadata');
  }
};

/**
 * POST handler for generating pre-signed URL and saving file metadata.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, type } = body;

    if (!name || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate pre-signed URL
    const preSignedUrl = await generatePresignedUrl(name, type);

    // Construct the file's public URL
    const fileUrl = `https://${Bucket}.s3.${Region}.amazonaws.com/image/${name}`;

    // Save metadata to MongoDB
    const result = await saveFile({ ...body, url: fileUrl });

    return NextResponse.json({ id: result.insertedId, ...body, url: fileUrl, preSignedUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
