import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";


const LoadingPage = ({path="login"}) => {
  const [count, setcount] = useState(5);
  const Navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setcount((preValue) => --preValue);
    }, 1000);
    count === 0 &&
      Navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, Navigate,location, path]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>

        <p className="text-lg font-medium">Loading...</p>
        <h1> redirecting to you in {count} second </h1>
      </div>
    </div>
  );
};

export default LoadingPage;
