import { useState } from 'react';
import toast from 'react-hot-toast';
import { useCart } from '@/hooks/useCart';
import ConfirmDialog from '@/components/ConfirmDialog';
 
export default function ProductModal({ product, onClose }: { product: any; onClose: () => void }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [addedDialog, setAddedDialog] = useState(false);
 
  const isClothing = product.subcategory === 'remeras';
  const isShoes = product.subcategory === 'zapatillas';
  const sizes = isClothing
    ? ['S', 'M', 'L', 'XL']
    : isShoes
    ? ['34','35','36','37','38','39','40','41','42','43']
    : [];
 
  const currentImage = product.colors && product.colors.length > 0
    ? (product.colors.find((c: any) => c.name === selectedColor)?.pictureUrl ?? product.pictureUrl)
    : product.pictureUrl;
 
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
 
  const handleAddToCart = () => {
    if ((isClothing || isShoes) && !selectedSize) {
      toast.error('Seleccioná un talle');
      return;
    }
    if (isClothing && product.colors?.length > 0 && !selectedColor) {
      toast.error('Seleccioná un color');
      return;
    }
    addItem({
      ...product,
      pictureUrl: currentImage,
      selectedSize,
      selectedColor,
      quantity,
      type: 'merchandising',
    }, quantity);
    setAddedDialog(true);
  };
 
  return (
    <>
      <div className="fixed inset-0 bg-ink/70 flex items-center justify-center z-50 p-4">
        <div className="card max-w-lg w-full max-h-[90vh] overflow-y-auto" style={{ transformOrigin: 'center' }}>
          <div className="p-6">
            <div className="flex justify-end">
              <button onClick={onClose} aria-label="Cerrar" className="text-muted hover:text-ink text-xl transition active:scale-90"><i className="fas fa-xmark" aria-hidden="true" /></button>
            </div>
 
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-64 object-contain mb-4 transition-all duration-300"
            />
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-muted mb-4">{product.description}</p>
            <p className="text-xl font-bold text-ink mb-4">${product.price.toLocaleString()}</p>
 
            {/* Talles */}
            {sizes.length > 0 && (
              <div className="mb-4">
                <label className="block font-bold mb-2">Talle:</label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 border rounded-control transition active:scale-[0.96] ${selectedSize === size ? 'bg-ink text-paper border-ink' : 'bg-neutral border-neutral text-ink hover:border-ink/30'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
 
            {/* Colores dinámicos */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <label className="block font-bold mb-2">Color:</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color: any) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`px-3 py-1 border-2 rounded-control transition font-semibold active:scale-[0.96] ${
                        selectedColor === color.name
                          ? 'border-accent bg-accent/10 text-accent-deep'
                          : 'border-neutral bg-neutral text-muted hover:border-ink/30'
                      }`}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
 
            {/* Cantidad */}
            <div className="mb-4">
              <label className="block font-bold mb-2">Cantidad:</label>
              <div className="flex items-center gap-3">
                <button onClick={decrement} aria-label="Restar" className="bg-neutral hover:bg-ink/10 w-9 h-9 rounded-full font-bold text-ink transition active:scale-90 flex items-center justify-center">−</button>
                <span className="text-xl font-bold">{quantity}</span>
                <button onClick={increment} aria-label="Sumar" className="bg-neutral hover:bg-ink/10 w-9 h-9 rounded-full font-bold text-ink transition active:scale-90 flex items-center justify-center">+</button>
              </div>
            </div>
 
            <button onClick={handleAddToCart} className="w-full btn-accent py-2.5">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
 
      {/* Dialog: producto agregado */}
      <ConfirmDialog
        isOpen={addedDialog}
        title="¡Agregado al carrito!"
        message={`${product.name}${selectedColor ? ` (${selectedColor})` : ''}${selectedSize ? ` - Talle ${selectedSize}` : ''} x${quantity} fue agregado a tu carrito.`}
        confirmLabel="Aceptar"
        variant="info"
        onConfirm={() => { setAddedDialog(false); onClose(); }}
      />
    </>
  );
}
 