// src/app/admin/products/new/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';
import toast from 'react-hot-toast';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'merchandising',
    subcategory: 'tazas',
    description: '',
    pictureUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock || !form.description) {
      toast.error('Completa todos los campos obligatorios');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock)
        })
      });
      if (res.ok) {
        toast.success('Producto creado exitosamente');
        router.push('/admin/products');
      } else {
        toast.error('Error al crear producto');
      }
    } catch (error) {
      toast.error('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-secondary-light text-2xl mb-6">Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="card-glass p-6 max-w-2xl">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-secondary-light mb-1">Nombre *</label>
            <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-glass" required />
          </div>
          <div>
            <label className="block text-secondary-light mb-1">Precio *</label>
            <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="input-glass" required />
          </div>
          <div>
            <label className="block text-secondary-light mb-1">Stock *</label>
            <input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="input-glass" required />
          </div>
          <div>
            <label className="block text-secondary-light mb-1">Subcategoría *</label>
            <select value={form.subcategory} onChange={e => setForm({...form, subcategory: e.target.value})} className="input-glass">
              <option value="tazas">☕ Tazas</option>
              <option value="remeras">👕 Remeras</option>
              <option value="bolsos">👜 Bolsos</option>
              <option value="hidratarse">💧 Hidratación</option>
              <option value="zapatillas">👟 Zapatillas</option>
              <option value="equipamiento">🏋️ Equipamiento</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-secondary-light mb-1">Descripción *</label>
          <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={4} className="input-glass" required />
        </div>
        <div className="mb-4">
          <label className="block text-secondary-light mb-1">Imagen</label>
          <ImageUpload onImageUploaded={(url) => setForm({...form, pictureUrl: url})} />
          {form.pictureUrl && <img src={form.pictureUrl} alt="preview" className="w-24 h-24 object-contain mt-2" />}
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="btn-accent">{loading ? 'Creando...' : 'Crear producto'}</button>
          <button type="button" onClick={() => router.push('/admin/products')} className="btn-danger">Cancelar</button>
        </div>
      </form>
    </div>
  );
}