import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductList from '../components/ProductList'; // Updated Import

export default function Home() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || p.category === category;
      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  if (error) return <div className="text-center py-10 text-rose-500 font-bold">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 mb-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Discover Premium Products.</h1>
          <p className="text-lg text-slate-300 mb-8">Shop the latest trends in electronics, jewelry, and fashion.</p>
          <div className="flex bg-white rounded-xl p-2 shadow-lg max-w-md focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <div className="flex items-center pl-3 pr-2"><Search className="text-slate-400" size={20} /></div>
            <input type="text" placeholder="Search for products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-transparent text-slate-900 px-2 py-2 focus:outline-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${category === cat ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500 font-semibold text-lg">Loading Catalog...</div>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
}
