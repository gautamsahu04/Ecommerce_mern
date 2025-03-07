import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth.jsx";
import { Outlet  } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../../pages/LoadingPage.jsx";
export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [Auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("http://localhost:3000/api/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (Auth?.token) authCheck();
  }, [Auth?.token]);
  return ok ? < Outlet /> : <LoadingPage/>;
} 
