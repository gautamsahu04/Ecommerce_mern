import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/Auth.jsx";
import { useCart } from "../context/Card.jsx";
import { TbCurrencyRupee } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const totalPrice = () => {
    try {
      let subtotal = 0;
      cart?.map((item) => {
        subtotal = subtotal + item.price ;
        
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
                <div className="bg-white border rounded-lg p-4 mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    {/* <img
                  src="https://placehold.co/100x100"
                  alt="Gradient Graphic T-shirt"
                  className="w-20 h-20 rounded-lg mr-4"
                /> */}
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
              
              {/* <div className="flex justify-between mb-2">
                <span>Discount (-20%)</span>
                <span className="font-bold text-red-500">-$113</span>
              </div> */}
              {/* <div className="flex justify-between mb-2">
                <span>Delivery charge</span>
                <span className="font-bold">100</span>
              </div> */}
              <hr className="my-4" />
              <div className="flex justify-between mb-4">
                <span className="text-xl font-bold">Total</span>
                <span className="text-xl font-bold">{totalPrice()}</span>
              </div>
              {/* <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Add promo code"
                className="flex-1 border rounded-l-lg px-4 py-2"
              />
              <button className="bg-gray-200 text-black px-4 py-2 rounded-r-lg">
                Apply
              </button>
            </div> */}
              <button className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center">
                <span>Go to Checkout</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

{
  /* <div className="container">
        <div className="row">
          <div className="col-md-6 ">
            <h1 className="text-center bg-light p-2">{`hello ${
              auth?.token && auth?.user.name
            }`}</h1>
            <h4 className="text-center">
              {cart.length > 1
                ? ` you have ${cart.length} item in your cart ${
                    auth?.token ? "" : "you have to loggedIN first"
                  }  "" `
                : "your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            {cart.map((p) => (
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={`http://localhost:3000/api/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="w-50 h-55 object-cover rounded-lg"
                  />
                </div>
                <div className="col-md-6">
                  {" "}
                  <p className="text-gray-600 min-h-[40px]">
                    {p.description.substring(0,50)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6">Checkout || payment</div>
        </div>
      </div> */
}
