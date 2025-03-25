import React from "react";
import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};
//custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
