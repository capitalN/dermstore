import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "../pages/User";
import Cart from "../pages/Cart";
import Dispatch from "../pages/Dispatch";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import Products from "../pages/Products";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route
          path="/user"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/dispatch"
          element={
            <PrivateRoute>
              <Dispatch />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
