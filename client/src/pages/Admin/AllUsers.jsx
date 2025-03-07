import React from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout'

const AllUsers = () => {
  return (
    <Layout title={"AllUsers"}>

    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>

        </div>
        <div className='col-md-9'>
            <h3>all users</h3>
            
        </div>
    </div>
    </Layout>
  )
}

export default AllUsers