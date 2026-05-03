// src/lib/firestore.ts
// ⚠️ ESTE ARCHIVO SOLO SE IMPORTA EN SERVER COMPONENTS Y API ROUTES
// NO importar en componentes con 'use client'

import { adminDB } from './firebase-admin';

// Obtener todos los productos o por categoría
export async function getProducts(category: string | null = null) {
  try {
    let query = adminDB.collection('products');
    
    if (category && category !== 'todos') {
      query = query.where('category', '==', category);
    }
    
    const snapshot = await query.get();
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return products;
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    return [];
  }
}

// Obtener un producto por ID
export async function getProductById(id: string) {
  try {
    const doc = await adminDB.collection('products').doc(id).get();
    
    if (!doc.exists) {
      return null;
    }
    
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error('Error obteniendo producto:', error);
    return null;
  }
}

// Obtener productos por subcategoría (tazas, remeras, etc.)
export async function getProductsBySubcategory(subcategory: string) {
  try {
    const snapshot = await adminDB
      .collection('products')
      .where('subcategory', '==', subcategory)
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error obteniendo productos por subcategoría:', error);
    return [];
  }
}

// Obtener todas las categorías disponibles (para filtros)
export async function getCategories() {
  try {
    const snapshot = await adminDB.collection('products').get();
    const categories = new Set<string>();
    
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.subcategory) {
        categories.add(data.subcategory);
      }
    });
    
    return Array.from(categories);
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    return [];
  }
}

// Crear una orden de compra
export async function createOrder(orderData: any) {
  try {
    const docRef = await adminDB.collection('orders').add({
      ...orderData,
      date: new Date(),
      status: 'pendiente'
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creando orden:', error);
    throw error;
  }
}

// Actualizar stock de productos (después de una compra)
export async function updateStock(items: Array<{ id: string; quantity: number }>) {
  const batch = adminDB.batch();
  
  for (const item of items) {
    const productRef = adminDB.collection('products').doc(item.id);
    const productSnap = await productRef.get();
    
    if (productSnap.exists) {
      const currentStock = productSnap.data()?.stock || 0;
      const newStock = currentStock - item.quantity;
      
      if (newStock < 0) {
        throw new Error(`Stock insuficiente para producto ${item.id}`);
      }
      
      batch.update(productRef, { stock: newStock });
    }
  }
  
  await batch.commit();
}

// Obtener órdenes por email de usuario (para historial)
export async function getOrdersByEmail(email: string) {
  try {
    const snapshot = await adminDB
      .collection('orders')
      .where('buyer.email', '==', email)
      .orderBy('date', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error obteniendo órdenes:', error);
    return [];
  }
}