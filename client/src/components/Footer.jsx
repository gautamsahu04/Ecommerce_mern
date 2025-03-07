import React from "react";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10 ">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
      {/* Footer Links */}
      <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-lg">
        <li>
          <NavLink  to="/about" className="hover:text-blue-400 transition">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="hover:text-blue-400 transition">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/policy" className="hover:text-blue-400 transition">Policy</NavLink>
        </li>
      </ul>
      
      {/* Copyright */}
      <p className="text-sm mt-4 md:mt-0">&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
    </div>
  </footer>
    
  );
};

export default Footer;
