import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import SignUp from "./SignUp";
import Cart from "./Cart";
import SignIn from "./SignIn";
import Profile from "./Profile";
import PrivateRoute from "../Components/PrivateRoute";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
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
    </Routes>
  );
}
