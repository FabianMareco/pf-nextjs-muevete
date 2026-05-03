'use client';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export default function CartWidget() {
  const { totalItems } = useCart();
  
  if (totalItems === 0) return null;
  
  return (
    <Link href="/cart" className="relative">
      <span className="text-2xl text-secondary-light">🛒</span>
      <span className="absolute -top-2 -right-2 bg-accent text-primary-dark rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
        {totalItems}
      </span>
    </Link>
  );
}