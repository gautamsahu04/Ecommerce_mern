import React from "react";
import Layout from "../components/Layout";
import { TbCurrencyRupee } from "react-icons/tb";
import { useSearch } from "../context/SearchContext";

const Search = () => {
  const { searchData } = useSearch();
  const products = searchData?.results?.products ?? []; // Ensure it's an array

  return (
    <Layout title="Search Results">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Search Results</h1>
        
        {products.length === 0 ? (
          <p className="text-lg text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p._id} className="bg-white shadow-lg hover:shadow-2xl rounded-xl p-4 flex flex-col transition-all duration-300">
                
                {/* Image Wrapper */}
                <div className="h-56 w-full overflow-hidden rounded-lg">
                  <img
                    src={`https://ecommerce-mern-6j9p.onrender.com/api/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-all duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between mt-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{p.name}</h2>
                    <p className="text-gray-600 text-sm mt-1">{p.description.substring(0, 50)}...</p>
                    <p className="text-lg font-semibold flex items-center gap-1 mt-2">
                      <TbCurrencyRupee size={20} /> {p.price}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-300">
                      More Details
                    </button>
                    <button className="w-full py-2 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg transition-all duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
