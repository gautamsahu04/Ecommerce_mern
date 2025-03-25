import React from 'react'
import { NavLink, } from "react-router-dom";

const AdminMenu = () => {
  return (
    
    <div className='text-center'>
        <div className='list-group'>

        <h1 className='text-center'>Admin panel</h1>
        <NavLink to = "/dashboard/admin/CreateCategory" className="list-group-item list-group-item-action " >create category</NavLink>
        <NavLink to = "/dashboard/admin/CreateProduct" className="list-group-item list-group-item-action " >create product</NavLink>
        <NavLink to = "/dashboard/admin/Products" className="list-group-item list-group-item-action " >All products</NavLink>
        <NavLink to = "/dashboard/admin/AllUsers" className="list-group-item list-group-item-action " >All  users</NavLink>

        </div>
    </div>
  )
}

export default AdminMenu