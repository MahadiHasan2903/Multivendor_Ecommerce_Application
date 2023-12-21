import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllWithdraw from "../../components/Admin/AllWithdraw";

const AdminDashboardWithdrawPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex w-full">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={8} />
          </div>
          <AllWithdraw />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdrawPage;
