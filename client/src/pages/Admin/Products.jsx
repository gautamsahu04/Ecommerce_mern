import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/product/get-all-product");
      if (data?.products) {
        setProducts(data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"All Products"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          {/* <h3>All Products</h3> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((p) => (
                <Link  to={`/dashboard/admin/products/${p.slug}`} key={p._id}>

                
              <div className="card bg-base-100 shadow-sm" >
                <figure>
                  <img src={`http://localhost:3000/api/product/product-photo/${p._id}`} alt={p.name} className="w-full h-48 object-cover" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{p.name}</h2>
                  <p>{p.description}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">View</button>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
