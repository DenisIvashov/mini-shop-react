import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import './App.css'
import CatalogPage from '../../mini-shop-react/src/pages/CatalogPage.jsx';
import ProductPage from '../../mini-shop-react/src/pages/ProductPage.jsx';
import CartPage from '../../mini-shop-react/src/pages/CartPage.jsx';
import SuccessPage from '../../mini-shop-react/src/pages/SuccessPage.jsx';
import NotFoundPage from '../../mini-shop-react/src/pages/NotFoundPage.jsx';
import { CartContext } from './context/CartContext.jsx';
import { useEffect } from 'react';

function Root() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : []
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)); 
   }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<CatalogPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="success" element={<SuccessPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </CartContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Root />
    </BrowserRouter>
  </StrictMode>,
)