import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router'
const PageNotFound = () => {
  return (
    <Layout title={"page not found"}>
         <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! The page you are looking for does not exist.</p>
      <Link 
        to="/" 
        className="mt-6 px-6 py-3 bg-slate-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-slate-700 transition"
      >
        Go Back Home
      </Link>
    </div>
    </Layout>
  )
}

export default PageNotFound