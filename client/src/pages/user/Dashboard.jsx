import React from 'react'
import Layout from "../../components/Layout.jsx"
import LoadingPage from '../LoadingPage.jsx'
import { useAuth } from '../../context/Auth.jsx'
import UserMenu from './UserMenu.jsx'
const Dashboard = () => {
  const [Auth] = useAuth()
  return (

    <Layout title={"dashboard ecommerce"}>
      
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-9 w-75 p-3">
            <br />
            <h3>user name : {Auth?.user?.name}</h3>
            <h3>user email : {Auth?.user?.email}</h3>
            <h3>user contact : {Auth?.user?.phone}</h3>
            <h3>user address : {Auth?.user?.address}</h3>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Dashboard