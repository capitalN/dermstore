import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  if (true) {
    return children;
  }
  return <Navigate to="/login" />;
}
