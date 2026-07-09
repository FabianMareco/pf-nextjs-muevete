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
      } else if (user.email === "admin@muevete.com") {
        console.log('Usuario verificado:', user.email);
        setChecked(true);
      } else {
        router.push("/");
      }
    }
  }, [user, loading, router]);

  if (loading || !checked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-ink text-xl animate-pulse">Verificando acceso...</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 bg-ink rounded-card p-4 h-fit md:sticky md:top-24">
            <h3 className="text-paper text-xl mb-4 font-bold text-left">Admin Panel</h3>
            <nav className="flex flex-row md:flex-col gap-2 flex-wrap">
              <Link href="/admin" className="text-paper/75 hover:text-paper py-2 px-3 rounded-control hover:bg-white/10 transition flex items-center gap-2">
                <i className="fas fa-gauge w-4" aria-hidden="true" />Dashboard
              </Link>
              <Link href="/admin/products" className="text-paper/75 hover:text-paper py-2 px-3 rounded-control hover:bg-white/10 transition flex items-center gap-2">
                <i className="fas fa-bag-shopping w-4" aria-hidden="true" />Productos
              </Link>
              <Link href="/admin/orders" className="text-paper/75 hover:text-paper py-2 px-3 rounded-control hover:bg-white/10 transition flex items-center gap-2">
                <i className="fas fa-box w-4" aria-hidden="true" />Órdenes
              </Link>
            </nav>
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
