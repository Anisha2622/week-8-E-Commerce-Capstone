import React, { useContext } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartContext } from '../contexts/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <li className="p-6 flex flex-col sm:flex-row gap-6 items-center">
      <div className="w-24 h-24 flex-shrink-0 bg-white border border-slate-100 rounded-xl p-2">
        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
      </div>
      <div className="flex-1 flex flex-col w-full">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-semibold text-slate-800 line-clamp-2">{item.title}</h3>
          <p className="font-bold text-lg text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-slate-500 hover:text-blue-600"><Minus size={16} /></button>
            <span className="w-10 text-center font-semibold text-sm">{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-slate-500 hover:text-blue-600"><Plus size={16} /></button>
          </div>
          <button onClick={() => removeFromCart(item.id)} className="flex items-center gap-1 text-sm font-medium text-rose-500 hover:text-rose-600 px-3 py-2 rounded-lg hover:bg-rose-50"><Trash2 size={16} /> Remove</button>
        </div>
      </div>
    </li>
  );
}
