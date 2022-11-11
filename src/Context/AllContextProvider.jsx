import React, { Children } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AllContext = createContext();

export default function AllContextProvider({ children }) {
  let [state, setState] = useState({ auth: false, token: "" });

  let logIn = (token) => {
    setState({ ...state, auth: true, token });
  };

  let logOut = () => {
    setState({ ...state, auth: false, token: "" });
  };

  let setParams = ({ categeory, subcategeory }) => {
    setState({ ...state, categeory, subcategeory });
  };

 

  return (
    <AllContext.Provider value={{ state, logIn, logOut, setParams }}>
      {children}{" "}
    </AllContext.Provider>
  );
}
