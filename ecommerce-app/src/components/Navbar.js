import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, User } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-[#4a2e8e] hover:opacity-90 transition-opacity">
          <Package strokeWidth={2.5} size={28} /> 
          <span className="font-serif tracking-tight">ShopVibe</span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700 hidden sm:block">Hi, {user.name}</span>
              <button 
                onClick={() => { logout(); navigate('/'); }} 
                className="text-sm font-semibold text-slate-600 hover:text-orange-500 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-orange-500 transition-colors">
              <User size={18} strokeWidth={2}/> Login
            </Link>
          )}
          
          <Link to="/cart" className="relative p-2 text-slate-700 hover:text-orange-500 transition-colors bg-white border border-slate-200 rounded-full shadow-sm hover:shadow">
            <ShoppingCart size={20} strokeWidth={2}/>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
}
