'use client';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ConfirmDialog from '@/components/ConfirmDialog';
import OrderTicket from '@/components/OrderTicket';
 
export default function CartPage() {
  const { cart, removeItem, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const router = useRouter();
 
  const [buyer, setBuyer] = useState({
    name: '',
    phone: '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
 
  // Dialogs
  const [confirmClear, setConfirmClear] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<{ id: string; name: string } | null>(null);
 
  // Ticket
  const [orderTicket, setOrderTicket] = useState<{
    orderId: string;
    buyer: { name: string; email: string; phone: string };
    items: any[];
    total: number;
    date: Date;
  } | null>(null);
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyer.name || !buyer.phone || !buyer.email) {
      toast.error('Completa todos los datos del comprador');
      return;
    }
    if (!buyer.email.includes('@')) {
      toast.error('Email inválido');
      return;
    }
 
    setLoading(true);
 
    const orderItems = cart.map(item => ({
      id: item.id,
      title: item.name,
      quantity: item.quantity,
      price: item.price,
      type: item.type || 'merchandising',
      subcategory: item.subcategory,
      selectedSize: item.selectedSize,
    }));
 
    const order = {
      buyer,
      items: orderItems,
      total: totalPrice,
      date: new Date(),
      userId: user?.uid || null,
    };
 
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      const data = await res.json();
      if (res.ok) {
        setOrderTicket({
          orderId: data.orderId,
          buyer,
          items: orderItems,
          total: totalPrice,
          date: new Date(),
        });
        clearCart();
      } else {
        toast.error(data.error || 'Error al procesar la compra');
      }
    } catch (error) {
      toast.error('Error de conexión');
    } finally {
      setLoading(false);
    }
  };
 
  if (cart.length === 0 && !orderTicket) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-secondary-light mb-4">🛒 Carrito vacío</h1>
        <Link href="/merchandising" className="btn-primary inline-block">
          Ir a comprar
        </Link>
      </div>
    );
  }
 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-secondary-light mb-8">🛒 Carrito de compras</h1>
 
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tabla de productos */}
        <div className="lg:w-2/3 card-glass p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-secondary-light">
              <thead className="border-b border-white/20">
                <tr className="text-left">
                  <th className="p-2">Producto</th>
                  <th className="p-2 text-center">Tipo</th>
                  <th className="p-2 text-center">Cantidad</th>
                  <th className="p-2 text-right">Precio</th>
                  <th className="p-2 text-right">Subtotal</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b border-white/10">
                    <td className="p-2">
                      {item.name}
                      {item.selectedSize && (
                        <span className="text-sm text-secondary block">Talle: {item.selectedSize}</span>
                      )}
                    </td>
                    <td className="p-2 text-center">
                      {item.type === 'pack' ? (
                        <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs">
                          📦 {item.category === 'clases' ? 'Clase' : 'Asesoría'}
                        </span>
                      ) : (
                        <span className="bg-primary-light/20 text-primary-light px-2 py-1 rounded text-xs">🛍️ Merch</span>
                      )}
                    </td>
                    <td className="p-2 text-center">{item.quantity}</td>
                    <td className="p-2 text-right">${item.price.toLocaleString()}</td>
                    <td className="p-2 text-right font-semibold">
                      ${(item.price * item.quantity).toLocaleString()}
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => setItemToRemove({ id: item.id, name: item.name })}
                        className="text-danger hover:text-danger-dark"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-white/20">
                <tr>
                  <td colSpan={4} className="p-2 text-right font-bold">Total:</td>
                  <td className="p-2 text-right font-bold text-xl text-accent">${totalPrice.toLocaleString()}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <button onClick={() => setConfirmClear(true)} className="btn-danger mt-4">
            Vaciar carrito
          </button>
        </div>
 
        {/* Formulario */}
        <div className="lg:w-1/3 card-glass p-6">
          <h2 className="text-xl font-bold text-secondary-light mb-4">📋 Datos de facturación</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block font-bold text-secondary-light mb-1">Nombre completo *</label>
              <input
                type="text"
                value={buyer.name}
                onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
                className="input-glass"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block font-bold text-secondary-light mb-1">Teléfono *</label>
              <input
                type="tel"
                value={buyer.phone}
                onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
                className="input-glass"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold text-secondary-light mb-1">Email *</label>
              <input
                type="email"
                value={buyer.email}
                onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
                className="input-glass"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-accent w-full"
            >
              {loading ? 'Procesando...' : `💰 Finalizar compra ($${totalPrice.toLocaleString()})`}
            </button>
          </form>
        </div>
      </div>
 
      {/* Dialog: vaciar carrito */}
      <ConfirmDialog
        isOpen={confirmClear}
        title="¿Vaciar carrito?"
        message="Se eliminarán todos los productos. Esta acción no se puede deshacer."
        confirmLabel="Sí, vaciar"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={() => { clearCart(); setConfirmClear(false); toast.success('Carrito vaciado'); }}
        onCancel={() => setConfirmClear(false)}
      />
 
      {/* Dialog: eliminar item */}
      <ConfirmDialog
        isOpen={!!itemToRemove}
        title="¿Eliminar producto?"
        message={`¿Querés quitar "${itemToRemove?.name}" del carrito?`}
        confirmLabel="Sí, eliminar"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={() => { if (itemToRemove) removeItem(itemToRemove.id); setItemToRemove(null); }}
        onCancel={() => setItemToRemove(null)}
      />
 
      {/* Ticket de orden */}
      {orderTicket && (
        <OrderTicket
          isOpen={true}
          orderId={orderTicket.orderId}
          buyer={orderTicket.buyer}
          items={orderTicket.items}
          total={orderTicket.total}
          date={orderTicket.date}
          onClose={() => setOrderTicket(null)}
        />
      )}
    </div>
  );
}