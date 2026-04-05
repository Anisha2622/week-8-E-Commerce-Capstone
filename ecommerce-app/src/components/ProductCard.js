import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { Star, Plus, CheckCircle2 } from 'lucide-react';

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
    <Link to={`/product/${product.id}`} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col block">
      <div className="relative pt-[100%] bg-white p-6">
        <img src={product.image} alt={product.title} loading="lazy" className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-5 flex flex-col flex-grow border-t border-slate-100 bg-slate-50/50">
        <span className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-2">{product.category}</span>
        <h3 className="font-semibold text-slate-800 line-clamp-2 mb-2 flex-grow leading-tight">{product.title}</h3>
        <div className="flex items-center gap-1 mb-4">
          <Star className="text-amber-400 fill-amber-400" size={16} />
          <span className="text-sm font-medium text-slate-700">{product.rating.rate}</span>
          <span className="text-sm text-slate-400">({product.rating.count})</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
          <button 
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${isAdding ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-blue-600'} shadow-lg`}
            onClick={handleAddToCart} disabled={isAdding}
          >
            {isAdding ? <CheckCircle2 size={16} /> : <Plus size={16} />}
            {isAdding ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </Link>
  );
}
