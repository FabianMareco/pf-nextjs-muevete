import { NextResponse } from 'next/server';
import { adminStorage } from '@/lib/firebase-admin';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('image') as File;
  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `products/${uuidv4()}-${file.name}`;
  const bucket = adminStorage.bucket();
  const fileRef = bucket.file(fileName);
  await fileRef.save(buffer, { contentType: file.type });
  await fileRef.makePublic();
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
  return NextResponse.json({ url: publicUrl });
}