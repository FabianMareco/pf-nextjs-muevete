import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import ConfirmDialog from '@/components/ConfirmDialog';
 
export default function ProductModal({ product, onClose }) {
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
    ? (product.colors.find(c => c.name === selectedColor)?.pictureUrl ?? product.pictureUrl)
    : product.pictureUrl;
 
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
 
  const handleAddToCart = () => {
    if ((isClothing || isShoes) && !selectedSize) {
      alert('Seleccioná un talle');
      return;
    }
    if (isClothing && product.colors?.length > 0 && !selectedColor) {
      alert('Seleccioná un color');
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
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-end">
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
 
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-64 object-contain mb-4 transition-all duration-300"
            />
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-bold text-primary mb-4">${product.price.toLocaleString()}</p>
 
            {/* Talles */}
            {sizes.length > 0 && (
              <div className="mb-4">
                <label className="block font-bold mb-2">Talle:</label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 border rounded ${selectedSize === size ? 'bg-primary text-white' : 'bg-gray-100'}`}
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
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`px-3 py-1 border-2 rounded transition font-semibold ${
                        selectedColor === color.name
                          ? 'border-red-500 bg-red-50 text-red-600'
                          : 'border-gray-300 bg-gray-100 text-gray-600 hover:border-gray-500'
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
                <button onClick={decrement} className="bg-gray-200 px-3 py-1 rounded-full">-</button>
                <span className="text-xl font-bold">{quantity}</span>
                <button onClick={increment} className="bg-gray-200 px-3 py-1 rounded-full">+</button>
              </div>
            </div>
 
            <button onClick={handleAddToCart} className="w-full bg-accent text-primary-dark py-2 rounded-lg font-bold">
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
 