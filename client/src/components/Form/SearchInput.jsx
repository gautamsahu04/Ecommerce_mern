import React from "react";
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";

const SearchInput = () => {
    const {searchData, setSearchData} = useSearch();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/product/search/${searchData.keyword}`
        );
        setSearchData({ ...searchData, results: data });
        navigate("/search"); // Redirect to search results page
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search......"
          value={searchData.keyword}
          onChange={(e) => setSearchData({ ...searchData, keyword: e.target.value })}
          className="input  rounded w-59 px-3 py-2"
        />
        <button type="submit" className="btn bg-green-500 hover:bg-green-700  px-3 py-2">
          Search
        </button>
      </form>
    </div>
  );
};
  export default SearchInput