import React from "react";
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import { FcSearch } from "react-icons/fc";

const SearchInput = () => {
    const {searchData, setSearchData} = useSearch();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.get(
          `https://ecommerce-mern-6j9p.onrender.com/api/product/search/${searchData.keyword}`
        );
        setSearchData({ ...searchData, results: data });
        navigate("/search"); // Redirect to search results page
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className=" p-4 flex justify-center">
  <form onSubmit={handleSubmit} className="relative flex items-center ">
    <FcSearch className="absolute left-3 text-2xl" /> {/* Icon positioned inside the input */}
    <input
      type="search"
      placeholder="Search..."
      value={searchData.keyword}
      onChange={(e) => setSearchData({ ...searchData, keyword: e.target.value })}
      className="pl-10 pr-3 py-2  w-80 border border-gray-300 focus:outline-none rounded-2xl"
    />
    <button
      type="submit"
      className="ml-2 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
    >
      Search
    </button>
  </form>
</div>

  );
};
  export default SearchInput