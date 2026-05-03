import { adminDB } from '@/lib/firebase-admin';
import { CollectionReference, Query, DocumentData } from 'firebase-admin/firestore';

export async function getProducts(category: string | null = null) {
  let query: CollectionReference<DocumentData> | Query<DocumentData> = adminDB.collection('products');
  if (category && category !== 'todos') query = query.where('category', '==', category);
  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
