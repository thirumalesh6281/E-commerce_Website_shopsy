import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


import CartProvider from './context/CartContext';

import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Categories from './components/Categories';


import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import Electronics from './pages/Electronics';
import Mobiles from './pages/Mobiles';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Cart from './pages/Cart';

// ✅ Admin Components
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProduct from './pages/admin/AddProduct';
import ManageProducts from './pages/admin/ManageProducts';
import ManageUsers from './pages/admin/ManageUsers';
import ManageOrders from './pages/admin/ManageOrders';
import AdminViewProducts from './pages/admin/AdminViewProducts';
import EditProduct from './pages/admin/EditProduct';
import Men_prod from './components/Men_prod';
import Women_prod from './components/Women_prod';
import Details from './pages/Details';
import OrderSuccess from './pages/OrderSuccess';
import Checkout from './pages/Checkout';
import DeliveredOrders from './pages/admin/DeliveredOrders';
import Men_Banner from './components/Men_Banner';
import Women_banner from './components/women_banner';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';





const AppContent = () => {
  const location = useLocation();
  const shouldHideNav = location.pathname.startsWith('/admin');

  return (
    <>
      {!shouldHideNav && <NavBar />}

      <Routes>
  {/* ✅ Public Routes */}
  <Route
    path="/"
    element={
      <>
        <Banner />
        <Categories />
        <Men_Banner />
        <Men_prod />
        <Women_banner />
        <Women_prod />
        <Footer />
      </>
    }
  />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/men" element={<Men />} />
  <Route path="/women" element={<Women />} />
  <Route path="/kids" element={<Kids />} />
  <Route path="/electronics" element={<Electronics />} />
  <Route path="/mobiles" element={<Mobiles />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/details/:id" element={<Details />} />
  <Route path="/order-success" element={<OrderSuccess />} />
  <Route path="/checkout" element={<Checkout />} />




  {/* You can remove these preview routes if not needed */}
  {/* <Route path="/men-preview" element={<Men_prod />} /> */}
  {/* <Route path="/women-preview" element={<Women_prod />} /> */}

  {/* ✅ Admin Routes */}
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/admin/add-product" element={<AddProduct />} />
  <Route path="/admin/products" element={<ManageProducts />} />
  <Route path="/admin/manage-users" element={<ManageUsers />} />
  <Route path="/admin/orders" element={<ManageOrders />} />
  {/* <Route path="/admin/view-products" element={<AdminViewProducts />} /> */}
  <Route path="/admin/manage-products" element={<ManageProducts />} />
  <Route path="/admin/edit-product/:id" element={<EditProduct />} />
  <Route path="/admin/manage-orders" element={<ManageOrders />} />
  <Route path="/admin/delivered-orders" element={<DeliveredOrders />} />

</Routes>
    </>
  );
};



const App = () => {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
};

export default App;