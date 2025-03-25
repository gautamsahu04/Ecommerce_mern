import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCateory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const [editingCategory, setEditingCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  // Handle edit button click
  const handleEditClick = (category) => {
    setEditingCategory(category._id);
    setUpdatedName(category.name);
  };

  // Handle category update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/category/update-category/${editingCategory}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success("Category updated successfully");
        setEditingCategory(null);
        getAllcategory(); // Refresh category list
      } else {
        toast.error("Error updating category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating");
    }
  };

  //handlefrom
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/category/create-category",
        { name }
      );
      // console.log(res.data)
      if (data?.success) {
        toast.success(`${data.name} Category created successfully`);
        getAllcategory();

      } else toast.error("Error creating category");
    } catch (error) {
      console.log(error);
      toast.error("error in handle from ");
    }
  };
// get all category 
  const getAllcategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.Category);
        // console.log(data.Category)
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting category");
    }
  };
  // delete category
  const handleDelete = async (categoryId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/category/delete-category/${categoryId}`
      );
      if (data.success) {
        toast.success("Category deleted successfully");
        getAllcategory(); // Refresh categories
      } else {
        toast.error("Error deleting category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting");
    }
  };
  useEffect(() => {
    getAllcategory();
  }, []);

  return (
    <Layout title={"CreateCategory"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h3>Create Category</h3>
          <div className="p-3 w-50">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* Table Head */}
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
  {categories?.map((c) => (
    <tr key={c._id}>
      <td>
        {editingCategory === c._id ? (
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        ) : (
          c.name
        )}
      </td>
      <td>
        {editingCategory === c._id ? (
          <button onClick={handleUpdate} className="btn btn-success ms-2">
            Save
          </button>
        ) : (
          <button onClick={() => handleEditClick(c)} className="btn btn-primary ms-2">
            Edit
          </button>
        )}
        <button
          onClick={() => handleDelete(c._id)}
          className="btn btn-danger ms-2"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCateory;
