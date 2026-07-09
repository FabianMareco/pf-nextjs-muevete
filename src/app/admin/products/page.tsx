// src/app/admin/products/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ConfirmDialog from '@/components/ConfirmDialog';

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  subcategory: string;
  pictureUrl: string;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState<{ id: string; name: string } | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (!toDelete) return;
    const res = await fetch(`/api/products/${toDelete.id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Producto eliminado');
      fetchProducts();
    } else {
      toast.error('Error al eliminar');
    }
    setToDelete(null);
  };

  if (loading) {
    return <div className="text-center py-10 text-muted">Cargando productos...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-ink text-2xl text-left">Productos</h2>
        <Link href="/admin/products/new" className="btn-accent">
          + Nuevo producto
        </Link>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-ink">
          <thead>
            <tr className="border-b border-neutral">
              <th className="p-3 text-left">Imagen</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Precio</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Categoría</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-neutral hover:bg-neutral/60">
                <td className="p-3">
                  <img src={product.pictureUrl} alt={product.name} className="w-10 h-10 object-contain" />
                </td>
                <td className="p-3 font-medium">{product.name}</td>
                <td className="p-3">${product.price.toLocaleString()}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">{product.subcategory}</td>
                <td className="p-3 text-center">
                  <Link href={`/admin/products/${product.id}`} className="text-accent-deep hover:underline mr-3">
                    Editar
                  </Link>
                  <button onClick={() => setToDelete({ id: product.id, name: product.name })} className="text-danger hover:underline">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-center py-8 text-muted">No hay productos. Creá el primero.</p>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!toDelete}
        title="¿Eliminar producto?"
        message={`¿Eliminar "${toDelete?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Sí, eliminar"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}