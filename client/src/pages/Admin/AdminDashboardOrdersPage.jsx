import { useEffect, useState } from "react";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/orderAction";
import ReportGenerator from "../../components/ReportGenerator";

const AdminDashboardOrdersPage = () => {
  const dispatch = useDispatch();
  const { adminOrders } = useSelector((state) => state.order);
  const serviceProviders = useSelector(
    (state) => state.serviceProvider.serviceProviders
  );
  console.log(adminOrders);
  console.log(serviceProviders);
  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, [dispatch]);

  const [transporters, setTransporters] = useState({});
  const [deliverymen, setDeliverymen] = useState({});

  useEffect(() => {
    // Logging the received data
    console.log("Admin Orders:", adminOrders);
    console.log("Service Providers:", serviceProviders);

    // Checking if either adminOrders or serviceProviders are empty
    if (adminOrders.length === 0 || serviceProviders.length === 0) {
      console.log("No admin orders or service providers found.");
      return; // Exiting the function if either is empty
    }

    // Initializing empty objects to store filtered transporters and deliverymen
    const filteredTransporters = {};
    const filteredDeliverymen = {};

    // Looping through each order in adminOrders
    adminOrders.forEach((order) => {
      // Getting assigned transporter and deliveryman IDs from each order
      const assignedTransporterIds = order.assignedToTransporter || [];
      const assignedDeliverymanIds = order.assignedToDeliveryman || [];

      // Iterating through assigned transporter IDs for each order
      assignedTransporterIds.forEach((assignedTransporterId) => {
        // Finding a matching transporter in the serviceProviders array based on ID and role
        const matchingTransporter = serviceProviders.find(
          (provider) =>
            provider._id === assignedTransporterId &&
            provider.role === "Transporter"
        );

        // If a matching transporter is found, store it in the filteredTransporters object
        if (matchingTransporter) {
          filteredTransporters[assignedTransporterId] = matchingTransporter;
        }
      });

      // Iterating through assigned deliveryman IDs for each order
      assignedDeliverymanIds.forEach((assignedDeliverymanId) => {
        // Finding a matching deliveryman in the serviceProviders array based on ID and role
        const matchingDeliveryman = serviceProviders.find(
          (provider) =>
            provider._id === assignedDeliverymanId &&
            provider.role === "Deliveryman"
        );

        // If a matching deliveryman is found, store it in the filteredDeliverymen object
        if (matchingDeliveryman) {
          filteredDeliverymen[assignedDeliverymanId] = matchingDeliveryman;
        }
      });
    });

    // Logging the filtered transporters and deliverymen
    console.log("Filtered Transporters:", filteredTransporters);
    console.log("Filtered Deliverymen:", filteredDeliverymen);

    // Setting the filtered data into the respective state variables
    setTransporters(filteredTransporters);
    setDeliverymen(filteredDeliverymen);
  }, [adminOrders, serviceProviders]);

  const columns = [
    // { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "transporterName",
      headerName: "Transporter",
      type: "number",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "deliverymanName",
      headerName: "Deliveryman",
      type: "number",
      minWidth: 130,
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 1.5,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Quantity",
      type: "number",
      minWidth: 130,
      flex: 1,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 1,
    },
  ];

  const rows = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      // Extracting IDs from adminOrders
      const assignedTransporterId = item?.assignedToTransporter;
      const assignedDeliverymanId = item?.assignedToDeliveryman;

      // Fetch transporter and deliveryman names from serviceProviders
      const transporter = transporters[assignedTransporterId];
      const deliveryman = deliverymen[assignedDeliverymanId];

      rows.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + " $",
        status: item?.status,
        createdAt: item?.createdAt.slice(0, 10),
        transporterName: transporter ? transporter.name : "Not assigned yet",
        deliverymanName: deliveryman ? deliveryman.name : "Not assigned yet",
      });
    });

  return (
    <div>
      <AdminHeader />
      <div className="flex w-full">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>

          <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
            <div className="w-full pt-1 mx-8 mt-10 bg-white">
              <ReportGenerator
                data={rows}
                reportTitle="All Orders Report"
                columns={columns}
              />
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrdersPage;
