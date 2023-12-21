import { CiLogout } from "react-icons/ci";
import { MdAssignmentAdd } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearServiceProviderDetails } from "../../../redux/actions/serviceProviderAction";
import { toast } from "react-toastify";

const PartnerSidebar = ({ active }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get(`${server}/service-provider/logout-service-provider`);
      dispatch(clearServiceProviderDetails());
      toast.success("Logout Successful");
      navigate("/partner-login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="flex items-center w-full p-4">
        <Link to="/partner-profile" className="flex items-center w-full">
          <CgProfile size={30} color={`${active === 1 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Profile
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link
          to="/partner-assigned-orders"
          className="flex items-center w-full"
        >
          <MdAssignmentAdd
            size={30}
            color={`${active === 2 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Assigned Orders
          </h5>
        </Link>
      </div>

      <div className="flex items-center w-full p-4">
        <Link
          to="/partner-accepted-orders"
          className="flex items-center w-full"
        >
          <AiOutlineUnorderedList
            size={30}
            color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Accepted Orders
          </h5>
        </Link>
      </div>

      <div
        className="flex items-center w-full p-4 cursor-pointer"
        onClick={handleLogout}
      >
        <CiLogout size={30} color={"#555"} />
        <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]`}>
          Logout
        </h5>
      </div>
    </div>
  );
};

export default PartnerSidebar;
