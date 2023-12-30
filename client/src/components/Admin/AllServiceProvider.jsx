import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/userAction";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getAllServiceProviders } from "../../redux/actions/serviceProviderAction";
import ReportGenerator from "../ReportGenerator";

const AllServiceProvider = () => {
  const dispatch = useDispatch();

  const { serviceProviders } = useSelector((state) => state.serviceProvider);
  console.log(serviceProviders);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllServiceProviders());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/service-provider/delete-service-provider/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      });

    dispatch(getAllUsers());
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "role",
      headerName: "User Role",
      type: "text",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      minWidth: 130,
      flex: 1,
    },

    {
      field: "joinedAt",
      headerName: "Joined at",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 50,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} color="ff0000" />
            </Button>
          </>
        );
      },
    },
  ];

  const rows =
    serviceProviders?.map((item) => ({
      id: item._id,
      name: item.name,
      address: item.address,
      phoneNumber: item.phoneNumber,
      email: item.email,
      role: item.role,
      joinedAt: item.createdAt ? item.createdAt.slice(0, 10) : "",
    })) || [];

  return (
    <div className="flex justify-center w-full pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Delivery Partners</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <ReportGenerator
            data={rows}
            reportTitle="All Delivery Partners Report"
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
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="flex justify-end w-full cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you wanna delete this service provider?
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
                  onClick={() => setOpen(false) || handleDelete(userId)}
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

export default AllServiceProvider;
