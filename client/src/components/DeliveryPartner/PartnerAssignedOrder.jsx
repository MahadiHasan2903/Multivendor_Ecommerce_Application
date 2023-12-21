import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptAssignedOrder,
  getAllAssignedOrders,
  rejectAssignedOrder,
} from "../../redux/actions/serviceProviderAction";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import { MdDownloadDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { toast } from "react-toastify";

const PartnerAssignedOrder = () => {
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  const dispatch = useDispatch();
  const serviceProvider = useSelector(
    (state) => state.serviceProvider.serviceProvider
  );
  const assignedOrders = useSelector(
    (state) => state.serviceProvider.assignedOrders
  );
  const serviceProviderId = serviceProvider._id;

  useEffect(() => {
    const fetchOrders = async () => {
      if (serviceProvider) {
        await dispatch(getAllAssignedOrders(serviceProvider._id));
      }
    };

    fetchOrders();
  }, [dispatch, serviceProvider]);

  console.log(assignedOrders);

  const handleAcceptOrder = async (orderId) => {
    try {
      await dispatch(acceptAssignedOrder(serviceProviderId, orderId));
      toast.success("Order Accepted Successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error:", error);
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      await dispatch(rejectAssignedOrder(serviceProviderId, orderId));
      toast.success("Order Rejected Successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  const columns = [
    {
      field: "productName",
      headerName: " Product Name",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Product Quantity",
      minWidth: 130,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Order Status",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "deliveryAddress",
      headerName: "Delivery Address",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "accept",
      flex: 0.5,
      minWidth: 50,
      headerName: "Accept Order",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => handleAcceptOrder(params.id)}>
            <MdDownloadDone size={20} />
          </Button>
        );
      },
    },

    {
      field: "reject",
      flex: 0.5,
      minWidth: 50,
      headerName: "Reject Order",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setOrderId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = assignedOrders
    ? assignedOrders.map((order) => ({
        id: order._id,
        productName: order.cart[0].name,
        quantity: order.cart.length,
        status: order.status,
        deliveryAddress: `${order.shippingAddress.address1}, ${order.shippingAddress.address2},  ${order.shippingAddress.country}`,
      }))
    : [];

  let updatedColumns = columns;
  if (serviceProvider.role === "Transporter") {
    updatedColumns = columns.filter((col) => col.field !== "reject");
  }

  return (
    <div className="flex justify-center w-full pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Assigned Order</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={updatedColumns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="flex justify-end w-full cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you wanna delete this order?
              </h3>
              <div className="flex items-center justify-center w-full">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() => setOpen(false) || handleRejectOrder(orderId)}
                >
                  Confirm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerAssignedOrder;
