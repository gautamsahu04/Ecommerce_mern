import React from 'react'
import { NavLink } from 'react-router'
const UserMenu = () => {
  return (
    <div className='text-center'>
    <div className='list-group'>

    <br />
    <h1 className='text-center p-1 text-xl'>User Dashboard</h1>

    <NavLink to = "/dashboard/user/profile" className="list-group-item list-group-item-action " >profile</NavLink>
    <NavLink to = "/dashboard/user/orders" className="list-group-item list-group-item-action " >orders</NavLink>

    </div>
</div>
  )
}

export default UserMenu