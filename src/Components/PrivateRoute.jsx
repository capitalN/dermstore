import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AllContext } from "../Context/AllContextProvider";

export default function PrivateRoute({ children }) {
  let { state } = useContext(AllContext);

  if (state.auth) return children;
  return <Navigate to="/login" />;
}
