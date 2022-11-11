import React from "react";
import { useContext } from "react";
import { AllContext } from "../Context/AllContextProvider";
import {Navigate} from 'react-router-dom'

export default function Cart() {
  let { state } = useContext(AllContext);

  if (!state.auth) return <Navigate to="/" />;
  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
}
