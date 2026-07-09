'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';
import ConfirmDialog from '@/components/ConfirmDialog';
import toast from 'react-hot-toast';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'merchandising',
    subcategory: 'tazas',
    description: '',
    pictureUrl: ''
  });

  // Cargar datos del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Producto no encontrado');
        const data = await res.json();
        setForm({
          name: data.name || '',
          price: data.price?.toString() || '',
          stock: data.stock?.toString() || '',
          category: data.category || 'merchandising',
          subcategory: data.subcategory || 'tazas',
          description: data.description || '',
          pictureUrl: data.pictureUrl || ''
        });
      } catch (error) {
        toast.error('Error al cargar el producto');
        router.push('/admin');
      } finally {
        setFetching(false);
      }
    };
    if (id) fetchProduct();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock)
        })
      });
      if (res.ok) {
        toast.success('Producto actualizado correctamente');
        router.push('/admin');
      } else {
        const error = await res.json();
        toast.error(error.error || 'Error al actualizar');
      }
    } catch (error) {
      toast.error('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setConfirmDelete(false);
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Producto eliminado');
        router.push('/admin');
      } else {
        toast.error('Error al eliminar');
      }
    } catch (error) {
      toast.error('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-accent border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted">Cargando producto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-ink">Editar producto</h1>
        <button
          onClick={() => setConfirmDelete(true)}
          className="btn-danger py-2 px-4"
          disabled={loading}
        >
          Eliminar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="card p-6">
        {/* Nombre */}
        <div className="mb-4">
          <label className="block font-bold mb-1 text-ink">Nombre del producto *</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="input"
            required
          />
        </div>

        {/* Precio y Stock */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-bold mb-1 text-ink">Precio (ARS) *</label>
            <input
              type="number"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block font-bold mb-1 text-ink">Stock *</label>
            <input
              type="number"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
              className="input"
              required
            />
          </div>
        </div>

        {/* Categoría y Subcategoría */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-bold mb-1 text-ink">Categoría</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="input"
            >
              <option value="merchandising">Merchandising</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-1 text-ink">Subcategoría *</label>
            <select
              value={form.subcategory}
              onChange={e => setForm({ ...form, subcategory: e.target.value })}
              className="input"
              required
            >
              <option value="tazas">Tazas</option>
              <option value="remeras">Remeras</option>
              <option value="bolsos">Bolsos</option>
              <option value="hidratarse">Hidratación</option>
              <option value="zapatillas">Zapatillas</option>
              <option value="equipamiento">Equipamiento</option>
            </select>
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label className="block font-bold mb-1 text-ink">Descripción *</label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="input"
            rows={4}
            required
          />
        </div>

        {/* Imagen */}
        <div className="mb-4">
          <label className="block font-bold mb-1 text-ink">Imagen del producto</label>
          <ImageUpload onImageUploaded={(url) => setForm({ ...form, pictureUrl: url })} />
          {form.pictureUrl && (
            <div className="mt-3">
              <p className="text-sm text-muted mb-1">Vista previa actual:</p>
              <img
                src={form.pictureUrl}
                alt="preview"
                className="w-32 h-32 object-contain border border-neutral rounded-control p-1 bg-white"
              />
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 btn-primary disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="flex-1 border-2 border-neutral text-muted font-bold py-2.5 rounded-control hover:bg-neutral transition active:scale-[0.97]"
          >
            Cancelar
          </button>
        </div>
      </form>

      <ConfirmDialog
        isOpen={confirmDelete}
        title="¿Eliminar producto?"
        message="Esta acción no se puede deshacer."
        confirmLabel="Sí, eliminar"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}