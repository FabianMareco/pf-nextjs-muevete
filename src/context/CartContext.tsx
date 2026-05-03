'use client';
import { createContext, useContext, useReducer, ReactNode } from 'react';

type CartItem = { id: string; name: string; price: number; quantity: number; pictureUrl?: string; subcategory?: string; selectedSize?: string; type?: string; category?: string };
type CartState = { items: CartItem[] };
type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: CartItem; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = { items: [] };
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, quantity } = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) return { ...state, items: state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i) };
      return { ...state, items: [...state.items, { ...item, quantity }] };
    }
    case 'REMOVE_ITEM': return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
    case 'CLEAR_CART': return { ...state, items: [] };
    default: return state;
  }
};

const CartContext = createContext<{
  cart: CartItem[]; totalItems: number; totalPrice: number;
  addItem: (item: CartItem, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = state.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const addItem = (item: CartItem, quantity: number) => dispatch({ type: 'ADD_ITEM', payload: { item, quantity } });
  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  return (
    <CartContext.Provider value={{ cart: state.items, totalItems, totalPrice, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => { const ctx = useContext(CartContext); if (!ctx) throw new Error('useCart must be used within CartProvider'); return ctx; };