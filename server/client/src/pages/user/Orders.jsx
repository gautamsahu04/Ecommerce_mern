import React from "react";
import Layout from "../../components/Layout";
import UserMenu from "./UserMenu";

const Orders = () => {
  return (
    <Layout title={"Orders"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 w-75 p-3">
            <h1>all Orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
