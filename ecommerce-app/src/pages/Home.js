import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductList from '../components/ProductList';

export default function Home() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');

  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = useMemo(() => {
    // 1. Filter
    let result = products.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || p.category === category;
      return matchSearch && matchCategory;
    });

    // 2. Sort
    if (sort === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sort === 'rating') result.sort((a, b) => b.rating.rate - a.rating.rate);

    return result;
  }, [products, search, category, sort]);

  if (error) return <div className="text-center py-10 text-rose-500 font-bold">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      
      {/* Minimalist Hero Section */}
      <div className="text-center py-12 mb-4">
        <h1 className="text-5xl md:text-6xl font-serif font-extrabold text-slate-900 mb-4 tracking-tight">
          Discover Your Style
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Curated products for every occasion. Shop the latest trends with confidence.
        </p>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-slate-400" size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors shadow-sm"
          />
        </div>
        
        {/* Filters */}
        <div className="flex w-full md:w-auto gap-4">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-auto bg-white border border-slate-200 text-slate-700 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-sm cursor-pointer"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-auto bg-white border border-slate-200 text-slate-700 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-sm cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 font-semibold text-lg">Loading Catalog...</div>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
}
