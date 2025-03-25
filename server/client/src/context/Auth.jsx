import React from "react";
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
const AuthContext = createContext();

const Authprovider = ({ children }) => {
  const [Auth, setAuth] = useState({
    user: null,
    token: "",
  });
  axios.defaults.headers.common["Authorization"]=Auth?.token


  useEffect(() => {
    const data = localStorage.getItem("Auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...Auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[Auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
//custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, Authprovider };
