import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <div className="text-center py-20 text-slate-500 text-lg">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
