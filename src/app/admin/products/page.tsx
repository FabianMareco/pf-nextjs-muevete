// src/app/admin/products/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

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

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Producto eliminado');
        fetchProducts();
      } else {
        toast.error('Error al eliminar');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-secondary-light">Cargando productos...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-secondary-light text-2xl">Productos</h2>
        <Link href="/admin/products/new" className="btn-accent">
          + Nuevo producto
        </Link>
      </div>
      <div className="card-glass overflow-x-auto">
        <table className="w-full text-secondary-light">
          <thead>
            <tr className="border-b border-white/20">
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
              <tr key={product.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="p-3">
                  <img src={product.pictureUrl} alt={product.name} className="w-10 h-10 object-contain" />
                </td>
                <td className="p-3 font-medium">{product.name}</td>
                <td className="p-3">${product.price.toLocaleString()}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">{product.subcategory}</td>
                <td className="p-3 text-center">
                  <Link href={`/admin/products/${product.id}`} className="text-accent hover:underline mr-3">
                    Editar
                  </Link>
                  <button onClick={() => handleDelete(product.id, product.name)} className="text-danger hover:underline">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-center py-8 text-secondary-light">No hay productos. Crea el primero.</p>
        )}
      </div>
    </div>
  );
}