import React from "react";
import { RiShoppingBagFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom"; // FIXED: Use "react-router-dom" instead of "react-router"

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <div className="w-full md:w-1/5 mb-6 md:mb-0">
          <Link to="/" className="flex items-center">
              <RiShoppingBagFill  />
              <span className="font-bold ml-2">E-shop</span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              We have clothes that suit your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex space-x-4">
              <NavLink to="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-twitter"></i>
              </NavLink>
              <NavLink to="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-facebook-f"></i>
              </NavLink>
              <NavLink to="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-instagram"></i>
              </NavLink>
              <NavLink to="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-github"></i>
              </NavLink>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full md:w-1/5 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">COMPANY</h3>
            <ul className="text-sm text-gray-600">
              <li><NavLink to="/about" className="hover:text-gray-800">About</NavLink></li>
              <li><NavLink to="/features" className="hover:text-gray-800">Features</NavLink></li>
              <li><NavLink to="/works" className="hover:text-gray-800">Works</NavLink></li>
              <li><NavLink to="/career" className="hover:text-gray-800">Career</NavLink></li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="w-full md:w-1/5 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">HELP</h3>
            <ul className="text-sm text-gray-600">
              <li><NavLink to="#" className="hover:text-gray-800">Customer Support</NavLink></li>
              <li><NavLink to="#" className="hover:text-gray-800">Delivery Details</NavLink></li>
              <li><NavLink to="#" className="hover:text-gray-800">Terms & Conditions</NavLink></li>
              <li><NavLink to="#" className="hover:text-gray-800">Privacy Policy</NavLink></li>
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="w-full md:w-1/5 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">FAQ</h3>
            <ul className="text-sm text-gray-600">
              <li><NavLink to="#" className="hover:text-gray-800">Account</NavLink></li>
              <li><NavLink to="#" className="hover:text-gray-800">Manage Deliveries</NavLink></li>
              <li><NavLink to="#" className="hover:text-gray-800">Orders</NavLink></li>
              <li><NavLink to="#" className="hover:text-gray-800">Payments</NavLink></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="w-full md:w-1/5 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">RESOURCES</h3>
            <ul className="text-sm text-gray-600">
              <li><NavLink to="#" className="hover:text-gray-800">Free eBooks</NavLink></li>
              <li><NavLink to="/policy" className="hover:text-gray-800">Development Tutorial</NavLink></li>
              <li><NavLink to="/blog" className="hover:text-gray-800">How to - Blog</NavLink></li>
              <li><NavLink to="/youtube" className="hover:text-gray-800">YouTube Playlist</NavLink></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-300 pt-4 flex flex-wrap justify-between items-center">
          <p className="text-sm text-gray-600">E-Shop © 2000-2023, All Rights Reserved</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <img src="https://storage.googleapis.com/a1aa/image/Icueh7oVLzUmXLg_fQJB3srLoPgh7oouw5YIVnO-oz0.jpg" alt="Visa logo" width="40" height="25" />
            <img src="https://storage.googleapis.com/a1aa/image/gfn6LiPK6pGgPZ_rU7FizofwqB-l_MH9TUHdM_--phQ.jpg" alt="Mastercard logo" width="40" height="25" />
            <img src="https://storage.googleapis.com/a1aa/image/s7bfJXhYRX8RtWejg4gLU_vKycK5tFbNQXQ6x0KUAsM.jpg" alt="PayPal logo" width="40" height="25" />
            <img src="https://storage.googleapis.com/a1aa/image/oxt0ioN2ddWnWj-xVN5A9-hOpezjEbfFVYnEbCKUzYE.jpg" alt="Apple Pay logo" width="40" height="25" />
            <img src="https://storage.googleapis.com/a1aa/image/fekkIh93Bx3XCjA6dBlrgRiv5dYXcZDoHQZp0k2y88w.jpg" alt="Google Pay logo" width="40" height="25" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
