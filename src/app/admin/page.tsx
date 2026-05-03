// src/app/admin/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(res => res.json()),
      fetch('/api/orders').then(res => res.json())
    ]).then(([products, orders]) => {
      setStats({ products: products.length, orders: orders.length });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-secondary-light">Cargando estadísticas...</div>;
  }

  return (
    <div>
      <h2 className="text-secondary-light text-2xl mb-6">Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-glass p-6 text-center">
          <p className="text-5xl font-bold text-accent">{stats.products}</p>
          <p className="text-secondary-light mt-2 text-lg">Productos</p>
          <Link href="/admin/products" className="btn-primary inline-block mt-4">Gestionar productos</Link>
        </div>
        <div className="card-glass p-6 text-center">
          <p className="text-5xl font-bold text-accent">{stats.orders}</p>
          <p className="text-secondary-light mt-2 text-lg">Órdenes</p>
          <Link href="/admin/orders" className="btn-primary inline-block mt-4">Ver órdenes</Link>
        </div>
      </div>
    </div>
  );
}