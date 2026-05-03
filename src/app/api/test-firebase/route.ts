import { NextResponse } from 'next/server';
import { adminDB } from '@/lib/firebase-admin';

export async function GET() {
  try {
    // Intentar leer un documento de prueba
    const testRef = adminDB.collection('products').limit(1);
    const snapshot = await testRef.get();
    return NextResponse.json({ 
      success: true, 
      message: 'Firebase Admin funciona correctamente',
      count: snapshot.size 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}