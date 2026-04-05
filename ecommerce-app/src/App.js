import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar'; // Updated Import

// Performance Optimization: Lazy Loading routes
const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const Login = lazy(() => import('./pages/Login'));

const ProtectedRoute = ({ children }) => {
  return (
    <AuthContext.Consumer>
      {({ user }) => user ? children : <Navigate to="/login?redirect=/checkout" replace />}
    </AuthContext.Consumer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh] text-xl font-bold text-slate-500">Loading App...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  } />
                </Routes>
              </Suspense>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
