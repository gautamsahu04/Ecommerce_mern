import axios from "axios";
import { useState, useEffect } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // get All-category function
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/category/get-category"
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
