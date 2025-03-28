import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router";

const CreateProducts = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null);

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("https://ecommerce-mern-6j9p.onrender.com/api/category/get-category");
      if (data?.success) {
        setCategories(data.Category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Handle product submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      if (photo) formData.append("photo", photo);

      const { data } = await axios.post("http://localhost:3000/api/product/create-product", formData);
      if (data?.success) {
        toast.success("Product created successfully");
        Navigate("/dashboard/admin/products")
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setQuantity("");
        setShipping(false);
        setPhoto(null);
      } else {
        toast.error(data?.message || "Failed to create product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating product");
    }
  };

  return (
    <Layout title="Create Product">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-3xl font-bold py-2">Create Product</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Shipping</label>
              <select className="form-select" value={shipping} onChange={(e) => setShipping(e.target.value)}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Product Image</label>
              <input type="file" className="form-control" onChange={(e) => setPhoto(e.target.files[0])} />
            </div>

            <button type="submit" className="btn btn-primary">Create Product</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProducts;
