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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
 
        {/* Header del ticket */}
        <div className="bg-green-600 rounded-t-2xl p-6 text-center text-white">
          <div className="text-5xl mb-2">🎉</div>
          <h2 className="text-2xl font-bold">¡Compra exitosa!</h2>
          <p className="text-green-100 text-sm mt-1">Gracias por tu compra</p>
        </div>
 
        <div className="p-6">
          {/* Número de orden */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4 text-center border border-dashed border-gray-300">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Número de orden</p>
            <p className="font-mono font-bold text-gray-800 text-sm break-all">{orderId}</p>
            <p className="text-xs text-gray-400 mt-1">{formattedDate}</p>
          </div>
 
          {/* Datos del comprador */}
          <div className="mb-4">
            <h3 className="font-bold text-gray-700 mb-2 text-sm uppercase tracking-wide">Datos del comprador</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>👤 {buyer.name}</p>
              <p>📧 {buyer.email}</p>
              <p>📱 {buyer.phone}</p>
            </div>
          </div>
 
          {/* Separador */}
          <div className="border-t border-dashed border-gray-300 my-4" />
 
          {/* Items */}
          <div className="mb-4">
            <h3 className="font-bold text-gray-700 mb-2 text-sm uppercase tracking-wide">Productos</h3>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-sm">
                  <div className="text-gray-700 flex-1 pr-2">
                    <span>{item.title}</span>
                    {item.selectedSize && (
                      <span className="text-gray-400 text-xs block">Talle: {item.selectedSize}</span>
                    )}
                    <span className="text-gray-400 text-xs block">x{item.quantity}</span>
                  </div>
                  <span className="font-semibold text-gray-800 whitespace-nowrap">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
 
          {/* Separador */}
          <div className="border-t border-dashed border-gray-300 my-4" />
 
          {/* Total */}
          <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-gray-800 text-lg">Total</span>
            <span className="font-bold text-green-600 text-xl">${total.toLocaleString()}</span>
          </div>
 
          {/* Nota Mercado Pago */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6 text-center">
            <p className="text-blue-700 text-xs">
              🔜 En modo producción serás redirigido a <strong>Mercado Pago</strong> para completar el pago
            </p>
          </div>
 
          {/* Botón cerrar */}
          <button
            onClick={handleClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}