import React from "react";
import { useState, useEffect } from "react";
import useCategory from "../components/Hooks/useCategory";
import Layout from "../components/Layout";
import { Link } from "react-router";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"all Categories"}>
      <div className="container ">
        <div className="row"> 
            {categories.map((c) => (

                <div className="col-md-6 mt-5 mb-3 gx-3 gy-3"><Link to={`/category/${c.slug}`} className="btn btn-primary">{c.name}</Link></div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
