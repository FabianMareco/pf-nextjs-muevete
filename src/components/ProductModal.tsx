import { useEffect, useState } from 'react';
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
 
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const chip = (on: boolean) =>
    `min-w-11 px-3 py-2 text-sm rounded-control border font-semibold transition-colors active:scale-[0.96] ${on ? 'bg-ink text-paper border-ink' : 'bg-white border-ink/15 text-ink hover:border-ink/40'}`;

  return (
    <>
      <div className="modal-backdrop fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4" onClick={onClose}>
        <div
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
          onClick={(e) => e.stopPropagation()}
          className="modal-panel relative w-full sm:max-w-3xl max-h-[92dvh] overflow-y-auto bg-paper rounded-t-card sm:rounded-card grid md:grid-cols-2"
        >
          <button onClick={onClose} aria-label="Cerrar" className="absolute right-3 top-3 z-10 grid place-items-center w-10 h-10 rounded-full bg-white/90 text-ink hover:bg-white transition active:scale-90">
            <i className="fas fa-xmark text-lg" aria-hidden="true" />
          </button>

          <div className="bg-white aspect-square md:aspect-auto md:min-h-full flex items-center justify-center p-8">
            <img src={currentImage} alt={product.name} className="max-h-72 md:max-h-[420px] w-full object-contain" />
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <h2 className="font-display font-extrabold text-3xl tracking-[-0.03em] capitalize">{String(product.name).toLowerCase()}</h2>
            <p className="mt-2 text-2xl font-bold text-ink">${product.price.toLocaleString('es-AR')}</p>
            {product.description && <p className="mt-3 text-muted leading-relaxed">{product.description}</p>}

            {sizes.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-bold mb-2">Talle</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size} className={chip(selectedSize === size)}>{size}</button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-bold mb-2">Color</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color: any) => (
                    <button key={color.name} onClick={() => setSelectedColor(color.name)} aria-pressed={selectedColor === color.name} className={chip(selectedColor === color.name)}>{color.name}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <p className="text-sm font-bold mb-2">Cantidad</p>
              <div className="inline-flex items-center rounded-control border border-ink/15 bg-white">
                <button onClick={decrement} aria-label="Restar" className="w-11 h-11 grid place-items-center text-ink hover:bg-ink/5 transition active:scale-90"><i className="fas fa-minus text-xs" aria-hidden="true" /></button>
                <span className="w-10 text-center font-bold tabular-nums">{quantity}</span>
                <button onClick={increment} aria-label="Sumar" className="w-11 h-11 grid place-items-center text-ink hover:bg-ink/5 transition active:scale-90"><i className="fas fa-plus text-xs" aria-hidden="true" /></button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="btn-accent btn-lg w-full mt-8 md:mt-auto">
              <i className="fas fa-cart-shopping" aria-hidden="true" />
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
 