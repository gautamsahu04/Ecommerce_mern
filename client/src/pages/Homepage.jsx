import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/Price";
import { TbCurrencyRupee } from "react-icons/tb";
import {  useNavigate } from "react-router";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState("")
  const navigate = useNavigate()

  const loadMore = async () => {
    try {
      setLoading(true)
      const {data} = await axios.get(`http://localhost:3000/api/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
      
    } catch (error) {
      console.log(error)
      setLoading(false)
      
    }
    
  }
  useEffect(() => {
    if(page===1) return;
    loadMore()
  },[page])

  // get total count 
  const getTotalCount = async () => {
    try {
      const {data} = await axios.get("http://localhost:3000/api/product/count-product")
      setTotal(data?.total)
      
    } catch (error) {
      console.log(error);

      
    }
    
  } 

  useEffect(() => {
    getAllCategories();
    getTotalCount()
  }, []);

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/category/get-category");
      if (data?.success) {
        setCategories(data?.Category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:3000/api/product/product-list/${page}`);
      setLoading(false)

      setProducts(data.products);
    } catch (error) {
      console.log("Error fetching products:", error);
      setLoading(false)

    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/product/filter-product", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log("Error filtering products:", error);
    }
  };

  return (
    <Layout title="All Products - Best Offers">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="md:col-span-3 bg-gray-100 p-4 rounded-lg shadow-md w-full">
            <h2 className="text-xl font-semibold mb-4">Filter by Categories</h2>
            <div className="flex flex-col space-y-2">
              {categories.map((c) => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">Filter by Price</h2>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices.map((p) => (
                <div key={p._id} className="py-1">
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>

            <button
              className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>

          {/* Right Side - Product List */}
          <div className="md:col-span-9">
            <h1 className="text-center text-3xl font-bold mb-6">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p._id} className="bg-white shadow-lg rounded-lg p-3 flex flex-col h-full">
                {/* Image Wrapper */}
                <div className="h-48 w-full">
                  <img
                    src={`http://localhost:3000/api/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              
                {/* Product Info Wrapper */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold mt-2">{p.name}</h2>
                    <p className="text-gray-600 min-h-[40px]">{p.description.substring(0, 15)}...</p>
                    <p className="text-gray-700 flex items-center gap-1">
                      <TbCurrencyRupee /> {p.price}
                    </p>
                  </div>
              
                  {/* Buttons Section */}
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg" onClick={()=>{navigate(`/product/${p.slug}`)}}> 
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
            {products.length === 0 && (
              <p className="text-center text-gray-500 mt-6">No products found.</p>
            )}
        <div className="m-2 p-3">{products && products.length<total &&(
          <button className="btn btn-warning" onClick={(e)=>{
            e.preventDefault();
            setPage(page+1)
          }}>
            {loading?"loading...":"loading more"}
          </button>
        )}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
