import React from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { TbCurrencyRupee } from "react-icons/tb";

const CategoryProduct = () => {
  const navigate = useNavigate(); // Hook for navigation
  const params = useParams(); // Hook to get URL parameters (category slug)
  
  // State to manage products, category details, loading status, pagination, and total product count
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Function to fetch products by category
  const getProductCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/product/product-category/${params.slug}`
      );
      setCategory(data?.category); // Store category details
      setProduct(data?.products); // Store fetched products
    } catch (error) {
      console.log(error);
    }
  };

  // Function to load more products (pagination)
  const loadMore = async () => {
    try {
      setLoading(true); // Show loading state
      const { data } = await axios.get(
        `http://localhost:3000/api/product/product-list/${page}`
      );
      setLoading(false);
      setProduct((prevProducts) => [...prevProducts, ...data?.products]); // Append new products to existing list
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Function to get the total count of products
  const getTotalCount = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/product/count-product");
      setTotal(data?.total); // Store total product count
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch total product count when the component mounts
  useEffect(() => {
    getTotalCount();
  }, []);

  // Load more products when the page number increases
  useEffect(() => {
    if (page > 1) {
      loadMore();
    }
  }, [page]);

  // Fetch products when category slug changes
  useEffect(() => {
    if (params?.slug) {
      setProduct([]); // Reset products when category changes
      setPage(1); // Reset page number
      getProductCategory();
    }
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container mt-3">
        <div>
          <h1 className="text-center">Category: {category?.name}</h1>
          <h1 className="text-center"> {products?.length} result found</h1>
          <div className="row">
            <div className="md:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <div
                    key={p._id}
                    className="bg-white shadow-lg rounded-lg p-3 flex flex-col h-full"
                  >
                    {/* Image Wrapper */}
                    <div className="h-48 w-full">
                      <img
                        src={`http://localhost:3000/api/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info Section */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-lg font-semibold mt-2">{p.name}</h2>
                        <p className="text-gray-600 min-h-[40px]">
                          {p.description.substring(0, 15)}...
                        </p>
                        <p className="text-gray-700 flex items-center gap-1">
                          <TbCurrencyRupee /> {p.price}
                        </p>
                      </div>

                      {/* Buttons Section */}
                      <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <button
                          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                          onClick={() => {
                            navigate(`/product/${p.slug}`); // Navigate to product details page
                          }}
                        >
                          More Details
                        </button>
                        <button className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Display message if no products are found */}
              {products.length === 0 && (
                <p className="text-center text-gray-500 mt-6">
                  No products found.
                </p>
              )}

              {/* Load More Button */}
              <div className="m-2 p-3">
                {products && products.length < total && (
                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1); // Increase page number to load more products
                    }}
                  >
                    {loading ? "loading..." : "loading more"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
