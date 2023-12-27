import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deliverymanAssignedOrderStatus } from "../../redux/actions/orderAction";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { getDeliverymen } from "../../redux/actions/serviceProviderAction";
import { Button } from "@mui/material";

const PartnerOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const [showAssignColumn, setShowAssignColumn] = useState(true);
  const { serviceProviders } = useSelector((state) => state.serviceProvider);
  const serviceProvider = useSelector(
    (state) => state.serviceProvider.serviceProvider
  );
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(serviceProvider.role);
  // console.log(serviceProviders);

  useEffect(() => {
    dispatch(getDeliverymen());
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);
  // console.log(data);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        navigate("/partner-accepted-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleAssignOrder = async (serviceProviderId, orderId) => {
    try {
      // console.log(serviceProviderId);
      // console.log(orderId);
      const response = await axios.post(
        `${server}/service-provider/assign-order`,
        {
          serviceProviderId,
          orderId,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Order assigned to the service provider");
        dispatch(deliverymanAssignedOrderStatus(orderId, serviceProviderId));
        setShowAssignColumn(false);
      } else {
        toast.error("Failed to assign order");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const columns = [
    { field: "name", headerName: "Deliveryman Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    {
      field: "assign",
      headerName: "Assign Order",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {showAssignColumn && (
              <Button onClick={() => handleAssignOrder(params.id, id)}>
                <FaUserPlus size={20} />
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const deliverymanRows = serviceProviders.map((deliveryman) => ({
    id: deliveryman._id,
    name: deliveryman.name,
    email: deliveryman.email,
    phone: deliveryman.phoneNumber,
    address: deliveryman.address,
  }));

  // console.log(data?.status);

  return (
    <div className="flex flex-col justify-between mx-5 800px:flex-row">
      <div className={`py-4 min-h-screen w-[50%] ${styles.section}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <BsFillBagFill size={30} color="crimson" />
            <h1 className="pl-2 text-[25px]">Order Details</h1>
          </div>
          <Link to="/partner-accepted-orders">
            <div
              className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
            >
              Order List
            </div>
          </Link>
        </div>

        <div className="flex items-center justify-between w-full pt-6">
          <h5 className="text-[#00000084]">
            Order ID: <span>#{data?._id?.slice(0, 8)}</span>
          </h5>
          <h5 className="text-[#00000084]">
            Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
          </h5>
        </div>

        {/* order items */}
        <br />
        <br />
        {data &&
          data?.cart.map((item, index) => (
            <div className="flex items-start w-full mb-5" key={index}>
              <img
                src={`${item.images[0]?.url}`}
                alt=""
                className="w-[80x] h-[80px]"
              />
              <div className="w-full">
                <h5 className="pl-3 text-[20px]">{item.name}</h5>
                <h5 className="pl-3 text-[20px] text-[#00000091]">
                  US${item.discountPrice} x {item.qty}
                </h5>
              </div>
            </div>
          ))}

        <div className="w-full text-right border-t">
          <h5 className="pt-3 text-[18px]">
            Total Price: <strong>US${data?.totalPrice}</strong>
          </h5>
        </div>
        <br />
        <br />
        <div className="items-center w-full 800px:flex">
          <div className="w-full 800px:w-[60%]">
            <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
            <h4 className="pt-3 text-[20px]">
              {data?.shippingAddress.address1 +
                " " +
                data?.shippingAddress.address2}
            </h4>
            <h4 className=" text-[20px]">{data?.shippingAddress.country}</h4>
            <h4 className=" text-[20px]">{data?.shippingAddress.city}</h4>
            <h4 className=" text-[20px]">{data?.user?.phoneNumber}</h4>
          </div>
          <div className="w-full 800px:w-[40%]">
            <h4 className="pt-3 text-[20px]">Payment Info:</h4>
            <h4>
              Status:{" "}
              {data?.paymentInfo?.status
                ? data?.paymentInfo?.status
                : "Not Paid"}
            </h4>
          </div>
        </div>
        <br />
        <br />
        <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
        {data?.status !== "Processing refund" &&
          data?.status !== "Refund Success" && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
            >
              {["Transporting", "Handed Over to Deliveryman", "Delivered"].map(
                (option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                )
              )}
            </select>
          )}

        <div
          className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
          onClick={orderUpdateHandler}
        >
          Update Status
        </div>
      </div>

      {serviceProvider.role === "Transporter" && (
        <div className="flex flex-col w-full 800px:w-[45%] m-4 mt-10 items-center">
          {data &&
            (data.assignedToDeliveryman.length !== 0 ? (
              <h1 className="text-2xl font-bold text-center">
                You&apos;ve already assigned this order to a deliveryman
              </h1>
            ) : (
              <div className="flex flex-col items-center w-[80%] m-4 mt-10 800px:w-full">
                <h1 className="top-0 mb-4 text-2xl font-bold text-center">
                  Available Deliveryman
                </h1>

                <div className="w-full ml-5">
                  <DataGrid rows={deliverymanRows} columns={columns} />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PartnerOrderDetails;
