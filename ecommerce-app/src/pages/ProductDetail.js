import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { CartContext } from '../contexts/CartContext';
import { Star, ArrowLeft, Plus } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductById(id).then(data => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading details...</div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 font-medium">
        <ArrowLeft size={20} /> Back
      </button>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 p-12 flex justify-center items-center bg-white">
          <img src={product.image} alt={product.title} className="max-w-full max-h-96 object-contain" />
        </div>
        <div className="md:w-1/2 p-8 md:p-12 bg-slate-50 border-l border-slate-100 flex flex-col justify-center">
          <p className="text-sm font-bold text-blue-600 uppercase mb-2">{product.category}</p>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{product.title}</h1>
          <div className="flex items-center gap-2 mb-6">
            <Star className="text-amber-400 fill-amber-400" />
            <span className="font-bold">{product.rating.rate}</span>
            <span className="text-slate-500">({product.rating.count} reviews)</span>
          </div>
          <p className="text-slate-600 mb-8 leading-relaxed">{product.description}</p>
          <div className="mt-auto">
            <p className="text-4xl font-extrabold text-slate-900 mb-6">${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart({ ...product, quantity: 1 })} className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg">
              <Plus size={20} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
