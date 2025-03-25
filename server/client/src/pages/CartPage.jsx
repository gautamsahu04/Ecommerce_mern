import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/Auth.jsx";
import { useCart } from "../context/Card.jsx";
import { TbCurrencyRupee } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setclientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // get client token
  const getToken = async (req, res) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/product/braintree/token"
      );
      setclientToken(data?.clientToken);
      // console.log(clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //  payment  function
  const handlePayment = async () => {
    if (!instance) {
      console.error("Braintree instance is not initialized.");
      toast.error("Payment system is not ready. Try again.");
      return;
    }

    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      console.log("Payment Nonce:", nonce);
      const { data } = await axios.post(
        "http://localhost:3000/api/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/");
      toast.success("order paymnet successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // total price
  const totalPrice = () => {
    try {
      let subtotal = 0;
      cart?.map((item) => {
        subtotal = subtotal + item.price;
      });

      return subtotal.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    // Remove item from cart
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <div className="bg-white text-black p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 ">
            {cart.length
              ? ` You have ${cart.length} Item in your Cart ${
                  auth?.token ? " " : "Please login to checkout"
                }`
              : "Your Cart is Empty"}
          </h1>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cart Items */}
            <div className="flex-1">
              {cart.map((p) => (
                <div
                  className="bg-white border rounded-lg p-4 mb-4 flex items-center justify-between"
                  key={p._id}
                >
                  <div className="flex items-center">
                   
                    <img
                      src={`http://localhost:3000/api/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="w-20 h-20 rounded-lg mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-bold">{p.name}</h2>
                      <p>{p.description}</p>

                      <p className="text-xl font-bold mt-2 flex items-center ">
                        {" "}
                        {<TbCurrencyRupee />} {p.price}
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-red-700 "
                    onClick={() => removeCartItem(p._id)}
                  >
                    <MdDeleteForever className="text-3xl" />
                  </button>

                  {/* <div className="flex items-center">
                <button className="text-red-500 text-xl mr-4">
                  <i className="fas fa-trash"></i>
                </button>
                <div className="flex items-center border rounded-lg">
                  <button className="px-3 py-1">-</button>
                  <span className="px-3 py-1">1</span>
                  <button className="px-3 py-1">+</button>
                </div>
              </div> */}
                </div>
              ))}
            </div>
            {/* Order Summary */}
            <div className="w-full lg:w-1/3 bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">
                Order Summary | payment{" "}
              </h2>

              
              <hr className="my-4" />
              <div className="flex justify-between mb-4">
                <span className="text-xl font-bold">Total</span>
                <span className="text-xl font-bold">{totalPrice()}</span>
              </div>
              
              <div className="flex items-center mb-4">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{ authorization: clientToken }}
                      
                      onInstance={(instance) => {
                        console.log(instance)
                        setInstance(instance)
                      }}
                    />
                    <button
                      onClick={handlePayment}
                      disabled={!instance || loading}
                      className="btn btn-primary"
                    >
                      {loading ? "Processing..." : "Buy"}
                    </button>
                    
                  </>
                )}
              </div>
              {/* <button className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center">
                <span>Go to Checkout</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

