'use client';
import { useEffect, useState } from 'react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => { setOrders(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted">Cargando órdenes...</p>;
  if (orders.length === 0) return <p className="text-muted">No hay órdenes registradas.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-ink mb-6 text-left">Órdenes</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="card p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-ink">{order.buyer?.name}</p>
                <p className="text-sm text-muted">{order.buyer?.email} · {order.buyer?.phone}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-ink text-lg">${order.total?.toLocaleString()}</p>
                <span className="text-xs bg-success/15 text-success-dark px-2 py-1 rounded-full font-semibold">{order.status}</span>
              </div>
            </div>
            <div className="border-t border-neutral pt-2 mt-2">
              <p className="text-xs text-muted mb-2">ID: {order.id}</p>
              <div className="space-y-1">
                {order.items?.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-sm text-muted">
                    <span>{item.title} {item.selectedSize ? `(Talle: ${item.selectedSize})` : ''} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
