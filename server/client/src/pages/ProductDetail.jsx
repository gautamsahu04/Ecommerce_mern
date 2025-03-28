import React, { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import { useParams } from "react-router";
import axios from "axios";
import { TbCurrencyRupee, TbTruckDelivery } from "react-icons/tb";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params?.slug) getOneProduct();
  }, [params?.slug]);


  const getOneProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-mern-6j9p.onrender.com/api/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product?._id, data?.product?.category?._id);   // categoryId , ProductId
    } catch (error) {
      console.log(error);
    }
  };

//   similar Product 
const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-mern-6j9p.onrender.com/api/product/related-product/${pid}/${cid}`
      );
      setSimilarProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-2 px-4">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="flex justify-center">
            <img
              src={`https://ecommerce-mern-6j9p.onrender.com/api/product/product-photo/${product._id}`}
              alt={product.name}
              className="w-[350px] h-[300px] object-cover rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h1 className="text-center text-2xl font-bold mb-3">Product Details</h1>
            <h6 className="text-lg text-gray-700 mt-2">
              <span className="font-semibold">Description:</span> {product.description}
            </h6>
            <h6 className="text-lg text-gray-700 mt-2 flex items-center gap-1">
              <TbCurrencyRupee size={20} />
              <span className="font-semibold">Price:</span> {product.price}
            </h6>
            <h6 className="text-lg text-gray-700 mt-2">
              <span className="font-semibold">Category:</span> {product?.category?.name}
            </h6>

            <button className="mt-4 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md transition-all">
              ADD TO CART
            </button>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold">Similar Products</h2>
          {similarProducts.length === 0 ? (
            <p className="text-gray-600">No similar products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {similarProducts.map((p) => (
                <div key={p._id} className="bg-white shadow-lg rounded-lg p-3 flex flex-col">
                  {/* Image */}
                  <div className="h-48 w-full">
                    <img
                      src={`https://ecommerce-mern-6j9p.onrender.com/api/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="mt-2 flex flex-col flex-grow">
                    <h2 className="text-lg font-semibold">{p.name}</h2>
                    <p className="text-gray-600">{p.description.substring(0, 15)}...</p>
                    <p className="text-gray-700 flex items-center gap-1">
                      <TbCurrencyRupee /> {p.price}
                    </p>

                    {/* Buttons */}
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/product/${p.slug}`}
                        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-center"
                      >
                        View Details
                      </Link>
                      <button className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
