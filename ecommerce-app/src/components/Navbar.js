import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, User, LogOut } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-800">
          <Package className="text-blue-600" /> ShopWave
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative p-2 text-slate-600 hover:text-blue-600">
            <ShoppingCart />
            {totalItems > 0 && <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>}
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium hidden sm:block">Hi, {user.name}</span>
              <button onClick={() => { logout(); navigate('/'); }} className="text-slate-600 hover:text-rose-600"><LogOut size={20}/></button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold transition-colors"><User size={18}/> Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
