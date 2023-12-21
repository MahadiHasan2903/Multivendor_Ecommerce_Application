import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAcceptedOrders } from "../../redux/actions/serviceProviderAction";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";

const PartnerAcceptedOrder = () => {
  const dispatch = useDispatch();
  const serviceProvider = useSelector(
    (state) => state.serviceProvider.serviceProvider
  );
  const acceptedOrders = useSelector(
    (state) => state.serviceProvider.acceptedOrders
  );

  console.log(serviceProvider._id);

  useEffect(() => {
    const fetchOrders = async () => {
      if (serviceProvider) {
        await dispatch(getAllAcceptedOrders(serviceProvider._id));
      }
    };

    fetchOrders();
  }, [dispatch, serviceProvider]);

  console.log(acceptedOrders);

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
      field: "Preview",
      flex: 0.5,
      minWidth: 100,
      headerName: "Preview",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/delivery-partner-order-details/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = acceptedOrders
    ? acceptedOrders.map((order) => ({
        id: order._id,
        productName: order.cart[0].name,
        quantity: order.cart.length,
        status: order.status,
        deliveryAddress: `${order.shippingAddress.address1}, ${order.shippingAddress.address2},  ${order.shippingAddress.country}`,
      }))
    : [];

  return (
    <div className="flex justify-center w-full pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Accepted Orders</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default PartnerAcceptedOrder;
