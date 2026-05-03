import { adminDB } from './firebase-admin';

export async function getProducts(category: string | null = null) {
  let query = adminDB.collection('products');
  if (category && category !== 'todos') query = query.where('category', '==', category);
  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
export async function getProductById(id: string) {
  const doc = await adminDB.collection('products').doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}