import { FiShoppingBag } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { BsShop } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";

const AdminSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="flex items-center w-full p-4">
        <Link to="/admin/dashboard" className="flex items-center w-full">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link to="/admin-orders" className="flex items-center w-full">
          <FiShoppingBag
            size={30}
            color={`${active === 2 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link to="/admin-sellers" className="flex items-center w-full">
          <BsShop size={30} color={`${active === 3 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Shops
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link to="/admin-users" className="flex items-center w-full">
          <HiOutlineUserGroup
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Users
          </h5>
        </Link>
      </div>
      <div className="flex items-center w-full p-4">
        <Link
          to="/admin-get-all-service-provider"
          className="flex items-center w-full"
        >
          <TbTruckDelivery
            size={30}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Delivery Partners
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link to="/admin-products" className="flex items-center w-full">
          <BsHandbag size={30} color={`${active === 6 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link to="/admin-events" className="flex items-center w-full">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link to="/admin-withdraw-request" className="flex items-center w-full">
          <CiMoneyBill
            size={30}
            color={`${active === 8 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Withdraw Request
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link
          to="/admin-add-service-provider"
          className="flex items-center w-full"
        >
          <FaRegAddressBook
            size={30}
            color={`${active === 9 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Add Delivery Partner
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
