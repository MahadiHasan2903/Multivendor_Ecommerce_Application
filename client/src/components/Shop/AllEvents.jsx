import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEvent, getAllEventsShop } from "../../redux/actions/eventAction";
import Loader from "../Layout/Loader";
import UpdateEvent from "./UpdateEvent";
import { FaRegEdit } from "react-icons/fa";
import ReportGenerator from "../ReportGenerator";

const AllEvents = () => {
  const dispatch = useDispatch();
  const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);

  const toggleEditForm = (productId) => {
    setOpen(!open);
    setSelectedEventId(productId);
  };

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "Preview",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}?isEvent=true}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Edit",
      flex: 0.6,
      minWidth: 100,
      headerName: "Edit",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => toggleEditForm(params.id)}>
              <FaRegEdit size={20} />
            </Button>
          </>
        );
      },
    },
    {
      headerName: "Delete",
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows =
    events?.map((item) => ({
      id: item._id,
      name: item.name,
      price: `US$ ${item.discountPrice}`,
      Stock: item.stock,
      sold: item.sold_out,
    })) || [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-3 mx-8 mt-10 bg-white">
          <ReportGenerator
            data={rows}
            reportTitle="Events Report"
            columns={columns}
          />
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            autoHeight
          />
          {open && selectedEventId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center w-full bg-transparent mt-[50px]">
              <UpdateEvent setOpen={setOpen} eventId={selectedEventId} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllEvents;
