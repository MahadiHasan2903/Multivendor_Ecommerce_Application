import React from "react";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AddServiceProvider from "../../components/Admin/AddServiceProvider";

const AdminAddServiceProviderPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex w-full">
        <div className="flex items-start w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={9} />
          </div>
          <div className="flex justify-center w-full">
            <AddServiceProvider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddServiceProviderPage;
