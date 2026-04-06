import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { Star, ShoppingCart, CheckCircle2 } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    await addToCart({ ...product, quantity: 1 });
    setTimeout(() => setIsAdding(false), 500);
  };
  
  return (
    <Link to={`/product/${product.id}`} className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 group flex flex-col block">
      {/* Product Image */}
      <div className="relative pt-[100%] bg-white p-6">
        <img 
          src={product.image} 
          alt={product.title} 
          loading="lazy" 
          className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500" 
        />
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow border-t border-slate-50">
        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">
          {product.category}
        </span>
        <h3 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-2 flex-grow leading-snug">
          {product.title}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4 mt-1">
          <Star className="text-orange-500 fill-orange-500" size={14} />
          <span className="text-xs font-bold text-orange-600">{product.rating?.rate || 0}</span>
          <span className="text-xs text-slate-400">({product.rating?.count || 0})</span>
        </div>

        {/* Footer: Price & Add Button */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
          <button 
            className={`px-3 py-1.5 rounded-md font-semibold text-sm transition-all flex items-center gap-1.5 shadow-sm ${
              isAdding 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
            onClick={handleAddToCart} 
            disabled={isAdding}
          >
            {isAdding ? <CheckCircle2 size={16} /> : <ShoppingCart size={16} />}
            {isAdding ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </Link>
  );
}
