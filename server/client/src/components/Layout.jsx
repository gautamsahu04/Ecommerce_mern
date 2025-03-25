import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';


const Layout = ({
  children,
  description = "Ecommerce website built with MERN stack",
  title = "Ecommerce - MERN",
  keywords = "mern, ecommerce, react, node, express, mongodb",
  author = "gautam",
}) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>{children}
      <Toaster />
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce - mern",
  description: "Ecommerce website built with mern stack",
  keywords: "mern, ecommerce, react, node, express, mongodb",
  author: "gautam",
};

export default Layout;
