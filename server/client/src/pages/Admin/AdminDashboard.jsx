import React from "react";
import Layout from "../../components/Layout.jsx";
import AdminMenu from "../../components/AdminMenu.jsx";
import { useAuth } from "../../context/Auth.jsx";
const AdminDashboard = () => {
  const [Auth, setAuth] = useAuth();
  return (
    <Layout title={"AdminDashboard"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 w-75 p-3">
            <h3>Admin name:{Auth?.user?.name}</h3>
            <h3>Admin email:{Auth?.user?.email}</h3>
            <h3>Admin contact:{Auth?.user?.phone}</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
