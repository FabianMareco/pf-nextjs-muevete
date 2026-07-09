'use client';
import { useRouter } from 'next/navigation';
 
interface OrderItem {
  title: string;
  quantity: number;
  price: number;
  selectedSize?: string;
  type?: string;
}
 
interface OrderTicketProps {
  isOpen: boolean;
  orderId: string;
  buyer: { name: string; email: string; phone: string };
  items: OrderItem[];
  total: number;
  date: Date;
  onClose: () => void;
}
 
export default function OrderTicket({ isOpen, orderId, buyer, items, total, date, onClose }: OrderTicketProps) {
  const router = useRouter();
 
  if (!isOpen) return null;
 
  const formattedDate = new Date(date).toLocaleDateString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
 
  const handleClose = () => {
    onClose();
    router.push('/');
  };
 
  return (
    <div className="fixed inset-0 bg-ink/70 flex items-center justify-center z-[100] p-4">
      <div className="card max-w-md w-full max-h-[90vh] overflow-y-auto" style={{ transformOrigin: 'center' }}>
 
        {/* Header del ticket */}
        <div className="bg-success rounded-t-card p-6 text-center text-white">
          <i className="fas fa-circle-check text-4xl mb-2" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-white">¡Compra exitosa!</h2>
          <p className="text-white/80 text-sm mt-1">Gracias por tu compra</p>
        </div>
 
        <div className="p-6">
          {/* Número de orden */}
          <div className="bg-neutral rounded-control p-4 mb-4 text-center border border-dashed border-muted/40">
            <p className="text-xs text-muted uppercase tracking-widest mb-1">Número de orden</p>
            <p className="font-mono font-bold text-ink text-sm break-all">{orderId}</p>
            <p className="text-xs text-muted mt-1">{formattedDate}</p>
          </div>
 
          {/* Datos del comprador */}
          <div className="mb-4">
            <h3 className="font-bold text-ink mb-2 text-sm uppercase tracking-wide text-left">Datos del comprador</h3>
            <div className="text-sm text-muted space-y-1.5">
              <p className="flex items-center gap-2"><i className="fas fa-user text-ink/40 w-4" aria-hidden="true" />{buyer.name}</p>
              <p className="flex items-center gap-2"><i className="fas fa-envelope text-ink/40 w-4" aria-hidden="true" />{buyer.email}</p>
              <p className="flex items-center gap-2"><i className="fas fa-phone text-ink/40 w-4" aria-hidden="true" />{buyer.phone}</p>
            </div>
          </div>
 
          {/* Separador */}
          <div className="border-t border-dashed border-neutral my-4" />
 
          {/* Items */}
          <div className="mb-4">
            <h3 className="font-bold text-ink mb-2 text-sm uppercase tracking-wide text-left">Productos</h3>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-sm">
                  <div className="text-ink flex-1 pr-2">
                    <span>{item.title}</span>
                    {item.selectedSize && (
                      <span className="text-muted text-xs block">Talle: {item.selectedSize}</span>
                    )}
                    <span className="text-muted text-xs block">x{item.quantity}</span>
                  </div>
                  <span className="font-semibold text-ink whitespace-nowrap">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
 
          {/* Separador */}
          <div className="border-t border-dashed border-neutral my-4" />
 
          {/* Total */}
          <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-ink text-lg">Total</span>
            <span className="font-bold text-success text-xl">${total.toLocaleString()}</span>
          </div>
 
          {/* Nota Mercado Pago */}
          <div className="bg-neutral border border-neutral rounded-control p-3 mb-6 text-center">
            <p className="text-ink/70 text-xs">
              En modo producción serás redirigido a <strong>Mercado Pago</strong> para completar el pago
            </p>
          </div>
 
          {/* Botón cerrar */}
          <button
            onClick={handleClose}
            className="w-full bg-success hover:bg-success-dark text-white font-bold py-3 rounded-control transition active:scale-[0.98]"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}