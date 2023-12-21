import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { profileSidebarItems } from "../../data/data";
import { AiOutlineLogin } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      const { data } = response;
      toast.success(data.message);
      window.location.reload(true);
      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleSidebarItemClick = (itemId) => {
    if (itemId === 4) {
      navigate("/inbox");
    } else {
      setActive(itemId);
    }
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      {profileSidebarItems.map((item) => (
        <div
          key={item.id}
          className={`flex items-center w-full mb-8 cursor-pointer ${
            active === item.id ? "text-[red]" : ""
          }`}
          onClick={() => handleSidebarItemClick(item.id)}
        >
          {React.createElement(item.icon, {
            size: 20,
            color: active === item.id ? "red" : "",
          })}
          <span className="hidden pl-3 800px:block">{item.title}</span>
        </div>
      ))}
      {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className="flex items-center w-full mb-8 cursor-pointer"
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              color={active === 7 ? "red" : ""}
            />
            <span
              className={`pl-3 ${
                active === 8 ? "text-[red]" : ""
              } 800px:block hidden`}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}
      <div
        className={`flex items-center w-full mb-8 cursor-pointer ${
          active === 10 ? "text-[red]" : ""
        }`}
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 10 ? "red" : ""} />
        <span className="hidden pl-3 800px:block">Log out</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
