'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    console.log('AdminLayout - loading:', loading, '| user:', user?.email);
    if (!loading) {
      if (!user) {
        console.log('Sin usuario, redirigiendo a /login');
        router.push('/login');
      } else {
        console.log('Usuario verificado:', user.email);
        setChecked(true);
      }
    }
  }, [user, loading, router]);

  if (loading || !checked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-secondary-light text-xl animate-pulse">Verificando acceso...</div>
      </div>
    );
  }

  return (
    <div className="bg-primary-dark min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 bg-primary rounded-lg p-4 h-fit md:sticky md:top-24">
            <h3 className="text-secondary-light text-xl mb-4 font-bold">Admin Panel</h3>
            <nav className="flex flex-row md:flex-col gap-2 flex-wrap">
              <Link href="/admin" className="text-secondary-light hover:text-accent py-2 px-3 rounded hover:bg-white/10 transition">📊 Dashboard</Link>
              <Link href="/admin/products" className="text-secondary-light hover:text-accent py-2 px-3 rounded hover:bg-white/10 transition">🛍️ Productos</Link>
              <Link href="/admin/orders" className="text-secondary-light hover:text-accent py-2 px-3 rounded hover:bg-white/10 transition">📦 Órdenes</Link>
            </nav>
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
