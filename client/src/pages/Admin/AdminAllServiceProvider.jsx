import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllServiceProvider from "../../components/Admin/AllServiceProvider";

const AdminAllServiceProvider = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex w-full">
        <div className="flex items-start w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={5} />
          </div>
          <div className="flex justify-center w-full">
            <AllServiceProvider />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminAllServiceProvider;
