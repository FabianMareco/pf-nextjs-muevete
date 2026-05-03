// src/components/ClientProducts.tsx
'use client';
import { useEffect, useState } from 'react';
import ProductList from './ProductList';

export default function ClientProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Cargando productos...</div>;
  return <ProductList products={products} />;
}