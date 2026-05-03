import { adminDB } from '@/lib/firebase-admin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const snapshot = await adminDB.collection('orders').orderBy('date', 'desc').get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const order = await request.json();

    if (!order.buyer || !order.items || !order.total)
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });

    const { name, phone, email } = order.buyer;
    if (!name || !phone || !email)
      return NextResponse.json({ error: 'Datos del comprador incompletos' }, { status: 400 });

    order.date = new Date();
    order.status = 'completada';

    const docRef = await adminDB.collection('orders').add(order);
    const batch = adminDB.batch();

    for (const item of order.items) {
      const isPack = item.type === 'pack';

      if (isPack) {
        const packRef = adminDB.collection('packs').doc(String(item.id));
        const packSnap = await packRef.get();
        if (!packSnap.exists) {
          return NextResponse.json({ error: `Pack ${item.title} no encontrado` }, { status: 404 });
        }
        continue;
      }

      const productRef = adminDB.collection('products').doc(item.id);
      const productSnap = await productRef.get();

      if (!productSnap.exists) {
        return NextResponse.json({ error: `Producto ${item.title} no encontrado` }, { status: 404 });
      }

      const productData = productSnap.data();
      const currentStock = productData?.stock ?? 0;
      const newStock = currentStock - item.quantity;

      if (newStock < 0) {
        return NextResponse.json({ error: `Stock insuficiente para ${item.title}` }, { status: 400 });
      }

      batch.update(productRef, { stock: newStock });
    }

    await batch.commit();
    return NextResponse.json({ success: true, orderId: docRef.id }, { status: 200 });

  } catch (error) {
    console.error('Error en POST /api/orders:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
