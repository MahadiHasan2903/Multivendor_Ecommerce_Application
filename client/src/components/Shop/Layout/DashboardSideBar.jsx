import React from "react";

import { dashboardSidebarItems } from "../../../data/data";
import { Link } from "react-router-dom";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10 800px:pl-3 800px:pt-4">
      {dashboardSidebarItems.map((item) => (
        <div className="flex items-center w-full p-4" key={item.id}>
          <Link to={item.path} className="flex items-center w-full">
            {item.icon({
              size: 30,
              color: active === item.id ? "crimson" : "#555",
            })}
            <h5
              className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                active === item.id ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              {item.title}
            </h5>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DashboardSideBar;
