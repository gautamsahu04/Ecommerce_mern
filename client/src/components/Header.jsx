import React, { useState } from "react";
import { NavLink, Link, Navigate } from "react-router-dom";
import { RiShoppingBagFill } from "react-icons/ri";
import { useAuth } from "../context/Auth";
import toast from "react-hot-toast";
import SearchInput from "./Form/SearchInput";

const Header = () => {
  const [Auth, setAuth] = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...Auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("Auth");
    toast.success("Logged out successfully!");
  };

  return (
    <>
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl">
            <Link to="/" className="flex items-center">
              <RiShoppingBagFill />
              <span className="font-bold ml-2">E-shop</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6 text-lg font-medium items-center">
              <SearchInput/>
            <li>
              <NavLink to="/" className="hover:text-blue-600 transition">
                HOME
              </NavLink>
            </li>

            {!Auth.user ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="hover:text-blue-600 transition"
                  >
                    LOGIN
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="hover:text-blue-600 transition"
                  >
                    REGISTER
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="hover:text-blue-600 transition"
                >
                  PROFILE ▼
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 bg-white shadow-md rounded w-40 p-2">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          Auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        to="/"
                      >
                        LOGOUT
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            )}

            <li>
              <NavLink to="/cart" className="hover:text-blue-600 transition">
                CART(0)
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
