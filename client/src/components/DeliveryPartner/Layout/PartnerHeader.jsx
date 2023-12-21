import { MdAssignmentAdd } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const PartnerHeader = () => {
  const serviceProvider = useSelector(
    (state) => state.serviceProvider.serviceProvider
  );
  console.log(serviceProvider);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <img
            src="https://svgshare.com/i/uiJ.svg"
            alt=""
            style={{ width: "30%", padding: "10px" }}
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/partner-assigned-orders" className="hidden 800px:block">
            <MdAssignmentAdd
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/partner-accepted-orders" className="hidden 800px:block">
            <AiOutlineUnorderedList
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          <img
            src={`${serviceProvider?.avatar?.url}`}
            alt=""
            className="w-[45px] h-[45px] rounded-full object-cover ml-5"
          />
          <span className="text-[xl] font-bold mx-2">
            {serviceProvider?.name}, {serviceProvider?.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PartnerHeader;
