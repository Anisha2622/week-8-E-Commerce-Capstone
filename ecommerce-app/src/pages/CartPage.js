import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import CartItem from '../components/CartItem'; // Updated Import
import { ShoppingCart, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { cart, totalPrice } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingCart size={64} className="mx-auto text-slate-300 mb-6" />
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg mt-4">Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Shopping Cart</h1>
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <ul className="divide-y divide-slate-100">
              {cart.map(item => <CartItem key={item.id} item={item} />)}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 text-slate-600">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-medium text-slate-900">${totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="font-medium text-emerald-600">Free</span></div>
              <div className="flex justify-between"><span>Tax</span><span className="font-medium text-slate-900">${(totalPrice * 0.08).toFixed(2)}</span></div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-2xl font-extrabold text-blue-600">${(totalPrice * 1.08).toFixed(2)}</span>
              </div>
            </div>
            <button onClick={() => navigate(user ? '/checkout' : '/login?redirect=/checkout')} className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-xl flex justify-center items-center gap-2">
              Checkout <ArrowLeft size={20} className="rotate-180" />
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500"><ShieldCheck size={16} /> Secure Checkout Guarantee</div>
          </div>
        </div>
      </div>
    </div>
  );
}
