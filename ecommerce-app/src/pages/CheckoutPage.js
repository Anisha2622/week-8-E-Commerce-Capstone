import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle2, ArrowLeft } from 'lucide-react';
import CheckoutForm from '../components/Checkout/CheckoutForm';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl max-w-lg text-center">
          <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Order Confirmed!</h2>
          <p className="text-slate-500 mb-8 text-lg">Thank you for your purchase. We've sent a confirmation email with your order details.</p>
          <button onClick={() => navigate('/')} className="bg-slate-900 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-slate-800 transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 font-medium">
        <ArrowLeft size={20} /> Back to Cart
      </button>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
            <CreditCard className="text-blue-600" /> Secure Checkout
          </h1>
        </div>
        <CheckoutForm onSuccess={() => setIsSuccess(true)} />
      </div>
    </div>
  );
}
