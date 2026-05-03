import { NextResponse } from 'next/server';
import { adminDB } from '@/lib/firebase-admin';

export async function GET() {
  const snapshot = await adminDB.collection('products').get();
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, price, stock, category, subcategory, description, pictureUrl } = body;
  if (!name || !price || !stock || !category || !subcategory || !description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const docRef = await adminDB.collection('products').add({ name, price: Number(price), stock: Number(stock), category, subcategory, description, pictureUrl });
  return NextResponse.json({ id: docRef.id, ...body }, { status: 201 });
}