import React from "react";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AllSellers from "../../components/Admin/AllSellers";

const AdminDashboardSellersPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex w-full">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={3} />
          </div>
          <AllSellers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSellersPage;
