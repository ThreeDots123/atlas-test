import React, { useEffect } from "react";
import "./app.scss";
import Home from "./pages/home/Home.jsx";

//This is where the routing will be
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BrandDetail from "./pages/brands/brandDetail";
import Products from "./pages/product/products";
import Brands from "./pages/brands/brands";
import SignUp from "./pages/user/SignUp";
import Signin from "./pages/user/SignIn";
import UpdatePassword from "./pages/user/updatePassword";
import ForgotPassword from "./pages/user/forgotPassword";
import NewPassword from "./pages/user/newPassword";
import Cart from "./pages/cart/cart";
import ProductDetail from "./pages/product/ProductDetail";
import ProtectedRoute from "./routes/protectedRoute";
import Profile from "./pages/user/profile";
import UpdateProfile from "./pages/user/updateProfile";
import Shipping from "./pages/cart/shipping";
import ConfirmOrder from "./pages/cart/ConfirmOrder";
import { loadUser } from "./redux/actions/userActions";
import ListOrders from "./pages/orders/ListOrders";
import store from "./redux/store";
import Payment from "./pages/cart/Payment";
import "./style.css";
import "./App.css";
import OrderDetails from "./pages/orders/OrderDetails";
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brand/:id" element={<BrandDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<NewPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/me" element={<Profile />} exact />
          <Route path="/update-profile" element={<UpdateProfile />} exact />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/confirm" element={<ConfirmOrder />} />

          <Route path="/order/:id" element={<OrderDetails />} />
          {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/books" element={<BookList />} />
            <Route path="/admin/newBook" element={<NewBook />} />
            <Route path="/admin/book/:id" element={<UpdateBook />} />
            <Route path="/admin/orders" element={<OrdersList />} />
            <Route path="/admin/order/:id" element={<ProcessOrder />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/sellers" element={<SellersList />} /> */}
        </Route>
        <Route path="/orders/me" element={<ListOrders />} />
        <Route path="/payment/verify" element={<Payment />} />
        {/* <Route path="/admin/user/:id" element={<UpdateUser />} />
          <Route path="/me/seller" element={<Seller />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
