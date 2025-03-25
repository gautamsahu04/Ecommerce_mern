import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");

  // Fetch single product data
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/product/single-product/${params.slug}`
      );
      console.log(data);
      if (data?.product) {
        // to sAVE THE DATA
        setName(data.product.name);
        setId(data.product._id);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setCategory(data.product.category);
        setShipping(data.product.shipping);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching product details");
    }
  };

  useEffect(() => {
    if (params.slug) getSingleProduct();
  }, [params.slug]);

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/category/get-category"
      );
      if (data?.success) {
        setCategories(data.Category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Handle product update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      photo && formData.append("photo", photo);

      const { data } = await axios.put(
        `http://localhost:3000/api/product/update-product/${id}`, // Use ID if required
        formData,
        { headers: { "Content-Type": "multipart/form-data" } } // ✅ Add this
      );

      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating product");
    }
  };
  const handleDelete = async () => {
    try {
      let answer = window.prompt(" sure you want to delete the product ?");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:3000/api/product/delete-product/${id}` // Use ID if required
      );
      
      toast.success("Product deleted successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  };

  return (
    <Layout title="Update Product">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-3xl font-bold py-2">Update Product</h1>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Shipping</label>
              <select
                className="form-select"
                value={shipping ? "true" : "false"}
                onChange={(e) => setShipping(e.target.value === "true")}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Product Image</label>
              {photo ? photo.name : "upload photo"}
              <input
                type="file"
                className="form-control"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
            <div className="mb-3">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="uploaded image"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`http://localhost:3000/api/product/product-photo/${id}`}
                    alt="uploaded image"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>

            <div className="d-flex gap-3">
              <button onClick={handleUpdate} className="btn btn-primary">
                Update Product
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
