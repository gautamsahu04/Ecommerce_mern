import axios from "axios";
import { useState, useEffect } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // get All-category function
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-mern-6j9p.onrender.com/api/category/get-category"
      );
      if (data?.success) setCategories(data?.Category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
